//React related impoprts.
import { useEffect } from 'react';


/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strSelectedSchoolId: ''
    }
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.SchoolDropdown_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @summary Custom hook which will check if all the data is loaded
 * @param {any} props
 * @param {any} state
 * @param {any} dispatch
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;cIsDeleted;N")) {
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            //ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
        objContext.props.Object_Extranet_School_School
    ]);
}