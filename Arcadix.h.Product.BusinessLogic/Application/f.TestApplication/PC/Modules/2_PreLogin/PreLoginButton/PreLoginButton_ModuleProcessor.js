//TestApplicationPreLogin_Module for validate login and initialize test API Calls
import TestApplicationPreLogin_Module from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/TestApplicationPreLogin_Module';

//For API Calls
import PreLoginForm_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/PreLoginForm/PreLoginForm_ModuleProcessor';


/**
 * @name Submit_ModuleProcessor
 * @summary  Submit_ModuleProcessor for validate and render Login page
 */
class PreLoginButton_ModuleProcessor {

/**
 * @name HandleSubmitClick
 * @param {object} objContext
 * @summary Handle Submit Click for PreLogin and rendering Login Page
 * @returns Login Page or Error Message
 */
    HandleSubmitClick(objContext) {
        var objPreLoginForm_ModuleProcessor = new PreLoginForm_ModuleProcessor();
        let objValidationObject = objPreLoginForm_ModuleProcessor.Validate(objContext, true);
        if (objValidationObject === null) {
            var objTestApplicationPreLogin_Module = new TestApplicationPreLogin_Module();
            objTestApplicationPreLogin_Module.ValidatePreLogin(objContext, (objReturn) => {
                if (objReturn.Success) {
                    var TestState = ApplicationState.GetProperty('TestState');
                    ApplicationState.SetProperty('CurrentRoute', TestState.CurrentRoute);
                }
                else {
                    alert("Login unsuccessful : " + objReturn.json.Error + "");                
                }
            })
        }
    }
}

export default PreLoginButton_ModuleProcessor;