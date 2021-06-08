// React related imports.
import { useEffect } from 'react';


//Module related imports.
import * as AddEditBusinessUnitTeam_OfficeRibbon from "@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/AddEditBusinessUnitTeam/AddEditBusinessUnitTeam_OfficeRibbon";
import * as AddEditBusinessUnitTeam_Tab from "@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/AddEditBusinessUnitTeam/AddEditBusinessUnitTeam_Tab";
import AddEditBusinessUnitTeam_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/AddEditBusinessUnitTeam/AddEditBusinessUnitTeam_ModuleProcessor";

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: [{}],
        objValidationMessages: {},
        strDivToShow: "BusinessUnitTeam"
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
        var arrContentData = AddEditBusinessUnitTeam_Tab.GetAddEditTeamTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["BusinessUnitTeamGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { "uBusinessUnitId": objContext.props.Data.BusinessUnitId, "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N" } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditBusinessUnitTeam_ModuleProcessor = new AddEditBusinessUnitTeam_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditBusinessUnitTeam_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditBusinessUnitTeam_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditBusinessUnitTeam_OfficeRibbon.GetAddEditTeamOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

