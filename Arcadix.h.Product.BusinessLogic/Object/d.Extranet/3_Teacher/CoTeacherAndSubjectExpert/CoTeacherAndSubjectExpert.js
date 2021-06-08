import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Extranet_Teacher_CoTeacherAndSubjectExpert = {

    URL: "API/Object/Extranet/Teacher/CoTeacherAndSubjectExpert",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Extranet_Teacher_CoTeacherAndSubjectExpert.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("object_extranet_teacher_coteacherandsubjectexpert", Object_Extranet_Teacher_CoTeacherAndSubjectExpert);
    },

    GetInitialDataCall: function () {
        return {
            "URL": "API/Object/Extranet/Teacher/CoTeacherAndSubjectExpert",
            "Params": Object_Extranet_Teacher_CoTeacherAndSubjectExpert.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CoTeacherAndSubjectExpert.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CoTeacherAndSubjectExpert.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CoTeacherAndSubjectExpert.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_CoTeacherAndSubjectExpert.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Extranet_Teacher_CoTeacherAndSubjectExpert.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Extranet_Teacher_CoTeacherAndSubjectExpert;
