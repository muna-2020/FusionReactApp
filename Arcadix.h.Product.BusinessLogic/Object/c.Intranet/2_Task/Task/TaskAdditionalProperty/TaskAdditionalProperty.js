import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Task_TaskAdditionalProperty = {
    URL: "API/Object/Intranet/Task/TaskAdditionalProperty",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskAdditionalProperty.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Task_TaskAdditionalProperty", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskAdditionalProperty", Object_Intranet_Task_TaskAdditionalProperty);
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskAdditionalProperty.URL,
            "Params": Object_Intranet_Task_TaskAdditionalProperty.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalProperty.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalProperty.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalProperty.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskAdditionalProperty.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Task_TaskAdditionalProperty;
