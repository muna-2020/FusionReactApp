import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Test_TestFolder
* @summary TestFolder object
*/
var Object_Intranet_Test_TestFolder = {
    
    /**
     * @summary URL
     */
    URL: "API/Object/Intranet/Test/TestFolder",
    
    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the TestFolder object to store
     */
    Initialize: function (objParam) {
        Object_Intranet_Test_TestFolder.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Test_TestFolder", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Test_TestFolder", Object_Intranet_Test_TestFolder);
        });
    },
        
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for TestFolder
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_TestFolder.URL,
            "Params": Object_Intranet_Test_TestFolder.InitialDataCallParam,
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
     * @summary GetData for TestFolder
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_TestFolder.URL, objParams, "Get", fnCallback);
    },
        
    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for TestFolder
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_TestFolder.URL, objParams, "Post", fnCallback);
    },
    
    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for TestFolder
     */    
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_TestFolder.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for TestFolder
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_TestFolder.URL, objParams, "Delete", fnCallback);
    }  
};

export default Object_Intranet_Test_TestFolder;