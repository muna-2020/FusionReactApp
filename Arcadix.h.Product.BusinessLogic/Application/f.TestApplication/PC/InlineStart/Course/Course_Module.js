//TestApplicationBase_ModuleProcessor for common API call Method for Test Application and merging the TestState into Application State
import TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

/**
 * @name CourseTest_Module
 * @summary Here defining url and Params required for Course API call which is returning Properties required to load introduction
 * or Task Page.
 */
var Course_Module = {

    URL: "API/TestApplication/InlineCourseController/Course",

    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack 
     * @returns {object} fnCallBack having TestState
     */
    GetData: function (objContext, fnCallback) {

        var objNewParams = {
            "LoginDetails": objContext.props.LoginDetails
        };

        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(Course_Module.URL, objNewParams, fnCallback);
    }
};

export default Course_Module;