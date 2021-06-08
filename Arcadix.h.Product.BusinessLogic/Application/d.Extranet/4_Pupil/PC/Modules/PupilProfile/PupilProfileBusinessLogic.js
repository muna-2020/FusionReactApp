import { useEffect, useLayoutEffect } from "react";
import ArcadixFetchAndCacheData, { DataRef } from "@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData";
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";
/**
 *
 * @param {*} state
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            userpreferenceprofileimage: DataRef(state.Entity, "userpreferenceprofileimage", true),
            userpreferencebackgroundtheme: DataRef(state.Entity, "userpreferencebackgroundtheme", true),
            textresource: DataRef(state.Entity, "textresource", true),
            userpreference: DataRef(state.Entity, "userpreference", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    } else {
        return {};
    }
}

/**
 *
 * @param {*} JConfiguration
 * @param {*} props
 * @summary   Get initials request params for the component.
 * 
 */
export function InitialDataParams(JConfiguration, props) {
    var objDefaultProfileImage = {
        ForeignKeyFilter: {
            "uUserId": "00000000-0000-0000-0000-000000000000"
        }
    };

    var objUserPreferenceProfileImage = {
        ForeignKeyFilter: {
            "uUserId": props.ClientUserDetails.UserId
        }
    };

    var objDefaultBackgroundThemes = {
        ForeignKeyFilter: {
            "uUserId": "00000000-0000-0000-0000-000000000000"
        }
    };

    var objUserPreferenceBackgroundThemes = {
        ForeignKeyFilter: {
            "uUserId": props.ClientUserDetails.UserId
        }
    };

    var objResourceParams = {
        SearchQuery: {
            must: [
                {
                    match: {
                        Id:
                            JConfiguration.LanguageCultureInfo +
                            "/d.Extranet/4_Pupil/Modules/PupilProfile"
                    }
                }
            ]
        }
    };
    /**
     * last selected item by same user is saved under userprefernce
     */
    var objUserPreference = {
        ForeignKeyFilter: {
            "uUserId": props.ClientUserDetails.UserId
        }
    };

    var arrDataRequest = [
        {
            URL: "API/Object/Framework/Blocks/TextResource",
            Params: objResourceParams,
            ReturnDataOnServerRender: true,
            MethodType: "Get"
        },
        {
            URL: "API/Object/Framework/UserPreference/UserPreferenceBackgroundTheme",
            Params: objDefaultBackgroundThemes,
            MethodType: "Get"
        },
        {
            URL: "API/Object/Framework/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage",
            Params: objDefaultProfileImage,
            MethodType: "Get"
        },
        {
            URL: "API/Object/Framework/UserPreference/UserPreferenceBackgroundTheme",
            Params: objUserPreferenceBackgroundThemes,
            MethodType: "Get"
        },
        {
            URL: "API/Object/Framework/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage",
            Params: objUserPreferenceProfileImage,
            MethodType: "Get"
        },
        {
            URL: "API/Object/Framework/UserPreference/UserPreference",
            Params: objUserPreference,
            MethodType: "Get"
        }
    ];
    return {
        DataCalls: arrDataRequest
    };
}

/**
 *
 * @param {*} arrDataRequest
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams, strToggleExecute = "FetchAndCacheExecute") {
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
        case 'FetchExecute':
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
    }
}

/**
 *
 * @param {*} objContext
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        Logger.Log("Getting initial data");
        DataCall(
            InitialDataParams(objContext.props.JConfiguration, objContext.props)
                .DataCalls
        );
    };
    useLayoutEffect(GetRequiredData, []);
}

export function OnClickBack(objContext) {
    var pushUrl = objContext.props.JConfiguration.VirtualDirName + 'Home';
    objContext.props.history.push({ pathname: pushUrl });
}

/**
 *
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useLayoutEffect(() => {
        if (
            DataRef(objContext.props.userpreferenceprofileimage, "userpreferenceprofileimage;uuserid;00000000-0000-0000-0000-000000000000") &&
            DataRef(objContext.props.userpreferenceprofileimage, "userpreferenceprofileimage;uuserid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.userpreferencebackgroundtheme, "userpreferencebackgroundtheme;uuserid;00000000-0000-0000-0000-000000000000") &&
            DataRef(objContext.props.userpreferencebackgroundtheme, "userpreferencebackgroundtheme;uuserid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.userpreference, "userpreference;uuserid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.textresource, "textresource;id;de/d.extranet/4_pupil/modules/pupilprofile")
        ) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
    }, [
            objContext.props.userpreferenceprofileimage,
            objContext.props.userpreferencebackgroundtheme,
            objContext.props.userpreference,
            objContext.props.textresource
        ]);
}

/**
 * @summary Delete background theme only if it the userid not default 
 */
let arrStoreBackgroundTheme = []; //gets the background image from store
let arrDeleteBackgroundThemeIds = []; //deleted ids
export function DeleteBackGroundTheme(objContext, objTextResource) {
    arrStoreBackgroundTheme = DataRef(objContext.props.userpreferencebackgroundtheme, "userpreferencebackgroundtheme;uuserid;" + objContext.props.ClientUserDetails.UserId)["Data"];
    arrDeleteBackgroundThemeIds = [...arrDeleteBackgroundThemeIds, objContext.state.objSelectedBackgroundId];
    let arrNewBackgroundTheme = [];
    let arrBackgroundTheme = objContext.state.arrBackgroundTheme.filter((objItem) => {
        return objItem["uBackgroundThemeId"] === objContext.state.objSelectedBackgroundId
    });
    let arrValidBackgroundTheme = arrBackgroundTheme.filter((objItem) => {
        return objItem["uUserId"] !== "00000000-0000-0000-0000-000000000000" //filter and get the matched row which has been clicked
    });
    if (arrValidBackgroundTheme.length === 0) {
        objContext.props.showPopup({
            MaxHeight: '210px',
            MaxWidth: '320px',
            popUpMinHeight: '210px',
            popUpMinWidth: '320px',
            showHeader: false,
            popUpName: 'ErrorPopup',
            passedEvents: {
                objTextResource: objTextResource
            },
            headerTitle: '',
            popupClassName: 'errordefaultimagemessage',
            Data: {}
        });
    }
    else {
        if (arrBackgroundTheme.length > 0) {
            arrNewBackgroundTheme = objContext.state.arrBackgroundTheme.filter((objItem) => {
                return objItem["uBackgroundThemeId"] !== objContext.state.objSelectedBackgroundId
            });
        }
        else {
            arrNewBackgroundTheme = objContext.state.arrBackgroundTheme.filter((objItem) => {
                if (objItem["FileName"]) {
                    if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedBackgroundId) {
                        return objItem;
                    }
                }
                else return objItem;
            });
        }
        let arrNewUploadedBackgroundTheme = objContext.state.arrUploadedBackgroundTheme.filter((objItem) => {
            if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedBackgroundId) {
                return objItem;
            }
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrBackgroundTheme": arrNewBackgroundTheme, "arrUploadedBackgroundTheme": arrNewUploadedBackgroundTheme } });
    }
}

/**
 * @summary Delete profileimage only if it the userid not default 
 */
let arrStoreProfileImage = [];
let arrDeleteProfileImageIds = [];
export function DeleteProfileImage(objContext, objTextResource) {
    arrStoreProfileImage = DataRef(objContext.props.userpreferenceprofileimage, "userpreferenceprofileimage;uuserid;" + objContext.props.ClientUserDetails.UserId)["Data"];
    arrDeleteProfileImageIds = [...arrDeleteProfileImageIds, objContext.state.objSelectedProfileImageId];
    let arrNewProfileImage = [];
    let arrProfileImage = objContext.state.arrProfileImage.filter((objItem) => { //filter and get the matched row which has been clicked
        return objItem["uProfileImageId"] === objContext.state.objSelectedProfileImageId
    });
    let arrValidProfileImage = arrProfileImage.filter((objItem) => {
        return objItem["uUserId"] !== "00000000-0000-0000-0000-000000000000";
    });
    if (arrValidProfileImage.length === 0) {
        objContext.props.showPopup({
            MaxHeight: '210px',
            MaxWidth: '320px',
            popUpMinHeight: '210px',
            popUpMinWidth: '320px',
            showHeader: false,
            popUpName: 'errormessagedeletedefaultimage',
            passedEvents: {
                objTextResource: objTextResource
            },
            headerTitle: '',
            popupClassName: 'errordefaultimagemessage',
            Data: {}
        });
    }
    else {
        if (arrProfileImage.length > 0) {
            arrNewProfileImage = objContext.state.arrProfileImage.filter((objItem) => {
                return objItem["uProfileImageId"] !== objContext.state.objSelectedProfileImageId
            });
        }
        else {
            arrNewProfileImage = objContext.state.arrProfileImage.filter((objItem) => {
                if (objItem["FileName"]) {
                    if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedProfileImageId) {
                        return objItem;
                    }
                }
                else return objItem;
            });
        }
        let arrNewUploadedProfileImage = objContext.state.arrUploadedProfileImage.filter((objItem) => {
            if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedProfileImageId) {
                return objItem;
            }
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrProfileImage": arrNewProfileImage, "arrUploadedProfileImage": arrNewUploadedProfileImage } });
    }
}

function GetUploadedProfileImageData(objContext) {
    let arrProfileImageUploaded = [];
    objContext.state.arrUploadedProfileImage.map(objItem => {
        let objTemp = {
            "uProfileImageId": "00000000-0000-0000-0000-000000000000",
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "vFileName": objItem.FileName,
            "iFileSize": objItem.ContentLength,
            "vFileType": objItem.FileName.split('.')[1],
            "iFileVersion": 1,
            "cIsDefault": null,
            "cIsSelected": "N",
            "cIsDeleted": "N"
        };
        arrProfileImageUploaded = [...arrProfileImageUploaded, objTemp];
    });
    return arrProfileImageUploaded;
}

function GetUploadedBackgroundThemeData(objContext) {
    let arrBackgroundThemeUploaded = [];
    objContext.state.arrUploadedBackgroundTheme.map(objItem => {
        let objTemp = {
            "uBackgroundThemeId": "00000000-0000-0000-0000-000000000000",
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "vBackgroundFileName": objItem.FileName,
            "vBackgroundFileSize": objItem.ContentLength,
            "vBackgroundFileType": objItem.FileName.split('.')[1],
            "vBackgroundFileVersion": "1",
            "vBackgroundColor": "",
            "vFontColor": "",
            "cIsDefault": "N",
            "cIsDeleted": "N"
        };
        arrBackgroundThemeUploaded = [...arrBackgroundThemeUploaded, objTemp];
    });
    return arrBackgroundThemeUploaded;
}

function GetPasswordData(objContext) {
    if (objContext.state.strPasswordData !== "") {
        let objPassword =
        {
            "vPassword": objContext.state.strPasswordData
        };
        return objPassword;
    }
    return undefined;
}

function GetSelectedProfileImageId(objContext) {
    let strSelectedId = null;
    objContext.state.arrProfileImage.forEach(objItem => {
        if (objContext.state.objSelectedProfileImageId === objItem["uProfileImageId"]) {
            console.log("...........", objItem["uProfileImageId"]);
            strSelectedId = objItem["uProfileImageId"];
        }
    });
    return strSelectedId;
}

function GetSelectedProfileImageName(objContext) {
    let strSelectedName = null;
    if (objContext.state.arrUploadedProfileImage.length !== 0) {
        objContext.state.arrUploadedProfileImage.map(objItem => {
            if (objContext.state.objSelectedProfileImageId === objItem["FileName"].split('.')[0]) {
                strSelectedName = objItem["FileName"].split('.')[0];
            }
        });
    }
    return strSelectedName;
}

function GetSelectedBackgroundThemeId(objContext) {
    let strSelectedId = null;
    objContext.state.arrBackgroundTheme.forEach(objItem => {
        if (objContext.state.objSelectedBackgroundId === objItem["uBackgroundThemeId"]) {
            strSelectedId = objItem["uBackgroundThemeId"];
        }
    });
    return strSelectedId;
}

function GetSelectedBackgroundThemeName(objContext) {
    let strSelectedName = null;
    if (objContext.state.arrUploadedBackgroundTheme.length !== 0) {
        objContext.state.arrUploadedBackgroundTheme.map(objItem => {
            if (objContext.state.objSelectedBackgroundId == objItem["FileName"].split('.')[0]) {

                strSelectedName = objItem["FileName"].split('.')[0];
            }
        });
    }
    return strSelectedName;
}

function GetDeletedBackgroundThemeData(objContext) {
    let arrBackgroundDeleteTheme = [];
    arrStoreBackgroundTheme.map((objItem) => {
        arrDeleteBackgroundThemeIds.map((objItemId) => {
            if (objItem["uBackgroundThemeId"] === objItemId) {
                objItem = { ...objItem, cIsDeleted: "Y" };
                arrBackgroundDeleteTheme = [...arrBackgroundDeleteTheme, objItem];
            }
        });
    });
    return arrBackgroundDeleteTheme;
}

function GetDeletedProfileImageData(objContext) {
    let arrProfileDeleteImage = [];
    arrStoreProfileImage.map((objItem) => {
        arrDeleteProfileImageIds.map((objItemId) => {
            if (objItem["uProfileImageId"] === objItemId) {
                objItem = { ...objItem, cIsDeleted: "Y" };
                arrProfileDeleteImage = [...arrProfileDeleteImage, objItem];
            }
        });
    });
    return arrProfileDeleteImage;
}

/**
 * 
 * @summary savedata calls FetchExecute to make the api call
 * save method has selected item,newuploaded and deleted item and changed password
 * @params "ProfileImageId":GetSelectedProfileImageId(objContext), //selected image
    "ProfileImageName":GetSelectedProfileImageName(objContext),  //selected image if new
 */

export function SaveData(objContext) {
    var objData = {
        "UserPreferenceProfileImageData": {
            "vEditData": [...GetUploadedProfileImageData(objContext), ...GetDeletedProfileImageData(objContext)]
        },
        "UserPreferenceBackgroundThemeData": {
            "vEditData": [...GetUploadedBackgroundThemeData(objContext), ...GetDeletedBackgroundThemeData(objContext)]
        },
        "ProfileImageId": GetSelectedProfileImageId(objContext),
        "ProfileImageName": GetSelectedProfileImageName(objContext),
        "BackgroundThemeId": GetSelectedBackgroundThemeId(objContext),
        "BackgroundThemeName": GetSelectedBackgroundThemeName(objContext),
        "UserPreferenceData": DataRef(objContext.props.userpreference, "userpreference;uuserid;" + objContext.props.ClientUserDetails.UserId)["Data"][0]
    };

    let objPasswordData = GetPasswordData(objContext);
    let objNewData = {};
    if (objPasswordData) {
        objNewData = {
            ...objData, ["UserData"]: {
                "uUserId": objContext.props.ClientUserDetails.UserId,
                "vEditData": [{
                    "uPupilId": objContext.props.ClientUserDetails.UserId,
                    ...objPasswordData
                }]
            }
        };
    }
    else {
        objNewData = objData;
    }
    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PupilProfile/SaveProfileDetails",
            "Params": objNewData
        }
    ];
    DataCall(arrDataRequest, 'FetchExecute');
}

/**
 * @summary Returns Initial state of the component.
 *@param  arrProfileImage:[], after filtering the resulting array
    arrBackgroundTheme:[], after filtering the resulting array
    objSelectedProfileImageId:{}, selected profileimage by user    
    objSelectedBackgroundId:{}, selected backgroundtheme by user
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objSelectedBackgroundId: {},
        objSelectedProfileImageId: {},
        arrUploadedBackgroundTheme: [],
        arrUploadedProfileImage: [],
        strPasswordData: "",
        arrProfileImage: [],
        arrBackgroundTheme: []
    };
}

/**
 *
 * @param {*} state
 * @param {*} action
 * @summary   Maintain component state
 */
export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
    }
};
