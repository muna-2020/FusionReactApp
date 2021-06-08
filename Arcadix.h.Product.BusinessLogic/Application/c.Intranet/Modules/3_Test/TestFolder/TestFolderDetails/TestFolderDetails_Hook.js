// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Cockpit_Language)["Data"] &&
        DataRef(props.Object_Cockpit_Skin)["Data"] &&
        DataRef(props.Object_Intranet_Member_IntranetAdministrator)["Data"]        
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
    }
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.TestFolderDetails_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {            
            ApplicationState.SetProperty("blnShowAnimation", false);
        }

        if (DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Skin)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"] &&            
            !objContext.state.isLoadComplete

        ) {
            //To set state data after the load is complete            
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_Skin,
        objContext.props.Object_Intranet_Member_IntranetAdministrator        
    ]);
}