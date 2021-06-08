import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Setting_PathFinder_JobField = {
    URL: "API/Object/Intranet/Setting/PathFinder/JobField",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Setting_PathFinder_JobField.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_PathFinder_JobField", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_PathFinder_JobField", Object_Intranet_Setting_PathFinder_JobField);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_PathFinder_JobField.URL,
            "Params": Object_Intranet_Setting_PathFinder_JobField.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobField.URL, objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobField.URL, objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobField.URL, objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobField.URL, objParams, "Delete", fnCallback); 
    }
};

export default Object_Intranet_Setting_PathFinder_JobField;
