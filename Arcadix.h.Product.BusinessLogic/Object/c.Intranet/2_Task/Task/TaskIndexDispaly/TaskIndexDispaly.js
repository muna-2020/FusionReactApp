import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Task_TaskIndexDisplay = {
    URL: "API/Object/Intranet/Task/TaskIndexDisplay",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskIndexDisplay.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskIndexDisplay", Object_Intranet_Task_TaskIndexDisplay);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskIndexDisplay.URL,
            "Params": Object_Intranet_Task_TaskIndexDisplay.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskIndexDisplay.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskIndexDisplay.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskIndexDisplay.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Task_TaskIndexDisplay.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Task_TaskIndexDisplay.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Intranet_Task_TaskIndexDisplay;
