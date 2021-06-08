//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @param {object} objTextResource objTextResource
* @summary State of the teacher component
* @returns {object} Initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        objSchoolRegistration: {},
        strPasswordMessage: "",
        strImagePath: "",
        blnShowLoginLink: false,
        blnEmailAlreadyRegistered: false
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/** 
* @name useDataLoader
* @param {object} objContext objContext
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.SchoolRegistration_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            Object.keys(objContext.state.objSchoolRegistration).length > 0
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    },
        [
            objContext.state.objSchoolRegistration
        ]);
}