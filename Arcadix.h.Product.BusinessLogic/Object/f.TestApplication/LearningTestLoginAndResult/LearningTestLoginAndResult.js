//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_TestApplication_LearningTestLoginAndResult
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_TestApplication_LearningTestLoginAndResult = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/TestApplication/LearningTestLoginAndResult",

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
        Object_TestApplication_LearningTestLoginAndResult.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_TestApplication_LearningTestLoginAndResult", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_TestApplication_LearningTestLoginAndResult", Object_TestApplication_LearningTestLoginAndResult);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        let arrReturn = Object_TestApplication_LearningTestLoginAndResult.InitialDataCallParam.map(objCall => {
            return {
                "URL": Object_TestApplication_LearningTestLoginAndResult.URL,
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
        (new ArcadixCetchAndCacheData()).ExecuteSingle(Object_TestApplication_LearningTestLoginAndResult.URL, objParams, "Get", fnCallback);
    }
};

export default Object_TestApplication_LearningTestLoginAndResult;
