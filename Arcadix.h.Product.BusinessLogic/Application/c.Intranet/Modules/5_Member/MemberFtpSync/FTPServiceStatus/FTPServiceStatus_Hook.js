// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strFtpProcessStatus: null
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useGetFtpServiceStatus(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.FTPServiceStatus_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty("OfficeRibbonData", []);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus", objContext.props),
            objContext.state.strFtpProcessStatus
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus"],
        objContext.state.strFtpProcessStatus
    ]);
}

/**
 * @name useGetFtpServiceStatus
 * @param {any} objContext
 * @summary Calls the API to check the service
 */
export function useGetFtpServiceStatus(objContext) {
    useEffect(() => {
        objContext.FTPServiceStatus_ModuleProcessor.GetFtpServiceStatus(objContext);
    }, []);
}