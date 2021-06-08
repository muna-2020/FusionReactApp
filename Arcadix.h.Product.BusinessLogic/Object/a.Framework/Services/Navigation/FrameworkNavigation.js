import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Framework_Services_FrameworkNavigation = {
    URL: "API/Object/Framework/Services/FrameworkNavigation",

    InitialDataCallParam: null,

    Initialize: function (objNavigationParam) {

        Object_Framework_Services_FrameworkNavigation.InitialDataCallParam = objNavigationParam;
        ArcadixCacheData.AddEntityObject("Object_Framework_Services_FrameworkNavigation", Object_Framework_Services_FrameworkNavigation);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_Services_FrameworkNavigation.URL,
            "Params": Object_Framework_Services_FrameworkNavigation.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            //"IsMultiIndexData": "Y"
            "ReturnDataOnServerRender": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_FrameworkNavigation.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_FrameworkNavigation.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_FrameworkNavigation.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_FrameworkNavigation.URL, objParams, "Delete", fnCallback);
    }
}

export default Object_Framework_Services_FrameworkNavigation;
