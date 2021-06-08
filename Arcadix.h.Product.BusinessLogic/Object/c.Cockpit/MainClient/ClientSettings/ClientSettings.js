//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Cockpit_MainClient_ClientSettings
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Cockpit_MainClient_ClientSettings = {

    /**
    * @summary URL
    */
    URL: "API/Object/Cockpit/MainClient/ClientSettings",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the ClientSettings object to store
    */
    Initialize: function (objParam) {
        Object_Cockpit_MainClient_ClientSettings.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_MainClient_ClientSettings", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_ClientSettings", Object_Cockpit_MainClient_ClientSettings);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for ClientSettings
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_ClientSettings.URL,
            "Params": Object_Cockpit_MainClient_ClientSettings.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ClientSettings
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_ClientSettings.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for ClientSettings
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_ClientSettings.URL, objParams, "Put", fnCallback);
    }
};

export default Object_Cockpit_MainClient_ClientSettings;
