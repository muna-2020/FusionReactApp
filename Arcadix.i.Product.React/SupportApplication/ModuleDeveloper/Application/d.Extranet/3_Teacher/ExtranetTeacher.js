////React related imports
//import React, { useState } from 'react';

////Module related imports
//import ApplicationType from '@root/Application/c.Cockpit/PC/Modules/MainClient/ApplicationType/ApplicationType'
//import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

////Service related import
//import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
//import TestDriveFetchAndCacheData from '@shared/Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';
//import TestDriveFetchData from '@shared/Framework/DataService/TestDriveFetchData/TestDriveFetchData';
//import TeacherStartPage from '@root/Application/d.Extranet/3_teacher/PC/Modules/TeacherStartPage/TeacherStartPage'
////import Dropdown from "@root/Framework/Controls_New/Dropdowns/Dropdown/Dropdown";
////import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';
////import FillHeight from '@root/Framework/Controls_New/FillHeight/FillHeight';

////if (Dropdown.DynamicStyles) {
////    Dropdown.DynamicStyles({ JConfiguration }).map((objItem) => {
////        LoadDynamicStyles(objItem);
////    });
////}
////if (ClassDropDown.DynamicStyles) {
////    ClassDropDown.DynamicStyles({ JConfiguration }).map((objItem) => {
////        LoadDynamicStyles(objItem);
////    });
////}
////if (FillHeight.DynamicStyles) {
////    FillHeight.DynamicStyles({ JConfiguration }).map((objItem) => {
////        LoadDynamicStyles(objItem);
////    });
////}
//if (TeacherStartPage.DynamicStyles) {
//    TeacherStartPage.DynamicStyles({ JConfiguration }).map((objItem) => {
//        LoadDynamicStyles(objItem);
//    });
//}

//const GetContetnt = () => {
//    const [IsDataLoaded, SetDataLoaded] = useState(false);
//    if (JConfiguration.ApplicationTypeId === "1")//This checks if the appliaction is TeacherExtranet.
//    {
//        let objClassParams = {
//            ["ForeignKeyFilter"]: {
//                "t_TestDrive_Member_Class_Teacher.uTeacherId": ClientUserDetails.UserId,
//                "Type": "nested"
//            }
//        };
//        let objUserPreferenceParams = {
//            "ForeignKeyFilter": {
//                "uUserId": ClientUserDetails.UserId
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
//        let objTestDriveFetchAndCacheData = new TestDriveFetchAndCacheData();
//        TestDriveFetchData.Execute(arrParams, function (objReturn) {
//            let strClassId = "";
//            let objUserPreference = {};
//            let strClassFilterKey = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + ClientUserDetails.UserId;
//            let strUserPreferenceFilterKey = "Object_Cockpit_UserPreference;uUserId;" + ClientUserDetails.UserId;
//            let arrClassData = objReturn["Object_Extranet_Teacher_Class"][strClassFilterKey].Data; //Extract Classes.
//            let arrUserPreference = objReturn["Object_Cockpit_UserPreference"][strUserPreferenceFilterKey].Data; //Extract UserPreference.
//            let arrActiveClasses = GetActiveClasses(arrClassData); //Get all the non deleted classes for the current logged in teacher.
//            if (arrUserPreference.length > 0) //Checks for the user preference for logged in teacher.
//            {
//                objUserPreference = arrUserPreference[0];
//                let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempUserPreferenceValue => objTempUserPreferenceValue["vKey"] === "CurrentSelectedClassId");
//                if (arrUserPreferenceValue.length > 0) //Check if 'CurrentSelectedClassId' object is present in the user preference's sub-table.
//                {
//                    strClassId = arrUserPreferenceValue[0]["vValue"];
//                    if (arrActiveClasses.findIndex(objClassDetails => objClassDetails.uClassId === strClassId) < 0) //Check wether the currently set user preference class id is of deleted class or active class.
//                    {
//                        strClassId = arrActiveClasses[0]["uClassId"];
//                        let objNewUserPreference = {
//                            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
//                                return objTempPreference["vKey"] === "CurrentSelectedClassId" ? { ...objTempPreference, "vValue": strClassId } : objTempPreference
//                            })
//                        };
//                        let objUserPreferenceEditParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
//                        let arrNewUserPreferenceEditParams = [{
//                            "URL": "API/Object/Framework/UserPreference/UserPreference",
//                            "Params": objUserPreferenceEditParams,
//                            "MethodType": "Put",
//                        }];
//                        objTestDriveFetchAndCacheData.Execute(arrNewUserPreferenceEditParams, function (objReturn) { }); //Sets the class id of first active class to user preference.
//                        ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
//                        ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
//                    }
//                    else {
//                        ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
//                        ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
//                    }
//                    SetDataLoaded(true);
//                    return (<TeacherStartPage JConfiguration={JConfiguration} ClientUserDetails={ClientUserDetails} />);
//                }
//                else //This is executed when the 'CurrentSelectedClassId' object is not present in the user preference's sub-table.
//                {
//                    strClassId = arrActiveClasses[0]["uClassId"];
//                    let objNewUserPreference = { ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreference["t_Framework_UserPreference_PreferenceValue"], { "vKey": "CurrentSelectedClassId", "vValue": strClassId }] };
//                    let objUserPreferenceEditParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
//                    let arrNewUserPreferenceEditParams = [{
//                        "URL": "API/Object/Framework/UserPreference/UserPreference",
//                        "Params": objUserPreferenceEditParams,
//                        "MethodType": "Put",
//                    }];
//                    objTestDriveFetchAndCacheData.Execute(arrNewUserPreferenceEditParams, function (objReturn) { }); //Sets the class id of first active class to user preference.
//                    ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
//                    ApplicationState.SetProperty("UserPreferenceObject", objNewUserPreference); //Sets the UserPreferenceObject to application state.
//                    SetDataLoaded(true);
//                    return (<TeacherStartPage JConfiguration={JConfiguration} ClientUserDetails={ClientUserDetails} />);
//                }
//            }
//            else //This is executed when user preference is not set for logged in teacher
//            {
//                strClassId = arrActiveClasses[0]["uClassId"];
//                let objNewUserPreference = GetDefaultUserPreference(ClientUserDetails, strClassId);
//                let objUserPreferenceAddParams = { ...objUserPreferenceParams, ["vAddData"]: objNewUserPreference };
//                let arrNewUserPreferenceAddParams = [{
//                    "URL": "API/Object/Framework/UserPreference/UserPreference",
//                    "Params": objUserPreferenceAddParams,
//                    "MethodType": "Post",
//                }];
//                objTestDriveFetchAndCacheData.Execute(arrNewUserPreferenceAddParams, function (objReturn) { //Sets the class id of first active class to user preference.
//                    arrUserPreference = objReturn[strUserPreferenceFilterKey.toLowerCase()]; //Extracts User Preference data.
//                    ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
//                    ApplicationState.SetProperty("UserPreferenceObject", arrUserPreference[0]); //Sets the UserPreferenceObject to application state.
//                    SetDataLoaded(true);
//                    return (<TeacherStartPage JConfiguration={JConfiguration} ClientUserDetails={ClientUserDetails} />);
//                });
//            }
//        });
//    }
//    //else {
//    //    return (<ReactFragment></ReactFragment>);
//    //}
//    return IsDataLoaded ? <TeacherStartPage JConfiguration={JConfiguration} ClientUserDetails={ClientUserDetails} /> :  < React.Fragment />;
//}

//function GetActiveClasses(arrClassData) //Filters classes on their activation status.
//{
//    let arrActiveClassData = arrClassData.map((objClassDetails) => {
//        return { ...objClassDetails, ["t_TestDrive_Member_Class_Teacher"]: objClassDetails.t_TestDrive_Member_Class_Teacher.filter(objClassTeacherDetails => objClassTeacherDetails.cIsDeleted === "N") }
//    }).filter(objClassDetails => { return objClassDetails["t_TestDrive_Member_Class_Teacher"].length > 0 });
//    return arrActiveClassData
//}

//function GetDefaultUserPreference(ClientUserDetails, strClassId) //Returns a defualt userPreference object.
//{
//    return {
//        "iApplicationTypeId": parseInt(JConfiguration.ApplicationTypeId),
//        "uUserId": ClientUserDetails.UserId,
//        "iWindowHeight": null,
//        "iWindowWidth": null,
//        "iGridSize": null,
//        "iLanguageId": parseInt(JConfiguration.InterfaceLanguageId),
//        "iTreeWidth": null,
//        "cUseWindowPopup": "Y",
//        "uNavigationSkinId": null,
//        "uBackgroundThemeId": null,
//        "uProfileImageId": null,
//        "t_Framework_UserPreference_PreferenceValue": [
//            {
//                "vKey": "CurrentSelectedClassId",
//                "vValue": strClassId,
//            }
//        ]
//    }
//}

///**
// * @name ExtranetSchool
// * @param {object} Props Props
// * @summary imports the module that need to wrapped up in main.
// * @returns {Jsx} Returs the application specific Component to be loaded.
// */
//const ExtranetSchool = (props) => {
//    return GetContetnt();
//}

//export default ExtranetSchool;