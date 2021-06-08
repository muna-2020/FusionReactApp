
/**
 * @name Navigation_ModuleProcessor
 * @summary processor for Navigation.
 * */
class Navigation_ModuleProcessor {

    /**
     * @name GetFullQueryString
     * @summary returns the value sent in query string.
     * @param {any} strURL
     */
    GetFullQueryString(strURL) {
        var strDesignMode = QueryString.GetQueryStringValue("IsDesignMode");
        var strOverrideLog = QueryString.GetQueryStringValue("OverrideLog");
        var strServiceNavigation = QueryString.GetQueryStringValue("ServiceNavigation");
        var strSessionKey = QueryString.GetQueryStringValue("sessionkey");
        var strPerformance = QueryString.GetQueryStringValue("Performance");
        var strEnableJSONCompression = QueryString.GetQueryStringValue("EnableJSONCompression");
        var strPrefetch = QueryString.GetQueryStringValue("Prefetch");
        var strAlwaysShowCultureAndLanguageDropdown = QueryString.GetQueryStringValue("AlwaysShowCultureAndLanguageDropdown");

        var strFullQueryString = "";
        if (strURL.split('?').length > 1) {
            strFullQueryString = strFullQueryString + "?" + strURL.split('?')[1]
        }
        if (strDesignMode != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "IsDesignMode=" + strDesignMode;
        }
        if (strOverrideLog != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "OverrideLog=" + strOverrideLog;
        }
        if (strServiceNavigation != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "ServiceNavigation=" + strServiceNavigation;
        }
        if (strSessionKey != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "sessionkey=" + strSessionKey;
        }
        if (strPerformance != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "Performance=" + strPerformance;
        }
        if (strEnableJSONCompression != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "EnableJSONCompression=" + strEnableJSONCompression;
        }
        if (strPrefetch != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "Prefetch=" + strPrefetch;
        }
        if (strAlwaysShowCultureAndLanguageDropdown != "") {
            strFullQueryString += (strFullQueryString.indexOf('?') == -1) ? "?" : "&";
            strFullQueryString = strFullQueryString + "AlwaysShowCultureAndLanguageDropdown=" + strAlwaysShowCultureAndLanguageDropdown;
        }
        return strFullQueryString;
    }

    /**
    * @name OnClickNavigation
    * @summary Assign Router path and push the selected navigation to history and Assigns Selected Main Navigation Id to application State
    * @param {any} objNavigation
    * @param {any} blnIsSubNav
    */
    OnClickNavigation(objContext, objNavigation, blnIsSubNav = false) {
        if (objNavigation.IsServiceNavigation == "N") {
            //Performance.LogPerformance(objNavigation.NavigationName);
            if (objNavigation.cIsOpenNewWindow !== 'Y') {

                var strFullQueryString = window.location.search;
                if (!blnIsSubNav) {
                    if (objNavigation.NavigationId != ApplicationState.GetProperty('ActiveMainNavigationId'))
                        ApplicationState.SetProperty("blnShowAnimation", true);
                    if (objNavigation.URL !== '') {

                        strFullQueryString = this.GetFullQueryString(objNavigation.URL)
                        var strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.URL.split('?')[0] + strFullQueryString;

                        let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
                        ApplicationState.SetProperty('RouterPath', strRouterPath);

                        objContext.props.history.push({
                            pathname: strPushUrl,
                            state: objNavigation
                        });
                    }
                    else {
                        //strRouterPath = strRouterPath + '/' + objNavigation.NavigationName;
                        //ApplicationState.SetProperty('RouterPath', strRouterPath);
                        let strRouterPath = '/' + objContext.props.JConfiguration.VirtualDirName.split('/')[1];
                        //show navs
                        let arrFilteredSubNavigation = objContext.props.arrNavigation.filter(item => item.ParentNavigationId == objNavigation.NavigationId);
                        objContext.dispatch({ type: 'SET_STATE', payload: { strMainNavigation: 'main-navigation showSub', arrSubNavigation: arrFilteredSubNavigation, iSelectedNavId: objNavigation.NavigationId, objSelectedNavigation: objNavigation } })
                        let objFirstSubNav = arrFilteredSubNavigation[0];
                        let strPushRouterPath = strRouterPath + '/' + objFirstSubNav.URL.substring(0, objFirstSubNav.URL.lastIndexOf('/'));
                        ApplicationState.SetProperty('RouterPath', strPushRouterPath);
                        this.OnSubNavigationClickHandler(objContext, objFirstSubNav);

                    }
                    ApplicationState.SetProperty('ActiveMainNavigationId', objNavigation.NavigationId);
                    ApplicationState.SetProperty('ActiveSubNavigationId', 0);
                }
                else {
                    //var strRouterPath = '/' + objContext.props.JConfiguration.VirtualDirName.split('/')[1];
                    if (objNavigation.NavigationId != ApplicationState.GetProperty('ActiveSubNavigationId')) {
                        ApplicationState.SetProperty("blnShowAnimation", true);
                    }
                    strFullQueryString = this.GetFullQueryString(objNavigation.URL)
                    var strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.URL.split('?')[0] + strFullQueryString;

                    let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
                    ApplicationState.SetProperty('RouterPath', strRouterPath);

                    objContext.props.history.push({
                        pathname: strPushUrl,
                        state: objNavigation
                    });
                    ApplicationState.SetProperty('ActiveSubNavigationId', objNavigation.NavigationId);
                }
            }
        }
        else {
            var newurl1 = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
            newurl1 = QueryString.SetQueryStringValue(newurl1, 'ServiceNavigation', objNavigation.URL);

            window.history.pushState({ path: newurl1 }, '', newurl1);
            ApplicationState.SetProperty('ActiveSubNavigationId', objNavigation.NavigationId);
            let objOutletData = ApplicationState.GetProperty('OutletData');

            ApplicationState.SetProperty('OutletData', {
                ShowOutlet: true,
                ComponentName: objNavigation.URL,
                NavData: {
                    ...objOutletData.NavData
                }
            });
        }
        Performance.Reset();
    }

    /**
     * @name OnServiceNavigationClick
     * @summary Form Service Navigation object for Outlet and assign it to Outlet Data and Assigns Active ServiceNavigation Id to Application State
     * @param {any} objServiceNavigation
     */
    OnServiceNavigationClick(objContext, objServiceNavigation) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objServiceNavigation.cIsOpenNewWindow !== 'Y') {
            let strComponentName = "";
            strComponentName = objServiceNavigation.URL;
            ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
            ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
            if (objServiceNavigation.URL == "") {
                //var arrFilteredMainNavigation = objContext.props.arrNavigation.filter(x => x.ParentNavigationId == -1);
                let arrChildren = objContext.props.arrNavigation.filter(x => x.ParentNavigationId == objServiceNavigation.NavigationId);
                if (arrChildren.length > 0) {
                    strComponentName = arrChildren[0]["URL"];
                    ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
                    ApplicationState.SetProperty('ActiveSubServiceNavigationId', arrChildren[0]["NavigationId"]);
                }
                else
                    Logger.LogError("URL missing for the service navigation:", objServiceNavigation);
            }
            var objServiceNavigationForOutlet = {
                ShowOutlet: true,
                ComponentName: strComponentName,
                NavData: objServiceNavigation
            };
            var strNewURL1 = window.location.protocol + "//" + window.location.host + window.location.pathname;
            if (window.location.search == "") {
                strNewURL1 = strNewURL1 + "?ServiceNavigation=" + strComponentName;
            }
            else {
                strNewURL1 = strNewURL1 + window.location.search;
                var strServiceNavigation = QueryString.GetQueryStringValue('ServiceNavigation');
                if (strServiceNavigation == "") {
                    strNewURL1 = strNewURL1 + "&ServiceNavigation=" + strComponentName;
                }
                else {
                    strNewURL1 = QueryString.SetQueryStringValue(strNewURL1, "ServiceNavigation", strComponentName)
                }
            }
            console.log("new url:", strNewURL1);
            window.history.pushState({ path: strNewURL1 }, '', strNewURL1);
            ApplicationState.SetProperty("TabletNavigation", objServiceNavigation);
            ApplicationState.SetProperty('OutletData', objServiceNavigationForOutlet);
            Performance.Reset();
        }
    }

    /**
     * @summary check if the passed navigation has sub navigation. if No then it will call the event handler for the main navigation
     * @param {any} objClickedNavigation
     */
    AssignSubNavigation(objContext, objClickedNavigation) {
        if (objClickedNavigation) {
            var arrFilteredSubNavigation = objContext.props.arrNavigation.filter(item => item.ParentNavigationId == objClickedNavigation.NavigationId);
            objContext.dispatch({ type: "SET_STATE", payload: { arrSubNavigation: arrFilteredSubNavigation } })
            if (arrFilteredSubNavigation.length === 0) {
                this.OnClickNavigation(objContext, objClickedNavigation);
                objContext.dispatch({ type: "SET_STATE", payload: { strMainNavigation: 'main-navigation' } })
                ApplicationState.SetProperty("TabletNavigation", objClickedNavigation);
            }
            else {
                //set router path
                var strRouterPath = '/' + objContext.props.JConfiguration.VirtualDirName.split('/')[1];
                //show navs
                objContext.dispatch({ type: 'SET_STATE', payload: { strMainNavigation: 'main-navigation showSub' } })
                let objFirstSubNav = arrFilteredSubNavigation[0];
                let strPushRouterPath = strRouterPath + '/' + objFirstSubNav.URL.substring(0, objFirstSubNav.URL.lastIndexOf('/'));
                ApplicationState.SetProperty('RouterPath', strPushRouterPath);
                this.OnSubNavigationClickHandler(objContext, objFirstSubNav);
                ApplicationState.SetProperty("TabletNavigation", arrFilteredSubNavigation[0]);
            }
        }
    };

    /**
     * @summary sets selected navigation and assigns sunbavs
     * @param {any} objClickedNavigation
     */
    OnMainNavigationClick(objContext, objClickedNavigation) {
        objContext.dispatch({ type: "SET_STATE", payload: { objSelectedNavigation: objClickedNavigation, iSelectedNavId: objClickedNavigation.NavigationId } })
        if (objContext.props.IsServiceNavigation == "Y")
            this.OnServiceNavigationClick(objContext, objClickedNavigation);
        else
            this.AssignSubNavigation(objContext, objClickedNavigation);
    };

    /**
     * @summary sub navigation click handler to be passed to SubNavigation component
     * @param {any} objClickedSubNavigation
     */
    OnSubNavigationClickHandler(objContext, objClickedSubNavigation) {
        this.OnClickNavigation(objContext, objClickedSubNavigation, true);
    }
}

export default Navigation_ModuleProcessor