//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Task_Task
* @summary Task object
*/
var Object_Intranet_Task_Task = {

    /**
     * @summary URL
     */
    URL: "API/Object/Intranet/Task/Task",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,
    
    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the Task object to store
     */
    Initialize: function (objParam) {
        Object_Intranet_Task_Task.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Task_Task", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Task_Task", Object_Intranet_Task_Task);
        });
    },
    
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for Task
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Task_Task.URL,
            "Params": Object_Intranet_Task_Task.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },
    
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for Task
     */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Intranet_Task_Task.URL, objParams, "Get", fnCallback, blnNoCache);
    },
    
    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for Task
     */
    AddData: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Intranet_Task_Task.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for Task
     */
    EditData: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Intranet_Task_Task.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for Task
     */
    DeleteData: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Intranet_Task_Task.URL, objParams, "Delete", fnCallback);
    },
    
    /**
     * @name GetData_Custom
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData_Custom for Task
     */
    GetData_Custom: (objParams, fnCallback) => {
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(Object_Intranet_Task_Task.URL, objParams, "Get", (objReturn) => {
                resolve(objReturn);
            }, true);
        });
    }
};

export default Object_Intranet_Task_Task;
