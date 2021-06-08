import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var Object_Intranet_Member_StateAdministrator = {
    URL: "API/Object/Intranet/Member/StateAdministrator",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Member_StateAdministrator.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Member_StateAdministrator", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Member_StateAdministrator", Object_Intranet_Member_StateAdministrator);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Member_StateAdministrator.URL,
            "Params": Object_Intranet_Member_StateAdministrator.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Intranet_Member_StateAdministrator.MethodCall(objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        Object_Intranet_Member_StateAdministrator.MethodCall(objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        Object_Intranet_Member_StateAdministrator.MethodCall(objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Intranet_Member_StateAdministrator.MethodCall(objParams, "Delete", fnCallback); 
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Intranet_Member_StateAdministrator.URL,
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
                "URL": "API/Object/Intranet/Member/StateAdministrator/sendStateAdministratorLogin",
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, () => ({}));
    }
};

export default Object_Intranet_Member_StateAdministrator;
