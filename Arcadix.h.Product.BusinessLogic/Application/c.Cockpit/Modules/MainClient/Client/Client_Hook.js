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
        DataRef(props.Object_Cockpit_Client)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClient)["Data"] &&
        DataRef(props.Object_Cockpit_ApplicationType)["Data"] &&
        DataRef(props.Object_Cockpit_ClientConfig)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Client", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objFilter: {
            "cIsDeleted": "N",
            "iMainClientId": -1,
            "iApplicationTypeId": -1
        }
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
    useResetGridSelection(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Client_ModuleProcessor.LoadInitialData(objContext);
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
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_Client)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"]
            && DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]
            && DataRef(objContext.props.Object_Cockpit_ClientConfig)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Client", objContext.props)            
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });            
        }
    }, [
            objContext.props.Object_Cockpit_Client,
            objContext.props.Object_Cockpit_MainClient_MainClient,
            objContext.props.Object_Cockpit_ApplicationType,
            objContext.props.Object_Cockpit_ClientConfig,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/Client"]           
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
            objContext.Client_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Client_ModuleProcessor.SetRibbonData(objContext);
    }
}

/**
 * @name useResetGridSelection
 * @param {object} objContext objContext
 * @summary To Reset the Grid Row selection.
 */
export function useResetGridSelection(objContext) {
    useEffect(() => {
        objContext.Client_ModuleProcessor.ResetGridSelection("ClientGrid"); 
    }, [objContext.state.objFilter])
}