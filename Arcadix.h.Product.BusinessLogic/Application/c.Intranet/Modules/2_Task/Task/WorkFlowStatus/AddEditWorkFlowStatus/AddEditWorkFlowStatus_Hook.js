// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditWorkFlowStatus_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus_OfficeRibbon';
import * as AddEditWorkFlowStatus_Tab from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus_Tab';
import AddEditWorkFlowStatus_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "WorkFlow"
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
        var arrContentData = AddEditWorkFlowStatus_Tab.GetAddEditWorkFlowStatusTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["WorkFlowStatusGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["uWorkflowId"]: objContext.props.Data.intWorkFlowDropdownSelectedValue, ["cIsProductionReady"]:"N" } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditWorkFlowStatus_ModuleProcessor = new AddEditWorkFlowStatus_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditWorkFlowStatus_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditWorkFlowStatus_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditWorkFlowStatus_OfficeRibbon.GetAddEditWorkFlowOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

