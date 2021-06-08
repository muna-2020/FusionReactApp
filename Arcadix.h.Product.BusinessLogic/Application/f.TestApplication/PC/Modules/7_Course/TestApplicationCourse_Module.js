//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name AutoLoginTest_Module
 * @summary Here defining url and Params required for Course API call which is returning Properties required to load introduction
 * or Task Page.
 */
var TestApplicationCourse_Module = {

    URL: "API/TestApplication/TestApplicationCourse/PageJson",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack 
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (ActionType,objContext, fnCallback) {
        let objTestState = { "SelectedNode": objContext, "iPageId": objContext.iPageId, "ActionType": ActionType };
        clearInterval(objsetInterval);
        TimeTakenByTask = 0;

        var objNewParams = {
            "TestState": objTestState,
        };

    var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(TestApplicationCourse_Module.URL, objNewParams, fnCallback);
    }
};

export default TestApplicationCourse_Module;