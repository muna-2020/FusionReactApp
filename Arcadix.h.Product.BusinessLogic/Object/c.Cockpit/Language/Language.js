import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Language = {
    URL: "API/Object/Cockpit/Language",
    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Cockpit_Language.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_Language", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_Language", Object_Cockpit_Language); 
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_Language.URL,
            "Params": Object_Cockpit_Language.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "MainClientIdentifier": "",
            "IsInMemoryCache": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Language.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Language.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Language.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Language.URL, objParams, "Delete", fnCallback);
    },

    GetData_Custom: (objParams, fnCallback) => {
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(Object_Cockpit_Language.URL, objParams, "Get", (objReturn) => {
                if(objReturn["Object_Cockpit_Language"]["Count"] > 1)
                {
                    resolve(objReturn["Object_Cockpit_Language"]["Data"]);
                }
                else
                {
                    resolve(null);
                }
            }, true);
        });
    }
};

export default Object_Cockpit_Language;
