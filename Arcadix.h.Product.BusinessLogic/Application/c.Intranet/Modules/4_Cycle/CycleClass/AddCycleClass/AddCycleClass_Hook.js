// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        objSelectedState: props.Data.DropdownData.SelectedState ? props.Data.DropdownData.SelectedState : {},
        objSelectedSchool: props.Data.DropdownData.SelectedSchool ? props.Data.DropdownData.SelectedSchool : {},
        objSelectedTeacher: {},
        objSelectedClass: {},
        arrSchoolData: [],
        arrTeacherData: [],
        arrClassData: [],
        blnIsAddClicked:false
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useLoadSelecedStateSchools(objContext);
    useLoadSelecedSchoolTeachers(objContext);
    useLoadSelecedTeacherClass(objContext);
}

/**
 * @name useLoadSelecedStateSchools.
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Schools for selected State.  
 */
export function useLoadSelecedStateSchools(objContext) {

    useEffect(() => {
        if (objContext.state.objSelectedState && objContext.state.objSelectedState["iStateId"] && objContext.state.objSelectedState["iStateId"] != -1) {
            objContext.AddCycleClass_ModuleProcessor.LoadSelectedStateSchools(objContext, objContext.state.objSelectedState["iStateId"]);
        }
    }, [objContext.state.objSelectedState]);
}

/**
 * @name useLoadSelecedSchoolTeachers.
 * @param {object} objContext takes  objContext.
 * @summary On SchoolDropdown change, loads the Teachers for selected School. 
 */
export function useLoadSelecedSchoolTeachers(objContext) {

    useEffect(() => {
        if (objContext.state.objSelectedSchool && objContext.state.objSelectedSchool["uSchoolId"] && objContext.state.objSelectedSchool["uSchoolId"] != -1) {
            objContext.AddCycleClass_ModuleProcessor.LoadSelectedSchoolTeachers(objContext, objContext.state.objSelectedSchool["uSchoolId"]);
        }
    }, [objContext.state.objSelectedSchool]);
}

/**
 * @name useLoadSelecedTeacherClass.
 * @param {object} objContext takes  objContext.
 * @summary On TeacherDropdown change, loads the Class for selected Teacher. 
 */
export function useLoadSelecedTeacherClass(objContext) {

    useEffect(() => {
        if (objContext.state.objSelectedTeacher && objContext.state.objSelectedTeacher["uTeacherId"] && objContext.state.objSelectedTeacher["uTeacherId"] != -1) {
            objContext.AddCycleClass_ModuleProcessor.LoadSelectedTeacherClass(objContext, objContext.state.objSelectedTeacher["uTeacherId"]);
        }
    }, [objContext.state.objSelectedTeacher]);
}