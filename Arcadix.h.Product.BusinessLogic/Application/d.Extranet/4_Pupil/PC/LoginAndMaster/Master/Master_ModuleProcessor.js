// React related imports.
import React from "react";

//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Module object imports.
import Object_Framework_Services_FrameworkNavigation from '@shared/Object/a.Framework/Services/Navigation/FrameworkNavigation';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import Object_Cockpit_UserPreferenceProfileImage from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage';
import Object_Cockpit_UserPreferenceBackgroundTheme from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceBackgroundTheme/UserPreferenceBackgroundTheme';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_Country from '@shared/Object/c.Cockpit/Country/Country';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_MainClient_MainClientCountry from '@shared/Object/c.Cockpit/MainClient/MainClientCountry/MainClientCountry';

//common imports.
import SignalRService from '@root/Application/d.Extranet/5_Shared/PC/Services/SignalRService/SignalRService';

//Extranet navigation
import Object_Framework_Services_ExtranetNavigation from '@shared/Object/a.Framework/Services/Navigation/ExtranetNavigation';

//Global declaration of the base files.
global.ExtranetBase_ModuleProcessor = ExtranetBase_ModuleProcessor;

/**
 * @name Master_ModuleProcessor
 * @summary module processor for Master Page.
 * */
class Master_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/LoginAndMaster/Master",
            "Object_Framework_Services_ExtranetNavigation",
            { "StoreKey": "ApplicationState", "DataKey": "NavigationFromHome" },
            { "StoreKey": "ApplicationState", "DataKey": "OutletData" },
            { "StoreKey": "ApplicationState", "DataKey": "RouterPathNavName" },
            { "StoreKey": "ApplicationState", "DataKey": "ProfileBackGroundImagePath" },
            "Object_Cockpit_Language",
            "Object_Cockpit_Country",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_MainClient_MainClientCountry",
            "Object_Extranet_Teacher_Class",
            "Object_Extranet_School_School"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        // (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //Text Resource
        Object_Framework_Services_TextResource.Initialize(["/d.Extranet/4_Pupil/LoginAndMaster/Master"]);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Navigation
        let objNavigationParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "ApplicationType": props.JConfiguration.ApplicationTypeId
                        }
                    }
                ]
            }
        };
        Object_Framework_Services_ExtranetNavigation.Initialize(objNavigationParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_ExtranetNavigation];

        //Language
        let objLanguageParam = {
            "SortKeys": [
                {
                    "iFrameworkLanguageId": {
                        "order": "asc"
                    }
                }
            ]
        }
        Object_Cockpit_Language.Initialize(objLanguageParam);
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //Country
        let objCountryParam = {
            "SortKeys": [
                {
                    "iCountryId": {
                        "order": "asc"
                    }
                }
            ]
        }
        Object_Cockpit_Country.Initialize(objCountryParam);
        // arrDataRequest = [...arrDataRequest, Object_Cockpit_Country];

        //MainClientLanguage
        let objMainClientLanguageParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": props.ClientUserDetails.MainClientId,
                        }
                    },
                    {
                        "match": {
                            "iApplicationTypeId": props.ClientUserDetails.ApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        }
        Object_Cockpit_MainClient_MainClientLanguage.Initialize(objMainClientLanguageParam);
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        //MainClientCountry
        let objMainClientCountryParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": props.ClientUserDetails.MainClientId,
                        }
                    },
                    {
                        "match": {
                            "iApplicationTypeId": props.ClientUserDetails.ApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        }
        Object_Cockpit_MainClient_MainClientCountry.Initialize(objMainClientCountryParam);
        // arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientCountry];

        let arrSchoolIdShouldKeys = props
            .ClientUserDetails
            .PupilDetails
            .t_TestDrive_Member_School_Pupil
            .filter(x => x["cIsDeleted"] == "N")
            .map(x => { return { match: { uSchoolId: x.uSchoolId } } });

        if (arrSchoolIdShouldKeys.length > 0) { // for external user only.
            let objSchoolParams = {
                SearchQuery: {
                    must: [
                        {
                            match: {
                                cIsDeleted: "N"
                            }
                        },
                        {
                            bool: {
                                should: arrSchoolIdShouldKeys
                            }
                        }
                    ]
                }
            };
            Object_Extranet_School_School.Initialize(objSchoolParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];
        }

        let arrClassIdSchouldKeys = props.ClientUserDetails.PupilDetails
            .t_TestDrive_Member_Class_Pupil
            .filter(x => x["cIsDeleted"] == "N")
            .map(x => { return { match: { uClassId: x.uClassId } } });

        if (arrClassIdSchouldKeys.length > 0) {
            let objClassParams = {
                SearchQuery: {
                    should: arrClassIdSchouldKeys
                }
            };
            Object_Extranet_Teacher_Class.Initialize(objClassParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];
        }

        this.GetUserPreferenceClass(props);

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        let arrDynamicStyles = [
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/DropDown/DropDown.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/1_LoginAndMaster/Master.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/Button/Button.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Help/Help.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css"
        ];

        if (JConfiguration.Performance) {
            arrDynamicStyles = [...arrDynamicStyles,
            props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"]
        }
        return arrDynamicStyles;
    }

    /**
    * @name GetUserPreferenceClass
    * @param {object} props Passes props
    * @summary Calls the ArcadixFetchData's Execute method to get the UserPreference and Class data and the calls the ArcadixCacheData's AddData method to store the response to the redux store. After that the SetUserPreference method is called to initilize the ApplicationStates.
    */
    GetUserPreferenceClass(props) {
        if (!props.IsForServerRenderHtml && !props.IsForServerRenderAPI) {
            let objUserPreferenceParams = {
                "ForeignKeyFilter": {
                    "uUserId": props.ClientUserDetails.UserId
                }
            };
            let objMasterModuleProcessor = this;
            Object_Cockpit_UserPreference.UserPreferenceGetData(objUserPreferenceParams, function (objReturnData) {
                let objUserPreferenceReturn = {
                    Filter: "Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId,
                    Value: {
                        Data: objReturnData["Object_Cockpit_UserPreference"]["Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId]["Data"],
                        TimeStamp: "",
                        PrimaryKeyName: "uUserPreferenceId",
                        Count: objReturnData["Object_Cockpit_UserPreference"]["Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId]["Data"].length
                    }
                };
                Object_Cockpit_UserPreference.UserPreferenceAddData(objUserPreferenceReturn, () => { });
                let arrUserPreferenceData = objReturnData["Object_Cockpit_UserPreference"]["Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId]["Data"];
                objMasterModuleProcessor.SetUserPreference(props, arrUserPreferenceData);
                objMasterModuleProcessor.AssignSignalREventListener(props);
            });
        }
    }

    /**
     * @name AssignSignalREventListener
     * @param {any} props
     * @summary Creates a new connection to SignalR service and listens to that
     */
    AssignSignalREventListener(props) {
        let strClassId = props.ClientUserDetails.SelectedClassId;
        let arrClass = global.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.filter(objClass => objClass["uClassId"] == strClassId);
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        if (strSchoolId == undefined || strSchoolId.length == 0) {
            let objSchool = ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil.filter(objSchool => objSchool["cIsDeleted"] == 'N')[0];
            strSchoolId = objSchool ? objSchool["uSchoolId"] : "";
        }

        let objSignalRService = new SignalRService();
        objSignalRService.EventListener(arrClass, strSchoolId, props.ClientUserDetails.UserId);
    }


    /**
       * @name SetUserPreference
       * @summary sets the userpreference values to Application state
       * @param {any} props props
       * @param {any} arrUserPreferenceData arrUserPreferenceData
       */
    SetUserPreference(props, arrUserPreferenceData) {
        let objUserPreference = {};
        let arrUserPreference = arrUserPreferenceData; //DataRef(objContext.props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        var strBackGroundThemePath = '';
        var strProfileImagePath = '';
        if (arrUserPreference.length > 0) //Checks for the user preference for logged in teacher.
        {
            let objBackGroundTheme = {};
            let objProfile = {};
            objUserPreference = arrUserPreference[0];
            ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.           

            let objUserPreferenceBackGroundProfileThemeParams = {
                ForeignKeyFilter: {
                    "uUserId": props.ClientUserDetails.UserId
                }
            };
            let objDefaultUserPreferenceBackGroundProfileThemeParams = {
                ForeignKeyFilter: {
                    "uUserId": "00000000-0000-0000-0000-000000000000"
                }
            };


            let arrDataRequest = [
                {
                    "URL": "API/Object/Cockpit/UserPreferenceBackgroundTheme",
                    "Params": objUserPreferenceBackGroundProfileThemeParams,
                    "MethodType": "Get",
                    "UseFullName": true
                },
                {
                    "URL": "API/Object/Cockpit/UserPreferenceProfileImage",
                    "Params": objUserPreferenceBackGroundProfileThemeParams,
                    "MethodType": "Get",
                    "UseFullName": true
                },
                {
                    "URL": "API/Object/Cockpit/UserPreferenceBackgroundTheme",
                    "Params": objDefaultUserPreferenceBackGroundProfileThemeParams,
                    "MethodType": "Get",
                    "UseFullName": true
                },
                {
                    "URL": "API/Object/Cockpit/UserPreferenceProfileImage",
                    "Params": objDefaultUserPreferenceBackGroundProfileThemeParams,
                    "MethodType": "Get",
                    "UseFullName": true
                }
            ];

            ArcadixFetchData.Execute(arrDataRequest, (objReturnData) => {
                objBackGroundTheme = objReturnData["Object_Cockpit_UserPreferenceBackgroundTheme"]["Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + props.ClientUserDetails.UserId]["Data"].find(objItem => objItem["uBackgroundThemeId"] === objUserPreference["uBackgroundThemeId"]);
                if (objBackGroundTheme) {
                    strBackGroundThemePath = props.JConfiguration.WebDataPath + "Repo/BackGroundTheme/" + props.JConfiguration.MainClientId + "/" + props.ClientUserDetails.UserId + "/" + objBackGroundTheme["uBackgroundThemeId"] + "_" + objBackGroundTheme["vBackgroundFileVersion"] + "." + objBackGroundTheme["vBackgroundFileType"];
                }
                else {
                    let arrDefaultBackGroundTheme = objReturnData["Object_Cockpit_UserPreferenceBackgroundTheme"]["Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000"]["Data"];
                    objBackGroundTheme = arrDefaultBackGroundTheme.find(objItem => objItem["uBackgroundThemeId"] === objUserPreference["uBackgroundThemeId"]);
                    if (!objBackGroundTheme) {
                        objBackGroundTheme = arrDefaultBackGroundTheme[0];
                    }
                    if (objBackGroundTheme)
                        strBackGroundThemePath = props.JConfiguration.WebDataPath + "Repo/BackGroundTheme/0/00000000-0000-0000-0000-000000000000/" + objBackGroundTheme["uBackgroundThemeId"] + "_" + objBackGroundTheme["vBackgroundFileVersion"] + "." + objBackGroundTheme["vBackgroundFileType"];
                }
                objProfile = objReturnData["Object_Cockpit_UserPreferenceProfileImage"]["Object_Cockpit_UserPreferenceProfileImage;uUserId;" + props.ClientUserDetails.UserId]["Data"].find(objItem => objItem["uProfileImageId"] === objUserPreference["uProfileImageId"]);
                if (objProfile) {
                    strProfileImagePath = props.JConfiguration.WebDataPath + "Repo/LearncoacherProfilePicture/" + props.JConfiguration.MainClientId + "/" + props.ClientUserDetails.UserId + "/" + objProfile["uProfileImageId"] + "_" + objProfile["iFileVersion"] + "." + objProfile["vFileType"];
                }
                else {
                    let arrDefaultProfile = objReturnData["Object_Cockpit_UserPreferenceProfileImage"]["Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000"]["Data"];
                    objProfile = arrDefaultProfile.find(objItem => objItem["uProfileImageId"] === objUserPreference["uProfileImageId"]);
                    if (!objProfile) {
                        objProfile = objReturnData["Object_Cockpit_UserPreferenceProfileImage"]["Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000"]["Data"][0];
                    }
                    strProfileImagePath = props.JConfiguration.WebDataPath + "Repo/LearncoacherProfilePicture/0/00000000-0000-0000-0000-000000000000/" + objProfile["uProfileImageId"] + "_" + objProfile["iFileVersion"] + "." + objProfile["vFileType"];
                }
                ApplicationState.SetProperty("ProfileBackGroundImagePath", { BackgroundThemePath: strBackGroundThemePath, ProfileImagePath: strProfileImagePath });
            });
        }
        else //This is executed when user preference is not set for logged in teacher
        {
            let objNewUserPreference = this.GetDefaultUserPreference(props);
            let objUserPreferenceAddParams = { ["vAddData"]: objNewUserPreference };

            Object_Cockpit_UserPreference.AddData(objUserPreferenceAddParams, function (objNewReturn) { //Sets the class id of first active class to user preference.
                arrUserPreference = objNewReturn["Object_Cockpit_UserPreference"]["Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId.toLowerCase()].Data; //Extracts User Preference data.
                ApplicationState.SetProperty("UserPreferenceObject", arrUserPreference[0]); //Sets the UserPreferenceObject to application state.
            });

            let objDefaultUserPreferenceBackGroundProfileThemeParams = {
                ForeignKeyFilter: {
                    "uUserId": "00000000-0000-0000-0000-000000000000"
                }
            };

            let arrDataRequest = [
                {
                    "URL": "API/Object/Cockpit/UserPreferenceBackgroundTheme",
                    "Params": objDefaultUserPreferenceBackGroundProfileThemeParams,
                    "MethodType": "Get",
                    "UseFullName": true
                },
                {
                    "URL": "API/Object/Cockpit/UserPreferenceProfileImage",
                    "Params": objDefaultUserPreferenceBackGroundProfileThemeParams,
                    "MethodType": "Get",
                    "UseFullName": true
                }
            ];

            ArcadixFetchData.Execute(arrDataRequest, (objReturnData) => {
                let objBackGroundTheme = objReturnData["Object_Cockpit_UserPreferenceBackgroundTheme"]["Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000"]["Data"][0];
                if (objBackGroundTheme)
                    strBackGroundThemePath = props.JConfiguration.WebDataPath + "Repo/BackGroundTheme/0/00000000-0000-0000-0000-000000000000/" + objBackGroundTheme["uBackgroundThemeId"] + "_" + objBackGroundTheme["vBackgroundFileVersion"] + "." + objBackGroundTheme["vBackgroundFileType"];

                let objProfile = objReturnData["Object_Cockpit_UserPreferenceProfileImage"]["Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000"]["Data"][0];
                if (objProfile)
                    strProfileImagePath = props.JConfiguration.WebDataPath + "Repo/LearncoacherProfilePicture/0/00000000-0000-0000-0000-000000000000/" + objProfile["uProfileImageId"] + "_" + objProfile["iFileVersion"] + "." + objProfile["vFileType"];
                ApplicationState.SetProperty("ProfileBackGroundImagePath", { BackgroundThemePath: strBackGroundThemePath, ProfileImagePath: strProfileImagePath });
            });
        }
    }

    /**
     * @name GetDefaultUserPreference
     * @param {object} props Passes props
     * @param {String} strClassId Class Id
     * @summary Forms a defualt userPreference object.
     * @returns {object} default user preference
    */
    GetDefaultUserPreference(props) {

        return {
            "iApplicationTypeId": parseInt(props.JConfiguration.ApplicationTypeId),
            "uUserId": props.ClientUserDetails.UserId,
            "iWindowHeight": null,
            "iWindowWidth": null,
            "iGridSize": null,
            "iLanguageId": parseInt(props.JConfiguration.InterfaceLanguageId),
            "iTreeWidth": null,
            "cUseWindowPopup": "Y",
            "uNavigationSkinId": null,
            "uBackgroundThemeId": null,
            "uProfileImageId": null,
            "t_Framework_UserPreference_PreferenceValue": []
        };
    }

    /**
     * @name OnClickLogout
     * @summary makes the api call to clear session.
     * @param {any} objContext objContext
     */
    OnClickLogout(objContext) {
        let cIsExternalMember = (objContext.props.ClientUserDetails.PupilDetails["cIsExternalMember"] != null && objContext.props.ClientUserDetails.PupilDetails["cIsExternalMember"] == "Y") ? "Y" : "N";
        let objParams = {
            "cIsExternalMember": cIsExternalMember
        }
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/Logout", "POST", objParams)
            .then(response => response.json())
            .then(objResponse => {
                let strBaseUrl = objContext.props.JConfiguration.BaseUrl.substring(0, objContext.props.JConfiguration.BaseUrl.length - 1);
                window.location = strBaseUrl;
            });
    }

    /**
     * @name GetTopLeftDropdownEvents
     * @summary Gets Events for Top Left Dropdown
     * @param {any} objTextResource objTextResource
     * @param {any} objEventHandlers objEventHandlers
     * @returns {*} array
     */
    GetTopLeftDropdownEvents(objTextResource, objEventHandlers) {
        const arrEvents = [
            { OptionText: objTextResource["MyProfile"], EventHandler: objEventHandlers.OnProfileServiceNavigationClick },
            { OptionText: objTextResource["LogOut"], EventHandler: objEventHandlers.OnClickLogout }
        ];

        return arrEvents;
    }

    /**
     * @name HandleSchoolChange
     * @summary updates the selected school
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     */
    HandleSchoolChange(objContext, objItem) {
        ApplicationState.SetProperty("SelectedSchoolId", objItem.SchoolId);
        objContext.dispatch({ type: "SET_STATE", payload: { strSelectedSchoolId: objItem.SchoolId } });
    }

    /**
     * @name HandleClassChange
     * @summary updates the selected school
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     */
    HandleClassChange(objContext, objItem) {
        let strClassId = objItem.ClassId;
        objContext.Master_ModuleProcessor.UpdateClassIdInUserPreference(objContext, strClassId);
        ApplicationState.SetProperty("SelectedClassId", strClassId);
        objContext.dispatch({ type: "SET_STATE", payload: { strSelectedClassId: strClassId } });
    }

    /**
   * @name UpdateClassIdInUserPreference
   * @param {*} objContext objContext
   * @param {*} strClassId ClassId to update
   * @summary Updates ClassId in User preference object
   */
    UpdateClassIdInUserPreference(objContext, strClassId) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let strSchoolId = objContext.state.strSelectedSchoolId
        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": ClientUserDetails.UserId
            }
        };
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                if (objTempPreference["vKey"] === "CurrentSelectedClassId_" + strSchoolId.toUpperCase()) {
                    return { ...objTempPreference, "vValue": strClassId };
                }
                else {
                    return objTempPreference;
                }
            })
        };
        let objUserPreferenceModifiedParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Cockpit_UserPreference.EditData(objUserPreferenceModifiedParams, function (objReturn) {
            ApplicationState.SetProperty("blnShowAnimation", false)
            ApplicationState.SetProperty("UserPreferenceObject", objReturn[0]); //Sets the UserPreferenceObject to application state.
        });
    }

    /**
     * @name GetFilteredSchool
     * @summary returns the filetered school
     * @param {any} props props
     * @return {*} array
     */
    GetFilteredSchool(objContext) {
        let arrSchools = objContext.props.ClientUserDetails.PupilDetails
            .t_TestDrive_Member_School_Pupil
            .filter(x => x["cIsDeleted"] == "N");

        let arrFilteredSchoolData = [];
        if (arrSchools.length > 0) {
            let arrSchoolData = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;cIsDeleted;N")["Data"];
            arrFilteredSchoolData = arrSchoolData
                .map(x => {
                    return {
                        SchoolId: x.uSchoolId,
                        SchoolName: x.vFirstName + " " + x.vName
                    };
                });
        }
        return arrFilteredSchoolData;
    }

    /**
     * @name GetFilteredClass
     * @summary returns the filetered school
     * @param {any} props props
     * @return {*} array
     */
    GetFilteredClass(objContext) {
        let arrFilteredClassId = objContext.props.ClientUserDetails.PupilDetails
            .t_TestDrive_Member_Class_Pupil
            .filter(x => x["cIsDeleted"] == "N")
            .map(x => x["uClassId"]);

        let arrFilteredClassData = [];
        if (arrFilteredClassId.length > 0) {
            let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class")["Data"];
            arrFilteredClassData = arrClassData
                .filter(x => x["t_TestDrive_Member_Class_Teacher"].filter(y => y["uSchoolId"] == objContext.state.strSelectedSchoolId && y["cIsDeleted"] == "N").length > 0)
                .map(x => {
                    return {
                        ClassId: x.uClassId,
                        ClassName: x.vClassName
                    };
                });
        }
        return arrFilteredClassData;
    }

    /**
     * @name GetMetaDataSchoolDropdown
     * @summary this function is used to get the school meta data
     * @returns {*} the dropdown meta data
     * */
    GetMetaDataSchoolDropdown() {
        return {
            "DisplayColumn": "SchoolName",
            "ValueColumn": "SchoolId",
            "ShowDefaultOption": false
        };
    }

    /**
   * @name GetMetaDataClassDropdown
   * @summary this function is used to get the school meta data
   * @returns {*} the dropdown meta data
   * */
    GetMetaDataClassDropdown() {
        return {
            "DisplayColumn": "ClassName",
            "ValueColumn": "ClassId",
            "ShowDefaultOption": false
        };
    }

    /**
     * @name GetResourceDataDropdown
     * @summary this is the resource data 
     * @returns {*} this dropdown returns the resource data
     * */
    GetResourceDataDropdown() {
        return {
            Text: {
                "DefaultOptionTextKey_Text": "Please select"
            },
            ImagePath: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/angle_down_white.svg",
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name GetEventsForSchoolDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsForSchoolDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { objContext.Master_ModuleProcessor.HandleSchoolChange(objContext, objItem); }
        };
    }

    /**
    * @name GetEventsForClassDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsForClassDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { objContext.Master_ModuleProcessor.HandleClassChange(objContext, objItem); }
        };
    }

    /**
    * @name HandleDropDownChange
    * @param {any} objContext
    * @param {any} objChangeData
    */
    HandleDropDownChange(objChangeData) {
        let strUrl = window.location.href;
        if (objChangeData.iFrameworkLanguageId) {
            if (objChangeData.iFrameworkLanguageId == -1) {
                window.location.href = strUrl.toString().split('?')[0];
            }
            window.location.href = QueryString.SetQueryStringValue(strUrl, "LanguageCultureInfo", objChangeData["vLanguageCultureInfo"]);
        }
        if (objChangeData.iCountryId) {
            if (objChangeData.iCountryId == -1) {
                window.location.href = strUrl.toString().split('?')[0];
            }
            window.location.href = QueryString.SetQueryStringValue(strUrl, "CountryCultureInfo", objChangeData["vCountryCultureInfo"]);
        }
    }

    GetFilteredLanguageData(arrLanguageData, arrMainClientLanguageData) {
        let arrFilteredLanguageData = [];

        arrLanguageData.map(objLanguageData => {
            if (objLanguageData["cIsDeleted"] == "N" && arrMainClientLanguageData.find(obj => obj["iLanguageId"] == objLanguageData["iFrameworkLanguageId"]) ? true : false)
                arrFilteredLanguageData = [...arrFilteredLanguageData, objLanguageData];
        });

        return arrFilteredLanguageData;
    }

    /**
    * @name LoadModuleForSSR
    * @param {any} objContext
    * @summary Loads the Module for SSR based on the URL
    */
    LoadModuleForSSR(objContext) {
        let strComponentName = objContext.props.UrlPath ? objContext.props.UrlPath.split("/")[objContext.props.UrlPath.split("/").length - 1] : "";
        if (strComponentName == "" && DataRef(objContext.props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)) {
            //let arrNavigationData = this.GetNavigationData(objContext);
            //let arrMainNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == 0);

            //if (arrMainNavigationData[0]["URL"] != "" && arrMainNavigationData[0]["URL"] != undefined) {
            //    strComponentName = arrMainNavigationData[0]["NavigationName"];
            //}
            //else {
            //    let strActiveMainNavigationId = arrMainNavigationData[0]["NavigationId"];
            //    let arrSubNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == strActiveMainNavigationId);
            //    strComponentName = arrSubNavigationData[0]["NavigationName"];
            //}
            strComponentName = "Home";
        }
        let arrServerRenderedModules = objContext.props.ApplicationStateData?.FullServerRenderedModules ?? [];
        if (arrServerRenderedModules.filter(strComponent => strComponent == strComponentName).length == 0) {
            arrServerRenderedModules = [...arrServerRenderedModules, strComponentName];
            ApplicationState.SetProperty("FullServerRenderedModules", arrServerRenderedModules);
        }
        let Component = objContext.props.ComponentController.GetComponent(strComponentName);
        return <div type="RDiv">< Component
            {...objContext.props} /></div>;
    }

    /**
    * @name GetNavigationData
    * @param {any} objContext
    * @summary Gets the navigation data for PM
    */
    GetNavigationData(objContext) {
        let arrNavigation = DataRef(objContext.props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let blnIsDevMode = false;
        if (objContext.props.IsForServerRenderHtml) {
            blnIsDevMode = objContext.props.IsForServerRenderHtml && objContext.props.QueryStringObject && objContext.props.QueryStringObject.IsDevMode == "Y"
        }
        else {
            let objUrlParams = new URLSearchParams(window.location.search);
            blnIsDevMode = objUrlParams.get('IsDevMode') === 'Y';
        }
        arrNavigationData = arrNavigationData.filter(obj => !obj["ProjectIdentifier"] || blnIsDevMode || (obj["ProjectIdentifier"] && obj["ProjectIdentifier"].split(",").includes(JConfiguration.ProjectIdentifier)));
        return arrNavigationData;
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default Master_ModuleProcessor;