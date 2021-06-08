import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        console.log("mapping");
        return {
            timetableclasstime: DataRef(state.Entity, "timetableclasstime", true),
            timetableday: DataRef(state.Entity, "timetableday", true),
            timetablesegment: DataRef(state.Entity, "timetablesegment", true),
            subject: DataRef(state.Entity, "subject", true),
            strengthassessmentoption: DataRef(state.Entity, "strengthassessmentoption", true),
            reviewcriteria: DataRef(state.Entity, "reviewcriteria", true),
            topic: DataRef(state.Entity, "topic", true),
            object_extranet_teacher: DataRef(state.Entity, "object_extranet_teacher", true),
            textresource: DataRef(state.Entity, "textresource", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        console.log(" not mapping");
        return {};
    }
}

function GetTeacherId(props) {
    let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["cIsDeleted"] == "N");
    return objClass["uTeacherId"];
}

export function InitialDataParams(JConfiguration, props) {
    let strClassId = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
    let strSchoolId = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
    let strTeacherId = GetTeacherId(props);
    let objGetTimeTableTimeParams = {
        "ForeignKeyFilter": {
            "uUserId": strSchoolId
        },
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "OutputColumns": []
    };

    let objGetTimeTableDayParams = {
        "ForeignKeyFilter": {
        },
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "OutputColumns": []
    };

    let objGetTimeTableSegmentParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        },
        "OutputColumns": []
    };

    let objGetPupilTopicParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uPupilId":props.ClientUserDetails.UserId
                    }
                }
            ]
        },
        "OutputColumns": []
    };

    let objSubjectParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        },
        "SortKeys": [],
        "OutputColumns": []
    };

    let objSAOptionParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
        },
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "OutputColumns": []
    };

    let objReviewCriteriaParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
        },
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "OutputColumns": []
    };

    let objResourceParams = {
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilToPlan"
                    }
                }
            ]
        }
    };

    let objTeacherParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            must: [
                {
                    match: {
                        uTeacherId: strTeacherId
                    }
                }
            ]
        }
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Extranet/School/TimeTableClassTime",
            "Params": objGetTimeTableTimeParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Planner/TimeTableDay",
            "Params": objGetTimeTableDayParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Teacher/Planner/TimeTableSegment",
            "Params": objGetTimeTableSegmentParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/LearningJournal/Topic",
            "Params": objGetPupilTopicParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/LearningJournal/StrengthAssessmentOption",
            "Params": objSAOptionParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/LearningJournal/ReviewCriteria",
            "Params": objReviewCriteriaParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher",
            "Params": objTeacherParams,
            "MethodType": "Get",
            "UseFullName":true
        }
    ];
    return { "DataCalls": arrDataRequest };
}

export function FormDisplayData(objContext, arrTopicData) {
    let objDate = objContext.state.objSelectedSchoolYear;
    let arrStartDate = objDate.StartDate.split('.');
    let startDate = new Date(arrStartDate[2], (arrStartDate[1] - 1), arrStartDate[0]);
    let arrEndDate = objDate.EndDate.split('.');
    let endDate = new Date(arrEndDate[2], (arrEndDate[1] - 1), arrEndDate[0]);
    let arrFilteredTopic = arrTopicData.filter(tpc => new Date(tpc.dtTopicDate) > startDate && new Date(tpc.dtTopicDate) < endDate);
    let arrDisplayData = arrFilteredTopic.map(tpc => {
        let objSegment = objContext.state.arrSegmentData.find(seg => seg["uSegmentId"] == tpc["uSegmentId"]);
        let objTeacherFeedback = tpc.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.find(feed => feed["cIsByTeacher"] == "Y");
        return {
            ...tpc,
            objDay: objContext.state.arrDayData.find(day => day["uTimeTableDayId"] == objSegment["uTimeTableDayId"]),
            objTime: objContext.state.arrTimeData.find(time => time["uClassTimeId"] == objSegment["uClassTimeId"]),
            objSubject: objContext.state.arrSubjectData.find(sub => sub["iSubjectId"] == objSegment["iSubjectId"]),
            objSegment: objSegment,
            cIsTeacherCommented: objTeacherFeedback ? true : false
        };
    });
    return arrDisplayData;
}

export function DataCall(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

export function useDataLoader(objContext) {
    const getRequiredData = () => {
        console.log("getting required data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(getRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the data required for the schedule. 
 */
export function GetData(objContext) {
    let strClassId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
    let strSchoolId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
    let uClassGroupId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassGroupId;
    let strUserId = objContext.props.ClientUserDetails.UserId;
    const arrSchoolYearPeriodData = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n")["Data"];
    const arrDayData = DataRef(objContext.props.timetableday)["Data"];
    const arrSAOptionData = DataRef(objContext.props.strengthassessmentoption)["Data"];
    const arrReviewCriteriaData = DataRef(objContext.props.reviewcriteria)["Data"];
    const arrTimeData = DataRef(objContext.props.timetableclasstime, "timetableclasstime;uuserid;" + strSchoolId)["Data"];
    const arrSubjectData = DataRef(objContext.props.subject, "subject;cisdeleted;n")["Data"];
    const arrSegmentData = DataRef(objContext.props.timetablesegment, "timetablesegment;uclassid;" + strClassId + ";cisdeleted;n")["Data"];
    const arrTopicData = DataRef(objContext.props.topic, "topic;uclassid;" + strClassId +";upupilid;" + strUserId)["Data"];
    const objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/4_pupil/modules/pupiltoplan")["Data"][0]["PupilToPlan"]
    let arrFilteredSegmentData = [];
    if (uClassGroupId != null || uClassGroupId != undefined) {
        arrFilteredSegmentData = arrSegmentData.filter(clsSeg => {
            return clsSeg["uClassGroupId"] == uClassGroupId || clsSeg["uClassGroupId"] == '00000000-0000-0000-0000-000000000000';
        }
        );
    } else {
        arrFilteredSegmentData = arrSegmentData.map(clsSeg => {
            return {

                ...clsSeg
            };
        });
    }

    return {
        arrSchoolYearPeriod: arrSchoolYearPeriodData,
        arrDayData: arrDayData,
        arrTimeData: arrTimeData,
        arrSubjectData: arrSubjectData,
        arrSAOptionData: arrSAOptionData,
        arrReviewCriteriaData: arrReviewCriteriaData,
        arrSegmentData: arrSegmentData ? arrSegmentData : [],
        arrTopicData: arrTopicData,
        arrTopicDisplayData: [],
        objTextResource: objTextResource
    };
}

export function useDataLoadForTopic(objContext) {
    useEffect(() => {
        if (objContext.state.dateComponentLoaded) {
            let arrTopicData = DataRef(objContext.props.topic, "topic;uclassid;" + objContext.state.strClassId)["Data"];

            objContext.dispatch({ type: 'Update_TopicData', payload: arrTopicData })
        }
    }, [objContext.props.topic]);
}

export function OnChangeWeekDisplay(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSelectedSchoolYear: objItem } });
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let strSchoolId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let strTeacherId = GetTeacherId(objContext.props);
        let strUserId = objContext.props.ClientUserDetails.UserId;
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.timetableday) &&
            DataRef(objContext.props.strengthassessmentoption) &&
            DataRef(objContext.props.reviewcriteria) &&
            DataRef(objContext.props.timetableclasstime, "timetableclasstime;uuserid;" + strSchoolId) &&
            DataRef(objContext.props.subject, "subject;cisdeleted;n") &&
            DataRef(objContext.props.timetablesegment, "timetablesegment;uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.topic, "topic;uclassid;" + strClassId + ";upupilid;" + strUserId) &&
            DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;uteacherid;" + strTeacherId) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/4_pupil/modules/pupiltoplan")
        ) {
            ApplicationState.SetProperty("DisplayFor", 4);
            let objResult = GetData(objContext);
            const objTeacher = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;uteacherid;" + strTeacherId)["Data"][0];
            ApplicationState.SetProperty("PupilToPlanTeacherDetails", objTeacher);
            objContext.dispatch({
                type: "DATA_LOAD_COMPLETE", payload: {
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
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.timetableday,
            objContext.props.timetableclasstime,
            objContext.props.subject,
            objContext.props.timetablesegment,
            objContext.props.strengthassessmentoption,
            objContext.props.reviewcriteria,
            objContext.props.topic,
            objContext.props.textresource,
            objContext.props.object_extranet_teacher
        ]);
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        strClassId: undefined,
        strSchoolId: undefined,
        arrDayData: [],
        arrTimeData: [],
        arrSubjectData: [],
        arrSegmentData: [],
        arrTopicData: [],
        arrReviewCriteriaData: [],
        arrSAOptionData: [],
        objTextResource: undefined,
        objSelectedSchoolYear: undefined
    };
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return {
                ...state,
                ["isLoadComplete"]: action.payload.isLoadComplete,
                ["strClassId"]: action.payload.strClassId,
                ["strSchoolId"]: action.payload.strSchoolId,
                arrDayData: action.payload.arrDayData,
                arrTimeData: action.payload.arrTimeData,
                arrSubjectData: action.payload.arrSubjectData,
                arrSegmentData: action.payload.arrSegmentData,
                arrTopicData: action.payload.arrTopicData,
                arrSAOptionData: action.payload.arrSAOptionData,
                arrReviewCriteriaData: action.payload.arrReviewCriteriaData,
                objTextResource: action.payload.objTextResource
            };
        }
        case 'SET_STATE_VALUES': {
            return {
                ...state,
                ...action.payload
            };
        }
    }
}

