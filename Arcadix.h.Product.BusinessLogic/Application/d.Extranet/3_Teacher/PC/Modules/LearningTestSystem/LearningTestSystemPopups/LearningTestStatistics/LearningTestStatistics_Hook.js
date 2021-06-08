//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the Licenses component
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        arrTaskData: [],
        isLoadComplete: false,
        OpenTestInPopup: "Y",
        blnAllTasks: false,
        iTab:1
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary Custom hook which is to make data call when component loaded.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.LearningTestStatistics_ModuleProcessor.LoadInitialTestData(objContext);
    }, []);
}
