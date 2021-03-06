// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditImplementationStep_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/AddEditImplementationStep/AddEditImplementationStep_OfficeRibbon';
import * as AddEditImplementationStep_Tab from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/AddEditImplementationStep/AddEditImplementationStep_Tab';
import AddEditImplementationStep_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/AddEditImplementationStep/AddEditImplementationStep_ModuleProcessor';


/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ImplementationStep",
        arrImplementationStepLayerTaskType: [],
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
        objContext.AddEditImplementationStep_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"] : [];
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        if (
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props) &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"] &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer)["Data"] 
            && (!objContext.props.Data.IsEdit || DataRef(objContext.props.Object_Cockpit_Workflow_AssignedWorkflow, "Object_Cockpit_Workflow_AssignedWorkflow;vObjectId;" + objEditData.uUseCaseImplementationStepId + ";uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"])
            && DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus, "Object_Cockpit_Workflow_WorkflowStatus;uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"]
            //DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep)["Data"] &&
            && !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
            objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType,
            objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer,
            objContext.props.Object_Cockpit_Workflow_AssignedWorkflow,
            objContext.props.Object_Cockpit_Workflow_WorkflowStatus,
            //objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep,
        objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props)
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
        var arrContentData = AddEditImplementationStep_Tab.GetAddEditImplementationStepTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        if (objContext.props.Data.IsEdit) {
            let arrImplementationStepLayerTaskType = [];
            try {
                let objImplementationStepTaskTypeData = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"].filter((objData) => objData["uImplementationStepLayerTaskTypeId"] == objEditData["uImplementationStepLayerTaskTypeId"])[0];
                let objImplementationStepLayer = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer)["Data"].filter((objData) => objData["uImplementationStepLayerId"] == objImplementationStepTaskTypeData["uImplementationStepLayerId"])[0];
                objEditData["uImplementationStepLayerId"] = objImplementationStepLayer["uImplementationStepLayerId"];
                DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"].map((objImplementationStepLayerTaskType) => {
                    if (objImplementationStepLayerTaskType["uImplementationStepLayerId"] == objEditData["uImplementationStepLayerId"]) {
                        arrImplementationStepLayerTaskType = [...arrImplementationStepLayerTaskType, objImplementationStepLayerTaskType];
                    }
                })                
            }
            catch(err){

            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrImplementationStepLayerTaskType": arrImplementationStepLayerTaskType } });
            //objEditData["uImplementationStepLayerTaskTypeId"] = objImplementationStepLayer["uImplementationStepLayerTaskTypeId"];
        }
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
        let objAddEditImplementationStep_ModuleProcessor = new AddEditImplementationStep_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditImplementationStep_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditImplementationStep_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditImplementationStep_OfficeRibbon.GetAddEditImplementationStepOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

