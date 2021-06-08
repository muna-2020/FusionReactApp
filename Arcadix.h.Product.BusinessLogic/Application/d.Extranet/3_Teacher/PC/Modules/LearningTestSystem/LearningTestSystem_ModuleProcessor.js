
//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings'
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name LearningTestSystem_ModuleProcessor
* @summary Class for LearningTestSystem_ModuleProcessor module display and manipulate.
*/
class LearningTestSystem_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name constructor
     * @summary Initializing the CycleTypeId
     * */
    constructor() {
        super();
        this.strCycleTypeId = '3';
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Extranet_Pupil_Pupil",
            "Object_Intranet_Test_ExtranetTest",
            "Object_Cockpit_MainClient_ClientSettings",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestSystem",
            "Object_Intranet_Cycle_Cycle",
            "Object_Cockpit_Skin"
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestSystem/LearningTestSystem.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestSystem/LearningTestSystemPopups/TestStatistics/TestStatistics.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestSystem/LearningTestSystemPopups/LearningTestSettings/LearningTestSettings.css"
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
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/LearningTestSystem"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Class
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        let objSubjectsParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "cIsActive": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsReadyForSystemLearningTest": "Y"
                        }
                    }
                ]
            }
        };
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectsParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

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

        let objCycleParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeId
                            }
                        },
                        {
                            "match": {
                                "cIsActive": "Y"
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
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        //Extranet Tests
        let objExtranetTestParams = {
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": ApplicationState.GetProperty("SelectedClassId")
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": props.ClientUserDetails.UserId
                        }
                    },
                ]
            }
        };
        Object_Intranet_Test_ExtranetTest.Initialize(objExtranetTestParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_ExtranetTest];

        //Client settings
        let objClientSettingsParams = {
            "SearchQuery": {
                "should": [
                    {
                        "bool":
                        {
                            "must": [
                                {
                                    "match": {
                                        "vParentKey": "ExtranetTeacher"
                                    }
                                },
                                {
                                    "match": {
                                        "vSubParentKey": "LearningTest"
                                    }
                                },
                                {
                                    "match": {
                                        "vKey": "NumberOfTasksForSystemGeneratedTest"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "bool": {
                            "must": [
                                {
                                    "match": {
                                        "vParentKey": "ExtranetTeacher"
                                    }
                                },
                                {
                                    "match": {
                                        "vSubParentKey": "LearningTest"
                                    }
                                },
                                {
                                    "match": {
                                        "vKey": "NumberOfRepetitionForSystemGeneratedTest"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "bool": {
                            "must": [
                                {
                                    "match": {
                                        "vParentKey": "ExtranetTeacher"
                                    }
                                },
                                {
                                    "match": {
                                        "vSubParentKey": "LearningTest"
                                    }
                                },
                                {
                                    "match": {
                                        "vKey": "TaskFoldersForLearningTest"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "bool": {
                            "must": [
                                {
                                    "match": {
                                        "vParentKey": "TestConfiguration"
                                    }
                                },
                                {
                                    "match": {
                                        "vSubParentKey": "Task"
                                    }
                                },
                                {
                                    "match": {
                                        "vKey": "LearningTestSkinId"
                                    }
                                },
                                {
                                    "match":
                                    {
                                        "iApplicationTypeId": 1
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        };
        Object_Cockpit_MainClient_ClientSettings.Initialize(objClientSettingsParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];

        return arrDataRequest;
    }

    /**
     * @name GetExtranetTestParams
     * @param {any} objContext objContext
     * @summary Gets the extranet test parameters
     */
    GetExtranetTestData(objContext) {
        let arrDataRequest = [];
        //ExtranetTest
        let objExtranetTestParams = {
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": ApplicationState.GetProperty("SelectedClassId")
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objWeekDisplaySelection.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": objContext.props.ClientUserDetails.UserId
                        }
                    }

                ]
            }
        };
        Object_Intranet_Test_ExtranetTest.Initialize(objExtranetTestParams)
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_ExtranetTest];

        (new ObjectQueue()).QueueAndExecute(arrDataRequest);
    }

    /**
     * @name GetDataAfterClassChange
     * @summary Get initials request params of pupil for the component.
     */
    GetDataAfterClassChange(objContext) {
        let strClassId = objContext.state.strSelectedClassId;
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        ApplicationState.SetProperty("blnShowAnimation", true);
        //pupil
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
        let arrDataRequest = [Object_Extranet_Pupil_Pupil];
        //Extranet Tests
        let objExtranetTestParams = {
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": objContext.props.ClientUserDetails.UserId
                        }
                    },
                ]
            }
        };
        Object_Intranet_Test_ExtranetTest.Initialize(objExtranetTestParams);
        arrDataRequest.push(Object_Intranet_Test_ExtranetTest);
        ApplicationState.SetProperty("blnShowAnimation", true);
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name GetClassDropDownData
     * @param {*} objContext objContext
     * @summary returns an array of classes to load in the drop down
     * @returns {*} array
     */
    GetClassDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", objContext.props);
        let arrTempClass = [];
        let strTeacherId = global.ClientUserDetails.UserId;
        objTextResource = objTextResource ? objTextResource : {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data.map((objClass) => {
                return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
            });
        }

        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrTempClass.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
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
        }
        );
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
        return arrFinalClassData;
    }

    /**
     * @name GetWeekDisplayDropdownData
     * @param {*} objContext objContext
     * @summary returns Week Display dropdown.
     * @returns {*} array
     */
    GetWeekDisplayDropdownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", objContext.props);
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
     * @name GetFilteredTestData
     * @summary returns the Test Data beased on filters selected from dropdown.
     * @param {any} objContext
     */
    GetFilteredTestData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrFilteredData = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + this.strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objWeekDisplaySelection.uSchoolYearPeriodId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data;

        if (arrFilteredData && arrFilteredData.length > 0) {
            arrFilteredData = arrFilteredData.filter(objTest => objTest["t_TestDrive_Test_TestProperty"].length > 0 && objTest["t_TestDrive_Test_TestProperty"][0]["cIsSystemGenerated"] == "Y");
            if (objContext.state.blnSearchBtnClicked) {
                if (objContext.state.strSelectedPupilId != -1) {
                    arrFilteredData = arrFilteredData.filter(objTempData => objTempData["t_TestDrive_Cycle_Pupil"].filter(objTempPupilTestData => objTempPupilTestData["uPupilId"] === objContext.state.strSelectedPupilId).length > 0);
                }
                if (objContext.state.intSelectedSubjectId !== -1) {
                    let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y").Data;;
                    let arrSubSubjects = arrAllSubjects.filter(objTempData => objTempData["iParentSubjectId"] == objContext.state.intSelectedSubjectId);
                    let arrTestBySubSubjectData = [];

                    arrSubSubjects.forEach(objTempSubjectData => {
                        arrTestBySubSubjectData = [...arrTestBySubSubjectData, ...arrFilteredData.filter(objTempData => objTempData["iSubjectId"] === objTempSubjectData["iSubjectId"])];
                    });
                    arrFilteredData = [];
                    arrFilteredData = [...arrTestBySubSubjectData];
                }
                if (objContext.state.intSelectedSubSubjectId !== -1) {
                    arrFilteredData = arrFilteredData.filter(objTempData => objTempData["iSubjectId"] === objContext.state.intSelectedSubSubjectId);
                }
            }
            return [...arrFilteredData];
        } else return [];
    }

    /**
     * @name OnClickSearchBtn
     * @summary Updates the earch button status
     * @param {any} objContext
     */
    OnClickSearchBtn(objContext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { blnSearchBtnClicked: true } })
    }

    /**
     * @name GetClassName
     * @param {any} objContext objContext
     * @summary Gets the class name
     * @returns {*} string
     */
    GetClassName(objContext) {
        var strClassName = "";
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        var arrClassdata = objContext.LearningTestSystem_ModuleProcessor.GetClassDropDownData(objContext);
        arrClassdata.map((arrClasses) => {
            arrClasses.Data.map((obj) => {
                if (obj["uClassId"] === strClassId) {
                    strClassName = obj["vClassName"];
                }
            });
        });
        return strClassName;
    }

    /**
     * @name GetFormattedDate
     * @param {any} date date
     * @summary Formats the date
     * @returns {*} array of date
     */
    GetFormattedDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year].join('.');
    }

    /**
     * @name OnChangeClassDropDown
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Triggers when the class dropdown selection changes,set the selected class id to state
     */
    OnChangeClassDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strSelectedClassId": objItem.uClassId } });
    }

    /**
     * @name OnChangePupilDropDown
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Triggers when the pupil dropdown selection changes,set the selected pupil id to state
     */
    OnChangePupilDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strSelectedPupilId": objItem.uPupilId } });
    }

    /**
     * @name OnChangeSubjectDropDown
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Triggers when the subject dropdown selection changes, set the selected subject id to state
     */
    OnChangeSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": -1 } });
        this.SaveUserPreferenceSubjectId(objContext, objItem.iSubjectId)
    }

    /**
     * @name OnChangeSubSubjectDropDown
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Triggers when the sub subject dropdown selection changes,set the selected sub-subject id to state
     */
    OnChangeSubSubjectDropDown(objContext, objItem) {

        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubSubjectId": objItem.iSubjectId } });
    }

    /**
     * @name OnChangeWeekDisplay
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Trigerred when the change is there in week display component.
     */
    OnChangeWeekDisplay(objContext, objItem) {
        if (objContext.state.objWeekDisplaySelection.uSchoolYearPeriodId == "") {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let arrExtranetTestData = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + this.strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;;uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data
            let strExtranetTestEnityKey = "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + this.strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId
            if (DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, strExtranetTestEnityKey)["Data"] == undefined) {
                let obExtranetTestData = {
                    Filter: strExtranetTestEnityKey,
                    Value: {
                        Data: arrExtranetTestData,
                        TimeStamp: "",
                        PrimaryKeyName: "uTestId",
                        Count: arrExtranetTestData.length
                    }
                };
                ArcadixCacheData.AddData("Object_Intranet_Test_ExtranetTest", obExtranetTestData, () => {

                });
            }
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "objWeekDisplaySelection": objItem } });
    }

    /**
     * @name OnChangeDisplayDropdown
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Trigerred when the selection changes in the WeekDisplayDropdown.
     */
    OnChangeDisplayDropdown(objContext, objItem) {
        ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
    }

    /**
     * @name GetCycleObject
     * @param {any} objContext objContext
     * @summary Returns the cycle object
     * @returns {*} object
     */
    GetCycleObject(objContext) {
        let objCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + this.strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"][0];
        return objCycle;
    }

    /**
    * @name GetMetaDataPupilDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataPupilDropdown() {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uPupilId"
        };
    }

    /**
    * @name GetResourceDataDropdown
    * @summary It returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsDataPupilDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for pupil dropdown component
    * @return {object} objEventBasics
   */
    GetEventsDataPupilDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.LearningTestSystem_ModuleProcessor.OnChangePupilDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetMetaSubjectDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaSubjectDropdown() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data"
        };
    }

    /**
    * @name GetEventsDataSubjectDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for subject dropdown component
    * @return {object} objEventBasics
   */
    GetEventsDataSubjectDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.LearningTestSystem_ModuleProcessor.OnChangeSubjectDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetEventsDataSubSubjectDropdown
     * @param {object} objContext Context object
     * @summary Returns object that contains all the Event methods for sub-subject dropdown component
     * @return {object} objEventBasics
    */
    GetEventsDataSubSubjectDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.LearningTestSystem_ModuleProcessor.OnChangeSubSubjectDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetMetaWeekDisplayDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaWeekDisplayDropdown() {
        return {
            DisplayColumn: "Key",
            ValueColumn: "Value"
        };
    }

    /**
     * @name GetEventsWeekDisplayDropdown
     * @param {object} objContext Context object
     * @summary Returns object that contains all the Event methods for week-display dropdown component
     * @return {object} objEventBasics
    */
    GetEventsWeekDisplayDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.LearningTestSystem_ModuleProcessor.OnChangeDisplayDropdown(objContext, objItem)
        };
    }

    /**
     * @name GetMetaDataFillheightSystemTest
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
    */
    GetMetaDataFillheightSystemTest() {
        return {
            HeaderIds: ["Header", "LearningTestSystemHeader", "LearningTestSystemControls", "ContentHead"],
            FooterIds: ["FooterLearningTest"]
        };
    }

    /**
     * @name LearningTestStatisticsPopUp
     * @param {object} objContext objContext
     * @param {object} objTestData objTestData
     * @param {object} objTempPupilDetails objTempPupilDetails
     * @param {object} objSubjectData objSubjectData
     * @param {object} objSubSubjectData objSubSubjectData
     * @param {object} strClassName strClassName
     * @summary LearningTestStatistic popup call
     * */
    LearningTestStatisticsPopUp(objContext, objTestData, objTempPupilDetails, objSubjectData, objSubSubjectData, strClassName) {
        let objCycle = objContext.LearningTestSystem_ModuleProcessor.GetCycleObject(objContext);
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", objContext.props);
        let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"]
        let arrFilteredClientSettings = arrClientSettings.filter(x => x["vParentKey"] == "TestConfiguration" && x["vSubParentKey"] == "Task" && x["vKey"] == "LearningTestSkinId");
        let strSkinId = "";
        let objSkin = arrFilteredClientSettings.find(x => x["iMainClientId"] == objContext.props.JConfiguration.MainClientId);
        if (objSkin == undefined) {
            objSkin = arrFilteredClientSettings[0];
        }
        strSkinId = objSkin["vValue"];
        let strSkinName = "";
        let arrSkinData = DataRef(objContext.props.Object_Cockpit_Skin, "Object_Cockpit_Skin;uSkinId;" + strSkinId)["Data"];
        if (arrSkinData && arrSkinData.length > 0) {
            strSkinName = arrSkinData[0]["vSkinName"];
        }
        Popup.ShowPopup({
            Data: {
                "objTestData": objTestData,
                "objPupilData": objTempPupilDetails,
                "strCycleId": objCycle["uCycleId"],
                "LearningTestSkinId": strSkinId,
                "SkinName": strSkinName
            },
            Meta: {
                PopupName: 'LearningTestStatistics',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: '98%',
                Width: '98%'
            },
            Resource: {
                Text: {
                    "objTestStatisticsData": {
                        "vFirstName": objTempPupilDetails["vFirstName"],
                        "vSubjectName": objSubjectData["t_TestDrive_Subject_Data"][0]["vSubjectName"],
                        "vSubSubjectName": objSubSubjectData["t_TestDrive_Subject_Data"][0]["vSubjectName"],
                        "vTestName": objTestData["vTestName"],
                        "dtCreatedOn": objContext.LearningTestSystem_ModuleProcessor.GetFormattedDate(objTestData["dtCreatedOn"]),
                        "vClassName": strClassName,
                        "iTestUsageId": objTestData["iTestUsageId"]
                    },
                    "objTextResource": objTextResource
                },
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name LearningTestSettingsPopUp
     * @summary LearningTestSettingsPopUp popup call
     * */
    LearningTestSettingsPopUp(objContext) {
        Popup.ShowPopup({
            Data: {
                objContext
            },
            Meta: {
                PopupName: 'LearningTestSettings',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: '98%',
                Width: '98%'
            },
            Resource: {
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name SetApplicationState
     * @param {any} objContextPopup objContextPopup
     * @param {any} objContext objContext
     * @summary sets the application state
     */
    SetApplicationState(objContextPopup, objContext) {
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "SystemNumberOfTasks": objContextPopup.state.NumberOfTasks, "SysytemNumberOfRepetition": objContextPopup.state.NumberOfRepetition
            }
        });
    }

    /**
     * @name UpdateInformationPopupStatus
     * @summary updates the ShowInformation bar status
     * @param {any} objContext
     */
    UpdateInformationPopupStatus(objContext) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [
                {
                    vValue: objContext.state.blnShowInformationBar ? "N" : "Y", //changing status here
                    vKey: "ShowInformationBar_TeacherLearningTestSystem"
                }
            ]
        };
        let objUserPreferenceEditParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            ["vEditData"]: objNewUserPreference
        };
        Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams, (response) => {
            ApplicationState.SetProperty("UserPreferenceObject", response[0]);
            objContext.dispatch({ type: 'SET_STATE', payload: { blnShowInformationBar: !objContext.state.blnShowInformationBar } });
        })
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
     * @name GetSkinData
     * @summary gets skinData based on skin id.
     * @param {any} objContext
     */
    GetSkinData(objContext) {
        let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"]
        if (arrClientSettings) {

            let arrFilteredData = arrClientSettings.filter(x => x["vParentKey"] == "TestConfiguration" && x["vSubParentKey"] == "Task" && x["vKey"] == "LearningTestSkinId");
            let strSkinId = "";
            let objSkin = arrFilteredData.find(x => x["iMainClientId"] == objContext.props.JConfiguration.MainClientId);
            if (objSkin == undefined) {
                objSkin = arrFilteredData[0];
            }
            strSkinId = objSkin["vValue"];
            let arrSkinData = DataRef(objContext.props.Object_Cockpit_Skin, "Object_Cockpit_Skin;uSkinId;" + strSkinId)["Data"];
            if (arrSkinData == undefined || arrSkinData.length == 0) {
                let arrDataRequest = [];
                let objSkinParams = {
                    "SearchQuery": {
                        ["must"]: [
                            {
                                "match": {
                                    "uSkinId": strSkinId
                                }
                            }
                        ]
                    }
                };
                Object_Cockpit_Skin.Initialize(objSkinParams);
                arrDataRequest = [...arrDataRequest, Object_Cockpit_Skin];

                (new ObjectQueue()).QueueAndExecute(arrDataRequest);
            }
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

export default LearningTestSystem_ModuleProcessor;