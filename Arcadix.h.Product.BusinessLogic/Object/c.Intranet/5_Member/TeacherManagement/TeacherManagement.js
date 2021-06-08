import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var Object_Intranet_Member_TeacherManagement = {
    URL: "API/Intranet/Member/TeacherManagement",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Member_TeacherManagement.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Intranet_Member_TeacherManagement", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Intranet_Member_TeacherManagement", Object_Intranet_Member_TeacherManagement);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Member_TeacherManagement.URL,
            "Params": Object_Intranet_Member_TeacherManagement.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Member_TeacherManagement.MethodCall(objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Member_TeacherManagement.MethodCall(objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Member_TeacherManagement.MethodCall(objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Member_TeacherManagement.MethodCall(objParams, "Delete", fnCallback); 
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Member_TeacherManagement.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    },

     SendLogins: (objParams) => {
        let arrRequest = [
            {
                "URL": "API/Intranet/Member/TeacherManagement_Module/sendTeacherManagementLogin",
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, () => ({}));
    }
};

export default Object_Intranet_Member_TeacherManagement;
