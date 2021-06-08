//React imports 
import { useEffect } from 'react';


/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        Tab: -1,//this value is 'iTaskDifficultyLevelId' from Task Difficulty Level Data, -1 -> all tab, -2 ->selected tab
        arrSelectedNumberOfTasksPerLevel: [],
        arrSelectedTasks: [],
        objPreviousData: {},
        objCurrentData: {},
        objNextData: {},
        blnShowVlaidationMessage: false,
        objPageJson: null
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useDataOnCurrentDataChange(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.EditTasks_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel, "Data") &&
            DataRef(objContext.props.Object_Extranet_Shared_OpenApplicationCredential, "FusionTestApplication") &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;iSchoolYear;" + objContext.props.Data.ClassDetails["iSchoolYear"] + ";cIsDeleted;N")) {
            if (objContext.props.Data.SelectedNumberOfTasksPerLevel.length > 0) {
                objContext.EditTasks_ModuleProcessor.ChangeTab(objContext, -2, objContext.props.Data.SelectedNumberOfTasksPerLevel);
            }
            else {
                let objCurrentTaskDifficultyLevelDataWithTasksDetails = {};
                let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
                let objNextTaskDifficultyLevelDataWithTasksDetails = {};
                let arrTaskDifficultyLevelDataWithTasks = objContext.EditTasks_ModuleProcessor.GetTaskDifficultyLevelDataWithTasks(objContext);
                if (arrTaskDifficultyLevelDataWithTasks.length > 0) {
                    let intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                    if (intIndex > -1) {
                        objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                        if (arrTaskDifficultyLevelDataWithTasks[intIndex]["NoOfTasks"] > 1) {
                            objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][1];
                        }
                        else {
                            arrTaskDifficultyLevelDataWithTasks = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== arrTaskDifficultyLevelDataWithTasks[intIndex]["iTaskDifficultyLevelId"]);
                            if (arrTaskDifficultyLevelDataWithTasks.length > 0) {
                                intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                                if (intIndex > -1) {
                                    objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                                }
                            }
                        }
                    }
                }
                objContext.dispatch({ type: "SET_STATE", payload: { "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "arrSelectedNumberOfTasksPerLevel": objContext.props.Data.SelectedNumberOfTasksPerLevel, isLoadComplete: true } });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.Object_Intranet_Task_TaskDifficultyLevel, objContext.props.Object_Extranet_Teacher_SchoolYear, objContext.props.Object_Extranet_Shared_OpenApplicationCredential]);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataOnCurrentDataChange(objContext) {
    useEffect(() => {
        if (objContext.state.objCurrentData["iPageId"])
            objContext.EditTasks_ModuleProcessor.GetPageJson(objContext, objContext.state.objCurrentData["iPageId"]);
    }, [
        objContext.state.objCurrentData
    ]);
}