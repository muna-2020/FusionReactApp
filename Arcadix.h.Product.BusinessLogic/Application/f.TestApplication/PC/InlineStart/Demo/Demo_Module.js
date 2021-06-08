//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name Demo_Module
 * @summary Here defining url and Params required for Demo API call which is returning Properties required to Page
 */
var Demo_Module = {

    URL: "API/TestApplication/InlineDemoController/Demo",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (objContext, fnCallback) {

        var objNewParams = {
            "TestState": {
                "TestTaskDetails": objContext.props.TestTaskDetails
            }
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(Demo_Module.URL, objNewParams, fnCallback);
    }
};

export default Demo_Module;