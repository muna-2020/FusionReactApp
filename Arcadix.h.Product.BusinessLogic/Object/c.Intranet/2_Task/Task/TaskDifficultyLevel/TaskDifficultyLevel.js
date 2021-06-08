import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Task_TaskDifficultyLevel = {
    URL: "API/Object/Intranet/Task/TaskDifficultyLevel",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskDifficultyLevel.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskDifficultyLevel", Object_Intranet_Task_TaskDifficultyLevel);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskDifficultyLevel.URL,
            "Params": Object_Intranet_Task_TaskDifficultyLevel.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskDifficultyLevel.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskDifficultyLevel.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskDifficultyLevel.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {       
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskDifficultyLevel.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Task_TaskDifficultyLevel;
