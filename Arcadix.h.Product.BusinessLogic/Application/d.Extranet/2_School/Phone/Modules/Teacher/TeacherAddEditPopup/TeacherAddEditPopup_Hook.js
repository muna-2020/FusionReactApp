//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @param {object} objTextResource Passes Text Resource
* @summary State of the teacher component
* @returns {object} Initial state object
*/
export function GetInitialState(objTextResource) {
    return {
        strPasswordMessage: ""
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
* @param {object} objContext Passes Context Object
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TeacherAddEditPopup_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}