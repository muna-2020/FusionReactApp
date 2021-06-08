
/**
 * @name TestApplicationIntroduction_Module
 * @summary common data call methods for Introduction Page
 **/
var LoadSolution_Module = {

    URL: "API/TestApplication/InlineTaskPreviewController/LoadSolution",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack 
     * @returns {object} fnCallBack having TestState 
     */
    GetData: function (objContext, objParams, fnCallback) {
        let TestState = {
            ...objContext.props.TestState, "Params": objParams
        };
        var objNewParams = {
            "URL": LoadSolution_Module.URL,
            "TestState": TestState,
            "MergerNotRequired":true
        };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(LoadSolution_Module.URL, objNewParams, fnCallback);
    }
};

export default LoadSolution_Module;