// React related impoprts.
import { useEffect } from 'react';

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
        "isLoadComplete": false,
        "arrLinkedPageDetails": []
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
        objContext.LinkedPageDetails_ModuleProcessor.LoadLinkedPageDetailsData(objContext);
    }, [objContext.props.ElementDetails.iElementId]);

    /**
     * @name useEffect
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (objContext.props.LinkedPageDetails && objContext.props.LinkedPageDetails["Data"]) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "arrLinkedPageDetails": [...objContext.props.LinkedPageDetails["Data"]] } });
        }
    }, [
        objContext.props.LinkedPageDetails
    ]);
}
