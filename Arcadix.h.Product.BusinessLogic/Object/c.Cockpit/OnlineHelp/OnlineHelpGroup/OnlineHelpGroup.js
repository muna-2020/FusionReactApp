import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_OnlineHelpGroup = {
    URL: "API/Object/Cockpit/OnlineHelpGroup",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_OnlineHelpGroup.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_OnlineHelpGroup", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_OnlineHelpGroup", Object_Cockpit_OnlineHelpGroup);
        });
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_OnlineHelpGroup.URL,
            "Params": Object_Cockpit_OnlineHelpGroup.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelpGroup.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelpGroup.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelpGroup.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelpGroup.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_OnlineHelpGroup;
