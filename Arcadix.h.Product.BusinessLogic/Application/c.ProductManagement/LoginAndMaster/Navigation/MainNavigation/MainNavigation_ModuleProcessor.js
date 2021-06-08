//Base classes.
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

//Core imports...
import { LoadPrefetchLinksForNavigation } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

class MainNavigation_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name OnMainNavigationClick
     * @param {any} objContext
     * @param {any} objNavigation
     * @summary Sets the ActiveMainNavigationId and  in the Store, for each navigation change
     * Does the routing for Task, Test and for the Navigation with no Children
     */
    OnMainNavigationClick(objContext, objNavigation) { 
        if (objNavigation["NavigationType"]) {
            var strFullQueryString = window.location.search;
            strFullQueryString = QueryString.RemoveQueryStringValue(strFullQueryString, "SubNavigationId");
            ApplicationState.SetProperty('ActiveMainNavigationId', objNavigation.NavigationId);
            objContext.dispatch({ type: "SET_STATE", payload: { "strMainNavigationId": objNavigation.NavigationId } });
            ApplicationState.SetProperty('ActiveSubNavigationId', null);
            ApplicationState.SetProperty('ExpandedNodes', { "Tree_Master": null });
            //----------------------------Adding the MainNavigation ApplicationType in Url and RouterPath-----------------------
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.NavigationName + strFullQueryString;
            let strRouterPath = objContext.props.JConfiguration.VirtualDirName + objNavigation.NavigationName;
            ApplicationState.SetProperty('RouterPath', strRouterPath);
            objContext.props.history.push({
                pathname: strPushUrl
            });
            //------------------------------------------------------------------------------------------------------------------       
            let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
            objOnlineHelpObject = { ...objOnlineHelpObject, "HelpGroup": objNavigation.NavigationName };       
            ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
            Performance.Reset();
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "strMainNavigationId": null } });
            var strFullQueryString = window.location.search;
            strFullQueryString = QueryString.RemoveQueryStringValue(strFullQueryString, "SubNavigatioId");
            //Setting the ActiveMainNavigationId and  in the Store, for each navigation change
            if (objNavigation.NavigationId != ApplicationState.GetProperty('ActiveMainNavigationId')) {
                ApplicationState.SetProperty("blnShowAnimation", true);
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
            if (arrChildrenNavigation.length == 0) { //routing for the Navigation with no Children...
                let strRouterPath = objContext.props.JConfiguration.VirtualDirName + '/' + objNavigation.NavigationName;
                ApplicationState.SetProperty('RouterPath', strRouterPath);
                var strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.URL + strFullQueryString;
                objContext.props.history.push({
                    pathname: strPushUrl,
                    state: objNavigation
                });
            }
            let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
            objOnlineHelpObject = { ...objOnlineHelpObject, "HelpGroup": objNavigation.NavigationName };        
            ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
            Performance.Reset();

            //Forming Prefetch links - Only for Settings MainNavigation
            let arrModuleSubNavigations = [];
            arrChildrenNavigation.forEach(objNav => {
                let arrChildrenSubNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNav.NavigationId);
                if (arrChildrenSubNavigation.length == 0)
                    arrModuleSubNavigations = [...arrModuleSubNavigations, objNav];
            });
            if (arrModuleSubNavigations.length > 0) {
                //Manually forming the NavigationArray like Data from FrameworkNavigation object
                let arrPrefetchNavigations = [{ "ApplicationType": objContext.props.JConfiguration.ApplicationTypeId, [objContext.props.JConfiguration.ApplicationName]: arrModuleSubNavigations }];
                LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext);
            }
        }
        ApplicationState.SetProperty("BreadCrumbNavigation", null);       
    }    

    /**
    * @name LoadNavigationOnRefresh
    * @param {any} objContext
    * @summary Based on the URL, sets the ActiveMainNavigationId...
    */
    LoadNavigationOnRefresh(objContext) {
        var arrBrowserUrl = window.location.pathname.split("/");
        let intActiveMainNavigationId, objActiveMainNavigation = {};
        if (arrBrowserUrl.length < 2 || arrBrowserUrl[1] == "") {
            //During Initial load, check for the DevMode and ProjectIdentifier conditions and set MainNavigationId
            let blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y";
            if (blnIsDevMode || JConfiguration.ProjectIdentifier === "STAGING") {
                intActiveMainNavigationId = objContext.props.NavigationData[0]["NavigationId"];
                let strPushUrl = objContext.props.JConfiguration.VirtualDirName + objContext.props.NavigationData[0]["NavigationName"];
                ApplicationState.SetProperty('RouterPath', strPushUrl);
                strPushUrl += objContext.props.location.search;
                objContext.props.history.push({ pathname: strPushUrl });
            }
            else {
                intActiveMainNavigationId = 1;
                objActiveMainNavigation = objContext.props.NavigationData.filter(x => x.NavigationId == intActiveMainNavigationId)[0]; //for setting in HelpGroup
            }
        }
        else {
            //Getting the ActiveMainNavigationId based on the Browser Url part
            objActiveMainNavigation = objContext.props.NavigationData.filter(x => x.NavigationName == arrBrowserUrl[1])[0];
            intActiveMainNavigationId = objActiveMainNavigation.NavigationId;
        }
        ApplicationState.SetProperty('ActiveMainNavigationId', intActiveMainNavigationId);
        let objOnlineHelpObject = {
            "HelpGroup": objActiveMainNavigation.NavigationName,
        };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
    }

    /**
    * @name LoadNavigationForSSR
    * @param {any} objContext
    * @summary LoadNavigationForSSR
    */
    LoadNavigationForSSR(objContext) {
        if (objContext.props.IsForServerRenderHtml) {
            //this.LoadNavigationOnRefresh(objContext);
        }
    }
}

export default MainNavigation_ModuleProcessor;