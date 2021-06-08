import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_Workflow_WorkflowType = {
    URL: "API/Object/Cockpit/Workflow/WorkflowType",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Cockpit_Workflow_WorkflowType.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_Workflow_WorkflowType", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_Workflow_WorkflowType", Object_Cockpit_Workflow_WorkflowType);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_Workflow_WorkflowType.URL,
            "Params": Object_Cockpit_Workflow_WorkflowType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowType.MethodCall(objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowType.MethodCall(objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowType.MethodCall(objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        Object_Cockpit_Workflow_WorkflowType.MethodCall(objParams, "Delete", fnCallback);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Cockpit_Workflow_WorkflowType.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    }
};

export default Object_Cockpit_Workflow_WorkflowType;
