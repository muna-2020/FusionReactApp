//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Module object imports.
import Object_Framework_Services_FrameworkNavigation from '@shared/Object/a.Framework/Services/Navigation/FrameworkNavigation';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_Country from '@shared/Object/c.Cockpit/Country/Country';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_MainClient_MainClientCountry from '@shared/Object/c.Cockpit/MainClient/MainClientCountry/MainClientCountry';

import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//Global declaration of the base files.
global.ExtranetBase_ModuleProcessor = ExtranetBase_ModuleProcessor;

//common imports.
import SignalRService from '@root/Application/d.Extranet/5_Shared/PC/Services/SignalRService/SignalRService';

//Extranet navigation
import Object_Framework_Services_ExtranetNavigation from '@shared/Object/a.Framework/Services/Navigation/ExtranetNavigation';
import * as Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';

// React related imports.
import React from "react";

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
            { "StoreKey": "ApplicationState", "DataKey": "RouterPath" },
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/LoginAndMaster/Master",
            "Object_Framework_Services_ExtranetNavigation",
            "Object_Cockpit_Language",
            "Object_Cockpit_Country",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_MainClient_MainClientCountry"
            //{ "StoreKey": "ApplicationState", "DataKey": "ShowHelp" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        ///(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            this.GetUserPreferenceClass(objContext);
            let strSchoolId = objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"];
            GetStateIdBasedOnSchool(strSchoolId);
        } else {
            this.GetUserPreference(objContext);
        }
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
        let arrResourcePath = ["/d.Extranet/2_School/LoginAndMaster/Master"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
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
            },
        }
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
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

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
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Country];

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
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

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
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientCountry];

        return arrDataRequest;
    }


    /**
     * @name GetDynamicStlyes
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        let arrDynamicStyles = [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/LoginAndMaster/Master.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDown/DropDown.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/Button/Button.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Help/Help.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/LoginAndMaster/Master/TopLeftMenu/TopLeftMenu.css"
        ];
        if (props.JConfiguration.Performance) {
            arrDynamicStyles = [...arrDynamicStyles, props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
        }
        return arrDynamicStyles;
    }

    /**
    * @name GetUserPreferenceClass
    * @param {object} props Passes props
    * @summary Calls the ArcadixFetchData's Execute method to get the UserPreference and Class data and the calls the ArcadixCacheData's AddData method to store the response to the redux store. After that the SetUserPreference method is called to initilize the ApplicationStates.
    */
    GetUserPreferenceClass(objContext) {
        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            }
        };

        let objClassParams = {
            ["ForeignKeyFilter"]: {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                "Type": "nested"
            }
        };

        var arrDataRequest = [
            {
                "URL": "API/Object/Cockpit/UserPreference",
                "Params": objUserPreferenceParams,
                "MethodType": "Get",
                "UseFullName": true
            },
            {
                "URL": "API/Object/Extranet/Teacher/Class",
                "Params": objClassParams,
                "MethodType": "Get",
                "UseFullName": true
            }
        ];

        let objClass = this;

        ArcadixFetchData.Execute(arrDataRequest, function (objReturnData) {
            console.log("GetUserPreferenceClass ", objReturnData);
            let strUserPreferenceFilter = "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId;
            let objUserPreferenceReturn = {
                Filter: strUserPreferenceFilter,
                Value: {
                    Data: objReturnData["Object_Cockpit_UserPreference"][strUserPreferenceFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uUserPreferenceId",
                    Count: objReturnData["Object_Cockpit_UserPreference"][strUserPreferenceFilter]["Data"].length
                }
            };
            ArcadixCacheData.AddData("Object_Cockpit_UserPreference", objUserPreferenceReturn, () => { });

            let strClassFilter = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId;
            let objClassReturn = {
                Filter: strClassFilter,
                Value: {
                    Data: objReturnData["Object_Extranet_Teacher_Class"][strClassFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uClassId",
                    Count: objReturnData["Object_Extranet_Teacher_Class"][strClassFilter]["Data"].length
                }
            };
            ArcadixCacheData.AddData("Object_Extranet_Teacher_Class", objClassReturn, () => { });

            let objClassData = objReturnData["Object_Extranet_Teacher_Class"][strClassFilter]["Data"];
            let objUserPreferenceData = objReturnData["Object_Cockpit_UserPreference"][strUserPreferenceFilter]["Data"];
            objClass.SetUserPreference(objContext, objClassData, objUserPreferenceData);

            //Creating new SignalR connection and Adding SignalR Event Listener
            let objSignalRService = new SignalRService();
            objSignalRService.EventListener(objReturnData["Object_Extranet_Teacher_Class"][strClassFilter]["Data"], ClientUserDetails.TeacherDetails["uSchoolId"], "");

            // Registering Events for test logins.
            if (objContext.props.JConfiguration.ApplicationTypeId === "1")
                objSignalRService.EventListenerForTestTokens(objReturnData["Object_Extranet_Teacher_Class"][strClassFilter]["Data"]);
        });
    }

    /**
     * @name HandleTabletNavigation
     * @summary hide and show tablet navigation.
     * @param {any} objContext
     */
    HandleTabletNavigation(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnShowTabletNavigation": !objContext.state.blnShowTabletNavigation } });
    }

    /**
     * @name ShowOrHidePerformance
     * @summary hide and show performance component.
     * @param {any} objContext
     */
    ShowOrHidePerformance(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnShowPerformance": !objContext.state.blnShowPerformance } });
    }

    /**
     * @name ChooseTopLeftMenu
     * @param {any} objContext
     * @param {any} strLeftMenuToShow
     */
    ChooseTopLeftMenu(objContext, strLeftMenuToShow) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strLeftMenuToShow": strLeftMenuToShow, "blnShowLeftMenu": (strLeftMenuToShow != objContext.state.strLeftMenuToShow || !objContext.state.blnShowLeftMenu) ? true : false } });
    }

    /**
     * @name HandleSchoolChange
     * @summary updates the selected school
     * @param {any} objContext
     * @param {any} objItem
     */
    HandleSchoolChange(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { strSelectedSchoolId: objItem.SchoolId } });
    }

    /**
     * @name GetFilteredSchool
     * @param {object} props Passes the props
     * @summary returns the filetered school     
     * @returns {Array} SchoolData
     */
    GetFilteredSchool(props) {
        let arrSchoolData = props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School.filter(x => x["cIsDeleted"] == "N");
        return arrSchoolData.length > 1 ? arrSchoolData : [];
    }

    /**
     * @name GetFilterNavigationByExternalUser
     * @summary for keycloack removing some navigations
     * @param {any} objContext
     * @param {any} arrAllNavigation
     */
    GetFilterNavigationByExternalUser(objContext, arrAllNavigation) {
        let arrFilteredNavigation = arrAllNavigation.map(nav => { return { ...nav } });
        if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
            let blnExcludeStudentPlanModule = true;
            if (objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") {
                let blnIsAdminTeacher = Teacher.GetIsAdminTeacher(objContext.props.ClientUserDetails.TeacherDetails, "");
                if (blnIsAdminTeacher) {
                    blnExcludeStudentPlanModule = false;
                }
                arrFilteredNavigation = arrFilteredNavigation.filter(nav => (nav["NavigationName"] != "AssignClassType"));
            }
            if (blnExcludeStudentPlanModule) {
                arrFilteredNavigation = arrFilteredNavigation.filter(nav => nav["NavigationName"] != "TimeTableSettings");
            }
        }
        return arrFilteredNavigation;
    }

    /**
     * @name SetUserPreference
     * @summary sets the userpreference values to Application state
     * @param {any} objContext
     */
    SetUserPreference(objContext, objClassData, objUserPreferenceData) {
        let strClassId = "";
        let objUserPreference = {};
        let strUserPreferenceFilterKey = "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId;
        let arrClassData = objClassData;//DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"] //Extract Classes.
        let arrUserPreference = objUserPreferenceData; //DataRef(objContext.props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        let arrActiveClasses = this.GetActiveClasses(arrClassData); //Get all the non deleted classes for the current logged in teacher.
        if (arrUserPreference.length > 0) //Checks for the user preference for logged in teacher.
        {
            objUserPreference = arrUserPreference[0];
            let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempUserPreferenceValue => objTempUserPreferenceValue["vKey"] === "CurrentSelectedClassId");
            if (arrUserPreferenceValue.length > 0) //Check if 'CurrentSelectedClassId' object is present in the user preference's sub-table.
            {
                strClassId = arrUserPreferenceValue[0]["vValue"];
                if (arrActiveClasses.findIndex(objClassDetails => objClassDetails.uClassId === strClassId) < 0) //Check wether the currently set user preference class id is of deleted class or active class.
                {
                    if (arrActiveClasses.length > 0) {
                        strClassId = arrActiveClasses[0]["uClassId"];
                        let objNewUserPreference = {
                            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                                return objTempPreference["vKey"] === "CurrentSelectedClassId" ? { ...objTempPreference, "vValue": strClassId } : objTempPreference
                            })
                        };
                        let objUserPreferenceEditParams = { ["vEditData"]: objNewUserPreference };
                        Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams) //Sets the class id of first active class to user preference.
                        ApplicationState.SetProperty("SelectedClassId", strClassId);
                        objContext.dispatch({ type: 'SET_STATE', payload: { blnClassIsSet: true } })//Sets active class id to application state.
                        ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
                    } else {
                        strClassId = "00000000-0000-0000-0000-000000000000";
                        ApplicationState.SetProperty("SelectedClassId", strClassId);
                        objContext.dispatch({ type: 'SET_STATE', payload: { blnClassIsSet: true } })//Sets active class id to application state.
                        ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
                    }
                }
                else {
                    ApplicationState.SetProperty("SelectedClassId", strClassId);
                    objContext.dispatch({ type: 'SET_STATE', payload: { blnClassIsSet: true } })//Sets active class id to application state.
                    ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
                }
            }
            else //This is executed when the 'CurrentSelectedClassId' object is not present in the user preference's sub-table.
            {
                strClassId = arrActiveClasses[0]["uClassId"];
                let objNewUserPreference = { ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreference["t_Framework_UserPreference_PreferenceValue"], { "vKey": "CurrentSelectedClassId", "vValue": strClassId }] };
                let objUserPreferenceEditParams = { ["vEditData"]: objNewUserPreference };
                Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams) //Sets the class id of first active class to user preference.
                ApplicationState.SetProperty("SelectedClassId", strClassId);
                objContext.dispatch({ type: 'SET_STATE', payload: { blnClassIsSet: true } })//Sets active class id to application state.
                ApplicationState.SetProperty("UserPreferenceObject", objNewUserPreference); //Sets the UserPreferenceObject to application state.
            }
        }
        else //This is executed when user preference is not set for logged in teacher
        {
            if (arrActiveClasses.length > 0) {
                strClassId = arrActiveClasses[0]["uClassId"];
                let objNewUserPreference = this.GetDefaultUserPreference(objContext.props, strClassId);
                let objUserPreferenceAddParams = {
                    ["vAddData"]: objNewUserPreference,
                    "ForeignKeyFilter": {
                        "uUserId": objContext.props.ClientUserDetails.UserId
                    }
                };
                Object_Cockpit_UserPreference.AddData(objUserPreferenceAddParams, function (objNewReturn) { //Sets the class id of first active class to user preference.
                    arrUserPreference = objNewReturn;// objNewReturn["Object_Cockpit_UserPreference"][strUserPreferenceFilterKey].Data; //Extracts User Preference data.
                    ApplicationState.SetProperty("SelectedClassId", strClassId);
                    objContext.dispatch({ type: 'SET_STATE', payload: { blnClassIsSet: true } })//Sets active class id to application state.
                    ApplicationState.SetProperty("UserPreferenceObject", arrUserPreference[0]); //Sets the UserPreferenceObject to application state.
                });
            }
            else {
                strClassId = "00000000-0000-0000-0000-000000000000";
                ApplicationState.SetProperty("SelectedClassId", strClassId);
                let objNewUserPreference = this.GetDefaultUserPreference(objContext.props, strClassId);
                ApplicationState.SetProperty("UserPreferenceObject", objNewUserPreference);
                objContext.dispatch({ type: 'SET_STATE', payload: { blnClassIsSet: true } })//Sets active class id to application state.
            }
        }
    }


    /**
    * @name GetActiveClasses
    * @param {Array} arrClassData Class Data
    * @summary Filters classes on their activation status. 
    * @returns {Array} Active Class Data
    */
    GetActiveClasses(arrClassData) {
        let arrActiveClassData = arrClassData.map((objClassDetails) => {
            return { ...objClassDetails, ["t_TestDrive_Member_Class_Teacher"]: objClassDetails.t_TestDrive_Member_Class_Teacher.filter(objClassTeacherDetails => objClassTeacherDetails.cIsDeleted === "N") }
        }).filter(objClassDetails => { return objClassDetails["t_TestDrive_Member_Class_Teacher"].length > 0 });
        return arrActiveClassData;
    }

    /**
    * @name GetDefaultUserPreference
    * @param {object} props Passes props
    * @param {String} strClassId Class Id
    * @summary Forms a defualt userPreference object.
    * @returns {object} default user preference
    */
    GetDefaultUserPreference(props, strClassId) {
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
            "t_Framework_UserPreference_PreferenceValue": [
                {
                    "vKey": "CurrentSelectedClassId",
                    "vValue": strClassId
                }
            ]
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

        if (arrLanguageData != undefined) {
            arrLanguageData.map(objLanguageData => {
                if (objLanguageData["cIsDeleted"] == "N" && arrMainClientLanguageData.find(obj => obj["iLanguageId"] == objLanguageData["iFrameworkLanguageId"]) ? true : false)
                    arrFilteredLanguageData = [...arrFilteredLanguageData, objLanguageData];
            });
        }
        return arrFilteredLanguageData;
    }

    /**
    * @name GetUserPreferenceClass
    * @param {object} props Passes props
    * @summary Calls the ArcadixFetchData's Execute method to get the UserPreference 
    */
    GetUserPreference(objContext) {
        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            }
        };

        var arrDataRequest = [
            {
                "URL": "API/Object/Cockpit/UserPreference",
                "Params": objUserPreferenceParams,
                "MethodType": "Get",
                "UseFullName": true
            }
        ];

        ArcadixFetchData.Execute(arrDataRequest, function (objReturnData) {
            console.log("GetUserPreferenceClass ", objReturnData);
            let strUserPreferenceFilter = "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId;
            let objUserPreferenceReturn = {
                Filter: strUserPreferenceFilter,
                Value: {
                    Data: objReturnData["Object_Cockpit_UserPreference"][strUserPreferenceFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uUserPreferenceId",
                    Count: objReturnData["Object_Cockpit_UserPreference"][strUserPreferenceFilter]["Data"].length
                }
            };
            ArcadixCacheData.AddData("Object_Cockpit_UserPreference", objUserPreferenceReturn, () => { });
            objContext.Master_ModuleProcessor.SetUserPreferenceInSchool(objContext, objReturnData["Object_Cockpit_UserPreference"][strUserPreferenceFilter]["Data"][0])
        });
    }

    /**
     * @name SetUserPreference
     * @summary sets the userpreference values to Application state
     * @param {any} objContext
     */
    SetUserPreferenceInSchool(objContext, objUserPreferenceData) {
        if (objUserPreferenceData) //Checks for the user preference for logged in teacher.
        {
            ApplicationState.SetProperty("UserPreferenceObject", objUserPreferenceData);
        }
        else {
            let objNewUserPreference = { ...this.GetDefaultUserPreference(objContext.props, null), t_Framework_UserPreference_PreferenceValue: [] };
            let objUserPreferenceAddParams = {
                ["vAddData"]: objNewUserPreference,
                "ForeignKeyFilter": {
                    "uUserId": objContext.props.ClientUserDetails.UserId
                }
            };
            Object_Cockpit_UserPreference.AddData(objUserPreferenceAddParams, function (objNewReturn) {
                ApplicationState.SetProperty("UserPreferenceObject", objNewReturn[0]);
            });
        }
    }

    /**
    * @name LoadModuleForSSR
    * @param {any} objContext
    * @summary Loads the Module for SSR based on the URL
    */
    LoadModuleForSSR(objContext) {
        if (objContext.props.UrlPath != undefined) {
            let strComponentName = objContext.props.UrlPath.split("/")[objContext.props.UrlPath.split("/").length - 1]
            if (strComponentName == "" && DataRef(objContext.props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)) {
                let arrNavigationData = this.GetNavigationData(objContext);
                let arrMainNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == 0);

                if (arrMainNavigationData[0]["URL"] != "" && arrMainNavigationData[0]["URL"] != undefined) {
                    strComponentName = arrMainNavigationData[0]["NavigationName"];
                }
                else {
                    let strActiveMainNavigationId = arrMainNavigationData[0]["NavigationId"];
                    let arrSubNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == strActiveMainNavigationId);
                    strComponentName = arrSubNavigationData[0]["NavigationName"];
                }
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
}

export default Master_ModuleProcessor;