// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditCategoryCompetency_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/AddEditCategoryCompetency/AddEditCategoryCompetency_OfficeRibbon';
import * as AddEditCategoryCompetency_Tab from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/AddEditCategoryCompetency/AddEditCategoryCompetency_Tab';
import AddEditCategoryCompetency_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/AddEditCategoryCompetency/AddEditCategoryCompetency_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "CategoryCompetency"
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
        var arrContentData = AddEditCategoryCompetency_Tab.GetAddEditCategoryCompetencyTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CategoryCompetencyGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iCategoryId"]: objContext.props.Data.CategoryDropdownSelectedValue } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditCategoryCompetency_ModuleProcessor = new AddEditCategoryCompetency_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditCategoryCompetency_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditCategoryCompetency_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditCategoryCompetency_OfficeRibbon.GetAddEditCategoryCompetencyOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

