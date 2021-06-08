// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as ExceptionLogView_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/SystemPerformance/ExceptionLogView/ExceptionLogView_OfficeRibbon';
import ExceptionLogView_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/SystemPerformance/ExceptionLogView/ExceptionLogView_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState() {
    var objSearchData = {
        "iMainClientId": -1,
        "iApplicationTypeId": -1,
        "dtFromDate": ExceptionLogView_ModuleProcessor.GetPreviousDate(),
        "dtToDate": ExceptionLogView_ModuleProcessor.GetPresentDate(),
        "vType": "JSError"
    }
    return {
        isLoadComplete: false,
        objFilter: { "cIsDeleted": "N" },
        arrExceptionLogView: [],
        objData: objSearchData,
        strHour: "*",
        arrHourDropDownData: ExceptionLogView_ModuleProcessor.GetHourDropDownData()
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
        objContext.ExceptionLogView_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            && objContext.props.Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ExceptionLogView", objContext.props)
        ) {
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "arrMainClient": DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"].filter(objMainclient => objMainclient["iMainClientId"] == 97 || objMainclient["iMainClientId"] == 115),
                    "arrApplicationType": DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"].filter(objApp => objApp["iApplicationTypeId"] == 1 || objApp["iApplicationTypeId"] == 2 || objApp["iApplicationTypeId"] == 6 || objApp["iApplicationTypeId"] == 16),                    
                }
            });

            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_Cockpit_ApplicationType,
            objContext.props.Object_Cockpit_MainClient_MainClient,
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.props.Object_Cockpit_Language,
            objContext.props.Object_Framework_Services_TextResource
        ]);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext takes  objContext
 * @summary Set RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "AddPopup": () => objContext.ExceptionLogView_ModuleProcessor.OpenAddEditPopup(objContext,false),
                "EditPopup": () => objContext.ExceptionLogView_ModuleProcessor.OpenAddEditPopup(objContext,true),
                "DeletePopup": () => objContext.ExceptionLogView_ModuleProcessor.OpenDeletePopup(objContext)
            };
            ApplicationState.SetProperty("RibbonData", ExceptionLogView_OfficeRibbon.GetExceptionLogViewOfficeRibbonData(objContext,objRibbonData));
        }
    }, [objContext.state.isLoadComplete]);
}