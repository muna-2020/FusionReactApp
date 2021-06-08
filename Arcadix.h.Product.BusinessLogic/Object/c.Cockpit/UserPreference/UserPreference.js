//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_Cockpit_UserPreference
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 */
var Object_Cockpit_UserPreference = {

    /**
     * @summary API URL
     */
    URL: "API/Object/Cockpit/UserPreference",

    /**
     * @summary Initializes Data
     */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the UserPreference object to store
     */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Cockpit_UserPreference.InitialDataCallParam = objParam;
        Object_Cockpit_UserPreference.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Cockpit_UserPreference", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_UserPreference", Object_Cockpit_UserPreference);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_UserPreference.URL,
            "Params": Object_Cockpit_UserPreference.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "ReturnDataOnServerRender": Object_Cockpit_UserPreference.ReturnDataOnServerRender
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for UserPreference
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreference.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for UserPreference
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreference.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for UserPreference
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreference.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name UserPrefernceEditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary UserPrefernceEditData only for class and pupil
    */
    UserPrefernceEditData: (objParams, fnCallback) => {
        var arrParams =
            [{
                "URL": Object_Cockpit_UserPreference.URL,
                "Params": objParams,
                "MethodType": "Put"
            }];
            ArcadixFetchData.Execute(arrParams, fnCallback);
    },

    /**
    * @name UserPreferenceGetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary UserPreferenceGetData only for PupilMaster
    */
    UserPreferenceGetData: (objParams, fnCallback) => {
        var arrParams =
            [{
                "URL": Object_Cockpit_UserPreference.URL,
                "Params": objParams,
                "MethodType": "Get",
                "UseFullName": true
            }];
        ArcadixFetchData.Execute(arrParams, fnCallback);
    },

    /**
    * @name UserPreferenceAddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary UserPreferenceAddData only for PupilMaster
    */
    UserPreferenceAddData: (objParams, fnCallback) => {
        ArcadixCacheData.AddData("Object_Cockpit_UserPreference", objParams, fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary DeleteData for UserPreference
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreference.URL, objParams, "Delete", fnCallback);
    }

};

export default Object_Cockpit_UserPreference;
