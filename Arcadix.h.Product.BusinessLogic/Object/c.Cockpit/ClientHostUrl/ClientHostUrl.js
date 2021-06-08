//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_ClientHostUrl
* @summary ClientHostUrl object
*/
var Object_Cockpit_ClientHostUrl = {
    
    /**
     * @summary URL
    */
    URL: "API/Object/Cockpit/ClientHostUrl",
           
    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,
              
    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the ClientHostUrl object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_ClientHostUrl.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_ClientHostUrl", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_ClientHostUrl", Object_Cockpit_ClientHostUrl);
        });
    },
               
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for ClientHostUrl
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_ClientHostUrl.URL,
            "Params": Object_Cockpit_ClientHostUrl.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },
                  
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for ClientHostUrl
     */ 
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientHostUrl.URL, objParams, "Get", fnCallback);
    },
     
    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for ClientHostUrl
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientHostUrl.URL, objParams, "Post", fnCallback);
    },
            
    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for ClientHostUrl
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientHostUrl.URL, objParams, "Put", fnCallback);
    },
    
    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for ClientHostUrl
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ClientHostUrl.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_ClientHostUrl;