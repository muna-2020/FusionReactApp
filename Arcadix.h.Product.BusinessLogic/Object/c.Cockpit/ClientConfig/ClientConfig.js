//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_ClientConfig
* @summary ClientConfig object
*/
var Object_Cockpit_ClientConfig = {
    
    /**
     * @summary URL
    */
    URL: "API/Object/Cockpit/ClientConfig",
      
    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,
          
    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the ClientConfig object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_ClientConfig.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_ClientConfig", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_ClientConfig", Object_Cockpit_ClientConfig);
        });
    },
         
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for ClientConfig
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_ClientConfig.URL,
            "Params": Object_Cockpit_ClientConfig.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },
           
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for ClientConfig
     */ 
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientConfig.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for ClientConfig
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientConfig.URL, objParams, "Post", fnCallback);
    },
        
    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for ClientConfig
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientConfig.URL, objParams, "Put", fnCallback);
    },
        
    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for ClientConfig
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientConfig.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_ClientConfig;