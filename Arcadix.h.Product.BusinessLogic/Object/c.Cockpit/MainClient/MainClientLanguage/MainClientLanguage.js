import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_MainClient_MainClientLanguage = {
    URL: "API/Object/Cockpit/MainClient/MainClientLanguage",
    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Cockpit_MainClient_MainClientLanguage.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_MainClient_MainClientLanguage", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_MainClientLanguage", Object_Cockpit_MainClient_MainClientLanguage); 
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_MainClientLanguage.URL,
            "Params": Object_Cockpit_MainClient_MainClientLanguage.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "N",
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientLanguage.URL, objParams, "Get", fnCallback);
    },
    
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientLanguage.URL, objParams, "Put", fnCallback);
    },    
};

export default Object_Cockpit_MainClient_MainClientLanguage;
