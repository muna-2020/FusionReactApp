// React related imports.
import { useEffect } from 'react';


//Module related imports.
import * as AddEditClassType_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/AddEditClassType/AddEditClassType_OfficeRibbon';
import * as AddEditClassType_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/AddEditClassType/AddEditClassType_Tab';
import AddEditClassType_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/AddEditClassType/AddEditClassType_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ClassType"
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
        var arrContentData = AddEditClassType_Tab.GetAddEditClassTypeTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClassTypeGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iStateId"]: objContext.props.Data.DropdownData.StateDropdownSelectedValue} } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditClassType_ModuleProcessor = new AddEditClassType_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditClassType_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditClassType_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditClassType_OfficeRibbon.GetAddEditClassTypeOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

