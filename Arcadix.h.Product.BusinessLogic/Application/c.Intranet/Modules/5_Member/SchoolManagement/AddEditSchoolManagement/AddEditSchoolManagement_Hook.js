// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditSchoolManagement_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement_OfficeRibbon';
import * as AddEditSchoolManagement_Tab from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement_Tab';
import AddEditSchoolManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ClassManagment",
        blnIsSaveClicked: false
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
        var arrContentData = AddEditSchoolManagement_Tab.GetAddEditSchoolManagmentTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolManagementGrid"]?ApplicationState.GetProperty("SelectedRows")["SchoolManagementGrid"] : []:[];
        let objEditData = arrSelectedRows.length > 0 ? arrSelectedRows[0]:arrSelectedRows ? arrSelectedRows : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iStateId"]: objContext.props.Data.DropdownData.StateDropdownSelectedValue, ["vPassword"]: '', ["cIsTestSchool"]: "N", ["cIsStellwerk"]: "N" } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditSchoolManagement_ModuleProcessor = new AddEditSchoolManagement_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditSchoolManagement_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditSchoolManagement_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditSchoolManagement_OfficeRibbon.GetAddEditSchoolManagmentOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

