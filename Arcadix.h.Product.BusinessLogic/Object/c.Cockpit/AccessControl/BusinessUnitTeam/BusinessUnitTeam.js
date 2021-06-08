import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_BusinessUnitTeam = {
    URL: "API/Object/Cockpit/BusinessUnitTeam",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_BusinessUnitTeam.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_BusinessUnitTeam", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_BusinessUnitTeam", Object_Cockpit_BusinessUnitTeam);
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_BusinessUnitTeam.URL,
            "Params": Object_Cockpit_BusinessUnitTeam.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnitTeam.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnitTeam.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnitTeam.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_BusinessUnitTeam.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_BusinessUnitTeam.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_BusinessUnitTeam;
