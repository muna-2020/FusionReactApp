// React related imports.
import { useEffect, useLayoutEffect } from 'react';


/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objModuleProcessor, objContext) {
    useLayoutEffect(() => {
        objModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }

        if (
            //DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
            //DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&
            //DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"] &&
            //DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"] &&
            //DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyRange)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyLevel)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Intermediate)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalProperty)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"] &&
            //DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationTask)["Data"] &&
            //DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"] &&
            //DataRef(objContext.props.Object_Intranet_Test_InputStatus)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Skin)["Data"] &&   
            objContext.state.objData &&
            !objContext.state.isLoadComplete

        ) {
            //To set state data after the load is complete            
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        //objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        //objContext.props.Object_Cockpit_Language,
        //objContext.props.Object_Cockpit_Workflow_WorkflowStatus,
        //objContext.props.Object_Cockpit_Workflow_Workflow,
        //objContext.props.Object_Cockpit_Workflow_WorkflowType,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Intranet_Taxonomy_Category,
        objContext.props.Object_Intranet_Taxonomy_CategoryCompetency,
        objContext.props.Object_Intranet_Taxonomy_CompetencyRange,
        objContext.props.Object_Intranet_Taxonomy_CompetencyLevel,
        objContext.props.Object_Intranet_Taxonomy_Intermediate,
        objContext.props.Object_Intranet_Task_TaskAdditionalProperty,
        objContext.props.Object_Intranet_Task_TaskAdditionalPropertyValue,
        objContext.props.Object_Intranet_Member_IntranetAdministrator,
        objContext.props.Object_Cockpit_MainClient_ClientSettings,
        objContext.props.Object_Intranet_Task_TaskDifficultyLevel,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        //objContext.props.Object_Intranet_Test_SeparationAndCalibrationTask,
        //objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup,
        //objContext.props.Object_Intranet_Test_InputStatus,
        objContext.props.Object_Cockpit_Skin,
        objContext.state.objData
    ]);
}