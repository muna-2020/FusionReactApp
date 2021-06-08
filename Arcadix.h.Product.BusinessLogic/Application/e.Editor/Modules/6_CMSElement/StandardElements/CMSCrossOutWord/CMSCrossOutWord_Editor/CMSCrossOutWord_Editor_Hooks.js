//React Imports
import { useEffect, useImperativeHandle } from 'react';

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
        "isLoadComplete": false
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCrossOutWord_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
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
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    /**
    *@summary Saves selected color from ribbon 
    */
    useImperativeHandle(objContext.CrossOutWordRef, () => ({
        SaveSelectedColor: (strSelectedShape, blnSave) => {
            if (strSelectedShape) {
                var arrSelectedColors = [];
                if (blnSave) {
                    var blnExits = objContext.state.Colors.filter(c => c === strSelectedShape).length > 0 ? true : false;
                    if (!blnExits) {
                        arrSelectedColors = [strSelectedShape, ...objContext.state.Colors];
                    }
                }
                else {
                    arrSelectedColors = objContext.state.Colors.filter(c => c !== strSelectedShape);
                }
                if (arrSelectedColors.length > 0) {
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "Colors": [...arrSelectedColors] }, "blnUndoRedoUpdate": false });
                }
            }
        }
    }), [objContext.state]);
}

