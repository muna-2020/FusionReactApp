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
        objSelectedSchool: {},
        strSchoolId: -1,
        strSchoolName: "",
        arrSchoolData: [],
        blnIsAddClicked: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useLoadSelecedStateSchools(objContext);
}

/**
 * @name useLoadSelecedStateSchools.
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Schools for selected State.  
 */
export function useLoadSelecedStateSchools(objContext) {

    useEffect(() => {
        if (objContext.state.objSelectedState && objContext.state.objSelectedState["iStateId"] && objContext.state.objSelectedState["iStateId"] != -1) {
            objContext.AddCycleSchool_ModuleProcessor.LoadSelectedStateSchools(objContext, objContext.state.objSelectedState["iStateId"]);
        }

    }, [objContext.state.objSelectedState]);
}