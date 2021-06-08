import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Skin = {
    URL: "API/Object/Cockpit/Skin",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_Skin.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_Skin", Object_Cockpit_Skin);    
    },

    GetInitialDataCall: function(){
        return {
            "URL": Object_Cockpit_Skin.URL,
            "Params": Object_Cockpit_Skin.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Skin.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Skin.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Skin.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Skin.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_Skin;
