// React related impoprts.
import { useLayoutEffect } from 'react';

//Component Related Imports
import TestPreview_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TestPreview/TestPreview_ModuleProcessor';


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
    ApplicationState.SetProperty('CurrentRoute', { "RouteName": "", "SSRData": "" });
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary   Calls the InitializeTestPreviewData.
 * @returns {object} null
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let objTestPreview_ModuleProcessor = new TestPreview_ModuleProcessor(objContext);
        objTestPreview_ModuleProcessor.InitializeTestPreviewData(objContext);
    }, [objContext.props.TestTaskDetails.iTestId]);
}
