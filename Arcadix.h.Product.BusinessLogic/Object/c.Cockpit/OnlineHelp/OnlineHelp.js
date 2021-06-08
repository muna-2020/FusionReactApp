import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var Object_Cockpit_OnlineHelp = {
    URL: "API/Object/Cockpit/OnlineHelp",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_OnlineHelp.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_OnlineHelp", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_OnlineHelp", Object_Cockpit_OnlineHelp);
        });
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_OnlineHelp.URL,
            "Params": Object_Cockpit_OnlineHelp.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelp.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelp.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelp.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OnlineHelp.URL, objParams, "Delete", fnCallback);
    },

    /**
      * @name GetOnlineHelp
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary calls GetOnlineHelp method
      */
    GetOnlineHelp: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Cockpit/Language/OnlineHelp/GetOnlineHelp", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Object_Cockpit_OnlineHelp;
