//React Imports
import { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

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
    return UndoRedoInitialize({
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    }, props);
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
};

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
 * @summary useDataLoaded hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": objContext.props.ElementJson,
                },
                blnUndoRedoUpdate: false
            });
        }
    }, [objContext.props.ElementJson]);
};

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
 * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
 * @summary Contains imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
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
                    ...objContext.state.ElementJson["vElementJson"],
                    ["TextElements"]: arrNewTextElements
                }
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
            let arrRows = [];
            let arrColumns = [];
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
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["MatrixRow"].length; intCount++) {
                let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["MatrixRow"][intCount]["iElementTextId"]);
                let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                arrTextElements = [
                    ...arrTextElements,
                    objNewTextElementJson
                ];
                arrRows = [
                    ...arrRows,
                    {
                        ...objContext.state.ElementJson["vElementJson"]["MatrixRow"][intCount],
                        ["iElementTextId"]: objNewTextElementJson["iElementId"]
                    }
                ];
            }
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["MatrixColumn"].length; intCount++) {
                let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["MatrixColumn"][intCount]["iElementTextId"]);
                let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                arrTextElements = [
                    ...arrTextElements,
                    objNewTextElementJson
                ];
                arrColumns = [
                    ...arrColumns,
                    {
                        ...objContext.state.ElementJson["vElementJson"]["MatrixColumn"][intCount],
                        ["iElementTextId"]: objNewTextElementJson["iElementId"]
                    }
                ];
            }
            let objElementJson = {
                ...objContext.state.ElementJson,
                "iElementId": UniqueId.GetUniqueId(),
                "vElementJson": {
                    ...objContext.state.ElementJson["vElementJson"],
                    "HeaderValues": arrHeaderValues,
                    "MatrixRow": arrRows,
                    "MatrixColumn": arrColumns,
                    "TextElements": arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetContextMenuOptions": (intElementTextId, blnIsSubElement, objRevertData) => {
            let arrData, strType = "";
            if (objRevertData) {
                arrData = [objRevertData];
                strType = "ROW";
            }
            else {
                arrData = objContext.state.ElementJson["vElementJson"]["MatrixRow"].filter(objTempData => objTempData["iElementTextId"] === intElementTextId);
                if (arrData.length > 0) {
                    strType = "ROW";
                }
                if (arrData.length === 0) {
                    arrData = objContext.state.ElementJson["vElementJson"]["MatrixColumn"].filter(objTempData => objTempData["iElementTextId"] === intElementTextId);
                    if (arrData.length > 0) {
                        strType = "COLUMN";
                    }
                }
                if (arrData.length === 0) {
                    arrData = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempData => objTempData["iElementTextId"] === intElementTextId);
                    if (arrData.length > 0 && arrData[0]["vHeaderType"].toLowerCase() !== "textleft" && arrData[0]["vHeaderType"].toLowerCase() !== "textright") {
                        strType = "ROW_HEADER";
                    }
                }
            }
            return objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.GetContextMenuOptions(objContext, { "Value": arrData[0], "Type": strType });
        },
        "GetPointOverride": () => {
            return objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.GetPointOverride(objContext)
        },
        "SetPointOverride": (objPoints) => {
            objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.SetPointOverride(objContext, objPoints);
        },
        "RemovePointOverride": () => {
            objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.RemovePointOverride(objContext);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
};
