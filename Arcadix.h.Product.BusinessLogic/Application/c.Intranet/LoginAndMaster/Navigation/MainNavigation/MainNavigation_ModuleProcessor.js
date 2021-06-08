//Base Imports.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Core Imports.
import { LoadPrefetchLinksForNavigation} from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

class MainNavigation_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            //{ "StoreKey": "ApplicationState", "DataKey": "ActiveMainNavigationId" },
            //{ "StoreKey": "ApplicationState", "DataKey": "ActiveSubNavigationId" },
        ];
    }

    /**
     * @name OnMainNavigationClick
     * @param {any} objContext
     * @param {any} objNavigation
     * @summary Sets the ActiveMainNavigationId and  in the Store, for each navigation change
     * Does the routing for Task, Test and for the Navigation with no Children
     */
    OnMainNavigationClick(objContext, objNavigation) {
        var strFullQueryString = window.location.search;
        strFullQueryString = QueryString.RemoveQueryStringValue(strFullQueryString, "SubNavigationId");
        var arrSubNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
        //Setting the ActiveMainNavigationId and  in the Store, for each navigation change
        if (objNavigation.NavigationId != ApplicationState.GetProperty('ActiveMainNavigationId')) {
            if (arrSubNavigation.length == 0) {
                ApplicationState.SetProperty("blnShowAnimation", true);
            }
            ApplicationState.SetProperty('ActiveMainNavigationId', objNavigation.NavigationId);
            if (!objNavigation.NavigationType) {
                var arrChildrenNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
                ApplicationState.SetProperty('ActiveSubNavigationId', arrChildrenNavigation[0]["NavigationId"]);
                ApplicationState.SetProperty('BreadCrumbNavigationId', arrChildrenNavigation[0]["NavigationId"]);
                let objSelctedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                ApplicationState.SetProperty("SelectedNode", { ...objSelctedNode, "Tree_Master": arrChildrenNavigation[0] });
                let objExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes") : {};
                ApplicationState.SetProperty("ExpandedNodes", { ...objExpandedNodes, "Tree_Master": [arrChildrenNavigation[0]] });
                let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                if (fnSelectTreeNode) {
                    fnSelectTreeNode(arrChildrenNavigation[0]);
                }
            }
        }
        
        var arrChildrenNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
        if (objNavigation.NavigationType) { //routing for Task and Test...
            var intNavid = objNavigation.NavigationType.toLowerCase() == "task" ? -1 : -2;
            // ApplicationState.SetProperty('RouterPath', strVirtualPath);
            ApplicationState.SetProperty('ActiveMainNavigationId', intNavid);
            ApplicationState.SetProperty('ActiveSubNavigationId', 0);
            ApplicationState.SetProperty('BreadCrumbNavigationId', objNavigation.NavigationId);
            ApplicationState.SetProperty('SelectedRows', null);
            let objRootNode = intNavid == -1 ? { iPageFolderId: "0", iPageParentFolderId: "-1", vPageFolderName: "Tasks" } : { iTestFolderId: "0", iTestParentFolderId: "-1", vTestFolderName: "Tests" };
            ApplicationState.SetProperty('SelectedNode', { "Tree_Master": objRootNode });
            ApplicationState.SetProperty('ExpandedNodes', { "Tree_Master": [objRootNode] });
            //let strPushUrl = strVirtualPath + objNavigation.NavigationName + strFullQueryString;
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.NavigationName + strFullQueryString;
            let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
            ApplicationState.SetProperty('RouterPath', strRouterPath);

            objContext.props.history.push({
                pathname: strPushUrl,
                state: objNavigation
            });
        }
        else if (arrChildrenNavigation.length == 0) { //routing for the Navigation with no Children...
            let strRouterPath = objContext.props.JConfiguration.VirtualDirName + '/' + objNavigation.NavigationName;
            ApplicationState.SetProperty('RouterPath', strRouterPath);
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.URL + strFullQueryString;
            objContext.props.history.push({
                pathname: strPushUrl,
                state: objNavigation
            });
        }
        else {
            //To Select/Expand the first node of Tree(when SubNavigation is NavigationCommonPage)
            let objSelectedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
            ApplicationState.SetProperty("SelectedNode", { ...objSelectedNode, "Tree_Master": arrChildrenNavigation[0] });
            let objExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes") : {};
            ApplicationState.SetProperty("ExpandedNodes", { ...objExpandedNodes, "Tree_Master": [arrChildrenNavigation[0]] });
        }
        Performance.Reset();
        let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
        objOnlineHelpObject = { ...objOnlineHelpObject, "HelpGroup": objNavigation.NavigationName };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);

        //Forming Prefetch links
        if (JConfiguration.IsPrefetchEnabled) {
            let arrModuleSubNavigations = [];
            arrChildrenNavigation.forEach(objNav => {
                let arrChildrenSubNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNav.NavigationId);
                if (arrChildrenSubNavigation.length == 0)
                    arrModuleSubNavigations = [...arrModuleSubNavigations, objNav];
            });
            if (arrModuleSubNavigations.length > 0) {
                //Manually forming the NavigationArray like Data from FrameworkNavigation object
                let arrPrefetchNavigations = [{ "ApplicationType": objContext.props.JConfiguration.ApplicationTypeId, [objContext.props.JConfiguration.ApplicationName]: arrModuleSubNavigations }];
                LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext)
            }
        }
    }    
}

export default MainNavigation_ModuleProcessor;