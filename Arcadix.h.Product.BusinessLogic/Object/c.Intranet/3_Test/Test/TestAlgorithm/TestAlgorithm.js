import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Test_TestAlgorithm = {
    URL: "API/Object/Intranet/Test/TestAlgorithm",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Test_TestAlgorithm.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Test_TestAlgorithm", Object_Intranet_Test_TestAlgorithm);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_TestAlgorithm.URL,
            "Params": Object_Intranet_Test_TestAlgorithm.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Test_TestAlgorithm.MethodCall(objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Test_TestAlgorithm.MethodCall(objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Test_TestAlgorithm.MethodCall(objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Test_TestAlgorithm.MethodCall(objParams, "Delete", fnCallback); 
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Test_TestAlgorithm.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Intranet_Test_TestAlgorithm;
