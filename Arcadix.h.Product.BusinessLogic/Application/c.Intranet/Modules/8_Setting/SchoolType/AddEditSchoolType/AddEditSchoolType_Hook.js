// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditSchoolType_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolType/AddEditSchoolType/AddEditSchoolType_OfficeRibbon';
import * as AddEditSchoolType_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolType/AddEditSchoolType/AddEditSchoolType_Tab';
import AddEditSchoolType_ModuleProcess from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolType/AddEditSchoolType/AddEditSchoolType_ModuleProcess';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "SchoolType"
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
        var arrContentData = AddEditSchoolType_Tab.GetAddEditSchoolTypeTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolTypeGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : {} } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditSchoolType_ModuleProcess = new AddEditSchoolType_ModuleProcess(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditSchoolType_ModuleProcess.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditSchoolType_ModuleProcess.SaveData(objContext, true)
        };
        let objRibbonData = AddEditSchoolType_OfficeRibbon.GetAddEditSchoolTypeOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

