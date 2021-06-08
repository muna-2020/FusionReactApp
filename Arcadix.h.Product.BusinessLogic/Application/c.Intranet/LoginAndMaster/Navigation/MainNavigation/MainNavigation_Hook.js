// React related imports.
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        IsCollapsed: false,
    };
}

/**
 * @name useLoadNavigationOnRefresh
 * @param {any} objContext
 * @summary Based on the URL, sets the ActiveMainNavigationId...
 */
export function useLoadNavigationOnRefresh(objContext){
    useEffect(() => {
        var arrBrowserUrl = window.location.pathname.split("/");
        let intActiveMainNavigationId, objActiveMainNavigation = {};
        if (arrBrowserUrl.length < 2 || arrBrowserUrl[1] == "") {
            intActiveMainNavigationId = 1;
            ApplicationState.SetProperty('RouterPath', objContext.props.JConfiguration.VirtualDirName.split('/')[1]);
            objActiveMainNavigation = objContext.props.NavigationData.filter(x => x.NavigationId == intActiveMainNavigationId)[0];
        }
        else {
            objActiveMainNavigation = objContext.props.NavigationData.filter(x => x.NavigationName == arrBrowserUrl[1])[0];
            intActiveMainNavigationId = objActiveMainNavigation.NavigationId;
        }
        ApplicationState.SetProperty('ActiveMainNavigationId', intActiveMainNavigationId);
        let objOnlineHelpObject = {
            "HelpGroup": objActiveMainNavigation.NavigationName,
        };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
        //if (objActiveMainNavigation.NavigationType) {
            objContext.MainNavigation_ModuleProcessor.OnMainNavigationClick(objContext, objActiveMainNavigation);
        //}
    }, [])
}



