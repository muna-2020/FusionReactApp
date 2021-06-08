import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Test_ExtraTestTask = {
    URL: "API/Object/Intranet/ExtraTestTask",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Test_ExtraTestTask.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Test_ExtraTestTask", Object_Intranet_Test_ExtraTestTask);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_ExtraTestTask.URL,
            "Params": Object_Intranet_Test_ExtraTestTask.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Test_ExtraTestTask.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Test_ExtraTestTask.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Test_ExtraTestTask.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Test_ExtraTestTask.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Test_ExtraTestTask.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Intranet_Test_ExtraTestTask;
