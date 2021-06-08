import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Member_ClassManagement_Module = {
    URL: "API/Intranet/Member/ClassManagement",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Member_ClassManagement_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Member_ClassManagement_Module", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Member_ClassManagement_Module", Object_Intranet_Member_ClassManagement_Module);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Member_ClassManagement_Module.URL,
            "Params": Object_Intranet_Member_ClassManagement_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_ClassManagement_Module.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_ClassManagement_Module.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_ClassManagement_Module.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Member_ClassManagement_Module.URL, objParams, "Delete", fnCallback);
    },

    /**
     * @name GetAssignTaskToTestData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for AssignTaskToTest
     */
    AddClassManagmentData: (objParams, MethoType, fnCallback) => {
        let arrParams = [];
        arrParams = [...arrParams,
        {
            "URL": "API/Intranet/Member/ClassManagement_Module",
            "Params": objParams,
            "MethodType": MethoType
        }
        ];
        ArcadixFetchData.Execute(arrParams, fnCallback);
    },

    /**
    * @name GetAssignTaskToTestData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for AssignTaskToTest
    */
    GetClassManagment: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Member/ClassManagement", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    SendLogins: (objParams) => {
        let arrRequest = [
            {
                "URL": "API/Intranet/Member/ClassManagement/sendClassManagementLogin",
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, () => ({}));
    }

};

export default Object_Intranet_Member_ClassManagement_Module;