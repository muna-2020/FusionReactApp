import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * Map StateToProps Function
 * @param {any} state default state
 * @summary Maps required Entity and ApplicationState members to the component
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            OutletData: state.ApplicationState.OutletData,
            //ActiveMainNavigationId: state.ApplicationState.ActiveMainNavigationId,
            frameworknavigation: DataRef(state.Entity, "Object_Framework_Services_FrameworkNavigation", true),
            textresource: DataRef(state.Entity, "Object_Framework_Services_TextResource", true),
            school: DataRef(state.Entity, "school", true)
        };
    }
    else {
        return {};
    }
}

/**
 * Default InitialDataParams Method
 * @param {any} JConfiguration Jconfiguration
 * @param {any} props Props for this entity
 * @summary Forms queries for getting intial data for navigation and textresources
 * @returns {object} object containing data calls params
 */
export function InitialDataParams(props) {
    var objParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "ApplicationType": props.JConfiguration.ApplicationTypeId
                    }
                }
            ]
        },
    };
    var objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": props.JConfiguration.LanguageCultureInfo + "/" + props.JConfiguration.ApplicationFolderName.replace("Application/","") + "/LoginAndMaster/Master"
                    }
                }
            ]
        }
    };
    var arrDataRequest = [
        {
            "URL": "API/Object/Framework/Services/FrameworkNavigation",
            "Params": objParams,
            "MethodType": "Get",
            "UseFullName": true
        },
        {
            "URL": "API/Object/Framework/Services/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true,
            "UseFullName": true
        }
    ];
    
    return { "DataCalls": arrDataRequest };
}

/**
 * @summary Makes Data Call from Initial Params Method
 * This method will make the Execute api call 
 * @param {any} props
 */
export function DataCall(props, arrParams, strToggleExecute = "FetchAndCacheExecute") {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
        case 'FetchExecuteForUserPreference':
            let objUserPreferenceParams = { ...{ ...arrParams[1] }["Params"] };
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let strClassId = "";
                let objUserPreference = {};
                let strClassFilterKey = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId;
                let strUserPreferenceFilterKey = "Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId;
                let arrClassData = objReturn["Object_Extranet_Teacher_Class"][strClassFilterKey].Data; //Extract Classes.
                let arrUserPreference = objReturn["Object_Cockpit_UserPreference"][strUserPreferenceFilterKey].Data; //Extract UserPreference.
                let arrActiveClasses = GetActiveClasses(arrClassData); //Get all the non deleted classes for the current logged in teacher.
                if (arrUserPreference.length > 0) //Checks for the user preference for logged in teacher.
                {
                    objUserPreference = arrUserPreference[0];
                    let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempUserPreferenceValue => objTempUserPreferenceValue["vKey"] === "CurrentSelectedClassId");
                    if (arrUserPreferenceValue.length > 0) //Check if 'CurrentSelectedClassId' object is present in the user preference's sub-table.
                    {
                        strClassId = arrUserPreferenceValue[0]["vValue"];
                        if (arrActiveClasses.findIndex(objClassDetails => objClassDetails.uClassId === strClassId) < 0) //Check wether the currently set user preference class id is of deleted class or active class.
                        {
                            strClassId = arrActiveClasses[0]["uClassId"];
                            let objNewUserPreference = {
                                ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                                    return objTempPreference["vKey"] === "CurrentSelectedClassId" ? { ...objTempPreference, "vValue": strClassId } : objTempPreference
                                })
                            };
                            let objUserPreferenceEditParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
                            let arrNewUserPreferenceEditParams = [{
                                "URL": "API/Object/Framework/UserPreference/UserPreference",
                                "Params": objUserPreferenceEditParams,
                                "MethodType": "Put",
                            }];
                            objArcadixFetchAndCacheData.Execute(arrNewUserPreferenceEditParams, function (objReturn) { }); //Sets the class id of first active class to user preference.
                            ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                            ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
                        }
                        else {
                            ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                            ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
                        }
                    }
                    else //This is executed when the 'CurrentSelectedClassId' object is not present in the user preference's sub-table.
                    {
                        strClassId = arrActiveClasses[0]["uClassId"];
                        let objNewUserPreference = { ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreference["t_Framework_UserPreference_PreferenceValue"], { "vKey": "CurrentSelectedClassId", "vValue": strClassId }] };
                        let objUserPreferenceEditParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
                        let arrNewUserPreferenceEditParams = [{
                            "URL": "API/Object/Framework/UserPreference/UserPreference",
                            "Params": objUserPreferenceEditParams,
                            "MethodType": "Put",
                        }];
                        objArcadixFetchAndCacheData.Execute(arrNewUserPreferenceEditParams, function (objReturn) { }); //Sets the class id of first active class to user preference.
                        ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                        ApplicationState.SetProperty("UserPreferenceObject", objNewUserPreference); //Sets the UserPreferenceObject to application state.
                    }
                }
                else //This is executed when user preference is not set for logged in teacher
                {
                    strClassId = arrActiveClasses[0]["uClassId"];
                    let objNewUserPreference = GetDefaultUserPreference(props, strClassId);
                    let objUserPreferenceAddParams = { ...objUserPreferenceParams, ["vAddData"]: objNewUserPreference };
                    let arrNewUserPreferenceAddParams = [{
                        "URL": "API/Object/Framework/UserPreference/UserPreference",
                        "Params": objUserPreferenceAddParams,
                        "MethodType": "Post",
                    }];
                    ArcadixFetchData.Execute(arrNewUserPreferenceAddParams, function (objNewReturn) { //Sets the class id of first active class to user preference.
                        arrUserPreference = objNewReturn["userpreference"][strUserPreferenceFilterKey.toLowerCase()].Data; //Extracts User Preference data.
                        ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                        ApplicationState.SetProperty("UserPreferenceObject", arrUserPreference[0]); //Sets the UserPreferenceObject to application state.
                    });
                }
            });
            break
        case 'FetchExecuteCustomForLogout'://For log out
            ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/Logout", "POST", {})
                .then(response => response.json())
                .then(objResponse => {
                    let strBaseUrl = props.JConfiguration.BaseUrl.substring(0, props.JConfiguration.BaseUrl.length - 1);
                    window.location = strBaseUrl;
                });
            break;
    }
}

/**
 * @summary Custom hook which will carry out the data call portion and take care of re-rendering on prop/state changes
 * @param {any} props
 */
//export function useDataLoader(props) {
//    const getRequiredData = () => {
//        let objClassParams = {
//            ["ForeignKeyFilter"]: {
//                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
//                "Type": "nested"
//            }
//        };
//        let objUserPreferenceParams = {
//            "ForeignKeyFilter": {
//                "uUserId": props.ClientUserDetails.UserId
//            }
//        };

//        let arrParams = [ //Do not change the order
//            {
//                "URL": "API/Object/Extranet/Teacher/Class",
//                "Params": objClassParams,
//                "MethodType": "Get",
//            },
//            {
//                "URL": "API/Object/Framework/UserPreference/UserPreference",
//                "Params": objUserPreferenceParams,
//                "MethodType": "Get",
//            }
//        ];

//        if (props.JConfiguration.ApplicationTypeId === "1") {

//            let arrSchoolIdShouldKeys = props
//                .ClientUserDetails
//                .TeacherDetails
//                .t_TestDrive_Member_Teacher_School
//                .filter(x => x["cIsDeleted"] == "N")
//                .map(x => { return { match: { uSchoolId: x.uSchoolId } } });

//            if (arrSchoolIdShouldKeys.length > 1) {
//                arrParams.push({
//                    URL: "Object/Extranet/School",
//                    Params: {
//                        SearchQuery: {
//                            must: [
//                                {
//                                    match: {
//                                        cIsDeleted: "N"
//                                    }
//                                }
//                            ],
//                            bool: {
//                                should: arrSchoolIdShouldKeys
//                            }
//                        }
//                    }
//                });
//            }

//        }
//        DataCall(props, InitialDataParams(props.JConfiguration, props).DataCalls);
//    };
//    useLayoutEffect(getRequiredData, []);
//}

export function useDataLoader(props) {
    const getRequiredData = () => {
        DataCall(props, InitialDataParams(props).DataCalls);
        if (props.JConfiguration.ApplicationTypeId === "1") {
            let objClassParams = {
                ["ForeignKeyFilter"]: {
                    "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                    "Type": "nested"
                }
            };
            let objUserPreferenceParams = {
                "ForeignKeyFilter": {
                    "uUserId": props.ClientUserDetails.UserId
                }
            };
            let arrSchoolIdShouldKeys = props
                .ClientUserDetails
                .TeacherDetails
                .t_TestDrive_Member_Teacher_School
                .filter(x => x["cIsDeleted"] == "N")
                .map(x => { return { match: { uSchoolId: x.uSchoolId } } });

            if (arrSchoolIdShouldKeys.length > 1) {
                arrParams.push({
                    URL: "Object/Extranet/School",
                    Params: {
                        SearchQuery: {
                            must: [
                                {
                                    match: {
                                        cIsDeleted: "N"
                                    }
                                }
                            ],
                            bool: {
                                should: arrSchoolIdShouldKeys
                            }
                        }
                    }
                });
            }
            let arrParams = [ //Do not change the order
                {
                    "URL": "API/Object/Extranet/Teacher/Class",
                    "Params": objClassParams,
                    "MethodType": "Get",
                },
                {
                    "URL": "API/Object/Framework/UserPreference/UserPreference",
                    "Params": objUserPreferenceParams,
                    "MethodType": "Get",
                }
            ];
            DataCall(props, arrParams, "FetchExecuteForUserPreference");
        }
    };
    useLayoutEffect(getRequiredData, []);
}

export function GetTextResource(props) {
    let objTextResource = DataRef(props.textresource, "Object_Framework_Services_TextResource;Id;de/" + props.JConfiguration.ApplicationFolderName.replace("Application/", "") + "/LoginAndMaster/Master")["Data"][0]["Master"];
    return objTextResource;
}


function CheckDataLoadedForSchool(props) {
    let isDataLoaded = false;
    if (props.JConfiguration.ApplicationTypeId === "1" && props
        .ClientUserDetails
        .TeacherDetails
        .t_TestDrive_Member_Teacher_School
        .filter(x => x["cIsDeleted"] == "N").length > 1) {
        if (DataRef(props.school, "school;cisdeleted;n")) {
            isDataLoaded = true;
        }
    } else {
        isDataLoaded = true;
    }

    return isDataLoaded;
}


/**
 * @summary Custom hook which will check if all the data is loaded
 * @param {any} props
 * @param {any} state
 * @param {any} dispatch
 */
export function useDataLoaded(props, state, dispatch) {
    //let arrSchoolIdShouldKeys = props
    //    .ClientUserDetails
    //    .TeacherDetails
    //    .t_TestDrive_Member_Teacher_School
    //    .filter(x => x["cIsDeleted"] == "N")
    //    .map(x => { return { match: { uSchoolId: x.uSchoolId } } });
    useEffect(() => {
        if (!state.isLoadComplete &&
            // DataRef(props.frameworknavigation, "frameworknavigation;iapplicationtypeid;" + props.JConfiguration.ApplicationTypeId + ";itargetdeviceid;" + props.JConfiguration.TargetDeviceId) &&
            DataRef(props.frameworknavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId) &&
            DataRef(props.textresource, "Object_Framework_Services_TextResource;Id;de/" + props.JConfiguration.ApplicationFolderName.replace("Application/", "") + "/LoginAndMaster/Master") &&
            CheckDataLoadedForSchool(props)) {
            dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
           // ApplicationState.SetProperty("blnShowAnimation", false);
        }
        else {
            console.log("data is loading")
        }
    }, [
            props.frameworknavigation,
            props.textresource,
            props.school
        ]);
}

/**
 * 
 * @param {*} arrClassData 
 * @summary   Filters classes on their activation status.
 */
function GetActiveClasses(arrClassData) {
    let arrActiveClassData = arrClassData.map((objClassDetails) => {
        return { ...objClassDetails, ["t_TestDrive_Member_Class_Teacher"]: objClassDetails.t_TestDrive_Member_Class_Teacher.filter(objClassTeacherDetails => objClassTeacherDetails.cIsDeleted === "N") }
    }).filter(objClassDetails => { return objClassDetails["t_TestDrive_Member_Class_Teacher"].length > 0 });
    return arrActiveClassData
}

/**
 * 
 * @param {*} ClientUserDetails 
 * @param {*} strClassId 
 * @summary   Returns a defualt userPreference object.
 */
function GetDefaultUserPreference(props, strClassId) {
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
    }
}

export const ShowOrHidePerformance = (objContext) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnShowPerformance": !objContext.state.blnShowPerformance } });
}

export const ChooseTopLeftMenu = (objContext, strLeftMenuToShow) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strLeftMenuToShow": strLeftMenuToShow } });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnShowLeftMenu": (strLeftMenuToShow != objContext.state.strLeftMenuToShow || !objContext.state.blnShowLeftMenu) ? true : false } });
}


/**
 * @summary reducer to maintain component state
 * @param {any} state
 * @param {any} action
 */
export function reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload };
        }
        case 'SET_STATE_VALUES': {
            return { ...state, ...action.payload };
        }
    }
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        blnShowPerformance: false
    }
}

/**
 * @summary Gets Events for Top Left Dropdown
 * @param {any} props 
 */
export function GetTopLeftDropdownEvents(props, objEventHandlers) {

    const objTextResourceData = DataRef(props.textresource, "Object_Framework_Services_TextResource;Id;de/" + props.JConfiguration.ApplicationFolderName.replace("Application/", "") + "/LoginAndMaster/Master").Data[0].Master;


    const arrEvents = [
        { OptionText: objTextResourceData["MyProfile"], EventHandler: objEventHandlers.OnProfileServiceNavigationClick },
        { OptionText: objTextResourceData["LogOut"], EventHandler: objEventHandlers.OnLogoutClick }
    ];
    return arrEvents;
}

export function HandleSchoolChange(objContext, objItem) {
    objContext.dispatch({ type: "strSelectedSchoolId", payload: objItem.SchoolId });
}

export function GetFilteredSchool(props) {
    let arrSchools = props
        .ClientUserDetails
        .TeacherDetails
        .t_TestDrive_Member_Teacher_School
        .filter(x => x["cIsDeleted"] == "N");
    //.map(x => x.uSchoolId);
    let arrFilteredSchoolData = [];
    if (arrSchools.length > 1) {
        let arrSchoolData = DataRef(props.arrTeacherSchoolData, "school;cisdeleted;n")["Data"];
        arrFilteredSchoolData = arrSchoolData
            //.filter(x => arrSchoolIds.indexOf(x["uSchoolId"]) > -1)
            .map(x => {
                return {
                    SchoolId: x.uSchoolId,
                    SchoolName: x.vFirstName + " " + x.vName
                }
            });
    }
    return arrFilteredSchoolData;
}
