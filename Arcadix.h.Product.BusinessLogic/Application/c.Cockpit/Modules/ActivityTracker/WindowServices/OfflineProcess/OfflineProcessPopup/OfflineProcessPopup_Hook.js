// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as OfflineProcessPopup_Tab from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup/OfflineProcessPopup_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strDivToShow: "OfflineProcessPopup",
        arrOfflineExecutionGridData: []
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.OfflineProcessPopup_ModuleProcessor.LoadInitialData(objContext);
        objContext.OfflineProcessPopup_ModuleProcessor.LoadDataForGrid(objContext);
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext takes objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeTabData(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = OfflineProcessPopup_Tab.GetAddEditOfflineProcessTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
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
            && objContext.state.arrOfflineExecutionGridData
            && objContext.Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.state.arrOfflineExecutionGridData,
        objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup"],
    ]);
}



