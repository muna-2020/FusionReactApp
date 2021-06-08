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
        strTestName: "",
        arrSelectedNumberOfTasksPerLevel: [],
        blnShowVlaidationMessage: false,
        blnShowValidationBorderForTestName: false,
        blnDisableTextBoxes:false
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
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.LearningTestSettings_ModuleProcessor.LoadInitialData(objContext);
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
            DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;iSchoolYear;" + objContext.props.Data.ClassDetails["iSchoolYear"] + ";cIsDeleted;N")) {
            objContext.dispatch({ type: "SET_STATE", payload: { "strTestName": objContext.props.Data.TestName, "arrSelectedNumberOfTasksPerLevel": objContext.props.Data.SelectedNumberOfTasksPerLevel, isLoadComplete: true } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.Object_Intranet_Task_TaskDifficultyLevel, objContext.props.Object_Extranet_Teacher_SchoolYear]);
};