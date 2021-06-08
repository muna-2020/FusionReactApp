//React imports
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary returns the component initial state
 */
export function GetInitialState() {
    return {
        objSelectedNavigation: {},
        arrSubNavigation: [], //settting an empty array for subnavigation
        iSelectedNavId: -1,
        strMainNavigation: 'main-navigation'
    };
};

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useNavigation(objContext);
    useHighlightNavigation(objContext);
    useLoadMainNavigation(objContext);
}

/**
 * @name useNavigationk
 * @summay this will fires when props recieves array of navigation.
 * @param {any} objContext
 */
export function useNavigation(objContext) {
    useEffect(() => {
        // Checks for Sub navigation for the first navigation Item
        if (objContext.props.arrNavigation && objContext.props.arrNavigation.length > 0 && objContext.props.IsServiceNavigation === "N") {
            var browserUrl = window.location.pathname;
            var arrBrowserUrl = browserUrl.split("/");
            if (arrBrowserUrl.length <= 2 && arrBrowserUrl[arrBrowserUrl.length - 1] == "") {
                //first load. should redirect to master
                //Performance.LogPerformance('Master');
                const objFirstNav = objContext.props.arrNavigation.filter(x => x.ParentNavigationId == 0)[0];
                objContext.Navigation_ModuleProcessor.OnClickNavigation(objContext, objFirstNav)
            }
            else {
                //browser has been either been refreshed or route change has taken place. must resume state.
                //two checks required.
                //1. Normal Nav(Main and Sub)
                var strMainNavFromUrl = arrBrowserUrl[1];
                var objMainNavigation = objContext.props.arrNavigation.filter(x => x.NavigationName == arrBrowserUrl[1])[0];
                var strRouterPath = ApplicationState.GetProperty('RouterPath');

                var strServiceNavigation = QueryString.GetQueryStringValue('ServiceNavigation');

                if (objMainNavigation != undefined && objMainNavigation.URL != "") {
                    //if selected main navigation has no subnavs.
                    if (strRouterPath == ('/' + objContext.props.JConfiguration.VirtualDirName.split('/')[1])) {
                        //console.log("navigation set on routing");
                    }
                    else {
                        //console.log("browser reloaded");
                        //route manually
                        objContext.Navigation_ModuleProcessor.OnClickNavigation(objContext, objMainNavigation);

                        if (strServiceNavigation) {
                            let strParentServiceNavigationURL = strServiceNavigation.split('/')[0];
                            let arrFilteredNavigationData = objContext.props.arrAllNavigationData.filter(x => x.NavigationName === strParentServiceNavigationURL)[0];
                            ApplicationState.SetProperty('OutletData', {
                                ShowOutlet: true,
                                ComponentName: strServiceNavigation,
                                NavData: arrFilteredNavigationData
                            })
                            ApplicationState.SetProperty('ActiveServiceNavigationId', arrFilteredNavigationData.NavigationId);
                            if (arrFilteredNavigationData["URL"] == "") {
                                var objChildServiceNav = objContext.props.arrAllNavigationData.filter(x => x.URL === strServiceNavigation)[0];
                                ApplicationState.SetProperty('ActiveSubServiceNavigationId', objChildServiceNav.NavigationId);
                            }
                        }
                    }
                }
                else {
                    //if main nav has subs

                    if (strRouterPath != objContext.props.JConfiguration.VirtualDirName + arrBrowserUrl[1]) {
                        // case : router path is not set,  happens on reload. 
                        //in normal flow AssignSubNavigation must have already set this "strRouterPath" when the main nav was clicked
                        objContext.Navigation_ModuleProcessor.OnMainNavigationClick(objContext, objMainNavigation); //sets router path correctly
                    }

                    //#region set state for main nav 
                    // case : if a subnav is revisited, and the component has an error, entire master gets re-rendered
                    // if these values are not reset, the subnavigations will disappear and/or we will get a blank screen   
                    if (Object.keys(objContext.state.objSelectedNavigation).length == 0 && objContext.state.arrSubNavigation.length == 0) {
                        //SetSelectedNavigation(objMainNavigation);
                        let arrFilteredSubNavigation = objContext.props.arrNavigation.filter(item => item.ParentNavigationId == objMainNavigation.NavigationId);
                        //SetSubNavigation(arrFilteredSubNavigation);
                        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedNavigation: objMainNavigation, arrSubNavigation: arrFilteredSubNavigation } })
                    }

                    //#endregion

                    //1. check if subnav is selected
                    if (arrBrowserUrl[2]) {
                        if (strRouterPath == objContext.props.JConfiguration.VirtualDirName + arrBrowserUrl[1]) {
                            // case : sub nav is in url, plus router path is set correctly -  no further action required
                            //console.log("navigation set on routing");
                        }
                        else {
                            // case : subnav is in url, but router path is not set - reload, or url has been put directly in browser
                            let objSubNavigationData = objContext.props.arrNavigation.filter(x => x.NavigationName === (arrBrowserUrl[2]))[0];
                            objContext.Navigation_ModuleProcessor.OnSubNavigationClickHandler(objContext, objSubNavigationData);
                            ApplicationState.SetProperty('ActiveSubNavigationId', objSubNavigationData.NavigationId || 0);
                            if (strServiceNavigation) {
                                let strParentServiceNavigationURL = strServiceNavigation.split('/')[0];
                                let arrFilteredNavigationData = objContext.props.arrAllNavigationData.filter(x => x.NavigationName === strParentServiceNavigationURL)[0];
                                ApplicationState.SetProperty('OutletData', {
                                    ShowOutlet: true,
                                    ComponentName: strServiceNavigation,
                                    NavData: arrFilteredNavigationData
                                })
                                ApplicationState.SetProperty('ActiveServiceNavigationId', arrFilteredNavigationData.NavigationId);
                                if (arrFilteredNavigationData["URL"] == "") {
                                    var objChildServiceNav = objContext.props.arrAllNavigationData.filter(x => x.URL === strServiceNavigation)[0];
                                    ApplicationState.SetProperty('ActiveSubServiceNavigationId', objChildServiceNav.NavigationId);
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [objContext.props.arrMainNavigation]);
}

/**
 * @name useHighlightNavigation
 * @summay As the ApplicationState is set from the module and the state is mapped to the props here, it will filter out the selected navigation object from the NavigationName passed in the props. And then it will set the appropriate state to highlight the Main Navigation.
 * @param {any} objContext
 */
export function useHighlightNavigation(objContext) {
    useEffect(() => {
        if (objContext.props["HighlightNavigations" + objContext.props.Id] && objContext.props["HighlightNavigations" + objContext.props.Id].Id === objContext.props.Id) {
            var objMainNavigation = objContext.props.arrNavigation.filter(x => x.NavigationName == objContext.props["HighlightNavigations" + objContext.props.Id].NavigationName)[0];
            let arrFilteredSubNavigation = objContext.props.arrNavigation.filter(item => item.ParentNavigationId == objMainNavigation.NavigationId);

            let strClassName = 'main-navigation';
            if (arrFilteredSubNavigation.length > 0)
                strClassName = 'main-navigation showSub';
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedNavigation": { ...objMainNavigation }, arrSubNavigation: arrFilteredSubNavigation, strMainNavigation: strClassName } });
            ApplicationState.SetProperty("HighlightNavigations" + objContext.props.Id, {});
        }
    }, [objContext.props["HighlightNavigations" + objContext.props.Id]]);
}

export function useLoadMainNavigation(objContext) {
    useEffect(() => {
        if (objContext.props["LoadNavigation"] && Object.keys(objContext.props["LoadNavigation"]).length > 0) {
            var objMainNavigation = objContext.props.arrNavigation.filter(x => x.NavigationName == objContext.props["LoadNavigation"].NavigationName)[0];
            objContext.Navigation_ModuleProcessor.OnMainNavigationClick(objContext, objMainNavigation);
            ApplicationState.SetProperty("LoadNavigation", {});
        }
    }, [objContext.props["LoadNavigation"]]);
}