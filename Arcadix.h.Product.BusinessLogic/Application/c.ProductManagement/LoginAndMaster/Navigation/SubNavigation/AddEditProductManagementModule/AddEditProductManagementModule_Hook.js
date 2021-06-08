// React related impoprts.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditProductManagementModule_OfficeRibbon from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/AddEditProductManagementModule/AddEditProductManagementModule_OfficeRibbon';
import * as AddEditProductManagementModule_Tab from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/AddEditProductManagementModule/AddEditProductManagementModule_Tab';
import AddEditProductManagementModule_ModuleProcessor from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/AddEditProductManagementModule/AddEditProductManagementModule_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        strDivToShow: "ProductManagementModule",
        objValidationMessages: {}
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
        var arrContentData = AddEditProductManagementModule_Tab.GetAddEditProductManagementModuleTab(objContext, objData);
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
        let objEditData = objContext.props.Data.SelectedNode;
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : objContext.AddEditProductManagementModule_ModuleProcessor.GetInitilaData(objContext) } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditProductManagementModule_ModuleProcessor = new AddEditProductManagementModule_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditProductManagementModule_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditProductManagementModule_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditProductManagementModule_OfficeRibbon.GetAddEditProductManagementModuleOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}