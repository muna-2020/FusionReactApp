import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Setting_PathFinder_JobLevel = {
    URL: "API/Object/Intranet/Setting/PathFinder/JobLevel",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Setting_PathFinder_JobLevel.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_PathFinder_JobLevel", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_PathFinder_JobLevel", Object_Intranet_Setting_PathFinder_JobLevel);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_PathFinder_JobLevel.URL,
            "Params": Object_Intranet_Setting_PathFinder_JobLevel.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobLevel.URL, objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobLevel.URL, objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobLevel.URL, objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobLevel.URL, objParams, "Delete", fnCallback); 
    }
};

export default Object_Intranet_Setting_PathFinder_JobLevel;
