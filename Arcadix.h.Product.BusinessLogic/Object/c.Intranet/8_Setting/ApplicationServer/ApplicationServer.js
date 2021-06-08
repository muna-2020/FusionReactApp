import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Setting_ApplicationServer = {
    URL:"API/Object/Intranet/Setting/ApplicationServer",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Setting_ApplicationServer.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_ApplicationServer", (objDataObject) => {
           if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_ApplicationServer", Object_Intranet_Setting_ApplicationServer);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_ApplicationServer.URL,
            "Params": Object_Intranet_Setting_ApplicationServer.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ApplicationServer.URL, objParams, "Get", fnCallback);
    },
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ApplicationServer.URL, objParams, "Post", fnCallback);
    },
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ApplicationServer.URL, objParams, "Put", fnCallback);
    },
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ApplicationServer.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Setting_ApplicationServer;
