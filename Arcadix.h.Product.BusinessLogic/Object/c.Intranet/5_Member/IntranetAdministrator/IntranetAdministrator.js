import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var Object_Intranet_Member_IntranetAdministrator = {
    URL: "API/Object/Intranet/Member/IntranetAdministrator",
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "Y",
    Initialize: function (objParam) {
        Object_Intranet_Member_IntranetAdministrator.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Member_IntranetAdministrator", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Member_IntranetAdministrator", Object_Intranet_Member_IntranetAdministrator);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Member_IntranetAdministrator.URL,
            "Params": Object_Intranet_Member_IntranetAdministrator.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "",
            "IsMultiIndexData": "Y",
            "ReturnDataOnServerRender": Object_Intranet_Member_IntranetAdministrator.ReturnDataOnServerRender 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_IntranetAdministrator.URL, objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_IntranetAdministrator.URL, objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_IntranetAdministrator.URL, objParams, "Put", fnCallback); 
    },

     DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_IntranetAdministrator.URL, objParams, "Delete", fnCallback); 
    },

    SendLogins: (objParams) => {
        let arrRequest = [
            {
                "URL": "API/Object/Intranet/Member/IntranetAdministrator/sendIntranetAdministratorLogin",
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, () => ({}));
    }

};

export default Object_Intranet_Member_IntranetAdministrator;
