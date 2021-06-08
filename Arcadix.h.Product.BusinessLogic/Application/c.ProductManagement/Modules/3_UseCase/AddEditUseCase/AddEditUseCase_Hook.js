// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditUseCase_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/3_UseCase/AddEditUseCase/AddEditUseCase_OfficeRibbon';
import * as AddEditUseCase_Tab from '@shared/Application/c.ProductManagement/Modules/3_UseCase/AddEditUseCase/AddEditUseCase_Tab';
import AddEditUseCase_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3_UseCase/AddEditUseCase/AddEditUseCase_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState(props) {
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : 0;
    let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
    let objData = props.Data.IsEdit ? objEditData : { ["uModuleId"]: props.Data.ModuleId  } ;
    return {
        objData: objData,
        objValidationMessages: {},
        strDivToShow: "UseCase",
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
    //useInitializeData(objContext);
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
        objContext.AddEditUseCase_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : [];
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        if (
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props)
            && (!objContext.props.Data.IsEdit || DataRef(objContext.props.Object_Cockpit_Workflow_AssignedWorkflow, "Object_Cockpit_Workflow_AssignedWorkflow;vObjectId;" + objEditData.uUseCaseId + ";uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"])
            && DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus, "Object_Cockpit_Workflow_WorkflowStatus;uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"]
            && !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props),
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
        var arrContentData = AddEditUseCase_Tab.GetAddEditUseCaseTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["uModuleId"]: objContext.props.Data.ModuleId } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditUseCase_ModuleProcessor = new AddEditUseCase_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditUseCase_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditUseCase_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditUseCase_OfficeRibbon.GetAddEditUseCaseOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

