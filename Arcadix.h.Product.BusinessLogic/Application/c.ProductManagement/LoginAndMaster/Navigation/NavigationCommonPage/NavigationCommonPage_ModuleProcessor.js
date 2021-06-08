//Base classes.
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

class NavigationCommonPage_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_FrameworkNavigation",
            { "StoreKey": "ApplicationState", "DataKey": "ActiveMainNavigationId" },
            { "StoreKey": "ApplicationState", "DataKey": "ActiveSubNavigationId" }
        ];
    }

    /**
     * @name OnSubNavigationClick
     * @param {any} objContext
     * @param {any} objNavigation
     * @summary Does the Routing based on the SubNavigation...
     * When the SubNavigation parent has children, Calls the the NavigationCommonPage...
     * Otherwise does the normal routing...
     */
    OnSubNavigationClick(props, objNavigation, arrAllNavigations) {
        var strFullQueryString = window.location.search;
        if (objNavigation.NavigationId != ApplicationState.GetProperty('ActiveSubNavigationId')) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            ApplicationState.SetProperty('ActiveSubNavigationId', objNavigation.NavigationId);
        }
        ApplicationState.SetProperty('SelectedNode', objNavigation);
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
    * @summary Forms the URL in a recurcise way...
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
   * @name GetSubNavigationId
   * @param {any} objContext
   * @summary Gets the Sub navigation for SSR
   */
    GetSubNavigationId(objContext) {
        if (objContext.props.IsForServerRenderHtml) {
            let strActiveMainNavigationId = objContext.props.ApplicationStateData ? objContext.props.ApplicationStateData.ActiveMainNavigationId : null;
            let strActiveSubNavId = objContext.props.QueryStringObject ? objContext.props.QueryStringObject.SubNavigationId : null;
            if (!strActiveSubNavId) {
                let arrMainNavData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"].filter(obj => obj.uParentFolderId == "00000000-0000-0000-0000-000000000000").sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
                strActiveSubNavId = arrMainNavData && arrMainNavData[0] ? arrMainNavData[0]["uFolderId"] : "";
            }
            return strActiveSubNavId;
        }
    }
}

export default NavigationCommonPage_ModuleProcessor;