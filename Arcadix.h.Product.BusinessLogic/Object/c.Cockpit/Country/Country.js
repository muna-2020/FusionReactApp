import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Country = {

    URL: "API/Object/Cockpit/Country",

    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Cockpit_Country.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_Country", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_Country", Object_Cockpit_Country);    
        })
    },

    GetInitialDataCall: function(){
        return {
            "URL": Object_Cockpit_Country.URL,
            "Params": Object_Cockpit_Country.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": ""
        };
    },

    GetData: (objParams, fnCallback) => {        
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Country.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Country.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Country.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {       
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Country.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_Country;
