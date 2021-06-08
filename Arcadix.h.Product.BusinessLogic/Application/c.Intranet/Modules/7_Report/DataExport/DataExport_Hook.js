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
        DataRef(props.Object_Extranet_State_State)["Object_Extranet_State_State;cIsDeleted;N"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/DataExport", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strStateId: -1,
        //objSearchFilters: { "iStateId": 437, "iCycleNumberOfRepetitions": 1, "iCycleTypeId": 1, "uCycleId": "41202EF3-1157-4E2B-98FA-8F7581A8D770", "uTestId": "8B1B623F-7A25-4013-B3A7-D483C1DF69E7", "dtFromDate": new Date(), "dtToDate": new Date() },
        objSearchFilters: { "iStateId": -1, "iCycleNumberOfRepetitions": -1, "iCycleTypeId": 1, "uCycleId": -1, "uTestId": -1, "dtFromDate": new Date(), "dtToDate": new Date() },
        arrCycleNumberOfRepetitions: [{ "iCycleNumberOfRepetitions": 1, "vCycleNumberOfRepetitionsValue": 1, "cIsDeleted": "N" }],
        value: new Date(),
        arrTestData:[]
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
        objContext.DataExport_ModuleProcessor.LoadInitialData(objContext);
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
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Extranet_State_State)["Object_Extranet_State_State;cIsDeleted;N"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/DataExport", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let arrStateData = DataRef(objContext.props.Object_Extranet_State_State)["Object_Extranet_State_State;cIsDeleted;N"]["Data"];
            let objSearchFilters = {
                ...objContext.state.objSearchFilters, iStateId: arrStateData[0].iStateId
            };
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, objSearchFilters } });

        }
    }, [
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/DataExport", objContext.props),
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
            objContext.DataExport_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.DataExport_ModuleProcessor.SetRibbonData(objContext);
    }
}


