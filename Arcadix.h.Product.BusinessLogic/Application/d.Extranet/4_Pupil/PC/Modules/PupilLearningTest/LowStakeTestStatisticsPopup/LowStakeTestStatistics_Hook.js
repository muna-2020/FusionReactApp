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
        blnAllTasks: false,
        objTestStatistics: {}
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
        objContext.LowStakeTestStatistics_ModuleProcessor.LoadInitialData(objContext);
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
            DataRef(objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module, "Extranet_Pupil_PupilLearningTestStatistics_Module;uTestId;" + objTest.uTestId)["Data"]
        ) {
            //let arrTestStatisticData = DataRef(objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module)["Data"];
            //if (Object.keys(objContext.state.objTestStatistics).length > 0) {
            //    objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, arrTaskData: arrTestStatisticData } });
            //}
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module,
        objContext.state.objTestStatistics
    ]);
}
