// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as ProductManagementUser_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/ProductManagementUser_OfficeRibbon';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_DevServer_ProductManagement_ProductManagementUser)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ProductManagementUser", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
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
        objContext.ProductManagementUser_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_DevServer_ProductManagement_ProductManagementUser)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ProductManagementUser", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props.Object_DevServer_ProductManagement_ProductManagementUser,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/ProductManagementUser"]
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
            var objRibbonData = {
                objContext,
                "AddPopup": () => objContext.ProductManagementUser_ModuleProcessor.OpenAddEditPopup(objContext, false),
                "EditPopup": () => objContext.ProductManagementUser_ModuleProcessor.OpenAddEditPopup(objContext, true),
                "DeletePopup": () => objContext.ProductManagementUser_ModuleProcessor.OpenDeletePopup(objContext),
                "OpenSendLoginProgressBarPopup": () => objContext.ProductManagementUser_ModuleProcessor.OpenSendLoginProgressBarPopup(objContext),
            };
            ApplicationState.SetProperty("OfficeRibbonData", ProductManagementUser_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
        }
    }, [objContext.state]);
}
