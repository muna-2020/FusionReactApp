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
        && DataRef(props.Object_Extranet_School_School)["Data"]
        && DataRef(props.Object_Extranet_State_State)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strTeacherId: -1,
        strSchoolId: -1,
        iRowsPerPage: 10,
        cIsTestSchool: "N",
        cIsStellwerk:"N",
        objSearchFilters: {
            "iStateId": props.Meta?.IsOpenSchoolTeachers ? props.Data?.StateId : -1,
            "uSchoolId": props.Meta?.IsOpenSchoolTeachers ? props.Data?.SchoolId : -1,
        },
        PageNumber: 1,
        From: 1,
        TotalRowCount: 50,
        arrTeacherManagmentData: []
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
        objContext.TeacherManagement_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext Context Object
 * @summary Initialize the Data
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (objContext.props.Meta?.IsOpenSchoolTeachers) {
                objContext.TeacherManagement_ModuleProcessor.OnPaginationClick(objContext, 1);
            }
        }
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Extranet_School_Title)["Data"]
            && DataRef(objContext.props.Object_Extranet_School_School)["Data"]
            && DataRef(objContext.props.Object_Extranet_State_State)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            //&& objContext.state.arrTeacherManagmentData
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            if (objContext.props.Meta?.IsOpenSchoolTeachers) {
                objContext.TeacherManagement_ModuleProcessor.OnPaginationClick(objContext, 1);
            }
        }
    }, [
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.props.Object_Cockpit_Language,
            Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", objContext.props),
            //objContext.state.arrTeacherManagmentData
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
            objContext.TeacherManagement_ModuleProcessor.SetRibbonData(objContext); 
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.TeacherManagement_ModuleProcessor.SetRibbonData(objContext);
    }
}


