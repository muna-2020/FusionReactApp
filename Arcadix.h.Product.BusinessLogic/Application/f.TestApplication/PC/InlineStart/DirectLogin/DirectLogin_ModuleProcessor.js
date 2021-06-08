//Module Import
import DirectLogin_Module from '@shared/Application/f.TestApplication/PC/InlineStart/DirectLogin/DirectLogin_Module';


/**
 * @name DirectLogin_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class DirectLogin_ModuleProcessor {

    /**
     * @name InitializeDirectLogin
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     * @returns {object} null
     */
    InitializeDirectLogin(objContext) {
        DirectLogin_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            var TestState = ApplicationState.GetProperty('TestState');
            ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
        });
    }
}

export default DirectLogin_ModuleProcessor;
