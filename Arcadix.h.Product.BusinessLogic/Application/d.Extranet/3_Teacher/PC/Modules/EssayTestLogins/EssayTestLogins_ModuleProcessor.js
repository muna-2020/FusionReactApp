//Module object imports.
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_Pupil_PupilSubjectClassType from '@shared/Object/d.Extranet/4_Pupil/PupilSubjectClassType/PupilSubjectClassType';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings'
import Object_TestApplication_TestLoginAndResult from '@shared/Object/f.TestApplication/TestLoginAndResult/TestLoginAndResult';
import Extranet_Teacher_EssayTestLogins_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/EssayTestLogins/EssayTestLogins_Module';
import Object_Cockpit_OfflineProcessDefinition from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessDefinition/OfflineProcessDefinition';
import Object_Cockpit_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';
import Object_Extranet_Pupil_PupilLicense from '@shared/Object/d.Extranet/4_Pupil/PupilLicense/PupilLicense';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';



/**
 * @name EssayTestLogins_ModuleProcessor
 * @summary module processor for HighStakeTest results.
 * */
class EssayTestLogins_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name EssayTestLogins_ModuleProcessor
     * @summary used for define CycleTypeId
     * */
    constructor() {
        super();
        this.strCycleTypeId = '6';
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/EssayTestLogins",
            "Object_Extranet_Pupil_Pupil",
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Extranet_Teacher_Class",
            "Object_TestApplication_TestLoginAndResult",
            "Object_Intranet_Cycle_Cycle",
            "Object_Intranet_Test_IntranetTest",
            "Object_Cockpit_OfflineProcessDefinition",
            "Object_Cockpit_OfflineProcess_OfflineProcessExecution",
            "Object_Extranet_Pupil_PupilLicense",
            { "StoreKey": "ApplicationState", "DataKey": "SelectedClassId" }
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/EssayTestLogins/EssayTestLogins.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestLogins/TestLoginsPopups/AllPdfTest/AllPdfTest.css",
            JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css"
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
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/EssayTestLogins"];
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

        //OfflineProcessDefinition
        let objOfflineProcessDefinitionParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vOfflineProcessKeyword": "GenerateEssayTestLogins"
                        }
                    }
                ]
            }
        };

        Object_Cockpit_OfflineProcessDefinition.Initialize(objOfflineProcessDefinitionParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_OfflineProcessDefinition];

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
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        //Pupil License
        let objPupilLicenseParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_PupilLicense.Initialize(objPupilLicenseParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_PupilLicense];

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
        return arrDataRequest;
    }


    /**
     * @name GetPupilData
     * @param {any} objContext
     */
    GetPupilData(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let arrDataRequest = [];
        let strClassId = objContext.state.objSelectedClass["uClassId"];
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
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
        let objPupilLicenseParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_PupilLicense.Initialize(objPupilLicenseParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_PupilLicense];
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name GetDataAfterClassChange
     * @param {any} objContext
     */
    GetDataAfterClassChange(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let strClassId = objContext.state.objSelectedClass["uClassId"];
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
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

        //Pupil License
        let objPupilLicenseParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_PupilLicense.Initialize(objPupilLicenseParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_PupilLicense];
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

        //IntranetTest
        Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams])
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        //Testlogins and results.
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
        Object_TestApplication_TestLoginAndResult.Initialize([objTestLoginAndResultParams])
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnClassChanged": false } });
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "LegendsControls", "TopSpace", "TestLoginsHeader"],
            FooterIds: ["FooterTestLogins"]
        };
    }

    /**
     * @name OnChangeClassDropDown
     * @param {*} objContext
     * @param {*} objItem
     * @summary   Triggers when the class dropdown selection changes
     */
    OnChangeClassDropDown(objContext, objItem) {
        //let arrSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")["Data"];
        //let objSchoolYear = arrSchoolYear.find(objSchlYr => objSchlYr["iSchoolYear"] == objItem["iSchoolYear"]);
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedClass": objItem, "blnClassChanged": true } });
    };

    /**
     * @name GetClassData
     * @description Gets 8th School Year Classes from Class Data in Redux
     * @param {any} objContext
     */
    GetClassData(objContext) {
        let arrClassData = [];
        let objClassDataRef = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N");
        if (objClassDataRef != undefined) {
            arrClassData = objClassDataRef.Data.filter(x => x["iSchoolYear"] == 8).map(x => x);
        }
        return arrClassData;
    }

    /**
     * @name GetSchoolYearIdFromSelectedClass
     * @param {*} objContext 
     * @summary   Returns School Year Id of selected class.
     */
    GetSchoolYearIdFromSelectedClass(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrClassData = objContext.EssayTestLogins_ModuleProcessor.GetClassData(objContext);

        let objSelectedClassDetails = arrClassData.filter(objTempData => objTempData["uClassId"] === strClassId)[0];
        let arrSchoolYearData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")) {
            arrSchoolYearData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data;
        }

        if (objContext.state.objSelectedClass == undefined)
            return "";
        if (objSelectedClassDetails) {
            let objSchoolYearDetails = {};
            if (objSelectedClassDetails["iSchoolYear"] != null) {
                objSchoolYearDetails = arrSchoolYearData.filter(objTempData => objTempData["iSchoolYear"] === objSelectedClassDetails["iSchoolYear"])[0];
            } else {
                objSchoolYearDetails = arrSchoolYearData[0];
            }
            return objSchoolYearDetails["iSchoolYearId"];
        } else {
            return "-1";
        }
    };

    /**
     * @name GetTestData
     * @param {*} objContext
     * @summary   Return the test data for the main cycle id and Filters the test data with Selected Subject, its sub-subjects and school year id. Returns an array with the test data for the cycle Id.
     */
    GetTestData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;;cIsDeleted;N").Data;
        let arrFilteredTestData = [];
        arrTestData = arrTestData && arrTestData.length > 0 ?
            arrTestData.filter(objTestData => objTestData["iProviderId"] == 2)
            : [];

        if (arrTestData) {
            if (arrTestData.length > 0) {
                let intSchoolYearId = this.GetSchoolYearIdFromClassId(objContext);
                arrTestData.map(objTempData => {
                    if (objTempData["t_TestDrive_Cycle_SchoolYear"]
                        .filter(objTempTestSchoolYearData => objTempTestSchoolYearData["iSchoolYearId"] == intSchoolYearId)
                        .length > 0) {
                        arrFilteredTestData = [...arrFilteredTestData, objTempData];
                    }
                });
                return arrFilteredTestData;
            }
            else {
                return [];
            }
        } else {
            return null;
        }
    }


    /**
     * @name GetCycleData
     * @param {*} objContext 
     * @summary   Returns the cycle data for the given main cycle.
     */
    GetCycleData(objContext) {
        let arrCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + this.strCycleTypeId).Data;
        let objCycleData = arrCycle.find(itm => itm["iCycleTypeId"] == this.strCycleTypeId)
        return objCycleData;
    };


    /**
     * @name GetTestLoginsAndResultData
     * @summary returns the test tokens present for the passed parameters.
     * @param {any} objContext
     * @param {any} uPupilId
     * @param {any} iCycleRepetition
     * @param {any} iSubjectId
     * @param {any} uTestId
     */
    GetTestLoginsAndResultData(objContext, uPupilId = "", iCycleRepetition = "", uTestId = "") {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrTestLoginsAndResultData = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        if (arrTestLoginsAndResultData && arrTestLoginsAndResultData.length > 0) {
            let arrFilteredData = arrTestLoginsAndResultData.map(objTestLoginAndResult => { return { ...objTestLoginAndResult } });
            if (uPupilId !== "") {
                arrFilteredData = arrFilteredData.filter(objTestLoginAndResult => objTestLoginAndResult["uPupilId"] == uPupilId)
            }
            if (iCycleRepetition !== "") {
                arrFilteredData = arrFilteredData.filter(objTestLoginAndResult => objTestLoginAndResult["iCycleRepetition"] == iCycleRepetition)
            }
            //if (iSubjectId !== "") {
            //    arrFilteredData = arrFilteredData.filter(objTestLoginAndResult => objTestLoginAndResult["iSubjectId"] == iSubjectId)
            //}
            if (uTestId !== "") {
                arrFilteredData = arrFilteredData.filter(objTestLoginAndResult => objTestLoginAndResult["uTestId"] == uTestId)
            }
            return arrFilteredData
        } else return [];
    };

    /**
     * @name GetSelectedClassId
     * @description Gets SelectedClassId for ClassDropdown
     * @param {any} arrClassDataForClassDropdown
     * @param {any} arrClassData
     */
    GetSelectedClassId(arrClassDataForClassDropdown, arrClassData) {
        let strSelectedClassId = ApplicationState.GetProperty("SelectedClassId");
        let strClassId = strSelectedClassId;
        if (arrClassData.filter(x => x["uClassId"] == strSelectedClassId).length == 0) {
            strClassId = arrClassDataForClassDropdown[0]["Data"].length > 0
                ? arrClassDataForClassDropdown[0]["Data"][0]["uClassId"]
                : arrClassDataForClassDropdown[1]["Data"].length > 0
                    ? arrClassDataForClassDropdown[1]["Data"][0]["uClassId"]
                    : arrClassDataForClassDropdown[2]["Data"].length > 0
                        ? arrClassDataForClassDropdown[2]["Data"][0]["uClassId"]
                        : "";
            if (strClassId != "") {
                ApplicationState.SetProperty("SelectedClassId", strClassId);
            }
        }
        return strClassId;
    }

    /**
     * @name GetClassDropDownData
     * @summary returns an array of classes to load in the drop down
     * @param {any} objContext
     * @param {any} objTextResource
     */
    GetClassDropDownData(objContext, objTextResource) {
        objTextResource = objTextResource ? objTextResource : {};
        let arrTempClass = objContext.EssayTestLogins_ModuleProcessor.GetClassData(objContext);
        let strTeacherId = objContext.props.ClientUserDetails.UserId;
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrTempClass.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N") };
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
            },
        ];
        return arrFinalClassData;
    };



    /**
     * @name CheckIfTestTokenExist //CheckIfTestExist
     * @param {*} objContext 
     * @param {*} uPupilId 
     * @param {*} iCycleRepetition 
     * @param {*} iSubjectId 
     * @param {*} uTestId 
     * @param {*} arrTestLoginsAndResultData 
     * @summary   Returns true if TestLoginAndResultData is present for the combination of filters.
     */
    CheckIfTestTokenExist(objContext, uPupilId, iCycleRepetition, uTestId) {
        let arrTestLoginsAndResultData = this.GetTestLoginsAndResultData(objContext, uPupilId, iCycleRepetition, uTestId);
        return arrTestLoginsAndResultData[0];
    };


    /**
     * @name CheckIfAllTestFinishedForRepetition
     * @param {*} objContext 
     * @param {*} iCycleRepetition 
     * @param {*} iSubjectId 
     * @summary   Returns true if all the test are finished for the passed repetition.
     */
    CheckIfAllTestFinishedForRepetition(objContext, arrPupil, iCycleRepetition, strTestId) {
        let arrResult = [];
        arrPupil.forEach(objTempPupilData => {
            let blnResult;
            let objExistsToken = this.CheckIfTestTokenExist(objContext, objTempPupilData["uPupilId"], iCycleRepetition, strTestId);
            if (objExistsToken) {
                let blnTestStarted = this.CheckIfTestStarted(objContext, objExistsToken);
                if (blnTestStarted) {
                    let blnTestFinished = this.CheckIfTestFinished(objContext, objExistsToken);
                    if (blnTestFinished) {
                        blnResult = true
                    }
                    else {
                        blnResult = false;
                    }
                }
                else {
                    blnResult = false;
                }
            }
            else {
                blnResult = false
            }
            arrResult = [...arrResult, blnResult];
        });
        if (arrResult.filter(blnTempData => blnTempData === false).length > 0) {
            return false;
        }
        else {
            return true;
        }
    };

    /**
     * @name CheckIfAllTestLoginsCreatedForRepetition
     * @param {*} objContext 
     * @param {*} iCycleRepetition 
     * @param {*} iSubjectId 
     * @summary   Returns true if All test logins are created for the passed repetition.
     */
    CheckIfAllTestLoginsCreatedForRepetition(objContext, arrPupil, iCycleRepetition, strTestId) {
        let arrResult = [];
        arrPupil.forEach(objTempPupilData => {
            let blnResult;

            let objExistsToken = this.CheckIfTestTokenExist(objContext, objTempPupilData["uPupilId"], iCycleRepetition, strTestId);
            if (objExistsToken) {
                blnResult = true;
            }
            else {
                blnResult = false
            }
            arrResult = [...arrResult, blnResult];
        });
        if (arrResult.length === 0 || arrResult.filter(blnTempData => blnTempData === false).length > 0) {
            return false;
        }
        else {
            return true;
        }
    };

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
            OnChangeEventHandler: (objItem) => objContext.TestLogins_ModuleProcessor.OnChangeSubjectDropDown(objContext, objItem)
        };
    }

    /**
    * @name OnChangeSubjectDropDown
    * @param {*} objContext
    * @param {*} objItem
    * @summary   Triggers when the Subject dropdown selection changes
    */
    OnChangeSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubjectId": objItem["iSubjectId"] } });
    };

    /**
     * @name EditData
     * @param {*} objContext 
     * @param {*} objTestLoginAndResultDataToBeEdited 
     * @param {*} objHighStakeTestLoginAndResultDataToBeEdited 
     * @summary   Forms the data to be edited and makes an api call.
     */
    EditData(objContext, objTestLoginAndResultDataToBeEdited) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let objParams = {
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
            },
            "uSchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
            "objTestLoginAndResultDataToBeEdited": objTestLoginAndResultDataToBeEdited,
            "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.uSchoolId,
        };
        Object_TestApplication_TestLoginAndResult.EditData(objParams, (res) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        })
    };


    /**
     * @name OnChangeCheckBox
     * @param {any} objContext
     * @param {any} uPupilId
     * @param {any} IsChecked
     */
    OnChangeCheckBox(objContext, uPupilId, uTestId, IsChecked, blnEnableTest) {
        if (blnEnableTest) {
            if (IsChecked) {
                let arrExistingSelectedPupil = objContext.state.arrSelectedPupilTestData.map(item => item);
                let arrNewSelectedPupil = [...arrExistingSelectedPupil, { uPupilId: uPupilId, uTestId: uTestId }];
                objContext.dispatch({ type: 'SET_STATE', payload: { arrSelectedPupilTestData: arrNewSelectedPupil } })
            } else {
                let arrNewSelectedPupil = objContext.state.arrSelectedPupilTestData.filter(item => item["uPupilId"] != uPupilId && item["uTestId"] == uTestId);
                objContext.dispatch({ type: 'SET_STATE', payload: { arrSelectedPupilTestData: arrNewSelectedPupil } })
            }
        }
    }

    /**
     * @name OnChangeAllCheckBox
     * @param {any} objContext
     * @param {any} arrPupil
     * @param {any} IsChecked
     */
    OnChangeAllCheckBox(objContext, arrPupil, uTestId, IsChecked, blnEnableCheckBox) {
        if (blnEnableCheckBox) {
            if (IsChecked) {
                let arrFilteredPupil = arrPupil;
                if (this.IsKeyCloackUser(objContext.props)) {
                    arrFilteredPupil = arrPupil.filter(x => this.EnableTestForPupil(objContext, x["uPupilId"], uTestId));
                }
                let arrNewSelectedPupil = arrFilteredPupil.map(item => { return { uPupilId: item["uPupilId"], uTestId: uTestId } });
                objContext.dispatch({ type: 'SET_STATE', payload: { arrSelectedPupilTestData: arrNewSelectedPupil } })
            } else {
                objContext.dispatch({ type: 'SET_STATE', payload: { arrSelectedPupilTestData: [] } })
            }
        }
    }

    /**
     * @name IsKeyCloackUser
     * @summary return If the user is a KeyCloak User
     * @param {any} props
     */
    IsKeyCloackUser(props) {
        let blnIsKeyCloackUser = false;
        if (
            props.ClientUserDetails["TeacherDetails"]["cIsExternalMember"] == "Y"
            //&& props.ClientUserDetails["License"]
            //&& (
            //    props.ClientUserDetails["License"]["BasePackage"] == "stellwerk"
            //    || props.ClientUserDetails["License"]["BasePackage"] != "completeproduct"
            //)
        ) {
            blnIsKeyCloackUser = true;
        }
        return blnIsKeyCloackUser;
    }

    /**
     * @name EnableTestForPupil
     * @summary Checks If the Test has to be enabled for the given Pupil for given testId
     * @param {any} objContext
     * @param {any} strPupilId
     * @param {any} strTestId
     */
    EnableTestForPupil(objContext, strPupilId, strTestId) {
        let blnEnableTest = true;
        if (this.IsKeyCloackUser(objContext.props)) {
            blnEnableTest = false;
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let arrPupilLicense = DataRef(objContext.props.Object_Extranet_Pupil_PupilLicense, "Object_Extranet_Pupil_PupilLicense;uClassId;" + strClassId).Data;
            let arrTempPupilLicense = arrPupilLicense.filter(y => y["uPupilId"] == strPupilId)
            if (arrTempPupilLicense.length > 0) {
                let objLicenseJSON = JSON.parse(arrTempPupilLicense[0]["vLicenseJSON"]);
                if (objLicenseJSON && objLicenseJSON["TestsLicensed"] && objLicenseJSON["TestsLicensed"].length > 0) {
                    blnEnableTest = objLicenseJSON["TestsLicensed"]
                        .filter(x => x.toLowerCase() == strTestId.toLowerCase()).length > 0;
                }
            }
        }
        return blnEnableTest;
    }

    EnableSelectAllCheckBox(objContext, arrPupil, strTestId) {
        let blnEnableAllCheckBox = true;
        if (this.IsKeyCloackUser(objContext.props)) {
            blnEnableAllCheckBox = arrPupil
                .filter(x => this.EnableTestForPupil(objContext, x["uPupilId"], strTestId))
                .length > 0;
        }
        return blnEnableAllCheckBox;
    }

    OnClickPdfGenerationButton(objContext, objTextResource) {
        if (objContext.state.arrSelectedPupilTestData.length > 0) {
            Popup.ShowProgressBarPopup({
                "Data": {},
                "Meta": {
                    "Height": "auto",
                    "HasCloseButton": "Y",
                    "HasCancelButton": "Y",
                    "StartProgressOnLoad": true,
                    "CloseProgessBarOnComplete": "Y",
                    "ShowProgressStatus": "N"
                },
                "Resource": {
                    "Text": objTextResource,
                    "TextResourcesKey": "EssayTestProgressBarPopup",
                    "SkinPath": objContext.props.JConfiguration.ExtranetSkinPath
                },
                "Events": {
                    StartProgress: strProgressBarID => { this.GeneratePdf(objContext, strProgressBarID); },
                    OnProgressComplete: (objProgressDetails) => {

                    }
                },
                "CallBacks": {}
            });
        }
        else {
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
                    TextResourcesKey: "EssayTestErrorPopup"
                },
                Events: {},
                CallBacks: {}
            });
        }
    }


    GeneratePdf(objContext, strProgressBarID) {
        if (objContext.state.arrSelectedPupilTestData.length > 0) {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
            let arrCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + this.strCycleTypeId).Data;
            let objCycle = arrCycle[0];
            let strCycleId = objCycle["uCycleId"];

            let arrDataToGeneratePdf = objContext.state.arrSelectedPupilTestData.map(item => {
                return {
                    "uPupilId": item["uPupilId"],
                    "uTestId": item["uTestId"],
                    "uCycleId": strCycleId,
                    "uClassId": strClassId,
                    "iCycleRepetition": "1",
                    "iStateId": iStateId,
                    "strOperationType": "ACTIVATE"
                }
            })
            let objTestLoginAndResultDataToBeEdited = { "DataToActivate": arrDataToGeneratePdf };
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
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
                },
                "uSchoolYearPeriodId": objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId,
                "objTestLoginAndResultDataToBeEdited": objTestLoginAndResultDataToBeEdited,
                "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.uSchoolId,
                "uTeacherId": objContext.props.ClientUserDetails.TeacherDetails.uTeacherId,
                "ProgressBarId": strProgressBarID,
                "iStateId": iStateId,
                "uCycleId": strCycleId,
                "uClassId": strClassId
            };
            Extranet_Teacher_EssayTestLogins_Module.GenerateToken(objParams, (objRes) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let arrExecutionData = DataRef(objRes, "Extranet_Teacher_EssayTestLogins_Module")["Data"];
                let strEntity = "Object_Cockpit_OfflineProcess_OfflineProcessExecution";
                let strFilters = "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + arrExecutionData[0].uOfflineProcessDefinitionId;
                let storeParams = {
                    Data: arrExecutionData,
                    TimeStamp: "",
                    PrimaryKeyName: "uOfflineProcessExecutionId",
                    Count: arrExecutionData.length
                };
                Object_Cockpit_OfflineProcessExecution.AddOfflineProcessExecutionCache(strEntity, strFilters, storeParams, (objResponse) => {
                    //objContext.dispatch({ type: "SET_STATE", payload: { "blnShowAllPdf": true } });
                    //ApplicationState.SetProperty("blnShowAnimation", false);
                });
                objContext.dispatch({ type: "SET_STATE", payload: { "blnShowAllPdf": true } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            })
        } else {


        }
    }

    /**
     * @name GetSchoolYearIdFromClassId
     * @summary returns the schoolYearId from selected class.
     * @param {any} objContext
     */
    GetSchoolYearIdFromClassId(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrClassData = objContext.EssayTestLogins_ModuleProcessor.GetClassData(objContext);
        let objSelectedClassDetails = arrClassData.filter(objTempData => objTempData["uClassId"] === strClassId)[0];
        if (objSelectedClassDetails != undefined) {
            let arrSchoolYearData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data;
            let objSchoolYearDetails = arrSchoolYearData.filter(objTempData => objTempData["iSchoolYear"] === objSelectedClassDetails["iSchoolYear"])[0];
            return objSchoolYearDetails["iSchoolYearId"];
        }
        return "";
    }

    /**
    * @name GetOfflineProcessExecutionDataParams
    * @param {String} strOfflineProcessDefinitionId Passes OfflineProcessDefinitionId
    * @summary Returns Get data params for Offline Process Execution.
    * @returns {Array} OfflineProcessExecutionDataParams
    */
    GetOfflineProcessExecutionDataParams(strOfflineProcessDefinitionId) {
        return {
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
                        "order": "asc"
                    }
                }
            ]
        };
    }

    ToggleAllPdf(objContext, value) {
        objContext.dispatch({ type: 'SET_STATE', payload: { blnShowAllPdf: value } })
    }

    /**
    * @name DeleteGeneratedOfflineProcessExecution
    * @param {object} objContext Passes Context object
    * @param {String} strOfflinePropcessExecutionId Passes OfflinePropcessExecution Id
    * @summary Deletes the Excel file in the popup.
    */
    DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId) {
        let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;GenerateEssayTestLogins");
        let strOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
        let objOfflineProcessExecutionParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
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
                        "order": "asc"
                    }
                }
            ]
        };

        let objParam = {
            ...objOfflineProcessExecutionParams,
            ["vDeleteData"]: [{ "uOfflineProcessExecutionId": strOfflinePropcessExecutionId }]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Cockpit_OfflineProcessExecution.DeleteData(objParam, (objReturnData) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name GetPupilData
     * @param {any} objContext
     * @param {string} strClassId
     * @summary Gets active Pupil Data for the class
     */
    GetPupilData(objContext, strClassId) {
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        let arrFilteredPupilData = [];
        if (arrPupilData != undefined && arrPupilData.length > 0) {
            arrFilteredPupilData = arrPupilData.filter(x => x["t_TestDrive_Member_Class_Pupil"].filter(y => y["uClassId"] == strClassId && y["cIsDeleted"] == "N").length > 0);
        }
        return arrFilteredPupilData;
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

export default EssayTestLogins_ModuleProcessor;