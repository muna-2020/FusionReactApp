import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Task_TaskUsage = {
    URL: "API/Object/Intranet/TaskUsage",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskUsage.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskUsage", Object_Intranet_Task_TaskUsage);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskUsage.URL,
            "Params": Object_Intranet_Task_TaskUsage.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskUsage.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskUsage.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskUsage.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskUsage.MethodCall(objParams, "Delete", fnCallback);
    },
    
    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Task_TaskUsage.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Intranet_Task_TaskUsage;
