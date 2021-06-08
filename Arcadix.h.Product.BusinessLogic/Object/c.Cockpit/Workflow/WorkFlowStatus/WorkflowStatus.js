import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Workflow_WorkflowStatus = {
    URL: "API/Object/Cockpit/Workflow/WorkflowStatus",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_Workflow_WorkflowStatus.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_Workflow_WorkflowStatus", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_Workflow_WorkflowStatus", Object_Cockpit_Workflow_WorkflowStatus);
        })
        
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_Workflow_WorkflowStatus.URL,
            "Params": Object_Cockpit_Workflow_WorkflowStatus.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowStatus.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowStatus.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowStatus.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowStatus.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_Workflow_WorkflowStatus.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_Workflow_WorkflowStatus;
