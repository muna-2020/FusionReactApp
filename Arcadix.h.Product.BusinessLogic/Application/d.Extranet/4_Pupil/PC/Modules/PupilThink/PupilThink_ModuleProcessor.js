//Objects required for module.
import Object_Extranet_School_TimeTableClassTime from '@shared/Object/d.Extranet/2_School/TimeTableClassTime/TimeTableClassTime';
import Object_Extranet_Teacher_TimeTableDay from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableDay/TimeTableDay';
import Object_Extranet_Teacher_TimeTableSegment from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableSegment/TimeTableSegment';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_Teacher_StrengthAssessmentOption from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/StrengthAssessment/StrengthAssessmentOption';
import Object_Extranet_Teacher_ReviewCriteria from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/ReviewCriteria/ReviewCriteria';
import Object_Extranet_Teacher_Topic from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/Topic/Topic';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';


/**
 * @name PupilThink_ModuleProcessor
 * @summary Class for Notes module display and manipulate.
 */
class PupilThink_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_School_TimeTableClassTime", "Object_Extranet_Teacher_TimeTableDay", "Object_Extranet_Teacher_TimeTableSegment",
            "Object_Intranet_Taxonomy_Subject", "Object_Extranet_Teacher_StrengthAssessmentOption", "Object_Extranet_Teacher_ReviewCriteria",
            "Object_Extranet_Teacher_Topic", "Object_Extranet_Teacher_Teacher",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilToPlan",
            "Object_Extranet_Teacher_SchoolYearPeriod"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.PupilThink_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest
     */
    InitialDataParams(props) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");//props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");// props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let strTeacherId = this.GetTeacherId(props);
        let arrDataRequest = [];

        //TimeTableClassTime
        let objTimeTableTimeParams = {
            "ForeignKeyFilter": {
                "uUserId": strSchoolId
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_School_TimeTableClassTime.Initialize(objTimeTableTimeParams);
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

        //TextResource
        let arrResourceParams = ["/d.Extranet/4_Pupil/Modules/PupilToPlan"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

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

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilThink/PupilThink.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css"
        ];
    }

    /**
    * @name GetTeacherId
    * @param {object} props Passes props
    * @summary Returns the TeacherId of that pupil.
    * @returns {String} TeacherId
    */
    GetTeacherId(props) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objClass;
        if (strClassId && strClassId.length > 0) {
            objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["uClassId"] == strClassId);
        } else {
            objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["cIsDeleted"] == "N");
        }
        return objClass["uTeacherId"];
    }

    /**
    * @name FormDisplayData
    * @param {object} objContext Passes Context object
    * @param {Array} arrTopicData Passes Topic data
    * @summary Returns the display data
    * @returns {Array} Display data
    */
    FormDisplayData(objContext, arrTopicData) {

        let arrDisplayData = [];

        if (arrTopicData !== undefined && arrTopicData.length > 0) {
            let objDate = objContext.state.objSelectedSchoolYear;
            let arrStartDate = objDate.StartDate.split('.');
            let startDate = new Date(arrStartDate[2], (arrStartDate[1] - 1), arrStartDate[0]);
            let arrEndDate = objDate.EndDate.split('.');
            let endDate = new Date(arrEndDate[2], (arrEndDate[1] - 1), arrEndDate[0]);
            let arrFilteredTopic = arrTopicData.filter(tpc => new Date(tpc.dtTopicDate) > startDate && new Date(tpc.dtTopicDate) < endDate);

            arrFilteredTopic.map(tpc => {
                let objSegment = objContext.state.arrSegmentData.find(seg => seg["uSegmentId"] == tpc["uSegmentId"]);
                let objTeacherFeedback = tpc.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.find(feed => feed["cIsByTeacher"] == "Y");
                if (objSegment) {
                    arrDisplayData = [...arrDisplayData, {
                        ...tpc,
                        objDay: objContext.state.arrDayData.find(day => day["uTimeTableDayId"] == objSegment["uTimeTableDayId"]),
                        objTime: objContext.state.arrTimeData.find(time => time["uClassTimeId"] == objSegment["uClassTimeId"]),
                        objSubject: objContext.state.arrSubjectData.find(sub => sub["iSubjectId"] == objSegment["iSubjectId"]),
                        objSegment: objSegment,
                        cIsTeacherCommented: objTeacherFeedback ? true : false
                    }];
                }
            });
        }
        return arrDisplayData;
    }


    /**
    * @name GetData
    * @param {object} objContext Passes Context object
    * @summary Returns the data required for the schedule
    * @returns {object} returns objects with keys arrSchoolYearPeriod, arrDayData, arrTimeData, arrSubjectData, arrSAOptionData, arrReviewCriteriaData,arrSegmentData, arrTopicData, arrTopicDisplayData, objTextResource
    */
    GetData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");//objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let strUserId = objContext.props.ClientUserDetails.UserId;
        const arrDayData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"];
        const arrSAOptionData = DataRef(objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"];
        const arrReviewCriteriaData = DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"];
        const arrTimeData = DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)["Data"];
        const arrSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"];
        const arrSegmentData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
        const arrTopicData = DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId + ";uPupilId;" + strUserId)["Data"];
        const objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilToPlan", objContext.props);

        return {
            arrDayData: arrDayData,
            arrTimeData: arrTimeData,
            arrSubjectData: arrSubjectData,
            arrSAOptionData: arrSAOptionData,
            arrReviewCriteriaData: arrReviewCriteriaData,
            arrSegmentData: arrSegmentData ? arrSegmentData : [],
            arrTopicData: arrTopicData,
            objTextResource: objTextResource
        };
    }

    /**
    * @name OnChangeWeekDisplay
    * @param {object} objContext Passes Context object
    * @param {object} objItem Passes Item
    * @summary Needed for week display
    */
    OnChangeWeekDisplay(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedSchoolYear: objItem } });
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

export default PupilThink_ModuleProcessor;