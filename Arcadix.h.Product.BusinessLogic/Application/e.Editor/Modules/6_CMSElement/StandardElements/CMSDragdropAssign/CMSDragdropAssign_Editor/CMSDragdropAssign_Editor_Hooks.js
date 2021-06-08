//React Imports
import { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//Module related fies.
import * as CMSDragdropAssign_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Editor/CMSDragdropAssign_Editor_MetaData";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let objElementJson = CMSDragdropAssign_Editor_MetaData.GetElementJsonForSavedValues(props.ElementJson);
    return UndoRedoInitialize({
        "ElementJson": objElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            let objElementJson = CMSDragdropAssign_Editor_MetaData.GetElementJsonForSavedValues(objContext.props.ElementJson);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": objElementJson
                },
                blnUndoRedoUpdate: false
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
 * @summary Undo redo hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.ParentRef.current != null && objContext.props.ParentRef.current.PreserveElementState) {
            objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state, TextState: objContext.Element_UndoRedoDataRef.current });
        }
    }, [objContext.state.StateHistory]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}
 * @summary Imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            let arrHeaderValues = [];
            let arrValues = [];
            let arrTextElements = [];
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["HeaderValues"].length; intCount++) {
                if (objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"] !== null) {
                    let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"]);
                    let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJson(blnRemoveRef, strDataFor);
                    arrTextElements = [
                        ...arrTextElements,
                        objNewTextElementJson
                    ];
                }
                arrHeaderValues = [
                    ...arrHeaderValues,
                    objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]
                ];
            }
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Values"].length; intCount++) {
                if (objContext.state.ElementJson["vElementJson"]["Values"][intCount]["cIsTemporary"] && objContext.state.ElementJson["vElementJson"]["Values"][intCount]["cIsTemporary"] === "Y") {
                    let objTextElementJson, intBlockId;
                    for (let intIndex = 0; intIndex < objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementTextId"].length; intIndex++) {
                        let objTempJson = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementTextId"][intIndex])[0];
                        let objTempElementJson = await objTempJson["Ref"].current.GetElementJson();
                        if (objTempElementJson["vElementJson"]["vText"]) {
                            objTextElementJson = { ...objTempElementJson };
                            intBlockId = intIndex + 1;
                            break;
                        }
                    }
                    if (objTextElementJson) {
                        arrTextElements = [
                            ...arrTextElements,
                            objTextElementJson
                        ];
                        arrValues = [
                            ...arrValues,
                            {
                                "iElementDragDropAssignValueId": objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementDragDropAssignValueId"],
                                "iElementTextId": objTextElementJson["iElementId"],
                                "iBlockId": intBlockId,
                                "iDisplayOrder": objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iDisplayOrder"]
                            }
                        ];
                    }
                    else {
                        arrValues = [
                            ...arrValues,
                            {
                                ...objContext.state.ElementJson["vElementJson"]["Values"][intCount],
                                ["iElementTextId"]: null
                            }
                        ];
                    }
                }
                else {
                    let objTempJson = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementTextId"])[0];
                    let objTextElementJson = await objTempJson["Ref"].current.GetElementJson();
                    arrTextElements = [
                        ...arrTextElements,
                        objTextElementJson
                    ];
                    arrValues = [
                        ...arrValues,
                        objContext.state.ElementJson["vElementJson"]["Values"][intCount]
                    ];
                }
            }
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["Values"]: arrValues,
                    ["TextElements"]: arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
            let arrValues = [];
            let arrTextElements = [];
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
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Values"].length; intCount++) {
                if (objContext.state.ElementJson["vElementJson"]["Values"][intCount]["cIsTemporary"] && objContext.state.ElementJson["vElementJson"]["Values"][intCount]["cIsTemporary"] === "Y") {
                    let objTextElementJson, intBlockId;
                    for (let intIndex = 0; intIndex < objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementTextId"].length; intIndex++) {
                        let objTempJson = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementTextId"][intIndex])[0];
                        let objTempElementJson = await objTempJson["Ref"].current.GetElementJsonForCopy();
                        if (objTempElementJson["vElementJson"]["vText"]) {
                            objTextElementJson = { ...objTempElementJson };
                            intBlockId = intIndex + 1;
                            break;
                        }
                    }
                    if (objTextElementJson) {
                        arrTextElements = [
                            ...arrTextElements,
                            objTextElementJson
                        ];
                        arrValues = [
                            ...arrValues,
                            {
                                "iElementDragDropAssignValueId": objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementDragDropAssignValueId"],
                                "iElementTextId": objTextElementJson["iElementId"],
                                "iBlockId": intBlockId,
                                "iDisplayOrder": objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iDisplayOrder"]
                            }
                        ];
                    }
                    else {
                        arrValues = [
                            ...arrValues,
                            {
                                ...objContext.state.ElementJson["vElementJson"]["Values"][intCount],
                                "iElementTextId": null,
                            }
                        ];
                    }
                }
                else {
                    let objTempJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementTextId"]);
                    let objTempElementJson = await objTempJson["Ref"].current.GetElementJsonForCopy();
                    arrTextElements = [
                        ...arrTextElements,
                        objTempElementJson
                    ];
                    arrValues = [
                        ...arrValues,
                        {
                            ...objContext.state.ElementJson["vElementJson"]["Values"][intCount],
                            ["iElementTextId"]: objTempElementJson["iElementId"],
                        }
                    ];
                }
            }
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["Values"]: arrValues,
                    ["TextElements"]: arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetContextMenuOptions": (intElementTextId) => {
            let arrData = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempData => objTempData["iElementTextId"] === intElementTextId);
            let strType;
            if (arrData.length > 0) {
                strType = "ELEMENT_HEADER";
            }
            else {
                arrData = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempData => objTempData["cIsTemporary"] && objTempData["cIsTemporary"] === "Y" &&
                    objTempData["iElementTextId"].filter(intTempId => intTempId === intElementTextId).length > 0);
                if (arrData.length === 0) {
                    arrData = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempData => !objTempData["cIsTemporary"] && objTempData["iElementTextId"] === intElementTextId);
                }
            }
            return objContext.CMSDragdropAssign_Editor_ModuleProcessor.GetContextMenuOptions(objContext, { "Value": arrData[0], "ElementTextId": intElementTextId, "Type": strType });
        },
        "GetPointOverride": () => {
            return objContext.CMSDragdropAssign_Editor_ModuleProcessor.GetPointOverride(objContext);
        },
        "SetPointOverride": (objPoints) => {
            objContext.CMSDragdropAssign_Editor_ModuleProcessor.SetPointOverride(objContext, objPoints);
        },
        "RemovePointOverride": () => {
            objContext.CMSDragdropAssign_Editor_ModuleProcessor.RemovePointOverride(objContext);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}
