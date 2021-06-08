//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId import
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized initial state
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        "ElementJson": {
            ...props.ElementJson,
            "TextRef": props.ElementJson["TextRef"] ? props.ElementJson["TextRef"] : React.createRef()
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSText_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @name useEffect
     * @summary Preserves the ElementState.
     */
    useEffect(() => {
        objContext.CMSText_Editor_ModuleProcessor.PreserveTextState(objContext);
    }, [objContext.state.StateHistory]);

    /**
     * @summary Used for UndoRedo.
     */
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        ["UndoRedo"]: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    /**
     * @name useImperativeHandle
     * @summary Element imperative handle which holds the set of methods for various operation.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            let objElementJson = await objContext.state.ElementJson["TextRef"]["current"].GetElementJson(blnRemoveRef, strDataFor);
            //console.log("Text_Editor ElementJson", objElementJson);
            let objNewElementJson = {
                ...objContext.state.ElementJson,
                "vElementJson": {
                    ...objContext.state.ElementJson["vElementJson"],
                    "SubElements": objElementJson["vElementJson"]["SubElements"],
                    "vText": objElementJson["vElementJson"]["vText"]
                }
            };
            if (blnRemoveRef) {
                objNewElementJson = BaseCMSElement.RemoveRefKeyFromJson(objNewElementJson);
            }
            objContext.CMSText_Editor_ModuleProcessor.PreserveTextState(objContext, objNewElementJson);
            //console.log("CMSText GetElementJson", objNewElementJson);
            return objNewElementJson;
        },
        "GetElementJsonForCopy": async () => {
            let objElementJson = await objContext.state.ElementJson["TextRef"]["current"].GetElementJsonForCopy();
            let objNewElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    "SubElements": objElementJson["vElementJson"]["SubElements"],
                    "vText": objElementJson["vElementJson"]["vText"]
                }
            };
            objNewElementJson = BaseCMSElement.RemoveRefKeyFromJson(objNewElementJson);
            return objNewElementJson;
        },
        "GetLatestState": () => {
            return {
                ...objContext.state.ElementJson.TextRef.current.GetLatestState()
            }
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "SpellCheckUpdate": (objCheckTextJson) => {
            objContext.CMSText_Editor_ModuleProcessor.ElementSpellCheckUpdate(objContext, objCheckTextJson);
        },
        "ResetText": () => {
            objContext.state.ElementJson.TextRef.current.ResetText("");
        },
        "SetDefaultText": (strText) => {
            objContext.state.ElementJson.TextRef.current.ResetText(strText);
        },
        "GetContextMenuOptions": () => {
            return objContext.CMSText_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "PreserveTextEditorState": (iElementId, State) => {
            objContext.CMSText_Editor_ModuleProcessor.PreserveText_EditorState(objContext, iElementId, State);
        },
        "ShowCalculator": () => {
            if (objContext.props.ParentRef.current.ShowCalculator) {
                objContext.props.ParentRef.current.ShowCalculator();
            }
        },
        "GetContainerData": () => {
            if (objContext.props.ParentRef.current.GetContainerData) {
                return objContext.props.ParentRef.current.GetContainerData();
            }
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSText_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}
