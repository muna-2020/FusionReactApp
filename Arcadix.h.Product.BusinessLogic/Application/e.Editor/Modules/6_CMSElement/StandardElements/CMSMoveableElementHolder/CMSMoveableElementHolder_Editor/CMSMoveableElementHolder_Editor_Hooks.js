//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

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
    let objElementJson = {
        ...props.ElementJson,
        ["MappedElements"]: [...props.ElementJson["MappedElements"].map(x => {
            let objMappedElementJson = BaseCMSElement.AttachRef(x);
            return {
                ...objMappedElementJson,
                ["DivRef"]: React.createRef()
            };
        })]
    };
    return UndoRedoInitialize({
        "ElementJson": objElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "ElementFocused": null
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            let objElementJson = {
                ...objContext.props.ElementJson,
                ["MappedElements"]: [...objContext.props.ElementJson["MappedElements"].map(x => {
                    x = BaseCMSElement.AttachRef(x);
                    return {
                        ...x,
                        ["DivRef"]: React.createRef()
                    };
                })]
            };
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": objElementJson,
                },
                blnUndoRedoUpdate: false
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
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
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
 * @summary Imperative Methods
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
            let arrMappedElements = [];
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
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Values"].length; intCount++) {
                let strMappedElementTypeName = objContext.state.ElementJson["vElementJson"]["Values"][intCount]["vElementTypeName"];
                let intMappedElementId = objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElement" + strMappedElementTypeName + "Id"];
                let objMappedElementJson = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === intMappedElementId);
                objMappedElementJson = await objMappedElementJson.Ref.current.GetElementJson();
                let { DivRef, ...objNewMappedElementJson } = objMappedElementJson;
                arrMappedElements = [
                    ...arrMappedElements,
                    objNewMappedElementJson
                ];
            }
            let objBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["iHeight"]: objBoundingRects.height,
                    ["iWidth"]: objBoundingRects.width,
                    ["TextElements"]: arrNewTextElements
                },
                ["MappedElements"]: arrMappedElements
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
            let arrValues = [];
            let arrTextElements = [];
            let arrMappedElements = [];
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
                let strMappedElementTypeName = objContext.state.ElementJson["vElementJson"]["Values"][intCount]["vElementTypeName"];
                let intMappedElementId = objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElement" + strMappedElementTypeName + "Id"];
                let objMappedElementJson = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === intMappedElementId);
                objMappedElementJson = await objMappedElementJson.Ref.current.GetElementJsonForCopy();
                arrMappedElements = [
                    ...arrMappedElements,
                    objMappedElementJson
                ];
                arrValues = [
                    ...arrValues,
                    {
                        ...objContext.state.ElementJson["vElementJson"]["Values"][intCount],
                        ["iElement" + strMappedElementTypeName + "Id"]: objMappedElementJson["iElementId"]
                    }
                ];
            }
            let objBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["Values"]: arrValues,
                    ["iHeight"]: objBoundingRects.height,
                    ["iWidth"]: objBoundingRects.width,
                    ["TextElements"]: arrTextElements
                },
                ["MappedElements"]: arrMappedElements
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "DeleteElement": (intElementId) => {
            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.DeleteElement(objContext, intElementId);
        },
        // "SpellCheckUpdate": (objCheckedElementJson) => { 
        //optional needed if element has Text_Editor.
        //     objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ElementSpellCheckUpdate(objContext, objCheckedElementJson);
        // },
        "GetContextMenuOptions": (intElementId, blnShowAsSubMenu = false) => {
            let objMappedElement = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === intElementId);
            let objValue = objContext.state.ElementJson["vElementJson"]["Values"].find(x => x["iElement" + objMappedElement["vElementTypeName"] + "Id"] === intElementId);
            return objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objValue, blnShowAsSubMenu);
        },
        "PreserveTextState": (objState) => {
            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.PreserveTextState(objContext, objState);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}
