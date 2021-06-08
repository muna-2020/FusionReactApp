// React related imports.
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState() {
    return {
        //Search
        strStateId: -1,
        arrSchoolData: [],
        objSearchFilters: { "iStateId": -1, "cIsDeleted": "N", "dtWhenLoginlEmailSent": "", "cIsTestSchool": "N" ,"cIsStellwerk": "N" },
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize method call to laod the initial data
 */
export function Initialize(objContext) {
    useLoadTheSelecedSateSchools(objContext);
}

/**
 * @name useLoadTheSelecedFolder.
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Schools for selected State.
 */
export function useLoadTheSelecedSateSchools(objContext) {
    useEffect(() => {
        if (objContext.state.strStateId != -1) {
            objContext.SchoolManagementSearch_ModuleProcessor.LoadSelectedStateSchools(objContext, objContext.state.strStateId);
        }

    }, [objContext.state.strStateId]);
}

