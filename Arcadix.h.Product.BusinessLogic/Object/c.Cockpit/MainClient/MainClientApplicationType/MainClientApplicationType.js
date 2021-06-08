//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_MainClient_MainClientApplicationType
* @summary MainClientApplicationType object
*/
var Object_Cockpit_MainClient_MainClientApplicationType = {

    /**
     * @summary URL
    */
    URL: "API/Object/Cockpit/MainClient/MainClientApplicationType",
    
    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,
      
    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the MainClientApplicationType object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_MainClient_MainClientApplicationType.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_MainClient_MainClientApplicationType", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_MainClientApplicationType", Object_Cockpit_MainClient_MainClientApplicationType);
        });
    },
     
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for MainClientApplicationType
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_MainClientApplicationType.URL,
            "Params": Object_Cockpit_MainClient_MainClientApplicationType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },
       
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for MainClientApplicationType
     */ 
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientApplicationType.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for MainClientApplicationType
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientApplicationType.URL, objParams, "Post", fnCallback);
    },
    
    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for MainClientApplicationType
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientApplicationType.URL, objParams, "Put", fnCallback);
    },
    
    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for MainClientApplicationType
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientApplicationType.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_MainClient_MainClientApplicationType;