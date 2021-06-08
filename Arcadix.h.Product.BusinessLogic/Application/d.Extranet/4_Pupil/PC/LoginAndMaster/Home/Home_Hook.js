//React imports
import { useEffect } from "react";

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete) {
            objContext.dispatch({ type: 'SET_STATE', payload: { isLoadComplete: true } })
            ApplicationState.SetProperty("blnShowAnimation", false);
        } else {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, []);
}