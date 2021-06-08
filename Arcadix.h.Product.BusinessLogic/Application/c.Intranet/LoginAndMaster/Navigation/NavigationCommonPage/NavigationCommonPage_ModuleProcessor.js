//Base classes.
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

//Object used...
import Object_Framework_Services_FrameworkNavigation from "@shared/Object/a.Framework/Services/Navigation/FrameworkNavigation"


class NavigationCommonPage_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_FrameworkNavigation",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/LoginAndMaster/Navigation",
            { "StoreKey": "ApplicationState", "DataKey": "ActiveMainNavigationId" },
            { "StoreKey": "ApplicationState", "DataKey": "ActiveSubNavigationId" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Navigation object
        var objNavParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "ApplicationType": props.JConfiguration.ApplicationTypeId
                        }
                    }
                ]
            },
        };

        //Object_Framework_Services_FrameworkNavigation.Initialize(objNavParams);
        //arrDataRequest = [...arrDataRequest, Object_Framework_Services_FrameworkNavigation];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/LoginAndMaster/Navigation"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name OnSubNavigationClick
     * @param {any} objContext
     * @param {any} objNavigation
     * @summary Does the Routing based on the SubNavigation...
     * When the SubNavigation parent has children, Calls the the NavigationCommonPage...
     * Otherwise does the normal routing...
     */
    OnSubNavigationClick(objContext, objNavigation) {
        let arrAllNavigations = this.GetNavigationData(objContext);
        var strFullQueryString = window.location.search;
        if (objNavigation.NavigationId != ApplicationState.GetProperty('ActiveSubNavigationId')) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            ApplicationState.SetProperty('ActiveSubNavigationId', objNavigation.NavigationId);
        }        
        ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["Tree_Master"]: objNavigation });
        let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
        if (fnSelectSubNavigation) {
            fnSelectSubNavigation(objNavigation);
        }
        var arrSubNavigation = arrAllNavigations.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
        if (arrSubNavigation.length == 0) {
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + strFullQueryString;
            objContext.props.history.push({ pathname: strPushUrl });
            let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
            ApplicationState.SetProperty('RouterPath', strRouterPath);
        }
        else {
            let strRouterPath = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations);
            ApplicationState.SetProperty('RouterPath', strRouterPath);
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + "/NavigationCommonPage?SubNavigatioId=" + objNavigation.NavigationId;
            objContext.props.history.push({ pathname: strPushUrl });
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
    GetSubNavigationData(objContext) {
        let arrSubNavigationData = [], arrNavigationData = objContext.NavigationCommonPage_ModuleProcessor.GetNavigationData(objContext);
        let strBreadCrumbNavigationId = objContext.props.IsForServerRenderHtml ? objContext.NavigationCommonPage_ModuleProcessor.GetSubNavigationId(objContext, arrNavigationData) : ApplicationState.GetProperty("BreadCrumbNavigationId");
        arrSubNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == strBreadCrumbNavigationId);
        let objParentNavigation = arrNavigationData.find(obj => obj["NavigationId"] == strBreadCrumbNavigationId);
        let objSubNavigationData = {
            SubNavigationData: arrSubNavigationData,
            ParentNavigationName: objParentNavigation ? objParentNavigation["NavigationName"] : ""
        }
        return objSubNavigationData;
    }

    /**
   * @name GetSubNavigationId
   * @param {any} objContext
   * @summary Gets the Sub navigation for SSR
   */
    GetSubNavigationId(objContext, arrNavigationData) {
        if (objContext.props.IsForServerRenderHtml) {            
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
    * @name GetNavigationData
    * @param {any} objContext
    * @summary Gets the navigation data for PM
    */
    GetNavigationData(objContext) {
        let arrNavigation = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let blnIsDevMode = false;
        if (objContext.props.IsForServerRenderHtml) {
            blnIsDevMode = objContext.props.IsForServerRenderHtml && objContext.props.QueryStringObject && objContext.props.QueryStringObject.IsDevMode == "Y"
        }
        else {
            blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y";
        }
        arrNavigationData = arrNavigationData.filter(obj => !obj["ProjectIdentifier"] || blnIsDevMode || (obj["ProjectIdentifier"] && obj["ProjectIdentifier"].split(",").includes(JConfiguration.ProjectIdentifier)));
        return arrNavigationData;
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
                strActiveMainNavigationId = arrMainNavigationData[0]["NavigationId"];
            }
            else {
                let objActiveMainNavigation = arrNavigationData.find(obj => obj["NavigationName"] == strComponentName);
                strActiveMainNavigationId = objActiveMainNavigation ? objActiveMainNavigation["NavigationId"] : "";
            }
            //ApplicationState.SetProperty("ActiveMainNavigationId", strActiveMainNavigationId);
        }
        return strActiveMainNavigationId;
    }

    GetPrefetchNavigations(arrNavigation, objContext) {
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let arrPrefetchNavigations = arrNavigationData.filter(obj => obj["ParentNavigationId"] == objContext.props.ActiveSubNavigationId);
        return [{ ...objNavigation, [strApplicationName]: arrPrefetchNavigations }];
    }
}

export default NavigationCommonPage_ModuleProcessor;