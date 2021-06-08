// React related imports.
import { useEffect, useLayoutEffect } from 'react';


/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Extranet_Teacher_SchoolYear)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/SchoolYear", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objFilter: { "cIsDeleted": "N" }
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
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
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.SchoolYear_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/SchoolYear", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            //let objSchoolYear_ModuleProcessor = new SchoolYear_ModuleProcessor(objContext);
            //var objRibbonData = {
            //    objContext,
            //    "AddPopup": () => objSchoolYear_ModuleProcessor.OpenAddEditPopup(objContext, false),
            //    "EditPopup": () => objSchoolYear_ModuleProcessor.OpenAddEditPopup(objContext, true),
            //    "DeletePopup": () => objSchoolYear_ModuleProcessor.OpenDeletePopup(objContext)
            //};
            //ApplicationState.SetProperty("OfficeRibbonData", SchoolYear_OfficeRibbon.GetSchoolYearOfficeRibbonData(objRibbonData));
        }
    }, [
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/SchoolYear", objContext.props),
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_Language
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
            objContext.SchoolYear_ModuleProcessor.SetRibbonData(objContext);  
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.SchoolYear_ModuleProcessor.SetRibbonData(objContext);
    }
}
