//Common imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Cockpit_MainClient_ClientUrls
 * @summary client url object
 * */
var Object_Cockpit_MainClient_ClientUrls = {

    URL: "API/Object/Cockpit/MainClient/ClientUrls",

    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Cockpit_MainClient_ClientUrls.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_MainClient_ClientUrls", Object_Cockpit_MainClient_ClientUrls);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_MainClient_ClientUrls.URL,
            "Params": Object_Cockpit_MainClient_ClientUrls.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_MainClient_ClientUrls.URL, objParams, "Get", fnCallback);
    },

    GetClientUrl: (objParams, fnCallback) => {
        let arrDataRequest = [
            {
                URL: "API/Object/Cockpit/MainClient/ClientUrls/GetClientUrl",
                Params: objParams,
                "UseFullName": true,
                "ActionType": "Add"
            }
        ];
        (new ArcadixFetchAndCacheData()).Execute(arrDataRequest, fnCallback);
    }
};

export default Object_Cockpit_MainClient_ClientUrls;
