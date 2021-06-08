// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditProductManagementUser_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/AddEditProductManagementUser/AddEditProductManagementUser_OfficeRibbon';
import * as AddEditProductManagementUser_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/AddEditProductManagementUser/AddEditProductManagementUser_Tab';
import AddEditProductManagementUser_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/AddEditProductManagementUser/AddEditProductManagementUser_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: [{}],
        objValidationMessages: {},
        strDivToShow: "ProductManagementUser"
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
        var arrContentData = AddEditProductManagementUser_Tab.GetAddEditProductManagementUserTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ProductManagementUserGrid"] : 0;
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
        let objAddEditProductManagementUser_ModuleProcessor = new AddEditProductManagementUser_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditProductManagementUser_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditProductManagementUser_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditProductManagementUser_OfficeRibbon.GetAddEditProductManagementUserOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

