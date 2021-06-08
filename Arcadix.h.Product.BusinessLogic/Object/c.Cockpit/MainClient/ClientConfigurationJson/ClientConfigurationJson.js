import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_MainClient_ClientConfigurationJson = {
    URL: "API/Object/Cockpit/MainClient/ClientConfigurationJson",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_MainClient_ClientConfigurationJson.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_ClientConfigurationJson", Object_Cockpit_MainClient_ClientConfigurationJson);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_ClientConfigurationJson.URL,
            "Params": Object_Cockpit_MainClient_ClientConfigurationJson.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationJson.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationJson.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationJson.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationJson.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_MainClient_ClientConfigurationJson.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_MainClient_ClientConfigurationJson;
