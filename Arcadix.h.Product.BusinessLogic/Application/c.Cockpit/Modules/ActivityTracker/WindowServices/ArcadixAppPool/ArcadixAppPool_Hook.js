// React related imports.
import { useEffect, useLayoutEffect } from 'react';


/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        arrServiceStatusData: []
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
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
        objContext.ArcadixAppPool_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty("OfficeRibbonData", [{ Text: "ArcadixAppPool" }]);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool", objContext.props)
            && objContext.state.arrServiceStatusData.length > 0
            && DataRef(objContext.props.Object_Framework_SystemTracking_ArcadixAppPool)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool"],
        objContext.props.Object_Framework_SystemTracking_ArcadixAppPool,
        objContext.state.arrServiceStatusData
    ]);
}