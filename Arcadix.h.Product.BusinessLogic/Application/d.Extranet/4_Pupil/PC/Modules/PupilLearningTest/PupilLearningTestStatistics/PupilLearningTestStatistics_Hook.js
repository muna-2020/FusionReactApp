//React imports 
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary returns the component initial state
 * @returns {object} Initial State
 * */
export function GetInitialState() {
    return {
        arrTaskData: [],
        isLoadComplete: false,
        OpenTestInPopup: "Y",
        blnAllTasks: false
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
* @name useDataLoader
* @param {object} objContext objContext
* @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilLearningTestStatistics_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}


/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        let { objTest } = objContext.props.Data
        if (!objContext.state.isLoadComplete &&
            // DataRef(objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module, "Object_Intranet_Test_ExtranetTest;uClassId;" + strClassId + ";uPupilId;" + strPupilId + ";iCycleTypeId;" + strCycleTypeId)["Data"] &&
            DataRef(objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module, "Extranet_Pupil_PupilLearningTestStatistics_Module;uTestId;" + objTest.uTestId)["Data"]

        ) {
            let arrTestStatisticData = DataRef(objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module, "Extranet_Pupil_PupilLearningTestStatistics_Module;uTestId;" + objTest.uTestId)["Data"];
            //ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, arrTaskData: arrTestStatisticData } });
        }
    }, [
        objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module
    ]);
}
