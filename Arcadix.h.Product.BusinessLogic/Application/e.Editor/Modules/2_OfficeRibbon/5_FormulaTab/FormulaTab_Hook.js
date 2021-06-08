//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/** 
 * @name Reducer
 * @param {any} state component state.
 * @param {any} action reducer action.
 * @summary state reducer used for maintaining local state.
 * @return {any} new state.

 */
export const Reducer = (state, action) => {
    let objPayload = action.payload;
    switch (action.type.toUpperCase()) {
        default:
            return EditorBase_Hook.Reducer(state, action);
    }
};

/**
 * @name GetInitialState
 * @param {any} props component props.
 * @returns {any} initial state object.
 * @summary return initial state of  the component.
 */
export const GetInitialState = (props) => {
    return {
     activePopup : ""
    };
}