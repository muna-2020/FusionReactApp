import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Task_TaskQuestion = {
    URL: "API/Object/Intranet/Task/TaskQuestion",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskQuestion.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Task_TaskQuestion", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskQuestion", Object_Intranet_Task_TaskQuestion);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskQuestion.URL,
            "Params": Object_Intranet_Task_TaskQuestion.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskQuestion.URL, objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskQuestion.URL, objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskQuestion.URL, objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskQuestion.URL, objParams, "Delete", fnCallback); 
    }
};

export default Object_Intranet_Task_TaskQuestion;
