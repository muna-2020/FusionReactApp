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
        DataRef(props.Object_Intranet_Member_IntranetAdministrator)["Data"]
        && DataRef(props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
        && DataRef(props.Object_Cockpit_BusinessUnitTeam, "Object_Cockpit_BusinessUnitTeam;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
        && DataRef(props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/IntranetAdministrator", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strMainClientId: props.ClientUserDetails.MainClientId == 0 && props.ClientUserDetails.ApplicationTypeId == 7 ? -1 : props.ClientUserDetails.MainClientId
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
        objContext.IntranetAdministrator_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"]
            && DataRef(objContext.props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
            && DataRef(objContext.props.Object_Cockpit_BusinessUnitTeam, "Object_Cockpit_BusinessUnitTeam;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
            && DataRef(objContext.props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/IntranetAdministrator", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_Intranet_Member_IntranetAdministrator,
            objContext.props.Object_Cockpit_BusinessUnit,
            objContext.props.Object_Cockpit_BusinessUnitTeam,
            objContext.props.Object_Cockpit_UserRole,
            Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/IntranetAdministrator", objContext.props),
            objContext.props.Object_Cockpit_Language,
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage
    ]);
}


/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        objContext.IntranetAdministrator_ModuleProcessor.SetRibbonData(objContext);
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.IntranetAdministrator_ModuleProcessor.SetRibbonData(objContext);
    }
}

/**
 * @name useResetGridSelection
 * @param {object} objContext objContext
 * @summary To Reset the Grid Row selection.
 */
export function useResetGridSelection(objContext) {
    useEffect(() => {
        objContext.IntranetAdministrator_ModuleProcessor.ResetGridSelection("IntranetAdministratorGrid");
    }, [objContext.state.strMainClientId])
}