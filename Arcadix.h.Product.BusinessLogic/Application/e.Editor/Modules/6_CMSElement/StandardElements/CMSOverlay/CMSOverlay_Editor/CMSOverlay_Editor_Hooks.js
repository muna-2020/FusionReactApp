//React Imports
import { useEffect, useImperativeHandle } from 'react';

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
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false
    }, props);
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSOverlay_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
    EditorBase_Hook.useRenderComplete(objContext);
};

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSOverlay_Editor_ModuleProcessor}
 * @summary Undo redo hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);

    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);
};

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSOverlay_Editor_ModuleProcessor}
 * @summary Contains imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
            let objElementJson = {
                ...objContext.state.ElementJson
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetElementJsonForCopy": async () => {
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId()
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSOverlay_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
};
