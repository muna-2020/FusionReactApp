//Module Import
import Login_Module from '@shared/Application/f.TestApplication/PC/InlineStart/Login/Login_Module';

/**
 * @name Login_ModuleProcessor
 * @summary fAPI is getting called for TestState and to set CurrentComponent
 */
class Login_ModuleProcessor {

    /**
     * @name InitializeLoginData
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     * @returns {object} null
     */
    InitializeLoginData(objContext) {
        Login_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            var TestState = ApplicationState.GetProperty('TestState');
            ApplicationState.SetProperty('CurrentRoute', TestState.CurrentRoute);
        });
    }
}

export default Login_ModuleProcessor;
