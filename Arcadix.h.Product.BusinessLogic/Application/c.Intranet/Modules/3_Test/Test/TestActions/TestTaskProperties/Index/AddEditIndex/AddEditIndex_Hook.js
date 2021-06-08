// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditIndex_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/AddEditIndex/AddEditIndex_OfficeRibbon';
import * as AddEditIndex_Tab from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/AddEditIndex/AddEditIndex_Tab';

/**
* @name GetInitialState
* @summary Sets the initialState
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        objData: null,
        strDivToShow: "AddEditIndex"
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
        var arrContentData = AddEditIndex_Tab.GetAddEditIndexTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["IndexGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? { ...objEditData, "vAction": "Edit" } : {} } });
        //objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : {} } });
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
            "SaveMethod": () => objContext.AddEditIndex_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": (blnClose = true) => objContext.AddEditIndex_ModuleProcessor.SaveData(objContext, blnClose)
        };
        let arrRibbonData = AddEditIndex_OfficeRibbon.GetEditIndexOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state.objData]);
}

