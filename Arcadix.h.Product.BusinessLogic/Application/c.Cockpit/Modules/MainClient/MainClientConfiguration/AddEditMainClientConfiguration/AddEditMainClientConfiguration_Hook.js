// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditMainClientConfiguration_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/AddEditMainClientConfiguration/AddEditMainClientConfiguration_OfficeRibbon';
import * as AddEditMainClientConfiguration_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/AddEditMainClientConfiguration/AddEditMainClientConfiguration_Tab';
import AddEditMainClientConfiguration_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/AddEditMainClientConfiguration/AddEditMainClientConfiguration_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "MainClientConfiguration"
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
 * @name useInitializeTabData
 * @param {object} objContext  objContext
 * @summary Setting up Content Data
 */
export function useInitializeTabData(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AddEditMainClientConfiguration_Tab.GetAddEditMainClientConfigurationTab(objContext, objData);
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
        let objEditData = arrSelectedRows.MainClientConfigurationGrid && arrSelectedRows.MainClientConfigurationGrid.length > 0 ? arrSelectedRows.MainClientConfigurationGrid[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : {} } });
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditMainClientConfiguration_ModuleProcessor = new AddEditMainClientConfiguration_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditMainClientConfiguration_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditMainClientConfiguration_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditMainClientConfiguration_OfficeRibbon.GetAddEditMainClientConfigurationOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);   
}

