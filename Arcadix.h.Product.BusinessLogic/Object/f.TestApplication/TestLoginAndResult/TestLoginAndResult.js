//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_TestApplication_TestLoginAndResult
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_TestApplication_TestLoginAndResult = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/TestApplication/TestLoginAndResult",

    /**
     * @summary Initializes Data
     **/
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {Array} arrObjectParams passes objParam
     * @summary Initialize initial data call param and then adds the TestLoginAndResult object to store
     **/
    Initialize: function (objParam) {
        Object_TestApplication_TestLoginAndResult.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_TestApplication_TestLoginAndResult", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_TestApplication_TestLoginAndResult", Object_TestApplication_TestLoginAndResult);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        let arrReturn = Object_TestApplication_TestLoginAndResult.InitialDataCallParam.map(objCall => {
            return {
                "URL": Object_TestApplication_TestLoginAndResult.URL,
                "Params": objCall,
                "MethodType": "Get",
                "UseFullName": true
            };
        });
        return arrReturn;        
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for TestLoginAndResult
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_TestApplication_TestLoginAndResult.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for TestLoginAndResult
    */
    AddData: (objParams, fnCallback) => {
        ArcadixCacheData.AddData("Object_TestApplication_TestLoginAndResult", objParams, fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for TestLoginAndResult
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_TestApplication_TestLoginAndResult.URL, objParams, "Put", fnCallback);
    }
};

export default Object_TestApplication_TestLoginAndResult;
