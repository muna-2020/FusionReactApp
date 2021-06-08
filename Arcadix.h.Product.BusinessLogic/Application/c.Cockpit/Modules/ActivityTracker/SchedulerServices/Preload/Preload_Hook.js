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
        arrPreloadData: []
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
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.Preload_ModuleProcessor.LoadInitialData(objContext);
       // ApplicationState.SetProperty("OfficeRibbonData", []);
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
            && objContext.state.objSchedulerStatusData
            && DataRef(objContext.props.Object_Framework_SystemTracking_Preload)["Data"] 
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload", objContext.props)
        ) {
           // objContext.dispatch({ type: "SET_STATE", payload: { "arrPreloadData": DataRef(objContext.props.Object_Cockpit_Preload)["Data"] } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.state.objSchedulerStatusData,
            objContext.props.Object_Framework_SystemTracking_Preload,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload"]
    ]);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.Preload_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Preload_ModuleProcessor.SetRibbonData(objContext);
    }
}