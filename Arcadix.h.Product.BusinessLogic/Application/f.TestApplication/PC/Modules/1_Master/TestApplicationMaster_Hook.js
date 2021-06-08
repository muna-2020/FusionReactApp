//React Related Imports
import React, { useEffect } from 'react';

//Component Related import
import TestApplicationMaster_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/1_Master/TestApplicationMaster_ModuleProcessor';

/**
 * @name GetInitialState
 * @param {object} props Props
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        blnIsLoadComplete: false,
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks for loading the data
 * @returns {object} null
 */
export function Initialize(objContext) {
    if (ApplicationState.GetProperty("CurrentRoute") === undefined) {
        ApplicationState.SetProperty('CurrentRoute', { "RouteName": "", "SSRData": "" });
    }
    ApplicationState.SetProperty("blnShowAnimation", true);
    useDataLoader(objContext);
    ApplicationState.SetProperty("blnShowAnimation", false);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the InitializeTestApplication
 * @returns {object} null
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        let objTestApplicationMaster_ModuleProcessor = new TestApplicationMaster_ModuleProcessor(objContext);
        objTestApplicationMaster_ModuleProcessor.InitializeTestApplication(objContext);
    }, []);
}
