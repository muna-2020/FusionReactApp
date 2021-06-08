// React related imports.
import { useLayoutEffect } from 'react';

//Component Related Imports
import AutoLogin_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/AutoLogin/AutoLogin_ModuleProcessor';

/**
 * @name GetInitialState
 * @param {object} props Props
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
 * @summary Calls the InitializeAutoLogin
 * @returns {object} null
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let objAutoLogin_ModuleProcessor = new AutoLogin_ModuleProcessor(objContext);
        objAutoLogin_ModuleProcessor.InitializeAutoLogin(objContext);
    }, []);
}
