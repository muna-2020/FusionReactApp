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
        DataRef(props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
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
        objContext.BusinessUnit_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });

        }
    }, [
        objContext.props.Object_Cockpit_BusinessUnit,
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit", objContext.props),
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
            objContext.BusinessUnit_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.BusinessUnit_ModuleProcessor.SetRibbonData(objContext);
    }
}

