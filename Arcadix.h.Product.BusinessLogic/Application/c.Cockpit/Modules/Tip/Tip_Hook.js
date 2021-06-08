// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Cockpit_MainClient_MainClient)["Data"] &&
        DataRef(props.Object_Cockpit_ApplicationType)["Data"] &&
        DataRef(props.Object_Framework_Services_Tip)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
        DataRef(props.Object_Cockpit_Language)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Tip", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objFilter: { cIsDeleted: "N" },
        strMainClientId: -1,
        strApplicationId: -1,
        arrApplicationId: []
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
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
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Tip_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrApplicationId": objContext.props.Object_Cockpit_ApplicationType["Data"] } });
        }
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"]
            && DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]
            && DataRef(objContext.props.Object_Framework_Services_Tip)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Tip", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "arrApplicationId": objContext.props.Object_Cockpit_ApplicationType["Data"] } });
        }
    }, [
        objContext.props.Object_Cockpit_Tip,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/Tip"],
        objContext.props.Object_Cockpit_MainClient_MainClient,
        objContext.props.Object_Cockpit_ApplicationType,
        objContext.props.Object_Framework_Services_Tip,
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage
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
            objContext.Tip_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Tip_ModuleProcessor.SetRibbonData(objContext);
    }
}