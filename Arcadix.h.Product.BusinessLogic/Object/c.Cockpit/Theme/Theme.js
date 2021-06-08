import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Theme = {
    URL: "API/Object/Cockpit/Theme",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_Theme.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_Theme", Object_Cockpit_Theme);    
    },

    GetInitialDataCall: function(){
        return {
            "URL": Object_Cockpit_Theme.URL,
            "Params": Object_Cockpit_Theme.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_Theme.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_Theme.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_Theme.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_Theme.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_Theme.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_Theme;
