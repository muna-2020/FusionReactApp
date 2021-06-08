// React related imports.
import { useEffect } from 'react';

//Core Imports.
import { LoadPrefetchLinksForNavigation, RenewPrefetchToken} from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

//Module related imports.
import * as NavigationCommonPage_OfficeRibbon from '@shared/Application/c.Intranet/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage_OfficeRibbon';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Navigation", props)
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
    //useLoadPrefetchLinks(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.NavigationCommonPage_ModuleProcessor.LoadInitialData(objContext);
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
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Navigation", objContext.props)
        ) {           
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });           
        }
    }, [
        objContext.props.Object_Framework_Services_FrameworkNavigation,
        objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/LoginAndMaster/Navigation"]
    ]);
}

/**
 * @name useSetAnimation
 * @param {any} objContext
 * @summary To set the Folder Id to 0 for the First time, to load root folder data for Task and test
 */
export function useSetAnimation(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [objContext.props.ActiveSubNavigationId, objContext.props.ActiveMainNavigationId]);
}

/**
 * @name useSetRibbonData.
 * @param {object} objContext takes  objContext.
 * @summary To set and update the Ribbon Data when the State changes.
 */
export function useSetRibbonData(objContext) {

    useEffect(() => {
        if (objContext.state.isLoadComplete) {            
            ApplicationState.SetProperty("OfficeRibbonData", NavigationCommonPage_OfficeRibbon.GetNavigationCommonPageOfficeRibbonData(objContext));
        }
    }, [objContext.state, objContext.props.FolderId]);

    if (objContext.props.IsForServerRenderHtml) {
        ApplicationState.SetProperty("OfficeRibbonData", NavigationCommonPage_OfficeRibbon.GetNavigationCommonPageOfficeRibbonData(objContext));
    }
}


///**
// * @name useLoadPrefetchLinks
// * @param {object} objContext takes objContext
// * @summary Loads the Prefetch link tags into the DOM.
// */
//export function useLoadPrefetchLinks(objContext) {
//    useEffect(() => {
//        if (JConfiguration.IsPrefetchEnabled && objContext.state.isLoadComplete) {
//            let arrNavigation = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
//            let arrPrefetchNavigations = objContext.NavigationCommonPage_ModuleProcessor.GetPrefetchNavigations(arrNavigation, objContext);            
//            RenewPrefetchToken(() => LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext));
//        }
//    }, [objContext.state.isLoadComplete, objContext.props.ActiveSubNavigationId, objContext.props.ActiveMainNavigationId]);
//}