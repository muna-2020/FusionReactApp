// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditAdditionalProperty_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AddEditAdditionalProperty/AddEditAdditionalProperty_OfficeRibbon';
import * as AddEditAdditionalProperty_Tab from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AddEditAdditionalProperty/AddEditAdditionalProperty_Tab';
import AddEditAdditionalProperty_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AddEditAdditionalProperty/AddEditAdditionalProperty_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "AdditionalProperty"
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
        var arrContentData = AddEditAdditionalProperty_Tab.GetAddEditAdditionalPropertyTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["AdditionalPropertyGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iAdditionalTaskPropertyId"]: objContext.props.Data.iAdditionalPropertyDependencyId, ["t_TestDrive_Task_AdditionalTaskProperty_Subject"]: [] } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditAdditionalProperty_ModuleProcessor = new AddEditAdditionalProperty_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditAdditionalProperty_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditAdditionalProperty_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditAdditionalProperty_OfficeRibbon.GetAddEditAddtionalPropertyOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

