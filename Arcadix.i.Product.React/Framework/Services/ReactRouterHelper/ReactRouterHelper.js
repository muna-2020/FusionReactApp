import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import { GetQueryStringValue, RemoveQueryStringValue, SetQueryStringValue } from '../QueryString/QueryString';

export function RouteTo(vURL, history, IsServiceNavigation = false, objNavigationRouteData = {}) {

    console.log("RouteTo called ...........................")
    debugger
    let objStateData = store.getState();
    let objNavigation = DataRef(objStateData.Entity["Object_Framework_Services_FrameworkNavigation"], "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + JConfiguration.ApplicationTypeId);
    if (!objNavigation) {
        objNavigation = DataRef(objStateData.Entity["Object_Framework_Services_ExtranetNavigation"], "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + JConfiguration.ApplicationTypeId);
    }
    console.log(objNavigation)
    let strApplicationName = Object.keys(objNavigation["Data"][0])[1];
    let arrNavigationData = objNavigation["Data"][0][strApplicationName];

    //check if the route exists
    let objNavDataForRoute = null;
    let arrNavDataForRoute = arrNavigationData.filter(item => item.URL === vURL)
    if (arrNavDataForRoute.length > 0) {
        objNavDataForRoute = arrNavDataForRoute[0];
        if (objNavDataForRoute.IsServiceNavigation === 'Y') {
            OnServiceNavigationClick(objNavDataForRoute, objNavigation)
        }
        else {
            //check if sub nav and set AS.RouterPath accordingly
            OnNavigationClick(vURL, history, objNavDataForRoute)
        }
        if (Object.keys(objNavigationRouteData).length > 0) {
            if (objNavigationRouteData.MainNavigation)
                ApplicationState.SetProperty("HighlightNavigations" + "ExtranetMainNavigation", { ...objNavigationRouteData.MainNavigation });
            if (objNavigationRouteData.SubNavigation)
                ApplicationState.SetProperty("HighlightSubNavigations" + "ExtranetSubNavigation", { ...objNavigationRouteData.SubNavigation });
            if (objNavigationRouteData.ServiceNavigation)
                ApplicationState.SetProperty("HighlightServiceNavigations" + "ExtranetServiceNavigation", { ...objNavigationRouteData.ServiceNavigation });
        }
    }
    else {
        console.error("Navigation does not exist")
    }
}

function OnServiceNavigationClick(objServiceNavigation, objNavigation) {
    ApplicationState.SetProperty("blnShowAnimation", true);
    let strApplicationName = Object.keys(objNavigation["Data"][0])[1];
    let arrNavigationData = objNavigation["Data"][0][strApplicationName];
    let objParentServiceNavigation = null;
    var objServiceNavigationForOutlet = {};
    if (objServiceNavigation.cIsOpenNewWindow !== 'Y') {
        let strComponentName = "";
        if (objServiceNavigation.URL == "") {
            let arrChildren = arrNavigationData.filter(x => x.ParentNavigationId == objServiceNavigation.NavigationId);
            if (arrChildren.length > 0) {
                strComponentName = arrChildren[0]["URL"];
                ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
                ApplicationState.SetProperty('ActiveSubServiceNavigationId', arrChildren[0]["NavigationId"]);
                OpenServiceNav(objServiceNavigation, strComponentName);
            }
            else
                console.error("URL missing for the service navigation:", objServiceNavigation);
        }
        else {
            let arrParentServiceNavigation = arrNavigationData.filter(item => item.NavigationId === objServiceNavigation.ParentNavigationId);
            strComponentName = objServiceNavigation.URL;
            if (arrParentServiceNavigation.length == 0) {

                ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
                ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
                OpenServiceNav(objServiceNavigation, strComponentName);
            }
            else {
                objParentServiceNavigation = arrParentServiceNavigation[0];
                OpenServiceNav(objParentServiceNavigation, strComponentName);
            }
        }
    }
    else {
        //window.open(objServiceNavigation.URL)
        window.open('http://reactjs.org');
    }
}

function OnNavigationClick(vURL, history, objNavDataForRoute) {
    debugger
    ApplicationState.SetProperty("blnShowAnimation", true);
    let strQueryString = vURL.split('?')[1] ? vURL.split('?')[1] : "";
    var strServiceNavigation = GetQueryStringValue('ServiceNavigation');
    //let strRouterPath = '/' + JConfiguration.VirtualDirName.split('/')[1]; //base parent nav path to be set to AppState.RouterPath
    let strRouterPath = JConfiguration.VirtualDirName.split('/')[1]; //base parent nav path to be set to AppState.RouterPath
    strRouterPath = strRouterPath != "" ? "/" + strRouterPath : strRouterPath;
    if (objNavDataForRoute.ParentNavigationId > 0) {
        let strParentNavigationName = objNavDataForRoute.URL.split('/')[0];
        strRouterPath = strRouterPath + '/' + strParentNavigationName;
    }
    ApplicationState.SetProperty('RouterPath', strRouterPath);
    ApplicationState.SetProperty('ActiveMainNavigationId', objNavDataForRoute.ParentNavigationId);
    if (objNavDataForRoute.ParentNavigationId > 0)
        ApplicationState.SetProperty('ActiveSubNavigationId', 0);
    let strPushUrl = JConfiguration.VirtualDirName + vURL.split('?')[0]; //base path for the module. QS will be added later

    let strWindowQS = window.location.search;

    //attach query string now
    if (strQueryString != "") {
        strQueryString.split('&').map((item) => {
            let strKey = item.split('=')[0];
            let strValue = item.split('=')[1];
            strWindowQS = SetQueryStringValue(strWindowQS, strKey, strValue);
        })
    }
    if (strServiceNavigation !== "") { // if service navigation is open, we need to close it first
        strWindowQS = RemoveQueryStringValue(strWindowQS, 'ServiceNavigation');
        ApplicationState.SetProperty('OutletData', {})
        ApplicationState.SetProperty('ActiveServiceNavigationId', 0);
        ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
    }
    strPushUrl += strWindowQS;
    //ApplicationState.SetProperty("blnShowAnimation", true);
    debugger
    history.push({ pathname: strPushUrl })
    console.log(strPushUrl)
}
function OpenServiceNav(objServiceNavigation, strComponentName) {
    let objServiceNavigationForOutlet = {
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
        var strServiceNavigation = GetQueryStringValue('ServiceNavigation');
        if (strServiceNavigation = "") {
            strNewURL1 = strNewURL1 + "&ServiceNavigation=" + strComponentName;
        }
        else {
            strNewURL1 = SetQueryStringValue(strNewURL1, "ServiceNavigation", strComponentName)
        }
    }
    CleanupOutletComponent();
    window.history.pushState({ path: strNewURL1 }, '', strNewURL1);
    ApplicationState.SetProperty('OutletData', objServiceNavigationForOutlet);
}

function CleanupOutletComponent() {
    var strExistingServiceNav = GetQueryStringValue('ServiceNavigation');
    if (strExistingServiceNav !== "") {
        var strCurrentModule = strExistingServiceNav.split('/').length > 1 ? strExistingServiceNav.split('/')[1] : strExistingServiceNav.split('/')[0];
        console.log("Cleaning up module on outlet: ", strCurrentModule);
        ApplicationState.RemoveProperty(strCurrentModule.split('?')[0])
    }
}

