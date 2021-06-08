import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_MainClient_MainClientThemeConfiguration = {
    URL: "API/Object/Cockpit/MainClient/MainClientThemeConfiguration",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_MainClient_MainClientThemeConfiguration.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_MainClient_MainClientThemeConfiguration", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_MainClientThemeConfiguration", Object_Cockpit_MainClient_MainClientThemeConfiguration);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_MainClientThemeConfiguration.URL,
            "Params": Object_Cockpit_MainClient_MainClientThemeConfiguration.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixCetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientThemeConfiguration.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientThemeConfiguration.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientThemeConfiguration.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientThemeConfiguration.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_MainClient_MainClientThemeConfiguration;
