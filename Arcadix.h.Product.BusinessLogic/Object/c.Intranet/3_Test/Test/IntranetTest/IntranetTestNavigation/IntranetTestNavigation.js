import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Test_IntranetTestNavigation = {
    URL: "API/Object/Intranet/Test/IntranetTestNavigation",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Test_IntranetTestNavigation.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Test_IntranetTestNavigation", Object_Intranet_Test_IntranetTestNavigation);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_IntranetTestNavigation.URL,
            "Params": Object_Intranet_Test_IntranetTestNavigation.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Test_IntranetTestNavigation.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Test_IntranetTestNavigation.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Test_IntranetTestNavigation.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Test_IntranetTestNavigation.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Test_IntranetTestNavigation.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Intranet_Test_IntranetTestNavigation;
