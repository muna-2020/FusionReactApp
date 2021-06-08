// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditClient_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/Client/AddEditClient/AddEditClient_OfficeRibbon';
import * as AddEditClient_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/Client/AddEditClient/AddEditClient_Tab';
import AddEditClient_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/Client/AddEditClient/AddEditClient_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Client"
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
        var arrContentData = AddEditClient_Tab.GetAddEditClientTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClientGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iApplicationTypeId"]: objContext.props.Data.DropDownData.ApplicationId, ["iMainClientId"]: objContext.props.Data.DropDownData.MainClientId, ["vPageTitle"]: "", ["iAgeOfAudienceId"]: "" } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditClient_ModuleProcessor = new AddEditClient_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditClient_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditClient_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditClient_OfficeRibbon.GetAddEditClientOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);   
}

