import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_MainClient_ClientConfigurationData = {
    URL: "API/Object/Cockpit/MainClient/ClientConfigurationData",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_MainClient_ClientConfigurationData.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_ClientConfigurationData", Object_Cockpit_MainClient_ClientConfigurationData);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_ClientConfigurationData.URL,
            "Params": Object_Cockpit_MainClient_ClientConfigurationData.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationData.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationData.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationData.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_MainClient_ClientConfigurationData.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_MainClient_ClientConfigurationData.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_MainClient_ClientConfigurationData;
