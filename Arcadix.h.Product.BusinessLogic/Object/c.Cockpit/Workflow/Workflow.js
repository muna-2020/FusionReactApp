import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Workflow_Workflow = {
    URL: "API/Object/Cockpit/Workflow/Workflow",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_Workflow_Workflow.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_Workflow_Workflow", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_Workflow_Workflow", Object_Cockpit_Workflow_Workflow);
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_Workflow_Workflow.URL,
            "Params": Object_Cockpit_Workflow_Workflow.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "",
            "IsMultiIndexData": "N" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Workflow_Workflow.URL, objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Workflow_Workflow.URL, objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Workflow_Workflow.URL, objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Workflow_Workflow.URL, objParams, "Delete", fnCallback); 
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_Workflow_Workflow.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_Workflow_Workflow;
