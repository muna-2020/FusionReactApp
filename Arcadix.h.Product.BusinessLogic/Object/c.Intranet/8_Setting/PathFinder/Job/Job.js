import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Setting_PathFinder_Job = {
    URL: "API/Object/Intranet/Setting/PathFinder/Job",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Setting_PathFinder_Job.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_PathFinder_Job", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_PathFinder_Job", Object_Intranet_Setting_PathFinder_Job);
        })
       
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_PathFinder_Job.URL,
            "Params": Object_Intranet_Setting_PathFinder_Job.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_Job.URL, objParams, "Get", fnCallback, blnNoCache); 
    },

    AddData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_Job.URL, objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_Job.URL, objParams, "Put", fnCallback, blnNoCache); 
    },

    DeleteData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_Job.URL, objParams, "Delete", fnCallback); 
    }
};

export default Object_Intranet_Setting_PathFinder_Job;
