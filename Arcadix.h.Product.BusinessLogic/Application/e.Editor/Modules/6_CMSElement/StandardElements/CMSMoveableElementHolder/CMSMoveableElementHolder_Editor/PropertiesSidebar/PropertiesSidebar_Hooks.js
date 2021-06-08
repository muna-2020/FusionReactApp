//React Imports
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "ElementJson": props.ElementJson
    };
}

/**
 * @name Initialize
 * @param {object} {props, state, dispatch, Properties_ModuleProcessor}
 * @summary Initialize the custom hooks.
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} {props, state, dispatch, Properties_ModuleProcessor}
 * @summary Custom hook
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": objContext.props.ElementJson
                }
            });
        }
    }, [objContext.props.ElementJson]);
}
