//common for Main Navigation and Tablet navigation.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import { useEffect } from 'react';

//this method calls to navigate to the first route by default.
function OnClickNavigation(objContext,objClickedNavigation) {
    if (objClickedNavigation.IsServiceNavigation == "N") {  // if navigation is service navigation no need call navigate method.
        objContext.props.OnNavigationClick(objClickedNavigation);
    }
}

/**
 * @summary check if the passed navigation has sub navigation. if No then it will call the event handler for the main navigation
 * @param {any} objClickedNavigation
 */
export const AssignSubNavigation = (objContext,objClickedNavigation) => {
    if (objClickedNavigation) {
        var arrFilteredSubNavigation = objContext.props.arrNavigation.filter(item => item.ParentNavigationId === objClickedNavigation.NavigationId);
        objContext.dispatch({ type: 'SET_STATE_VALUES',payload: { arrSubNavigation: arrFilteredSubNavigation}})
        if (arrFilteredSubNavigation.length === 0) {
            if (objClickedNavigation.OnNavigationClick != undefined) {
                objClickedNavigation.OnNavigationClick(objClickedNavigation);
            }
            else {
                objContext.props.OnNavigationClick(objClickedNavigation);
            }
            objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { strMainNavigation: 'main-navigation' } })
        }
        else {
            //set router path
            var strRouterPath = '/' + objContext.props.JConfiguration.VirtualDirName.split('/')[1];
            strRouterPath = strRouterPath + '/' + objClickedNavigation.NavigationName;
            ApplicationState.SetProperty('RouterPath', strRouterPath);
            //show navs
            objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { strMainNavigation: 'main-navigation showSub' } })
            let objFirstSubNav = objContext.props.arrNavigation.filter(item => item.ParentNavigationId === objClickedNavigation.NavigationId)[0];
            OnSubNavigationClickHandler(objContext,objFirstSubNav);

        }
    }
};

/**
 * this will fires when props recieves array of navigation.
 * @param {any} objContext
 */
export function useNavigation(objContext) {
    useEffect(() => {
        // Checks for Sub navigation for the first navigation Item
        if (objContext.props.arrNavigation && objContext.props.arrNavigation.length > 0 && objContext.props.IsServiceNavigation === "N") {
            var browserUrl = window.location.pathname;
            var arrBrowserUrl = browserUrl.split("/");
            if (arrBrowserUrl.length <= 2) {
                //first load. should redirect to master               
                const objFirstNav = objContext.props.arrNavigation.filter(x => x.ParentNavigationId == 0)[0];
                OnClickNavigation(objContext,objFirstNav)
            }
            else {
                //browser has been either been refreshed or route change has taken place. must resume state.
                //two checks required.
                //1. Normal Nav(Main and Sub)
                var strMainNavFromUrl = arrBrowserUrl[2];
                var objMainNavigation = objContext.props.arrNavigation.filter(x => x.NavigationName == arrBrowserUrl[2])[0];
                var strRouterPath = ApplicationState.GetProperty('RouterPath');

                var strServiceNavigation = QueryString.GetQueryStringValue('ServiceNavigation');

                if (objMainNavigation.URL != "") {
                    //if selected main navigation has no subnavs.
                    if (strRouterPath == ('/' + objContext.props.JConfiguration.VirtualDirName.split('/')[1])) {
                        //console.log("navigation set on routing");
                    }
                    else {
                        //console.log("browser reloaded");
                        //route manually
                        OnClickNavigation(objContext,objMainNavigation);

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

                    if (strRouterPath != objContext.props.JConfiguration.VirtualDirName + arrBrowserUrl[2]) {
                        // case : router path is not set,  happens on reload. 
                        //in normal flow AssignSubNavigation must have already set this "strRouterPath" when the main nav was clicked
                        OnMainNavigationClick(objMainNavigation); //sets router path correctly
                    }

                    //#region set state for main nav 
                    // case : if a subnav is revisited, and the component has an error, entire master gets re-rendered
                    // if these values are not reset, the subnavigations will disappear and/or we will get a blank screen   
                    if (Object.keys(objContext.state.objSelectedNavigation).length == 0 && objContext.state.arrSubNavigation.length == 0) {
                        //SetSelectedNavigation(objMainNavigation);
                        let arrFilteredSubNavigation = objContext.props.arrNavigation.filter(item => item.ParentNavigationId === objMainNavigation.NavigationId);
                        //SetSubNavigation(arrFilteredSubNavigation);
                        objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSelectedNavigation: objMainNavigation, arrSubNavigation : arrFilteredSubNavigation}})
                    }

                    //#endregion

                    //1. check if subnav is selected
                    if (arrBrowserUrl[3]) {
                        if (strRouterPath == objContext.props.JConfiguration.VirtualDirName + arrBrowserUrl[2]) {
                            // case : sub nav is in url, plus router path is set correctly -  no further action required
                            //console.log("navigation set on routing");
                        }
                        else {
                            // case : subnav is in url, but router path is not set - reload, or url has been put directly in browser
                            let objSubNavigationData = objContext.props.arrNavigation.filter(x => x.NavigationName === (arrBrowserUrl[3]))[0];
                            OnSubNavigationClickHandler(objContext,objSubNavigationData);
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
                    else {
                        /*subnav not selected. route to first subnav. 
                        not a very likely case, as on selecting main nav, the first subnav must automatically be selected*/
                        //Select first nav
                        //to be reviewed
                        //let objFirstSubNav = props.arrMainNavigation.filter(item => item.ParentNavigationId === objMainNavigation.NavigationId)[0];
                        //OnSubNavigationClickHandler(objFirstSubNav);
                    }
                }
            }
        }
    }, [objContext.props.arrMainNavigation]);
}


/**
 * @summary sets selected navigation and assigns sunbavs
 * @param {any} objClickedNavigation
 */
export const OnMainNavigationClick = (objContext,objClickedNavigation) => {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSelectedNavigation: objClickedNavigation, iSelectedNavId: objClickedNavigation.NavigationId}})
    AssignSubNavigation(objContext,objClickedNavigation);
};

/**
 * @summary sub navigation click handler to be passed to SubNavigation component
 * @param {any} objClickedSubNavigation
 */
export const OnSubNavigationClickHandler = (objContext,objClickedSubNavigation) => {
    objContext.props.OnNavigationClick(objClickedSubNavigation, true);
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        objSelectedNavigation: {},
        arrSubNavigation: [], //settting an empty array for subnavigation
        iSelectedNavId: -1,
        strMainNavigation:'main-navigation'
    };
};


/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
};
