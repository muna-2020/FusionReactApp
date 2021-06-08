//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
/**
* @name Object_Intranet_Test_IntranetTestTask
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Intranet_Test_IntranetTestTask = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/Intranet/Test/IntranetTestTask",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {Array} arrObjectParams Passes array of Param objects
    * @summary Initialize initial data call param and then adds the IntranetTest object to store
    */
    Initialize: function (objParam) {
        Object_Intranet_Test_IntranetTestTask.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Test_IntranetTestTask", Object_Intranet_Test_IntranetTestTask);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for IntranetTest
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_IntranetTestTask.URL,
            "Params": Object_Intranet_Test_IntranetTestTask.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

     /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for IntranetTest
     */
    GetData: (objParams, fnCallback) => {      
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTestTask.URL, objParams, "Get", fnCallback);
    },


    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for IntranetTest
    */
    AddData: (objParams, fnCallback) => {
    (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTestTask.URL, objParams, "Post", fnCallback);
    },

     /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for IntranetTest
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTestTask.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary DeleteData for IntranetTest
    */  
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTestTask.URL, objParams, "Delete", fnCallback);
    }

};

export default Object_Intranet_Test_IntranetTestTask;
