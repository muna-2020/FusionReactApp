//Test TestApplicationBase_Hook class import common methods used in Test Application components  

/**
 * @name TestApplicationPreLogin_Module
 * @summary  TestApplicationPreLogin_Module for validate Prelogin API Calls
 */
class TestApplicationPreLogin_Module {

    /**
     * @name ValidatePreLogin
     * @param {object} objContext component context
     * @summary Validate PreLogin API call 
     * @returns {any} returns fnCallback to load current route
     */
    ValidatePreLogin(objContext, fnCallback) {

        objContext.props.TestState["PreLoginCredentials"] = objContext.props.Callbacks.GetPreLoginInfo();
        var objNewParams = {
            "URL": "API/TestApplication/TestApplicationPreLogin_Module/ValidatePreLogin",
            "Params": {},
            "TestState": objContext.props.TestState
        };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(objNewParams.URL, objNewParams, fnCallback);
    } 
}

export default TestApplicationPreLogin_Module;
