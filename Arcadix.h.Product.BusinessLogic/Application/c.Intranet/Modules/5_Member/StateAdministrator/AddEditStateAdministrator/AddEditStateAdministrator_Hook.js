// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditStateAdministrator_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/AddEditStateAdministrator/AddEditStateAdministrator_OfficeRibbon';
import * as AddEditStateAdministrator_Tab from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/AddEditStateAdministrator/AddEditStateAdministrator_Tab';
import AddEditStateAdministrator_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/AddEditStateAdministrator/AddEditStateAdministrator_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "StateAdministrator"
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
        var arrContentData = AddEditStateAdministrator_Tab.GetAddEditStateAdministratorTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["StateAdministratorGrid"]? ApplicationState.GetProperty("SelectedRows")["StateAdministratorGrid"] : []:[];
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iStateId"]: objContext.props.Data.DropdownData.StateDropdownSelectedValue, ["vPassword"]: '' } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditStateAdministrator_ModuleProcessor = new AddEditStateAdministrator_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditStateAdministrator_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditStateAdministrator_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditStateAdministrator_OfficeRibbon.GetAddEditStateAdministratorOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

