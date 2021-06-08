//React related impoprts.
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objSelectedBackgroundId = {};
    let objSelectedProfileImageId = {};
    let arrProfileImage = [];
    let arrBackgroundTheme = [];
    //if (
    //    DataRef(props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000") &&
    //    DataRef(props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + props.ClientUserDetails.UserId) &&
    //    DataRef(props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000") &&
    //    DataRef(props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + props.ClientUserDetails.UserId) &&
    //    DataRef(props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId) &&
    //    Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilProfile", props)
    //) {
    //    const arrUserBackgroundTheme = DataRef(props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
    //    const arrUserPrefernceBackgroundTheme = DataRef(props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId)["Data"];
    //    const arrUploadedBackgroundData = DataRef(props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + props.ClientUserDetails.UserId)["Data"];
    //    arrBackgroundTheme = [...arrUserBackgroundTheme, ...arrUploadedBackgroundData];

    //    if (arrUserPrefernceBackgroundTheme[0] == undefined || arrUserPrefernceBackgroundTheme[0]["uBackgroundThemeId"] === null) {
    //        let objBackgroundTheme = arrUserBackgroundTheme[0] ? arrUserBackgroundTheme[0]["uBackgroundThemeId"] : '';
    //        objSelectedBackgroundId = objBackgroundTheme
    //    }
    //    else {
    //        let objBackgroundTheme = arrUserPrefernceBackgroundTheme[0]["uBackgroundThemeId"];
    //        objSelectedBackgroundId = objBackgroundTheme
    //    }

    //    let arrUserProfileImage = [];
    //    const arrAllUserProfileImage = DataRef(props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
    //    if (arrAllUserProfileImage) {
    //        let strFilter = props.ClientUserDetails.PupilDetails.iGenderId == "0" ? "userFemale.png" : "userMale.png";
    //        arrUserProfileImage = arrAllUserProfileImage.filter(objProifleImage => objProifleImage["vFileName"] != strFilter)
    //    }
    //    const arrUserPrefernceProfileImage = DataRef(props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId)["Data"];
    //    const arrUploadedProfileImage = DataRef(props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + props.ClientUserDetails.UserId)["Data"];
    //    arrProfileImage = [...arrUserProfileImage, ...arrUploadedProfileImage];

    //    if (arrUserPrefernceProfileImage[0] == undefined || arrUserPrefernceProfileImage[0]["uProfileImageId"] === null) {
    //        objSelectedProfileImageId = arrUserProfileImage[0]["uProfileImageId"];
    //    }
    //    else {
    //        objSelectedProfileImageId = arrUserPrefernceProfileImage[0]["uProfileImageId"];
    //    }

    //    blnIsLoadComplete = true;
    //}
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelectedBackgroundId: objSelectedBackgroundId,
        objSelectedProfileImageId: objSelectedProfileImageId,
        arrUploadedBackgroundTheme: [],
        arrUploadedProfileImage: [],
        strPasswordData: "",
        arrProfileImage: arrProfileImage,
        arrBackgroundTheme: arrBackgroundTheme,
        strPasswordMismatch: ""
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    // useSetIsProfileToFalse(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilProfile_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary this will fier when component removes from dom. on that time we need to set IsProfile has to false.
 */
export function useSetIsProfileToFalse(objContext) {
    useEffect(() => {
        return () => { ApplicationState.SetProperty("IsPupilProfile", undefined); }
    });
}


/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (
            DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000") &&
            DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000") &&
            DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId) &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilProfile", objContext.props)
        ) {
            if (!objContext.state.isLoadComplete) {

                const arrUserBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
                const arrUserPrefernceBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                const arrUploadedBackgroundData = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                const arrBackgroundTheme = [...arrUserBackgroundTheme, ...arrUploadedBackgroundData];

                if (arrUserPrefernceBackgroundTheme[0] == undefined || arrUserPrefernceBackgroundTheme[0]["uBackgroundThemeId"] === null) {
                    let objBackgroundTheme = arrUserBackgroundTheme[0] ? arrUserBackgroundTheme[0]["uBackgroundThemeId"] : '';
                    objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedBackgroundId": objBackgroundTheme } });
                }
                else {
                    let objBackgroundTheme = arrUserPrefernceBackgroundTheme[0]["uBackgroundThemeId"];
                    objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedBackgroundId": objBackgroundTheme } });
                }
                // objContext.dispatch({ type: "SET_STATE", payload: { "arrBackgroundTheme": arrBackgroundTheme } });

                let arrUserProfileImage = [];
                const arrAllUserProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;00000000-0000-0000-0000-000000000000")["Data"];
                if (arrAllUserProfileImage) {
                    let strFilter = objContext.props.ClientUserDetails.PupilDetails.iGenderId == "0" ? "userFemale.png" : "userMale.png";
                    arrUserProfileImage = arrAllUserProfileImage.filter(objProifleImage => objProifleImage["vFileName"] != strFilter)
                }
                const arrUserPrefernceProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                const arrUploadedProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
                const arrProfileImage = [...arrUserProfileImage, ...arrUploadedProfileImage];

                if (arrUserPrefernceProfileImage[0] == undefined || arrUserPrefernceProfileImage[0]["uProfileImageId"] === null) {
                    let objProfileImageId = arrUserProfileImage[0]["uProfileImageId"];
                    objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedProfileImageId": objProfileImageId } });
                }
                else {
                    let objProfileImageId = arrUserPrefernceProfileImage[0]["uProfileImageId"];
                    objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedProfileImageId": objProfileImageId } });
                }

                objContext.dispatch({ type: "SET_STATE", payload: { "arrProfileImage": arrProfileImage, "isLoadComplete": true, "arrBackgroundTheme": arrBackgroundTheme } });

                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
    }, [
        objContext.props.Object_Cockpit_UserPreferenceProfileImage,
        objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme,
        objContext.props.Object_Cockpit_UserPreference,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilProfile"]
    ]);
}
