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
        DataRef(props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] &&
        DataRef(props.Object_Cockpit_Entity, "Object_Cockpit_Entity;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] &&
        DataRef(props.Object_Cockpit_EntityAccessLevel)["Data"] &&
        DataRef(props.Object_Cockpit_EntityPrivilege)["Data"] &&
        DataRef(props.Object_Cockpit_SystemPrivilege, "Object_Cockpit_SystemPrivilege;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
        DataRef(props.Object_Cockpit_Language)["Data"] &&
        DataRef(props.Object_Cockpit_ApplicationType)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
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
        objContext.Roles_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
            && DataRef(objContext.props.Object_Cockpit_Entity, "Object_Cockpit_Entity;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"]
            && DataRef(objContext.props.Object_Cockpit_EntityAccessLevel)["Data"]
            && DataRef(objContext.props.Object_Cockpit_EntityPrivilege)["Data"]
            && DataRef(objContext.props.Object_Cockpit_SystemPrivilege, "Object_Cockpit_SystemPrivilege;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] 
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"] 
            && DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [           
            objContext.props.Object_Cockpit_UserRole,       
            objContext.props.Object_Cockpit_Entity,
            objContext.props.Object_Cockpit_EntityAccessLevel,
            objContext.props.Object_Cockpit_EntityPrivilege,
            objContext.props.Object_Cockpit_SystemPrivilege, 
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.props.Object_Cockpit_Language,
            objContext.props.Object_Cockpit_ApplicationType,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles"],            
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
            objContext.Roles_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Roles_ModuleProcessor.SetRibbonData(objContext);
    }
}

