//Module Import
import AutoLogin_Module from '@shared/Application/f.TestApplication/PC/InlineStart/AutoLogin/AutoLogin_Module';


/**
 * @name AutoLogin_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class AutoLogin_ModuleProcessor {

    /**
     * @name InitializeAutoLogin
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute 
     * @returns {object} null
     */
    InitializeAutoLogin(objContext) {
        AutoLogin_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            var TestState = ApplicationState.GetProperty('TestState');
            ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
        });
    }
}

export default AutoLogin_ModuleProcessor;
