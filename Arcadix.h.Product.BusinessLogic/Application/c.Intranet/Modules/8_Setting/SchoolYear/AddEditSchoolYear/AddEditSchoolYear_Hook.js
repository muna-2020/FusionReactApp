// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditSchoolYear_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/AddEditSchoolYear/AddEditSchoolYear_OfficeRibbon';
import * as AddEditSchoolYear_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/AddEditSchoolYear/AddEditSchoolYear_Tab';
import AddEditSchoolYear_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/AddEditSchoolYear/AddEditSchoolYear_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "SchoolYear"
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
        var arrContentData = AddEditSchoolYear_Tab.GetAddEditSchoolYearTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolYearGrid"] : 0;
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
        let objAddEditSchoolYear_ModuleProcessor = new AddEditSchoolYear_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditSchoolYear_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditSchoolYear_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditSchoolYear_OfficeRibbon.GetAddEditSchoolYearOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

