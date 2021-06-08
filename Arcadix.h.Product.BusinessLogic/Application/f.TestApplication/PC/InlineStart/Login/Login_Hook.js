// React related imports.
import { useLayoutEffect } from 'react';

//Component Related Imports
import Login_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/Login/Login_ModuleProcessor';

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
 * @summary   Calls the InitializeLoginData Method 
 * @returns {object} null
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let objLogin_ModuleProcessor = new Login_ModuleProcessor(objContext);
        objLogin_ModuleProcessor.InitializeLoginData(objContext);
    }, []);
}
