import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Setting_DatabaseServer = {
    URL:"API/Object/Intranet/Setting/DatabaseServer",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Setting_DatabaseServer.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_DatabaseServer", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_DatabaseServer", Object_Intranet_Setting_DatabaseServer);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_DatabaseServer.URL,
            "Params": Object_Intranet_Setting_DatabaseServer.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_DatabaseServer.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_DatabaseServer.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_DatabaseServer.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_DatabaseServer.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Setting_DatabaseServer;
