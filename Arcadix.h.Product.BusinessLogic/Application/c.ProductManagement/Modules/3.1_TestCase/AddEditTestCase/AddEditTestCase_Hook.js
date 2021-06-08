// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditTestCase_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/3.1_TestCase/AddEditTestCase/AddEditTestCase_OfficeRibbon';
import * as AddEditTestCase_Tab from '@shared/Application/c.ProductManagement/Modules/3.1_TestCase/AddEditTestCase/AddEditTestCase_Tab';
import AddEditTestCase_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3.1_TestCase/AddEditTestCase/AddEditTestCase_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "TestCase",
        isLoadComplete: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useInitializeData(objContext);
    useInitializeTabData(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.AddEditTestCase_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"] : [];
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        if (
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props)
            && (!objContext.props.Data.IsEdit || DataRef(objContext.props.Object_Cockpit_Workflow_AssignedWorkflow, "Object_Cockpit_Workflow_AssignedWorkflow;vObjectId;" + objEditData.uTestCaseId + ";uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"])
            && DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus, "Object_Cockpit_Workflow_WorkflowStatus;uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"]
            && !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props),
            objContext.props.Object_Cockpit_Workflow_AssignedWorkflow,
            objContext.props.Object_Cockpit_Workflow_WorkflowStatus,
    ]);
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
        var arrContentData = AddEditTestCase_Tab.GetAddEditTestCaseTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, [objContext.state]);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {

    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["uUseCaseId"]: objContext.props.Data.UseCaseId } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditTestCase_ModuleProcessor = new AddEditTestCase_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditTestCase_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditTestCase_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditTestCase_OfficeRibbon.GetAddEditTestCaseOfficeRibbonData(objData, objContext);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData, objContext.state]);
}

