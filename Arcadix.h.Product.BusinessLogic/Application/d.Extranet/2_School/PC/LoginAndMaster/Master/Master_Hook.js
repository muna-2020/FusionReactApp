//React related imports.
import { useEffect } from 'react';

//Core Imports.
import { LoadPrefetchLinksForNavigation } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {

    return {
        isLoadComplete: false,
        blnShowPerformance: false,
        strSelectedSchoolId: -1,
        blnShowTabletNavigation: false,
        blnClassIsSet: false
    }
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useLoadPrefetchLinks(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.Master_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @summary Custom hook which will check if all the data is loaded
 * @param {any} props
 * @param {any} state
 * @param {any} dispatch
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strMainClientId = objContext.props.ClientUserDetails.MainClientId;
        let strApplicationTypeId = objContext.props.ClientUserDetails.ApplicationTypeId
        if (!objContext.state.isLoadComplete &&
            (objContext.props.JConfiguration.ApplicationTypeId == "12" || objContext.props.JConfiguration.ApplicationTypeId == "6" || objContext.state.blnClassIsSet) &&
            DataRef(objContext.props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId) &&
            DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Country)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage, "Object_Cockpit_MainClient_MainClientLanguage;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry, "Object_Cockpit_MainClient_MainClientCountry;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/LoginAndMaster/Master", objContext.props)
        ) {
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            //Performance.LogPerformance('Master_Data_Call');
            //Performance.LogPerformance('Master_Render');
           // ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
        objContext.state.blnClassIsSet,
        objContext.props.Object_Framework_Services_ExtranetNavigation,
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_Country,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_MainClient_MainClientCountry,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "LoginAndMaster/Master"]
    ]);
}

/**
 * @name useLoadPrefetchLinks
 * @param {object} objContext takes objContext
 * @summary Loads the Prefetch link tags into the DOM.
 */
export function useLoadPrefetchLinks(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let arrNavigation = DataRef(objContext.props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
            LoadPrefetchLinksForNavigation(arrNavigation, objContext);
        }
    }, [objContext.state.isLoadComplete]);
}