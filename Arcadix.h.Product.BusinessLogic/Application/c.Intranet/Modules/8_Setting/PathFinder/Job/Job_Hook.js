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
        DataRef(props.Object_Intranet_Setting_PathFinder_JobField)["Data"]
        && DataRef(props.Object_Extranet_State_State)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/Job", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
       // && DataRef(props.Object_Intranet_Setting_PathFinder_Job)["Data"]
        && DataRef(props.Object_Intranet_Setting_PathFinder_JobField)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        iStateId:-1, //0,
        iJobTypeId: -1,
        arrJobFieldData: [],
        arrJobData: [],
        iTotalRowCount: 0,
        iRowsPerPage: 10,
        iFrom: 1,
        iPageNumber: 1
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
        objContext.Job_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete
        ) {
            objContext.Job_ModuleProcessor.OnPaginationClick(objContext, 1, {});
            //ApplicationState.SetProperty("blnShowAnimation", false);
        }

        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Extranet_State_State)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/Job", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            //&& DataRef(objContext.props.Object_Intranet_Setting_PathFinder_Job)["Data"]
            && DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobField)["Data"]
        ) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });//"iTotalRowCount":DataRef(objContext.props.Object_Intranet_Setting_PathFinder_Job, "Object_Intranet_Setting_PathFinder_Job;cIsDeleted;N;iStateId;" + objContext.state.iStateId)["Data"].length
            objContext.Job_ModuleProcessor.OnPaginationClick(objContext, 1, {});
        }
    }, [
        objContext.props.Object_Intranet_Setting_PathFinder_JobField,
        //objContext.props.Object_Intranet_Setting_PathFinder_Job,
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/Job", objContext.props),
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Extranet_State_State,
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
            objContext.Job_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Job_ModuleProcessor.SetRibbonData(objContext);
    }
}