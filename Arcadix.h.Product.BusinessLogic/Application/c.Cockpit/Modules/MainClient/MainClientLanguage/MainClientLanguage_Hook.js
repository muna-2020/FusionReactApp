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
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Category", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        arrMainClientLanguageData: [],
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
        objContext.MainClientLanguage_ModuleProcessor.LoadInitialData(objContext);
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
            objContext.dispatch({ type: "SET_STATE", payload: { arrMainClientLanguageData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if (
            Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientLanguage", objContext.props) &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"] &&
            !objContext.state.isLoadComplete
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            objContext.dispatch({ type: "SET_STATE", payload: { arrMainClientLanguageData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] } });
        }
    }, [
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.props.Object_Cockpit_Language,
            objContext.props.Object_Cockpit_ApplicationType,
            objContext.props.Object_Cockpit_MainClient_MainClientApplicationType,
            Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientLanguage", objContext.props)
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
            objContext.MainClientLanguage_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.MainClientLanguage_ModuleProcessor.SetRibbonData(objContext);
    }
}
