//React Related Imports
import React, { useEffect } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name GetInitialState
* @summary to Get Initial State
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {};
}


/**
 * @name useDataLoaded
 * @summary UseEffect for Animation
 * */

export function useDataLoaded() {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [])
};