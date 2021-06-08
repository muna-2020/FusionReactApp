//Test TestApplicationBase_Hook class import common methods used in Test Application components  

/**
 * @name TestApplicationLogin_Module
 * @summary  TestApplicationLogin_Module for validate login and initialize test API Calls
 */
class TestApplicationLogin_Module {
   
    /**
     * @name IntializeTest
     * @param {object} objContext component context
     * @summary makes api call for initializing the test
     * @returns {any} returns fnCallback to load current route
     */
    IntializeTest(objContext, fnCallback) {
        var objNewParams = {
            "URL": "API/TestApplication/TestApplicationLogin/InitializeTest",
            "Params": {},
            "TestState": objContext.props.TestState
        };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(objNewParams.URL, objNewParams, fnCallback); 
    }

    /**
     * @name ValidateLogin
     * @param {object} objContext component context
     * @summary makes api call for validate login
     * @returns {any} returns fnCallback to load current route
     */
    ValidateLogin(objContext, objLoginDetails, fnCallback) {

        objContext.props.TestState["objLoginDetails"] = {
            "Username": "Watson",
            "Token1": "985",
            "Token2": "758",
            "Token3": "561",
            "Token4": "4866",
            
        };

        var objNewParams = {
            "URL": "API/TestApplication/TestApplicationLogin/ValidateLogin",
            "TestState": {
                ...objContext.props.TestState, "ActionType": "StartTestClick"
            }
        };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(objNewParams.URL, objNewParams, fnCallback);
    }
}

export default TestApplicationLogin_Module;