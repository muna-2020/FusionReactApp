

var Object_Intranet_Task_TaskQuestionPolarity = {
    URL: "API/Object/Intranet/Task/TaskQuestionPolarity",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskQuestionPolarity.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Task_TaskQuestionPolarity", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskQuestionPolarity", Object_Intranet_Task_TaskQuestionPolarity);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskQuestionPolarity.URL,
            "Params": Object_Intranet_Task_TaskQuestionPolarity.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskQuestionPolarity.URL, objParams, "Get", fnCallback); 
    }
};

export default Object_Intranet_Task_TaskQuestionPolarity;
