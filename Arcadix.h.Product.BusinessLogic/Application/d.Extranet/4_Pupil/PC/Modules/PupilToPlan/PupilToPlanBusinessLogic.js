import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true),
            timetableclasstime: DataRef(state.Entity, "timetableclasstime", true),
            timetableday: DataRef(state.Entity, "timetableday", true),
            timetablesegment: DataRef(state.Entity, "timetablesegment", true),
            subject: DataRef(state.Entity, "subject", true),
            strengthassessmentoption: DataRef(state.Entity, "strengthassessmentoption", true),
            reviewcriteria: DataRef(state.Entity, "reviewcriteria", true),
            topic: DataRef(state.Entity, "topic", true),
            textresource: DataRef(state.Entity, "textresource", true),
            object_extranet_teacher: DataRef(state.Entity, "object_extranet_teacher", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

function GetClassId(props) {
    let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(objClassPupil => objClassPupil["cIsDeleted"] == "N");
    return objClass["uClassId"];
}

function GetTeacherId(props) {
    let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(objClassPupil => objClassPupil["cIsDeleted"] == "N");
    return objClass["uTeacherId"];
}

export function InitialDataParams(JConfiguration, props) {
    let strClassId = GetClassId(props);
    let strSchoolId = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
    let strTeacherId = GetTeacherId(props);
    var objGetSchoolYearPeriodParams = {
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
    };

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
            // "uUserId": strSchoolId
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
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objGetSchoolYearPeriodParams,
            "MethodType": "Get"
        },
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

export function DataCall(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        console.log("getting required data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the data required for the schedule. 
 */
export function GetData(objContext) {
    let strClassId = GetClassId(objContext.props);
    let strSchoolId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
    let uClassGroupId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassGroupId;
    const arrSchoolYearPeriodData = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n")["Data"];
    const arrDayData = DataRef(objContext.props.timetableday)["Data"];
    const arrSAOptionData = DataRef(objContext.props.strengthassessmentoption)["Data"];
    const arrReviewCriteriaData = DataRef(objContext.props.reviewcriteria)["Data"];
    const arrTimeData = DataRef(objContext.props.timetableclasstime, "timetableclasstime;uuserid;" + strSchoolId)["Data"];
    const arrSubjectData = DataRef(objContext.props.subject, "subject;cisdeleted;n")["Data"];
    const arrSegmentData = DataRef(objContext.props.timetablesegment, "timetablesegment;uclassid;" + strClassId + ";cisdeleted;n")["Data"];
    const arrTopicData = DataRef(objContext.props.topic, "topic;uclassid;" + strClassId)["Data"];
    const objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/4_pupil/modules/pupiltoplan")["Data"][0]["PupilToPlan"]

    let arrFilteredSegmentData = [];
    if (uClassGroupId != null || uClassGroupId != undefined) {
        arrFilteredSegmentData = arrSegmentData.filter(objSegmentData => {
            return objSegmentData["uClassGroupId"] == uClassGroupId || objSegmentData["uClassGroupId"] == '00000000-0000-0000-0000-000000000000'
        }
        );
    } else {
        arrFilteredSegmentData = arrSegmentData.map(objSegmentData => {
            return {
                ...objSegmentData
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
        arrSegmentData: arrFilteredSegmentData ? arrFilteredSegmentData : [],
        arrTopicData: arrTopicData,
        objTextResource: objTextResource
    };
}

export function useDataLoadForTopic(objContext) {
    useEffect(() => {
        if (objContext.state.dateComponentLoaded) {
            let arrTopicData = DataRef(objContext.props.topic, "topic;uclassid;" + objContext.state.strClassId)["Data"];
            objContext.dispatch({ type: 'Update_TopicData', payload: arrTopicData });
        }
    }, [objContext.props.topic]);
}

export function useFormWeekDaysList(objContext) {
    useEffect(() => {
        if (objContext.state.dateComponentLoaded && objContext.state.strType == 'Week') {
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
            objContext.dispatch({ type: 'Update_WeekDayMonth', payload: { arrWeekDayMonth: arrWeekDayMonth, arrEventSectionDisplayData: arrEventSectionDisplayData } })
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
                    objTopicData["uSegmentId"] == objSegmnet["uSegmentId"])
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
            objContext.dispatch({ type: 'Update_CurrentDayMonth', payload: arrEventDisplayData });
        }
    }, [objContext.state.objCurrentDay, objContext.state.arrTopicData]);
}

export function OnChangeDisplay(objContext, objItem, strType) {
    if (strType != objContext.state.strType) {
        ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { strType: strType } });
    }
}

function GetSchoolYearSegments(objContext, dtCurrent) {
    let arrSchoolYearPeriodData = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n")["Data"];
    let arrFilteredSchoolYearPeriod = arrSchoolYearPeriodData
        .filter(x =>
            new Date(x["dtFromDate"]) < dtCurrent &&
            new Date(x["dtToDate"]) > dtCurrent
        );
    let strSchoolYearPeriodId = "";
    if (arrFilteredSchoolYearPeriod.length > 0) {
        strSchoolYearPeriodId = arrFilteredSchoolYearPeriod[0]["uSchoolYearPeriodId"];
    }    
    let arrSegments = objContext.state.arrAllSegmentData.filter(objTimeTable => objTimeTable["uSchoolYearPeriodId"] == strSchoolYearPeriodId);
    return arrSegments;
 }

export function OnChangeWeekDisplay(objContext, objItem) {
    if (objContext.state.strType == 'Week') { // forming days present in week
        let arrStartDate = objItem.StartDate.split('.');
        let startDate = new Date(arrStartDate[2], (arrStartDate[1] - 1), arrStartDate[0]);
        let arrEndDate = objItem.EndDate.split('.');
        let endDate = new Date(arrEndDate[2], (arrEndDate[1] - 1), arrEndDate[0]);
        let arrWeekDays = [];
        for (var i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
            let objDay = {
                "iDayNumber": parseInt(i.getDate().toString()),
                "iYear": i.getFullYear().toString(),
                "iMonthNumber": i.getMonth() + 1,
                "objDateObject": i.toDateString()
            };
            arrWeekDays = [...arrWeekDays, objDay];
        }
        let arrSegments = GetSchoolYearSegments(objContext, startDate)
        objContext.dispatch({ type: 'Update_WeekDays', payload: { arrWeekDays: arrWeekDays, arrSegments: arrSegments } });
    } else {
        let arrCurrentDate = objItem.CurrentDate.split('.');
        let currentDate = new Date(arrCurrentDate[2], (arrCurrentDate[1] - 1), arrCurrentDate[0]);
        let currentDayObject = {
            "iDayNumber": arrCurrentDate[0],
            "iYearNumber": arrCurrentDate[2],
            "iMonthNumber": arrCurrentDate[1],
            "objDateObject": objItem.CurrentDate,
            "DayIndex": objItem.DayIndex,
            "strDayShortCutName": objContext.state.arrDayData[(objItem.DayIndex - 2)].t_LearnCoacher_Planner_TimeTable_Day_Data[0].vTimeTableDayShortName
        };
        let arrSegments = GetSchoolYearSegments(objContext, currentDate);
        objContext.dispatch({ type: 'Update_CurrentDay', payload: { currentDayObject: currentDayObject, arrSegments: arrSegments } });
    }
}

export function OnClickGetCurrentDate() {
    ApplicationState.SetProperty("DisplayFor", 5);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = GetClassId(objContext.props);
        let strSchoolId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let strTeacherId = GetTeacherId(objContext.props);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n") &&
            DataRef(objContext.props.timetableday) &&
            DataRef(objContext.props.strengthassessmentoption) &&
            DataRef(objContext.props.reviewcriteria) &&
            DataRef(objContext.props.timetableclasstime, "timetableclasstime;uuserid;" + strSchoolId) &&
            DataRef(objContext.props.subject, "subject;cisdeleted;n") &&
            DataRef(objContext.props.timetablesegment, "timetablesegment;uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.topic, "topic;uclassid;" + strClassId) &&
            DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;uteacherid;" + strTeacherId) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/4_pupil/modules/pupiltoplan")
        ) {
            ApplicationState.SetProperty("DisplayFor", 2);
            const objTeacher = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;uteacherid;" + strTeacherId)["Data"][0];
            ApplicationState.SetProperty("PupilToPlanTeacherDetails", objTeacher);
            let objResult = GetData(objContext);
            objContext.dispatch({
                type: "DATA_LOAD_COMPLETE", payload: {
                    isLoadComplete: true,
                    strClassId: strClassId,
                    strSchoolId: strSchoolId,
                    arrDayData: objResult.arrDayData,
                    arrTimeData: objResult.arrTimeData,
                    arrSubjectData: objResult.arrSubjectData,
                    arrSegmentData: objResult.arrSegmentData,
                    arrAllSegmentData: objResult.arrSegmentData,
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
            objContext.props.schoolyearperiod,
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
        arrEventSectionData: [],
        strType: 'Week',
        initialDataLoaded: false,
        arrWeekDays: [],
        arrWeekDayMonth: [],
        arrDayData: [],
        arrEventDisplayData: [],
        dateComponentLoaded: false,
        arrTimeData: [],
        arrSubjectData: [],
        arrSegmentData: [],
        arrAllSegmentData:[],
        arrTopicData: [],
        arrReviewCriteriaData: [],
        arrSAOptionData: [],
        objCurrentDay: undefined,
        objTextResource: undefined
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
                objTextResource: action.payload.objTextResource,
                arrAllSegmentData: action.payload.arrAllSegmentData,
            };
        }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload,
                dateComponentLoaded: false
            };
        case 'Update_WeekDays':
            return {
                ...state,
                arrWeekDays: action.payload.arrWeekDays,
                arrSegmentData: action.payload.arrSegments,
                dateComponentLoaded: true
            };
        case 'Update_WeekDayMonth':
            return {
                ...state,
                arrWeekDayMonth: action.payload.arrWeekDayMonth,
                arrEventSectionData: action.payload.arrEventSectionDisplayData,
                initialDataLoaded: true
            };
        case 'Update_CurrentDay':
            return {
                ...state,
                objCurrentDay: action.payload.currentDayObject,
                arrSegmentData: action.payload.arrSegments,
                dateComponentLoaded: true
            };
        case 'Update_CurrentDayMonth':
            return {
                ...state,
                arrEventDisplayData: action.payload
            };
        case 'Update_TopicData':
            return {
                ...state,
                arrTopicData: action.payload
            };
    }
}

