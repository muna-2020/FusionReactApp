//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name DirectLoginTest_Module
 * @summary Here defining url and Params required for DirectLogin API call which is returning Properties required to load introduction
 * or Task Page.
 */
var DirectLogin_Module = {

    URL1: "API/TestApplication/InlineDirectLoginController/DirectLogin",
    URL2: "API/TestApplication/InlineDirectLoginController/DirectLoginNextTask",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack 
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (objContext, fnCallback) {
        var objNewParams = {
            "TestState": {
                "LoginDetails": objContext.props.LoginDetails
            }
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(DirectLogin_Module.URL1, objNewParams, fnCallback);
    },

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack 
     * @returns {object} fnCallBack having TestState
     */
    GetData1: function (objContext,objParams, fnCallback) {
         var objNewParams = {
             "TestState": objParams
        };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(DirectLogin_Module.URL2, objNewParams, fnCallback);
    }
};

export default DirectLogin_Module;