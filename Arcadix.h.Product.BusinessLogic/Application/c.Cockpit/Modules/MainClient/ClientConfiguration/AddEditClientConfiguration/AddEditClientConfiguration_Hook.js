// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditClientConfiguration_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/AddEditClientConfiguration/AddEditClientConfiguration_OfficeRibbon';
import * as AddEditClientConfiguration_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/AddEditClientConfiguration/AddEditClientConfiguration_Tab';
import AddEditClientConfiguration_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/AddEditClientConfiguration/AddEditClientConfiguration_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ClientConfiguration"
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

export function useInitializeData(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["ClientConfigurationGrid"];
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : {} } });
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext takes objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeTabData(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AddEditClientConfiguration_Tab.GetAddEditClientConfigurationTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
        
    }, []);
}

export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditClientConfiguration_ModuleProcessor = new AddEditClientConfiguration_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditClientConfiguration_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditClientConfiguration_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditClientConfiguration_OfficeRibbon.GetAddEditClientConfigurationOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}