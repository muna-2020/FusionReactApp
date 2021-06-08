// React related impoprts.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objFilter: { "cIsDeleted": "N" },
        blnIsEdit: false,
        objEditValue: {},
        objAddValue: {}
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
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Book_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_SupportApplication_Demo_Book)["Data"]
            && objContext.Object_Framework_Services_TextResource.GetData("/l.Demo/Modules/Book", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            //var objRibbonData = {
            //    objContext,
            //    "AddPopup": () => objContext.Country_ModuleProcessor.OpenAddEditPopup(objContext, false),
            //    "EditPopup": () => objContext.Country_ModuleProcessor.OpenAddEditPopup(objContext, true),
            //    "DeletePopup": () => objContext.Country_ModuleProcessor.OpenDeletePopup(objContext)
            //};
            //ApplicationState.SetProperty("OfficeRibbonData", Country_OfficeRibbon.GetCountryOfficeRibbonData(objRibbonData, objContext.Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Settings/Country", objContext.props)));
        }
    }, [
        objContext.props.Object_SupportApplication_Demo_Book,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/l.Demo/Modules/Book"],
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_Language
    ]);
}
