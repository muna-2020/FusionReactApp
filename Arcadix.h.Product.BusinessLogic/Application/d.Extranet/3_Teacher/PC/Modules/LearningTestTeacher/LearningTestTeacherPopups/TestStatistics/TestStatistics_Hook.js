//React imports 
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState() {
    return {
        arrTaskData: [],
        arrPupilData: [],
        arrCategoryData: [],
        arrTaskDropdownData: [],
        arrCategoryCompetencyData: [],
        arrPupilTaskStatusData: [],
        arrAllTaskData: [],
        arrTaskDifficultyLevelData: [],
        objSelectedTask: undefined,
        isLoadComplete: false
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TestStatistics_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}