import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_MainClient_MainClient = {
    URL: "API/Object/Cockpit/MainClient/MainClient",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_MainClient_MainClient.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_MainClient_MainClient", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_MainClient", Object_Cockpit_MainClient_MainClient);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_MainClient.URL,
            "Params": Object_Cockpit_MainClient_MainClient.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClient.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClient.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClient.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClient.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_MainClient_MainClient;
