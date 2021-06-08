import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_ExceptionLogView = {
    URL: "API/Object/Cockpit/ExceptionLogView",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_ExceptionLogView.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_ExceptionLogView", Object_Cockpit_ExceptionLogView);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_ExceptionLogView.URL,
            "Params": Object_Cockpit_ExceptionLogView.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ExceptionLogView.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ExceptionLogView.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ExceptionLogView.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ExceptionLogView.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_ExceptionLogView;
