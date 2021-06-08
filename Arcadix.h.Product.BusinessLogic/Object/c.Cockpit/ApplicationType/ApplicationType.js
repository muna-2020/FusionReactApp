import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_ApplicationType = {
    URL: "API/Object/Cockpit/ApplicationType",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_ApplicationType.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_ApplicationType", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_ApplicationType", Object_Cockpit_ApplicationType);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_ApplicationType.URL,
            "Params": Object_Cockpit_ApplicationType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache": "Y",
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ApplicationType.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ApplicationType.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ApplicationType.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ApplicationType.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_ApplicationType;
