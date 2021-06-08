// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        strPerCentage: "",
        strFilePath: "",
        strDisplayFileName: "",
        strExecutionName: props.Data.ExecutionName
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useGeneratePdf(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useGeneratePdf(objContext) {
    useLayoutEffect(() => {
        //objContext.GenereateTaskPdf_ModuleProcessor.GenerateTaskPdf(objContext);
    }, []);
}