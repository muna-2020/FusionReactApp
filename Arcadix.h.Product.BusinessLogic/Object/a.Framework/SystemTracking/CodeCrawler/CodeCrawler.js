//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Framework_SystemTracking_CodeCrawler
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Framework_SystemTracking_CodeCrawler = {

    //InitialDataCallParam: null,

    //Initialize: function (objCodeCrawlerParam) {

    //    Object_Framework_SystemTracking_CodeCrawler.InitialDataCallParam = objCodeCrawlerParam;
    //    ArcadixCacheData.AddEntityObject("Object_Framework_SystemTracking_CodeCrawler", Object_Framework_SystemTracking_CodeCrawler);
    //},

    //GetInitialDataCall: function () {
    //    return {
    //        "URL": "API/Object/Framework/SystemTracking/CodeCrawler",
    //        "Params": Object_Framework_SystemTracking_CodeCrawler.InitialDataCallParam,
    //        "MethodType": "Get",
    //        "UseFullName": true,
    //        //"IsMultiIndexData": "Y"
    //    };
    //},

    //GetData: (objParams, fnCallback) => {
    //    (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_SystemTracking_CodeCrawler.URL, objParams, "Get", fnCallback);
    //},










    /**
    * @summary URL
    */
    URL: "API/Object/Framework/SystemTracking/CodeCrawler",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the TestCase object to store
    */
    Initialize: function (objParam) {
        Object_Framework_SystemTracking_CodeCrawler.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Framework_SystemTracking_CodeCrawler", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Framework_SystemTracking_CodeCrawler", Object_Framework_SystemTracking_CodeCrawler);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for TestCase
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_SystemTracking_CodeCrawler.URL,
            "Params": Object_Framework_SystemTracking_CodeCrawler.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for TestCase
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_SystemTracking_CodeCrawler.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Framework_SystemTracking_CodeCrawler;