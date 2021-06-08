//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId import
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";


//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        "ElementJson": { ...props.ElementJson, "Ref": React.createRef() },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    }, props);
};

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
    EditorBase_Hook.useRenderComplete(objContext);
};

/**
 * @name useUndoRedo
 * @param {object} objContext passes Context Object
 * @summary Custom hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.ParentRef.current != null && objContext.props.ParentRef.current.PreserveSubElementState) {
            objContext.props.ParentRef.current.PreserveSubElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);
};

/**
 * @name useDataLoaded
 * @param {object} objContext passes Context Object
 * @summary Data Loaded Custom hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        objContext.Ref.current.addEventListener("contextmenu", function (e) {
            objContext.CMSTextArea_Editor_ModuleProcessor.OpenContextMenu(objContext, e);
        }, false);
    }, [objContext.state]);
};

/**
 * @name useImperativeMethods
 * @param {object} objContext passes Context Object
 * @summary Imperative Methods Custom hook.
 */
function useImperativeMethods(objContext) {

    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
            let objElementJson = { ...objContext.state.ElementJson };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetPointOverride": () => {
            return objContext.CMSTextArea_Editor_ModuleProcessor.GetPointOverride(objContext)
        },
        "SetPointOverride": (objPoints) => {
            objContext.CMSTextArea_Editor_ModuleProcessor.SetPointOverride(objContext, objPoints);
        },
        "RemovePointOverride": () => {
            objContext.CMSTextArea_Editor_ModuleProcessor.RemovePointOverride(objContext);
        },
        "GetElementJsonForCopy": async () => {
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId()
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetContextMenuOptions": (intElementTextId) => {
            return objContext.CMSTextArea_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSTextArea_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}
