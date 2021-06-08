//Module Import
import TaskPreview_Module from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskPreview_Module';

/**
 * @name TaskPreview_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class TaskPreview_ModuleProcessor {

    /**
     * @name InitializeTaskPreviewData
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     */
    InitializeTaskPreviewData(objContext) {
        TaskPreview_Module.GetData(objContext, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            var TestState = ApplicationState.GetProperty('TestState');
            ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
        });
    }

    /**
     * @name InitializeTaskPreviewData
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute
     */
    async GetTextResource(objContext) {
        let objTextResource = await TaskPreview_Module.GetTextResourceData(objContext);
        return objTextResource;
    }
}

export default TaskPreview_ModuleProcessor;
