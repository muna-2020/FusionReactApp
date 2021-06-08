// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Cockpit_OnlineHelp, "Object_Cockpit_OnlineHelp;iMainClientId;" + props.JConfiguration.MainClientId)["Data"] &&
        DataRef(props.Object_Cockpit_OnlineHelpGroup)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClient)["Data"] &&
        DataRef(props.Object_Cockpit_Client)["Data"] &&
        DataRef(props.Object_Cockpit_TargetGroup)["Data"] &&
        DataRef(props.Object_Cockpit_ApplicationType)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/OnlineHelp", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objFilter: {
            cIsDeleted: "N",
            iApplicationTypeId: -1,
            iMainClientId: props.ClientUserDetails.MainClientId,
            uHelpGroupId: -1
        },
        objPageJson: null
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
    usePageJsonLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.OnlineHelp_ModuleProcessor.LoadInitialData(objContext);
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
        }
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_OnlineHelp, "Object_Cockpit_OnlineHelp;iMainClientId;" + objContext.props.JConfiguration.MainClientId)["Data"]
            && DataRef(objContext.props.Object_Cockpit_OnlineHelpGroup)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"]
            && DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/OnlineHelp", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props.Object_Cockpit_OnlineHelp,
        objContext.props.Object_Cockpit_OnlineHelpGroup,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/OnlineHelp"],
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_MainClient_MainClient,
        objContext.props.Object_Cockpit_ApplicationType
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
            objContext.OnlineHelp_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.OnlineHelp_ModuleProcessor.SetRibbonData(objContext);
    }
}

/**
 * @name usePageJsonLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function usePageJsonLoader(objContext) {
    useLayoutEffect(() => {
        objContext.OnlineHelp_ModuleProcessor.LoadPageJson(objContext);
    }, [objContext.props.SelectedRows]);
}