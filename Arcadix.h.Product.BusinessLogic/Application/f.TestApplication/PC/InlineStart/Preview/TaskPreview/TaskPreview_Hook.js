// React related imports.
import { useEffect } from 'react';

//Component related Import
import TaskPreview_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskPreview_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        blnIsLoadComplete: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks for loading the data
 * @returns {object} null
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary   Calls the InitializeTaskPreviewData.
 * @returns {object} null
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        if (!objContext.props.PageJson) {
            let objTaskPreview_ModuleProcessor = new TaskPreview_ModuleProcessor(objContext);
            objTaskPreview_ModuleProcessor.InitializeTaskPreviewData(objContext);
        }
        else {
            LoadPreviewWithPageJson(objContext);
        }
    }, []);
}

const LoadPreviewWithPageJson = async (objContext) => {
    ApplicationState.SetProperty('blnShowAnimation', true);
    let objTaskPreview_ModuleProcessor = new TaskPreview_ModuleProcessor(objContext);
    let objTextResource = await objTaskPreview_ModuleProcessor.GetTextResource(objContext);
    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
    ApplicationState.SetProperty('CurrentRoute', { "RouteName": "Task" });
    ApplicationState.SetProperty('blnShowAnimation', false);
    ApplicationState.SetProperty("TestState", {
        "TaskPageProperties": {
            "IsEditorPreview": "Y",
            "PageJson": objContext.props.PageJson,
            "TaskConfigurationProperties": objContext.props.PageProperties,
            "Subjects": objContext.props.Subjects,
            "TextResources": objTextResource,
        },
        "IsInline": true,
        "TaskPreview": objContext.props.IsTaskPreview,
        "CurrentRoute": "Task"
    });
}
