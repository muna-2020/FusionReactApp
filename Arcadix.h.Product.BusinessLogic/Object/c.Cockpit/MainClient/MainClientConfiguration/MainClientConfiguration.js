import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_MainClient_MainClientConfiguration = {
    URL: "API/Object/Cockpit/MainClient/MainClientConfiguration",
    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Cockpit_MainClient_MainClientConfiguration.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_MainClient_MainClientConfiguration", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_MainClientConfiguration", Object_Cockpit_MainClient_MainClientConfiguration);
        })
       
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_MainClientConfiguration.URL,
            "Params": Object_Cockpit_MainClient_MainClientConfiguration.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {        
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientConfiguration.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientConfiguration.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientConfiguration.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {       
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientConfiguration.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_MainClient_MainClientConfiguration;
