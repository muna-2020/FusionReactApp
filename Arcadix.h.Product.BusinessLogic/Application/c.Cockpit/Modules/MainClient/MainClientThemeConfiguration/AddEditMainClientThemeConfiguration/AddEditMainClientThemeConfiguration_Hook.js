// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditMainClientThemeConfiguration_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/AddEditMainClientThemeConfiguration/AddEditMainClientThemeConfiguration_OfficeRibbon';
import * as AddEditMainClientThemeConfiguration_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/AddEditMainClientThemeConfiguration/AddEditMainClientThemeConfiguration_Tab';
import AddEditMainClientThemeConfiguration_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/AddEditMainClientThemeConfiguration/AddEditMainClientThemeConfiguration_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "MainClientThemeConfiguration"
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
        var arrContentData = AddEditMainClientThemeConfiguration_Tab.GetAddEditMainClientThemeConfigurationTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        let objEditData = arrSelectedRows.MainClientThemeConfigurationGrid && arrSelectedRows.MainClientThemeConfigurationGrid.length > 0 ? arrSelectedRows.MainClientThemeConfigurationGrid[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["vSuperPassword"]: "", ["vSecondSuperPassword"]: "", ["vTestApplicationVersion"]: "" } } });
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditMainClientThemeConfiguration_ModuleProcessor = new AddEditMainClientThemeConfiguration_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditMainClientThemeConfiguration_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditMainClientThemeConfiguration_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditMainClientThemeConfiguration_OfficeRibbon.GetAddEditMainClientThemeConfigurationOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);   
}

