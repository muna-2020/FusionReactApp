import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_LoginControl = {
    URL: "API/Object/Cockpit/LoginControl",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_LoginControl.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Cockpit_LoginControl", Object_Cockpit_LoginControl);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_LoginControl.URL,
            "Params": Object_Cockpit_LoginControl.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_LoginControl.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_LoginControl.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_LoginControl.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_LoginControl.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_LoginControl.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_LoginControl;
