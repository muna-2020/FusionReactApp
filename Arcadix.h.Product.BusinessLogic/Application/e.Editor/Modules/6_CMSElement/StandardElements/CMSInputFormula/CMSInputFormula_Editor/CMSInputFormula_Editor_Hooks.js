//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

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
        'FormulaRef': React.createRef()  // this ref can be used to call the Formula component operations (adding and removing formula) from CMSInputFormula.
    },props);
}; 

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch}.
 * @summary Initialize the custom hooks.
 */
export function Initialize(objContext) {

    /**
     * @summary Perserves the ElementState.
     */
    useEffect(() => {
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);

    /**
     * @summary Used for UndoRedo.
     */
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch, objContext.CMSInputFormula_Editor_ModuleProcessor.UndoRedoActionCallback);
        }
    }), [objContext.state]);
};