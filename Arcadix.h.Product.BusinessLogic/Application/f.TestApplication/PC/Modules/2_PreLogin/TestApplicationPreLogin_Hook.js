// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import TestApplicationPreLogin_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/TestApplicationPreLogin_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        objValidationMessages: null,
        PreLoginDetails: props.TestState ? props.TestState.PreLoginCredentials ? { ...props.TestState.PreLoginCredentials } : {} : {} 
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    ApplicationState.SetProperty("blnShowAnimation", false);
}
