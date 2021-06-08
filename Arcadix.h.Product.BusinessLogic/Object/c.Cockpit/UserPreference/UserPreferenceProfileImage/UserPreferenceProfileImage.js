//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_Cockpit_UserPreferenceProfileImage
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 */
var Object_Cockpit_UserPreferenceProfileImage = {

    /**
     * @summary API URL
    */
    URL: "API/Object/Cockpit/UserPreferenceProfileImage",

    /**
     * @summary Initializes Data
     */ 

    DataCallParams: null,

    /**
     * @name Initialize
     * @param {Array} arrUserPrefernceParams passes UserPrefernceParams
     * @summary Initialize initial data call param and then adds the UserPreferenceProfileImage object to store
    */   
    Initialize: function (arrUserPrefernceParams) {
        let arrInitialCalls = arrUserPrefernceParams.map(objUserPreferenceID => {
            let objUserPreferenceParams = {
                ForeignKeyFilter: {
                    "uUserId": objUserPreferenceID
                }
            };
            return {
                "URL": Object_Cockpit_UserPreferenceProfileImage.URL,
                "Params": objUserPreferenceParams,
                "MethodType": "Get",
                "UseFullName": true
            };
        });
        Object_Cockpit_UserPreferenceProfileImage.DataCallParams = arrInitialCalls;
        ArcadixCacheData.GetData("Object_Cockpit_UserPreferenceProfileImage", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_UserPreferenceProfileImage", Object_Cockpit_UserPreferenceProfileImage);
        });
    },   
    
    InitializeGetDataByClassId: function (objParam) {
        ArcadixCacheData.AddEntityObject("Object_Cockpit_UserPreferenceProfileImage", Object_Cockpit_UserPreferenceProfileImage);
        Object_Cockpit_UserPreferenceProfileImage.DataCallParams = {
            "URL": Object_Cockpit_UserPreferenceProfileImage.URL + "/GetDataByClassId",
            "Params": objParam,
            "UseFullName": true,
            "ActionType":"Replace"
        };
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     */
    GetInitialDataCall: function () {
        return Object_Cockpit_UserPreferenceProfileImage.DataCallParams;
    },

    /**
    * @name GetData
    * @param {object} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for UserPreferenceProfileImage
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceProfileImage.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {object} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary AddData for UserPreferenceProfileImage
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceProfileImage.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {object} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for UserPreferenceProfileImage
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceProfileImage.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {object} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for UserPreferenceProfileImage
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserPreferenceProfileImage.URL, objParams, "Delete", fnCallback);
    },

    /**
    * @name GetDataByClassId
    * @param {object} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary Gets Data ByClass Id for UserPreferenceProfileImage
    */
    GetDataByClassId: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Cockpit/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage/GetDataByClassId", "POST", objParams)
            .then(response => response.json())
            .then(json => { fnCallback(json); });
    },

    /**
    * @name SaveDataByClassId
    * @param {object} objData passes objData
    * @param {callback} fnCallback callback function
    * @summary Gets Data ByClass Id for UserPreferenceProfileImage
    */
    AddDataByClassId: (objData, fnCallback) => { //In TeacherStartPage_Module Processor, GetPupilProfileImages is using this method.
        ArcadixCacheData.AddData("Object_Cockpit_UserPreferenceProfileImage", objData, fnCallback);
    },

    /**
    * @name EditDataByClassId
    * @param {object} objData passes objData
    * @param {callback} fnCallback callback function
    * @summary Gets Data ByClass Id for UserPreferenceProfileImage
    */
    EditDataByClassId: (objData, fnCallback) => { //In TeacherStartPage_Module Processor, GetPupilProfileImages is using this method.
        ArcadixCacheData.EditData("Object_Cockpit_UserPreferenceProfileImage", objData, fnCallback);
    }
        
};

export default Object_Cockpit_UserPreferenceProfileImage;

