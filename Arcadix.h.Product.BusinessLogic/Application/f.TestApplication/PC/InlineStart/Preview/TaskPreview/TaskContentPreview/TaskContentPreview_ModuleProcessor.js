//Module Import
import TaskContentPreview_Module from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview/TaskContentPreview_Module';

/**
 * @name TaskContentPreview_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class TaskContentPreview_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "TestState" }, "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/f.TestApplication/Modules/5_Task/Task"];
    }

    /**
     * @name InitializeTaskContentPreviewData
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     * @returns {object} null
     */
    InitializeTaskContentPreviewData(objContext) {
        TaskContentPreview_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            ApplicationState.SetProperty('CurrentRoute', "Task");
        });
    }
}

export default TaskContentPreview_ModuleProcessor;
