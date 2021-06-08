//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_OfflineProcessDefinition = {

    /**
    * @summary URL
    */
    URL: "API/Object/Cockpit/OfflineProcessDefinition",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the OfflineProcessDefinition object to store
    */
    Initialize: function (objParam) {
        Object_Cockpit_OfflineProcessDefinition.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_OfflineProcessDefinition", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_OfflineProcessDefinition", Object_Cockpit_OfflineProcessDefinition);
        })
       
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for OfflineProcessDefinition
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_OfflineProcessDefinition.URL,
            "Params": Object_Cockpit_OfflineProcessDefinition.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for OfflineProcessDefinition
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OfflineProcessDefinition.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Cockpit_OfflineProcessDefinition;