//Test TestApplicationBase_Hook class import common methods used in Test Application components  
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name TestControl_Module
 * @summary  Here defining url and Params required for TestControl API call which is returning Properties required to Page
 */
var TestControl_Module = {

    URL: "API/TestApplication/InlineTestPreviewController/TestPreview",

    /**
    * @name GetData
    * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
    * @returns {object} fnCallBack having TestState
    */
    GetData: function (objContext, fnCallback) {

        var objNewParams = {
            "TestState": {
                "TestTaskDetails": objContext.props.TestTaskDetails
            }
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(TestControl_Module.URL, objNewParams, fnCallback);
    },

        /**
     * @name LoadSolution
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
     * @returns {object} fnCallBack having TestState
     */
    LoadSolution: (objParams, fnCallback) => {
        let objNewParams = {
            "Params": objParams
        };
        return new Promise((resolve, reject) => {
            ArcadixFetchData.ExecuteCustom(LoadSolution_Module.URL, 'POST', objNewParams).then(response => response.json()).then(objReturn => {
                console.log("objReturn", objReturn);
                if (objReturn && objReturn != null) {
                    resolve(objReturn);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
};

export default TestControl_Module;