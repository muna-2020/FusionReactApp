// React related imports.
import { useEffect, useLayoutEffect, useRef } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        strPerCentage: 20,
        strFilePath: "",
        strDisplayFileName: props.Data.DisplayFileName,
        //refProgressPercentage: useRef(20)
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
        objContext.GenerateOnlineHelpContentPdf_ModuleProcessor.GenerateOnlineHelpContentPdf(objContext);
    }, []);
}