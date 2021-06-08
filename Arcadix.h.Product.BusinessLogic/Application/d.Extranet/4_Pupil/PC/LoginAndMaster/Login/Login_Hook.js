﻿//React imports
import { useEffect } from "react";

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {
    return {
        strUserName: "",
        strPassword: "",
        blnLoginFailed: false,
        blnLoginDataNotEntered: false
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.Login_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}