// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditCountry_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/Country/AddEditCountry/AddEditCountry_OfficeRibbon';
import * as AddEditCountry_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/Country/AddEditCountry/AddEditCountry_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Country"
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {    
    useInitializeTabs(objContext);
    useInitializeData(objContext);
    useInitializeRibbon(objContext);
}

/**
 * @name useInitializeTabs
 * @param {object} objContext  objContext
 * @summary Setting up Content Data
 */
export function useInitializeTabs(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AddEditCountry_Tab.GetAddEditCountryTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["CountryGrid"];
    let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : {} } });
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useInitializeRibbon(objContext) {
    useEffect(() => {
        var objData = {
            objContext,
            "SaveMethod": () => objContext.AddEditCountry_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objContext.AddEditCountry_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditCountry_OfficeRibbon.GetAddEditCountryOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);   
}

