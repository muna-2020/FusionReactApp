//Objects required for module.
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import Object_Cockpit_UserPreferenceProfileImage from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage';
import Object_Cockpit_UserPreferenceBackgroundTheme from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceBackgroundTheme/UserPreferenceBackgroundTheme';
import Extranet_Pupil_PupilProfile_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile_Module';


/**
 * @name PupilProfile_ModuleProcessor
 * @summary Class for PupilProfile_ModuleProcessor module display and manipulate.
 */
class PupilProfile_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Cockpit_UserPreference",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilProfile",
            "Object_Cockpit_UserPreferenceProfileImage",
            "Object_Cockpit_UserPreferenceBackgroundTheme",
            { "StoreKey": "ApplicationState", "DataKey": "UserPreferenceObject" },
            { "StoreKey": "ApplicationState", "DataKey": "ShowSamePasswordMessage" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.PupilProfile_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        /**
         * last selected item by same user is saved under userprefernce
         */
        var objUserPreference = {
            ForeignKeyFilter: {
                "uUserId": props.ClientUserDetails.UserId
            }
        };

        //TextResource
        let arrResourceParams = ["/d.Extranet/4_Pupil/Modules/PupilProfile"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        Object_Cockpit_UserPreferenceBackgroundTheme.Initialize(["00000000-0000-0000-0000-000000000000", props.ClientUserDetails.UserId]);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserPreferenceBackgroundTheme];

        Object_Cockpit_UserPreferenceProfileImage.Initialize(["00000000-0000-0000-0000-000000000000", props.ClientUserDetails.UserId]);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserPreferenceProfileImage];

        Object_Cockpit_UserPreference.Initialize(objUserPreference);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserPreference];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilProfile/PupilProfile.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilProfile/PupilProfilePopUp/DeleteErrorMessage.css"
        ];
    }


    /**
     * @name OnClickBack
     * @param {any} objContext objContext
     * @summary To get back the home url on click
     */
    OnClickBack(objContext) {
        var pushUrl = objContext.props.JConfiguration.VirtualDirName + 'Home';
        ApplicationState.SetProperty("IsPupilProfile", undefined);
        objContext.props.history.push({ pathname: pushUrl });
    }

    /**
     * @name DeleteBackGroundTheme
     * @param {*} objContext objContext
     * @param {*} objTextResource objTextResource
     * @summary Delete background theme only if it the userid not default 
     */
    DeleteBackGroundTheme(objContext, objTextResource) {
        let arrStoreBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        if (objContext.state.arrUploadedBackgroundTheme.length > 0) {
            arrStoreBackgroundTheme = [...arrStoreBackgroundTheme, objContext.state.arrUploadedBackgroundTheme];
        }
        let arrDeleteBackgroundThemeIds = [];
        if (objContext.state.arrDeleteBackgroundThemeIds) {
            arrDeleteBackgroundThemeIds = [...objContext.state.arrDeleteBackgroundThemeIds, objContext.state.objSelectedBackgroundId];
        }
        else {
            arrDeleteBackgroundThemeIds = [objContext.state.objSelectedBackgroundId];
        }
        let arrNewBackgroundTheme = [];
        let arrBackgroundTheme = objContext.state.arrBackgroundTheme.filter((objItem) => {
            if (objItem["uBackgroundThemeId"] === objContext.state.objSelectedBackgroundId) {
                return objItem;
            }
            if (objItem["FileName"] && objItem["FileName"].split('.')[0] === objContext.state.objSelectedBackgroundId) {
                return objItem;
            }
        });
        let arrValidBackgroundTheme = arrBackgroundTheme.filter((objItem) => {
            return !objItem["uUserId"] || objItem["uUserId"] !== "00000000-0000-0000-0000-000000000000"; //filter and get the matched row which has been clicked
        });
        if (arrValidBackgroundTheme.length === 0) {

            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": 320,
                    "ShowHeader": true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.ExtranetSkinPath,
                    TextResourcesKey: "ProfileErrorPopup"
                },
                Events: {},
                CallBacks: {}
            });
        }
        else {
            if (arrBackgroundTheme.length > 0) {
                arrNewBackgroundTheme = objContext.state.arrBackgroundTheme.filter(objItem => {
                    if (objItem["uBackgroundThemeId"] && objItem["uBackgroundThemeId"] !== objContext.state.objSelectedBackgroundId) {
                        return objItem;
                    }

                    if (objItem["FileName"]) {
                        if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedBackgroundId) {
                            return objItem;
                        }
                    }
                });
            }

            let arrNewUploadedBackgroundTheme = objContext.state.arrUploadedBackgroundTheme.filter((objItem) => {
                if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedBackgroundId) {
                    return objItem;
                }
            });
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
            let strBackgroundThemeId = "";
            if (objUserPreference) {
                let objBackgroundTheme = objContext.state.arrBackgroundTheme.filter(objBT => objBT["uBackgroundThemeId"] == objUserPreference["uBackgroundThemeId"]);
                if (objBackgroundTheme) {
                    strBackgroundThemeId = objUserPreference["uBackgroundThemeId"]
                }
                else {
                    strBackgroundThemeId = objContext.state.arrBackgroundTheme.filter(objProfileImage => objProfileImage["cIsDefault"] == "Y")[0].uBackgroundThemeId;
                }
            }

            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "arrBackgroundTheme": arrNewBackgroundTheme, "arrUploadedBackgroundTheme": arrNewUploadedBackgroundTheme, "arrDeleteBackgroundThemeIds": arrDeleteBackgroundThemeIds, objSelectedBackgroundId: strBackgroundThemeId
                }
            });
        }
    }

    /**
     * @name DeleteProfileImage
     * @param {*} objContext objContext
     * @param {*} objTextResource objTextResource
     * @summary Delete profileimage only if it the userid not default
     */
    DeleteProfileImage(objContext, objTextResource) {
        let arrStoreProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        if (objContext.state.arrUploadedProfileImage.length > 0) {
            arrStoreProfileImage = [...arrStoreProfileImage, objContext.state.arrUploadedProfileImage];
        }
        let arrDeleteProfileImageIds = [];
        if (objContext.state.arrDeleteProfileImageIds) {
            arrDeleteProfileImageIds = [...objContext.state.arrDeleteProfileImageIds, objContext.state.objSelectedProfileImageId];
        }
        else {
            arrDeleteProfileImageIds = [objContext.state.objSelectedProfileImageId];
        }
        let arrNewProfileImage = [];
        let arrProfileImage = objContext.state.arrProfileImage.filter((objItem) => { //filter and get the matched row which has been clicked
            if (objItem["uProfileImageId"] === objContext.state.objSelectedProfileImageId) {
                return objItem;
            }
            if (objItem["FileName"] && objItem["FileName"].split('.')[0] === objContext.state.objSelectedProfileImageId) {
                return objItem;
            }
        });

        let arrValidProfileImage = arrProfileImage.filter((objItem) => {
            return !objItem["uUserId"] || objItem["uUserId"] !== "00000000-0000-0000-0000-000000000000";
        });
        if (arrValidProfileImage.length === 0) {

            Popup.ShowErrorPopup({
                Data: {
                    "ModuleName": "error-popup-parent" //for css parent class
                },
                Meta: {
                    "Width": 380,
                    "ShowHeader": true,
                    "HasCloseImage": "N"
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.ExtranetSkinPath,
                    TextResourcesKey: "ProfileErrorPopup"
                },
                Events: {},
                CallBacks: {}
            });
        }
        else {
            if (arrProfileImage.length > 0) {
                arrNewProfileImage = objContext.state.arrProfileImage.filter(objItem => {
                    if (objItem["uProfileImageId"] && objItem["uProfileImageId"] !== objContext.state.objSelectedProfileImageId) {
                        return objItem;
                    }

                    if (objItem["FileName"]) {
                        if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedProfileImageId) {
                            return objItem;
                        }
                    }
                });
            }
            let arrNewUploadedProfileImage = objContext.state.arrUploadedProfileImage.filter((objItem) => {
                if (objItem["FileName"].split('.')[0] !== objContext.state.objSelectedProfileImageId) {
                    return objItem;
                }
            });

            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject", objUserPreference);
            let strSelectedProfileImageId = "";
            if (objUserPreference) {
                let objSelectedProfileImage = objContext.state.arrProfileImage.filter(objProfileImage => objProfileImage["uProfileImageId"] == objUserPreference["uProfileImageId"]);
                if (objSelectedProfileImage) {
                    strSelectedProfileImageId = objUserPreference["uProfileImageId"]
                }
                else {
                    strSelectedProfileImageId = objContext.state.arrProfileImage.filter(objProfileImage => objProfileImage["cIsDefault"] == "Y")[0].uProfileImageId;
                }
            }


            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "arrProfileImage": arrNewProfileImage, "arrUploadedProfileImage": arrNewUploadedProfileImage, "arrDeleteProfileImageIds": arrDeleteProfileImageIds, "objSelectedProfileImageId": strSelectedProfileImageId
                }
            });

        }
    }

    /**
     * @name GetUploadedProfileImageData
     * @param {any} objContext objContext
     * @summary Array of profile images
     * @return {*} array
     */
    GetUploadedProfileImageData(objContext) {
        let arrProfileImageUploaded = [];
        if (objContext.state.arrUploadedProfileImage.length > 0) {
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
        else
            return [];
    }

    /**
     * @name GetUploadedBackgroundThemeData
     * @param {any} objContext objContext
     * @summary {*} array of background theme 
     * @return {*} array
     */
    GetUploadedBackgroundThemeData(objContext) {
        let arrBackgroundThemeUploaded = [];
        if (objContext.state.arrUploadedBackgroundTheme.length > 0) {
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
        else
            return [];
    }

    /**
     * @name GetPasswordData
     * @param {any} objContext objContext
     * @summary Get the password data 
     * @return {*} object or undefined
     */
    GetPasswordData(objContext) {
        if (objContext.state.strPasswordData !== "") {
            let objPassword =
            {
                "vPassword": objContext.state.strPasswordData
            };
            return objPassword;
        }
        return undefined;
    }

    ///**
    // * @name GetSelectedProfileImageId
    // * @param {any} objContext objContext
    // * @summary {*} Selected id
    // * @return {*} string
    // */
    // GetSelectedProfileImageId(objContext) {
    //    let strSelectedId = null;
    //    objContext.state.arrProfileImage.forEach(objItem => {
    //        if (objContext.state.objSelectedProfileImageId === objItem["uProfileImageId"]) {
    //            strSelectedId = objItem["uProfileImageId"];
    //        }
    //        if (objContext.state.objSelectedProfileImageId === objItem["FileName"].split('.')[0]) {
    //            strSelectedId = objItem["FileName"].split('.')[0];
    //        }
    //    });
    //     return strSelectedId;
    //}

    /**
     * @name GetSelectedProfileImageName
     * @param {any} objContext objContext
     * @summary Selected Profile Name
     * @return {*} String
     */
    GetSelectedProfileImageNameId(objContext) {
        let strSelectedName = "";
        let strSelectedId = "";
        if (objContext.state.arrUploadedProfileImage.length !== 0) {
            objContext.state.arrUploadedProfileImage.map(objItem => {
                if (objContext.state.objSelectedProfileImageId === objItem["FileName"].split('.')[0]) {
                    strSelectedName = objItem["FileName"].split('.')[0];
                    strSelectedId = null;
                }
            });
        }
        if (strSelectedId == "" && strSelectedName == "") {
            objContext.state.arrProfileImage.forEach(objItem => {
                if (objContext.state.objSelectedProfileImageId === objItem["uProfileImageId"]) {
                    strSelectedName = objItem["vFileName"];
                    strSelectedId = objItem["uProfileImageId"];
                }
            });
        }
        return [strSelectedId, strSelectedName];
    }

    ///**
    // * @name GetSelectedBackgroundThemeId
    // * @param {any} objContext objContext
    // * @summary Gets the selectedid
    // * @return {*} String
    // */
    // GetSelectedBackgroundThemeId(objContext) {
    //    let strSelectedId = null;
    //    objContext.state.arrBackgroundTheme.forEach(objItem => {
    //        if (objContext.state.objSelectedBackgroundId === objItem["uBackgroundThemeId"]) {
    //            strSelectedId = objItem["uBackgroundThemeId"];
    //        }
    //        if (objContext.state.objSelectedBackgroundId === objItem["FileName"].split('.')[0]) {
    //            strSelectedId = objItem["FileName"].split('.')[0];
    //        }
    //    });
    //    return strSelectedId;
    //}

    /**
     * @name GetSelectedBackgroundThemeName
     * @param {any} objContext objContext
     * @summary Gets the selectedbackgroundname
     * @return {*} String
     */
    GetSelectedBackgroundThemeNameId(objContext) {
        let strSelectedName = "";
        let strSelectedId = "";
        if (objContext.state.arrUploadedBackgroundTheme.length !== 0) {
            objContext.state.arrUploadedBackgroundTheme.map(objItem => {
                if (objContext.state.objSelectedBackgroundId === objItem["FileName"].split('.')[0]) {
                    strSelectedName = objItem["FileName"].split('.')[0];
                    strSelectedId = null;
                }
            });
        }
        if (strSelectedId === "" && strSelectedName === "") {
            objContext.state.arrBackgroundTheme.forEach(objItem => {
                if (objContext.state.objSelectedBackgroundId === objItem["uBackgroundThemeId"]) {
                    strSelectedName = objItem["vBackgroundFileName"];
                    strSelectedId = objItem["uBackgroundThemeId"];
                }
            });
        }
        return [strSelectedId, strSelectedName];
    }

    /**
     * @name GetDeletedBackgroundThemeData
     * @param {any} objContext objContext
     * @summary Get the deleted background theme data
     * @return {*} array
     * */
    GetDeletedBackgroundThemeData(objContext) {
        let arrBackgroundDeleteTheme = [];
        let arrStoreBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        if (objContext.state.arrUploadedBackgroundTheme.length > 0) {
            arrStoreBackgroundTheme = [...arrStoreBackgroundTheme, objContext.state.arrUploadedBackgroundTheme];
        }

        if (arrStoreBackgroundTheme && objContext.state.arrDeleteBackgroundThemeIds) {
            arrStoreBackgroundTheme.map((objItem) => {
                objContext.state.arrDeleteBackgroundThemeIds.map((objItemId) => {
                    if (objItem["uBackgroundThemeId"] === objItemId) {
                        objItem = { ...objItem, cIsDeleted: "Y" };
                        arrBackgroundDeleteTheme = [...arrBackgroundDeleteTheme, objItem];
                    }
                });
            });
            return arrBackgroundDeleteTheme;
        }
        else
            return [];
    }

    /**
     * @name GetDeletedProfileImageData
     * @param {any} objContext objContext
     * @summary Get the deleted background theme data
     * @return {*} array
     * */
    GetDeletedProfileImageData(objContext) {
        let arrProfileDeleteImage = [];
        let arrStoreProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];

        if (objContext.state.arrUploadedProfileImage.length > 0) {
            arrStoreProfileImage = [...arrStoreProfileImage, objContext.state.arrUploadedProfileImage];
        }
        if (arrStoreProfileImage && objContext.state.arrDeleteProfileImageIds) {
            arrStoreProfileImage.map((objItem) => {
                objContext.state.arrDeleteProfileImageIds.map((objItemId) => {
                    if (objItem["uProfileImageId"] === objItemId) {
                        objItem = { ...objItem, cIsDeleted: "Y" };
                        arrProfileDeleteImage = [...arrProfileDeleteImage, objItem];
                    }
                });
            });
            return arrProfileDeleteImage;
        }
        else
            return [];
    }

    /**
     * @name GetFirstDefaultBackGroundThemeId
     * @param {any} objContext
     */
    GetFirstDefaultBackGroundThemeId(objContext) {
        let strBackGroundThemeId = objContext.state.arrBackgroundTheme.map(objItem => {
            if (objItem["cIsDeleted"] == "N") {
                if (objItem["uUserId"] == "00000000-0000-0000-0000-000000000000") {
                    strBackGroundThemeId = objItem["uBackgroundThemeId"]
                }
            }
        })

        return strBackGroundThemeId;
    }

    /**
     * @name GetFirstDefaultProfileImageId
     * @param {any} objContext
     */
    GetFirstDefaultProfileImageId(objContext) {
        let strProfileImageId = objContext.state.arrProfileImage.map(objItem => {
            if (objItem["cIsDeleted"] == "N") {
                if (objItem["uUserId"] == "00000000-0000-0000-0000-000000000000") {
                    strProfileImageId = objItem["uProfileImageId"]
                }
            }
        })

        return strProfileImageId;
    }

    /**
     * @name HideSamePasswordMessage
     * @summary Hides the message if it is Displayed.
     * @param {any} objContext
     */
    HideSamePasswordMessage(objContext) {
        let ShowSamePasswordMessage = ApplicationState.GetProperty("ShowSamePasswordMessage")
        if (ShowSamePasswordMessage)
            ApplicationState.SetProperty("ShowSamePasswordMessage", false);
    }


    /**
     * @name SaveData
     * @param {any} objContext objContext 
     * @summary save method has selected item,newuploaded and deleted item and changed password
     */
    SaveData(objContext, objTextResource) {

        let profilePassword = document.getElementById("profilepassword");
        let confirmProfilePassword = document.getElementById("confirmprofilepassword");
        var strFirstInput = profilePassword ? profilePassword.value : "";
        var strSecondInput = confirmProfilePassword ? confirmProfilePassword.value : "";

        if (strFirstInput != strSecondInput) {
            objContext.dispatch({ type: "SET_STATE", payload: { "strPasswordMismatch": Localization.TextFormatter(objTextResource, 'PasswordDoNotMatch') } });
        } else {
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject", objUserPreference);
            let arrUploadedBackgroundTheme = objContext.PupilProfile_ModuleProcessor.GetUploadedBackgroundThemeData(objContext);
            let arrUploadedProfileImage = objContext.PupilProfile_ModuleProcessor.GetUploadedProfileImageData(objContext);
            let SelectedBackgroundThemeId = objContext.PupilProfile_ModuleProcessor.GetSelectedBackgroundThemeNameId(objContext)[0];
            let SelectedProfileImageId = objContext.PupilProfile_ModuleProcessor.GetSelectedProfileImageNameId(objContext)[0];
            objUserPreference = {
                ...objUserPreference,
                ["uBackgroundThemeId"]: SelectedBackgroundThemeId ? SelectedBackgroundThemeId : this.GetFirstDefaultBackGroundThemeId(objContext),
                ["uProfileImageId"]: SelectedProfileImageId ? SelectedProfileImageId : this.GetFirstDefaultProfileImageId(objContext)
            };
            var objData = {
                "UserPreferenceProfileImageData": {
                    "vEditData": [...arrUploadedProfileImage, ...objContext.PupilProfile_ModuleProcessor.GetDeletedProfileImageData(objContext)]
                },
                "UserPreferenceBackgroundThemeData": {
                    "vEditData": [...arrUploadedBackgroundTheme, ...objContext.PupilProfile_ModuleProcessor.GetDeletedBackgroundThemeData(objContext)]
                },
                "ProfileImageId": objContext.PupilProfile_ModuleProcessor.GetSelectedProfileImageNameId(objContext)[0],
                "ProfileImageName": objContext.PupilProfile_ModuleProcessor.GetSelectedProfileImageNameId(objContext)[1],
                "BackgroundThemeId": objContext.PupilProfile_ModuleProcessor.GetSelectedBackgroundThemeNameId(objContext)[0],
                "BackgroundThemeName": objContext.PupilProfile_ModuleProcessor.GetSelectedBackgroundThemeNameId(objContext)[1],
                "UserPreferenceData": objUserPreference
            };

            let objPasswordData = objContext.PupilProfile_ModuleProcessor.GetPasswordData(objContext);
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

            objContext.dispatch({ type: "SET_STATE", payload: { "strPasswordMismatch": "" } });
            ApplicationState.SetProperty("blnShowAnimation", true);
            Extranet_Pupil_PupilProfile_Module.SaveProfileDetails(objNewData, (objResponse) => {
                let objData = objResponse.PupilProfile_Module.Data;
                let objUserPreference = objData.UserPreference;

                let objUserPreferenceReturn = {
                    Filter: "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId,
                    Value: {
                        Data: [objUserPreference],
                        TimeStamp: "",
                        PrimaryKeyName: "uUserPreferenceId"
                    }
                };
                ArcadixCacheData.EditData("Object_Cockpit_UserPreference", objUserPreferenceReturn, () => { });
                ApplicationState.SetProperty("UserPreferenceObject", objUserPreference);

                let arrProfileImage = objData.UserPreferenceProfileImage;
                if (arrProfileImage && arrProfileImage.length > 0) {
                    let objUserPreferenceProfileReturn = {
                        Filter: "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId,
                        Value: {
                            Data: arrProfileImage,
                            TimeStamp: "",
                            PrimaryKeyName: "uProfileImageId"
                        }
                    };
                    Object_Cockpit_UserPreferenceProfileImage.EditDataByClassId(objUserPreferenceProfileReturn, () => {
                        arrProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                        let arrDefaultProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
                        arrProfileImage = [...arrProfileImage, ...arrDefaultProfileImage];
                    });

                    arrProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                    let arrDefaultProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
                    arrProfileImage = [...arrProfileImage, ...arrDefaultProfileImage, ...objData.UserPreferenceProfileImage];

                } else {
                    arrProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                    let arrDefaultProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
                    arrProfileImage = [...arrProfileImage, ...arrDefaultProfileImage];
                }

                let arrBackgroundTheme = objData.UserPreferenceBackgroundTheme;
                if (arrBackgroundTheme && arrBackgroundTheme.length > 0) {
                    let objUserPreferenceBackGroundReturn = {
                        Filter: "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + objContext.props.ClientUserDetails.UserId,
                        Value: {
                            Data: arrBackgroundTheme,
                            TimeStamp: "",
                            PrimaryKeyName: "uBackgroundThemeId"
                        }
                    };
                    Object_Cockpit_UserPreferenceBackgroundTheme.EditDataByClassId(objUserPreferenceBackGroundReturn, () => { });
                    arrBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                    let arrDefaultBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
                    arrBackgroundTheme = [...arrBackgroundTheme, ...arrDefaultBackgroundTheme, ...objData.UserPreferenceBackgroundTheme];
                } else {
                    arrBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                    let arrDefaultBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
                    arrBackgroundTheme = [...arrBackgroundTheme, ...arrDefaultBackgroundTheme];
                }
                let objBackGroundTheme = arrBackgroundTheme.find(objBg => objBg["uBackgroundThemeId"] == objUserPreference["uBackgroundThemeId"]);
                let objProfileImage = arrProfileImage.find(objProfile => objProfile["uProfileImageId"] == objUserPreference["uProfileImageId"]);
                let strBackGroundThemePath = "";
                let strProfileImagePath = "";
                if (objBackGroundTheme["uUserId"] === "00000000-0000-0000-0000-000000000000") {
                    strBackGroundThemePath = objContext.props.JConfiguration.WebDataPath + "Repo/BackGroundTheme/0/00000000-0000-0000-0000-000000000000/" + objBackGroundTheme["uBackgroundThemeId"] + "_" + objBackGroundTheme["vBackgroundFileVersion"] + "." + objBackGroundTheme["vBackgroundFileType"];
                }
                else
                    strBackGroundThemePath = objContext.props.JConfiguration.WebDataPath + "Repo/BackGroundTheme/" + objContext.props.JConfiguration.MainClientId + "/" + objContext.props.ClientUserDetails.UserId + "/" + objBackGroundTheme["uBackgroundThemeId"] + "_" + objBackGroundTheme["vBackgroundFileVersion"] + "." + objBackGroundTheme["vBackgroundFileType"];

                if (objProfileImage["uUserId"] === "00000000-0000-0000-0000-000000000000") {
                    strProfileImagePath = objContext.props.JConfiguration.WebDataPath + "Repo/LearncoacherProfilePicture/0/00000000-0000-0000-0000-000000000000/" + objProfileImage["uProfileImageId"] + "_" + objProfileImage["iFileVersion"] + "." + objProfileImage["vFileType"];
                }
                else
                    strProfileImagePath = objContext.props.JConfiguration.WebDataPath + "Repo/LearncoacherProfilePicture/" + objContext.props.JConfiguration.MainClientId + "/" + objContext.props.ClientUserDetails.UserId + "/" + objProfileImage["uProfileImageId"] + "_" + objProfileImage["iFileVersion"] + "." + objProfileImage["vFileType"];
                ApplicationState.SetProperty("ProfileBackGroundImagePath", { BackgroundThemePath: strBackGroundThemePath, ProfileImagePath: strProfileImagePath });

                ApplicationState.SetProperty("blnShowAnimation", false);
                //navigate to home
                if (objData["PasswordExists"] == "N") {
                    ApplicationState.SetProperty("IsPupilProfile", undefined);
                    ApplicationState.SetProperty("NavigatePupilNavigations" + "ExtranetPupilNavigation", { URL: 'Home', Id: 'ExtranetPupilNavigation' });
                } else {
                    ApplicationState.SetProperty("ShowSamePasswordMessage", true);
                }
            });
        }
    }

    /**
     * @name SelectedBackgroundImage
     * @param {*} objContext objContext
     * @param {*} event event
     * @summary filter only the id of the selected object in objSelectedBackgroundId and objSelectedProfileImageId
    */
    SelectedBackgroundImage(objContext, event) {
        if (event["uBackgroundThemeId"] !== undefined) {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedBackgroundId": event["uBackgroundThemeId"] } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedBackgroundId": event["FileName"].split('.')[0] } });
        }
    }

    /**
     * @name SelectedProfileImage
     * @param {*} objContext objContext
     * @param {*} event event
     * @summary filter only the id of the selected object in objSelectedBackgroundId and objSelectedProfileImageId
    */
    SelectedProfileImage(objContext, event) {
        if (event["uProfileImageId"] !== undefined) {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedProfileImageId": event["uProfileImageId"] } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedProfileImageId": event["FileName"].split('.')[0] } });
        }
    }

    /**
     * @name NewUploadedBackgroundImage
     * @param {*} objContext objContext
     * @param {*} objuploadedimage objuploadedimage
     * @summay newly uploaded background image
    */
    NewUploadedBackgroundImage(objContext, objuploadedimage) {
        let arrUploadedBackgroundTheme = [...objContext.state.arrUploadedBackgroundTheme, objuploadedimage];
        objContext.dispatch({ type: "SET_STATE", payload: { "arrUploadedBackgroundTheme": [...arrUploadedBackgroundTheme], "arrBackgroundTheme": [...objContext.state.arrBackgroundTheme, objuploadedimage] } });
    }

    /**
    * @name NewUploadedProfileImage
    * @param {*} objContext objContext
    * @param {*} objuploadedimage objuploadedimage
    * @summay newly uploaded profile image
    */
    NewUploadedProfileImage(objContext, objuploadedimage) {
        let arrUploadedProfileImage = [...objContext.state.arrUploadedProfileImage, objuploadedimage];
        objContext.dispatch({ type: "SET_STATE", payload: { "arrUploadedProfileImage": arrUploadedProfileImage, "arrProfileImage": [...objContext.state.arrProfileImage, objuploadedimage] } });
    }

    /**
    * @name SavePassword
    * @param {*} objContext objContext
    * @summay Save password
    */
    SavePassword(objContext) {
        var fistInput = document.getElementById("profilepassword").value;
        var secondInput = document.getElementById("confirmprofilepassword").value;
        let ShowSamePasswordMessage = ApplicationState.GetProperty("ShowSamePasswordMessage")
        if (ShowSamePasswordMessage)
            ApplicationState.SetProperty("ShowSamePasswordMessage", false);
        if (fistInput === secondInput) {
            objContext.dispatch({ type: "SET_STATE", payload: { "strPasswordData": secondInput } });
        }
    }

    /**
     * @name GetResourceFileUploadData
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceFileUploadData(objTextResource) {
        let Text = {
            "UploadButtonText": objTextResource.UploadImage // Button text
        };

        let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory

        return {
            Text,
            SkinPath
        };
    }

    /**
     * @name GetMetaFileUploadData
     * @summary it returns the object of metadata
     * @returns {array} MetaData
    */
    GetMetaFileUploadData() {
        return {
            ShowUploadedFiles: false, // To show details of uploaded files.
            UploadSingle: 'N' //restrict to select only one file.
        };
    }

    /**
    * @name GetCallBacksBackgroundFileUpload
    * @param {*} objContext objContext
    * @summary it returns the object of metadata
    * @returns {array} MetaData
   */
    GetCallBacksBackgroundFileUpload(objContext) {
        return {
            OnUploadComplete: (objuploadedimage) => { objContext.PupilProfile_ModuleProcessor.NewUploadedBackgroundImage(objContext, objuploadedimage); }
        };
    }

    /**
     * @name GetCallBacksProfileFileUpload
     * @param {*} objContext objContext
     * @summary it returns the object of metadata
     * @returns {array} MetaData
    */
    GetCallBacksProfileFileUpload(objContext) {
        return {
            OnUploadComplete: (objuploadedimage) => { objContext.PupilProfile_ModuleProcessor.NewUploadedProfileImage(objContext, objuploadedimage); }
        };
    }

    ///**
    //* @name ShowOnlineHelp
    //* @summary Set the OnlineHelpGroupObject application state for OnlineHelp
    //*/
    //ShowOnlineHelp() {
    //    let objOnlineHelpObject = {
    //        blnShowOnlineHelp: true,
    //        OnlineHelpGroupKey: "PupilProfile",
    //        OnlineHelpKey: ""
    //    };
    //    ApplicationState.SetProperty("OnlineHelpGroupObject", objOnlineHelpObject);
    //}

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["FileUpload"],
            "Files": []
        }
    }
}

export default PupilProfile_ModuleProcessor;