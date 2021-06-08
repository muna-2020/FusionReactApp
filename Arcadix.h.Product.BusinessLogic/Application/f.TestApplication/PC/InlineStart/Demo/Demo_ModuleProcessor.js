//Module Import
import Demo_Module from '@shared/Application/f.TestApplication/PC/InlineStart/Demo/Demo_Module';


/**
 * @name Demo_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class Demo_ModuleProcessor {

    /**
     * @name InitializeDemoData
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     * @returns {object} null
     */
    InitializeDemoData(objContext) {
       Demo_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            var TestState = ApplicationState.GetProperty('TestState');
            ApplicationState.SetProperty('CurrentRoute', TestState.CurrentRoute);
        });
    }
}

export default Demo_ModuleProcessor;
