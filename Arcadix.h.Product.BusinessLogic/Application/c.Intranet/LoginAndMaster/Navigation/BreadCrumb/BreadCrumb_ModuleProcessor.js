import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

class BreadCrumb_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "BreadCrumbNavigationId" },
            { "StoreKey": "ApplicationState", "DataKey": "BreadCrumbNavigationId" }
        ];
    }

    /**
    * @name OnSubNavigationClick
    * @param {any} objContext
    * @param {any} objNavigation
    * @summary Does the Routing based on the SubNavigation.
    * When the SubNavigation parent has children, Calls the the NavigationCommonPage.
    * Otherwise does the normal routing.
    */
    OnSubNavigationClick(props, objNavigation, arrAllNavigations) {
        var strFullQueryString = window.location.search;
        if (objNavigation.NavigationId != ApplicationState.GetProperty('BreadCrumbNavigationId')) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            ApplicationState.SetProperty('BreadCrumbNavigationId', objNavigation.NavigationId);
        }
        ApplicationState.SetProperty('SelectedNode', { "Tree_Master": objNavigation });
        var arrSubNavigation = arrAllNavigations.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
        if (arrSubNavigation.length == 0) {
            var strPushUrl = props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + strFullQueryString;
            props.history.push({ pathname: strPushUrl });
            let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
            ApplicationState.SetProperty('RouterPath', strRouterPath);
        }
        else {
            let strRouterPath = props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations);
            ApplicationState.SetProperty('RouterPath', strRouterPath);
            var strPushUrl = props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + "/NavigationCommonPage?SubNavigatioId=" + objNavigation.NavigationId;
            props.history.push({ pathname: strPushUrl });
        }
    }

    /**
     * @name FormUrl
     * @param {any} objNavigation
     * @param {any} arrAllNavigations
     * @summary Forms the URL in a recurcise way.
     */
    FormUrl(objNavigation, arrAllNavigations) {
        let strUrl = ""
        while (objNavigation) {
            strUrl = objNavigation["NavigationName"] + "/" + strUrl;
            objNavigation = arrAllNavigations.find(x => x.NavigationId == objNavigation.ParentNavigationId);
        }
        return strUrl.slice(0, -1);
    }

    /**
    * @name GetNavigationData
    * @param {any} objContext
    * @summary Gets the navigation data for PM
    */
    GetNavigationData(objContext) {
        let arrNavigationData = [];
        if (DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)) {
            let arrNavigation = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
            let objNavigation = arrNavigation ? arrNavigation[0] : {};
            let strApplicationName = Object.keys(objNavigation)[1];
            arrNavigationData = objNavigation[strApplicationName];
            let blnIsDevMode = false;
            if (objContext.props.IsForServerRenderHtml) {
                blnIsDevMode = objContext.props.IsForServerRenderHtml && objContext.props.QueryStringObject && objContext.props.QueryStringObject.IsDevMode == "Y"
            }
            else {
                blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y";
            }
            arrNavigationData = arrNavigationData.filter(obj => !obj["ProjectIdentifier"] || blnIsDevMode || (obj["ProjectIdentifier"] && obj["ProjectIdentifier"].split(",").includes(JConfiguration.ProjectIdentifier)));
        }
        return arrNavigationData;
    }

    /**
    * @name GetSubNavigationId
    * @param {any} objContext
    * @summary Gets the Sub navigation for SSR
    */
    GetSubNavigationId(objContext) {        
        if (objContext.props.IsForServerRenderHtml) {
            let arrNavigationData = this.GetNavigationData(objContext);
            let strActiveSubNavId = objContext.props.QueryStringObject ? objContext.props.QueryStringObject.SubNavigationId : null;
            if (!strActiveSubNavId && arrNavigationData) {
                let strActiveMainNavigationId = this.GetMainNavigationId(objContext);
                let arrSubNavData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == strActiveMainNavigationId);
                strActiveSubNavId = arrSubNavData && arrSubNavData[0] ? arrSubNavData[0]["NavigationId"] : "";
            }
            return strActiveSubNavId;
        }
    }

    /**
    * @name GetMainNavigationId
    * @param {any} objContext
    * @summary Gets the main navigation for SSR
    */
    GetMainNavigationId(objContext) {
        let strActiveMainNavigationId = "";
        if (objContext.props.IsForServerRenderHtml) {
            let arrUrlPath = objContext.props.UrlPath.split("/");
            let strComponentName = arrUrlPath.length > 1 ? objContext.props.UrlPath.split("/")[1] : "";
            let arrNavigationData = this.GetNavigationData(objContext);
            if (strComponentName == "") {
                let arrMainNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == 0);
                strActiveMainNavigationId = arrMainNavigationData[0] ? arrMainNavigationData[0]["NavigationId"] : "";
            }
            else {
                let objActiveMainNavigation = arrNavigationData.find(obj => obj["NavigationName"] == strComponentName);
                strActiveMainNavigationId = objActiveMainNavigation ? objActiveMainNavigation["NavigationId"] : "";
            }
        }
        return strActiveMainNavigationId;
    }

}

export default BreadCrumb_ModuleProcessor;