//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Undo Redo imports
import { UndoRedoUpdate } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';
import { useEffect } from 'react';

/**
 * @name MapStoreToProps
 * @param {object} arrObjects store
 * @summary   maps entity/application state to props of the component.
 * @returns {object} component's props
 */
export function MapStoreToProps(arrObjects) {
    return Base_Hook.MapStoreToProps(arrObjects);
}

/**
 * @name useRenderComplete
 * @param {object} objContext
 * @summary calls render complete callback 
 */
export const useRenderComplete = (objContext) => {
    useEffect(() => {
        if(objContext.props.RenderCallback){
            objContext.props.RenderCallback();
        }
    },[]);
};

/**
 * @name Reducer
 * @param {object} objState  takes state
 * @param {object} objAction  takes action
 * @summary Reducer
 * @returns {object} actions to perform
 */
export const Reducer = (objState, objAction) => {
    switch (objAction.type.toUpperCase()) {
        case "SET_STATE":
            if (typeof (objAction.blnUndoRedoUpdate) !== "undefined" && !objAction.blnUndoRedoUpdate) {
                return {
                    ...objState,
                    ...objAction.payload
                };
            } else {
                return UndoRedoUpdate({
                    ...objState,
                    ...objAction.payload
                });                
            }
        case "REPLACE":
            return {
                ...objAction.payload, 
                ["blnUndoRedoStateUpdate"]: true
            };
        default:
            return Base_Hook.Reducer(objState, objAction);
    }
};

export function InitializeCss(props, objModuleProcessor) {
    Base_Hook.InitializeCss(props, objModuleProcessor);
}