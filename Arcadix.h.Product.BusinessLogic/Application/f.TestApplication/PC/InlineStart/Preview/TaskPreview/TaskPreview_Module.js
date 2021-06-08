//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from "@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor";

/**
 * @name TaskPreview_Module
 * @summary  Here defining url and Params required for TaskPreview API call which is returning Properties required to Page
 * */
var TaskPreview_Module = {

  URL: "API/TestApplication/InlineTaskPreviewController/TaskPreview",

  /**
   * @name GetData
   * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
   * @returns {object} fnCallBack having TestState
   */
  GetData: function (objContext, fnCallback) {
    var objNewParams = {
      TestState: {
        TaskDetails: objContext.props.TaskDetails,
      },
    };
    var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
    return objTestApplicationBase_ModuleProcessor.ExecuteAPI(
      TaskPreview_Module.URL,
      objNewParams,
      fnCallback
    );
  },

  TextResourceUrl: "API/TestApplication/InlineTaskPreviewController/TextResource",

  /**
   * @name GetTextResourceData
   * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack
   * @returns {object} fnCallBack having TestState
   */
  GetTextResourceData: function () {
    var objParams = {
      "TestState": {},
      "MergerNotRequired": true
    };
    return new Promise((resolve, reject) => {
      new TestApplicationBase_ModuleProcessor().ExecuteAPI(TaskPreview_Module.TextResourceUrl, objParams, (objReturn) => {
        if (objReturn && objReturn.Success) {
          resolve(objReturn["json"]["TextResources"]);
        }
        else {
          resolve(null);
        }
      });
    });
  },
};

export default TaskPreview_Module;
