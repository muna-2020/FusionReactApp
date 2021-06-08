import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_BusinessUnit = {
    URL: "API/Object/Cockpit/BusinessUnit",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_BusinessUnit.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_BusinessUnit", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_BusinessUnit", Object_Cockpit_BusinessUnit);
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_BusinessUnit.URL,
            "Params": Object_Cockpit_BusinessUnit.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnit.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnit.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnit.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnit.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_BusinessUnit.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_BusinessUnit;
