//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Module object imports.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';
import Object_TestApplication_LearningTestLoginAndResult from '@shared/Object/f.TestApplication/TestLoginAndResult/LearningTestLoginAndResult/LearningTestLoginAndResult';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';

//helper classes
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name LearningTestTeacher_ModuleProcessor
 * @summary module processor for  Learning Test Teacher results.
 * */
class LearningTestTeacher_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name LearningTestTeacher_ModuleProcessor
     * @summary used for define CycleTypeId
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
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestTeacher", "Object_Extranet_Teacher_Class", "Object_Extranet_Pupil_Pupil",
            "Object_Intranet_Taxonomy_Subject", "Object_Intranet_Cycle_Cycle", "Object_Intranet_Test_ExtranetTest", "Object_TestApplication_LearningTestLoginAndResult", "Object_Cockpit_MainClient_ClientSettings",
            "Object_Cockpit_Skin"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestTeacher/LearningTestTeacher.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css"
        ];
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {

        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];

        //Text Resource
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/LearningTestTeacher"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //class
        let objGetClassesParams = {
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
            },
            "SortKeys": [],
            "OutputColumns": []
        };
        Object_Extranet_Teacher_Class.Initialize(objGetClassesParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Pupil",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Pupil.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    },
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

        //subjects
        let objSubjectParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsReadyForManualLearningTest": "Y"
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
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

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

        //Cycle
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

        //Main testlogins and results.
        let objTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        Object_TestApplication_LearningTestLoginAndResult.Initialize([objTestLoginAndResultParams])
        arrDataRequest = [...arrDataRequest, Object_TestApplication_LearningTestLoginAndResult];

        //Extranet test
        let objExtranetTestParams = {
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
                            "uSchoolYearPeriodId": ''
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": props.ClientUserDetails.UserId,
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Intranet_Test_ExtranetTest.Initialize(objExtranetTestParams)
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_ExtranetTest];

        return arrDataRequest;
    }

    /**
   * @name GetFillHeightMetaData
   * @summary it returns the object of metadatas
   * @returns {array} MetaData
   */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "LearningTestTeacherHeader", "LearningTestTeacherControls", "ContentHead"],
            FooterIds: ["FooterLearningTest"]
        };
    }

    /**
    * @name GetPupilDropdownMetaData
    * @summary Gets the meta data for Pupil dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetPupilDropdownMetaData(objContext) {
        return {
            "DisplayColumn": "vFirstName",
            "ValueColumn": "uPupilId",
            "DefaultOptionValue": "00000000-0000-0000-0000-000000000000",
            "ShowDefaultOption": true,
            "DefaultOptionTextKey": "All"
        };
    }

    /**
    * @name GetPupilDropdownData
    * @param {object} objContext Context object
    * @summary Gets the data for Pupil dropdown
    * @returns {object} Meta objects for Pupil dropdown
    */
    GetPupilDropdownData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        if (arrPupilData == undefined)
            arrPupilData = [];
        return {
            DropdownData: arrPupilData,
            SelectedValue: objContext.state.strSelectedPupilId
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
            OnChangeEventHandler: (objItem) => this.OnChangePupilDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetSubjectDropdownMetaData(objContext) {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data",
            "DefaultOptionValue": -1,
            "ShowDefaultOption": true,
            "DefaultOptionTextKey": "All"
        };
    }

    /**
     * @name GetSubjectDropdownData
     * @summary Gets the data for Subject dropdown
     * @param {any} objContext
     */
    GetSubjectDropdownData(objContext) {
        let arrAllSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N")) {
            arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data;
        }
        let arrSubjects = arrAllSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
        return {
            DropdownData: arrSubjects,
            SelectedValue: objContext.state.intSelectedParentSubjectId
        };
    }

    /**
     * @name GetSubjectDropdownEvents
     * @summary Returns object that contains all the Event methods for Subject dropdown.
     * @param {any} objContext
     */
    GetSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeSubjectDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetSubjectDropdownMetaData
    * @summary Gets the meta data for SubSubject dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetSubSubjectDropdownMetaData(objContext) {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data",
            "DefaultOptionValue": -1,
            "ShowDefaultOption": true,
            "DefaultOptionTextKey": "All"
        };
    }

    /**
     * @name GetSubSubjectDropdownData
     * @summary Gets the data for SubSubject dropdown
     * @param {any} objContext
     */
    GetSubSubjectDropdownData(objContext) {
        let arrAllSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N")) {
            arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data;
        }
        let arrSubjects = arrAllSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
        let iParentSubjectId = objContext.state.intSelectedParentSubjectId ? objContext.state.intSelectedParentSubjectId : arrSubjects.length > 0 ? arrSubjects[0]["iSubjectId"] : -1;
        let arrSubSubjects = arrAllSubjects.filter(objTempData => objTempData["iParentSubjectId"] == iParentSubjectId);

        return {
            DropdownData: arrSubSubjects,
            SelectedValue: objContext.state.intSelectedSubSubjectId
        };
    }

    /**
     * @name GetSubSubjectDropdownEvents
     * @summary Returns object that contains all the Event methods for SubSubject dropdown.
     * @param {any} objContext
     */
    GetSubSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeSubSubjectDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetModusDropdownMetaData
    * @summary Gets the meta data for Modus dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetModusDropdownMetaData() {
        return {
            "DisplayColumn": "Key",
            "ValueColumn": "Value",
            "DefaultOptionValue": -1, //Pass the id of the default option text       
            "ShowDefaultOption": true, //when true shows the DefaultOptionText (from resource) in the Dropdown
            "DefaultOptionTextKey": "All"
        };
    }

    /**
     * @name GetModusDropdownData
     * @summary Gets the data for Modus dropdown
     * @param {any} objContext
     * @param {any} objTextResource
     */
    GetModusDropdownData(objContext, objTextResource) {
        objTextResource = objTextResource ? objTextResource : {};
        let arrModusData = [
            { Key: objTextResource["ModusDropdownItemFirst"], Value: 1 },//Lernen
            { Key: objTextResource["ModusDropdownItemSecond"], Value: 2 }//Prufen
        ];
        return {
            DropdownData: arrModusData,
            SelectedValue: objContext.state.intSelectedModusId
        };
    }

    /**
     * @name GetModusDropdownEvents
     * @summary Returns object that contains all the Event methods for Modus dropdown.
     * @param {any} objContext
     */
    GetModusDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeModusDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetStatusDropdownMetaData
    * @summary Gets the meta data for Staus dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetStatusDropdownMetaData() {
        return {
            DisplayColumn: "Key",
            ValueColumn: "Value"
        };
    }

    /**
     * @name GetStatusDropdownData
     * @summary Gets the data for Status dropdown
     * @param {any} objContext
     * @param {any} objTextResource
     */
    GetStatusDropdownData(objContext, objTextResource) {
        objTextResource = objTextResource ? objTextResource : {};
        let arrStatusData = [
            { Key: objTextResource["StatusToggleDataActive"], Value: 1 },
            { Key: objTextResource["StatusToggleDataArchive"], Value: 2 }
        ];
        return {
            DropdownData: arrStatusData,
            SelectedValue: objContext.state.intStatusToggle
        };
    }

    /**
    * @name GetStatusDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Status dropdown.
    * @returns {object} objEventBasics
    */
    GetStatusDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeStatusToggleDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdowns
    * @returns {object} object carrying the skin path
    */
    GetResourceData(objTextResource) {
        objTextResource = objTextResource ? objTextResource : {};
        let objText = {
            "All": objTextResource["AllOptionText"]
        };
        return {
            SkinPath: JConfiguration.ExtranetSkinPath,
            Text: objText
        };
    }

    /**
    * @name GetTimePeriodDropdownMetaData
    * @summary Gets the meta data for TimePeriod dropdown
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetTimePeriodDropdownMetaData() {
        return {
            DisplayColumn: "Key",
            ValueColumn: "Value"
        };
    }

    /**
    * @name GetTimePeriodDropdownData
    * @param {object} objContext Context object
    * @param {object} objTextResource
    * @summary Gets the data for Pupil dropdown
    * @returns {object} Meta objects for Pupil dropdown
    */
    GetTimePeriodDropdownData(objContext, objTextResource) {
        objTextResource = objTextResource ? objTextResource : {};
        let arrTimePeriodData = [
            { Key: objTextResource["WeekDisplayDropdownWeekTitle"], Value: 2 },
            { Key: objTextResource["WeekDisplayDropdownSemesterTitle"], Value: 3 },
            { Key: objTextResource["WeekDisplayDropdownSchoolYearTitle"], Value: 4 }
        ];
        let iSelectedWeekDisplayValue = ApplicationState.GetProperty("DisplayFor")
        return {
            DropdownData: arrTimePeriodData,
            SelectedValue: iSelectedWeekDisplayValue
        };
    }

    /**
    * @name GetTimePeriodDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for TimePeriod dropdown.
    * @returns {object} objEventBasics
    */
    GetTimePeriodDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeDisplayDropdown(objContext, objItem)
        };
    }

    /**
    * @name GetTimePeriodResourceData
    * @summary Gets the resource data required for the time period dropdown
    * @returns {object} object carrying the skin path
    */
    GetTimePeriodResourceData() {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name GetDataAfterClassChange
    * @summary Get api call params for TestLoginAndResult and Pupil, when the selection of class fropdown is changed.
    * @param {*} JConfiguration 
    * @param {*} props 
    */
    GetDataAfterClassChange(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];
        //pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Pupil",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Pupil.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    },
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

        //Main testlogins and results.
        let objTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        Object_TestApplication_LearningTestLoginAndResult.Initialize([objTestLoginAndResultParams])
        arrDataRequest = [...arrDataRequest, Object_TestApplication_LearningTestLoginAndResult];

        //Extranet test
        let objExtranetTestParams = {
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
                            "uSchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": objContext.props.ClientUserDetails.UserId,
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Intranet_Test_ExtranetTest.Initialize(objExtranetTestParams)
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_ExtranetTest];
        ApplicationState.SetProperty("blnShowAnimation", true);
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    };

    /**
     * @name GetClassDropDownData
     * @param {} objContext 
     * @summary  Returns an array of classes to load in the class drop down.
     */
    GetClassDropDownData(objContext, objTextResource) {
        let arrTempClass = [];
        objTextResource = objTextResource ? objTextResource : {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data.map((objClass) => {
                return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") }
            });
        }
        let strTeacherId = global.ClientUserDetails.UserId;
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
            },
        ];
        return arrFinalClassData;
    };

    /**
    * @name GetDefaultSubjects
    * @param {*} objContext 
    * @param {*} strToggleGetData //Filter
    * @param {*} iSubjectId //Filter
    * @summary   Gets the default subject data on the basis of filters
    */
    GetDefaultSubjects(objContext, strToggleGetData, iSubjectId = -1) {
        let arrSubjects = [];
        switch (strToggleGetData) {
            case "GetDataForDropdown":
                arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0);
                break;
            case "GetSpecificData":
                arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0 && objTempData["iSubjectId"] === iSubjectId);
                break;
            default:
                arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0);
                break;
        }
        return arrSubjects;
    };

    /**
     * @name GetSubSubjects
     * @param {*} objContext 
     * @param {*} strToggleGetData //Filter
     * @param {*} iSubjectId //Filter
     * @summary   Gets the sub subject data on the basis of filters
     */
    GetSubSubjects(objContext, strToggleGetData, iSubjectId = -1) {
        let arrSubjects = [];
        switch (strToggleGetData) {
            case "GetDataForDropdown":
                let arrDefaultSubjects = this.GetDefaultSubjects(objContext, "GetDataForDropdown");
                let objPleaseSelectOption = { ...arrDefaultSubjects[0], ["iParentSubjectId"]: -1 };
                if (objContext.state.intSelectedParentSubjectId === -1) {
                    arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iParentSubjectId"] === iSubjectId);
                    arrSubjects = [objPleaseSelectOption, ...arrSubjects];
                }
                else {
                    arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
                    arrSubjects = [objPleaseSelectOption, ...arrSubjects];
                }
                break;
            case "GetSpecificData":
                arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iSubjectId"] === iSubjectId);
                break;
            case "GetForSubSubjectForParentSubjectId":
                arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iParentSubjectId"] === iSubjectId);
                break;
            default:
                arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
                break;
        }
        return arrSubjects;
    };

    /**
     * @name OnClickSearchButton
     * @summary updates the search button clicked status to state.
     * @param {any} objContext
     */
    OnClickSearchButton(objContext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { blnSearchBtnClicked: true } })
    }

    /**
     * @name GetTestLoginAndResult
     * @param {*} objContext 
     * @summary   Returns the TestLoginAndResult data.
     */
    GetTestLoginAndResult(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrTestLoginsAndResultData = DataRef(objContext.props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        return arrTestLoginsAndResultData;
    };

    /**
     * @name GetClassDetails
     * @param {*} objContext 
     * @param {*} strClassId 
     * @summary   Retruns the class object of the class id passed or the one set in application state.
     */
    GetClassDetails(objContext, strClassId = "") {
        if (strClassId === "") {
            strClassId = ApplicationState.GetProperty("SelectedClassId");
        }
        let objClassDetails = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data.find(objTempData => objTempData["uClassId"] === strClassId);

        return objClassDetails || {};
    };

    GetDate(strDate) {
        let arrSplitDate = strDate.split('.');
        return new Date(arrSplitDate[2], (arrSplitDate[1] - 1), arrSplitDate[0])
    }

    /**
     * @name GetFilteredTestData
     * @summary returns the Test Data beased on filters selected from dropdown.
     * @param {any} objContext
     */
    GetFilteredTestData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrAllTestData = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + this.strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data;
        let arrFilteredData = arrAllTestData.filter(x => x["t_TestDrive_Test_TestProperty"].length > 0 && x["t_TestDrive_Test_TestProperty"][0]["cIsSystemGenerated"] == "N");
        if (arrFilteredData && arrFilteredData.length > 0) {
            if (objContext.state.intStatusToggle == 1) {
                arrFilteredData = arrFilteredData.filter(objTest => objTest.t_TestDrive_Cycle_Teacher != undefined && objTest.t_TestDrive_Cycle_Teacher.length > 0 && objTest.t_TestDrive_Cycle_Teacher[0].cIsDeleted != "Y" && objTest.t_TestDrive_Cycle_Teacher[0].cIsActive == "Y");
            }
            else {
                arrFilteredData = arrFilteredData.filter(objTest => objTest.t_TestDrive_Cycle_Teacher != undefined && objTest.t_TestDrive_Cycle_Teacher.length > 0 && objTest.t_TestDrive_Cycle_Teacher[0].cIsDeleted != "Y" && objTest.t_TestDrive_Cycle_Teacher[0].cIsArchive == "Y");
            }
            if (objContext.state.objSelectedDate) {
                let startDate = this.GetDate(objContext.state.objSelectedDate["StartDate"]);
                let endDate = this.GetDate(objContext.state.objSelectedDate["EndDate"]);
                arrFilteredData = arrFilteredData.filter(objTempData => {
                    if ((new Date(objTempData["dtCreatedOn"])).getTime() > startDate.getTime() && (new Date(objTempData["dtCreatedOn"])).getTime() < endDate.getTime()) {
                        return true;
                    }
                })
            }
            if (objContext.state.blnSearchBtnClicked) {
                if (objContext.state.strSelectedPupilId !== "00000000-0000-0000-0000-000000000000") {
                    arrFilteredData = arrFilteredData.filter(objTempData => objTempData["t_TestDrive_Cycle_Pupil"].filter(objTempPupilTestData => objTempPupilTestData["uPupilId"] === objContext.state.strSelectedPupilId).length > 0);

                }
                if (objContext.state.intSelectedParentSubjectId !== -1) {
                    let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data;
                    let arrSubSubjects = arrAllSubjects.filter(objTempData => objTempData["iParentSubjectId"] == objContext.state.intSelectedParentSubjectId);
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
                if (objContext.state.intSelectedModusId !== -1) {
                    arrFilteredData = arrFilteredData.filter(objTempData => objTempData["iTestTypeId"] === objContext.state.intSelectedModusId);
                }
            }
            return [...arrFilteredData];
        } else return [];
    }

    /**
     * @name ShowTeacherStatisticsPopUp
     * @param {*} objContext 
     * @param {*} objTestDetails 
     * @param {*} objClassDetails 
     * @param {*} arrSub 
     * @param {*} objSubjectDataDetails 
     * @param {*} strModus 
     * @param {*} intTaskCount 
     * @param {*} objStatus 
     * @param {*} objTextResource 
     * @summary   Gets the data to be sent to TeacherStatisticsPopUp and opens it.
     */
    ShowTeacherStatisticsPopUp(objContext, objTestDetails, objClassDetails, arrSub, objSubjectDataDetails, strModus, intTaskCount, objStatus, objTextResource) {
        let objCycle = this.GetCycleObject(objContext);
        let objSkinDetails = this.GetSkinDetails(objContext);
        let objTestDisplayData = {
            objTestDetails: objTestDetails,
            objClassDetails: objClassDetails,
            vSubSubjectName: arrSub[0]["t_TestDrive_Subject_Data"][0]["vSubjectName"],
            vSubjectName: objSubjectDataDetails["vSubjectName"],
            strModus: strModus,
            intTaskCount: intTaskCount,
            objStatus: objStatus
        };
        Popup.ShowPopup({
            Meta: {
                Height: "98%",
                Width: "98%",
                ShowHeader: false,
                PopupName: "TestStatistics",
            },
            Events: {
                OnClickClsoePopUp: (objDeletedTest) => {
                    //ApplicationState.SetProperty("blnShowAnimation", false);
                    //this.AfterDeletingTest(objContext, objDeletedTest);
                }
            },
            Data: {
                strCycleTypeId: this.strCycleTypeId,
                strSchoolYearPeriodId: objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
                ClientUserDetails: objContext.props.ClientUserDetails,
                objTestDisplayData: objTestDisplayData,
                strCycleId: objCycle["uCycleId"],
                objTeacherDetails: objContext.props.ClientUserDetails.TeacherDetails,
                objTextResource: objTextResource,
                blnArchive: objTestDetails.t_TestDrive_Cycle_Teacher[0]["cIsArchive"] == "Y",
                ...objSkinDetails
            },
            CallBacks: {
            },
            IsForceClientRender: true
        });
    };

    /**
     * @name AfterDeletingTest
     * @param {any} objContext
     * @param {any} objDeletedTest
     */
    AfterDeletingTest(objContext, objDeletedTest) {
        let arrTestDataAfterDelete = objContext.state.arrExtranetTestData.filter(objTest => objDeletedTest["uTestId"] != objTest["uTestId"]);
        objContext.dispatch({ type: 'SET_STATE', payload: { arrExtranetTestData: arrTestDataAfterDelete } })
    }

    /**
     * @name GetStatus
     * @param {*} objContext 
     * @param {*} objTestDetails 
     * @summary   Used to get the status of the extranet test. Returns a Json object.
     */
    GetStatus(objContext, objTestDetails) {
        let objTaskAndRoundDetails = this.GetTaskAndRoundDetails(objContext);
        let arrTestLoginAndResult = this.GetTestLoginAndResult(objContext);
        let objStatus = {};
        if (objTestDetails["t_TestDrive_Cycle_Pupil"].length > 0) {
            objStatus["cHasRoundCompleted"] = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["cHasRoundCompleted"] == "Y" ? "Y" : "N";
            objStatus["cNewTestAllowed"] = parseInt(objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0) < parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "N" ? true : false;
            objStatus["cRoundFinished"] = parseInt(objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0) < parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "Y" ? true : false;
            objStatus["cRoundsCompleted"] = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0 === parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "Y" ? true : false;
            objStatus["cShowRoundComplete"] = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0 === parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "N" ? true : false;
        }
        let objStatusToReturn = {
            strStatus: "NotStarted",
            vImgUrl: '',
            vResourceText: 'NotStarted',
            cHasRoundCompleted: objStatus["cHasRoundCompleted"]
        };
        if (objStatus["cHasRoundCompleted"] !== null && objStatus["cHasRoundCompleted"] === "Y") {
            objStatusToReturn.strStatus = 'Completed';
            objStatusToReturn.vResourceText = 'Completed';
        }
        else {
            if (arrTestLoginAndResult && arrTestLoginAndResult.length > 0) {
                let arrData = arrTestLoginAndResult.filter(objTempData => objTempData["uTestId"] === objTestDetails["uTestId"]);
                if (arrData.length > 0) {
                    let objTestLoginAndResultDetails = arrData[0];
                    if (objTestDetails["cIsSystemGenerated"] === "N") {
                        if (objTestDetails["iTestUsageId"] === 2) {
                            if (objTestLoginAndResultDetails !== null && objTestLoginAndResultDetails["TestExecution"] !== null) {
                                if (objTestLoginAndResultDetails["TestExecution"].length > 0 && objTestLoginAndResultDetails["TestExecution"][0]["iTestStatusId"] === 5 && objTestDetails["cHasRoundCompleted"] === "N") {
                                    objStatusToReturn.strStatus = 'Completed';
                                    objStatusToReturn.vResourceText = 'Completed';
                                }
                                else {
                                    objStatusToReturn.strStatus = 'Started';
                                    objStatusToReturn.vResourceText = 'Started';
                                }
                            }
                            else {
                                objStatusToReturn.strStatus = 'NotStarted';
                                objStatusToReturn.vResourceText = 'NotStarted';
                            }
                        }
                        else if (objTestDetails["iTestUsageId"] === 3) {
                            let arrTestRepetition = arrTestLoginAndResult.filter(objTempData => objTempData["uTestId"] === objTestDetails["uTestId"]).sort((objTempDataF, objTempDataS) => { return parseInt(objTempDataF["iCycleRepetition"]) - parseInt(objTempDataS["iCycleRepetition"]) });
                            if (objTestLoginAndResultDetails !== null && objTestLoginAndResultDetails["TestExecution"] !== null) {
                                if (objTestDetails["cIsSystemGenerated"] === "N" && arrTestRepetition.length > 0 && arrTestRepetition.length >= 7 && arrTestRepetition[6]["TestExecution"].length > 0 && arrTestRepetition[6]["TestExecution"][0]["iTestStatusId"] === 5) {
                                    objStatusToReturn.strStatus = 'Completed';
                                    objStatusToReturn.vResourceText = 'Completed';
                                }
                                else {
                                    if (objTestLoginAndResultDetails["TestExecution"].length > 0 && objTestLoginAndResultDetails["TestExecution"][0]["iTestStatusId"] === 5) {
                                        objStatusToReturn.strStatus = 'NotCompleted';
                                        objStatusToReturn.vResourceText = 'NotCompleted';
                                    }
                                    else {
                                        objStatusToReturn.strStatus = 'Started';
                                        objStatusToReturn.vResourceText = 'Started';
                                    }
                                }
                            }
                            else {
                                objStatusToReturn.strStatus = 'NotStarted';
                                objStatusToReturn.vResourceText = 'NotStarted';
                            }
                        }
                    }
                    else {
                        if (objTestLoginAndResultDetails !== null && objTestLoginAndResultDetails["TestExecution"] !== null) {
                            if (objTestLoginAndResultDetails["TestExecution"].length > 0 && objTestLoginAndResultDetails["TestExecution"][0]["iTestStatusId"] === 5 && objStatus["cHasRoundCompleted"] === "N") {
                                objStatusToReturn.strStatus = 'NotCompleted';
                                objStatusToReturn.vResourceText = 'NotCompleted';
                            }
                            else {
                                objStatusToReturn.strStatus = 'Started';
                                objStatusToReturn.vResourceText = 'Started';
                            }
                        }
                        else {
                            objStatusToReturn.strStatus = 'NotStarted';
                            objStatusToReturn.vResourceText = 'NotStarted';
                        }
                    }
                }
            }
        }
        return objStatusToReturn;
    };

    /**
     * @name GetTaskAndRoundDetails
     * @param {*} objContext 
     * @summary   Returns the task round and repetition details.
     */
    GetTaskAndRoundDetails(objContext) {
        let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings").Data;
        let intTaskCount = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfTasksForSystemGeneratedTest")[0]["vValue"]);
        let intRepetitionCount = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfRepetitionForSystemGeneratedTest")[0]["vValue"]);
        return {
            "TaskCount": intTaskCount,
            "RepetitionCount": intRepetitionCount
        };
    };

    /**
     * @name ShowTestPreviewPopup
     * @param {*} objContext 
     * @param {*} strTestId 
     * @summary   Opens the preview pop up for previewing the test url.
     */
    ShowTestPreviewPopup(objContext, strTestId) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", objContext.props);
        let objSkinDetails = this.GetSkinDetails(objContext);
        Popup.ShowPopup({
            Meta: {
                Height: "98%",
                Width: "98%",
                ShowHeader: false,
                PopupName: "LearningTestPreview",
                CssClassName: "learningtest-preview"
            },
            Events: {
                OnClickClsoePopUp: (objDeletedTest) => {
                    //ApplicationState.SetProperty("blnShowAnimation", false);
                    //this.AfterDeletingTest(objContext, objDeletedTest);
                }
            },
            Data: {
                "ClientUserDetails": objContext.props.ClientUserDetails,
                "TestId": strTestId,
                "TextResource": objTextResource,
                ...objSkinDetails
            },
            CallBacks: {
            }
        });

    };

    /**
     * @name ShowLearningTestCreationPopUp
     * @param {*} objContext 
     * @summary   Opens the LearningTestCreation Popup.
     */
    ShowLearningTestCreationPopUp(objContext, objTextResource) {
        let objCycle = this.GetCycleObject(objContext);
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data;
        let arrSubjects = arrAllSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
        let iParentSubjectId = objContext.state.intSelectedParentSubjectId != -1 ? objContext.state.intSelectedParentSubjectId : arrSubjects[0]["iSubjectId"];
        let arrSubSubjects = arrAllSubjects.filter(objTempData => objTempData["iParentSubjectId"] == iParentSubjectId);
        let objSkinDetails = this.GetSkinDetails(objContext);
        Popup.ShowPopup({
            Data: {
                "ClientUserDetails": objContext.props.ClientUserDetails,
                strCycleId: objCycle["uCycleId"],
                strCycleTypeId: this.strCycleTypeId,
                intSelectedSubSubjectId: objContext.state.intSelectedSubSubjectId != -1 ? objContext.state.intSelectedSubSubjectId : arrSubSubjects[0]["iSubjectId"],
                strSchoolYearPeriodId: objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
                ...objSkinDetails
            },
            Meta: {
                PopupName: 'LearningTestCreation',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: '98%',
                Width: '98%'
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
                ChangeRouteToLearningTestSystem: () => {
                    //RouterHelper.RouteTo("TeacherLearningTest/TeacherLearningTestSystem?CycleId=0fddde67-6793-4093-9790-9e3611356c8b", objContext.props.history);
                    let strMainNavigationId = "ExtranetMainNavigation";
                    let strSubNavigationId = "ExtranetSubNavigation";
                    let objNavigationData = {
                        "MainNavigation": { "NavigationName": "TeacherLearningTest", "Id": strMainNavigationId },
                        "SubNavigation": { "NavigationName": "LearningTestSystem", "Id": strSubNavigationId }
                    };
                    RouterHelper.RouteTo("TeacherLearningTest/LearningTestSystem", objContext.props.history, true, objNavigationData);
                }
            },
            CallBacks: {
            }
        });

    };

    /**
     * @name OnChangeClassDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the class dropdown selection changes
     */
    OnChangeClassDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnIsClassSelectionChanged": !objContext.state.blnIsClassSelectionChanged, "strSelectedPupilId": "00000000-0000-0000-0000-000000000000", "intSelectedParentSubjectId": -1, "intSelectedSubSubjectId": -1 } });
    };

    /**
     * @name OnChangePupilDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the pupil dropdown selection changes
     */
    OnChangePupilDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strSelectedPupilId": objItem["uPupilId"] } });
    };

    /**
     * @name OnChangeSubjectDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the Subject dropdown selection changes
     */
    OnChangeSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedParentSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": -1 } });
        this.SaveUserPreferenceSubjectId(objContext, objItem.iSubjectId)
    };

    /**
     * @name OnChangeSubSubjectDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the sub Subject dropdown selection changes
     */
    OnChangeSubSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubSubjectId": objItem.iSubjectId } });
    };

    /**
     * @name OnChangeModusDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the Modus dropdown selection changes
     */
    OnChangeModusDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedModusId": objItem.Value } });
    };

    /**
     * @name OnChangeStatusToggleDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the status toggle dropdown selection changes
     */
    OnChangeStatusToggleDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intStatusToggle": objItem.Value } });
    };

    /**
     * @name OnChangeWeekDisplay
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeWeekDisplay(objContext, objItem) {
        if (objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId == "") {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
            let arrMainTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
            let arrExtranetTestData = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + this.strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;;uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data
            let strMainTestLoginAndResulEnityKey = "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId;
            let strExtranetTestEnityKey = "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + this.strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId
            if (DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, strExtranetTestEnityKey)["Data"] == undefined) {
                let objMainTestLoginAndResultData = {
                    Filter: strMainTestLoginAndResulEnityKey,
                    Value: {
                        Data: arrMainTestLoginAndResult,
                        TimeStamp: "",
                        PrimaryKeyName: "uTestTokenId",
                        Count: arrMainTestLoginAndResult.length
                    }
                };

                let obExtranetTestData = {
                    Filter: strExtranetTestEnityKey,
                    Value: {
                        Data: arrExtranetTestData,
                        TimeStamp: "",
                        PrimaryKeyName: "uTestId",
                        Count: arrExtranetTestData.length
                    }
                };
                ArcadixCacheData.AddData("Object_TestApplication_LearningTestLoginAndResult", objMainTestLoginAndResultData, () => {

                });

                ArcadixCacheData.AddData("Object_Intranet_Test_ExtranetTest", obExtranetTestData, () => {

                });
            }

        }
        console.clear();
        console.log("weekdisplay", objItem);
        if (objItem["uSchoolYearPeriodId"]) {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedSchoolYearPeriod": objItem, iSchoolYerPeriodCounter: ++objContext.state.iSchoolYerPeriodCounter, objSelectedDate: objItem } });
        } else {
            objContext.dispatch({ type: "SET_STATE", payload: { objSelectedDate: objItem } });
        }

    }

    /**
     * @name OnChangeDisplayDropdown
     * @param {*} objItem 
     * @summary   Trigerred when the selection changes in the WeekDisplayDropdown.
     */
    OnChangeDisplayDropdown(objContext, objItem) {
        ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
    };

    /**
     * @name GetCycleObject
     * @param {any} objContext
     */
    GetCycleObject(objContext) {
        let objCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + this.strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"][0];
        return objCycle;
    }

    /**
    * @name ActivateOrDeleteLearningTest
    * @param {*} objContext 
    * @summary   This methods activates or delets the Extranet Learning Test Data when the dropdown is archive or active respectively.
    */
    ActivateOrDeleteLearningTest(objContext, objTestDetails) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");//JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
        let strUserId = objContext.props.ClientUserDetails.UserId;
        let strCycleId = this.GetCycleObject(objContext).uCycleId;
        let strCycleTypeId = this.strCycleTypeId;
        let strSchoolYearPeriodId = objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId;
        let objDeleteData = objContext.state.intStatusToggle == 1 ? {
            cIsArchive: "N",
            cIsActive: "N",
            cIsDeleted: "Y"
        } : {
                cIsArchive: "N",
                cIsActive: "Y",
                cIsDeleted: "N"
            };
        let objExtranetTestParams = {
            "uCycleId": strCycleId,
            "uSchoolId": ClientUserDetails.TeacherDetails.uSchoolId,
            "iStateId": GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId),
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": strSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": strUserId
                        }
                    }
                ]
            },
            "vDeleteData": {
                "uTestId": objTestDetails["uTestId"],
                "TeacherTableAction": "Y",
                "t_TestDrive_Cycle_Teacher": [objDeleteData]
            }
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_ExtranetTest.DeleteData(objExtranetTestParams, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
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
     * @name GetSkinDetails
     * @summary returns the skinName and skinId
     * @param {any} objContext
     */
    GetSkinDetails(objContext) {
        let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"]
        let arrFilteredClientSettings = arrClientSettings.filter(x => x["vParentKey"] == "TestConfiguration" && x["vSubParentKey"] == "Task" && x["vKey"] == "LearningTestSkinId");
        let LearningTestSkinId = "";
        let objSkin = arrFilteredClientSettings.find(x => x["iMainClientId"] == objContext.props.JConfiguration.MainClientId);
        if (objSkin == undefined) {
            objSkin = arrFilteredClientSettings[0];
        }
        LearningTestSkinId = objSkin["vValue"];
        let SkinName = "";
        let arrSkinData = DataRef(objContext.props.Object_Cockpit_Skin, "Object_Cockpit_Skin;uSkinId;" + LearningTestSkinId)["Data"];
        if (arrSkinData && arrSkinData.length > 0) {
            SkinName = arrSkinData[0]["vSkinName"];
        }
        return { LearningTestSkinId, SkinName }
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

export default LearningTestTeacher_ModuleProcessor;