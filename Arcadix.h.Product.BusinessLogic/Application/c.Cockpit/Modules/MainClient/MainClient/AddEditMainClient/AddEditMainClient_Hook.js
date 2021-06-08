// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditMainClient_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/AddEditMainClient/AddEditMainClient_OfficeRibbon';
import * as AddEditMainClient_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/AddEditMainClient/AddEditMainClient_Tab';
import AddEditMainClient_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/AddEditMainClient/AddEditMainClient_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "MainClient"
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
        var arrContentData = AddEditMainClient_Tab.GetAddEditMainClientTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    let objEditData = arrSelectedRows.MainClientGrid && arrSelectedRows.MainClientGrid.length > 0 ? arrSelectedRows.MainClientGrid[0] : {};
    useEffect(() => {
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
        let objAddEditMainClient_ModuleProcessor = new AddEditMainClient_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditMainClient_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditMainClient_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditMainClient_OfficeRibbon.GetAddEditMainClientOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);   
}

