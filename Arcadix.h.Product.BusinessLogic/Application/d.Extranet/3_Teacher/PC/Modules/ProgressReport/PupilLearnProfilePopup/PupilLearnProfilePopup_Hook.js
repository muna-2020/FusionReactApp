//React imports 
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        baloonSubjectId: -1,
        objResult: {
            strTestPoints: "",
            dtTestExecution: '',
            CompetencyLevel: "",
            blnCalculationOver: false, //this is done as after the calculation is finished the jsx need to rerender to display the changes. after calculation, the state is set true.
            //arrTestStastics: []
        },
        //arrTestStastics: [],
        arrFormLinesSubjectData: [],

        arrCompetencyInterval: [] 
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
    useLearningTestStatistics(objContext);
}

/**
* @name useDataLoader
* @param {object} objContext objContext
* @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilLearnProfilePopup_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Extranet_Pupil_LearnProfile_Module)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
            objContext.state.arrTestStastics
            //objContext.state.objResult.arrTestStastics
        ) {
            let arrSubjectData = DataRef(objContext.props.Extranet_Pupil_LearnProfile_Module)["Data"];
            let arrFormLinesSubjectData = objContext.PupilLearnProfilePopup_ModuleProcessor.FormLines(objContext, arrSubjectData);

            let arrCompetencyInterval = ["", "I", "II", "III", "IV", "V", "VI"];
            let blnShowSevenCompetencies = ClientUserDetails.MainClientId == "97";
            if (blnShowSevenCompetencies) {
                arrCompetencyInterval = [...arrCompetencyInterval, "VII"];
            }
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, arrFormLinesSubjectData: arrFormLinesSubjectData, blnShowSixCompetencies: blnShowSevenCompetencies, arrCompetencyInterval } });
            
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
            objContext.props.Extranet_Pupil_LearnProfile_Module,
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
            objContext.state.arrTestStastics
    ]);
}

export function useLearningTestStatistics(objContext) {
    useEffect(() => {
        objContext.PupilLearnProfilePopup_ModuleProcessor.GetLearningTestStatistics(objContext);
    }, []);
}