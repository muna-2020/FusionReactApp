// React related imports.
import { useLayoutEffect } from 'react';

//Component related Import
import TaskContentPreview_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview/TaskContentPreview_ModuleProcessor';

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

}

/**
* @name useDataLoader
* @param {object} objContext takes objContext
* @summary   Calls the InitializeTaskContentPreviewData.
* @returns {object} null
*/
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!objContext.props.PageJson) {
            let objTaskContentPreview_ModuleProcessor = new TaskContentPreview_ModuleProcessor(objContext);
            objTaskContentPreview_ModuleProcessor.InitializeTaskContentPreviewData(objContext);
        }
    }, [objContext.props.TaskDetails]);
}
