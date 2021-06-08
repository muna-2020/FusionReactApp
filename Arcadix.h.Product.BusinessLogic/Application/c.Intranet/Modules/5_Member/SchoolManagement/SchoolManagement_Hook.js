// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Extranet_School_Title)["Data"]
        && DataRef(props.Object_Extranet_State_State)["Data"]
        && DataRef(props.Object_Extranet_School_SchoolType)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strStateId: -1,
        blnIsCachingFilterEnabled: false,
        objSearchFilters: { "iStateId": -1, "cIsDeleted": "N", "dtWhenLoginlEmailSent": "", "cIsTestSchool": "N" },
        objTempSearchFilters: { "cIsDeleted": "N" },
        objData: {},
        blnIsPaginationClicked: false,
        iRowsPerPage: 10,
        iFrom: 1,
        iPageNumber: 1,
        intTotalRowCount: 0,
        arrSchoolAdministratorData: []
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
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.SchoolManagement_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
            window.dispatchEvent(new Event('resize'));
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Extranet_School_Title)["Data"]
            && DataRef(objContext.props.Object_Extranet_State_State)["Data"]
            && DataRef(objContext.props.Object_Extranet_School_SchoolType)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            window.dispatchEvent(new Event('resize'));
        }
    }, [
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props),
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.state.arrSchoolAdministratorData
    ]);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.SchoolManagement_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.SchoolManagement_ModuleProcessor.SetRibbonData(objContext);
    }
}

