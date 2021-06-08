//Module Import
import Course_Module from '@shared/Application/f.TestApplication/PC/InlineStart/Course/Course_Module';


/**
 * @name Course_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class Course_ModuleProcessor {

    /**
     * @name InitializeCourse
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute 
     * @returns {object} null
     */
    InitializeCourse(objContext) {
        Course_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            var TestState = ApplicationState.GetProperty('TestState');
            ApplicationState.SetProperty("objSelectedNode", TestState.objSelectedNode);
            ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
        });
    }
}

export default Course_ModuleProcessor;
