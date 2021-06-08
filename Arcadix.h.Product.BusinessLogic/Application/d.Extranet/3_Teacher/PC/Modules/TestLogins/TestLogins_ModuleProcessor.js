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
import Extranet_Teacher_TestLogins_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins_Module';
import Object_Extranet_Pupil_PupilLicense from '@shared/Object/d.Extranet/4_Pupil/PupilLicense/PupilLicense';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name TestLogins_ModuleProcessor
 * @summary module processor for Test logins.
 * */
class TestLogins_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name TestLogins_ModuleProcessor_constructor
     * @summary used for define CycleTypeId and strCycleTypeIdToInValidateTokens based on IsOrientierungstest read from query string.
     * */
    constructor() {
        super();
        this.blnIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest") === 'Y';
        this.strCycleTypeId = this.blnIsOrientationTest ? '1' : '6';
        this.strCycleTypeIdToInValidateTokens = this.blnIsOrientationTest ? '6' : '1';
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TestLogins", "Extranet_Teacher_TestLogins_Module_GetServerDate",
            "Object_Extranet_Pupil_Pupil", "Object_Extranet_Teacher_SchoolYear", "Object_Extranet_Teacher_Class", "Object_Intranet_Taxonomy_Subject", "Object_TestApplication_TestLoginAndResult",
            "Object_Extranet_Pupil_PupilSubjectClassType", "Object_Intranet_Cycle_Cycle", "Object_Intranet_Test_IntranetTest", "Object_Cockpit_MainClient_ClientSettings", "Object_Extranet_Pupil_PupilLicense",
            { "StoreKey": "ApplicationState", "DataKey": "SelectedClassId" }, "Object_Extranet_Teacher_SchoolYearPeriod",
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
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        if (this.blnIsOrientationTest) {
            return [
                props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestLogins/TestLogins.css",
                props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestLogins/TestLoginsPopups/AllPdfTest/AllPdfTest.css",
                props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/WeekDisplay/WeekDisplay.css",
                JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css"
            ];
        } else {
            return [
                props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/HighStakeTestLogins/HighStakeTestLogins.css",
                props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestLogins/TestLoginsPopups/AllPdfTest/AllPdfTest.css",
                JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css"
            ];
        }
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
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/TestLogins"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        Extranet_Teacher_TestLogins_Module.GetServerDate({})
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TestLogins_Module];


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
                            "bool": {
                                "should": [
                                    {
                                        "match": {
                                            "cIsTestedAtThisTime": "Y"
                                        }
                                    },
                                    {
                                        "match": {
                                            "cIsHighStakeSubject": "Y"
                                        }
                                    }
                                ]
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

        let objPupilSubjectClassTypeParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            }
        };

        //pupil subject classtype.        
        Object_Extranet_Pupil_PupilSubjectClassType.Initialize(objPupilSubjectClassTypeParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_PupilSubjectClassType];

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
                            "bool": {
                                "should": [
                                    {
                                        "match": {
                                            "iCycleTypeId": this.strCycleTypeId
                                        }
                                    },
                                    {
                                        "match": {
                                            "iCycleTypeId": this.strCycleTypeIdToInValidateTokens
                                        }
                                    }
                                ]
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

        //Validate intranet test params.
        let objValidationIntranetTestParams = {
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
                                "iCycleTypeId": this.strCycleTypeIdToInValidateTokens
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
        Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams, objValidationIntranetTestParams])
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


        //validate test logins and results
        let objValidationTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": this.strCycleTypeIdToInValidateTokens
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
        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams, objValidationTestLoginAndResultParams])
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        let objClientSettingsParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vParentKey": "ExtranetTeacher"
                        }
                    },
                    {
                        "match": {
                            "vSubParentKey": "TestLoginPaperless"
                        }
                    },
                    {
                        "match": {
                            "vKey": "InvalidateTokenTime"
                        }
                    }
                ]
            }
        };
        Object_Cockpit_MainClient_ClientSettings.Initialize(objClientSettingsParams)
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];

        if (this.CheckUserHasLicesne(props)) {
            //Pupil license
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
        }
        return arrDataRequest;
    }


    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "LegendsControls", "TestLoginsHeader", "TopSpace"],
            FooterIds: ["FooterTestLogins"]
        };
    }

    /**
     * @name OnChangeWeekDisplay
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeWeekDisplay(objContext, objItem) {
        console.log("week dispaly event", objItem);
        if (objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId == "") {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
            let arrMainTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
            let arrInvalidateTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeIdToInValidateTokens + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
            let strMainTestLoginAndResulEnityKey = "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId;
            let strInvalidateTestLoginAndResultEnityKey = "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeIdToInValidateTokens + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId;
            let strManiTimeStamp = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["TimeStamp"];
            let strInvalidateTimeStamp = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeIdToInValidateTokens + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["TimeStamp"];

            let objMainTestLoginAndResultData = {
                Filter: strMainTestLoginAndResulEnityKey,
                Value: {
                    Data: arrMainTestLoginAndResult,
                    TimeStamp: strManiTimeStamp,
                    PrimaryKeyName: "uTestTokenId",
                    Count: arrMainTestLoginAndResult.length
                }
            };

            let objInvalidateTestLoginAndResultData = {
                Filter: strInvalidateTestLoginAndResultEnityKey,
                Value: {
                    Data: arrInvalidateTestLoginAndResult,
                    TimeStamp: strInvalidateTimeStamp,
                    PrimaryKeyName: "uTestTokenId",
                    Count: arrInvalidateTestLoginAndResult.length
                }
            };
            if (DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, strMainTestLoginAndResulEnityKey)) {
                ArcadixCacheData.EditData("Object_TestApplication_TestLoginAndResult", objMainTestLoginAndResultData, () => {

                });
            } else {
                ArcadixCacheData.AddData("Object_TestApplication_TestLoginAndResult", objMainTestLoginAndResultData, () => {

                });
            }

            if (DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, strInvalidateTestLoginAndResultEnityKey)) {
                ArcadixCacheData.EditData("Object_TestApplication_TestLoginAndResult", objInvalidateTestLoginAndResultData, () => {

                });
            } else {
                ArcadixCacheData.AddData("Object_TestApplication_TestLoginAndResult", objInvalidateTestLoginAndResultData, () => {

                });
            }
            //ArcadixCacheData.EditData("Object_TestApplication_TestLoginAndResult", objMainTestLoginAndResultData, () => {

            //});
            //ArcadixCacheData.EditData("Object_TestApplication_TestLoginAndResult", objInvalidateTestLoginAndResultData, () => {

            //});
        }
        let strSchoolYearId = "";
        if (objContext.state.iSchoolYerPeriodCounter > 0) {
            let arrClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data
            let objClass = objContext.state.objSelectedClass ? objContext.state.objSelectedClass : arrClass.find(cls => cls["uClassId"] == ApplicationState.GetProperty("SelectedClassId"));
            let arrSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N")["Data"];
            let iSchoolYear = objClass["iSchoolYear"] - (objItem["iDisplayOrder"] - 1);
            let objSchoolYearObject = arrSchoolYear.find(objSchlYr => objSchlYr["iSchoolYear"] == iSchoolYear);
            if (objSchoolYearObject)
                strSchoolYearId = objSchoolYearObject["iSchoolYearId"]
            else {
                strSchoolYearId = arrSchoolYear.find(objSchlYr => objSchlYr["iSchoolYear"] == objClass["iSchoolYear"]).iSchoolYearId;
            }
        }
        let arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "")["Data"];
        let objSchoolYearPeriodData = arrSchoolYearPeriodData.find(x => x["uSchoolYearPeriodId"] == objItem["uSchoolYearPeriodId"])
        let blnCurrentSchoolYearPeriod = false;
        if (new Date() > new Date(objSchoolYearPeriodData["dtFromDate"]) && new Date() < new Date(objSchoolYearPeriodData["dtToDate"])) {
            blnCurrentSchoolYearPeriod = true;
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedSchoolYearPeriod": objItem, iSchoolYerPeriodCounter: ++objContext.state.iSchoolYerPeriodCounter, strSchoolYearId: strSchoolYearId, blnCurrentSchoolYearPeriod: blnCurrentSchoolYearPeriod } });
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
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedClass": objItem } });
    };

    /**
     * @name GetDataAfterClassChange
     * @param {*} objContext
     * @summary Returns the pupil params for selected class
     */
    GetDataAfterClassOrSchoolYearPeriodChange(objContext, blnSchoolYearPeriodDropdownChange = false, blnTake = false) {
        if (objContext.state.objSelectedClass != undefined && objContext.state.objSelectedClass != null && objContext.state.objSelectedClass.uClassId != undefined) {

            //let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass.uClassId : ApplicationState.GetProperty("SelectedClassId");
            let strClassId = objContext.state.objSelectedClass.uClassId;// ApplicationState.GetProperty("SelectedClassId");
            let strSchoolYearId = blnTake ? this.GetSchoolYearIdFromClassId(objContext) : this.GetSchoolYearIdFromSelectedClass(objContext); // if selected class undefined then schoolYearId also should return undefined.
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

                let objPupilSubjectClassTypeParams = {
                    "ForeignKeyFilter": {
                        "uClassId": strClassId
                    }
                };
                Object_Extranet_Pupil_PupilSubjectClassType.Initialize(objPupilSubjectClassTypeParams);
                arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_PupilSubjectClassType];

                if (this.CheckUserHasLicesne(objContext.props)) {
                    //Pupil license
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
                }

            }
            //PupilSubjectClassType


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
                                    "iSchoolYearId": strSchoolYearId
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
            let objValidationIntranetTestParams = {
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
                                    "iCycleTypeId": this.strCycleTypeIdToInValidateTokens
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
                                    "iSchoolYearId": strSchoolYearId
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
            Object_Intranet_Test_IntranetTest.Initialize([objMainIntranetTestParams, objValidationIntranetTestParams])
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
            let objValidationTestLoginAndResultParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeIdToInValidateTokens
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
            Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams, objValidationTestLoginAndResultParams])
            arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];
            ApplicationState.SetProperty("blnShowAnimation", true);
            (new ObjectQueue()).QueueAndExecute(arrDataRequest, (objResponse) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
    };

    /**
     * @name GetDefaultSubjects
     * @param {*} objContext
     * @summary   Extracts and Returns the default subjects for the component.
     */
    GetDefaultSubjects(objContext) {
        let arrTempSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N")) {
            arrTempSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N").Data;
        }
        if (this.blnIsOrientationTest) {
            arrTempSubjects = arrTempSubjects.filter(objSub => objSub["cIsTestedAtThisTime"] == "Y");
        }
        else {
            arrTempSubjects = arrTempSubjects.filter(objSub => objSub["cIsHighStakeSubject"] == "Y");
        }
        let arrSubjects = arrTempSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
        //let arrSortedSubjects = arrSubjects.sort((objTempDataCurrent, objTempDataNext) => { return objTempDataCurrent["iSubjectId"] - objTempDataNext["iSubjectId"] });
        return arrSubjects;
    };

    /**
     * @name GetSubSubject
     * @param {*} objContext
     * @summary   Returns the sub subject of the selected subjects
     */
    GetSubSubject(objContext, intParentSubjectId = -1) {
        let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N").Data;
        if (this.blnIsOrientationTest) {
            arrSubjects = arrSubjects.filter(objSub => objSub["cIsTestedAtThisTime"] == "Y");
        }
        else {
            arrSubjects = arrSubjects.filter(objSub => objSub["cIsHighStakeSubject"] == "Y");
        }
        if (intParentSubjectId === -1) {
            intParentSubjectId = objContext.state.intSelectedSubjectId;
        }
        let arrSubSubjects = arrSubjects.filter(objTempData => objTempData["iParentSubjectId"] === intParentSubjectId);
        //let arrSortedSubjects = arrSubSubjects.sort((objTempDataCurrent, objTempDataNext) => { return objTempDataCurrent["iSubjectId"] - objTempDataNext["iSubjectId"] });
        return arrSubSubjects;
    };

    /**
     * @name GetSubjects
     * @param {*} objContext 
     * @summary   Returns mergerd an array of selected subject and its sub-subject
     */
    GetSubjects(objContext, intSubjectId = -1) {
        if (intSubjectId === -1) {
            intSubjectId = objContext.state.intSelectedSubjectId;
        }
        let arrTempDefaultSubjects = this.GetDefaultSubjects(objContext);
        let arrDefaultSubjects = arrTempDefaultSubjects.filter(objTempData => objTempData["iSubjectId"] === intSubjectId);
        let arrTempSubSubjects = this.GetSubSubject(objContext, intSubjectId);
        let arrSubSubjects = arrTempSubSubjects.filter(objTempData => objTempData["iParentSubjectId"] === intSubjectId);
        let arrSubjects = [...arrDefaultSubjects, ...arrSubSubjects];
        return arrSubjects;
    };

    /**
     * @name GetAllSubjects
     * @param {*} objContext 
     * @summary   Returns mergerd an array of selected subject and its sub-subject
     */
    GetAllSubjects(objContext, intSubjectId = -1) {
        let arrDefaultSubjects = this.GetDefaultSubjects(objContext);
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N").Data;
        let arrSubjects = [];
        let arrSubSubjects = [];
        if (this.blnIsOrientationTest) {
            arrAllSubjects = arrAllSubjects.filter(objSub => objSub["cIsTestedAtThisTime"] == "Y");
        }
        else {
            arrAllSubjects = arrAllSubjects.filter(objSub => objSub["cIsHighStakeSubject"] == "Y");
        }
        if (intSubjectId === -1) {
            arrDefaultSubjects.forEach(objTempData => {
                let arrTempSubSubjectsData = arrAllSubjects.filter(objTempDetails => objTempDetails["iParentSubjectId"] === objTempData["iSubjectId"]);
                arrSubSubjects = [...arrSubSubjects, ...arrTempSubSubjectsData];
            });
            arrSubjects = [...arrDefaultSubjects, ...arrSubSubjects];
        }
        else {
            arrSubjects = arrAllSubjects.filter(objTempDetails => objTempDetails["iSubjectId"] === intSubjectId);
        }
        return arrSubjects;
    };

    /**
     * @name GetSchoolYearIdFromSelectedClass
     * @param {*} objContext 
     * @summary   Returns School Year Id of selected class.
     */
    GetSchoolYearIdFromSelectedClass(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrClassData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data;
        }

        let objSelectedClassDetails = {};
        if (arrClassData.length > 0) {
            objSelectedClassDetails = arrClassData.filter(objTempData => objTempData["uClassId"] === strClassId)[0];
        }
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
    GetTestData(objContext, intSubjectId = -1) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strSchoolYearId = this.GetSchoolYearIdFromSelectedClass(objContext);
        let arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + strSchoolYearId + ";cIsDeleted;N").Data;
        arrTestData = arrTestData && arrTestData.length > 0 ?
            arrTestData.filter(objTestData => objTestData["iProviderId"] != 2)
            : [];
        let arrFilteredTestData = [];
        if (arrTestData) {
            if (arrTestData.length > 0) {
                let intSchoolYearId = this.GetSchoolYearIdFromClassId(objContext);
                if (!this.blnIsOrientationTest) {

                    arrTestData.map(objTempData => {
                        if (objTempData["t_TestDrive_Cycle_SchoolYear"]
                            .filter(objTempTestSchoolYearData => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0) {
                            arrFilteredTestData = [...arrFilteredTestData, objTempData];
                        }
                    });
                    return arrFilteredTestData;
                }
                else {
                    let arrSubjects = [];
                    if (intSubjectId === -1) {
                        intSubjectId = objContext.state.intSelectedSubjectId === -1 ? this.GetDefaultSubjects(objContext)[0].iSubjectId : objContext.state.intSelectedSubjectId;
                    }
                    arrSubjects = this.GetSubjects(objContext, intSubjectId);
                    if (arrSubjects.length === 0) {
                        arrSubjects = this.GetAllSubjects(objContext, intSubjectId);
                    }
                    let arrFilteredTestDataBySubject = [];
                    arrSubjects.forEach(objTempSubjectData => {
                        let arrTempFilteredTestDatBySubject = arrTestData.filter(objTempTestData => objTempTestData["iSubjectId"] === objTempSubjectData["iSubjectId"]);
                        if (arrTempFilteredTestDatBySubject.length > 0) {
                            arrFilteredTestDataBySubject = [...arrFilteredTestDataBySubject, ...arrTempFilteredTestDatBySubject];
                        }
                    });
                    //  let arrFilteredTestData = [];
                    arrFilteredTestData = arrFilteredTestDataBySubject.filter(objTempData => objTempData["t_TestDrive_Cycle_SchoolYear"].filter(objTempTestSchoolYearData => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0);
                    return arrFilteredTestData;
                }
            }
            else {
                return [];
            }
        } else {
            return null;
        }
    }

    /**
     * @name GetTokenValidationTestData
     * @param {*} objContext 
     * @param {*} strTestId 
     * @summary   Returns the test data for the 'CycleIdToValidateTokens' that is given in the query string.
     */
    GetTokenValidationTestData(objContext, objTest) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strSchoolYearId = this.GetSchoolYearIdFromSelectedClass(objContext); //if class is not selected returns empty.use for read the data.
        let strSchoolYearFromClassId = this.GetSchoolYearIdFromClassId(objContext); //if class is not selected read it from application state and returns the always the value.
        let arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeIdToInValidateTokens + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + strSchoolYearId + ";cIsDeleted;N").Data;
        if (arrTestData.length > 0) {
            let arrFilteredTestData = [];
            arrTestData.map(objTempData => {
                if (objTempData["t_TestDrive_Cycle_SchoolYear"].filter(objTempTestSchoolYearData => objTempTestSchoolYearData["iSchoolYearId"] === strSchoolYearFromClassId).length > 0 && (objTempData["uTestId"] == objTest["uTestId"] || objTempData["uTestId"] == objTest["uParentTestId"])) {
                    arrFilteredTestData = [...arrFilteredTestData, objTempData];
                }
            });
            return arrFilteredTestData;
        }
        else {
            return arrTestData;
        }
    };

    /**
     * @name GetCycleData
     * @param {*} objContext 
     * @summary   Returns the cycle data for the given main cycle.
     */
    GetCycleData(objContext) {
        let arrCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N").Data;
        let objCycleData = arrCycle.find(itm => itm["iCycleTypeId"] == this.strCycleTypeId)
        return objCycleData;
    };

    /**
     * @name GetTimeToInvalidate
     * @param {*} objContext 
     * @summary   Gets the time to invalidate from client settings and returns it.
     */
    GetTimeToInvalidate(objContext) {
        let objClientSettings = undefined;
        if (DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime")) {
            objClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime")["Data"][0];
        }

        let intTimeToInvalidate = objClientSettings ? parseInt(objClientSettings["vValue"]) : 0;
        return intTimeToInvalidate;
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
    GetTestLoginsAndResultData(objContext, uPupilId = "", iCycleRepetition = "", objTestParam = {}) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
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
            if (objTestParam["uTestId"] != undefined || objTestParam["uParentTestId"] != undefined) {
                arrFilteredData = arrFilteredData.filter(objTestLoginAndResult => (objTestLoginAndResult["uTestId"] == objTestParam["uTestId"] || objTestLoginAndResult["uParentTestId"] == objTestParam["uTestId"]))
            }
            return arrFilteredData
        } else return [];
    };

    /**
     * @name GetInValidateTestLoginsAndResultData
     * @summary  Returns the test logins and result data for the 'CycleIdToValidateTokens'.
     * @param {any} objContext
     * @param {any} uPupilId
     * @param {any} iCycleRepetition
     * @param {any} iSubjectId
     * @param {any} uTestId
     */
    GetInValidateTestLoginsAndResultData(objContext, uPupilId = "", iCycleRepetition = "") {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrValidationTestLoginsAndResultData = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + this.strCycleTypeIdToInValidateTokens + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        if (uPupilId !== "") {
            arrValidationTestLoginsAndResultData = arrValidationTestLoginsAndResultData.filter(objTempData => objTempData["uPupilId"] === uPupilId);
        }
        if (iCycleRepetition && iCycleRepetition !== "") {
            arrValidationTestLoginsAndResultData = arrValidationTestLoginsAndResultData.filter(objTempData => objTempData["iCycleRepetition"] === iCycleRepetition);
        }

        return arrValidationTestLoginsAndResultData;
    };

    /**
     * @name GetClassDropDownData
     * @summary returns an array of classes to load in the drop down
     * @param {any} objContext
     * @param {any} objTextResource
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
     * @name CompareDate
     * @param {*} objContext 
     * @param {*} strValidTillDate 
     * @summary   Compares the the date with time to invalidate.
     */
    CompareDate(objContext, strValidTillDate) {
        let blnReturn = false;
        var dtValidTill = new Date(strValidTillDate);
        let dtServerTime = DataRef(objContext.props.Extranet_Teacher_TestLogins_Module_GetServerDate, "").Data[0].Data;
        var dtCurrentDate = new Date(dtServerTime)
        if (dtValidTill < dtCurrentDate) {
            blnReturn = false;
        }
        else {
            blnReturn = true;
        }
        return blnReturn;
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
    CheckIfTestTokenExist(objContext, uPupilId, iCycleRepetition, objTest) {
        let arrTestLoginsAndResultData = this.GetTestLoginsAndResultData(objContext, uPupilId, iCycleRepetition, objTest);
        return arrTestLoginsAndResultData[0];
    };

    /**
     * @name CheckIfTestIsValid
     * @summary Returns true if test is valid(is still active).
     * @param {any} objContext
     * @param {any} objTestLoginsAndResultData
     */
    CheckIfTestIsValid(objContext, objTestLoginsAndResultData) {
        let blnResult = this.CompareDate(objContext, objTestLoginsAndResultData["dtValidTill"]);
        return blnResult;
    };

    /**
     * @name CheckIfTestStarted
     * @summary Returns true if the test is started i.e TestLoginAndResultData has an object for the applied filters and has 'TestExecution' array of length greater than 0.
     * @param {any} objContext
     * @param {any} objTestLoginsAndResultData
     */
    CheckIfTestStarted(objContext, objTestLoginsAndResultData) {
        let blnResult = objTestLoginsAndResultData["TestExecution"].length > 0 ? true : false;
        return blnResult;
    };

    /**
     * @name CheckIfTestFinished
     * @summary Returns true if the test is finished i.e TestLoginAndResultData has an object for the applied filters and has 'TestExecution' array which contains iTestStatusId === 5.
     * @param {any} objContext
     * @param {any} objTestLoginsAndResultData
     */
    CheckIfTestFinished(objContext, objTestLoginsAndResultData) {
        let blnResult = objTestLoginsAndResultData["TestExecution"][0]["iTestStatusId"] === 5 ? true : false;
        return blnResult;
    };

    /**
     * @name CheckIfAllTestFinishedForRepetition
     * @param {*} objContext 
     * @param {*} iCycleRepetition 
     * @param {*} iSubjectId 
     * @summary   Returns true if all the test are finished for the passed repetition.
     */
    CheckIfAllTestFinishedForRepetition(objContext, arrPupil, iCycleRepetition, objTest) {
        let arrResult = [];
        arrPupil.forEach(objTempPupilData => {
            let blnResult;
            let objExistsToken = this.CheckIfTestTokenExist(objContext, objTempPupilData["uPupilId"], iCycleRepetition, objTest);
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
    CheckIfAllTestLoginsCreatedForRepetition(objContext, arrPupil, iCycleRepetition, objTest) {
        let arrResult = [];
        arrPupil.forEach(objTempPupilData => {
            let blnResult;

            let objExistsToken = this.CheckIfTestTokenExist(objContext, objTempPupilData["uPupilId"], iCycleRepetition, objTest);
            if (objExistsToken) {
                let blnTestValid = this.CheckIfTestIsValid(objContext, objExistsToken);
                let blnTestStarted = this.CheckIfTestStarted(objContext, objExistsToken);
                if (blnTestStarted) {
                    let blnTestFinished = this.CheckIfTestFinished(objContext, objExistsToken);
                    if (blnTestFinished) {
                        blnResult = true
                    }
                    else {
                        if (blnTestValid) {
                            blnResult = true;
                        }
                        else {
                            blnResult = false;
                        }
                    }
                }
                else {
                    if (blnTestValid) {
                        blnResult = true;
                    }
                    else {
                        blnResult = false;
                    }
                }
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
     * @name CheckIfActiveTestAlreadyPresentForPupil
     * @param {*} objContext 
     * @param {*} uPupilId 
     * @param {*} iSubjectId 
     * @param {*} iCycleRepetition 
     * @summary   Returns a json with details of test if any active test is present for the given combination of filters.
     */
    CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId) {
        let arrMainTestLoginsAndResultData = this.GetTestLoginsAndResultData(objContext, uPupilId);
        let arrMainActiveTestLoginsAndResultData = [];
        arrMainTestLoginsAndResultData.forEach(objTempData => {
            if (objTempData["TestExecution"].length > 0 && objTempData["TestExecution"][0]["iTestStatusId"] !== 5) {
                if (this.CompareDate(objContext, objTempData["dtValidTill"]) === true) {
                    arrMainActiveTestLoginsAndResultData = [...arrMainActiveTestLoginsAndResultData, objTempData];
                }
            }
            else if (this.CompareDate(objContext, objTempData["dtValidTill"]) === true) {
                arrMainActiveTestLoginsAndResultData = [...arrMainActiveTestLoginsAndResultData, objTempData];
            }
        });
        if (arrMainActiveTestLoginsAndResultData.length > 0) {
            return {
                "blnIsActiveTestAlreadyPresentForPupil": true,
                "objActiveTestLoginsAndResultDetails": arrMainActiveTestLoginsAndResultData[0],
                "TestType": this.blnIsOrientationTest ? "Orientation" : "HighStake"
            };
        }
        else {
            let arrValidationTestLoginsAndResultData = this.GetInValidateTestLoginsAndResultData(objContext, uPupilId);
            let arrValidationTestActiveTestLoginsAndResultData = arrValidationTestLoginsAndResultData.filter(objTempData => this.CompareDate(objContext, objTempData["dtValidTill"]) === true);
            if (arrValidationTestActiveTestLoginsAndResultData.length > 0) {
                return {
                    "blnIsActiveTestAlreadyPresentForPupil": true,
                    "objActiveTestLoginsAndResultDetails": arrValidationTestActiveTestLoginsAndResultData[0],
                    "TestType": this.blnIsOrientationTest ? "HighStake" : "Orientation"
                };
            }
        }
        return {
            "blnIsActiveTestAlreadyPresentForPupil": false,
            "objActiveTestLoginsAndResultDetails": null
        };
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
        //let strUserPreferenceSubjectId = this.GetUserpreferenceSubjectId();
        //strSubjectId = strUserPreferenceSubjectId ? strUserPreferenceSubjectId : strSubjectId;
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
        this.SaveUserPreferenceSubjectId(objContext, objItem["iSubjectId"]);
    };

    /**
     * @name EditData
     * @param {*} objContext 
     * @param {*} objOrientationTestLoginAndResultDataToBeEdited 
     * @param {*} objHighStakeTestLoginAndResultDataToBeEdited 
     * @summary   Forms the data to be edited and makes an api call.
     */
    EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited = {}, objHighStakeTestLoginAndResultDataToBeEdited = {}) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        Logger.Log("Edit Data Object", { "OrientationTest": objOrientationTestLoginAndResultDataToBeEdited, "HighStakeTest": objHighStakeTestLoginAndResultDataToBeEdited })
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strOrientationCycleTypeId = "1";
        let strHighStakeCycleTypeId = "6";
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        if (objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"].length > 0 || objOrientationTestLoginAndResultDataToBeEdited["DataToDeActivate"].length > 0) {
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iCycleTypeId": strOrientationCycleTypeId
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
                "objTestLoginAndResultDataToBeEdited": objOrientationTestLoginAndResultDataToBeEdited,
                "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.uSchoolId,
            };
            Object_TestApplication_TestLoginAndResult.EditData(objParams, (res) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            })
        }
        if (objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"].length > 0 || objHighStakeTestLoginAndResultDataToBeEdited["DataToDeActivate"].length > 0) {
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iCycleTypeId": strHighStakeCycleTypeId
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
                "objTestLoginAndResultDataToBeEdited": objHighStakeTestLoginAndResultDataToBeEdited,
                "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.uSchoolId,
            };

            Object_TestApplication_TestLoginAndResult.EditData(objParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            })
        }
    };

    /**
     * @name CheckIfPupilSubjectClassTypeIsPresentForPupil
     * @param {*} objContext 
     * @param {*} uPupilId 
     * @param {*} iSubjectId 
     * @summary   Returns true if PupilSubjectClassType data is present for given pupil id and subject id. Only for Hishshtake Test login.
     */
    CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, uPupilId, iSubjectId) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrPupilSubejctClassType = DataRef(objContext.props.Object_Extranet_Pupil_PupilSubjectClassType, "Object_Extranet_Pupil_PupilSubjectClassType;uClassId;" + strClassId).Data;
        let arrFilteredData = arrPupilSubejctClassType.filter(objTempData => objTempData["uPupilId"] === uPupilId && objTempData["iSubjectId"] === iSubjectId && objTempData["uClassId"] === strClassId);
        return arrFilteredData.length > 0;
    };

    /**
     * @name ShowAssignClassTypePopUp
     * @param {*} objContext 
     * @param {*} arrPupilAndTestId 
     * @param {*} iSubjectId 
     * @param {*} objOrientationTestLoginAndResultDataToBeEdited 
     * @param {*} objHighStakeTestLoginAndResultDataToBeEdited 
     * @param {*} ClosePopupAfterAllProcessHaveBeenDone //close activation pop up. This function is only sent from activatioin pop up. If this pop up is called if in activation pop up proceed is clicked.
     * @summary   Forms the data to be passed to the pop up. Opens AssignClassTyoePopup. Only for Highstake Test Logins.
     */
    ShowAssignClassTypePopUp(objContext, arrPupilAndTestId, iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, strPopupId) {
        let arrPupilAndTestData = [];
        let arrTestData = this.GetTestData(objContext);
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        arrPupilAndTestId.map(objTempData => {
            let objPupilDetails = arrPupil.find(objTempPupilDetails => objTempPupilDetails["uPupilId"] === objTempData["uPupilId"]);
            let objTestDetails = arrTestData.find(objTempTestDetails => objTempTestDetails["uTestId"] === objTempData["uTestId"] || objTempTestDetails["uTestId"] === objTempData["uParentTestId"]);
            arrPupilAndTestData = [...arrPupilAndTestData, { "Pupil": objPupilDetails, "Test": objTestDetails }];
        });

        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestLogins", objContext.props)

        Popup.ShowPopup({
            Data: {
                OnClickSaveButton: (blnReturn) => {
                    if (blnReturn) {
                        ApplicationState.SetProperty("blnShowAnimation", true);
                        this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                    }
                },
                SubjectId: iSubjectId,
                PupilAndTestData: arrPupilAndTestData,
                ClientUserDetails: objContext.props.ClientUserDetails,
                PopupId: strPopupId
            },
            Meta: {
                PopupName: 'TestLoginsAssignClassType',
                ShowHeader: true,
                ShowCloseIcon: false,
                ShowToggleMaximizeIcon: true,
                Height: "98%",
                Width: "98%"
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
        });
    };

    /**
     * @name ShowActivationPopUp
     * @param {*} objContext 
     * @param {*} arrConflictingData 
     * @param {*} objOrientationTestLoginAndResultDataToBeEdited 
     * @param {*} objHighStakeTestLoginAndResultDataToBeEdited 
     * @param {*} iSubjectId 
     * @summary   Forms the data to be sent to be sent to the pop up. Open ActivateAllTest popup. This is shown only when 'CheckIfActiveTestAlreadyPresentForPupil' returns true.
     */
    ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId) {

        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestLogins", objContext.props)
        let strConfirmText = '';
        let strHeaderText = Localization.TextFormatter(objTextResource, 'ActivateIndividualTestPopUpHeading');

        arrConflictingData.map(objTempData => {
            if (objTempData["TestType"] === "Orientation") {
                let strTestType = Localization.TextFormatter(objTextResource, 'OrientationTest')
                strConfirmText = objTempData["PupilName"] + Localization.TextFormatter(objTextResource, 'ActivateIndividualTestPopUpDescription').replace("{!@TestType}", strTestType);
                strConfirmText = strConfirmText.replace("{@ParentSubjectName}", objTempData["ParentSubjectName"]);
                strConfirmText = strConfirmText.replace("{@SubSubjectName}", objTempData["SubSubjectName"]);
            }
            else if (objTempData["TestType"] === "HighStake") {
                let strTestType = Localization.TextFormatter(objTextResource, 'HighStakeTest')
                strConfirmText = objTempData["PupilName"] + Localization.TextFormatter(objTextResource, 'ActivateIndividualTestPopUpDescription').replace("{!@TestType}", strTestType);
                strConfirmText = strConfirmText.replace("{@ParentSubjectName}", objTempData["ParentSubjectName"]);
                strConfirmText = strConfirmText.replace("{@SubSubjectName}", objTempData["SubSubjectName"]);
            }
        });

        let objPopupTextResource = {
            Activate_ConfirmText: strConfirmText,
            Activate_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'ActivateIndividualTestPopUpProceedButton'),
            Activate_CloseButtonText: Localization.TextFormatter(objTextResource, 'ActivateIndividualTestPopUpCancelButton'),
            Activate_Title: strHeaderText
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                Height: "auto",
                ShowHeader: true,
            },
            Resource: {
                Text: objPopupTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Activate"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    Popup.ClosePopup(strPopupUniqueId);
                    setTimeout(function () {
                        objContext.TestLogins_ModuleProcessor.OnClickProceedButton(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId, strPopupUniqueId)
                    }, 300);
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name OnClickProceedButton
     * @summary activates the token when proceed button clicked from popup.
     * @param {any} objOrientationTestLoginAndResultDataToBeEdited
     * @param {any} objHighStakeTestLoginAndResultDataToBeEdited
     */
    OnClickProceedButton(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId, strPopupId = -1) {
        if (!this.blnIsOrientationTest) {
            let arrPupilToAssignClassType = [];
            objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"].map(objTempData => {
                let blnIsClassTypeIsPresentForPupil = this.CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, objTempData["uPupilId"], iSubjectId);
                if (!blnIsClassTypeIsPresentForPupil) {
                    arrPupilToAssignClassType = [...arrPupilToAssignClassType, { "uPupilId": objTempData["uPupilId"], "uTestId": objTempData["uTestId"] }];
                }
            });
            if (arrPupilToAssignClassType.length > 0) {
                this.ShowAssignClassTypePopUp(objContext, arrPupilToAssignClassType, iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, strPopupId);
            }
            else {
                ApplicationState.SetProperty("blnShowAnimation", true);
                this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
        }
        else {
            ApplicationState.SetProperty("blnShowAnimation", true);
            this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
        }
    }

    /**
     * @name OrientationTestExtendedCheckBokChange
     * @summary This method activates or deactivates the orientation test token.
     * @param {any} objContext
     * @param {any} blnIsSelectAll
     * @param {any} objTestDetails
     * @param {any} objPupilDetails
     * @param {any} intCycleRepetition
     * @param {any} blnIsChecked     
     */
    OrientationTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N").Data;
        let objCycle = arrCycle.find(x => x["iCycleTypeId"] == "1");
        let strOrientationCycleId = objCycle["uCycleId"];
        let objHighStakeCycle = arrCycle.find(x => x["iCycleTypeId"] == "6")
        let strHighStakeCycleId = objHighStakeCycle["uCycleId"];
        let objOrientationTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeActivate": [] };
        let objHighStakeTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeActivate": [] };
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        let arrSubjects = [];
        if (!blnIsSelectAll) { // click for single pupil.
            let uPupilId = objPupilDetails["uPupilId"];
            if (!blnIsChecked) { // If the checkbox value is false this code will execute directly dectivates the token for respective pupil.
                objOrientationTestLoginAndResultDataToBeEdited = {
                    ...objOrientationTestLoginAndResultDataToBeEdited,
                    ["DataToDeActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                    {
                        "uPupilId": uPupilId,
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strOrientationCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "DEACTIVATE"
                    }
                    ]
                };
                this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
            else { // if check box value true then 1) checks any active token present for pupil or not. 2) If active token presents asks confirmation to overrite. 3) If no active token present then activates the token.
                let objResult = this.CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId);
                if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
                    objOrientationTestLoginAndResultDataToBeEdited = {
                        ...objOrientationTestLoginAndResultDataToBeEdited,
                        ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                        {
                            "uPupilId": uPupilId,
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strOrientationCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "ACTIVATE"
                        }
                        ]
                    };
                    let objDataToDeActivate = {
                        "uPupilId": uPupilId,
                        "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                        "uCycleId": objResult["TestType"] === "Orientation" ? strOrientationCycleId : strHighStakeCycleId,
                        "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                        "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                        "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                        "strOperationType": "DEACTIVATE"
                    };
                    if (objResult["TestType"] == "Orientation") {
                        objOrientationTestLoginAndResultDataToBeEdited = {
                            ...objOrientationTestLoginAndResultDataToBeEdited,
                            ["DataToDeActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                objDataToDeActivate
                            ]
                        };
                    } else {
                        objHighStakeTestLoginAndResultDataToBeEdited = {
                            ...objHighStakeTestLoginAndResultDataToBeEdited,
                            ["DataToDeActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                objDataToDeActivate
                            ]
                        };

                    }
                    //Pop up data
                    let strParentSubjectName = "", strSubSubjectName = "";
                    let arrTestData = [];
                    if (objResult["TestType"] === "Orientation") {
                        arrSubjects = this.GetAllSubjects(objContext);
                        let objParentSubjectDetails = {};
                        let objSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                        if (objSubjectDetails["iParentSubjectId"] !== 0) {
                            objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                            strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                            strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                        }
                        else {
                            strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                        }
                        arrTestData = this.GetConflictTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                    }
                    else {
                        arrSubjects = this.GetAllSubjects(objContext);
                        let objParentSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                        strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                        arrTestData = this.GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                    }
                    let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"] || objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uParentTestId"])[0];
                    let strTestName = objConflictingTestDetails["vTestName"];
                    let arrConflictingData = [
                        {
                            "PupilName": objPupilDetails["vFirstName"] + objPupilDetails["vName"],
                            "TestName": strTestName,
                            "ParentSubjectName": strParentSubjectName,
                            "SubSubjectName": strSubSubjectName,
                            "TestType": objResult["TestType"],
                        }
                    ];
                    this.ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                }
                else {
                    objOrientationTestLoginAndResultDataToBeEdited = {
                        ...objOrientationTestLoginAndResultDataToBeEdited,
                        ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                        {
                            "uPupilId": uPupilId,
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strOrientationCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "ACTIVATE"
                        }
                        ]
                    };
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                }
            }
        } else {
            if (!blnIsChecked) {
                arrPupil.forEach(objTempData => {
                    objOrientationTestLoginAndResultDataToBeEdited = {
                        ...objOrientationTestLoginAndResultDataToBeEdited,
                        ["DataToDeActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                        {
                            "uPupilId": objTempData["uPupilId"],
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strOrientationCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "DEACTIVATE"
                        }
                        ]
                    };
                });
                this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
            else {
                let arrConflictingData = [];
                arrPupil.forEach(objTempData => {
                    let objResult = this.CheckIfActiveTestAlreadyPresentForPupil(objContext, objTempData["uPupilId"]);
                    if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
                        let blnSameRepetionTest = false;
                        if ((objResult["objActiveTestLoginsAndResultDetails"]["uTestId"] == objTestDetails["uTestId"] || objResult["objActiveTestLoginsAndResultDetails"]["uParentTestId"] == objTestDetails["uTestId"]) && objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"] == intCycleRepetition) {
                            blnSameRepetionTest = true;
                        }
                        if (!blnSameRepetionTest) {
                            objOrientationTestLoginAndResultDataToBeEdited = {
                                ...objOrientationTestLoginAndResultDataToBeEdited,
                                ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                                {
                                    "uPupilId": objTempData["uPupilId"],
                                    "uTestId": objTestDetails["uTestId"],
                                    "uCycleId": strOrientationCycleId,
                                    "uClassId": strClassId,
                                    "iCycleRepetition": intCycleRepetition,
                                    "iStateId": iStateId,
                                    "strOperationType": "ACTIVATE"
                                }
                                ]
                            };

                            let objDataToDeActivate = {
                                "uPupilId": objTempData["uPupilId"],
                                "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                                "uCycleId": objResult["TestType"] === "Orientation" ? strOrientationCycleId : strHighStakeCycleId,
                                "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                                "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                                "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                                "strOperationType": "DEACTIVATE"
                            };
                            if (objResult["TestType"] == "Orientation") {
                                objOrientationTestLoginAndResultDataToBeEdited = {
                                    ...objOrientationTestLoginAndResultDataToBeEdited,
                                    ["DataToDeActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                        objDataToDeActivate
                                    ]
                                };
                            } else {
                                objHighStakeTestLoginAndResultDataToBeEdited = {
                                    ...objHighStakeTestLoginAndResultDataToBeEdited,
                                    ["DataToDeActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                        objDataToDeActivate
                                    ]
                                };

                            }
                            //Pop up data
                            let strParentSubjectName = "", strSubSubjectName = "";
                            let arrTestData = [];
                            if (objResult["TestType"] === "Orientation") {
                                arrSubjects = this.GetAllSubjects(objContext);
                                let objParentSubjectDetails = {};
                                let objSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                                if (objSubjectDetails["iParentSubjectId"] !== 0) {
                                    objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                                    strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                                    strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                                }
                                else {
                                    strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                                }
                                arrTestData = this.GetTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"]);
                            }
                            else {
                                arrSubjects = this.GetAllSubjects(objContext);
                                let objParentSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                                strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                                arrTestData = this.GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                            }
                            let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"] || objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uParentTestId"])[0];
                            let strTestName = objConflictingTestDetails["vTestName"];
                            arrConflictingData = [
                                {
                                    "PupilName": objTempData["vFirstName"] + objTempData["vName"],
                                    "TestName": strTestName,
                                    "ParentSubjectName": strParentSubjectName,
                                    "SubSubjectName": strSubSubjectName,
                                    "TestType": objResult["TestType"],
                                }
                            ];
                        }
                    }
                    else {
                        objOrientationTestLoginAndResultDataToBeEdited = {
                            ...objOrientationTestLoginAndResultDataToBeEdited,
                            ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                            {
                                "uPupilId": objTempData["uPupilId"],
                                "uTestId": objTestDetails["uTestId"],
                                "uCycleId": strOrientationCycleId,
                                "uClassId": strClassId,
                                "iCycleRepetition": intCycleRepetition,
                                "iStateId": iStateId,
                                "strOperationType": "ACTIVATE"
                            }
                            ]
                        };
                    }
                });
                if (arrConflictingData.length > 0) {
                    this.ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                } else {
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);

                }
            }
        }

    };

    /**
     * @name HisghStakeTestExtendedCheckBokChange
     * @summary This method activates or deactivates the high-stake test token.
     * @param {any} objContext
     * @param {any} blnIsSelectAll
     * @param {any} objTestDetails
     * @param {any} objPupilDetails
     * @param {any} intCycleRepetition
     * @param {any} blnIsChecked
     */
    HisghStakeTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked) {
        let iSubjectId = objTestDetails["iSubjectId"];
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N").Data;
        let objCycle = arrCycle.find(x => x["iCycleTypeId"] == "1");
        let strOrientationCycleId = objCycle["uCycleId"];
        let objHighStakeCycle = arrCycle.find(x => x["iCycleTypeId"] == "6")
        let strHighStakeCycleId = objHighStakeCycle["uCycleId"];
        let objOrientationTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeActivate": [] };
        let objHighStakeTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeActivate": [] };
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        let arrSubjects = [];
        if (!blnIsSelectAll) {
            let uPupilId = objPupilDetails["uPupilId"];
            if (!blnIsChecked) {
                objHighStakeTestLoginAndResultDataToBeEdited = {
                    ...objHighStakeTestLoginAndResultDataToBeEdited,
                    ["DataToDeActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                    {
                        "uPupilId": uPupilId,
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strHighStakeCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "DEACTIVATE"
                    }
                    ]
                };
                ApplicationState.SetProperty("blnShowAnimation", true);
                this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
            else {
                let objResult = this.CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId);
                if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
                    objHighStakeTestLoginAndResultDataToBeEdited = {
                        ...objHighStakeTestLoginAndResultDataToBeEdited,
                        ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                        {
                            "uPupilId": uPupilId,
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strHighStakeCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "ACTIVATE"
                        }
                        ]
                    };
                    let objDataToDeActivate = {
                        "uPupilId": uPupilId,
                        "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                        "uCycleId": objResult["TestType"] === "Orientation" ? strOrientationCycleId : strHighStakeCycleId,
                        "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                        "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                        "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                        "strOperationType": "DEACTIVATE"
                    };
                    if (objResult["TestType"] == "Orientation") {
                        objOrientationTestLoginAndResultDataToBeEdited = {
                            ...objOrientationTestLoginAndResultDataToBeEdited,
                            ["DataToDeActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                objDataToDeActivate
                            ]
                        };
                    } else {
                        objHighStakeTestLoginAndResultDataToBeEdited = {
                            ...objHighStakeTestLoginAndResultDataToBeEdited,
                            ["DataToDeActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                objDataToDeActivate
                            ]
                        };

                    }
                    //Pop up data
                    let strParentSubjectName = "", strSubSubjectName = "";
                    let arrTestData = [];
                    if (objResult["TestType"] === "Orientation") {
                        arrSubjects = this.GetAllSubjects(objContext);
                        let objParentSubjectDetails = {};
                        let objSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                        if (objSubjectDetails["iParentSubjectId"] !== 0) {
                            objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                            strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                            strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                        }
                        else {
                            strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                        }
                        arrTestData = this.GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                    }
                    else {
                        arrSubjects = this.GetAllSubjects(objContext);
                        let objParentSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                        strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                        arrTestData = this.GetTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"]);
                    }
                    let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"] || objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uParentTestId"])[0];
                    let strTestName = objConflictingTestDetails["vTestName"];
                    let arrConflictingData = [
                        {
                            "PupilName": objPupilDetails["vFirstName"] + objPupilDetails["vName"],
                            "TestName": strTestName,
                            "ParentSubjectName": strParentSubjectName,
                            "SubSubjectName": strSubSubjectName,
                            "TestType": objResult["TestType"],
                        }
                    ];
                    this.ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId);
                }
                else {

                    objHighStakeTestLoginAndResultDataToBeEdited = {
                        ...objHighStakeTestLoginAndResultDataToBeEdited,
                        ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                        {
                            "uPupilId": uPupilId,
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strHighStakeCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "ACTIVATE"
                        }
                        ]
                    };

                    if (this.CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, uPupilId, iSubjectId)) {
                        ApplicationState.SetProperty("blnShowAnimation", true);
                        this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                    }
                    else {
                        this.ShowAssignClassTypePopUp(objContext, [{ "uPupilId": uPupilId, "uTestId": objTestDetails["uTestId"] }], iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                    }
                }
            }
        }
        else {
            if (!blnIsChecked) {
                arrPupil.forEach(objTempData => {
                    objHighStakeTestLoginAndResultDataToBeEdited = {
                        ...objHighStakeTestLoginAndResultDataToBeEdited,
                        ["DataToDeActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                        {
                            "uPupilId": objTempData["uPupilId"],
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strHighStakeCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "DEACTIVATE"
                        }
                        ]
                    };
                });
                ApplicationState.SetProperty("blnShowAnimation", true);
                this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
            else {
                let arrConflictingData = [];
                arrSubjects = this.GetAllSubjects(objContext);
                arrPupil.forEach(objTempData => {
                    let uPupilId = objTempData["uPupilId"];
                    let objResult = this.CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId);
                    if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
                        objHighStakeTestLoginAndResultDataToBeEdited = {
                            ...objHighStakeTestLoginAndResultDataToBeEdited,
                            ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                            {
                                "uPupilId": uPupilId,
                                "uTestId": objTestDetails["uTestId"],
                                "uCycleId": strHighStakeCycleId,
                                "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                                "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                                "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                                "strOperationType": "ACTIVATE"
                            }
                            ]
                        };
                        let objDataToDeActivate = {
                            "uPupilId": uPupilId,
                            "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                            "uCycleId": objResult["TestType"] === "Orientation" ? strOrientationCycleId : strHighStakeCycleId,
                            "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                            "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                            "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                            "strOperationType": "DEACTIVATE"
                        };
                        if (objResult["TestType"] == "Orientation") {
                            objOrientationTestLoginAndResultDataToBeEdited = {
                                ...objOrientationTestLoginAndResultDataToBeEdited,
                                ["DataToDeActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                    objDataToDeActivate
                                ]
                            };
                        } else {
                            objHighStakeTestLoginAndResultDataToBeEdited = {
                                ...objHighStakeTestLoginAndResultDataToBeEdited,
                                ["DataToDeActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeActivate"],
                                    objDataToDeActivate
                                ]
                            };

                        }
                        let strParentSubjectName = "", strSubSubjectName = "";
                        let arrTestData = [];
                        if (objResult["TestType"] === "Orientation") {
                            arrSubjects = this.GetAllSubjects(objContext);
                            let objParentSubjectDetails = {};
                            let objSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                            if (objSubjectDetails["iParentSubjectId"] !== 0) {
                                objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                                strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                                strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                            }
                            else {
                                strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                            }
                            arrTestData = this.GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                        }
                        else {
                            arrSubjects = this.GetAllSubjects(objContext);
                            let objParentSubjectDetails = this.GetSubjectByToken(objContext, objResult["objActiveTestLoginsAndResultDetails"], arrSubjects);
                            strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];

                            arrTestData = this.GetTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"]);
                        }
                        let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"] || objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uParentTestId"])[0];
                        let strTestName = objConflictingTestDetails["vTestName"];
                        arrConflictingData = [...arrConflictingData,
                        {
                            "PupilName": objTempData["vFirstName"] + objTempData["vName"],
                            "TestName": strTestName,
                            "SubSubjectName": strSubSubjectName,
                            "ParentSubjectName": strParentSubjectName,
                            "TestType": objResult["TestType"]
                        }
                        ];
                    }
                    else {
                        objHighStakeTestLoginAndResultDataToBeEdited = {
                            ...objHighStakeTestLoginAndResultDataToBeEdited,
                            ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                            {
                                "uPupilId": uPupilId,
                                "uTestId": objTestDetails["uTestId"],
                                "uCycleId": strHighStakeCycleId,
                                "uClassId": strClassId,
                                "iCycleRepetition": intCycleRepetition,
                                "iStateId": iStateId,
                                "strOperationType": "ACTIVATE"
                            }
                            ]
                        };
                    }
                });

                if (arrConflictingData.length > 0) {
                    this.ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId);
                }
                else {
                    let arrPupilToAssignClassType = [];
                    objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"].map(objTempData => {
                        let blnIsClassTypeIsPresentForPupil = this.CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, objTempData["uPupilId"], iSubjectId);
                        if (!blnIsClassTypeIsPresentForPupil) {
                            arrPupilToAssignClassType = [...arrPupilToAssignClassType, { "uPupilId": objTempData["uPupilId"], "uTestId": objTempData["uTestId"] }];
                        }
                    });
                    if (arrPupilToAssignClassType.length > 0) {
                        this.ShowAssignClassTypePopUp(objContext, arrPupilToAssignClassType, iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                    }
                    else {
                        ApplicationState.SetProperty("blnShowAnimation", true);
                        this.EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                    }
                }
            }
        }
    };

    /**
     * @name OnChangeCheckBox
     * @param {*} objContext
     * @param {*} blnIsSelectAll
     * @param {*} objTestDetails
     * @param {*} intCycleRepetition
     * @param {*} blnIsChecked
     * @summary   Trigerred when the any checkbox is checked or unchecked.
     */
    OnChangeCheckBox(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked) {
        Logger.Log("*****************Check box details", {
            "blnIsSelectAll": blnIsSelectAll,
            "objTestDetails": objTestDetails,
            "objPupilDetails": objPupilDetails,
            "intCycleRepetition": intCycleRepetition,
            "blnIsChecked": blnIsChecked
        });

        if (this.blnIsOrientationTest) {
            if (objContext.state.blnCurrentSchoolYearPeriod)
                this.OrientationTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked);
            else {
                if (blnIsSelectAll) {
                    let arrExistsTokens = this.GetTestLoginsAndResultData(objContext, "", intCycleRepetition, objTestDetails)
                    let blnIsTestStarted = false;
                    if (arrExistsTokens.length > 0) {
                        for (let objExistsToken of arrExistsTokens) {
                            blnIsTestStarted = objContext.TestLogins_ModuleProcessor.CheckIfTestStarted(objContext, objExistsToken);
                            if (blnIsTestStarted)
                                return;
                        }
                        if (blnIsTestStarted)
                            this.OrientationTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked);
                        else
                            this.ShowTestDisabledErrorPopup(objContext, true);
                    } else {
                        this.ShowTestDisabledErrorPopup(objContext, true);
                    }
                } else {
                    let objExistsToken = objContext.TestLogins_ModuleProcessor.CheckIfTestTokenExist(objContext, objPupilDetails["uPupilId"], intCycleRepetition, objTestDetails["uTestId"]);
                    let blnIsTestStarted = false;
                    if (objExistsToken)
                        blnIsTestStarted = objContext.TestLogins_ModuleProcessor.CheckIfTestStarted(objContext, objExistsToken);
                    if (blnIsTestStarted)
                        this.OrientationTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked);
                    else
                        this.ShowTestDisabledErrorPopup(objContext, true);
                }
            }

        }
        else {
            this.HisghStakeTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked);
        }
    };

    /**
     * @name GetConflictTestData
     * @summary returns the test object
     * @param {any} objContext
     * @param {any} uTestId
     */
    GetConflictTestData(objContext, objTestParam) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strSchoolYearId = this.GetSchoolYearIdFromSelectedClass(objContext);
        let arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + strSchoolYearId + ";cIsDeleted;N").Data;
        return arrTestData.filter(objTest => objTest["uTestId"] == objTestParam["uTestId"] || objTest["uTestId"] == objTestParam["uParentTestId"]);
    }

    /**
     * @name GetSchoolYearIdFromClassId
     * @summary returns the schoolYearId from selected class.
     * @param {any} objContext
     */
    GetSchoolYearIdFromClassId(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N").Data;
        if (arrClassData && arrClassData.length == 0) {
            arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data; // when class is changed from class and pupil.
        }
        let objSelectedClassDetails = arrClassData.filter(objTempData => objTempData["uClassId"] === strClassId)[0];
        if (objSelectedClassDetails == undefined) {
            arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data; // when class is changed from class and pupil.
            objSelectedClassDetails = arrClassData.filter(objTempData => objTempData["uClassId"] === strClassId)[0];
        }
        let arrSchoolYearData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data;
        let objSchoolYearDetails = arrSchoolYearData.filter(objTempData => objTempData["iSchoolYear"] === objSelectedClassDetails["iSchoolYear"])[0];
        return objSchoolYearDetails["iSchoolYearId"];
    }

    /**
     * @name CheckUserHasLicesne
     * @summary return whether it is key cloack or not
     * @param {any} props
     */
    CheckUserHasLicesne(props) {
        let UserHasLicesne = false;
        if (props.ClientUserDetails["TeacherDetails"]["cIsExternalMember"] == "Y") {
            let objLicenseJSON = props.ClientUserDetails["License"] ? JSON.parse(props.ClientUserDetails["License"]["vLicenseJSON"]) : {};
            if (objLicenseJSON["BasePackage"].toLowerCase() == "stellwerk") {
                UserHasLicesne = true;
            }
        }
        return UserHasLicesne;
    }

    /**
     * @name GetPupilLicenseData
     * @summary returns the pupil license object from license array.
     * @param {any} strPupilId
     */
    GetPupilLicenseData(objContext, strPupilId) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrLicenseData = DataRef(objContext.props.Object_Extranet_Pupil_PupilLicense, "Object_Extranet_Pupil_PupilLicense;uClassId;" + strClassId)["Data"]

        let objLicenseData = arrLicenseData.find(x => x["uPupilId"] == strPupilId);
        let objPupilLicenseData = undefined;
        if (objLicenseData) {
            objPupilLicenseData = JSON.parse(objLicenseData["vLicenseJSON"]);
        }
        return objPupilLicenseData;
    }

    /**
     * @name CheckForDisableCheckBoxForKeyCloackUser
     * @param {any} objContext
     * @param {any} strPupilId
     * @param {any} strTestId
     */
    CheckForDisableCheckBoxForKeyCloackUser(objContext, strPupilId, objTest) {
        if (this.CheckUserHasLicesne(objContext.props)) {
            let objPupilLicense = this.GetPupilLicenseData(objContext, strPupilId);
            let arrLicensedTest = [];
            if (objPupilLicense) {
                arrLicensedTest = objPupilLicense["TestsLicensed"];
            }
            return !(arrLicensedTest.includes(objTest["uTestId"].toLowerCase()) || arrLicensedTest.includes(objTest["uParentTestId"].toLowerCase()));
        } else {
            return false;
        }
    }

    /**
     * @name CheckForDisableAllCheckBoxForKeyCloackUser
     * @param {any} objContext
     * @param {any} strPupilId
     * @param {any} strTestId
     */
    CheckForDisableAllCheckBoxForKeyCloackUser(objContext, arrPupil, objTest) {
        if (this.CheckUserHasLicesne(objContext.props)) {
            let blnDisabled = true;
            for (let objPupil of arrPupil) {
                if (!this.CheckForDisableCheckBoxForKeyCloackUser(objContext, objPupil["uPupilId"], objTest)) {
                    blnDisabled = false;
                    break;
                }
            }
            return blnDisabled
        } else {
            return false;
        }
    }

    /**
     * @name ShowTestDisabledErrorPopup
     * @summary opens the test disabled error popup.
     * @param {any} objContext
     */
    ShowTestDisabledErrorPopup(objContext, blnShowPopupForPreviousSchoolYearPeriod = false) {
        if (this.CheckUserHasLicesne(objContext.props) || blnShowPopupForPreviousSchoolYearPeriod) {
            let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestLogins", objContext.props)
            let ErrorText = Localization.TextFormatter(objTextResource, 'TestDisabledErrorPopupMessage');
            let ErrorTitle = Localization.TextFormatter(objTextResource, 'ErrorTitle')
            if (blnShowPopupForPreviousSchoolYearPeriod) {
                ErrorText = Localization.TextFormatter(objTextResource, 'PreviousSchoolErrorMessage');
                ErrorTitle = Localization.TextFormatter(objTextResource, 'PreviousSchoolErrorTitle')
            }
            let objPopupTextResource = {
                Error_ErrorText: ErrorText,
                Error_OkButtonText: Localization.TextFormatter(objTextResource, 'Okay'),
                Error_Title: ErrorTitle,
            };

            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": "380px",
                    "Height": "auto",
                    "ShowHeader": true,
                    "CssClassName": "test-logins-error-popup",
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
     * @name GetSubjectByToken
     * @summary returns the subject
     * @param {any} objContext
     * @param {any} objToken
     */
    GetSubjectByToken(objContext, objToken, arrSubjects) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strSchoolYearId = this.GetSchoolYearIdFromSelectedClass(objContext);
        let arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + this.strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + strSchoolYearId + ";cIsDeleted;N").Data;
        let objTest = arrTestData.find(tst => tst["uTestId"] == objToken["uTestId"] || tst["uTestId"] == objToken["uParentTestId"]);
        if (objTest == undefined) {
            arrTestData = this.GetTokenValidationTestData(objContext, objToken);
            objTest = arrTestData[0];
        }
        let objTestSubject = arrSubjects.find(x => x["iSubjectId"] == objTest["iSubjectId"]);
        return objTestSubject;
    }

    /**
     * @name UpdateInformationPopupStatus
     * @summary updates the ShowInformation bar status
     * @param {any} objContext
     */
    UpdateInformationPopupStatus(objContext) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let vKey = this.blnIsOrientationTest ? "ShowInformationBar_TestLoginsPaperless" : "ShowInformationBar_HighStakeTestLoginsPaperless";
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [
                {
                    vValue: objContext.state.blnShowInformationBar ? "N" : "Y", //changing status here
                    vKey: vKey
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
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { blnShowInformationBar: !objContext.state.blnShowInformationBar } });
    }

    /**
    * @name HandleOptionalPdf
    * @summary makes the api call puts the data to state.
    * @param {any} objContext
    */
    HandleOptionalPdf(objContext) {
        let arrTestIds = this.GetTestIdsForAdditionalPdf(objContext);
        let objParams = {
            TestIds: arrTestIds
        };
        Extranet_Teacher_TestLogins_Module.GetOptionalAdditionFileDetails(objParams, (objRes) => {
            console.log("response from optional files", objRes)
            let arrData = objRes["Extranet_Teacher_TestLogins_Module"]["Data"];
            objContext.dispatch({ type: 'SET_STATE', payload: { blnShowOptionalPdf: true, arrOptionalPdf: arrData } })
        })
    }

    /**
     * @name GetTestIdsForAdditionalPdf
     * @summary returns the ids to 
     * @param {any} objContext
     */
    GetTestIdsForAdditionalPdf(objContext) {
        let arrTestIds = ["D97C8FE8-FF6D-472A-995B-DD92418E17EC", "CCE6C38E-5BA7-42D0-A04D-70147CF06513", "5C40BFD5-572D-4789-9139-0B904093F426"];
        let arrTestIdsPresentInTestData = [];
        let arrTestData = this.GetTestData(objContext);
        arrTestIds.forEach(strTempTestId => {
            if (arrTestData.filter(objTempData => objTempData["uTestId"] == strTempTestId).length > 0) {
                arrTestIdsPresentInTestData = [...arrTestIdsPresentInTestData,
                {
                    "uTestId": strTempTestId
                }
                ];
            }
        });
        return arrTestIdsPresentInTestData;
    }

    /**
     * @name RefreshTokenData
     * @summary gets the token data to check status.
     * @param {any} objContext
     */
    RefreshTokenData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");

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
                    }
                ]
            }
        };
        let arrDataRequest = [];
        Object_TestApplication_TestLoginAndResult.Initialize([objMainTestLoginAndResultParams])
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        ApplicationState.SetProperty("blnShowAnimation", true);
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    StartTestExecution() {
        let objParams = {
            "Params": {
                "uPupilId": "2211DA2F-06C6-4810-A439-ADD251A18560",
                "uClassId": "C260511C-1FEC-43D8-8A2B-5C32FCE912FB",
                "strPackage": "CompleteProduct",
                "uTestId": ""
            }
        }
        global.ProviderController.ArcadixFetchDataProvider.fetch("API/Extranet/Pupil/PupilLearningTest/StartTestExecution?sessionkey=" + global.JConfiguration.SessionKey, "post", objParams, {})
            .then(objResult => {
                console.log(objResult);
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

export default TestLogins_ModuleProcessor