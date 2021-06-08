//React Imports
import { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        ElementJson: { ...props.ElementJson },
        PageId: props.PageId,
        ComponentKey: props.ComponentKey,
        isLoadComplete: false,
        arrCapturedColor: [],
        cIsFirstLoad: props.ElementJson.vElementJson.vColorFillJson.length > 0 ? "N" : "Y",
        iColorFillInstanceId: 0,
        isLoadComplete: true
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            let cShowHeaderText = "N";
            let arrHeaderValues = [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ];
            let arrTextElements = [];
            if (objContext.props.ElementJson["vElementJson"]["cShowHeaderText"]) {
                cShowHeaderText = objContext.props.ElementJson["vElementJson"]["cShowHeaderText"];
            }
            if (objContext.props.ElementJson["vElementJson"]["HeaderValues"]) {
                arrHeaderValues = [...objContext.props.ElementJson["vElementJson"]["HeaderValues"]];
            }
            if (objContext.props.ElementJson["vElementJson"]["TextElements"]) {
                arrTextElements = [...objContext.props.ElementJson["vElementJson"]["TextElements"]];
            }
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.props.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.props.ElementJson["vElementJson"],
                            ["cShowHeaderText"]: cShowHeaderText,
                            ["HeaderValues"]: arrHeaderValues,
                            ["TextElements"]: arrTextElements
                        }
                    },
                    "iColorFillInstanceId": objContext.props.ElementJson.vElementJson.iColorFillInstanceId ? objContext.props.ElementJson.vElementJson.iColorFillInstanceId : 0,
                    "blnUndoRedoUpdate": false
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_Editor_ModuleProcessor}
 * @summary Undo redo hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {

    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    /**
      * @summary Gets the Element Json.
      */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            var arrColorFill = objContext.arrColorFill.current.map((shape) => {
                return { ...shape, ["IsColorFill"]: "N" }
            });
            var arrCapturedColors = [];
            objContext.arrCapturedElementIds.current.forEach((element) => {
                var index = arrColorFill.findIndex((objColorFill) => { return objColorFill.id === element.actualid });
                if (index > -1) {
                    arrColorFill[index] = { ...arrColorFill[index], "IsColorFill": "Y" }
                    if (arrColorFill[index]["fill"]) {
                        var strColor = objContext.props.ElementJson.vElementJson.Values.find(v => v.vClientElementId === arrColorFill[index]["id"]);
                        var objCapturedValue = arrCapturedColors.find(e => e.vColorCode == strColor["vColorCode"]);
                        if (objCapturedValue == undefined) {
                            arrCapturedColors = [...arrCapturedColors, { "vColorCode": strColor["vColorCode"] }];
                        }
                        arrColorFill[index]["fill"] = "rgba(0,0,0,0)";
                    }
                }
            });
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrNewTextElements = [];
            for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
                let objTextElementJson = { ...arrTextElements[intCount] };
                if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                    objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson(blnRemoveRef, strDataFor);
                }
                arrNewTextElements = [
                    ...arrNewTextElements,
                    objTextElementJson
                ];
            }
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson.vElementJson,
                    ["vColorFillJson"]: JSON.stringify(arrColorFill),
                    ["vCapturedColors"]: [...new Set(arrCapturedColors)],
                    ["TextElements"]: arrNewTextElements
                }
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetContextMenuOptions": (intElementTextId) => {
            return objContext.CMSColorFillWrapper_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "GetElementJsonForCopy": async () => {
            let objElementJson = { ...objContext.state.ElementJson };
            let arrCapturedColors = []; let arrHeaderValues = []; let arrTextElements = [];
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["HeaderValues"].length; intCount++) {
                if (objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"] !== null) {
                    let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"]);
                    let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                    arrTextElements = [
                        ...arrTextElements,
                        objNewTextElementJson
                    ];
                    arrHeaderValues = [
                        ...arrHeaderValues,
                        {
                            ...objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount],
                            ["iElementTextId"]: objNewTextElementJson["iElementId"]
                        }
                    ];
                }
                else {
                    arrHeaderValues = [
                        ...arrHeaderValues,
                        objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]
                    ];
                }
            }

            var arrColorFill = [...objContext.arrColorFill.current];
            objContext.arrCapturedElementIds.current.forEach((element) => {
                var index = arrColorFill.findIndex((objColorFill) => { return objColorFill.id === element.actualid });
                console.log(index);
                if (index > -1) {
                    arrColorFill[index] = { ...arrColorFill[index], "IsColorFill": "Y" }
                    if (arrColorFill[index]["fill"]) {
                        arrCapturedColors = [...arrCapturedColors, arrColorFill[index]["fill"]]
                        arrColorFill[index]["fill"] = "rgba(0,0,0,0)";
                    }
                }
            });

            objElementJson = {
                ...objElementJson,
                ["vElementJson"]: {
                    ...objElementJson["vElementJson"],
                    ["vColorFillJson"]: arrColorFill,
                    ["HeaderValues"]: arrHeaderValues,
                    ["TextElements"]: arrTextElements,
                    ["vCapturedColors"]: [...new Set(arrCapturedColors)],
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSColorFillWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}