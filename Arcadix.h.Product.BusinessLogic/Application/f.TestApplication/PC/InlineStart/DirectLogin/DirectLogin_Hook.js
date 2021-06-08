// React related imports.
import { useLayoutEffect } from 'react';

//Component Related Imports
import DirectLogin_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/DirectLogin/DirectLogin_ModuleProcessor';

/**
 * @name GetInitialState
 * @param {object} props Props
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        blnIsLoadComplete: false,
        blnShowSideBar: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks for loading the data
 */
export function Initialize(objContext) {
    ApplicationState.SetProperty('CurrentRoute', { "RouteName": "", "SSRData": "" });
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the InitializeDirectLogin
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let objDirectLogin_ModuleProcessor = new DirectLogin_ModuleProcessor(objContext);
        objDirectLogin_ModuleProcessor.InitializeDirectLogin(objContext);
    }, []);
}
