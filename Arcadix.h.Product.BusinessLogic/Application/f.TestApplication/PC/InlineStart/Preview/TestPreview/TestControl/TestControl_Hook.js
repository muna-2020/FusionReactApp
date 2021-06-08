// React related impoprts.
import { useLayoutEffect } from 'react';

//Component Related Imports
import TestControl_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TestPreview/TestControl/TestControl_ModuleProcessor';

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
 * @summary   Calls the InitializeTestControlData.
 * @returns {object} null
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let objTestControl_ModuleProcessor = new TestControl_ModuleProcessor(objContext);
        objTestControl_ModuleProcessor.InitializeTestControlData(objContext);
    }, []);
}
