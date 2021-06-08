import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Task_TaskKeyword = {
    URL: "API/Object/Intranet/TaskKeyword",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskKeyword.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskKeyword", Object_Intranet_Task_TaskKeyword);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskKeyword.URL,
            "Params": Object_Intranet_Task_TaskKeyword.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskKeyword.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskKeyword.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskKeyword.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskKeyword.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Task_TaskKeyword.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Intranet_Task_TaskKeyword;
