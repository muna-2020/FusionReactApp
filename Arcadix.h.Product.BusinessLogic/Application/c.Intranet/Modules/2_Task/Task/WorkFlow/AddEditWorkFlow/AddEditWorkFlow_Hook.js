// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditWorkFlow_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow_OfficeRibbon';
import * as AddEditWorkFlow_Tab from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow_Tab';
import AddEditWorkFlow_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Workflow",
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
        var arrContentData = AddEditWorkFlow_Tab.GetAddEditWorkFlowTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["WorkFlowGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? { ...objEditData, ["iMainClientId"]: objContext.props.ParentProps.ClientUserDetails.MainClientId } : { ["uWorkflowTypeId"]: objContext.props.Data.DropdownData.strWorkflowTypeId, ["iMainClientId"]: objContext.props.ParentProps.ClientUserDetails.MainClientId } } });
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditWorkFlow_ModuleProcessor = new AddEditWorkFlow_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditWorkFlow_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditWorkFlow_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditWorkFlow_OfficeRibbon.GetAddEditWorkFlowOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

