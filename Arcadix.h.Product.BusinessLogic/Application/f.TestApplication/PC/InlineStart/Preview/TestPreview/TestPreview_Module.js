//Test TestApplicationBase_Hook class import common methods used in Test Application components  
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name TestPreview_Module
 * @summary  Here defining url and Params required for TestPreview API call which is returning Properties required to Page
 */
var TestPreview_Module = {

    URL: "API/TestApplication/InlineTestPreviewController/TestPreview",

    /**
    * @name GetData
    * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
    * @returns {object} fnCallBack having TestState
    */
    GetData: function (objContext, fnCallback) {

        var objNewParams = {
            "TestState" : {
                "TestTaskDetails": objContext.props.TestTaskDetails
            }
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(TestPreview_Module.URL, objNewParams, fnCallback);
    }
};

export default TestPreview_Module;