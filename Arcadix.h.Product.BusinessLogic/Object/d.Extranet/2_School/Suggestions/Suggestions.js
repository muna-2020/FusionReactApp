import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Extranet_School_Suggestions = {

    URL: "API/Object/Extranet/School/Suggestions",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Extranet_School_Suggestions.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("object_extranet_school_suggestions", Object_Extranet_School_Suggestions);
    },

    GetInitialDataCall: function () {
        return {
            "URL": "API/Object/Extranet/School/Suggestions",
            "Params": Object_Extranet_School_Suggestions.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Extranet_School_Suggestions.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Extranet_School_Suggestions.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Extranet_School_Suggestions.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Extranet_School_Suggestions.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Extranet_School_Suggestions.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Extranet_School_Suggestions;
