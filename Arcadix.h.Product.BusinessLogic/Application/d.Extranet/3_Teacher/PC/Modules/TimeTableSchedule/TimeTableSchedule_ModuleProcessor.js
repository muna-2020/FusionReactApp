//Objects required for module.
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_School_TimeTableClassTime from '@shared/Object/d.Extranet/2_School/TimeTableClassTime/TimeTableClassTime';
import Object_Extranet_Teacher_TimeTableDay from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableDay/TimeTableDay';
import Object_Extranet_Teacher_TimeTableColor from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableColor/TimeTableColor';
import Object_Extranet_Teacher_TimeTableSegment from '@shared/Object/d.Extranet/3_Teacher/Planner/TimeTableSegment/TimeTableSegment';
import Object_Extranet_Teacher_ClassGroup from '@shared/Object/d.Extranet/3_Teacher/ClassGroup/ClassGroup';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_School_SchoolSubject from '@shared/Object/d.Extranet/2_School/SchoolSubject/SchoolSubject';

/**
* @name TimeTableSchedule_ModuleProcessor
* @summary Class for TimeTableSchedule module display and manipulate.
*/
class TimeTableSchedule_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Teacher", "Object_Extranet_Teacher_SchoolYearPeriod", "Object_Extranet_Teacher_Class", "Object_Extranet_School_TimeTableClassTime",
            "Object_Extranet_Teacher_TimeTableDay", "Object_Extranet_Teacher_TimeTableColor", "Object_Extranet_Teacher_TimeTableSegment",
            "Object_Extranet_Teacher_ClassGroup", "Object_Intranet_Taxonomy_Subject", "Object_Extranet_School_SchoolSubject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TimeTableSchedule"];
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
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TimeTableSchedule/TimeTableSchedule.css",
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
        let strSchoolId = props.ClientUserDetails.TeacherDetails.uSchoolId;
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrDataRequest = [];

        //Teacher
        let objTeachersParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": strSchoolId,
                "Type": "nested"
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_Teacher.Initialize(objTeachersParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //School Year Period.
        let objSchoolYearPeriodParams = {
            "SearchQuery": {
                "must":
                    [
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

        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams); 
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //Class
        let objClassesParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Teacher",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassesParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //TimeTableClassTime
        let objTimeTableTimeParams = {
            "ForeignKeyFilter": {
                "uUserId": strSchoolId
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

        //TimeTableColor
        Object_Extranet_Teacher_TimeTableColor.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_TimeTableColor];

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

        //ClassGroup
        let objClassGroupsParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_ClassGroup.Initialize(objClassGroupsParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_ClassGroup];

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
                ],
                should: [
                    {
                        match: {
                            'cIsReadyForManualLearningTest': 'Y'
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

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/TimeTableSchedule"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name GetSubjectExpertTechersByClass
    * @param {object} objSelClass Passes Selected Class
    * @param {Array} arrTeacherData Passes TeacherData
    * @summary Checks if the data is loaded to props and then set the component state accordingly.
    * @returns {Array} DropDown Teacher data
    */
    GetSubjectExpertTechersByClass(objSelClass, arrTeacherData) {
        if (objSelClass) {
            let arrTeacherByClass = objSelClass.t_TestDrive_Member_Class_Teacher.filter(tchr => tchr.cIsCoTeacher == "Y" || (tchr.cIsCoTeacher == "N" && tchr.cIsSubjectExpert == "N"))
            let arrCopyTeachers = arrTeacherData.map(tchr => {
                return {
                    ...tchr
                };
            });
            let arrDropDownTeacher = [];
            for (let objTchr of arrCopyTeachers) {
                if (arrTeacherByClass.find(tchr => tchr.uTeacherId == objTchr.uTeacherId)) {
                    arrDropDownTeacher = [...arrDropDownTeacher, objTchr];
                }
            }
            return arrDropDownTeacher;
        } else return [];
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header",
                "outletBand",
                "SubNavigation",
                "TimeTableScheduleHeader"]
        };
    }

    /**
    * @name GetClassDropDownData
    * @param {Array} arrClassData Passes Class Data
    * @param {object} objTextResource Passes Textresource
    * @summary Gets class dropdown data
    * @returns {Array} FinalClassData
    */
    GetClassDropDownData(arrClassData, objTextResource) {
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        let strTeacherId = global.ClientUserDetails.UserId;
        arrClassData.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"; }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsSubjectExpert === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
            }
        });
        let arrFinalClassData = [
            {
                "Title": objTextResource.ClassTeacherTextForDropDown,
                "Data": arrMainClassData
            },
            {
                "Title": objTextResource.CoTeacherTextForDropDown,
                "Data": arrCoTeacherClassData
            },
            {
                "Title": objTextResource.SubjectExpertTeacherTextForDropDown,
                "Data": arrSubjectExpertClassData
            }
        ];
        return arrFinalClassData;
    }

    /**
    * @name OnClassDropDownChange
    * @param {object} objContext Passes Context object
    * @param {object} objSelClass Passes Selected Class
    * @param {Array} arrTeacherData Passes TeacherData 
    * @param {Array} arrSchoolYearData Passes SchoolYearData
    * @summary Executes when class dropdown is changed
    */
    OnClassDropDownChange(objContext, objSelClass, arrTeacherData, arrSchoolYearData) {
        let arrDropDownTeacher = this.GetSubjectExpertTechersByClass(objSelClass, arrTeacherData);
        let objSchoolYearPeriod = arrSchoolYearData.find(sy => sy["uSchoolYearPeriodId"] == objSelClass["uSchoolYearPeriodId"]);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "arrDropDownTeacher": arrDropDownTeacher,
                "objSelClass": objSelClass,
                "objSelTeacher": arrDropDownTeacher[0],
                "objSelSchoolYearPeriod": objSchoolYearPeriod
            }
        });
    }

    /**
    * @name GetSchoolYearDropdownMetaData
    * @summary Gets the meta data for SchoolYear dropdown
    * @returns {object} Meta data objects for SchoolYear dropdown
    */
    GetSchoolYearDropdownMetaData() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "uSchoolYearPeriodId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYearPeriod_Data"
        };
    }

    /**
    * @name GetTeacherDropdownMetaData
    * @summary Gets the meta data for Teacher dropdown
    * @returns {object} Meta data objects for Teacher dropdown
    */
    GetTeacherDropdownMetaData() {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uTeacherId"
        };
    }

    /**
    * @name GetSchoolYearDropdownData
    * @param {object} objData SchoolYearPeriod data
    * @param {object} objContext Context object
    * @summary Gets the data for SchoolYear dropdown
    * @returns {object} Meta objects for SchoolYear dropdown
    */
    GetSchoolYearDropdownData(objData, objContext) {
        let strSchoolYearPeriodId = objContext.state.objSelSchoolYearPeriod ? objContext.state.objSelSchoolYearPeriod.uSchoolYearPeriodId : objData["arrSchoolYearPeriod"] && objData["arrSchoolYearPeriod"].length > 0 ? objData["arrSchoolYearPeriod"][0]["uSchoolYearPeriodId"] : "";
        return {
            DropdownData: objData.arrSchoolYearPeriod,
            SelectedValue: strSchoolYearPeriodId
        };
    }

    /**
    * @name GetSchoolYearDropdownData
    * @param {object} objContext Context object
    * @summary Gets the data for Teacher dropdown
    * @returns {object} Meta objects for Teacher dropdown
    */
    GetTeacherDropdownData(objContext) {
        return {
            DropdownData: objContext.state.arrDropDownTeacher,
            SelectedValue: objContext.state.arrDropDownTeacher.length > 0 ? objContext.state.arrDropDownTeacher[0].uTeacherId : -1
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
    * @name GetSchoolYearDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year dropdown.
    * @returns {object} objEventBasics
    */
    GetSchoolYearDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.TimeTableSchedule_ModuleProcessor.SchoolYearDropDownChange(objContext, objItem)
        };
    }

    /**
    * @name GetTeacherDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Teacher dropdown.
    * @returns {object} objEventBasics
    */
    GetTeacherDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.TimeTableSchedule_ModuleProcessor.TeacherDropDownChange(objContext, objItem)
        };
    }

    /**
    * @name FormDataToDisplay
    * @param {object} objContext Passes Context object
    * @param {object} objData Passes Data
    * @summary Forms the display data
    * @returns {Array} FinalData to display
    */
    FormDataToDisplay(objContext, objData) {
        let objDataCopy = JSON.parse(JSON.stringify(objData));
        let arrClassDayData = objDataCopy.arrDayData;
        let arrSegmentData = objDataCopy.arrSegmentData.filter(seg => seg["cIsDeleted"] == "N");
        let arrClassTimeData = objDataCopy.arrTimeData;
        let arrClassGroupData = objDataCopy.arrClassGroupData;
        let arrTeacherData = objDataCopy.arrTeacher;
        let arrSubjectData = objDataCopy.arrSubjectData;
        let strClassId = objContext.state.objSelClass ? objContext.state.objSelClass["uClassId"] : objContext.state.strUserPreferenceClassId;
        let strSchoolYearPeriodId = objContext.state.objSelSchoolYearPeriod ? objContext.state.objSelSchoolYearPeriod.uSchoolYearPeriodId : "";
        let arrFinalData = [];
        for (let clsTime of arrClassTimeData) {
            let objRow = {
                uClassTimeId: clsTime.uClassTimeId,
                vClassFrom: clsTime.vClassTimeFrom,
                vClassTo: clsTime.vClassTimeTo,
                cIsBreak: clsTime.cIsBreak,
                iDisplayOrder: clsTime.iDisplayOrder,
                arrDays: []
            };
            for (let clsDay of arrClassDayData) {
                let objDay = {
                    uTimeTableDayId: clsDay.uTimeTableDayId,
                    iDisplayOrder: clsDay.iDisplayOrder,
                    arrSegments: arrSegmentData.filter(seg => seg.uClassTimeId == clsTime.uClassTimeId && clsDay.uTimeTableDayId == seg.uTimeTableDayId && seg.uClassId == strClassId && seg.uSchoolYearPeriodId == strSchoolYearPeriodId).map(segData => {
                        return {
                            ...segData,
                            objClassGroup: arrClassGroupData.find(clsGrp => clsGrp.uClassGroupId == segData.uClassGroupId),
                            objTeacher: arrTeacherData.find(tchr => tchr.uTeacherId == segData.uTeacherId),
                            objSubject: arrSubjectData.find(objSub => objSub.iSubjectId == segData.iSubjectId)
                        };
                    })
                };
                objRow.arrDays = [...objRow.arrDays, objDay];
            }
            arrFinalData = [...arrFinalData, objRow];
        }
        return arrFinalData;
    }

    /**
    * @name FormDataToDisplay
    * @param {object} objContext Passes Context object
    * @summary Returns the data required for the schedule.
    * @returns {object} Data
    */
    GetData(objContext) {
        let strSchoolId = objContext.props.ClientUserDetails.TeacherDetails.uSchoolId;
        let strClassId = objContext.state.objSelClass ? objContext.state.objSelClass["uClassId"] : objContext.state.strUserPreferenceClassId;
        let objResourceData = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TimeTableSchedule", objContext.props);
        objResourceData = objResourceData ? objResourceData : {};
        let arrTeacherData = [];
        let arrSchoolYearPeriodData = [];
        let arrClassData = [];
        let arrDayData = [];
        let arrColorData = [];
        let arrTimeData = [];
        let arrClassGroupData = [];
        let arrDefaultSubjectData = [];
        let arrSchoolSubjectData = [];
        let arrSubjectData = [];
        let arrSegmentData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)) {
            arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")) {
            arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)) {
            arrDayData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_TimeTableColor)) {
            arrColorData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableColor)["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId + ";cIsDeleted;N")) {
            arrTimeData = DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_ClassGroup)) {
            arrClassGroupData = DataRef(objContext.props.Object_Extranet_Teacher_ClassGroup)["Data"];
        }
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")) {
            arrDefaultSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")) {
            arrSchoolSubjectData = DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")) {
            arrSegmentData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
        }

        arrSubjectData = [...arrDefaultSubjectData, ...arrSchoolSubjectData];


        return {
            arrSchoolYearPeriod: arrSchoolYearPeriodData,
            arrTeacher: arrTeacherData,
            arrClass: arrClassData,
            objTextResource: objResourceData,
            arrDayData: arrDayData,
            arrTimeData: arrTimeData,
            arrClassGroupData: arrClassGroupData,
            arrSubjectData: arrSubjectData,
            arrSegmentData: arrSegmentData ? arrSegmentData.filter(x => x.cIsDeleted == 'N') : [],
            arrColorData: arrColorData
        };
    }

    /**
    * @name GetDefaultSchoolYearPeriod
    * @summary Gets Default SchoolYearPeriod
    */
    GetDefaultSchoolYearPeriod() {
        if (objData.SchoolYearPeriod.length !== 0) {
            objData.SchoolYearPeriod.map((obj, index) => {
                var a = obj.t_TestDrive_Member_Class_SchoolYearPeriod_Data[0].vSchoolYearName;
                var b = obj.t_TestDrive_Member_Class_SchoolYearPeriod_Data[0].iLanguageId;
                var c = obj.uSchoolYearPeriodId;
                var prevYear = (new Date().getFullYear() - 1).toString();
                if (prevYear === a.split("/")[0]) {
                    SelectedSchoolYearPeriodId = c;
                }
                schoolYearPeriodDropDownData.push({ a, b, c });
            });
        }
    }

    /**
    * @name SchoolYearDropDownChange
    * @param {object} objContext Passes Context object
    * @param {object} objSchoolYear Passes SchoolYear
    * @summary Sets state for SchoolYearPeriod
    */
    SchoolYearDropDownChange(objContext, objSchoolYear) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "objSelSchoolYearPeriod": objSchoolYear } });
    }

    /**
    * @name TeacherDropDownChange
    * @param {object} objContext Passes Context object
    * @param {object} objTeacher Passes Teacher
    * @summary Sets state for Teacher
    */
    TeacherDropDownChange(objContext, objTeacher) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "objSelTeacher": objTeacher } });
    }

    /**
    * @name OnClickShow
    * @param {object} objContext Passes Context object
    * @summary Show the timetable schedule
    */
    OnClickShow(objContext) {
        let objGetTimeTableSegmentParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelClass["uClassId"]
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

        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Object_Extranet_Teacher_TimeTableSegment.GetData(objGetTimeTableSegmentParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                objContext.dispatch({ type: 'SET_STATE', payload: { "blnInitialDataLoaded": false } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        });
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown" ],
            "Files": []
        }
    }

}

export default TimeTableSchedule_ModuleProcessor;