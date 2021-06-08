// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AssignPrivilegeToRoles_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/AssignPrivilegeToRoles/AssignPrivilegeToRoles_OfficeRibbon';
import * as AssignPrivilegeToRoles_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/AssignPrivilegeToRoles/AssignPrivilegeToRoles_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "Privileges",
        strApplicationTypeId: JConfiguration.ApplicationTypeName == "ProductManagement" ? JConfiguration.ApplicationTypeId : "",
        strApplicationTypeName: JConfiguration.ApplicationTypeName == "ProductManagement" ? "ProductManagement" : "",
        blnAccessAllNavigations: false,
        blnIsSystemRole: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useInitializeData(objContext);
    useInitializeTabData(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useInitializeTabs
 * @param {object} objContext  objContext
 * @summary Setting up Content Data
 */
export function useInitializeTabData(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AssignPrivilegeToRoles_Tab.GetAssignPrivilegeToRolesTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {

    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["RolesGrid"] : [];
        let objData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        let arrNavigations = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.state.strApplicationTypeId)?.["Data"]?.[0]?.[objContext.state.strApplicationTypeName] ?? [];
        let blnAccessAllNavigations = arrNavigations.length == objData.t_Framework_MainClient_UserRole_Navigation?.length ? true : false;
        let blnIsSystemRole = objData["cIsSystemRole"] == "Y";
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objData, "blnAccessAllNavigations": blnAccessAllNavigations, "blnIsSystemRole": blnIsSystemRole} });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        var objData = {
            objContext,
            "SaveMethod": () => objContext.AssignPrivilegeToRoles_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objContext.AssignPrivilegeToRoles_ModuleProcessor.SaveData(objContext, true),
            "ClosePopup": () => Popup.ClosePopup(objContext.props.Id)
        };
        let objRibbonData = AssignPrivilegeToRoles_OfficeRibbon.GetAssignPrivilegeToRolesOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData, objContext.state.blnIsSystemRole]);
}