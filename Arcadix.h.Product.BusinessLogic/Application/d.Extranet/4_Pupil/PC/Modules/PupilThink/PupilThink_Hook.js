//React related imports.
import { useEffect } from 'react';

//objects required for module
import PupilThink_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let objPupilThink_ModuleProcessor = new PupilThink_ModuleProcessor();
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");//props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
    let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");//props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
    let strTeacherId = objPupilThink_ModuleProcessor.GetTeacherId(props);

    let arrDayData = [];
    let arrTimeData = [];
    let arrSubjectData = [];
    let arrSegmentData = [];
    let arrTopicData = [];
    let arrReviewCriteriaData = [];
    let arrSAOptionData = [];
    let objTextResource = undefined;

    if (
        DataRef(props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
        DataRef(props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilToPlan", props)
    ) {
        ApplicationState.SetProperty("DisplayFor", 4);
        let objResult = objPupilThink_ModuleProcessor.GetData({props});
        const objTeacher = DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"][0];
        ApplicationState.SetProperty("PupilToPlanTeacherDetails", objTeacher);

        blnIsLoadComplete = false;
        arrDayData = objResult.arrDayData;
        arrTimeData = objResult.arrTimeData;
        arrSubjectData = objResult.arrSubjectData;
        arrSegmentData = objResult.arrSegmentData;
        arrTopicData = objResult.arrTopicData;
        arrReviewCriteriaData = objResult.arrReviewCriteriaData;
        arrSAOptionData = objResult.arrSAOptionData;                  
        objTextResource = objResult.objTextResource;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strClassId: strClassId,
        strSchoolId: strSchoolId,
        arrDayData: arrDayData,
        arrTimeData: arrTimeData,
        arrSubjectData: arrSubjectData,
        arrSegmentData: arrSegmentData,
        arrTopicData: arrTopicData,
        arrReviewCriteriaData: arrReviewCriteriaData,
        arrSAOptionData: arrSAOptionData,
        objTextResource: objTextResource,
        objSelectedSchoolYear: undefined
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks for loading the data 
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
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilThink_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let strTeacherId = objContext.PupilThink_ModuleProcessor.GetTeacherId(objContext.props);
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilToPlan", objContext.props)
        ) {
            ApplicationState.SetProperty("DisplayFor", 4);
            let objResult = objContext.PupilThink_ModuleProcessor.GetData(objContext);
            const objTeacher = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"][0];
            ApplicationState.SetProperty("PupilToPlanTeacherDetails", objTeacher);
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    isLoadComplete: true,
                    strClassId: strClassId,
                    strSchoolId: strSchoolId,
                    arrDayData: objResult.arrDayData,
                    arrTimeData: objResult.arrTimeData,
                    arrSubjectData: objResult.arrSubjectData,
                    arrSegmentData: objResult.arrSegmentData,
                    arrTopicData: objResult.arrTopicData,
                    arrReviewCriteriaData: objResult.arrReviewCriteriaData,
                    arrSAOptionData: objResult.arrSAOptionData,                    
                    objTextResource: objResult.objTextResource
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    },
        [
            objContext.props.Object_Extranet_Teacher_TimeTableDay,
            objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption,
            objContext.props.Object_Extranet_Teacher_ReviewCriteria,
            objContext.props.Object_Extranet_School_TimeTableClassTime,
            objContext.props.Object_Intranet_Taxonomy_Subject,
            objContext.props.Object_Extranet_Teacher_TimeTableSegment,
            objContext.props.Object_Extranet_Teacher_Topic,
            objContext.props.Object_Extranet_Teacher_Teacher,
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilToPlan"]
        ]);
}