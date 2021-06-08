// React related imports.
import { useEffect, useRef } from 'react';

//Module related fies...
import Master_Module from '@shared/Application/c.ProductManagement/LoginAndMaster/Master/Master_Module';

//Core Imports.
import { LoadPrefetchLinksForNavigation, LoadPrefetchLinksForFilter } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';


/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Master", props) &&
        Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        blnOpenSideNav: true,
        refOnlineHelp: useRef(null)
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
    useLoadProcessCount(objContext);
    useLoadPrefetchLinks(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.Master_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Master", objContext.props)
            && Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_Framework_Services_FrameworkNavigation,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.ProductManagement/LoginAndMaster/Master"],
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation"]
    ]);
}

/**
 * @name useLoadProcessCount
 * @param {object} objContext  objContext
 * @summary.
 */
export function useLoadProcessCount(objContext) {
    useEffect(() => {
        objContext.Master_ModuleProcessor.LoadOfflineProcessCount(objContext);
    }, []);
}

/**
 * @name useLoadPrefetchLinks
 * @param {object} objContext takes objContext
 * @summary Loads the Prefetch link tags into the DOM.
 */
export function useLoadPrefetchLinks(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            //Prefetch of Navigations
            let arrNavigation = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
            let arrPrefetchNavigations = objContext.Master_ModuleProcessor.GetPrefetchNavigations(arrNavigation);
            LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext);
            //Prefetch of Folder and Module Data with Filters
            let arrPrefetchLinksForFilter = objContext.Master_ModuleProcessor.GetPrefetchLinksForFilter(objContext);
            if (arrPrefetchLinksForFilter.length > 0)
                LoadPrefetchLinksForFilter(arrPrefetchLinksForFilter);
        }
    }, [objContext.state.isLoadComplete]);
}