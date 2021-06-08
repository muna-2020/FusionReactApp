// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditClientHostUrl_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/AddEditClientHostUrl/AddEditClientHostUrl_OfficeRibbon';
import * as AddEditClientHostUrl_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/AddEditClientHostUrl/AddEditClientHostUrl_Tab';
import AddEditClientHostUrl_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/AddEditClientHostUrl/AddEditClientHostUrl_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ClientHostUrl"
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
        var arrContentData = AddEditClientHostUrl_Tab.GetAddEditClientHostUrlTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClientHostUrlGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? { ...objEditData, ["iApplicationTypeId"]: objContext.props.Data.DropdownData.ApplicationTypeId, ["iMainClientId"]: objContext.props.Data.DropdownData.MainClientId } : { ["iClientId"]: objContext.props.Data.DropdownData.ClientId, ["iApplicationTypeId"]: objContext.props.Data.DropdownData.ApplicationTypeId, ["iMainClientId"]: objContext.props.Data.DropdownData.MainClientId } } });
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditClientHostUrl_ModuleProcessor = new AddEditClientHostUrl_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditClientHostUrl_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditClientHostUrl_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditClientHostUrl_OfficeRibbon.GetAddEditClientHostUrlOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData); 
    }, [objContext.state.objData]);   
}

