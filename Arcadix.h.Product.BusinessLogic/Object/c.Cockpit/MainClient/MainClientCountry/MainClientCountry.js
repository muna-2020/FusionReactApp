import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_MainClient_MainClientCountry = {
    URL: "API/Object/Cockpit/MainClient/MainClientCountry",
    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Cockpit_MainClient_MainClientCountry.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_MainClient_MainClientCountry", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_MainClientCountry", Object_Cockpit_MainClient_MainClientCountry); 
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_MainClientCountry.URL,
            "Params": Object_Cockpit_MainClient_MainClientCountry.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientCountry.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientCountry.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientCountry.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_MainClientCountry.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_MainClient_MainClientCountry;
