//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name Login_Module
 * @summary  Here defining url and Params required for Login API call which is returning Properties required to Page
 */ 
var Login_Module = {

    URL: "API/TestApplication/InlineLoginController/Login",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (objContext, fnCallback) {

        var SessionKey = "" + new Date().getUTCMilliseconds() + "" + new Date().getHours() + "" + new Date().getMinutes() + "" + new Date().getSeconds() + "" + new Date().getUTCMilliseconds() + "";
        var objNewParams = {
            "SessionKey": SessionKey
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(Login_Module.URL, objNewParams, fnCallback);
    }
};

export default Login_Module;
 

 