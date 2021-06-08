//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name TaskContentPreview_Module
 * @summary  Here defining url and Params required for TaskContentPreview API call which is returning Properties required to Page
 * */
var TaskContentPreview_Module = {

    URL: "API/TestApplication/InlineTaskPreviewController/TaskPreview",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (objContext, fnCallback) {

        var objNewParams = {
            "TestState": {
                "TaskDetails": objContext.props.TaskDetails
            }
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(TaskContentPreview_Module.URL, objNewParams, fnCallback);
    }
};

export default TaskContentPreview_Module;