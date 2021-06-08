//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Task_TaskFolder
* @summary TaskFolder object
*/
var Object_Intranet_Task_TaskFolder = {

    /**
     * @summary URL
     */
    URL: "API/Object/Intranet/Task/TaskFolder",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the TaskFolder object to store
     */
    Initialize: function (objParam) {
        Object_Intranet_Task_TaskFolder.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Task_TaskFolder", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Task_TaskFolder", Object_Intranet_Task_TaskFolder);
        });
    },
        
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for TaskFolder
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_TaskFolder.URL,
            "Params": Object_Intranet_Task_TaskFolder.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "ReturnDataOnServerRender": "Y"
        };
    },
        
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for TaskFolder
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskFolder.URL, objParams, "Get", fnCallback);
    },
        
    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for TaskFolder
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskFolder.URL, objParams, "Post", fnCallback);
    },
    
    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for TaskFolder
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskFolder.URL, objParams, "Put", fnCallback);
    },
    
    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for TaskFolder
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Task_TaskFolder.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Task_TaskFolder;