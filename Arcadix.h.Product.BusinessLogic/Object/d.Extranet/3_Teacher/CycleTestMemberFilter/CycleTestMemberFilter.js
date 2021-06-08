import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Extranet_Teacher_CycleTestMemberFilter = {

    URL: "API/Object/Extranet/Teacher/CycleTestMemberFilter",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Extranet_Teacher_CycleTestMemberFilter.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("object_extranet_teacher_cycletestmemberfilter", Object_Extranet_Teacher_CycleTestMemberFilter);
    },

    GetInitialDataCall: function () {
        return {
            "URL": "API/Object/Extranet/Teacher/CycleTestMemberFilter",
            "Params": Object_Extranet_Teacher_CycleTestMemberFilter.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CycleTestMemberFilter.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CycleTestMemberFilter.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CycleTestMemberFilter.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CycleTestMemberFilter.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Extranet_Teacher_CycleTestMemberFilter.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Extranet_Teacher_CycleTestMemberFilter;
