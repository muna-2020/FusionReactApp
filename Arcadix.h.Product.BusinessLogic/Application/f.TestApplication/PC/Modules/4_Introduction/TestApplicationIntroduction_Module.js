
/**
 * @name TestApplicationIntroduction_Module
 * @summary common data call methods for Introduction Page
 **/
var TestApplicationIntroduction_Module = {

    URL: "API/TestApplication/TestApplicationIntroduction/StartTest",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack 
     * @returns {object} fnCallBack having TestState 
     */
    GetData: function (objContext, fnCallback) {
        var objNewParams = {
            "URL": TestApplicationIntroduction_Module.URL,
                "TestState": {
                    ...objContext.props.TestState,"ActionType":"StartTestClick" }
        };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(TestApplicationIntroduction_Module.URL, objNewParams, fnCallback); 
    }
};



export default TestApplicationIntroduction_Module;