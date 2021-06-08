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
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientCountry", props) &&
        DataRef(props.Object_Cockpit_MainClient_MainClientCountry)["Data"] &&
        DataRef(props.Object_Cockpit_Country)["Data"] &&
        DataRef(props.Object_Cockpit_ApplicationType)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        arrMainClientCountryData: [],
        strMainClientId: props.ClientUserDetails.MainClientId == 0 ? -1 : parseInt(props.ClientUserDetails.MainClientId)
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize method call to laod the initial data
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
        objContext.MainClientCountry_ModuleProcessor.LoadInitialData(objContext);
        DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry)["Data"];
        //ApplicationState.SetProperty('ModuleId', 0);
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
            objContext.dispatch({ type: "SET_STATE", payload: { arrMainClientCountryData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry)["Data"] } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if (
            Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientCountry", objContext.props) &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Country)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"] &&
            !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            objContext.dispatch({ type: "SET_STATE", payload: { arrMainClientCountryData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry)["Data"] } });
        }
    }, [
        objContext.props.Object_Cockpit_MainClient_MainClientCountry,
        objContext.props.Object_Cockpit_Country,
        objContext.props.Object_Cockpit_ApplicationType,
        objContext.props.Object_Cockpit_MainClient_MainClientApplicationType,
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientCountry", objContext.props)
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
            objContext.MainClientCountry_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.MainClientCountry_ModuleProcessor.SetRibbonData(objContext);
    }
}
