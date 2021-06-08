
//TestApplicationLogin_Module for validate login and initialize test API Calls
import TestApplicationLogin_Module from '@shared/Application/f.TestApplication/PC/Modules/3_Login/TestApplicationLogin_Module';

//For API Calls
import LoginForm_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/3_Login/LoginForm/LoginForm_ModuleProcessor';

/**
 *@name Submit_ModuleProcessor
 *@summary for event on click handling methods
 */
class LoginButton_ModuleProcessor {

    /**
     * @name HandleInputChanges
     * @param {object} objContext event from input tags
     * @summary saves input in Application State
     */
    HandleSubmitClick(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        var objLoginForm_ModuleProcessor = new LoginForm_ModuleProcessor();
        let objValidationObject = objLoginForm_ModuleProcessor.Validate(objContext, true);
        if (objValidationObject === null) {
            var objTestApplicationLogin_Module = new TestApplicationLogin_Module();
            let objLoginDetails = objContext.props.Callbacks.GetLoginInfo();
            if (objLoginDetails) {
                objTestApplicationLogin_Module.ValidateLogin(objContext, objLoginDetails, (objReturn) => {
                    if (objReturn.Success) {
                        var TestState = ApplicationState.GetProperty('TestState');
                        ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
                    }
                    else {
                        ApplicationState.SetProperty("ErrorMessage", objReturn.json.Error);
                    }
                });
            }
        }
    }
}

export default LoginButton_ModuleProcessor;
