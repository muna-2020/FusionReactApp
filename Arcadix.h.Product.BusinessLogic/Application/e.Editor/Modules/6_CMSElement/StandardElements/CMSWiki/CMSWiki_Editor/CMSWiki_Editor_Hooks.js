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
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSWiki_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSWiki_Editor_ModuleProcessor}
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
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSWiki_Editor_ModuleProcessor}
 * @summary Contains imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
            let { cIsDeleted, ...objElementJson } = objContext.state.ElementJson;
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetElementJsonForCopy": async () => {
            let { cIsDeleted, ...objElementJson } = objContext.state.ElementJson;
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSWiki_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}
