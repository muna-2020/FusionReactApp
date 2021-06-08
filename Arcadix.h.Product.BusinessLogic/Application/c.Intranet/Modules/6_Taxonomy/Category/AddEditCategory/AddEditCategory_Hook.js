// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditCategory_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/AddEditCategory/AddEditCategory_OfficeRibbon';
import * as AddEditCategory_Tab from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/AddEditCategory/AddEditCategory_Tab';
import AddEditCategory_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/AddEditCategory/AddEditCategory_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Category"
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
        var arrContentData = AddEditCategory_Tab.GetAddEditCategoryTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CategoryGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iSubjectId"]: objContext.props.Data.SubSubjectDropdownSelectedValue } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditCategory_ModuleProcessor = new AddEditCategory_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditCategory_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditCategory_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditCategory_OfficeRibbon.GetAddEditCategoryOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

