//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_Teacher
* @summary Teacher object
*/
var Object_Extranet_Teacher_Teacher = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/Teacher",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Teacher object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_Teacher_Teacher.InitialDataCallParam = objParam;
        Object_Extranet_Teacher_Teacher.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_Teacher_Teacher", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_Teacher", Object_Extranet_Teacher_Teacher);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Teacher
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_Teacher.URL,
            "Params": Object_Extranet_Teacher_Teacher.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "N",
            "ReturnDataOnServerRender": Object_Extranet_Teacher_Teacher.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Teacher
    */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Teacher.URL, objParams, "Get", fnCallback, blnNoCache);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for Teacher
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Teacher.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for Teacher
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Teacher.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for Teacher
    */
    DeleteData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Teacher.URL, objParams, "Delete", fnCallback, blnNoCache);
    }
};

export default Object_Extranet_Teacher_Teacher;

/**
 * GetIsAdminTeacher
 * @param {any} objTeacherDetails
 * @param {any} strSchoolId
 * @summary It returns if the logged in User is an Admin Teacher or not for the respective SchoolId
 */
export var GetIsAdminTeacher = function (objTeacherDetails, strSchoolId) {
    let blnIsAdminTeacher = false;
    if (strSchoolId=="") {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let arrFilteredUserPreference = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(x => x["vKey"] == "SelectedSchoolForTeacher");
        if (arrFilteredUserPreference.length > 0) {
            strSchoolId = arrFilteredUserPreference[0]["vValue"];
        }
    }
    let arrFilteredTeacherSchoolDetails = objTeacherDetails["t_TestDrive_Member_Teacher_School"]
        .filter(x => x["uSchoolId"] == strSchoolId);
    if (arrFilteredTeacherSchoolDetails.length > 0) {
        blnIsAdminTeacher = arrFilteredTeacherSchoolDetails[0]["cIsAdmin"] == "Y";
    }
    return blnIsAdminTeacher;
};
