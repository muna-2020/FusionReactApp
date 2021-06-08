//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from "@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor";

/**
 * @name AutoLoginTest_Module
 * @summary Here defining url and Params required for AutoLogin API call which is returning Properties required to load introduction
 * or Task Page.
 */
var AutoLogin_Module = {
  URL: "API/TestApplication/InlineAutoLoginController/AutoLogin",

  /**
   * @name GetData
   * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
   * @returns {object} fnCallBack having TestState
   */
  GetData: function (objContext, fnCallback) {
    var objNewParams = {
      TestState: {
        LoginDetails: objContext.props.LoginDetails,
      },
    };

    var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
    return objTestApplicationBase_ModuleProcessor.ExecuteAPI(
      AutoLogin_Module.URL,
      objNewParams,
      fnCallback
    );
  },
};

export default AutoLogin_Module;
