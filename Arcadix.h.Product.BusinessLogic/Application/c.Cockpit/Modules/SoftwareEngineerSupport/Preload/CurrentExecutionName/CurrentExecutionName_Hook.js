// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        ExecutionName: ApplicationState.GetProperty("vExecutionName")
    };
}