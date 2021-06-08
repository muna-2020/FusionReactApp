// React related imports.
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        arrSchoolData: [],
        arrTeacherData: [],
        arrClassData: [],
        objSearchFilters: { "iStateId": -1, "uSchoolId": -1, "uTeacherId": -1, "uClassId": -1, "cIsDeleted": "N", "cIsTestSchool": "N", "cIsExternal": "N", "cIsViewed": 1, "cIsStellwerk": "N"},
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize method call to load the initial data
 */
export function Initialize(objContext) {
    useLoadTheSelecedSateSchools(objContext);
    useLoadTheSelecedSchoolTeachers(objContext);
    useLoadTheSelecedTeacherClass(objContext);
}

/**
 * @name useLoadTheSelecedSateSchools.
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Schools for selected State.
 */
export function useLoadTheSelecedSateSchools(objContext) {
    useEffect(() => {
        if (objContext.state.objSearchFilters.iStateId != -1) {
            objContext.PupilManagementSearch_ModuleProcessor.LoadSelectedStateSchools(objContext, objContext.state.objSearchFilters.iStateId);
        }

    }, [objContext.state.objSearchFilters.iStateId]);
}

/**
 * @name useLoadTheSelecedSchoolTeachers.
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Schools for selected State.
 *  
 */
export function useLoadTheSelecedSchoolTeachers(objContext) {

    useEffect(() => {
        if (objContext.state.objSearchFilters.uSchoolId != -1) {
            objContext.PupilManagementSearch_ModuleProcessor.LoadSelectedSchoolTeachers(objContext, objContext.state.objSearchFilters.uSchoolId);
        }

    }, [objContext.state.objSearchFilters.uSchoolId]);
}

/**
 * @name useLoadTheSelecedTeacherClass.
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Schools for selected State.
 *  
 */
export function useLoadTheSelecedTeacherClass(objContext) {

    useEffect(() => {
        if (objContext.state.objSearchFilters.uTeacherId != -1) {
            objContext.PupilManagementSearch_ModuleProcessor.LoadSelectedTeacherClass(objContext, objContext.state.objSearchFilters.uTeacherId);
        }

    }, [objContext.state.objSearchFilters.uTeacherId]);
}

