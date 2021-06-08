// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
        DataRef(props.Object_Cockpit_Language)["Data"] &&
        DataRef(props.Object_Intranet_Task_TaskDifficultyLevel)["Data"] &&
        DataRef(props.Object_Cockpit_Workflow_WorkflowType)["Data"] &&
        DataRef(props.Object_Cockpit_Workflow_Workflow)["Data"] &&
        DataRef(props.Object_Cockpit_Workflow_WorkflowStatus)["Data"] &&
        //check
        DataRef(props.Object_Intranet_Taxonomy_Subject)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Category)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_CompetencyRange)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_CompetencyLevel)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Intermediate)["Data"] &&
        DataRef(props.Object_Intranet_Task_TaskAdditionalProperty)["Data"] &&
        DataRef(props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"] &&
        DataRef(props.Object_Intranet_Member_IntranetAdministrator)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_ClientSettings)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYear)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYear)["Data"] &&
        DataRef(props.Object_Intranet_Test_SeparationAndCalibrationTask)["Data"] &&
        DataRef(props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"] &&
        DataRef(props.Object_Intranet_Test_InputStatus)["Data"] &&
        DataRef(props.Object_Cockpit_Skin)["Data"] 
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
    }
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.PropertyDisplay_ModuleProcessor.LoadInitialData(objContext);
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

        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyRange)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyLevel)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Intermediate)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalProperty)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"] &&      
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationTask)["Data"] && 
            DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"] && 
            DataRef(objContext.props.Object_Intranet_Test_InputStatus)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Skin)["Data"] && 
            !objContext.state.isLoadComplete

        ) {
            //To set state data after the load is complete            
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [        
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
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Intranet_Test_SeparationAndCalibrationTask,
        objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup,
        objContext.props.Object_Intranet_Test_InputStatus,
        objContext.props.Object_Cockpit_Skin
    ]);
}