//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_Client
* @summary Client object
*/
var Object_Cockpit_Client = {
    
    /**
     * @summary URL
    */
    URL: "API/Object/Cockpit/Client",
       
    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,
          
    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the Client object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_Client.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_Client", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_Client", Object_Cockpit_Client);
        });
    },
            
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for Client
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_Client.URL,
            "Params": Object_Cockpit_Client.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },
               
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for Client
     */ 
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Client.URL, objParams, "Get", fnCallback);
    },
    
    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for Client
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Client.URL, objParams, "Post", fnCallback);
    },
          
    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for Client
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Client.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for Client
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Client.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_Client;
