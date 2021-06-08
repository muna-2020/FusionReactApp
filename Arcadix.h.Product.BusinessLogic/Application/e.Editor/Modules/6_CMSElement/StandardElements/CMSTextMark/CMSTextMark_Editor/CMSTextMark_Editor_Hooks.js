//React imports
import { useEffect, useImperativeHandle } from 'react';

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}
 * @summary Undo redo hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current["PreserveElementState"]) {
            objContext.props.ParentRef.current["PreserveElementState"]({ ...objContext.state, "Text_EditorState": objContext.Element_UndoRedoDataRef.current[objContext.state.ElementJson["iElementId"]] });
        }
    }, [objContext.state.StateHistory]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}
 * @summary Imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);
}
