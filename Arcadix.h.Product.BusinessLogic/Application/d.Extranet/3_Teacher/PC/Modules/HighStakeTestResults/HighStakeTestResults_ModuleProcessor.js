//Module object imports.
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_TestApplication_TestLoginAndResult from '@shared/Object/f.TestApplication/TestLoginAndResult/TestLoginAndResult';
import Extranet_Teacher_TestResults_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_Module';
import Extranet_Teacher_TeacherDataComparison_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/DataComparison/DataComparison_Module';
import Object_Cockpit_OfflineProcessDefinition from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessDefinition/OfflineProcessDefinition';
// import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/offlineProcess/OfflineProcessExecution/OfflineProcessExecution';
import Extranet_Teacher_Certificate_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/Certificate_Module';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';

/**
 * @name HighStakeTestResults_ModuleProcessor
 * @summary module processor for HighStakeTest results.
 * */
class HighStakeTestResults_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name HighStakeTestResults_ModuleProcessor
     * @summary used for define CycleTypeId
     * */
    constructor() {
        super();
        this.strCycleTypeId = '6';
        this.blnArchive = QueryString.GetQueryStringValue("IsArchive") == 'Y';
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/HighStakeTestResults", "Object_Extranet_Pupil_Pupil",
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Extranet_Teacher_Class", "Object_Intranet_Taxonomy_Subject", "Object_TestApplication_TestLoginAndResult",
            "Object_Intranet_Cycle_Cycle", "Object_Intranet_Test_IntranetTest", "Object_Cockpit_OfflineProcessDefinition",
            "Object_Cockpit_OfflineProcess_OfflineProcessExecution", "Object_Cockpit_MainClient_ClientSettings",
            { "StoreKey": "ApplicationState", "DataKey": "RefreshTestTokenData" }
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
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/HighStakeTestResults/HighStakeTestResults.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResultsPopup/AllPdfTest/AllPdfTest.css"
        ];
    };

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
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/HighStakeTestResults"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //class
        let objGetClassesParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            //"SearchQuery": {
            //    "must": [
            //        {
            //            "nested": {
            //                "path": "t_TestDrive_Member_Class_Teacher",
            //                "query": {
            //                    "bool": {
            //                        "must": [
            //                            {
            //                                "match": {
            //                                    "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
            //                                }
            //                            }
            //                        ]
            //                    }
            //                }
            //            }
            //        }
            //    ]
            //},
            "SortKeys": [],
            "OutputColumns": []
        };
        Object_Extranet_Teacher_Class.Initialize(objGetClassesParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //subject  
        let objSubjectParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsTestedAtThisTime": "Y"
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
                    },
                    {
                        "match": {
                            "cIsHighStakeSubject": "Y"
                        }
                    }
                ]
            }
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
            }
        };
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        //cycle
        let objCycleParams = {};

        if (this.blnArchive) {
            objCycleParams = {
                "SearchQuery": {
                    "must":
                        [
                            {
                                "match": {
                                    "iCycleTypeId": this.strCycleTypeId
                                }
                            },
                            {
                                "match": {
                                    "cIsArchiveTeacher": "Y"
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
                        "dtCreatedOn": {
                            "order": "asc"
                        }
                    }
                ]
            };
        }
        else {
            objCycleParams = {
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
                        ],
                    "must_not": [
                        {
                            "match": {
                                "cIsArchiveTeacher": 'Y'
                            }
                        }
                    ]
                }
            };
        }
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        //intranet main tests
        let objMainIntranetTestParams = {
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsArchive": this.blnArchive ? "Y" : "N",
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

        Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams]);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        //Main testlogins and results.
        let objMainTestLoginAndResultParams = {
            "cIsArchive": this.blnArchive ? "Y" : "N",
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

        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams]);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        let objOfflineProcessDefinitionParams = {
            "SearchQuery": {
                "should": [
                    {
                        "match": {
                            "vOfflineProcessKeyword": "HighStakeDataExport"
                        }
                    },
                    {
                        "match": {
                            "vOfflineProcessKeyword": "Certificate"
                        }
                    }
                ]
            }
        };

        Object_Cockpit_OfflineProcessDefinition.Initialize(objOfflineProcessDefinitionParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_OfflineProcessDefinition];

        let objClientSettingsParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iApplicationTypeId": "1"
                        }
                    }
                ]
            }
        }
        Object_Cockpit_MainClient_ClientSettings.Initialize(objClientSettingsParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];
        return arrDataRequest;
    }

    /**
     * @name GetTestLoginAndResults
     * @summary returns the TestLoginsAndResults data.
     * @param {any} objContext
     */
    GetTestLoginAndResults(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrTestLoginAndResults = [];
        if (this.blnArchive && objContext.state.strArchiveSelectedCycleId !== '') { // if module is  archive and cycle object is selected then read data with uCycleId key.
            arrTestLoginAndResults = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;uCycleId;" + objContext.state.strArchiveSelectedCycleId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        } else { // if module is not archive then read data with CycleTypeId key.
            arrTestLoginAndResults = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        }
        return arrTestLoginAndResults ? arrTestLoginAndResults : [];
    }

    /**
     * @name GetTestData
     * @summary returns the test 
     * @param {any} objContext
     */
    GetTestData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrTestData = [];
        if (this.blnArchive && objContext.state.strArchiveSelectedCycleId && objContext.state.strArchiveSelectedCycleId !== '') { //// if module is  archive and cycle object is selected then read data with uCycleId key.
            arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";uCycleId;" + objContext.state.strArchiveSelectedCycleId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSelectedSchoolyearId + ";cIsDeleted;N").Data;
        } else { // if module is not archive then read data with CycleTypeId key.
            arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSelectedSchoolyearId + ";cIsDeleted;N").Data;

        }
        let arrFilteredTestData = arrTestData && arrTestData.length > 0 ?
            arrTestData.filter(objTestData => objTestData["iProviderId"] != 2)
            : [];
        //let intSchoolYearId = this.GetSchoolYearIdFromSelectedClass(objContext);
        //var arrFilteredTestDataBySchoolYId = [];
        //if (arrFilteredTestData && arrFilteredTestData.length > 0) {
        //    arrFilteredTestData.map((objTempData) => {
        //        if (objTempData["t_TestDrive_Cycle_SchoolYear"].filter((objTempTestSchoolYearData) => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0) {
        //            arrFilteredTestDataBySchoolYId = [...arrFilteredTestDataBySchoolYId, objTempData];
        //        }
        //    });
        //}
        return arrFilteredTestData;
    }

    /**
     * @name GetTestResults
     * @summary returns the completed test results.
     * @param {any} objContext
     * @param {any} uPupilId
     * @param {any} uTestId
     */
    GetTestResults(objContext, uPupilId, uTestId) {
        let strCycleId = this.GetCycleId(objContext);
        let arrTestLoginsAndResultData = this.GetTestLoginAndResults(objContext);
        let arrCompletedAndInProgressTestResults = [];
        (arrTestLoginsAndResultData && arrTestLoginsAndResultData.length > 0) ? arrTestLoginsAndResultData.map((objTestResult) => {
            if (objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3) && (objTestResult["uPupilId"] === uPupilId && objTestResult["uCycleId"] === strCycleId && objTestResult["uTestId"] === uTestId)) {
                arrCompletedAndInProgressTestResults = [...arrCompletedAndInProgressTestResults, objTestResult];
            }
        }) : '';

        return arrCompletedAndInProgressTestResults;
    }

    /**
     * @name GetSelectedTestResults
     * @summary returns the selected test results
     * @param {any} objContext
     * @param {any} objCompareTestDetails
     */
    GetSelectedTestResults(objContext, objCompareTestDetails) {
        var arrTestDetails = false;
        if (objContext.state.arrSelectAllTestResults.length > 0) {
            objContext.state.arrSelectAllTestResults.map((objTestData) => {
                if (objTestData["objTestDetails"]["uTestId"] === objCompareTestDetails["uTestId"]) {
                    arrTestDetails = true;
                }
            });
        }
        return arrTestDetails;
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
            let arrMainTestLoginAndResult = this.GetTestLoginAndResults(objContext);
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
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedSchoolYearPeriod": objItem, iSchoolYerPeriodCounter: ++objContext.state.iSchoolYerPeriodCounter } });
    }

    /**
     * @name GetDefaultSubjects
     * @param {any} objContext
     */
    GetDefaultSubjects(objContext) {
        let arrTempSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsLearnCoacherSubject;Y;cIsDeleted;N").Data;
        let arrSubjects = arrTempSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
        return arrSubjects;
    }

    /**
     * @name GetSubSubject
     * @param {*} objContext 
     * @summary   Returns the sub subject of the selected subjects
     */
    GetSubSubject(objContext) {
        let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsLearnCoacherSubject;Y;cIsDeleted;N").Data;
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
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId /*+ ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N"*/).Data;
        }

        arrClassData.map((objClassData) => {
            if (objClassData["uClassId"] === uSelectedClassId) {
                arrSelectedClassObj = [...arrSelectedClassObj, objClassData];
            }
        });
        var arrSchoolYear = [];
        let arrAllSchoolYear = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")) {
            arrSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data;
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
    }

    /**
     * @name GetSubjectId
     * @summary returns the selected subject id.
     * @param {any} objContext
     */
    GetSubjectId(objContext) {
        return objContext.state.intSelectedSubjectId != -1 ? objContext.state.intSelectedSubjectId : this.GetDefaultSubjects(objContext)[0]["iSubjectId"];
    }


    /**
     * @name GetClassDropDownData
     * @param {} objContext 
     * @summary  returns an array of classes to load in the drop down
     */
    GetClassDropDownData(objContext, objTextResource) {
        let arrTempClass = [];
        let strTeacherId = global.ClientUserDetails.UserId;
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId/* + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N"*/).Data.map((objClass) => {
                return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
            });
        }

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
        }
        );
        let arrFinalClassData = [
            {
                "Title": Localization.TextFormatter(objTextResource, 'ClassDropDownMainClassTitle'),
                "Data": arrMainClassData
            },
            {
                "Title": Localization.TextFormatter(objTextResource, 'ClassDropDownCoTeacherTitle'),
                "Data": arrCoTeacherClassData
            },
            {
                "Title": Localization.TextFormatter(objTextResource, 'ClassDropDownSubjectExpertTitle'),
                "Data": arrSubjectExpertClassData
            }
        ];
        return arrFinalClassData;
    }

    /**
     * @name OnChangeClassDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the class dropdown selection changes
     */
    OnChangeClassDropDown(objContext, objItem) {
        let blnIsClassEight = objItem["iSchoolYear"] == 8 ? true : false;
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedClass": objItem, "blnIsClassEight": blnIsClassEight, blnClassChanged: true } });
    }

    /**
    * @name GetDataAfterClassChange
    * @param {*} objContext
    * @summary Returns the pupil params for selected class
    */
    GetDataAfterClassChange(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");

        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
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
                    }
                ]
            }
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //intranet test
        let objMainIntranetTestParams = {
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

        Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams]);
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

        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams]);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];
        ApplicationState.SetProperty("blnShowAnimation", true);
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
    * @name GetDataAfterClassChange
    * @param {*} objContext
    * @summary Returns the pupil params for selected class
    */
    GetDataAfterCycleOrSchoolYearChange(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");

        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrDataRequest = [];

        //intranet test
        let objMainIntranetTestParams = {
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsArchive": "Y",
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
                                "uCycleId": objContext.state.strArchiveSelectedCycleId
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

        Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams]);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        //test login and result
        let objMainTestLoginAndResultParams = {
            "cIsArchive": "Y",
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uCycleId": objContext.state.strArchiveSelectedCycleId
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

        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams]);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        ApplicationState.SetProperty("blnShowAnimation", true)
            (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
                ApplicationState.SetProperty("blnShowAnimation", false)
            });
    }

    /**
     * @name OnChangeSubjectDropDown
     * @param {*} objContext 
     * @param {*} objItem 
     * @summary   Triggers when the class dropdown selection changes
     */
    OnChangeSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubjectId": objItem.iSubjectId } });
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
     * @name GetCycleId
     * @summary returns the cycle id.
     * @param {any} objContext
     */
    GetCycleId(objContext) {
        let strCycleId = "";
        if (this.blnArchive) {
            if (objContext.state.strArchiveSelectedCycleId && objContext.state.strArchiveSelectedCycleId !== '') {
                strCycleId = objContext.state.strArchiveSelectedCycleId;
            } else {
                strCycleId = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + this.strCycleTypeId + ";cIsArchiveTeacher;Y;cIsActive;Y;cIsDeleted;N")["Data"][0]["uCycleId"];
            }
        }
        else {
            strCycleId = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + this.strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"][0]["uCycleId"];
        }


        return strCycleId;
    }

    CheckAllTestsForPupil(objContext, objPupilDetails, blnChecked) {
        //arrAllTestsForPupil
        let arrAllTestsForPupil = [];
        let strPupilId = objPupilDetails["uPupilId"];
        let arrSelectedPupil = [];
        //let strTestId = objTestDetails["uTestId"];
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);

        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strCycleTypeId = objContext.HighStakeTestResults_ModuleProcessor.strCycleTypeId;

        let arrTest = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        if (arrTest == undefined) {
            arrTest = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        }
        let arrFilteredTest = arrTest.filter(objTest => objTest["uPupilId"] == strPupilId && objTest["TestExecution"].length > 0);
        arrAllTestsForPupil = [...objContext.state.arrAllTestsForPupil];
        for (let i = 0; i < arrFilteredTest.length; i++) {

            let objTest = objContext.state.arrAllTestsForPupil.find(objTest => objTest["uTestTokenId"] == arrFilteredTest[i]["uTestTokenId"]);
            if (objTest) {
                arrAllTestsForPupil = arrAllTestsForPupil.filter(objAllTest => objAllTest["uTestTokenId"] != objTest["uTestTokenId"]);
            } else {
                arrAllTestsForPupil = [...arrAllTestsForPupil, arrFilteredTest[i]];
            }
        }

        if (blnChecked) {
            arrSelectedPupil = objContext.state.arrSelectedPupil.length > 0 ? objContext.state.arrSelectedPupil.filter(objPupil => objPupil["uPupilId"] !== strPupilId) : [];
        } else {
            arrSelectedPupil = [...objContext.state.arrSelectedPupil, objPupilDetails];
        }

        objContext.dispatch({ type: "SET_STATE", payload: { "arrAllTestsForPupil": arrAllTestsForPupil, "arrSelectedPupil": arrSelectedPupil } });
    }

    //Not used as the JSX is not made yet
    GetSelectedPupilForCertificateVV(objContext, objPupilDetails, blnChecked) {
        let strPupilId = objPupilDetails["uPupilId"];
        let arrSelectedPupil = [];
        if (blnChecked) {
            arrSelectedPupil = objContext.state.arrSelectedPupilForVV.length > 0 ? objContext.state.arrSelectedPupilForVV.filter(objPupil => objPupil["uPupilId"] !== strPupilId) : [];
        } else {
            arrSelectedPupil = [...objContext.state.arrSelectedPupilForVV, objPupilDetails];
        }

        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedPupilForVV": arrSelectedPupil } });
    }

    //Not used as the JSX is not made yet
    GetSelectedPupilForCertificateTLV(objContext, objPupilDetails, blnChecked) {
        let strPupilId = objPupilDetails["uPupilId"];
        let arrSelectedPupil = [];
        if (blnChecked) {
            arrSelectedPupil = objContext.state.arrSelectedPupilForTLV.length > 0 ? objContext.state.arrSelectedPupilForTLV.filter(objPupil => objPupil["uPupilId"] !== strPupilId) : [];
        } else {
            arrSelectedPupil = [...objContext.state.arrSelectedPupilForTLV, objPupilDetails];
        }

        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedPupilForTLV": arrSelectedPupil } });
    }

    //Not used as the JSX is not made yet
    GetSelectedPupilForCertificatePSM(objContext, objPupilDetails, blnChecked) {
        let strPupilId = objPupilDetails["uPupilId"];
        let arrSelectedPupil = [];
        if (blnChecked) {
            arrSelectedPupil = objContext.state.arrSelectedPupilForPSM.length > 0 ? objContext.state.arrSelectedPupilForPSM.filter(objPupil => objPupil["uPupilId"] !== strPupilId) : [];
        } else {
            arrSelectedPupil = [...objContext.state.arrSelectedPupilForPSM, objPupilDetails];
        }

        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedPupilForPSM": arrSelectedPupil } });
    }

    /**
    * @name HandleCertificateGenerationPopup
    * @param {object} objContext Context Object
    * @summary toggler for show pdf.
    */
    HandleCertificateGenerationPopup(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "OpenCertifcateGenerationPopup": !objContext.state.OpenCertifcateGenerationPopup } });
    }

    /**
    * @name GenerateCertificateErrorPopup
    * @summary open the generate certificate error popup
    * @param {object} objTextResource Text Resource object
    */
    GenerateCertificateErrorPopup(objTextResource) {
        let objPopupTextResource = {
            CertificateGenerationErrorPopup_ErrorText: Localization.TextFormatter(objTextResource, 'NoResultsErrorPopupMessage'),
            CertificateGenerationErrorPopup_OkButtonText: "Ok",
            CertificateGenerationErrorPopup_Title: "Fehler"
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
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "CertificateGenerationErrorPopup"
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
    * @name GenerateCertificateProgressBarPopup
    * @summary open the generate certificate confirmation popup
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource object
    */
    GenerateCertificateConfirmationPopup(objContext, objTextResource) {
        objContext.dispatch({ type: "SET_STATE", payload: { "OpenCertifcateGenerationPopup": false } });
        let objPopupTextResource = {
            CertificateGenerationConfirmationPopup_ConfirmText: 'Wählen Sie "Erstellen" um die Leistungsprofile zu generieren.',
            CertificateGenerationConfirmationPopup_ConfirmButtonText: 'Erstellen',
            CertificateGenerationConfirmationPopup_CloseButtonText: 'Abbrechen',
            CertificateGenerationConfirmationPopup_Title: 'Leistungsprofil'
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                Height: "auto"
            },
            Resource: {
                Text: objPopupTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "CertificateGenerationConfirmationPopup"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    Popup.ClosePopup(strPopupUniqueId);
                    setTimeout(() => { objContext.HighStakeTestResults_ModuleProcessor.GenerateCertificateProgressBarPopup(objContext, objTextResource); }, 1000);

                }
            },
            CallBacks: {}
        });
    }

    /**
    * @name GenerateCertificateProgressBarPopup
    * @summary open the progress bar popup to generate certificate
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource object
    */
    GenerateCertificateProgressBarPopup(objContext, objTextResource) {
        let arrCertificateTypeList = [];

        let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId /*+ ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N"*/).Data;
        let strSchoolYear = !objContext.state.objSelectedClass ? arrClassData.find(objClass => objClass["uClassId"] == ApplicationState.GetProperty("SelectedClassId"))["iSchoolYear"] : objContext.state.objSelectedClass["iSchoolYear"];

        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                "ShowProgressStatus": "Y",
                "HasCloseButton": "N",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": "Y"
            },
            "Resource": {
                "Text": {
                    ...objTextResource
                },
                "TextResourcesKey": "SchoolDataComparisonProgressBarPopup",//"CertificateGenerationProgressBarPopup",
                "SkinPath": JConfiguration.ExtranetSkinPath
            },
            "Events": {
                StartProgress: (strProgressBarId) => {
                    if (objContext.state.arrSelectedPupil.length > 0) {
                        arrCertificateTypeList = [...arrCertificateTypeList, {
                            vCertificateTypeName: objContext.state.strCertificateName,
                            SelectedPupilList: objContext.state.arrSelectedPupil
                        }];
                    }
                    if (objContext.state.arrSelectedPupilForVV.length > 0) {
                        arrCertificateTypeList = [...arrCertificateTypeList, {
                            vCertificateTypeName: "VV",
                            SelectedPupilList: objContext.state.arrSelectedPupilForVV
                        }];
                    }
                    if (objContext.state.arrSelectedPupilForTLV.length > 0) {
                        arrCertificateTypeList = [...arrCertificateTypeList, {
                            vCertificateTypeName: "TLV",
                            SelectedPupilList: objContext.state.arrSelectedPupilForTLV
                        }];
                    }
                    if (objContext.state.arrSelectedPupilForPSM.length > 0) {
                        arrCertificateTypeList = [...arrCertificateTypeList, {
                            vCertificateTypeName: "PSM",
                            SelectedPupilList: objContext.state.arrSelectedPupilForPSM
                        }];
                    }

                    let objRequest = {
                        cIsArchive: objContext.HighStakeTestResults_ModuleProcessor.blnArchive,
                        uClassId: objContext.state.objSelectedClass["uClassId"],
                        uCycleId: objContext.HighStakeTestResults_ModuleProcessor.GetCycleId(objContext),
                        iStateId: GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"].find(objTeacherDetails => objTeacherDetails["cIsDeleted"] == "N").uSchoolId),
                        uTeacherId: ClientUserDetails.TeacherDetails["uTeacherId"],
                        uSchoolId: ClientUserDetails.TeacherDetails["uSchoolId"],
                        ProgressBarId: strProgressBarId,
                        IndividualRepetition: "Y", //Temporary hardcoded as asked by sanjay
                        CertificateTypeList: arrCertificateTypeList,
                        iSchoolYear: strSchoolYear.toString()
                    };

                    Extranet_Teacher_Certificate_Module.GenerateCertificate(objRequest, (objResponse) => {
                        console.log("GenerateCertificate response", objResponse);

                        let arrPdfData = [...objResponse["Extranet_Teacher_Certificate_Module_GenerateCertificate"].Data];
                        // let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;HighStakeDataExport");
                        //let objOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
                        let strOfflineExecutionKey = "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + ClientUserDetails.UserId
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

                        //objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineProcessExecutionData": [...objResponse["Extranet_Teacher_Certificate_Module_GenerateCertificate"].Data, ...objContext.state.arrOfflineProcessExecutionData], "Open": true } });
                    });
                },
                OnProgressComplete: (objProgressDetails) => {
                    //let objOfflineProcessDefinition = JSON.parse(objProgressDetails["ReturnData"][0]);
                    //setTimeout(() => {
                    //    //objContext.HighStakeTestResults_ModuleProcessor.HandleProcessExecutionForCertificate(objContext, objOfflineProcessDefinition);
                    //}, 1000);
                }
            },
            "CallBacks": {}
        });
    }

    /**
    * @name HandleProcessExecutionForCertificate
    * @summary open the pdf popupv after certificate is generated
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource object
    */
    HandleProcessExecutionForCertificate(objContext, objOfflineProcessDefinition) {
        let strOfflineProcessDefinitionId = objOfflineProcessDefinition["uOfflineProcessDefinitionId"];
        //OfflineProcessExecution
        let objOfflineProcessExecutionParams = {
            "ForeignKeyFilter": {
                "uUserId": ClientUserDetails.UserId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uOfflineProcessDefinitionId": strOfflineProcessDefinitionId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };

        var arrDataRequest = [
            {
                URL: "API/Object/Cockpit/OfflineProcessExecution",
                Params: objOfflineProcessExecutionParams,
                MethodType: "Get",
                NoCache: true
            }
        ];
        ArcadixFetchData.Execute(arrDataRequest, function (objReturn) {
            let arrModifyOfflineProcessExecution = [...objContext.state.arrOfflineProcessExecution, ...objReturn["OfflineProcessExecution"].Data];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineProcessExecutionData": arrModifyOfflineProcessExecution, "Open": true } });
        });
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
     * @name OnChangeCycleDropDown
     * @summary updates the selected cycle id to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeCycleDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strArchiveSelectedCycleId": objItem.uCycleId } });
    }

    /**
     * @name OnChangeCycleDropDown
     * @summary updates the selected cycle id to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeSchoolYearDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strSelectedSchoolyearId": objItem.iSchoolYearId } });
    }

    /**
     * @name OnChangeCheckBox
     * @param {*} objContext
     * @param {*} objTestDetails
     * @param {*} blnIsChecked
     * @summary   Trigerred when the any checkbox is checked or unchecked. 
     */
    OnChangeCheckBox(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, blnIsChecked) {
        var arrAllTestResults = [];
        if (blnIsChecked) {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
            let arrTestLoginsAndResultData = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId).Data;

            let CompletedAndInProgressTestResults = [];
            arrTestLoginsAndResultData.map((objTestResult) => {
                if (objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3)) {
                    CompletedAndInProgressTestResults = [...CompletedAndInProgressTestResults, objTestResult];
                }
            });
            if (objTestDetails.length > 0) {
                CompletedAndInProgressTestResults.map((objCompletedTestData) => {
                    objTestDetails.map((objTestDetails) => {
                        if (objCompletedTestData["uTestId"] === objTestDetails["uTestId"] && objCompletedTestData["TestExecution"][0]["iTestStatusId"] !== 3) {
                            arrAllTestResults = [...arrAllTestResults, { "blnIsChecked": blnIsChecked, "blnIsGroupSelect": true, "objTestDetails": objCompletedTestData }];
                        }
                    });
                });
                arrAllTestResults = [...objContext.state.arrSelectAllTestResults, ...arrAllTestResults];

            }
            else {
                CompletedAndInProgressTestResults.map((objCompletedTestData) => {
                    if (objCompletedTestData["uTestId"] === objTestDetails["uTestId"] && objCompletedTestData["TestExecution"][0]["iTestStatusId"] !== 3) {
                        arrAllTestResults = [...objContext.state.arrSelectAllTestResults, { "blnIsChecked": blnIsChecked, "blnIsGroupSelect": false, "objTestDetails": objCompletedTestData }];
                    }
                });
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectAllTestResults": arrAllTestResults } });
        }
        else {
            if (objTestDetails.length > 0) {
                objContext.state.arrSelectAllTestResults.map((objSelectAllTestData) => {
                    if (objSelectAllTestData["blnIsGroupSelect"] !== true) {
                        arrAllTestResults = [...arrAllTestResults, objSelectAllTestData];
                    }
                });
            }
            else {
                objContext.state.arrSelectAllTestResults.map((objSelectAllTestData) => {
                    if (objSelectAllTestData["objTestDetails"]["uTestId"] !== objTestDetails["uTestId"]) {
                        arrAllTestResults = [...arrAllTestResults, objSelectAllTestData];
                    }
                });
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectAllTestResults": arrAllTestResults } });
        }
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
     * @name OpenMoveResultsPopup
     * @summary opens the move results popup.
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     * @param {any} objTextResult objTextResult
     */
    OpenMoveResultsPopUp(objContext, objTextResource, objTextResult) {
        let objCycleData = this.GetCycleId(objContext);
        Popup.ShowPopup({
            Data: {
                objCycleData: objCycleData,
                ClientUserDetails: objContext.props.ClientUserDetails,
                objTestResult: objTextResult,
                iStateId: GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"]),
                uSchoolId: ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"],
                IsOrientationTest: false
            },
            Meta: {
                PopupName: 'MoveResultsPopup',
                Height: 'Auto'
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
    * @name ReCalculateTestResult
    * @param {any} objContext
    * @param {any} objTest
    * @param {any} objTestResult
    */
    ReCalculateTestResult(objContext, objTest, objTestResult) {
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
                ExecutionId: objTestResult["TestExecution"][0]["uExecutionId"]
            }
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Teacher_TestResults_Module.ReCalculateTestResultForPupil(objParams, (res) => { ApplicationState.SetProperty("blnShowAnimation", false); });
    }

    /**
     * @name OpenDetailPdfPopup
     * @summary open the details popup.
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     */
    OpenDetailPdfPopup(objContext, objTextResource) {
        //Popup.ShowPopup({
        //    PopupName: "DetailPDFPopUp", //name of the component to be displayed inside the popup. must be present in ComponentController
        //    PopupProps: {
        //        Data: {}
        //    }
        //});

        //Popup.ShowPopup({
        //    Data: { },
        //    Meta: {
        //        PopupName: 'DetailPDFPopUp',
        //        ShowHeader: false,
        //        ShowCloseIcon: true,
        //        Height: "auto"
        //    },
        //    Resource: {
        //        Text: objTextResource,
        //        SkinPath: JConfiguration.ExtranetSkinPath
        //    },
        //    Events: {},
        //    CallBacks: {}
        //});
        Popup.ShowErrorPopup({
            Data: {},
            Meta: {
                "Width": "380px",
                "Height": "auto",
                "ShowHeader": true,
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "HighStakeErrorPopup"
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name OpenDataComparisonProgressBarPopup
     * @summary open the details popup.
     * @param {any} objContext objContext
     */
    OpenDataComparisonProgressBarPopup(objContext, objTextResource) {
        let arrTestLoginsAndResultData = this.GetTestLoginAndResults(objContext);
        let arrCompletedAndInProgressTestResults = [];
        if (arrTestLoginsAndResultData && arrTestLoginsAndResultData.length > 0) {
            arrTestLoginsAndResultData.map((objTestResult) => {
                if (objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3)) {
                    arrCompletedAndInProgressTestResults = [...arrCompletedAndInProgressTestResults, objTestResult];
                }
            })
        }
        if (arrCompletedAndInProgressTestResults.length > 0) {
            Popup.ShowProgressBarPopup({
                "Data": {},
                "Meta": {
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "N",
                    "StartProgressOnLoad": true,
                    "CloseProgessBarOnComplete": "Y"
                },
                "Resource": {
                    "Text": {
                        ...objTextResource
                    },
                    "TextResourcesKey": "SchoolDataComparisonProgressBarPopup",
                    "SkinPath": JConfiguration.ExtranetSkinPath
                },
                "Events": {
                    StartProgress: (strProgressBarId) => { objContext.HighStakeTestResults_ModuleProcessor.GetDataComparisonData(objContext, strProgressBarId); },
                    OnProgressComplete: (objProgressDetails) => {
                        let arrDataComparisonData = JSON.parse(objProgressDetails["ReturnData"]);
                        setTimeout(() => { objContext.HighStakeTestResults_ModuleProcessor.OpenDataComparisonPopup(objContext, arrDataComparisonData); }, 1000);
                    }
                },
                "CallBacks": {}
            });
        }
        else {
            let objPopupTextResource = {
                Error_ErrorText: Localization.TextFormatter(objTextResource, 'NoResultsErrorForDataComparisonPopupMessage'),
                Error_OkButtonText: Localization.TextFormatter(objTextResource, 'Okay'),
                Error_Title: Localization.TextFormatter(objTextResource, 'NoResultsErrorPopupTitle')
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
     * @name GetDataComparisonData
     * @summary Gets the data comparison data and opens the deta comparison popup.
     * @param {any} objContext objContext
     * @param {any} strProgressBarId progress bar id
     */
    GetDataComparisonData(objContext, strProgressBarId) {
        let objParams = {
            uClassId: ApplicationState.GetProperty("SelectedClassId"),
            iCycleTypeId: "6",
            iStateId: GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId),
            uSchoolId: ClientUserDetails.TeacherDetails.uSchoolId,
            uTeacherId: ClientUserDetails.TeacherDetails.uTeacherId,
            blnLoadData: false,
            ProgressBarId: strProgressBarId,
            FromDate: "",
            ToDate: ""
        };

        Extranet_Teacher_TeacherDataComparison_Module.GetData(objParams, (objResult) => { });
    }

    /**
     * @name OpenDataComparisonPopup
     * @summary open the details popup.
     * @param {any} objContext objContext
     */
    OpenDataComparisonPopup(objContext, arrDataComparisonData) {

        Popup.ShowPopup({
            Data: {
                ClientUserDetails: objContext.props.ClientUserDetails,
                arrDataComparisonData: arrDataComparisonData
            },
            Meta: {
                PopupName: 'DataComparison',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "98%",
                Width: "98%"
            },
            Resource: {
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
    * @name OpenProgressBarPopup
    * @param {any} objContext objContext
    * @param {any} objTextResource objTextResource
    * @param {any} strCycleId strCycleId
    * @summary opens ProgressBarPopup
    */
    OpenProgressBarPopup(objContext, objTextResource, strCycleId = undefined) {
        let arrTestLoginsAndResultData = this.GetTestLoginAndResults(objContext);
        let arrCompletedAndInProgressTestResults = [];
        if (arrTestLoginsAndResultData && arrTestLoginsAndResultData.length > 0) {
            arrTestLoginsAndResultData.map((objTestResult) => {
                if (objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3)) {
                    arrCompletedAndInProgressTestResults = [...arrCompletedAndInProgressTestResults, objTestResult];
                }
            })
        }
        if (arrCompletedAndInProgressTestResults.length > 0) {
            Popup.ShowProgressBarPopup({
                "Data": {},
                "Meta": {
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "N",
                    "HasCancelButton": "N",
                    "StartProgressOnLoad": true,
                    "CloseProgessBarOnComplete": "Y"
                },
                "Resource": {
                    "Text": objTextResource,
                    "TextResourcesKey": "HighStakeProgressBarPopup",
                    "SkinPath": JConfiguration.ExtranetSkinPath
                },
                "Events": {
                    StartProgress: (strProgressBarId) => {

                        let objParams = {
                            "iCycleTypeId": 6,
                            "uClassId": ApplicationState.GetProperty("SelectedClassId"),
                            "uTeacherId": ClientUserDetails.UserId,
                            "uSchoolId": ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"],
                            "IsArchive": "N",
                            "CreatedDate": new Date(),
                            "OffLineKeyword": "HighStakeDataExport",
                            "ProgressBarId": strProgressBarId
                        };

                        Extranet_Teacher_TestResults_Module.GenerateDataExport(objParams, (objResponse) => {
                            console.log(objResponse["Extranet_Teacher_TestResults_Module"].Data);
                            let arrPdfData = objResponse["Extranet_Teacher_TestResults_Module"].Data;
                            // let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition");
                            //let objOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
                            let strOfflineExecutionKey = "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + ClientUserDetails.UserId
                            let objOfflineExecutionData = {
                                Filter: strOfflineExecutionKey,
                                Value: {
                                    Data: [...arrPdfData],
                                    TimeStamp: "",
                                    PrimaryKeyName: "uOfflineProcessExecutionId",
                                    Count: arrPdfData.length
                                }
                            };

                            ArcadixCacheData.AddData("Object_Cockpit_OfflineProcess_OfflineProcessExecution", objOfflineExecutionData, () => {
                                objContext.dispatch({ type: "SET_STATE", payload: { Open: true } });
                            });
                            objContext.dispatch({ type: "SET_STATE", payload: { Open: true } });
                        });
                    },
                    OnProgressComplete: (objProgressDetails) => {
                        //let arrReturnData = JSON.parse(objProgressDetails["ReturnData"]);
                        //setTimeout(() => {
                        //    let arrPdfData = arrReturnData[0];
                        //    let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;HighStakeDataExport");
                        //    let objOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
                        //    let strOfflineExecutionKey = "Object_Cockpit_OfflineProcessExecution;uUserId;" + ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId
                        //    let objOfflineExecutionData = {
                        //        Filter: strOfflineExecutionKey,
                        //        Value: {
                        //            Data: [...arrPdfData],
                        //            TimeStamp: "",
                        //            PrimaryKeyName: "uOfflineProcessExecutionId",
                        //            Count: arrPdfData.length
                        //        }
                        //    };

                        //    ArcadixCacheData.EditData("Object_Cockpit_OfflineProcessExecution", objOfflineExecutionData, () => {
                        //        objContext.dispatch({ type: "SET_STATE", payload: { Open: true } });
                        //    });
                        //    objContext.dispatch({ type: "SET_STATE", payload: { Open: !objContext.state.Open } });
                        //    //objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineProcessExecution": [arrReturnData[0], ...objContext.state.arrOfflineProcessExecution], "Open": !objContext.state.Open } });
                        //}, 1000);
                    }
                },
                "CallBacks": {}
            });
        } else {
            let objPopupTextResource = {
                Error_ErrorText: Localization.TextFormatter(objTextResource, 'NoResultsErrorPopupMessage'),
                Error_OkButtonText: Localization.TextFormatter(objTextResource, 'Okay'),
                Error_Title: Localization.TextFormatter(objTextResource, 'NoResultsErrorPopupTitle')
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
     * @name GetMetaDataCycleDropDown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataCycleDropDown() {
        return {
            DisplayColumn: "vCycleName",
            ValueColumn: "uCycleId"
        };
    }

    /**
    * @name GetResourceDataCycleDropDown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataCycleDropDown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsStatusToggleDropDown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsCycleDropDown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.HighStakeTestResults_ModuleProcessor.OnChangeCycleDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetMetaDataSchoolYearDropDown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataSchoolYearDropDown() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "iSchoolYearId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYear_Data"
        };
    }

    /**
    * @name GetEventsSchoolYearDropDown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsSchoolYearDropDown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.HighStakeTestResults_ModuleProcessor.OnChangeSchoolYearDropDown(objContext, objItem)
        };
    }

    /**
     * @name CreateExcelProgressBarPopup
     * @param {Object} objContext Context Object
     * @param {Object} objTextResource Text Resource 
     * @param {String} strCycleId Cycle Id
     * @summary open progressbar popup
     */
    CreateExcelProgressBarPopup(objContext, objTestDetails, objPupilDetails) {
        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                "ShowProgressStatus": "N",
                "HasCloseButton": "N",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": false,
                "ShowFileToDownload": "Y"
            },
            "Resource": {
                "Text": {
                    "ProgressBarPopup_TitleText": "The printout is generated",
                    "ProgressBarPopup_Total": "Total",
                    "ProgressBarPopup_Posted": "Posted",
                    "ProgressBarPopup_Failed": "Failed",
                    "ProgressBarPopup_CancelButtonText": "Cancel",
                    "ProgressBarPopup_CloseButtonText": "Close",
                    "ProgressBarPopup_StartButtonText": "Start"
                },
                "TextResourcesKey": "ProgressBarPopup",
                "SkinPath": JConfiguration.IntranetSkinPath
            },
            "Events": {
                "StartProgress": (strProgressBarId) => {
                    //let objParams = {
                    //    ProgressBarId: strProgressBarId
                    //};

                    //objParams = { ...objParams, ...objContext.props };
                    //objParams["ComponentName"] = "BillingPrintToPDF",
                    //Extranet_School_Billing.PrintToPDF(objParams, (objResponse) => {

                    //});

                    let objParams = {
                        "iCycleTypeId": 6,
                        "uTestId": objTestDetails["uTestId"],
                        "uPupilId": objPupilDetails["uPupilId"],
                        "uClassId": ApplicationState.GetProperty("SelectedClassId"),
                        "uSchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
                        "iRepetition": 1,
                        "uTeacherId": ClientUserDetails.UserId,
                        "uSchoolId": ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"],
                        "iStateId": GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"]),
                        "ProgressBarId": strProgressBarId
                    };

                    Extranet_Teacher_TestResults_Module.GetTestResultExcel(objParams, (objResponse) => {
                        console.log(objResponse);
                    });
                }
            },
            "CallBacks": {}
        });
    }

    /**
    * @name GetAllClasses
    * @param {object} objContext Passes context object
    * @summary  Returns all non deleted classes
    * @returns {Array} Classes
    */
    GetAllClasses(objContext) {
        let arrData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        }

        let arrClasses = arrData.map((objTempData) => {
            return { ...objTempData, ["t_TestDrive_Member_Class_Teacher"]: objTempData["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => objClassTeacher["cIsDeleted"] === "N") };
        }).filter(objTempData => objTempData["t_TestDrive_Member_Class_Teacher"].length > 0);
        return arrClasses;
    }

    /**
    * @name GetPDFFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetPDFFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "outletBand", "SubNavigation", "TopSpace"],
            FooterIds: ["FooterPupil"]
        };
    }

    /**
    * @name GetOfflineProcessExecutionDataParams
    * @param {String} strOfflineProcessDefinitionId Passes OfflineProcessDefinitionId
    * @summary Returns Get data params for Offline Process Execution.
    * @returns {Array} OfflineProcessExecutionDataParams
    */
    GetOfflineProcessExecutionDataParams(arrOfflineProcessData) {
        let arrOfflineProcessDefinitionIds = arrOfflineProcessData.map(x => {
            return {
                "match": {
                    "uOfflineProcessDefinitionId": x["uOfflineProcessDefinitionId"]
                }
            }
        });
        return {
            "ForeignKeyFilter": {
                "uUserId": ClientUserDetails.UserId
            },
            "SearchQuery": {
                "should": arrOfflineProcessDefinitionIds
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
    }

    /**
    * @name DeleteGeneratedOfflineProcessExecution
    * @param {object} objContext Passes context object
    * @param {String} strOfflinePropcessExecutionId Passes OfflinePropcessExecutionId
    * @summary Deletes Offline process.
    */
    DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId) {
        let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;HighStakeDataExport");
        let strOfflinePropcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
        let objOfflineProcessExecutionParams = objContext.HighStakeTestResults_ModuleProcessor.GetOfflineProcessExecutionDataParams(objContext, strOfflinePropcessDefinitionId);

        objOfflineProcessExecutionParams = {
            ...objOfflineProcessExecutionParams,
            ["vDeleteData"]: [{ "uOfflineProcessExecutionId": strOfflinePropcessExecutionId }]
        };
        //ApplicationState.SetProperty("blnShowAnimation", true);
        //Object_Cockpit_OfflineProcessExecution.DeleteData(objOfflineProcessExecutionParams, (objReturn) => {
        //        ApplicationState.SetProperty("blnShowAnimation", false);
        //});
    }

    /**
     * @name GetOfflineExecutionFiles
     * @summary returns the execution details.
     * @param {any} objContext
     * @param {any} strOfflineProcessKeyword
     */
    GetOfflineExecutionFiles(objContext, strOfflineProcessKeyword) {
        let arrOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition")["Data"];
        let strOfflineProcessDefinitionId = arrOfflineProcessDefinition.filter(x => x["vOfflineProcessKeyword"] == strOfflineProcessKeyword)[0]["uOfflineProcessDefinitionId"];

        let arrOfflineProcessExecutionData = DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        let arrOfflineProcessExecution = [];
        if (arrOfflineProcessExecutionData != undefined && arrOfflineProcessExecutionData.length > 0) {
            arrOfflineProcessExecution = arrOfflineProcessExecutionData.filter(x => x["uOfflineProcessDefinitionId"] == strOfflineProcessDefinitionId);
        }
        return arrOfflineProcessExecution;
    }

    ShowDataComparisonButton() {
        let blnShow = false;
        let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;iApplicationTypeId;1").Data;
        let objFilteredSetting = arrClientSettings.find(x => x["vKey"] == "ShowDataComparison" && x["vParentKey"] == "ExtranetTeacher" && x["vSubParentKey"] == "TestResult");
        if (objFilteredSetting) {
            blnShow = objFilteredSetting["vValue"] == "Y";
        }
        return blnShow;
    }

    ShowExportCertificateButton() {
        return global.JConfiguration.MainClientId == "115";
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
     * @name GetEssayToken
     * @param {any} objContext
     * @param {any} strPupilId
     */
    GetEssayToken(objContext, strPupilId) {
        let arrTestLoginsAdnResult = this.GetTestLoginAndResults(objContext);
        let arrEssayTestData = this.GetEssayTestData(objContext);
        let FuncEssayTestFilter = (objToken) => {
            let objEssayTest = arrEssayTestData.find(item => item["uTestId"] == objToken["uTestId"])
            return objEssayTest ? true : false
        }
        let objPupilTokenData = arrTestLoginsAdnResult.find(x => x["uPupilId"] == strPupilId && FuncEssayTestFilter(x))
        return objPupilTokenData;
    }

    /**
     * @name GetEssayTestData
     * @summary GetEssayTestData
     * @param {any} objContext
     */
    GetEssayTestData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrTestData = [];
        if (this.blnArchive && objContext.state.strArchiveSelectedCycleId && objContext.state.strArchiveSelectedCycleId !== '') { //// if module is  archive and cycle object is selected then read data with uCycleId key.
            arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";uCycleId;" + objContext.state.strArchiveSelectedCycleId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSelectedSchoolyearId + ";cIsDeleted;N").Data;
        } else { // if module is not archive then read data with CycleTypeId key.
            arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSelectedSchoolyearId + ";cIsDeleted;N").Data;

        }
        let arrFilteredTestData = arrTestData && arrTestData.length > 0 ?
            arrTestData.filter(objTestData => objTestData["iProviderId"] == 2)
            : [];
        return arrFilteredTestData;
    }

}

export default HighStakeTestResults_ModuleProcessor;