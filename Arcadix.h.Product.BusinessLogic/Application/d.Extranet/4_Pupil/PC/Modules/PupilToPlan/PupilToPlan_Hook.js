//React related imports.
import { useEffect } from 'react';

//objects required for module
import PupilToPlan_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objPupilToPlan_ModuleProcessor = new PupilToPlan_ModuleProcessor();
    let strClassId = objPupilToPlan_ModuleProcessor.GetClassId(props);
    let objClassPupil = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(x => x["uClassId"] == strClassId);
    let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");//objClassPupil.uSchoolId;
    let strTeacherId = objPupilToPlan_ModuleProcessor.GetTeacherId(props);

    let arrDayData = [];
    let arrTimeData = [];
    let arrSubjectData = [];
    let arrSegmentData = [];
    let arrAllSegmentData = [];
    let arrTopicData = [];
    let arrReviewCriteriaData = [];
    let arrSAOptionData = [];
    let objTextResource = undefined;

    if (
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilToPlan", props)
    ) {
        const objTeacher = DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"][0];
        ApplicationState.SetProperty("PupilToPlanTeacherDetails", objTeacher);
        let objResult = objPupilToPlan_ModuleProcessor.GetData({ props });
        let iDisplayFor = ApplicationState.GetProperty("DisplayFor");
        if (iDisplayFor != 1 && iDisplayFor != 5) {
            ApplicationState.SetProperty("DisplayFor", 2);
        }
        arrDayData = objResult.arrDayData;
        arrTimeData = objResult.arrTimeData;
        arrSubjectData = objResult.arrSubjectData;
        arrSegmentData = objResult.arrSegmentData;
        arrAllSegmentData = objResult.arrSegmentData;
        arrTopicData = objResult.arrTopicData;
        arrReviewCriteriaData = objResult.arrReviewCriteriaData;
        arrSAOptionData = objResult.arrSAOptionData;
        objTextResource = objResult.objTextResource;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strClassId: strClassId,
        strSchoolId: strSchoolId,
        arrEventSectionData: [],
        strType: 'Week',
        initialDataLoaded: false,
        arrWeekDays: [],
        arrWeekDayMonth: [],
        arrDayData: arrDayData,
        arrEventDisplayData: [],
        dateComponentLoaded: false,
        arrTimeData: arrTimeData,
        arrSubjectData: arrSubjectData,
        arrSegmentData: arrSegmentData,
        arrAllSegmentData: arrAllSegmentData,
        arrTopicData: arrTopicData,
        arrReviewCriteriaData: arrReviewCriteriaData,
        arrSAOptionData: arrSAOptionData,
        objCurrentDay: undefined,
        objTextResource: objTextResource
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
    useDataLoadForTopic(objContext);
    useFormWeekDaysList(objContext);
    useFormDayList(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilToPlan_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = objContext.PupilToPlan_ModuleProcessor.GetClassId(objContext.props);
        let objClassPupil = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(x => x["uClassId"] == strClassId);
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");//objClassPupil.uSchoolId;
        let strTeacherId = objContext.PupilToPlan_ModuleProcessor.GetTeacherId(objContext.props);
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilToPlan", objContext.props)
        ) {
            ApplicationState.SetProperty("DisplayFor", 2);
            const objTeacher = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;uTeacherId;" + strTeacherId)["Data"][0];
            ApplicationState.SetProperty("PupilToPlanTeacherDetails", objTeacher);
            let objResult = objContext.PupilToPlan_ModuleProcessor.GetData(objContext);
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    isLoadComplete: true, strClassId: strClassId, strSchoolId: strSchoolId, arrDayData: objResult.arrDayData,
                    arrTimeData: objResult.arrTimeData, arrSubjectData: objResult.arrSubjectData, arrSegmentData: objResult.arrSegmentData,
                    arrAllSegmentData: objResult.arrSegmentData, arrTopicData: objResult.arrTopicData, arrReviewCriteriaData: objResult.arrReviewCriteriaData,
                    arrSAOptionData: objResult.arrSAOptionData, objTextResource: objResult.objTextResource
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
        objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
        objContext.props.Object_Extranet_School_TimeTableClassTime,
        objContext.props.Object_Extranet_Teacher_TimeTableDay,
        objContext.props.Object_Extranet_Teacher_TimeTableSegment,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Extranet_School_SchoolSubject,
        objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption,
        objContext.props.Object_Extranet_Teacher_ReviewCriteria,
        objContext.props.Object_Extranet_Teacher_Topic,
        objContext.props.Object_Extranet_Teacher_Teacher,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilToPlan"]
    ]);
}

export function useDataLoadForTopic(objContext) {
    useEffect(() => {
        if (objContext.state.dateComponentLoaded) {
            let arrTopicData = DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + objContext.state.strClassId)["Data"];
            objContext.dispatch({ type: 'SET_STATE', payload: { "arrTopicData": arrTopicData } });
        }
    }, [objContext.props.Object_Extranet_Teacher_Topic]);
}

export function useFormWeekDaysList(objContext) {
    useEffect(() => {
        if (objContext.state.dateComponentLoaded && objContext.state.strType == 'Week' && objContext.state.arrWeekDays.length > 0) {
            let arrWeekDayMonth = objContext.state.arrDayData.map(objDayData => {
                return {
                    ...objDayData,
                    iMonthNumber: objContext.state.arrWeekDays[objDayData.iDisplayOrder].iMonthNumber,
                    iDayNumber: objContext.state.arrWeekDays[objDayData.iDisplayOrder].iDayNumber,
                    objDate: objContext.state.arrWeekDays[objDayData.iDisplayOrder].objDateObject,
                    iYearNumber: objContext.state.arrWeekDays[objDayData.iDisplayOrder].iYear
                };
            });

            let GetTopic = (objSegmnet, iDayNumber) => {
                let objDate = arrWeekDayMonth[iDayNumber - 1];
                let objTopic = objContext.state.arrTopicData.find(objTopicData => new Date(objTopicData.dtTopicDate).getDate() == objDate.iDayNumber &&
                    (new Date(objTopicData.dtTopicDate).getMonth() + 1) == objDate.iMonthNumber &&
                    new Date(objTopicData.dtTopicDate).getFullYear() == objDate.iYearNumber &&
                    objTopicData["uSegmentId"] == objSegmnet["uSegmentId"]);
                return objTopic;
            };

            let arrEventSectionDisplayData = objContext.state.arrTimeData.map(objClassTime => {
                return {
                    ...objClassTime,
                    arrDays: objContext.state.arrDayData.map(clsDay => {
                        let objSegment = objContext.state.arrSegmentData.find(clsSeg =>
                            clsSeg["uClassTimeId"] == objClassTime["uClassTimeId"] && clsSeg["uTimeTableDayId"] == clsDay["uTimeTableDayId"]
                        );
                        return {
                            ...clsDay,
                            objSegment: objSegment ? objSegment : undefined,
                            objSubject: objSegment ? objContext.state.arrSubjectData.find(sub => sub['iSubjectId'] == objSegment['iSubjectId']) : undefined,
                            objTopic: objSegment ? GetTopic(objSegment, clsDay.iDisplayOrder) : undefined
                        };
                    })
                };
            });
            objContext.dispatch({ type: 'SET_STATE', payload: { "arrWeekDayMonth": arrWeekDayMonth, "arrEventSectionData": arrEventSectionDisplayData, "initialDataLoaded": true } });
        }
    }, [objContext.state.arrWeekDays, objContext.state.arrTopicData]);
}

export function useFormDayList(objContext) {
    useEffect(() => {
        if (objContext.state.dateComponentLoaded && objContext.state.strType == 'Day') {
            let GetTopic = (objSegmnet, objDate) => {
                let objTopic = objContext.state.arrTopicData.find(objTopicData => new Date(objTopicData.dtTopicDate).getDate() == objDate.iDayNumber &&
                    (new Date(objTopicData.dtTopicDate).getMonth() + 1) == objDate.iMonthNumber &&
                    new Date(objTopicData.dtTopicDate).getFullYear() == objDate.iYearNumber &&
                    objTopicData["uSegmentId"] == objSegmnet["uSegmentId"]);
                return objTopic;
            };

            let arrEventDisplayData = objContext.state.arrTimeData.map(objClassTime => {
                let objDay = objContext.state.arrDayData[objContext.state.objCurrentDay.DayIndex - 2];
                let objSegment = objContext.state.arrSegmentData.find(objSegmentData =>
                    objSegmentData["uClassTimeId"] == objClassTime["uClassTimeId"] && objSegmentData["uTimeTableDayId"] == objDay["uTimeTableDayId"]
                );
                return {
                    ...objClassTime,
                    objDay: objDay,
                    objSegment: objSegment ? objSegment : undefined,
                    objSubject: objSegment ? objContext.state.arrSubjectData.find(objSubjectData => objSubjectData['iSubjectId'] == objSegment['iSubjectId']) : undefined,
                    objTopic: objSegment ? GetTopic(objSegment, objContext.state.objCurrentDay) : undefined
                };
            });
            objContext.dispatch({ type: 'SET_STATE', payload: { "arrEventDisplayData": arrEventDisplayData } });
        }
    }, [objContext.state.objCurrentDay, objContext.state.arrTopicData]);
}