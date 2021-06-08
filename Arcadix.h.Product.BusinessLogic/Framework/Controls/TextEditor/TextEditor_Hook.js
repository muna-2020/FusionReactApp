//React Imports
import { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction, UndoRedoUpdate } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        ...props,
        TextState: { status: "", TextEditorId: "texteditor_" + props.Mode + "_" + props.TextEditorId }
    }, props);
}

/**
* @name Initialize
* @param {object} objContext passes Context Object
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
}

/** 
 * @name Reducer
 * @param {object} state text editor local state
 * @param {object} action action to be done
 * @summary state reducer used for maintaining local state
 * @returns {object} modified state
 */
export const Reducer = (state, action) => {
    let objPayload = action.payload;
    switch (action.type.toUpperCase()) {
        case "INPUT_STARTED":
            return UndoRedoUpdate({
                ...state, TextState: { ...state.TextState, status: objPayload.status },
            });
        case "SET_TEXTJSON_STATE":
            return UndoRedoUpdate({
                ...state, TextJson: objPayload.TextJson
            });
        case "REPLACE":
            return {
                ...objPayload
            };
        default:
            return state;
    }
};


