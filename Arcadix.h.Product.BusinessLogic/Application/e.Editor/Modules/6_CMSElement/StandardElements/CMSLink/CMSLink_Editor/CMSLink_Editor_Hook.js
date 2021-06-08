//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

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
}

/**
* @name Initialize
* @param {object} objContext passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {

    /**
     * @name useEffect
     * @summary Perserves the ElementState.
     */
    useEffect(() => {
        if (objContext.props.PreserveSubElementState) {
            objContext.props.PreserveSubElementState(objContext.state.ElementJson["iElementId"], objContext.state);
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

    EditorBase_Hook.useRenderComplete(objContext);

}
