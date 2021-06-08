// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditCycle_OfficeRibbon from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AddEditCycle/AddEditCycle_OfficeRibbon';
import * as AddEditCycle_Tab from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AddEditCycle/AddEditCycle_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "BaseData"
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
        var arrContentData = AddEditCycle_Tab.GetAddEditCycleTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CycleGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : objContext.AddEditCycle_ModuleProcessor.GetInitialData() } });
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
            "SaveMethod": () => objContext.AddEditCycle_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objContext.AddEditCycle_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditCycle_OfficeRibbon.GetAddEditCycleOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

