
/**
 * @name TestEnd_Module
 * @summary Here defining url and Params required for TestEnd API call which is returning Properties required to Page
 */
var TestEndButton_Module = {

    URL: "API/TestApplication/TestApplicationResult/TestEnd_Click",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (objContext, fnCallback) {

         var objNewParams = {
            "TestState": objContext.props.TestState
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(TestEndButton_Module.URL, objNewParams, fnCallback);
    }
};

export default TestEndButton_Module;   