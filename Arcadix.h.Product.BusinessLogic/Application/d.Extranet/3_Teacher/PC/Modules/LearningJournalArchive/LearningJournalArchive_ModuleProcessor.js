//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Extranet_Teacher_Topic from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/Topic/Topic';
import Object_Extranet_Teacher_TimeTableSegment from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableSegment/TimeTableSegment';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_School_SchoolSubject from '@shared/Object/d.Extranet/2_School/SchoolSubject/SchoolSubject';
import Object_Extranet_Teacher_ReviewCriteria from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/ReviewCriteria/ReviewCriteria';
import Object_Extranet_School_TimeTableClassTime from '@shared/Object/d.Extranet/2_School/TimeTableClassTime/TimeTableClassTime';
import Object_Extranet_Teacher_TimeTableDay from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableDay/TimeTableDay';
import Object_Extranet_Teacher_StrengthAssessmentOption from '@shared/Object/d.Extranet/3_Teacher/LearningJournal/StrengthAssessment/StrengthAssessmentOption';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';

/**
* @name LearningJournalArchive_ModuleProcessor
* @summary Class for LearningJournal module display and manipulate.
*/
class LearningJournalArchive_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class", "Object_Extranet_Pupil_Pupil", "Object_Extranet_Teacher_Topic", "Object_Extranet_Teacher_TimeTableSegment", "Object_Intranet_Taxonomy_Subject",
            "Object_Extranet_School_SchoolSubject", "Object_Extranet_Teacher_ReviewCriteria", "Object_Extranet_School_TimeTableClassTime", "Object_Extranet_Teacher_TimeTableDay",
            "Object_Extranet_Teacher_StrengthAssessmentOption",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningJournalArchive"
        ];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningJournalArchive/LearningJournalArchive.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
            JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/Dropdown/DropDown.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strSchoolId = props.ClientUserDetails.TeacherDetails.uSchoolId;
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];

        //Class
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //Pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //Topic
        let objTopicParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            }
        };
        Object_Extranet_Teacher_Topic.Initialize(objTopicParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Topic];

        //TimeTableSegment
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
            }
        };
        Object_Extranet_Teacher_TimeTableSegment.Initialize(objGetTimeTableSegmentParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_TimeTableSegment];

        //Subject
        let objDefaultSubjectsParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "iParentSubjectId": 0
                        }
                    },
                    {
                        "match": {
                            "cIsLearnCoacherSubject": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_Intranet_Taxonomy_Subject.Initialize(objDefaultSubjectsParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //SchoolSubject
        let objSchoolSubjectParams = {
            "ForeignKeyFilter": {
                "uUserId": props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
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

        //TimeTableClassTime
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
            ]
        };
        Object_Extranet_School_TimeTableClassTime.Initialize(objGetTimeTableTimeParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_TimeTableClassTime];

        //TimeTableDay
        let objGetTimeTableDayParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_TimeTableDay.Initialize(objGetTimeTableDayParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_TimeTableDay];

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

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/LearningJournalArchive"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "LearningJournalHeader", "LearningJournalControls", "ContentHead"],
            FooterIds: ["BottomSpacing"]
        };
    }

    /**
    * @name GetDataByFilters
    * @param {object} objContext Passes context object
    * @param {Array} arrTopicData Passes TopicData
    * @param {Array} arrSegmentData Passes SegmentData
    * @param {Array} arrSubjectData Passes SubjectData
    * @param {Array} arrClassData Passes ClassData
    * @param {Array} arrTimeTableClassTime Passes TimeTableClassTime
    * @summary Filters the Data and changes the states
    */
    GetDataByFilters(objContext, arrTopicData, arrSegmentData, arrSubjectData, arrClassData, arrTimeTableClassTime) {
        let objSelSubject = objContext.state.objSubject ? objContext.state.objSubject : arrSubjectData[0];

        let arrTopicDataByDate = arrTopicData.filter(tpc => new Date(tpc["dtTopicDate"]) > objContext.state.dtStartDate && new Date(tpc["dtTopicDate"]) < objContext.state.dtEndDate)

        let arrAllDisplayData = objContext.state.arrPupilData.map(pupil => {
            let arrTopic = [];
            arrTopicDataByDate.filter(tpc => tpc["uPupilId"] == pupil["uPupilId"]).map(tpc => {
                let objSegment = arrSegmentData.find(seg => seg["uSegmentId"] == tpc["uSegmentId"])
                if (objSegment) {
                    arrTopic = [...arrTopic, {
                        ...tpc,
                        objSubject: arrSubjectData.find(sub => sub["iSubjectId"] == objSegment["iSubjectId"]),
                        objClass: arrClassData.find(cls => cls["uClassId"] == tpc["uClassId"]),
                        objClassTime: arrTimeTableClassTime.find(clsTime => clsTime["uClassTimeId"] == objSegment["uClassTimeId"])
                    }]
                }
            })
            return {
                uPupilId: pupil["uPupilId"],
                vFirstName: pupil["vFirstName"],
                vName: pupil["vName"],
                objSubject: objSelSubject, //for dislaying in ui
                arrTopic: arrTopic
            };
        });

        let arrFilteredPupilData = arrAllDisplayData.filter(item => item.arrTopic.length > 0 && item["uPupilId"] != '00000000-0000-0000-0000-000000000000');

        if (objContext.state.objPupil && objContext.state.objPupil.uPupilId != '00000000-0000-0000-0000-000000000000') {
            arrFilteredPupilData = arrFilteredPupilData.filter(pupil => pupil["uPupilId"] == objContext.state.objPupil["uPupilId"]);
        }
        if (objSelSubject["iSubjectId"] != -1) {
            arrFilteredPupilData = arrFilteredPupilData.filter(item => {
                let objSub = item.arrTopic.find(tpc => tpc.objSubject["iSubjectId"] == objContext.state.objSubject["iSubjectId"])
                if (objSub) {
                    return {
                        ...item
                    };
                }
            }).map(item => {
                return {
                    ...item,
                    arrTopic: item.arrTopic.filter(tpc => tpc.objSubject["iSubjectId"] == objContext.state.objSubject["iSubjectId"])
                };
            });
        }
        objContext.dispatch({
            type: "SET_STATE", payload: { arrDisplayData: arrFilteredPupilData, initialDataLoaded: true, blnDateFilterCalled: false }
        });
    }

    /**
    * @name GetPupilDataParams
    * @param {object} objContext Passes context object
    * @summary Get initials request params of pupil for the component.
    * @returns {Array} Pupil Data Params
    */
    GetPupilDataParams(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];

        //Pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //Topic
        let objTopicParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            }
        };
        Object_Extranet_Teacher_Topic.Initialize(objTopicParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Topic];

        //TimeTableSegment
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
            }
        };
        Object_Extranet_Teacher_TimeTableSegment.Initialize(objGetTimeTableSegmentParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_TimeTableSegment];

        return arrDataRequest;
    }

    /**
    * @name GetClassDropDownData
    * @param {object} objContext Passes context object
    * @summary returns an array of classes to load in the drop down
    * @returns {Array} ClassDropDownData
    */
    GetClassDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournalArchive", objContext.props);
        let arrTempClass = [];
        objTextResource = objTextResource ? objTextResource : {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"].map((objClass) => {
                return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
            });
        }

        let strTeacherId = global.ClientUserDetails.UserId;
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrTempClass.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"; }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
            }
        });
        let arrFinalClassData = [
            {
                "Title": objTextResource["ClassDropDownMainClassTitle"],
                "Data": arrMainClassData
            },
            {
                "Title": objTextResource["ClassDropDownCoTeacherTitle"],
                "Data": arrCoTeacherClassData
            },
            {
                "Title": objTextResource["ClassDropDownSubjectExpertTitle"],
                "Data": arrSubjectExpertClassData
            }
        ];
        return { arrFinalClassData: arrFinalClassData, arrClassData: arrTempClass };
    }

    /**
    * @name GetWeekDisplayDropdownData
    * @param {object} objContext Passes context object
    * @summary reurns Week Display dropdown.
    * @returns {Array} WeekDisplayDropdownData
    */
    GetWeekDisplayDropdownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournalArchive", objContext.props);
        objTextResource = objTextResource ? objTextResource : {};
        let arrDropdownData = [
            {
                Key: objTextResource["WeekDisplayDropdownWeekTitle"],
                Value: 2
            },
            {
                Key: objTextResource["WeekDisplayDropdownSemesterTitle"],
                Value: 3
            },
            {
                Key: objTextResource["WeekDisplayDropdownSchoolYearTitle"],
                Value: 4
            }
        ];
        return arrDropdownData;
    }

    /**
    * @name OnChangeClassDropDown
    * @param {object} objContext Passes context object
    * @param {object} objItem Passes Item object
    * @summary Triggers when the class dropdown selection changes
    */
    OnChangeClassDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnIsClassSelectionChanged": !objContext.state.blnIsClassSelectionChanged, objClass: objItem } });
    }

    /**
    * @name GetPupilDropdownMetaData
    * @summary Gets the meta data for Pupil dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetPupilDropdownMetaData() {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uPupilId"
        };
    }

    /**
    * @name GetPupilDropdownData
    * @param {object} objContext Context object
    * @summary Gets the data for Pupil dropdown
    * @returns {object} Meta objects for Pupil dropdown
    */
    GetPupilDropdownData(objContext) {
        return {
            DropdownData: objContext.state.arrPupilData,
            SelectedValue: objContext.state.arrPupilData.length > 0 ? objContext.state.arrPupilData[0].uPupilId : ""
        };
    }

    /**
    * @name GetPupilDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Pupil dropdown.
    * @returns {object} objEventBasics
    */
    GetPupilDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.LearningJournalArchive_ModuleProcessor.OnChangePupilDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData() {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name OnChangePupilDropDown
    * @param {object} objContext Passes context object
    * @param {object} objItem Passes Item object
    * @summary Triggers when the pupil dropdown selection changes
    */
    OnChangePupilDropDown(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objPupil: objItem } });
    }

    /**
    * @name GetSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data"
        };
    }

    /**
    * @name GetSubjectDropdownData
    * @param {object} objContext Context object
    * @param {Array} arrSubjects Subject data
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubjectDropdownData(objContext, arrSubjects) {
        return {
            DropdownData: arrSubjects,
            SelectedValue: objContext.state.objSubject ? objContext.state.objSubject.iSubjectId : arrSubjects[0].iSubjectId
        };
    }

    /**
    * @name GetSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Subject dropdown.
    * @returns {object} objEventBasics
    */
    GetSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.LearningJournalArchive_ModuleProcessor.OnChangeSubjectDropDown(objContext, objItem)
        };
    }

    /**
    * @name OnChangeSubjectDropDown
    * @param {object} objContext Passes context object
    * @param {object} objItem Passes Item object
    * @summary Triggers when the Subject dropdown selection changes
    */
    OnChangeSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSubject: objItem } });
        this.SaveUserPreferenceSubjectId(objContext, objItem["iSubjectId"])
    }

    /**
    * @name OnChangeWeekDisplay
    * @param {object} objContext Passes context object
    * @param {object} objItem Passes Item object
    * @summary Trigerred when the change is there in week display component.
    */
    OnChangeWeekDisplay(objContext, objItem) {
        let arrStartDate = objItem.StartDate.split('.');
        let arrEndtDate = objItem.EndDate.split('.');
        let dtStartDate = new Date(arrStartDate[2], Number(arrStartDate[1]) - 1, arrStartDate[0]);
        let dtEndDate = new Date(arrEndtDate[2], Number(arrEndtDate[1]) - 1, arrEndtDate[0]);
        objContext.dispatch({ type: "SET_STATE", payload: { "dtStartDate": dtStartDate, "dtEndDate": dtEndDate, blnDateFilterCalled: true } });
    }

    /**
    * @name GetWeekDisplayDropdownMetaData
    * @summary Gets the meta data for Pupil dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetWeekDisplayDropdownMetaData() {
        return {
            DisplayColumn: "Key",
            ValueColumn: "Value"
        };
    }

    /**
    * @name GetWeekDisplayDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Pupil dropdown.
    * @returns {object} objEventBasics
    */
    GetWeekDisplayDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.LearningJournalArchive_ModuleProcessor.OnChangeDisplayDropdown(objContext, objItem)
        };
    }


    /**
    * @name OnChangeDisplayDropdown
    * @param {object} objContext Passes context object
    * @param {object} objItem Passes Item object
    * @summary Trigerred when the selection changes in the WeekDisplayDropdown.
    */
    OnChangeDisplayDropdown(objContext, objItem) {
        ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
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

    /**
     * @name SaveUserPreferenceSubjectId
     * @summary Updates the selected subjectId to userpreference object.
     * @param {any} objContext
     * @param {any} strSubjectId
     */
    SaveUserPreferenceSubjectId(objContext, strSubjectId) {
        let objUserPreference = ApplicationState.GetProperty('UserPreferenceObject')
        let arrPreferenceValues = [{
            uUserPreferenceId: objUserPreference["uUserPreferenceId"],
            vKey: "CurrentSelectedSubjectId",
            vValue: strSubjectId,
        }];

        let objNewUserPreference = {
            ...objUserPreference,
            t_Framework_UserPreference_PreferenceValue: arrPreferenceValues
        }
        let objUserPreferenceEditParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            ["vEditData"]: objNewUserPreference
        };
        Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams, (response) => {
            ApplicationState.SetProperty("UserPreferenceObject", response[0]);
        });
    }

    /**
     * @name GetUserpreferenceSubjectId
     * @summary returns the user preference subjectid
     * */
    GetUserpreferenceSubjectId() {
        let strSubjectId = undefined;
        let objUserPreference = ApplicationState.GetProperty('UserPreferenceObject')
        if (objUserPreference && objUserPreference["t_Framework_UserPreference_PreferenceValue"]) {
            let objSubjectUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].find(x => x["vKey"] == "CurrentSelectedSubjectId");
            if (objSubjectUserPreferenceValue)
                strSubjectId = objSubjectUserPreferenceValue["vValue"]
        }

        return strSubjectId;
    }
}

export default LearningJournalArchive_ModuleProcessor;