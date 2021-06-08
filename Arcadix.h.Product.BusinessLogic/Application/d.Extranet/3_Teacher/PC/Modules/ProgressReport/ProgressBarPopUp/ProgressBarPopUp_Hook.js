//React related imports.
import { useEffect } from 'react';
/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.ProgressBarPopUp_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}