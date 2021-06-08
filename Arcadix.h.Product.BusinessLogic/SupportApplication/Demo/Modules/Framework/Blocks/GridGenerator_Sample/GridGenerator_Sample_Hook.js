// React related imports.
import { useEffect } from 'react';
//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name GetInitialState
* @summary to Get Initial State
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        RenderGrid: true,
        Id: 1,
        strStatus: "All"
    };
}

/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
        objContext.dispatch({ type: "SET_STATE", payload: { "Data": objContext.props.Data } });
    }, []);
}