//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Cockpit_UserPreferenceBackgroundTheme
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 */
var Object_Cockpit_UserPreferenceBackgroundTheme = {

    /**
     * @summary API URL
    */
    URL: "API/Object/Cockpit/UserPreferenceBackgroundTheme",

    /**
     * @summary Initializes Data
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the Notes object to store
    */
    
    Initialize: function (arrUserPrefernceParams) {
        let arrInitialCalls = arrUserPrefernceParams.map(objUserPreferenceID => {
            let objUserPreferenceParams = {
                ForeignKeyFilter: {
                    "uUserId": objUserPreferenceID
                }
            };
            return {
                "URL": Object_Cockpit_UserPreferenceBackgroundTheme.URL,
                "Params": objUserPreferenceParams,
                "MethodType": "Get",
                "UseFullName": true
            };
        });

        Object_Cockpit_UserPreferenceBackgroundTheme.InitialDataCallParam = arrInitialCalls;
        ArcadixCacheData.GetData("Object_Cockpit_UserPreferenceBackgroundTheme", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_UserPreferenceBackgroundTheme", Object_Cockpit_UserPreferenceBackgroundTheme);
        });
    },
        
    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
    */
    GetInitialDataCall: function(){
        return Object_Cockpit_UserPreferenceBackgroundTheme.InitialDataCallParam;
    },

    /**
        * @name GetData
        * @param {objParams} objParams passes objParams
        * @param {callback} fnCallback callback function
        * @summary GetData for Notes
        */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceBackgroundTheme.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary AddData for Notes
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceBackgroundTheme.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for Notes
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceBackgroundTheme.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for Notes
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceBackgroundTheme.URL, objParams, "Delete", fnCallback);
    },

    /**
    * @name UserPreferenceBackGroundThemeData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary UserPreferenceAddData only for PupilMaster
    */
    UserPreferenceBackGroundThemeData: (objParams, fnCallback) => {
        ArcadixCacheData.AddData("Object_Cockpit_UserPreferenceBackgroundTheme", objParams, fnCallback);
    },

    /**
    * @name EditDataByClassId
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary UserPreferenceAddData only for PupilMaster
    */
    EditDataByClassId: (objParams, fnCallback) => {
        ArcadixCacheData.AddData("Object_Cockpit_UserPreferenceBackgroundTheme", objParams, fnCallback);
    },
};

export default Object_Cockpit_UserPreferenceBackgroundTheme;
