//Module Import
import TestControl_Module from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TestPreview/TestControl/TestControl_Module';

/**
 * @name TestControl_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class TestControl_ModuleProcessor {

    /**
     * @name InitializeTestControlData
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     */
    InitializeTestControlData(objContext) {
        TestControl_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            var TestState = ApplicationState.GetProperty('TestState');
            ApplicationState.SetProperty('CurrentRoute', TestState.CurrentRoute);
        });
    }

    async LoadSolution(objContext, objParams) {
        let objReturn = await LoadSolution_Module.LoadSolution(objParams);
        if (objReturn !== null) {
            objContext.dispatch({ type: "SET_STATE", payload: { "EvaluationResponse": objReturn } });
        }
    }
}

export default TestControl_ModuleProcessor;
 