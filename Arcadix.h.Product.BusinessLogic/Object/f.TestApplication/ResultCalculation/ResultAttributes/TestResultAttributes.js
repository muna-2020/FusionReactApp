//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_TestApplication_TestResultAttributes
 * @summary This object consists of storing,initializing the params in store and have get and edit  function.
 **/
var Object_TestApplication_TestResultAttributes = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/TestApplication/TestResultAttributes",

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
        Object_TestApplication_TestResultAttributes.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_TestApplication_TestResultAttributes", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_TestApplication_TestResultAttributes", Object_TestApplication_TestResultAttributes);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_TestApplication_TestResultAttributes.URL,
            "Params": Object_TestApplication_TestResultAttributes.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true 
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for TestLoginAndResult
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_TestApplication_TestResultAttributes.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for TestLoginAndResult
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_TestApplication_TestResultAttributes.URL, objParams, "Put", fnCallback);
    }
};

export default Object_TestApplication_TestResultAttributes;
