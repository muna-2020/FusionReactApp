//Objects required for module.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_School_TimeTableClassTime from '@shared/Object/d.Extranet/2_School/TimeTableClassTime/TimeTableClassTime';
import Object_Extranet_Teacher_TimeTableDay from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableDay/TimeTableDay';
import Object_Extranet_Teacher_TimeTableSegment from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableSegment/TimeTableSegment';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_School_SchoolSubject from '@shared/Object/d.Extranet/2_School/SchoolSubject/SchoolSubject';
import Object_Extranet_Teacher_StrengthAssessmentOption from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/StrengthAssessment/StrengthAssessmentOption';
import Object_Extranet_Teacher_ReviewCriteria from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/ReviewCriteria/ReviewCriteria';
import Object_Extranet_Teacher_Topic from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/Topic/Topic';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';

/**
* @name PupilToPlan_ModuleProcessor
* @summary Class for LearningJournal module display and manipulate.
*/
class PupilToPlan_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_SchoolYearPeriod", "Object_Extranet_School_TimeTableClassTime", "Object_Extranet_Teacher_TimeTableDay",
            "Object_Extranet_Teacher_TimeTableSegment", "Object_Intranet_Taxonomy_Subject", "Object_Extranet_Teacher_StrengthAssessmentOption",
            "Object_Extranet_Teacher_ReviewCriteria", "Object_Extranet_Teacher_Topic", "Object_Extranet_Teacher_Teacher",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilToPlan",
            "Object_Extranet_School_SchoolSubject"
        ];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let strClassId = this.GetClassId(props);
        let objClassPupil = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(x => x["uClassId"] == strClassId);
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");//objClassPupil.uSchoolId;
        let strTeacherId = this.GetTeacherId(props);
        let arrDataRequest = [];

        //SchoolYearPeriod
        let objSchoolYearPeriodParams = {
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
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //TimeTableClassTime
        let objTimeTableClassTimeParams = {
            "ForeignKeyFilter": {
                "uUserId": strSchoolId
            },
            "SearchQuery": {
                must: [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_School_TimeTableClassTime.Initialize(objTimeTableClassTimeParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_TimeTableClassTime];

        //TimeTableDay
        let objTimeTableDayParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_TimeTableDay.Initialize(objTimeTableDayParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_TimeTableDay];

        //TimeTableSegment
        let objTimeTableSegmentParams = {
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
            }
        };
        Object_Extranet_Teacher_TimeTableSegment.Initialize(objTimeTableSegmentParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_TimeTableSegment];

        //Subject
        let objSubjectParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //SchoolSubject
        let objSchoolSubjectParams = {
            "ForeignKeyFilter": {
                "uUserId": strSchoolId
            },
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_Extranet_School_SchoolSubject.Initialize(objSchoolSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_SchoolSubject];

        //StrengthAssessmentOption
        let objSAOptionParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_StrengthAssessmentOption.Initialize(objSAOptionParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_StrengthAssessmentOption];

        //ReviewCriteria
        let objReviewCriteriaParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_ReviewCriteria.Initialize(objReviewCriteriaParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_ReviewCriteria];

        //Topic
        let objPupilTopicParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            }
        };
        Object_Extranet_Teacher_Topic.Initialize(objPupilTopicParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Topic];

        //Teacher
        let objTeacherParams = {
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
        Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/4_Pupil/Modules/PupilToPlan"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilToPlan/PupilToPlan.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css"
        ];
    }

    GetClassId(props) {
        //let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(objClassPupil => objClassPupil["cIsDeleted"] == "N");
        //return objClass["uClassId"];
        return ApplicationState.GetProperty("SelectedClassId");
    }

    GetTeacherId(props) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(objClassPupil => objClassPupil["uClassId"] == strClassId);
        return objClass["uTeacherId"];
    }

    /**
    * @name GetData
    * @param {object} objContext Passes context object
    * @summary Returns the data required for the schedule.
    * @returns {object} gets the objects with keys arrSchoolYearPeriod, arrDayData, arrTimeData, arrSubjectData, arrSAOptionData, arrReviewCriteriaData, arrSegmentData, arrTopicData, objTextResource
    */
    GetData(objContext) {
        let strClassId = this.GetClassId(objContext.props);
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");//objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let uClassGroupId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.filter(x => x["uClassId"] == strClassId)[0].uClassGroupId;
        const arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        const arrDayData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"];
        const arrSAOptionData = DataRef(objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"];
        const arrReviewCriteriaData = DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"];
        const arrTimeData = DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"];
        const arrDefaultSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"];
        const arrSchoolSubjectData = DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"];
        const arrSubjectData = [...arrDefaultSubjectData, ...arrSchoolSubjectData]
        const arrSegmentData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
        const arrTopicData = DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"];
        const objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilToPlan", objContext.props);
        //const objTextResource = {
        //    "Today": "Today",
        //    "Day": "Day",
        //    "Week": "Week",
        //    "Date": "Date",
        //    "Subject": "Subject",
        //    "PlannedWork": "Planned Work",
        //    "ThinkAndEdit": "Thinking & Editing",
        //    "ToChange": "Change",
        //    "TopicHeader": "I plan to do the following tasks",
        //    "TopicFooter": "I have solved the tasks and would like to think about my work",
        //    "ThinkTopic": "Think",
        //    "Think_Assessment_Plan": "Thinking: Assess my planning & work",
        //    "JudgeFollowingTaskHeader": "I judge following task part",
        //    "ReviewCriteriaMessage": "How did I work?",
        //    "SureWhenSolving": "I was sure when solving",
        //    "MyComment": "My comment about that",
        //    "SendButton": "Send",
        //    "FeedbackPlaceHolder": "write a comment",
        //    "SaveTopic": "Save",
        //    "CloseTopic": "Close",
        //    "ThinkErrorMessage": "Please Enter"
        //}

        let arrFilteredSegmentData = [];
        if (uClassGroupId && uClassGroupId != '00000000-0000-0000-0000-000000000000') {
            arrFilteredSegmentData = arrSegmentData.filter(objSegmentData => {
                return objSegmentData["uClassGroupId"] == uClassGroupId || objSegmentData["uClassGroupId"] == '00000000-0000-0000-0000-000000000000';
            });
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

    OnChangeDisplay(objContext, objItem, strType) {
        if (strType != objContext.state.strType) {
            ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
            objContext.dispatch({ type: "SET_STATE", payload: { strType: strType, dateComponentLoaded: true } });
        }
    }

    /**
    * @name GetSchoolYearSegments
    * @param {object} objContext Passes context object
    * @param {String} dtCurrent Passes Current date
    * @summary Returns the Segments data
    * @returns {Array} Segment
    */
    GetSchoolYearSegments(objContext, dtCurrent) {
        let arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let arrFilteredSchoolYearPeriod = arrSchoolYearPeriodData.filter(x => new Date(x["dtFromDate"]) < dtCurrent && new Date(x["dtToDate"]) > dtCurrent);
        let strSchoolYearPeriodId = arrFilteredSchoolYearPeriod.length > 0 ? arrFilteredSchoolYearPeriod[0]["uSchoolYearPeriodId"] : "";
        let arrSegments = objContext.state.arrAllSegmentData.filter(objTimeTable => objTimeTable["uSchoolYearPeriodId"] == strSchoolYearPeriodId);
        return arrSegments;
    }

    /**
    * @name OnChangeWeekDisplay
    * @param {object} objContext Passes context object
    * @param {object} objItem Passes Item
    * @summary Executes when WeekDisplay dropdown is changed
    */
    OnChangeWeekDisplay(objContext, objItem) {
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
            let arrSegments = this.GetSchoolYearSegments(objContext, startDate);
            objContext.dispatch({ type: 'SET_STATE', payload: { "arrWeekDays": arrWeekDays, "arrSegmentData": arrSegments, "dateComponentLoaded": true } });
        } else {
            let arrCurrentDate = objItem.CurrentDate.split('.');
            let currentDate = new Date(arrCurrentDate[2], (arrCurrentDate[1] - 1), arrCurrentDate[0]);
            let currentDayObject = {
                "iDayNumber": arrCurrentDate[0],
                "iYearNumber": arrCurrentDate[2],
                "iMonthNumber": arrCurrentDate[1],
                "objDateObject": objItem.CurrentDate,
                "DayIndex": objItem.DayIndex,
                "strDayShortCutName": objItem.DayIndex ? objContext.state.arrDayData[(objItem.DayIndex - 2)].t_LearnCoacher_Planner_TimeTable_Day_Data[0].vTimeTableDayShortName : ''
            };
            let arrSegments = this.GetSchoolYearSegments(objContext, currentDate);
            objContext.dispatch({ type: 'SET_STATE', payload: { "objCurrentDay": currentDayObject, "arrSegmentData": arrSegments, "dateComponentLoaded": true } });
        }
    }

    /**
    * @name OnClickGetCurrentDate
    * @param {object} objContext Passes context object
    * @param {object} objItem Passes Item
    * @summary Sets the application state DisplayFor for refreshing the WeekDisplay component.(To reset the date to today)
    */
    OnClickGetCurrentDate(objContext) {
        let intValue = 0;
        let strDisplayFor = ApplicationState.GetProperty("DisplayFor");
        if (strDisplayFor == 5)//already 5 is there changing to 1 or 2.
            intValue = objContext.state.strType == 'Day' ? 1 : 2;
        else
            intValue = 5;
        ApplicationState.SetProperty("DisplayFor", intValue);
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
    }
}

export default PupilToPlan_ModuleProcessor;