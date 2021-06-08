// React related imports.
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary to Get Initial State
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        IsLoadComplete: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initalize(objContext) {
    useDataLoaded(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
        objContext.dispatch({ type: "SET_STATE", payload: { "IsLoadComplete": true } });
    }, []);
}