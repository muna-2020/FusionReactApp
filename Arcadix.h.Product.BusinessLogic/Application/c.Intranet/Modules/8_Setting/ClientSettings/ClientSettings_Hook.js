// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Cockpit_MainClient_ClientSettings)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ClientSettings", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,  
        arrData: [],
        strDivToShow: "Common"
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
        objContext.ClientSettings_ModuleProcessor.LoadInitialData(objContext);
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
            objContext.dispatch({ type: "SET_STATE", payload: { "arrData": [...DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings)["Data"]] } });
        }
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ClientSettings", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "arrData": [...DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings)["Data"] ] } });
        }
    }, [           
            objContext.props.Object_Cockpit_MainClient_ClientSettings,           
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/ClientSettings"],            
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
            objContext.ClientSettings_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.ClientSettings_ModuleProcessor.SetRibbonData(objContext);
    }
}