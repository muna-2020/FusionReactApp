//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name TestApplicationMaster_Module
 * @summary Here defining url and Params required for TestApplicationMaster API call which is returning Properties required to Page
 */
var TestApplicationMaster_Module = {

    URL: "API/TestApplication/TestApplicationMaster/TestState",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (objContext, fnCallback) {
        let ApplicationType = objContext.ApplicationType ? objContext.ApplicationType : "React";
        let DeviceType = objContext.props.DeviceType ? objContext.props.DeviceType : "";
        var objNewParams = {
            "TestState": {
                "ApplicationType": ApplicationType,
                "DeviceType": DeviceType,
            }
        };
        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(TestApplicationMaster_Module.URL, objNewParams, fnCallback);
    }
};

export default TestApplicationMaster_Module;