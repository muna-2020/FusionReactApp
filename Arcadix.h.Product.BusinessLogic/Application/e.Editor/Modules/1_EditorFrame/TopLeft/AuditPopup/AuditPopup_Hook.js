// React related impoprts.
import { useEffect, useLayoutEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name GetInitialState
 * @param {object} props Initial state
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
   
    return {
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @name useEffect
     * @summary Calls the DataCall method and the InitialDataParams.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete) {
            objContext.AuditPopup_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);

    /**
     * @name useEffect
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"]) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [objContext.props.Object_Intranet_Member_IntranetAdministrator]);
}
