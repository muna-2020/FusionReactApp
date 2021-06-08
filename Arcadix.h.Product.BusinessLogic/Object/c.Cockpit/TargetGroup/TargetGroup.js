import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_TargetGroup = {
    URL: "API/Object/Cockpit/TargetGroup",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_TargetGroup.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_TargetGroup", Object_Cockpit_TargetGroup);    
    },

    GetInitialDataCall: function(){
        return {
            "URL": Object_Cockpit_TargetGroup.URL,
            "Params": Object_Cockpit_TargetGroup.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache":"Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_TargetGroup.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_TargetGroup.URL, objParams, "Get", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_TargetGroup.URL, objParams, "Get", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_TargetGroup.URL, objParams, "Get", fnCallback);
    }    
};

export default Object_Cockpit_TargetGroup;
