 //Module Import
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name TestApplicationTask_Module
 * @summary  Next Task Button API Call
 */
class TestApplicationTask_Module {
    
    /**
     * @name NextTaskButtonClick
     * @param {object} objContext component context
     * @summary here we are implementing Next Task API call for getting Next Task 
     * @returns {any} returns fnCallback to load current route
     */
    NextTaskButtonClick(objContext, objParams, fnCallback) {
        let TestState = {
            ...objContext.TestState, "AnswerJson": objParams["AnswerJson"], "TimeTakenByTask": objContext.TestState.TimeTakenByTask,
            "SaveAndClose": objParams["SaveAndClose"], "NextTaskIndex": objParams["NextTaskIndex"], "ActionType": "NextTaskClick", "iPageId": objContext.props.TestState.TaskPageProperties.PageJson.iPageId
        };
        clearInterval(objsetInterval);
        TimeTakenByTask = 0;

            var objNewParams = {
                "URL": "API/TestApplication/TestApplicationTask/NextTask_Click",
                "TestState": TestState,
            };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(objNewParams.URL, objNewParams, fnCallback); 
        }
}
export default TestApplicationTask_Module;