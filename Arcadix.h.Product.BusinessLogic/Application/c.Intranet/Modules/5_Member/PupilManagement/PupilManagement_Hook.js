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
        DataRef(props.Object_Extranet_State_State)["Data"] &&
        DataRef(props.Object_Extranet_Pupil_Gender)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
        DataRef(props.Object_Cockpit_Language)["Data"] &&        
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/PupilManagment", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strStateId: -1,
        blnIsCachingFilterEnabled: false,
        blnIsPaginationClicked: false,
        blnIsSearchButtonClicked: false,
        iRowsPerPage: 10,
        iFrom: 1,
        intPageNumber: -1,
        intTotalRowCount: 0,
        objSearchFilters: { "iStateId": -1, "uSchoolId": -1, "uTeacherId": -1, "uClassId": -1, "cIsDeleted": "N", "cIsTestSchool": "N", "cIsExternal": "N", "cIsStellwerk": "N" },
        objTempSearchFilters: { "cIsDeleted": "N" },
        objData: {},
        arrPupilData: []
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
        objContext.PupilManagement_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {            
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Extranet_State_State)["Data"]
            && DataRef(objContext.props.Object_Extranet_Pupil_Gender)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/PupilManagment", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            window.dispatchEvent(new Event('resize'));
        }
    }, [
            objContext.props.Object_Extranet_State_State,
            objContext.props.Object_Extranet_Pupil_Gender,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/PupilManagment"],
            objContext.props.Object_Cockpit_Language,
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage
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
            objContext.PupilManagement_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.PupilManagement_ModuleProcessor.SetRibbonData(objContext);
    }
}