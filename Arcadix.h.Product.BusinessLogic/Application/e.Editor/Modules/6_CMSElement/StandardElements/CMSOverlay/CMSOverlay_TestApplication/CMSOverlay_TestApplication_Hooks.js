//React imports
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "blnShowOverlay": false
    };
};

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @summary Sets the isLoadComplete when the text resource is loaded.
     */
    useEffect(() => {
        if (objContext.props.ElementJson) {
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objContext.props.ElementJson } });
        }
    }, [objContext.props.ElementJson]);
}

