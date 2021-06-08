import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';
import React,{ useEffect, useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "FormulaRef": React.createRef()
    };
};


/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    ///**
    // * @name useEffect
    // * @summary Resets the element json in the state with the new data.
    // */
    //useEffect(() => {
    //    if (objContext.props.ElementJson) {
    //        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objContext.props.ElementJson } });
    //    }
    //}, [objContext.props.ElementJson]);

    ///**
    // * @name useEffect
    // * @summary Perserves the ElementState.
    // */
    //useEffect(() => {
    //    if (objContext.props.PreserveElementState) {
    //        objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
    //    }
    //}, [objContext.state.StateHistory]);

    ///**
    // * @name useImperativeHandle
    // * @summary Used for UndoRedo.
    // */
    //useImperativeHandle(objContext.props.UndoRedoRef, () => ({
    //    UndoRedo: (LastActivity, Action) => {
    //        UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
    //    }
    //}), [objContext.state]);
}


