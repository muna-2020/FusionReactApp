import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Task_TaskAdditionalPropertyValue = {
    URL: "API/Object/Intranet/Task/TaskAdditionalPropertyValue",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskAdditionalPropertyValue.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Task_TaskAdditionalPropertyValue", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskAdditionalPropertyValue", Object_Intranet_Task_TaskAdditionalPropertyValue);
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskAdditionalPropertyValue.URL,
            "Params": Object_Intranet_Task_TaskAdditionalPropertyValue.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalPropertyValue.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalPropertyValue.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalPropertyValue.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalPropertyValue.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Task_TaskAdditionalPropertyValue;
