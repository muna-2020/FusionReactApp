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
        DataRef(props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClient)["Data"] &&
        DataRef(props.Object_Cockpit_ApplicationType)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientApplicationType", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        arrMainClientApplicationTypeData: [],
        strMainClientId: -1
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
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
            objContext.MainClientApplicationType_ModuleProcessor.LoadInitialData(objContext);
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
        if (
            !objContext.state.isLoadComplete &&
            Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientApplicationType", objContext.props) &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]            
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
            objContext.props.Object_Cockpit_MainClient_MainClientApplicationType,
            objContext.props.Object_Cockpit_MainClient_MainClient,
            objContext.props.Object_Cockpit_ApplicationType,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/MainClientApplicationType"]
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
            objContext.MainClientApplicationType_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.MainClientApplicationType_ModuleProcessor.SetRibbonData(objContext);
    }
}