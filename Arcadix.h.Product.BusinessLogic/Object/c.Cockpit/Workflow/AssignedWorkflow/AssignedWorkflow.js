import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Workflow_AssignedWorkflow = {
    URL: "API/Object/Cockpit/Workflow/AssignedWorkflow",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_Workflow_AssignedWorkflow.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_Workflow_AssignedWorkflow", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_Workflow_AssignedWorkflow", Object_Cockpit_Workflow_AssignedWorkflow);
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_Workflow_AssignedWorkflow.URL,
            "Params": Object_Cockpit_Workflow_AssignedWorkflow.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "",
            "IsMultiIndexData": "N" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Workflow_AssignedWorkflow.URL, objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_Workflow_AssignedWorkflow.URL, objParams, "Post", fnCallback); 
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_Workflow_AssignedWorkflow.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_Workflow_AssignedWorkflow;
