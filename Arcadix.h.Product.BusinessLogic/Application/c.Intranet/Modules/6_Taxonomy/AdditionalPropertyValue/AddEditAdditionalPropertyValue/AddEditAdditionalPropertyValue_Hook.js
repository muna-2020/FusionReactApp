// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditAdditionalPropertyValue_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AddEditAdditionalPropertyValue/AddEditAdditionalPropertyValue_OfficeRibbon';
import * as AddEditAdditionalPropertyValue_Tab from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AddEditAdditionalPropertyValue/AddEditAdditionalPropertyValue_Tab';
import AddEditAdditionalPropertyValue_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AddEditAdditionalPropertyValue/AddEditAdditionalPropertyValue_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "AdditionalPropertyValue"
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
        var arrContentData = AddEditAdditionalPropertyValue_Tab.GetAddEditAdditionalPropertyValueTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["AdditionalPropertyValueGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iDependencyId"]: objContext.props.Data.strDependentValue, ["iAdditionalTaskPropertyId"]: objContext.props.Data.strAdditionalTaskPropertyId } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditAdditionalPropertyValue_ModuleProcessor = new AddEditAdditionalPropertyValue_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditAdditionalPropertyValue_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditAdditionalPropertyValue_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditAdditionalPropertyValue_OfficeRibbon.GetAddEditAdditionalPropertyValueOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

