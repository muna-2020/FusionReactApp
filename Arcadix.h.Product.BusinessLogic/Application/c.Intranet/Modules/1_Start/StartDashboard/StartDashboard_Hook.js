// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/1_Start/StartDashboard", props)
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
* @summary Initialize method call to load the initial data
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
        objContext.StartDashboard_ModuleProcessor.LoadInitialData(objContext);
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
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/1_Start/StartDashboard", objContext.props)

        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/1_Start/StartDashboard"]
    ]);
}

/**
* @name useSetRibbonData.
* @param {object} objContext takes  objContext.
* @summary To set and update the Ribbon Data when the State changes.
*/
export function useSetRibbonData(objContext) {

    useEffect(() => {
        objContext.StartDashboard_ModuleProcessor.SetRibbonData(objContext);
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.StartDashboard_ModuleProcessor.SetRibbonData(objContext);
    }

}