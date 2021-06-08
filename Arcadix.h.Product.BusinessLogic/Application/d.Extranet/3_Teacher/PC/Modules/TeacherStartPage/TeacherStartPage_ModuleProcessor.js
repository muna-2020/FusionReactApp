//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_TestApplication_TestLoginAndResult from '@shared/Object/f.TestApplication/TestLoginAndResult/TestLoginAndResult';
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';
import Object_Cockpit_UserPreferenceProfileImage from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import Extranet_Teacher_TeacherDocument_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument_Module';
import Extranet_Teacher_TeacherNews_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews_Module';
import Object_TestApplication_LearningTestLoginAndResult from '@shared/Object/f.TestApplication/LearningTestLoginAndResult/LearningTestLoginAndResult';

import Object_Extranet_Shared_Survey from '@shared/Object/d.Extranet/5_Shared/Survey/Survey';
import Object_Extranet_Shared_SurveyQuestion from '@shared/Object/d.Extranet/5_Shared/Survey/SurveyQuestion/SurveyQuestion';

import Extranet_Teacher_Tip_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/NewsTip/Tip_Module';

//Helper classes.
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";
import Object_Extranet_Shared_OpenApplicationCredential from '@shared/Object/d.Extranet/5_Shared/OpenApplicationCredential/OpenApplicationCredential';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';


/**
* @name Teacher_ModuleProcessor
* @summary Class for Teacher module display and manipulate.
*/
class TeacherStartPage_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class", "Object_Cockpit_MainClient_ClientSettings", "Object_Intranet_Taxonomy_Subject",
            "Object_Extranet_Teacher_Teacher", "Object_Extranet_School_School",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherStartPage",
            "Object_Extranet_Pupil_Pupil", "Object_Intranet_Test_IntranetTest", "Object_TestApplication_TestLoginAndResult",
            "Object_Intranet_Test_ExtranetTest",
            "Object_Cockpit_UserPreferenceProfileImage",
            "Extranet_Teacher_TeacherDocument_Module",
            "Extranet_Teacher_TeacherNews_Module",
            "Object_Extranet_Shared_OpenApplicationCredential",
            "Object_Extranet_Shared_Survey", "Object_Extranet_Shared_SurveyQuestion",
            "Extranet_Teacher_Tip_Module",
            "Object_TestApplication_LearningTestLoginAndResult",
            { "StoreKey": "ApplicationState", "DataKey": "ShowHelp" },
            { "StoreKey": "ApplicationState", "DataKey": "DontShowTips" }
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherStartPage/TeacherStartPage.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/Dropdown/DropDown.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherStartPage/ClientNewsPopup/ClientNewsPopup.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
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

        // ClientSettings
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
        Object_Cockpit_MainClient_ClientSettings.Initialize(objClientSettingsParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];

        //Subject
        let objSubjectParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "iMainClientId": props.ClientUserDetails.MainClientId
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
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //Teacher
        let objTeacherParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": uSchoolId,
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
        Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //School
        let objSchoolParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": uSchoolId
                        }
                    }
                ]
            }
        };
        Object_Extranet_School_School.Initialize(objSchoolParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/TeacherStartPage"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Survey
        let objSurveyParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUserId": props.ClientUserDetails.UserId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Shared_Survey.Initialize(objSurveyParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Shared_Survey];

        // SurveyQuestion
        let objSurveyQuestionParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUserId": uSchoolId
                        }
                    },
                    {
                        "match": {
                            "cIsCurrentSurveyQuestion": "Y"
                        }
                    }
                ]
            }
        };
        Object_Extranet_Shared_SurveyQuestion.Initialize(objSurveyQuestionParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Shared_SurveyQuestion];

        // Tip
        let objTipParams = {
            "SortKeys": [
                {
                    "iOrder": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
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
                            "iApplicationTypeId": props.ClientUserDetails.ApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "iMainClientId": props.ClientUserDetails.MainClientId
                        }
                    }
                ]
            }
        };
        Extranet_Teacher_Tip_Module.Initialize(objTipParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_Tip_Module];

        arrDataRequest = [...arrDataRequest, ...this.GetDataRequestsByClass(props)];
        let objClientUrlParams = {
            "vTargetType": "FusionPupil"
        };
        Object_Extranet_Shared_OpenApplicationCredential.GetGateKeeperUrl(objClientUrlParams, () => { });
        return arrDataRequest;
    }

    /**
    * @name LoadClassChangeData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadClassChangeData(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true)
            (new ObjectQueue()).QueueAndExecute(objContext.TeacherStartPage_ModuleProcessor.GetDataRequestsByClass(objContext.props), () => {
                ApplicationState.SetProperty("blnShowAnimation", false)
            });
    }

    /**
    * @name GetDataRequestsByClass
    * @param {object} props Passes props
    * @summary Get class data request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    GetDataRequestsByClass(props) {
        let arrDataRequest = [];
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strOrientationCycleTypeId = "1";
        let strHighStakeCycleTypeId = "6";
        let strLearningCycleTypeId = "3";
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strTeacherId = props.ClientUserDetails.UserId;

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

        //IntranetTest (OriantationIntranetTest)
        let objOrientationIntranetTestParams = {
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
                                "iCycleTypeId": strOrientationCycleTypeId
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
                                "cIsDeleted": "N"
                            }
                        }
                    ]
            }
        };

        //IntranetTest (HighStakeIntranetTest)
        let objHighStakeIntranetTestParams = {
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
                                "iCycleTypeId": strHighStakeCycleTypeId
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
                                "cIsDeleted": "N"
                            }
                        }
                    ]
            }
        };
        Object_Intranet_Test_IntranetTest.Initialize([objOrientationIntranetTestParams, objHighStakeIntranetTestParams]);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        //TestLoginAndResult (OrientationTest)
        let objOrientationTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": strOrientationCycleTypeId
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
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };

        //TestLoginAndResult (HighStakeTest)
        let objHighStakeTestLoginAndResultParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": strHighStakeCycleTypeId
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
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
        Object_TestApplication_TestLoginAndResult.Initialize([objOrientationTestLoginAndResultParams, objHighStakeTestLoginAndResultParams]);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        //TestLoginAndResult (LearningExtranetTest)
        let objLearningExtranetTestResultParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "iCycleTypeId": strLearningCycleTypeId
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
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
        Object_TestApplication_LearningTestLoginAndResult.Initialize([objLearningExtranetTestResultParams]);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_LearningTestLoginAndResult];


        //ExtranetTest
        let objLearningExtranetTestParams = {
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": strLearningCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": strTeacherId
                        }
                    },
                    {
                        "range": {
                            "dtFromDate": "",
                            "dtToDate": ""
                        }
                    }
                ]
            }
        };
        Object_Intranet_Test_ExtranetTest.Initialize(objLearningExtranetTestParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_ExtranetTest];

        //Document
        let objDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            ["uSchoolId"]: props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
        Extranet_Teacher_TeacherDocument_Module.Initialize(objDocumentsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherDocument_Module];

        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: strClassId
            },
            ["uClassId"]: strClassId,
            ["uSchoolId"]: props.ClientUserDetails.TeacherDetails.uSchoolId,
            ["SearchText"]: "",
            ["uTeacherId"]: ClientUserDetails.UserId,
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
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
        Extranet_Teacher_TeacherNews_Module.Initialize(objNewsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherNews_Module];

        this.GetPupilProfileImages(strClassId);

        return arrDataRequest;
    }

    /**
    * @name GetPupilProfileImages
    * @param {String} strClassId Passes Class ID
    * @summary Get the Pupil profile Images
    */
    GetPupilProfileImages(strClassId) {
        let objPupilProfileImages = {
            "Params": {
                "ForeignKeyFilter": {
                    "uClassId": strClassId
                }
            }
        };

        Object_Cockpit_UserPreferenceProfileImage.GetDataByClassId(objPupilProfileImages, (objReturnData) => {
            if (objReturnData) {
                let strFilter = "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId;
                let objProfileData = {
                    Filter: strFilter,
                    Value: {
                        Data: objReturnData[strFilter]["Data"],
                        TimeStamp: "",
                        PrimaryKeyName: "uProfileImageId",
                        Count: objReturnData[strFilter]["Data"].length
                    }
                };
                Object_Cockpit_UserPreferenceProfileImage.AddDataByClassId(objProfileData, (objReturnData) => {
                    console.log("pupil profile images", objReturnData);
                });
            }
        });
    }

    /**
    * @name GetPupilData
    * @param {object} objContext Passes Context Object
    * @summary Get the non deleted pupil data by filtering with the class ID
    * @returns {Array} PupilData
    */
    GetPupilData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrTempPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        let arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
        return arrPupilData;
    }

    /**
    * @name GetClassDropDownData
    * @param {object} objContext Context object
    * @summary  returns an array of classes to load in the drop down
    * @returns {Array} Class data for class dropdown
    */
    GetClassDropDownData(objContext, arrTempClass) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherStartPage", objContext.props);
        arrTempClass = arrTempClass ? arrTempClass : [];
        objTextResource = objTextResource ? objTextResource : {};
        let strTeacherId = global.ClientUserDetails.UserId;
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrTempClass.forEach((objClass) => {
            let objTempClassData = {
                ...objClass,
                ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"]
                    .filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"; })
            };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = {
                ...objClass,
                ["t_TestDrive_Member_Class_Teacher"]:
                    objClass.t_TestDrive_Member_Class_Teacher
                        .filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y")
            };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = {
                ...objClass,
                ["t_TestDrive_Member_Class_Teacher"]:
                    objClass.t_TestDrive_Member_Class_Teacher
                        .filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsSubjectExpert === "Y")
            };
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
            }
        ];
        return arrFinalClassData;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "TopHead", "TaskTitle", "HelpIcon"],
            FooterIds: ["FooterId"]
        };
    }

    /**
    * @name HandleOnChangeClassDropDown
    * @param {object} objContext Context object
    * @param {object} objItem Item
    * @summary Triggers when the class dropdown selection changes
    */
    HandleOnChangeClassDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnClassChangedInDropdown": !objContext.state.blnClassChangedInDropdown } });
    }

    /**
    * @name GetPupilDropdownMetaData
    * @summary Gets the meta data for Teacher dropdown
    * @returns {object} Meta data objects for Teacher dropdown
    */
    GetPupilDropdownMetaData() {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uPupilId",
            IsLink: 'Y',
            "DefaultOptionValue": -1, //Pass the id of the default option text       
            "ShowDefaultOption": true, //when true shows the DefaultOptionText (from resource) in the Dropdown
            "DefaultOptionTextKey": "PupilDropdownDefaultOption"
        };
    }

    /**
    * @name GetPupilDropdownData
    * @param {object} objContext Context object
    * @param {Array} arrPupilData Manipulated pupil data.
    * @summary Gets the data for Teacher dropdown
    * @returns {object} Meta objects for Teacher dropdown
    */
    GetPupilDropdownData(objContext, arrPupilData) {
        return {
            DropdownData: arrPupilData,
            SelectedValue: "-1"
        };
    }

    /**
    * @name GetPupilDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Teacher dropdown.
    * @returns {object} objEventBasics
    */
    GetPupilDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.TeacherStartPage_ModuleProcessor.HandleOnChangePupilDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData(objTextResource) {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath,
            Text: objTextResource
        };
    }

    /**
    * @name HandleOnChangePupilDropDown
    * @param {object} objContext Context object
    * @param {object} objItem Item
    * @summary Triggers when the pupil dropdown selection changes. It opens the pupil login page of the pupil website on a new tab.
    */
    HandleOnChangePupilDropDown(objContext, objItem) {
        Logger.Log("..........dropdown item1", objItem); //Implementation Pending. Need to review before doing anything.
    }

    /**
    * @name GetActiveTokens
    * @param {object} objContext Context object
    * @param {Array} arrTestLoginResult TestLoginResult
    * @summary Gets the ActiveTokens by filtering the TestLoginResult
    * @returns {Array} ActiveTokens
    */
    GetActiveTokens(objContext, arrTestLoginResult) {
        let objClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime")["Data"][0];
        let intTimeToInvalidate = parseInt(objClientSettings["vValue"]);
        let dtCurrent = new Date();
        let arrActiveTokens = arrTestLoginResult.filter(tstRslt => {
            if (tstRslt["dtValidTill"] != null && tstRslt["dtValidTill"] != "") {
                let validUpto = new Date(tstRslt["dtValidTill"]);
                if (validUpto > dtCurrent) {
                    let diffMins = (validUpto - dtCurrent) / (1000 * 360);
                    if (diffMins < intTimeToInvalidate) {
                        return {
                            ...tstRslt
                        };
                    }
                }
            }
        });
        return arrActiveTokens;
    }

    /**
    * @name GetTestData
    * @param {object} objContext Context object
    * @param {Array} arrPupilData non deleted Pupil data that is filtered with the class ID
    * @param {Array} arrTestLoginResult OrientationTestLoginResult/HighStakeTestLoginResult data
    * @param {Array} arrTestData OrientationTest/HighStakeTest data
    * @param {Array} arrSubject Subject data
    * @summary Forms the final pupil for Tests
    * @returns {Array} Final Result
    */
    GetTestData(objContext, arrPupilData, arrTestLoginResult, arrTestData, arrSubject) {
        let arrActiveTokens = objContext.TeacherStartPage_ModuleProcessor.GetActiveTokens(objContext, arrTestLoginResult);
        let arrDistinctTestId = [];
        let arrDistinctParentTestId = [];
        let arrFinalResult = [];
        for (let tstRslt of arrActiveTokens) {
            if (arrDistinctTestId.indexOf(tstRslt["uTestId"]) <= -1) {
                arrDistinctTestId = [...arrDistinctTestId, tstRslt["uTestId"]];
            }
        }
        for (let tstRslt of arrActiveTokens) {
            if (tstRslt["uParentTestId"] && tstRslt["uParentTestId"] != null) {
                arrDistinctParentTestId = [...arrDistinctParentTestId, tstRslt["uTestId"]];
            }
        }
        let arrAllDistinctTestId = [...arrDistinctTestId, arrDistinctParentTestId];
        for (let objTestResult of arrAllDistinctTestId) {
            let objDisplayData = {
                vSubjectName: null,
                iSubjectId: undefined,
                arrPupil: []
            };
            let objTest = arrTestData.find(tst => tst["uTestId"] == objTestResult);
            if (objTest) {
                let objSubject = arrSubject.find(sub => sub["iSubjectId"] == objTest["iSubjectId"]);
                if (objSubject && objSubject["iParentSubjectId"] != 0 && objSubject["iParentSubjectId"] != -1) {
                    let objParentSubject = arrSubject.find(sub => sub["iSubjectId"] == objSubject["iParentSubjectId"]);
                    objDisplayData.vSubjectName = objParentSubject["t_TestDrive_Subject_Data"][0].vSubjectName;
                    objDisplayData.vSubSubjectName = objSubject["t_TestDrive_Subject_Data"][0].vSubjectName;
                    objDisplayData.iSubjectId = objParentSubject.iSubjectId;
                } else {
                    objDisplayData.vSubjectName = objSubject["t_TestDrive_Subject_Data"][0].vSubjectName;
                    objDisplayData.iSubjectId = objSubject.iSubjectId;
                }

                let arrActiveTokenByTest = arrActiveTokens.filter(tkn => tkn["uTestId"] == objTest["uTestId"]);

                for (let objToken of arrActiveTokenByTest) {
                    let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == objToken["uPupilId"]);
                    if (objPupil) {
                        let objTempPupil = {
                            uPupilId: objPupil["uPupilId"],
                            vName: objPupil["vName"],
                            vFirstName: objPupil["vFirstName"]
                        };
                        objDisplayData.arrPupil = [...objDisplayData.arrPupil, objTempPupil];
                    }
                }
                arrFinalResult = [...arrFinalResult, objDisplayData];
            }
        }
        let arrFilteredFinalResult = [];
        for (let i = 0; i < (arrFinalResult.length > 10 ? 10 : arrFinalResult.length); i++) {
            arrFilteredFinalResult = [...arrFilteredFinalResult, arrFinalResult[i]];
        }
        return arrFilteredFinalResult;
    }

    /**
    * @name GetTestResult
    * @param {object} objContext Context object
    * @param {Array} arrPupilData non deleted Pupil data that is filtered with the class ID
    * @param {Array} arrTestLoginResult OrientationTestLoginResult/HighStakeTestLoginResult data
    * @param {Array} arrTestData OrientationTest/HighStakeTest data
    * @param {Array} arrSubject Subject data
    * @summary Forms the final data for Tests Result
    * @returns {Array} Final data
    */
    GetTestResult(objContext, arrPupilData, arrTestLoginResult, arrTestData, arrSubject) {
        let arrFiltredTestLoginsAndResults = arrTestLoginResult.filter(tstRslt => (tstRslt["TestExecution"][0] && tstRslt["TestExecution"][0].iTestStatusId == 5 &&
            arrTestData.find(tst => tst["uTestId"] == tstRslt["uTestId"]))).sort((a, b) => { return b.TestExecution[0].dtTestEnd - a.TestExecution[0].dtTestEnd });
        let arrFinalData = [];
        for (let i = 0; i < (arrFiltredTestLoginsAndResults.length > 10 ? 10 : arrFiltredTestLoginsAndResults.length); i++) {
            let tstRslt = arrFiltredTestLoginsAndResults[i];
            let objTest = arrTestData.find(tst => tst["uTestId"] == tstRslt["uTestId"]);
            let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == tstRslt["uPupilId"]);
            let objSubject = arrSubject.find(sub => sub["iSubjectId"] == objTest["iSubjectId"]);

            if (objPupil && tstRslt && tstRslt["TestResultSummary"] && tstRslt["TestResultSummary"].length > 0) {
                let objDisplayData = {
                    uPupilId: objPupil["uPupilId"],
                    vName: objPupil["vName"],
                    vFirstName: objPupil["vFirstName"],
                    iSubjectId: objSubject["iSubjectId"],
                    vSubjectName: objSubject["t_TestDrive_Subject_Data"][0].vSubjectName,
                    vResult: JSON.stringify(tstRslt["TestResultSummary"][0].vResultAttribute).vResult
                };
                arrFinalData = [...arrFinalData, objDisplayData];
            }
        }
        return arrFinalData;
    }

    /**
    * @name GetLearningTestData
    * @param {object} objContext Context object
    * @param {Array} arrPupilData non deleted Pupil data that is filtered with the class ID
    * @param {Array} arrTestLoginResult OrientationTestLoginResult/HighStakeTestLoginResult data
    * @param {Array} arrTestData OrientationTest/HighStakeTest data
    * @param {Array} arrSubject Subject data
    * @summary Forms the final data for Learning Tests
    * @returns {Array} Final data
    */
    GetLearningTestData(objContext, arrPupilData, arrTestLoginResult, arrTestData, arrSubject) {
        let arrFilteredTestLoginResult = arrTestLoginResult.filter(tstRslt => (tstRslt["TestExecution"][0] && tstRslt["TestExecution"][0].iTestStatusId == 5)).sort((a, b) => { return new Date(b["TestExecution"][0].dtTestStart) - new Date(a["TestExecution"][0].dtTestStart); });
        let arrFinalResult = [];
        let arrDay = "mon";// objContext.props.JConfiguration.Locale.DATETIME_FORMATS.DAY;
        var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        for (let tstRslt of arrFilteredTestLoginResult) {
            let objTest = arrTestData.find(tst => tst["uTestId"] == tstRslt["uTestId"]);
            if (objTest) {
                let dtTestStart = new Date(tstRslt["TestExecution"][0]["dtTestStart"]).toLocaleDateString('de-DE', dateOptions);
                let iDay = new Date(tstRslt["TestExecution"][0]["dtTestStart"]).getDay();
                let strTestType = objTest["iTestTypeId"] == 2 ? "Low Stake" : objTest["cIsSystemGenerated"] == "N" ? "Learning Test Teacher" : "Learning Test System";
                let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == tstRslt["uPupilId"]);
                let objDisplayData = {
                    vTestname: objTest["vTestName"],
                    vDay: arrDay[iDay - 1],
                    dtTestStartDate: dtTestStart,
                    strTestType: strTestType,
                    vName: objPupil["vName"],
                    vFirstName: objPupil["vFirstName"]
                };
                arrFinalResult = [...arrFinalResult, objDisplayData];
            }
        }
        let arrFilteredFinalResult = [];
        for (let i = 0; i < (arrFinalResult.length > 2 ? 2 : arrFinalResult.length); i++) {
            arrFilteredFinalResult = [...arrFilteredFinalResult, arrFinalResult[i]];
        }
        return arrFilteredFinalResult;
    }

    /**
    * @name GetDocumentDisplayData
    * @param {object} objContext Context object
    * @param {Array} arrDocument Document data
    * @param {object} objSchool School object
    * @param {Array} arrTeacherData Teacher data
    * @param {Array} arrPupilData non deleted Pupil data that is filtered with the class ID
    * @summary Forms the final data for Document display
    * @returns {Array} Final result for Document display
    */
    GetDocumentDisplayData(objContext, arrDocument, objSchool, arrTeacherData, arrPupilData) {
        let arrFinalResult = [];
        let arrTeacherDocument = arrDocument.filter(doc => doc["uDocumentFolderId"] != "00000000-0000-0000-0000-000000000001");
        let arrShoolDocument = arrDocument.filter(doc => doc["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001" && doc["uUserId"] == objSchool["uSchoolId"]);
        let arrAllDocument = [...arrTeacherDocument, ...arrShoolDocument];
        var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        for (let i = 0; i < (arrAllDocument.length > 5 ? 5 : arrAllDocument.length); i++) {
            let objDocument = arrAllDocument[i];
            let strUserName = '';
            if (objSchool["uSchoolId"] == objDocument["uUserId"])
                strUserName = objSchool["vName"] + objSchool["vFirstName"];
            let objTeacher = arrTeacherData.find(tchr => tchr["uTeacherId"] == objDocument["uUserId"]);
            if (objTeacher)
                strUserName = objTeacher["vName"] + objTeacher["vFirstName"];
            let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == objDocument["uUserId"]);
            if (objPupil)
                strUserName = objPupil["vName"] + objPupil["vFirstName"];
            let objDisplayData = {
                vFileName: objDocument["vFileName"],
                dtTimeCreation: new Date(objDocument["dtCreatedOn"]).toLocaleDateString('de-DE', dateOptions),
                vFileUrl: JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objDocument.vFileId + "&Type=Document&DisplayFileName=" + objDocument.vFileName,
                vUserName: strUserName
            };
            arrFinalResult = [...arrFinalResult, objDisplayData];
        }
        return arrFinalResult;
    }

    /**
    * @name GetNewsDisplayData
    * @param {object} objContext Context object
    * @param {Array} arrNews News data
    * @param {object} objSchool School object
    * @param {Array} arrTeacherData Teacher data
    * @param {Array} arrPupilData non deleted Pupil data that is filtered with the class ID
    * @summary Forms the final data for News display
    * @returns {Array} Final result for News display
    */
    GetNewsDisplayData(objContext, arrNews, objSchool, arrTeacherData, arrPupilData) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrPupilProfileImages = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId)["Data"];
        let arrDisplayData = [];
        var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        for (let i = 0; i < (arrNews.length > 5 ? 5 : arrNews.length); i++) {
            let objNews = arrNews[i];
            let objDisplayData = {
                dtCreatedOn: new Date(objNews["dtCreatedOn"]).toLocaleDateString('de-DE', dateOptions),
                isGroup: false,
                vProfilePicPath: '',
                vNews: objNews["vText"],
                arrAttachments: objNews["t_LearnCoacher_News_Attachment"],
                vName: '',
                vFirstName: ''
            };
            let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == objNews["uUserId"]);

            if (objPupil) {
                objDisplayData.vName = objPupil["vName"];
                objDisplayData.vFirstName = objPupil["vFirstName"];
                let objPupilProfile = arrPupilProfileImages.find(proPic => proPic["uPupilId"] == objPupil["uPupilId"]);
                if (objPupilProfile)
                    objDisplayData.vProfilePicPath = objContext.props.JConfiguration.WebDataPath + objPupilProfile["vImagePath"];
            }

            if (objNews["cIsTeacher"] == "Y") {
                let objTeacher = arrTeacherData.find(tchr => tchr["uTeacherId"] == objNews["uUserId"]);
                if (objTeacher) {
                    objDisplayData.vName = objTeacher["vName"];
                    objDisplayData.vFirstName = objTeacher["vFirstName"];
                    objDisplayData.vProfilePicPath = objContext.props.JConfiguration.WebDataPath + "/Images/Common/Icons/ClassTeacher.svg";
                }

            }

            if (objNews["cIsSchool"] == "Y") {
                objDisplayData.vName = objSchool["vName"];
                objDisplayData.vFirstName = objSchool["vFirstName"];
                objDisplayData.vProfilePicPath = objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/School.svg";
            }

            arrDisplayData = [...arrDisplayData, objDisplayData];
        }
        return arrDisplayData;
    }

    /**
    * @name Navigate
    * @param {object} objContext Context object
    * @param {String} strType Type 
    * @summary Navigates to different modules based on Type
    */
    Navigate(objContext, strType) {
        let strMainNavigationName = "";
        let strSubNavigationName = "";
        let strMainNavigationId = "";
        let strSubNavigationId = "";
        switch (strType) {
            case 'OrientationTest': {
                strMainNavigationName = "Orientierungstest";
                strSubNavigationName = "TestLogins";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("Orientierungstest/TestLogins?IsOrientierungstest=Y", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'OrientationResult': {
                strMainNavigationName = "Orientierungstest";
                strSubNavigationName = "TestResults";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("Orientierungstest/TestResults?IsOrientierungstest=Y", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'HighStakeTest': {
                strMainNavigationName = "HighStakeRight";
                strSubNavigationName = "HighStakeTestLogins";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("HighStakeRight/HighStakeTestLogins?IsOrientierungstest=N", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'HighStakeResult': {
                strMainNavigationName = "HighStakeRight";
                strSubNavigationName = "HighStakeTestResults";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("HighStakeRight/HighStakeTestResults?IsOrientierungstest=N", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'LearningTest': {
                strMainNavigationName = "TeacherLearningTest";
                strSubNavigationName = "LearningTestSystem";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("TeacherLearningTest/LearningTestSystem", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'Document': {
                RouterHelper.RouteTo("TeacherDocument", objContext.props.history);
                break;
            }
            case 'News': {
                RouterHelper.RouteTo("TeacherNews", objContext.props.history);
                break;
            }
        }
    }

    /**
    * @name CloseInitialPopup
    * @param {object} objContext Context object
    * @summary Closes the initial popup
    */
    CloseInitialPopup(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnShowInitialPopup": false } });
    }

    /**
    * @name HandleNotificationCheck
    * @param {object} objContext Context object
    * @param {Boolean} blnIsChecked Is checkbox checked
    * @summary Toggles the handle notification checkbox and sets appropriate state
    */
    HandleNotificationCheck(objContext, blnIsChecked) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnIsChecked": blnIsChecked } });
    }

    /**
    * @name SaveShowInformationPopup
    * @param {object} objContext Context object
    * @param {Boolean} blnIsChecked Is checkbox checked
    * @summary Saves the configuration to show or not show the information popup
    */
    SaveShowInformationPopup(objContext, blnIsChecked) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let strValue = blnIsChecked ? "N" : "Y";
        let arrPreferenceValue = [];

        objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
            arrPreferenceValue = [...arrPreferenceValue, objTempPreference];
        });
        arrPreferenceValue = [...arrPreferenceValue, { "uUserPreferenceId": objUserPreference["uUserPreferenceId"], "vKey": "StartPageInformationPopup", "vValue": strValue }];

        var objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: arrPreferenceValue
        };

        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": props.ClientUserDetails.UserId
            },
            "vEditData": objNewUserPreference
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Cockpit_UserPreference.EditData(objUserPreferenceParams, () => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowInitialPopup": false } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
    * @name NavigateInformationPopup
    * @param {object} objContext Context object
    * @param {String} strType Type 
    * @summary Navigates to different modules based on Type
    */
    NavigateInformationPopup(objContext, strType) {
        let strMainNavigationName = "";
        let strServiceNavigationName = "";
        let strSubNavigationName = "";
        let strMainNavigationId = "";
        let strSubNavigationId = "";
        let strServiceNavigationId = "";
        switch (strType) {
            case 'ClassAndPupil': {
                strServiceNavigationName = "Verwalten";
                strSubNavigationName = "ClassAndPupil";
                strServiceNavigationId = "ExtranetServiceNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("Verwalten/ClassAndPupil", objContext.props.history, true, {
                    "ServiceNavigation": { "NavigationName": strServiceNavigationName, "Id": strServiceNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'PupilLogin': {
                strServiceNavigationName = "Verwalten";
                strSubNavigationName = "PupilLogin";
                strServiceNavigationId = "ExtranetServiceNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("Verwalten/PupilLogin", objContext.props.history, true, {
                    "ServiceNavigation": { "NavigationName": strServiceNavigationName, "Id": strServiceNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'OrientationTest': {
                strMainNavigationName = "Orientierungstest";
                strSubNavigationName = "TestLogins";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("Orientierungstest/TestLogins?IsOrientierungstest=Y", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'LearningTestSystem': {
                strMainNavigationName = "TeacherLearningTest";
                strSubNavigationName = "LearningTestSystem";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("TeacherLearningTest/LearningTestSystem", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'TimeTableSchedule': {
                strServiceNavigationName = "Verwalten";
                strSubNavigationName = "TimeTableSchedule";
                strServiceNavigationId = "ExtranetServiceNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("Verwalten/TimeTableSchedule", objContext.props.history, true, {
                    "ServiceNavigation": { "NavigationName": strServiceNavigationName, "Id": strServiceNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
            case 'LearningJournal': {
                strMainNavigationName = "TeacherLearningJournal";
                strSubNavigationName = "LearningJournal";
                strMainNavigationId = "ExtranetMainNavigation";
                strSubNavigationId = "ExtranetSubNavigation";
                RouterHelper.RouteTo("TeacherLearningJournal/LearningJournal", objContext.props.history, true, {
                    "MainNavigation": { "NavigationName": strMainNavigationName, "Id": strMainNavigationId },
                    "SubNavigation": { "NavigationName": strSubNavigationName, "Id": strSubNavigationId }
                });
                break;
            }
        }
    }

    /**
    * @name OpenSurveyPopup
    * @param {object} objContext Context object
    * @param {object} objTextResource Text resource object
    * @param {Array} arrSurveyQuestionData Survey Question Data
    * @summary Opens the survey popup
    */
    OpenSurveyPopup(objContext, objTextResource, arrSurveyQuestionData) {
        Popup.ShowPopup({
            Data: {
                objContext: objContext,
                objSurveyQuestionData: objContext.TeacherStartPage_ModuleProcessor.GetSurveyQuestion(arrSurveyQuestionData),
                strFeedbackTab: objContext.state.strFeedbackTab,
                Object_Extranet_Shared_Survey: objContext.props.Object_Extranet_Shared_Survey
            },
            Meta: {
                PopupName: 'SurveyPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
                UpdateFeedbackTab: (strFeedbackTab) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "strFeedbackTab": strFeedbackTab } });
                }
            },
            CallBacks: {}
        });
    }

    /**
    * @name OpenClientNewsPopup
    * @param {object} objContext Context object
    * @param {object} objTextResource Text resource object
    * @summary Opens the survey popup
    */
    OpenClientNewsPopup(objContext, objTextResource) {
        Popup.ShowPopup({
            Data: {
                //objContext: objContext,
                //objSurveyQuestionData: objContext.TeacherStartPage_ModuleProcessor.GetSurveyQuestion(arrSurveyQuestionData),
                //strFeedbackTab: objContext.state.strFeedbackTab,
                //Object_Extranet_Shared_Survey: objContext.props.Object_Extranet_Shared_Survey
            },
            Meta: {
                PopupName: 'ClientNewsPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                //Height: 112,
                //Width: 666
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
    * @name GetSurveyQuestion
    * @param {Array} arrSurveyQuestionData Survey Question Data
    * @summary Filter out the survey question object data object that matches with the language id
    * @returns {object} Survey question object data object
    */
    GetSurveyQuestion(arrSurveyQuestionData) {
        let strLanguageId = JConfiguration.InterfaceLanguageId;
        let objSurveyQuestionData = arrSurveyQuestionData[0].t_TestDrive_Member_MemberSurvey_Question_Data.find(objSurveyQuestionData => objSurveyQuestionData["iLanguageId"].toString() === strLanguageId.toString());
        return objSurveyQuestionData;
    }

    /**
    * @name ShowFeedbackStatus
    * @param {object} objContext Context object
    * @param {Array} arrSurveyData Survey Data
    * @param {Array} arrSurveyQuestionData Survey Question Data
    * @summary Checks if the current question is there or not. And if the question is having the answer. If answer is there then or no question is there then shouldn't show feedback.
    * @returns {boolean} returns boolean to show or not show the feedback
    */
    ShowFeedbackStatus(objContext, arrSurveyData, arrSurveyQuestionData) {
        let blnShowFeedback = true;
        let objSurveyQuestionData = arrSurveyQuestionData.length > 0 ? objContext.TeacherStartPage_ModuleProcessor.GetSurveyQuestion(arrSurveyQuestionData) : {};
        if (Object.keys(objSurveyQuestionData).length > 0) {
            arrSurveyData.map((objSurveyData) => {
                if (objSurveyData["uMemberSurveyQuestionId"] === objSurveyQuestionData["uMemberSurveyQuestionId"])
                    blnShowFeedback = false;
            });
        } else {
            blnShowFeedback = false;
        }
        return blnShowFeedback;
    }

    /**
    * @name CloseFeedback
    * @param {object} objContext Context object
    * @param {Array} arrSurveyQuestionData Survey Question Data
    * @summary Close the feedback banner permanently
    */
    CloseFeedback(objContext, arrSurveyQuestionData) {
        let strTeacherId = ClientUserDetails.UserId;
        let objSurveyQuestionData = objContext.TeacherStartPage_ModuleProcessor.GetSurveyQuestion(arrSurveyQuestionData);
        let objRequest = {
            "uMemberSurveyQuestionId": objSurveyQuestionData["uMemberSurveyQuestionId"],
            "cIsSurveyAnswered": "N",
            "cSurveyResponse": "",
            "iSurveyResponseNoCheckboxSelection": null,
            "vComments": "",
            "uUserId": strTeacherId
        };

        let objRequestData = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUserId": ClientUserDetails.UserId
                        }
                    }
                ]
            },
            "vAddData": [{ ...objRequest }]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Object_Extranet_Shared_Survey.AddData(objRequestData, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
    * @name ShowOnlineHelp
    * @summary Set the OnlineHelpGroupObject application state for OnlineHelp
    */
    ShowOnlineHelp() {
        //let objOnlineHelpObject = {
        //    HelpAction: "Open",
        //    HelpGroup: "TeacherStartPage",
        //    HelpKey: "TeacherStartPage"
        //};
        //ApplicationState.SetProperty("HelpData", objOnlineHelpObject);

        let objHelpView = {
            "HelpAction": "Open",
            "HelpGroup": "TeacherStartPage",
            "HelpKey": "TeacherStartPage"
        };
        ApplicationState.SetProperty("HelpData", objHelpView);
    }

    /**
    * @name CloseNewsTip
    * @param {object} objContext Context object
    * @summary Closes the news tips
    */
    CloseNewsTip(objContext) {
        ApplicationState.SetProperty("DontShowTips", true);
        //objContext.dispatch({ type: "SET_STATE", payload: { "blnShowNewsTip": false } });
    }

    /**
    * @name GetNewsTipData
    * @param {object} objContext Context object
    * @returns {Array} NewsTipData
    * @summary Returns array of active title objects
    */
    GetNewsTipData(objContext) {
        let strTeacherId = objContext.props.ClientUserDetails.UserId;
        let strApplicationTypeId = objContext.props.ClientUserDetails.ApplicationTypeId;
        let strMainClientId = objContext.props.ClientUserDetails.MainClientId;
        //return DataRef(objContext.props.Extranet_Teacher_Tip_Module, "Extranet_Teacher_Tip_Module;cIsActive;Y;cIsDeleted;N;iApplicationTypeId;1")["Data"];
        let arrNewsTipData = [];
        if (DataRef(objContext.props.Extranet_Teacher_Tip_Module, "Extranet_Teacher_Tip_Module;cIsActive;Y;cIsDeleted;N;iApplicationTypeId;" + strApplicationTypeId + ";iMainClientId;" + strMainClientId)) {
            arrNewsTipData = DataRef(objContext.props.Extranet_Teacher_Tip_Module, "Extranet_Teacher_Tip_Module;cIsActive;Y;cIsDeleted;N;iApplicationTypeId;" + strApplicationTypeId + ";iMainClientId;" + strMainClientId)["Data"];
        }
        return arrNewsTipData

    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": [
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/School.svg",
                props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/clock.gif'
            ]
        }
    }
}

export default TeacherStartPage_ModuleProcessor;