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
        strImportHeaderText: Localization.TextFormatter(objTextResource, 'importData_uploadFile'),
        blnShowReportHref: false,
        blnIsReportGenerated: false,
        blnIsFileUploadAttempted: false,
        strClassContent: '',
        strClassNextSlideContent: 'hideContent'
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
        objContext.ImportData_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}