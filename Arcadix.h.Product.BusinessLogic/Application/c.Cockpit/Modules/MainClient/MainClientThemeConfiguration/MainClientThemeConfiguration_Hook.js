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
        DataRef(props.Object_Cockpit_MainClient_MainClientThemeConfiguration)["Data"]
        && DataRef(props.Object_Cockpit_TargetGroup)["Data"]
        && DataRef(props.Object_Cockpit_Country)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objFilter: { "cIsDeleted": "N" }
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
        objContext.MainClientThemeConfiguration_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientThemeConfiguration)["Data"]
            && DataRef(objContext.props.Object_Cockpit_TargetGroup)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Country)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props.Object_Cockpit_MainClient_MainClientThemeConfiguration,
        objContext.props.Object_Cockpit_TargetGroup,
        objContext.props.Object_Cockpit_Country,
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration", objContext.props)
    ]);
}

/**
 * @name useSetRibbonData.
 * @param {object} objContext takes  objContext.
 * @summary To set and update the Ribbon Data when the State changes.
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.MainClientThemeConfiguration_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.MainClientThemeConfiguration_ModuleProcessor.SetRibbonData(objContext);
    }
}