//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Test_IntranetTest
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Intranet_Test_IntranetTest = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/Intranet/Test/IntranetTest",

    /**
     * @summary InitialDataCallParam
     **/
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {object} objParam Passes array of Param objects
    * @summary Initialize initial data call param and then adds the IntranetTest object to store
    */
    Initialize: function (objParam) {
        Object_Intranet_Test_IntranetTest.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Test_IntranetTest", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Test_IntranetTest", Object_Intranet_Test_IntranetTest);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for IntranetTest
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        let arrReturn = Object_Intranet_Test_IntranetTest.InitialDataCallParam.map(objCall => {
            return {
                "URL": Object_Intranet_Test_IntranetTest.URL,
                "Params": objCall,
                "MethodType": "Get",
                "UseFullName": true,
                "IsMultiIndexData": "N" 
            };
        });
        return arrReturn;
    },

    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for IntranetTest
     */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTest.URL, objParams, "Get", fnCallback, blnNoCache);

    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for IntranetTest
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTest.URL, objParams, "Post", fnCallback);

    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for IntranetTest
    */
    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTest.URL, objParams, "Put", fnCallback, blnNoCache);

    },

    /**
    * @name DeleteData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary DeleteData for IntranetTest
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_IntranetTest.URL, objParams, "Delete", fnCallback);

    }
};

export default Object_Intranet_Test_IntranetTest;
