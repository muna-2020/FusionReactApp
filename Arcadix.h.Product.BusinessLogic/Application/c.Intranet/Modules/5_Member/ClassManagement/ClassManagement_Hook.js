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
    ApplicationState.SetProperty("blnShowAnimation", false);
    if (
        DataRef(props.Object_Extranet_School_School)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
        && DataRef(props.Object_Extranet_Teacher_SchoolYear)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSearchFilters: {},
        arrClassManagmentData:[],
        objData: {},
        ipageNumber:-1,
        iRowsPerPage: 10,
        iTotalRowCount: 0,
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
        objContext.ClassManagement_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaderOnPaginationClick
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useDataLoaderOnPaginationClick(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.ClassManagement_ModuleProcessor.GetSchoolDataParamsForPagination(objContext)
        }
    }, [objContext.state.blnIsPaginationClicked]);
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
        if (!objContext.state.isLoadComplete
           // && DataRef(objContext.props.Object_Extranet_School_School)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            && DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"]
        ) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.ClassManagement_ModuleProcessor.OnSearchButtonClick(objContext, { objSearchFilters: { "iStateId": -1, "cIsDeleted": "N", "uSchoolId": -1, "cIsTestSchool": "N","cIsStellwerk":"N" }});            
        }
    }, [
       // objContext.props.Object_Extranet_School_School,
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", objContext.props),
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Extranet_Teacher_SchoolYear
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
            objContext.ClassManagement_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.ClassManagement_ModuleProcessor.SetRibbonData(objContext);
    }
}

