//Module object imports.
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_TestApplication_TestLoginAndResult from '@shared/Object/f.TestApplication/TestLoginAndResult/TestLoginAndResult';
import Extranet_Teacher_TestResults_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_Module';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import Object_Cockpit_OfflineProcessDefinition from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessDefinition/OfflineProcessDefinition';

//Common functionalities imports.
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name TestResults_ModuleProcessor
 * @summary module processor for Test results.
 * */
class TestResults_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name TestLogins_ModuleProcessor_constructor
     * @summary used for define CycleTypeId
     * */
    constructor() {
        super();
        this.strCycleTypeId = '1';
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TestResults", "Object_Extranet_Pupil_Pupil",
            "Object_Extranet_Teacher_SchoolYear", "Object_Extranet_Teacher_Class", "Object_Intranet_Taxonomy_Subject", "Object_TestApplication_TestLoginAndResult",
            "Object_Intranet_Cycle_Cycle", "Object_Intranet_Test_IntranetTest",
            "Object_Cockpit_OfflineProcessDefinition", "Object_Cockpit_OfflineProcess_OfflineProcessExecution",
            { "StoreKey": "ApplicationState", "DataKey": "RefreshTestTokenData" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResults.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResultsPopup/AllPdfTest/AllPdfTest.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResultsPopup/MoveResults/MoveResults.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/WeekDisplay/WeekDisplay.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestSystem/LearningTestSystemPopups/LearningTestSettings/LearningTestSettings.css" // LearningTestSettings  popup is used
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
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrDataRequest = [];

        //Text Resource
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/TestResults", "/d.Extranet/3_Teacher/Modules/LearningTestSystem"]; // LearningTestSystem is used to show popup
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

        //subject  
        let objSubjectParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "cIsActive": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        },
                        {
                            "match": {
                                "cIsTestedAtThisTime": "Y"
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

        //School Year.
        let objSchoolYearParams = {
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
                        "order": "desc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        //cycle
        let objCycleParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "cIsActive": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        },
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeId
                            }
                        }
                    ]
            }
        };
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        //intranet main tests
        let objMainIntranetTestParams = {
            "cArchieve": "N",
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "iStateId": iStateId
                            }
                        },
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeId
                            }
                        },
                        {
                            "match": {
                                "uSchoolId": uSchoolId
                            }
                        },
                        {
                            "match": {
                                "uTeacherId": props.ClientUserDetails.UserId
                            }
                        },
                        {
                            "match": {
                                "uClassId": strClassId
                            }
                        },
                        {
                            "match": {
                                "iSchoolYearId": ""
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

        Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams])
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        //Main testlogins and results.
        let objMainTestLoginAndResultParams = {
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

        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams])
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        //OfflineProcessDefinition
        let objOfflineProcessDefinitionParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vOfflineProcessKeyword": "ResultThresholdFeedback"
                        }
                    }
                ]
            }
        };

        Object_Cockpit_OfflineProcessDefinition.Initialize(objOfflineProcessDefinitionParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_OfflineProcessDefinition];

        return arrDataRequest;
    }

    /**
    * @name GetPupilDataParams
    * @param {*} objContext 
    * @summary   Returns the pupil params for selected class
    */
    GetPupilDataParams(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strCycleId = QueryString.GetQueryStringValue("CycleId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];

        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            }
        };
        let objIntranetTestParams = {
            "cArchieve": "N",
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
            "cIsCache": 'Y',
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "iStateId": iStateId
                            }
                        },
                        {
                            "match": {
                                "uCycleId": strCycleId
                            }
                        },
                        {
                            "match": {
                                "uSchoolId": uSchoolId
                            }
                        },
                        {
                            "match": {
                                "uTeacherId": objContext.props.ClientUserDetails.UserId
                            }
                        },
                        {
                            "match": {
                                "uClassId": strClassId
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
        let objTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uCycleId": strCycleId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    }
                ]
            }
        };

        let arrParams = [
            {
                "URL": "API/Object/Extranet/Pupil/Pupil",
                "Params": objPupilParams,
                "MethodType": "Get"
            },
            {
                "URL": "API/Object/Intranet/Test/IntranetTest",
                "Params": objIntranetTestParams,
                "MethodType": "Get"
            },
            {
                "URL": "API/Object/TestApplication/TestLoginAndResult",
                "Params": objTestLoginAndResultParams,
                "MethodType": "Get"
            }
        ];
        return arrParams;
    }

    /**
     * @name OnChangeWeekDisplay
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeWeekDisplay(objContext, objItem) {
        if (objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId == "") {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
            let arrMainTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
            let strMainTestLoginAndResulEnityKey = "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId;
            let objMainTestLoginAndResultData = {
                Filter: strMainTestLoginAndResulEnityKey,
                Value: {
                    Data: arrMainTestLoginAndResult,
                    TimeStamp: "",
                    PrimaryKeyName: "uTestTokenId",
                    Count: arrMainTestLoginAndResult.length
                }
            };

            ArcadixCacheData.AddData("Object_TestApplication_TestLoginAndResult", objMainTestLoginAndResultData, () => {

            });

        }
        let strSchoolYearId = "";
        if (objContext.state.iSchoolYerPeriodCounter > 0) {
            let arrClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data
            let objClass = objContext.state.objSelectedClass ? objContext.state.objSelectedClass : arrClass.find(cls => cls["uClassId"] == ApplicationState.GetProperty("SelectedClassId"));
            let arrSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")["Data"];
            let iSchoolYear = objClass["iSchoolYear"] + objItem.iDisplayOrder;
            strSchoolYearId = arrSchoolYear.find(objSchlYr => objSchlYr["iSchoolYear"] == iSchoolYear).iSchoolYearId;
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedSchoolYearPeriod": objItem, iSchoolYerPeriodCounter: ++objContext.state.iSchoolYerPeriodCounter, strSchoolYearId: strSchoolYearId } });
    }

    /**
     * @name ResetResult
     * @summary resets the pupil result
     * @param {any} objContext
     * @param {any} objTest
     * @param {any} objTestResult
     */
    ResetResult(objContext, objTest, objTestResult) {
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let objParams = {
            "CycleId": objTestResult["uCycleId"],
            "ExecutionId": objTestResult["TestExecution"][0]["uExecutionId"],
            "ClassId": objTestResult["uClassId"],
            "TestId": objTest["uTestId"],
            "RepetitionId": objTestResult["iCycleRepetition"],
            "PupilId": objTestResult["uPupilId"],
            "SchoolId": uSchoolId,
            "StateId": iStateId,
            "TeacherId": objContext.props.ClientUserDetails.UserId,
            "TestTokenId": objTestResult["uTestTokenId"],
            "CycleTypeId": this.strCycleTypeId,
            "SchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Teacher_TestResults_Module.ResetResult(objParams, (objResponse) => {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let strMainTestLoginAndResulEnityKey = "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId;
            let objMainTestLoginAndResultData = {
                Filter: strMainTestLoginAndResulEnityKey,
                Value: {
                    Data: objResponse.Extranet_Teacher_TestResults_Module.Data,
                    TimeStamp: "",
                    PrimaryKeyName: "uTestTokenId",
                    Count: 1
                }
            };
            ApplicationState.SetProperty("blnShowAnimation", false);
            ArcadixCacheData.EditData("Object_TestApplication_TestLoginAndResult", objMainTestLoginAndResultData, () => {

            });
        });
    }

    /**
     * @name GetDefaultSubjects
     * @param {any} objContext
     */
    GetDefaultSubjects(objContext) {
        let arrTempSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y")) {
            arrTempSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y").Data;
        }
        let arrSubjects = arrTempSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
        return arrSubjects;
    }

    /**
     * @name GetSubSubject
     * @param {*} objContext 
     * @summary   Returns the sub subject of the selected subjects
     */
    GetSubSubject(objContext) {
        let arrSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y")) {
            arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y").Data;
        }
        let iSubjectId = this.GetSubjectId(objContext);
        let arrSubSubjects = arrSubjects.filter(objTempData => objTempData["iParentSubjectId"] === iSubjectId);
        return arrSubSubjects;
    }

    /**
     * @name GetSchoolYearIdFromSelectedClass
     * @param {*} objContext 
     * @summary   Returns School Year Id of selected class.
     */
    GetSchoolYearIdFromSelectedClass(objContext) {
        var uSelectedClassId = ApplicationState.GetProperty("SelectedClassId");
        var arrSelectedClassObj = [];
        var arrClassData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data;
        }

        arrClassData.map((objClassData) => {
            if (objClassData["uClassId"] === uSelectedClassId) {
                arrSelectedClassObj = [...arrSelectedClassObj, objClassData];
            }
        });
        var arrSchoolYear = [];
        let arrAllSchoolYear = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")) {
            arrAllSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data;
        }

        if (arrClassData.length > 0) {
            if (arrClassData[0]["iSchoolYear"] != null) {
                arrAllSchoolYear.map((objSchoolYear) => {
                    if (objSchoolYear["iSchoolYear"] === arrSelectedClassObj[0]["iSchoolYear"]) {
                        arrSchoolYear = [...arrSchoolYear, objSchoolYear];
                    }
                });
            } else {
                arrSchoolYear = [arrAllSchoolYear[0]];
            }
        } else {
            return "-1";
        }
        return arrSchoolYear[0]["iSchoolYearId"];
    };

    /**
     * @name GetSubjectId
     * @summary returns the selected subject id.
     * @param {any} objContext
     */
    GetSubjectId(objContext) {
        let arrSubjects = this.GetDefaultSubjects(objContext);
        return objContext.state.intSelectedSubjectId != -1 ? objContext.state.intSelectedSubjectId : arrSubjects.length > 0 ? arrSubjects[0]["iSubjectId"] : -1;
    }


    /**
     * @name GetTestData
     * @param {*} objContext 
     * @summary   Returns an array with the test data for the cycle Id.
     */
    GetTestData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSchoolYearId + ";cIsDeleted;N").Data;
        let iSubjectId = this.GetSubjectId(objContext);
        let arrSubSubjects = this.GetSubSubject(objContext);
        let arrFilteredTestDataWithMainSubject = [];
        let arrFilteredTestDataWithSubSubject = [];
        let intSchoolYearId = this.GetSchoolYearIdFromSelectedClass(objContext);
        if (arrTestData && arrTestData.length > 0) {
            var arrFilteredTestDataBySchoolYId = [];
            arrTestData.map((objTempData) => {
                if (objTempData["t_TestDrive_Cycle_SchoolYear"] != undefined && objTempData["t_TestDrive_Cycle_SchoolYear"].filter((objTempTestSchoolYearData) => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0) {
                    arrFilteredTestDataBySchoolYId = [...arrFilteredTestDataBySchoolYId, objTempData];
                }
            });

            arrFilteredTestDataWithMainSubject = arrFilteredTestDataBySchoolYId.filter(objTempData => objTempData["iSubjectId"] === iSubjectId);
            arrSubSubjects.map((objTempSubjectData) => {
                let arrTempFilteredTestDataWithSubSubject = arrFilteredTestDataBySchoolYId.filter(objTempTestData => objTempTestData["iSubjectId"] === objTempSubjectData["iSubjectId"]);
                if (arrTempFilteredTestDataWithSubSubject.length > 0) {
                    arrFilteredTestDataWithSubSubject = [...arrFilteredTestDataWithSubSubject, arrTempFilteredTestDataWithSubSubject[0]];
                }
            });
        }

        let arrFilteredTestData = [...arrFilteredTestDataWithMainSubject, ...arrFilteredTestDataWithSubSubject];
        return arrFilteredTestData;
    }

    /**
     * @name GetClassDropDownData
     * @param {} objContext 
     * @summary  returns an array of classes to load in the drop down
     */
    GetClassDropDownData(objContext, objTextResource) {
        let arrTempClass = [];
        objTextResource = objTextResource ? objTextResource : {};
        let strTeacherId = global.ClientUserDetails.UserId;
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data.map((objClass) => {
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
            },
        ];
        return arrFinalClassData;
    }

    /**
     * @name GetCompletedAndInProgressTestResults
     * @param {any} objContext
     * @param {any} iCycleRepetition
     * @param {any} strCycleId
     * @param {any} uPupilId
     * @param {any} uTestId
     */
    GetCompletedAndInProgressTestResults(objContext, iCycleRepetition, strCycleId, uPupilId, uTestId) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrTestLoginsAndResultData = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        if (arrTestLoginsAndResultData == undefined)
            arrTestLoginsAndResultData = [];
        let arrCompletedAndInProgressTestResults = [];
        arrTestLoginsAndResultData.map((objTestResult) => {
            if ((objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3)) &&
                (objTestResult["uPupilId"] === uPupilId && objTestResult["uCycleId"] === strCycleId && objTestResult["uTestId"] === uTestId && objTestResult["iCycleRepetition"] === iCycleRepetition)
            ) {
                arrCompletedAndInProgressTestResults = [...arrCompletedAndInProgressTestResults, objTestResult];
            }
        });
        return arrCompletedAndInProgressTestResults;
    }

    /**
     * @name OnChangeClassDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the class dropdown selection changes
     */
    OnChangeClassDropDown(objContext, objItem) {
        let arrSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")["Data"];
        let objSchoolYear = arrSchoolYear.find(objSchlYr => objSchlYr["iSchoolYear"] == objItem["iSchoolYear"]);
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedClass": objItem, strSchoolYearId: objSchoolYear["iSchoolYearId"] } });
    }

    /**
    * @name GetDataAfterClassChange
    * @param {*} objContext
    * @summary Returns the pupil params for selected class
    */
    GetDataAfterClassOrSchoolYearPeriodChange(objContext, blnSchoolYearPeriodDropdownChange = false) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrDataRequest = [];
        if (!blnSchoolYearPeriodDropdownChange) {
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
        }

        //intranet test
        let objMainIntranetTestParams = {
            "cArchieve": "N",
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "iStateId": iStateId
                            }
                        },
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeId
                            }
                        },
                        {
                            "match": {
                                "uSchoolId": uSchoolId
                            }
                        },
                        {
                            "match": {
                                "uTeacherId": objContext.props.ClientUserDetails.UserId
                            }
                        },
                        {
                            "match": {
                                "uClassId": strClassId
                            }
                        },
                        {
                            "match": {
                                "iSchoolYearId": objContext.state.strSchoolYearId
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

        Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams])
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        //test login and result
        let objMainTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId
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

        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams])
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];
        ApplicationState.SetProperty("blnShowAnimation", true);
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    };

    /**
  * @name GetSubjectDropdownMetaData
  * @summary Gets the meta data for SchoolYear dropdown
  * @returns {object} Meta data objects for SchoolYear dropdown
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
    * @param {Array} arrSubjectData Subject data
    * @param {String} strSubjectId Subject ID
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubjectDropdownData(arrSubjectData, strSubjectId) {
        let strUserPreferenceSubjectId = this.GetUserpreferenceSubjectId();
        strSubjectId = strUserPreferenceSubjectId ? strUserPreferenceSubjectId : strSubjectId;
        return {
            DropdownData: arrSubjectData,
            SelectedValue: strSubjectId
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
    * @name GetSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Subject dropdown.
    * @returns {object} objEventBasics
    */
    GetSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.TestResults_ModuleProcessor.OnChangeSubjectDropDown(objContext, objItem)
        };
    }

    /**
     * @name OnChangeSubjectDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the class dropdown selection changes
     */
    OnChangeSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubjectId": objItem.iSubjectId } });
        this.SaveUserPreferenceSubjectId(objContext, objItem.iSubjectId)
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "LegendsControls", "TestResultsHeader", "TopSpace"],
            FooterIds: ["FooterTestResults"]
        };
    }

    /**
     * @name GetTestDetailsAndCycleRepitition
     * @param {any} objContext
     * @param {any} objCompareTestDetails
     * @param {any} intTempCount
     */
    GetTestDetailsAndCycleRepitition(objContext, objCompareTestDetails, intTempCount) {
        var arrTestDetails = [];
        if (objContext.state.arrSelectAllTestResults.length > 0) {
            objContext.state.arrSelectAllTestResults.map((objTestData) => {
                if (objTestData["intCycleRepetition"] === intTempCount && objTestData["objTestDetails"]["uTestId"] === objCompareTestDetails["uTestId"]) {
                    arrTestDetails = [...arrTestDetails, objTestData];
                }
            });
        }
        return arrTestDetails;
    }

    /**
     * @name ReCalculateTestResult
     * @param {any} objContext
     * @param {any} objTest
     * @param {any} objTestResult
     */
    ReCalculateTestResult(objContext, objTest, objTestResult) {
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let objParams = {
            objData: {
                TestId: objTest["uTestId"],
                CycleId: objTestResult["uCycleId"],
                CycleTypeId: this.strCycleTypeId,
                SchoolYearPeriodId: objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
                ClassId: objTestResult["uClassId"],
                PupilId: objTestResult["uPupilId"],
                TestTokenId: objTestResult["uTestTokenId"],
                TokenNumber: objTestResult["vTestTokenNumber"],
                ExecutionId: objTestResult["TestExecution"][0]["uExecutionId"],
                StateId: iStateId
            }
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Teacher_TestResults_Module.ReCalculateTestResultForPupil(objParams, (res) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });

    }

    /**
     * @name GetCycleObject
     * @summary returns the cycle object.
     * @param {any} objContext
     */
    GetCycleObject(objContext) {
        let objCycle = {};
        if (DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + this.strCycleTypeId)) {
            objCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + this.strCycleTypeId)["Data"][0];
        }
        return objCycle;
    }

    /**
     * @name HandlePdfPopup
     * @summary toggler for show pdf.
     * @param {any} objContext
     */
    HandlePdfPopup(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "Open": !objContext.state.Open } });
    }

    /**
     * @name OpenMoveResultsPopup
     * @summary opens the move results popup.
     * @param {any} objContext
     * @param {any} objTextResource
     * @param {any} objTestResult
     */
    OpenMoveResultsPopup(objContext, objTextResource, objTestResult) {
        let objCycle = this.GetCycleObject(objContext);
        Popup.ShowPopup({
            Data: {
                HeaderTitle: "Title",
                objCycleData: objCycle,
                iStateId: GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"]),
                uSchoolId: ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"],
                ClientUserDetails: objContext.props.ClientUserDetails,
                objTestResult: objTestResult,
                strCycleTypeId: this.strCycleTypeId,
                strSchoolYearPeriodId: objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
                strCycleId: objContext.state.strCycleId,
                IsOrientationTest: true
            },
            Meta: {
                PopupName: 'MoveResultsPopup'
            },
            Resource: {
                Text: objTextResource
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: {
                ...objContext.props
            }
        });
    }

    /**
     * @name OnClickNavigationButton
     * @summary navigates to the learning test.
     * @param {any} objContext
     */
    OnClickNavigationButton(objContext) {
        RouterHelper.RouteTo("TeacherLearningTest/LearningTestSystem", objContext.props.history, true, {
            "MainNavigation": { "NavigationName": "TeacherLearningTest", "Id": "ExtranetMainNavigation" },
            "SubNavigation": { "NavigationName": "LearningTestSystem", "Id": "ExtranetSubNavigation" }
        });
    }

    /**
    * @name CreateExcelProgressBarPopup
    * @param {Object} objContext Context Object
    * @param {Object} objTestDetails Test Details Object
    * @param {Object} objPupilDetails Pupil Details Object
    * @param {Integer} intRepetition Repetition value
    * @param {Object} objTextResource Text Resource 
    * @summary open progressbar popup
    */
    CreateExcelProgressBarPopup(objContext, objTestDetails, objPupilDetails, intRepetition, objTextResource) {
        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                "ShowProgressStatus": "N",
                "HasCloseButton": "Y",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": false,
                "ShowFileToDownload": "Y",
                Height: "auto"
            },
            "Resource": {
                "Text": {
                    "ProgressBarPopup_TitleText": objTextResource["CreateExcelTitleText"],
                    "ProgressBarPopup_CancelButtonText": objTextResource["CreateExcelCancelButtonText"],
                    "ProgressBarPopup_CloseButtonText": objTextResource["CreateExcelCloseButtonText"]
                },
                "TextResourcesKey": "ProgressBarPopup",
                "SkinPath": JConfiguration.IntranetSkinPath
            },
            "Events": {
                "StartProgress": (strProgressBarId) => {
                    let objParams = {
                        "iCycleTypeId": objContext.TestResults_ModuleProcessor.strCycleTypeId,
                        "uTestId": objTestDetails["uTestId"],
                        "uPupilId": objPupilDetails["uPupilId"],
                        "uClassId": ApplicationState.GetProperty("SelectedClassId"),
                        "uSchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
                        "iRepetition": intRepetition,
                        "uTeacherId": ClientUserDetails.UserId,
                        "uSchoolId": ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"],
                        "iStateId": GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"]),
                        "ProgressBarId": strProgressBarId
                    };

                    Extranet_Teacher_TestResults_Module.GetTestResultExcel(objParams, (objResponse) => {

                    });
                }
            },
            "CallBacks": {}
        });
    }

    /**
     * @name OnChangeCheckBox
     * @param {any} objContext
     * @param {any} objTestDetails
     * @param {any} objPupilDetails
     * @param {any} iCycleRepetition
     * @param {any} blnIsChecked
     * @summary Enabling or disabling the indivisual check box
     */
    OnChangeCheckBox(objContext, objTestDetails, objPupilDetails, iCycleRepetition, blnIsChecked) {
        if (blnIsChecked) {
            let objSelectedPresentResult = objContext.state.arrSelectedResults.find(objItem => objItem["uPupilId"] == objPupilDetails["uPupilId"] && objItem["uTestId"] == objTestDetails["uTestId"]
                && objItem["iCycleRepetition"] == iCycleRepetition);
            if (objSelectedPresentResult == undefined) {
                let objNewSelected = {
                    uPupilId: objPupilDetails["uPupilId"],
                    uTestId: objTestDetails["uTestId"],
                    iCycleRepetition: iCycleRepetition
                };
                let arrTempSelectedResult = objContext.state.arrSelectedResults.map(x => { return { ...x } });
                let arrLatestSelectedResult = [...arrTempSelectedResult, objNewSelected];
                objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedResults: arrLatestSelectedResult } })
            } else {
                let arrLatestSelectedResult = objContext.state.arrSelectedResults.filter(objItem => objItem["uPupilId"] != objPupilDetails["uPupilId"] && objItem["uTestId"] != objTestDetails["uTestId"]
                    && objItem["iCycleRepetition"] != iCycleRepetition);
                objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedResults: arrLatestSelectedResult } })
            }
        } else {
            let arrLatestSelectedResult = objContext.state.arrSelectedResults.filter(objItem => objItem["uPupilId"] != objPupilDetails["uPupilId"] || objItem["uTestId"] != objTestDetails["uTestId"]
                || objItem["iCycleRepetition"] != iCycleRepetition);
            objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedResults: arrLatestSelectedResult } })
        }
    }

    /**
     * @name OnClickAllCheckBox
     * @param {any} objContext
     * @param {any} objTestDetails
     * @param {any} iCycleRepetition
     * @param {any} blnIsChecked
     * @summary selects all results
     */
    OnClickAllCheckBox(objContext, objTestDetails, iCycleRepetition, blnIsChecked) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        if (blnIsChecked) {
            let arrLatestSelectedResult = arrPupil.map(ppl => {
                return {
                    uPupilId: ppl["uPupilId"],
                    uTestId: objTestDetails["uTestId"],
                    iCycleRepetition: iCycleRepetition
                }
            });
            let arrTempSelectedResult = objContext.state.arrSelectedResults.map(x => { return { ...x } });
            arrLatestSelectedResult = [...arrTempSelectedResult, ...arrLatestSelectedResult];
            objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedResults: arrLatestSelectedResult } })

        } else {
            let arrLatestSelectedResult = [];
            arrPupil.map(ppl => {
                let arrPupilSelectedResult = objContext.state.arrSelectedResults.filter(objItem => objItem["uPupilId"] != ppl["uPupilId"] && objItem["uTestId"] != objTestDetails["uTestId"]
                    && objItem["iCycleRepetition"] != iCycleRepetition);
                arrLatestSelectedResult = [...arrLatestSelectedResult, arrPupilSelectedResult];
            })
            objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedResults: arrLatestSelectedResult } })
        }
    }

    /**
     * @name CreateCompetencyPdfProgressBarPopup
     * @param {any} objContext
     */
    CreateCompetencyPdfProgressBarPopup(objContext, objTextResource) {
        if (objContext.state.arrSelectedResults.length > 0) {
            Popup.ShowProgressBarPopup({
                "Data": {},
                "Meta": {
                    "ShowProgressStatus": "N",
                    "HasCloseButton": "N",
                    "StartProgressOnLoad": true,
                    "CloseProgessBarOnComplete": "Y",
                    "ShowFileToDownload": "Y",
                    Height: "auto"
                },
                "Resource": {
                    "Text": {
                        "ProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'ProgressBarPopup_TitleText'),
                        "ProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'ProgressBarPopup_CancelButtonText')
                    },
                    "TextResourcesKey": "ProgressBarPopup",
                    "SkinPath": JConfiguration.IntranetSkinPath
                },
                "Events": {
                    "StartProgress": (strProgressBarId) => {
                        let objCycle = this.GetCycleObject(objContext);
                        let objParams = {
                            "uCycleId": objCycle["uCycleId"],
                            "uClassId": ApplicationState.GetProperty("SelectedClassId"),
                            "uTeacherId": ClientUserDetails.UserId,
                            "uSchoolId": ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"],
                            "iStateId": GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"]),
                            "ProgressBarId": strProgressBarId,
                            "SelectedResultList": objContext.state.arrSelectedResults,
                            "iSubjectId": this.GetSubjectId(objContext)
                        };

                        Extranet_Teacher_TestResults_Module.CreateCompetencyPdf(objParams, (objResponse) => {
                            console.log("=============> competency pdf", objResponse);
                            let arrPdfData = objResponse["Extranet_Teacher_TestResults_Module"]["Data"];
                            let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback");
                            let objOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
                            let strOfflineExecutionKey = "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId
                            let objOfflineExecutionData = {
                                Filter: strOfflineExecutionKey,
                                Value: {
                                    Data: [...arrPdfData],
                                    TimeStamp: "",
                                    PrimaryKeyName: "uOfflineProcessExecutionId",
                                    Count: arrPdfData.length
                                }
                            };

                            ArcadixCacheData.EditData("Object_Cockpit_OfflineProcess_OfflineProcessExecution", objOfflineExecutionData, () => {
                                objContext.dispatch({ type: "SET_STATE", payload: { Open: true } });
                            });

                            objContext.dispatch({ type: "SET_STATE", payload: { Open: true } });
                        });
                    }
                },
                "CallBacks": {}
            });
        } else {
            let objPopupTextResource = {
                Error_ErrorText: Localization.TextFormatter(objTextResource, 'SelectResultMessage'),
                Error_OkButtonText: Localization.TextFormatter(objTextResource, 'Okay'),
                Error_Title: Localization.TextFormatter(objTextResource, 'ErrorMessageHeader')
            };
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": "380px",
                    "Height": "auto",
                    "ShowHeader": true,
                },
                Resource: {
                    Text: objPopupTextResource,
                    SkinPath: JConfiguration.ExternalSkinPath,
                    TextResourcesKey: "Error"
                },
                Events: {},
                CallBacks: {}
            });
        }
    }

    /**
     * @name GetOfflineExecutionLoaded
     * @param {any} objContext
     */
    GetOfflineExecutionLoaded(objContext) {
        let objOfflineProcessDefinition = {};
        let objOfflineProcessDefinitionId = "";
        if (DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback")) {
            objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback");
            objOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
        }

        let objOfflineProcessExecution = DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId)["Data"];
        return objOfflineProcessExecution ? true : false;
    }

    /**
     * @name objContext
     * @param {any} objContext
     * @summary Opens the Learning test settings popup.
     */
    LearningTestSettingsPopUp(objContext, arrTestData) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrTestLoginsAndResultData = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        let arrCompletedAndInProgressTestResults = [];
        arrTestLoginsAndResultData.map((objTestResult) => {
            if ((objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3))
            ) {
                arrCompletedAndInProgressTestResults = [...arrCompletedAndInProgressTestResults, objTestResult];
            }
        });

        if (arrCompletedAndInProgressTestResults.length == 0) {
            let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestResults", objContext.props)
            let objPopupTextResource = {
                Error_ErrorText: "0" + Localization.TextFormatter(objTextResource, 'NoResults'),
                Error_OkButtonText: Localization.TextFormatter(objTextResource, 'Okay'),
                Error_Title: Localization.TextFormatter(objTextResource, 'NoResultsHeader')
            };

            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": "380px",
                    "Height": "auto",
                    "ShowHeader": true,
                },
                Resource: {
                    Text: objPopupTextResource,
                    SkinPath: JConfiguration.ExternalSkinPath,
                    TextResourcesKey: "Error"
                },
                Events: {},
                CallBacks: {}
            });
        } else {
            Popup.ShowPopup({
                Data: {
                    objContext
                },
                Meta: {
                    PopupName: 'LearningTestSettings',
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    Height: '98%',
                    Width: '98%',
                    FromTestResults: true
                },
                Resource: {
                    SkinPath: JConfiguration.ExtranetSkinPath
                },
                Events: {
                    SaveExecutions: () => { this.SaveExecutions(objContext, arrTestData) }
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name GetExecutionsForSelectedTests
     * @param {any} objContext
     * @param {any} arrTestData
     */
    GetExecutionsForSelectedTests(objContext, arrTestData) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrExecution = [];
        let arrTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        arrTestData.forEach(objTest => {
            for (let objToken of arrTestLoginAndResult) {
                if (objToken["uTestId"] == objTest["uTestId"] && objToken["TestExecution"].length > 0 && objToken["TestExecution"][0]["iTestStatusId"] == "5") {
                    arrExecution = [...arrExecution, { uExecutionId: objToken["TestExecution"][0]["uExecutionId"] }]
                }
            }
        })
        return arrExecution;
    }

    /**
     * @name SaveExecutions
     * @param {any} objContext
     * @summary inserts executions to generate LearningTest.
     */
    SaveExecutions(objContext, arrTestData) {
        let objCycle = this.GetCycleObject(objContext);
        let arrExecution = this.GetExecutionsForSelectedTests(objContext, arrTestData);
        if (/*arrExecution.length > 0*/true) {
            let objParams = {
                ExecutionIdList: arrExecution,
                uCycleId: objCycle["uCycleId"],
                uSchoolId: objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"],
                iStateId: GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]),
                uSchoolYearPeriodId: objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId
            };
            Extranet_Teacher_TestResults_Module.InsertLearningTestGenerationForLastRound(objParams, (objResponse) => {
                objContext.dispatch({ type: "SET_STATE", payload: { showLearningTestGenerationPopup: true, iExecutionCount: arrExecution.length } })
            })
        } else
            objContext.dispatch({ type: "SET_STATE", payload: { showLearningTestGenerationPopup: true } })

    }

    /**
     * @name CloseLearningTestPopup
     * @param {any} objContext
     */
    CloseLearningTestPopup(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { showLearningTestGenerationPopup: false } })
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
     * @name RefreshTokenData
     * @summary gets the token data to check status.
     * @param {any} objContext
     */
    RefreshTokenData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);

        //test login and result
        let objMainTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId
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

        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams])
        let arrDataRequest = [Object_TestApplication_TestLoginAndResult];

        ApplicationState.SetProperty("blnShowAnimation", true);
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
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

export default TestResults_ModuleProcessor;