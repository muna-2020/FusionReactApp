// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditHierarchy_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/AddEditHierarchy/AddEditHierarchy_OfficeRibbon';
import * as AddEditHierarchy_Tab from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/AddEditHierarchy/AddEditHierarchy_Tab';

/**
* @name GetInitialState
* @summary Sets the initialState
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "AddEditHierarchy"
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
        var arrContentData = AddEditHierarchy_Tab.GetAddEditHierarchyTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["HierarchyGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? { ...objEditData, "vAction": "Edit" } : { } } });
    }, []);
}

/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        var objData = {
            objContext,
            "SaveMethod": () => objContext.AddEditHierarchy_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": (blnClose = true) => objContext.AddEditHierarchy_ModuleProcessor.SaveData(objContext, blnClose)
        };
        let arrRibbonData = AddEditHierarchy_OfficeRibbon.GetEditHierarchyOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state.objData]);
}

