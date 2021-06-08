//Module Import
import TestPreview_Module from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TestPreview/TestPreview_Module';

/**
 * @name TestPreview_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class TestPreview_ModuleProcessor {

    /**
     * @name InitializeTestPreviewData
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     * @returns {object} null
     */
    InitializeTestPreviewData(objContext) {
        TestPreview_Module.GetData(objContext, (objReturn) => {
               objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
               var TestState = ApplicationState.GetProperty('TestState');
               ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
        });
    }
}

export default TestPreview_ModuleProcessor;
 