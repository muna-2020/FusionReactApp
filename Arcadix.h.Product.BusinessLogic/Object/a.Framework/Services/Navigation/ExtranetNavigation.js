import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Framework_Services_ExtranetNavigation
 * @summary to bring the filetred navigations, for specific to extranet.
 * */
var Object_Framework_Services_ExtranetNavigation = {
    InitialDataCallParam: null,

    Initialize: function (objNavigationParam) {
        Object_Framework_Services_ExtranetNavigation.InitialDataCallParam = objNavigationParam;
        ArcadixCacheData.AddEntityObject("Object_Framework_Services_ExtranetNavigation", Object_Framework_Services_ExtranetNavigation);
    },

    
    GetInitialDataCall: function () {
        return {
            "URL": "API/Object/Framework/Services/ExtranetNavigation",
            "Params": Object_Framework_Services_ExtranetNavigation.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "ReturnDataOnServerRender": "Y"
        };
    },

    
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_ExtranetNavigation.URL, objParams, "Get", fnCallback);
    }
}

export default Object_Framework_Services_ExtranetNavigation;
