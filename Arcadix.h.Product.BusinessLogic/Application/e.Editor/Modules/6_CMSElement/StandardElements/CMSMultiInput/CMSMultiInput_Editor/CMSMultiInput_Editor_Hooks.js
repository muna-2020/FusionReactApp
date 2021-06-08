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
 * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
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
};

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
 * @summary Data Loaded Custom hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": objContext.props.ElementJson,
                },
                blnUndoRedoUpdate: false
            });
        }
    }, [objContext.props.ElementJson]);
};

/**
 * @name useUnuseImperativeMethodsdoRedo
 * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
 * @summary Imperative Methods Custom hook.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef, strDataFor) => {
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
        "GetContextMenuOptions": (intElementTextId) => {
            let arrData = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempData => objTempData["iElementTextId"] === intElementTextId);
            let strType = "ELEMENT_HEADER";
            return objContext.CMSMultiInput_Editor_ModuleProcessor.GetContextMenuOptions(objContext, { "Value": arrData[0], "Type": strType });
        },
        "GetElementJsonForCopy": async () => {
            let arrTextElements = [];
            let arrHeaderValues = [];
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
                } else {
                    arrHeaderValues = [
                        ...arrHeaderValues,
                        objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]
                    ];
                }
                let objElementJson = {
                    ...objContext.state.ElementJson,
                    ["iElementId"]: UniqueId.GetUniqueId(),
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["HeaderValues"]: arrHeaderValues,
                        ["TextElements"]: arrTextElements
                    }
                };
                objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
                return objElementJson;
            }
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSMultiInput_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
};
