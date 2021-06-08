// React related imports.
import { useEffect } from 'react';

/**
 * @name useInitializeModuleTabData
 * @param {*} objContext objContext
 * @summary useEffect to setTabData with the first tab as selected
 */
export function useInitializeModuleTabData(objContext) {
    useEffect(() => {
        var objTabData = {
            TabData: ApplicationState.GetProperty("TabData")
        };
            ApplicationState.SetProperty("ModuleTabData", { "DatabaseCompare": objTabData });            
    }, []);
}
