// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditLanguage_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/Language/AddEditLanguage/AddEditLanguage_OfficeRibbon';
import * as AddEditLanguage_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/Language/AddEditLanguage/AddEditLanguage_Tab';
import AddEditLanguage_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/language/AddEditLanguage/AddEditLanguage_ModuleProcessor'

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Language"
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
        var arrContentData = AddEditLanguage_Tab.GetAddEditLanguageTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["LanguageGrid"];
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
        let objAddEditLanguage_ModuleProcessor = new AddEditLanguage_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditLanguage_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditLanguage_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditLanguage_OfficeRibbon.GetAddEditLanguageOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);   
}

