// React related imports.
import React from "react";

//Base classes.
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Object used...
import Object_Framework_Services_FrameworkNavigation from "@shared/Object/a.Framework/Services/Navigation/FrameworkNavigation"
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';

//Module related fies...
import Master_Module from '@shared/Application/c.Intranet/LoginAndMaster/Master/Master_Module';

//Global declaration of the base files.
global.IntranetBase_ModuleProcessor = IntranetBase_ModuleProcessor;
global.Base_Form = Base_Form;



class Master_ModuleProcessor extends IntranetBase_ModuleProcessor {

    constructor() {
        super();
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "RouterPath" },
            "Object_Framework_Services_FrameworkNavigation",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/LoginAndMaster/Master",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/LoginAndMaster/Navigation"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
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

        Object_Framework_Services_FrameworkNavigation.Initialize(objNavParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_FrameworkNavigation];

        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/LoginAndMaster/Master", "/c.Intranet/LoginAndMaster/Navigation"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams,'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name HandleSideNavigation
     * @param {any} objContext
     * @summary Handles the SideNavigation click
     */
    HandleSideNavigation(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnOpenSideNav": !objContext.state.blnOpenSideNav } });
    };

    /**
     * @name HandleDropDownChange
     * @param {any} objContext
     * @param {any} objChangeData
     */
    HandleDropDownChange(objContext, objChangeData) {
        let strUrl = window.location.href;
        if (objChangeData.iFrameworkLanguageId) {
            objContext.dispatch({ type: "SET_STATE", payload: { "intLanguageDropdownSelectedValue": objChangeData.iFrameworkLanguageId } });
            if (objChangeData.iFrameworkLanguageId == -1) {
                window.location.href = strUrl.toString().split('?')[0];
            }
            //LanguageCultureSwitch.LanguageSwitch(objChangeData);
            window.location.href = QueryString.SetQueryStringValue(strUrl, "LanguageCultureInfo", objChangeData["vLanguageCultureInfo"]);
        }
        if (objChangeData.iCountryId) {
            objContext.dispatch({ type: "SET_STATE", payload: { "intCountryDropdownSelectedValue": objChangeData.iCountryId } });
            if (objChangeData.iCountryId == -1) {
                window.location.href = strUrl.toString().split('?')[0];
            }
            //ApplicationState.SetProperty("InterfaceLanguage", objChangeData["vCountryCultureInfo"]);
            window.location.href = QueryString.SetQueryStringValue(strUrl, "CountryCultureInfo", objChangeData["vCountryCultureInfo"]);
        }
    }

    /**
     * @name OnHelpClick
     * @param {any} objContext
     * @summary Handles the Help click
     */
    OnHelpClick(objContext) {
        let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
        objOnlineHelpObject = { ...objOnlineHelpObject, "HelpAction": "Open" };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
        objContext.state.refOnlineHelp.current.pane2.style.width = "15%";
    }

    /**
    * @name OnOnlineHelpClose
    * @param {any} objContext
    * @summary Handles the OnlineHelp close event.
    */
    OnOnlineHelpClose(objContext) {
        //to hide the SplitPane on Help close
        objContext.state.refOnlineHelp.current.pane2.style.width = "0px";
    }

    /**
     * @name OnLogoutClick
     * @param {any} objContext
     * @summary Handles the Help click
     */
    OnLogoutClick(objContext) {
        ArcadixFetchData.ExecuteCustom("API/Intranet/LoginAndMaster/IntranetLogin/Logout", "POST", {})
            .then(response => response.json())
            .then(objResponse => {
                let strBaseUrl = objContext.props.JConfiguration.BaseUrl.substring(0, objContext.props.JConfiguration.BaseUrl.length - 1);
                window.location = strBaseUrl;
            });
    }

    /**
     * @name LoadProcessCount
     * @param {any} objContext
     * @summary Updates the offline processes count.
     */
    LoadOfflineProcessCount(objContext) {
        Master_Module.GetOfflineProgressDetails({}, (objData) => {
            ApplicationState.SetProperty("RunningOfflineProcesses", objData.RunningOfflineProcesses);
            ApplicationState.SetProperty("TotalOfflineProcesses", objData.TotalOfflineProcesses);
        });
    }

    /**
     * @name GetMainNavigationId
     * @param {any} objContext
     * @summary Gets the main navigation for SSR
     */
    GetMainNavigationId(objContext) {
        let strActiveMainNavigationId = "";
        if (objContext.props.IsForServerRenderHtml) {
            let arrUrlPath = objContext.props.UrlPath?.split("/") ?? [];
            let strComponentName = arrUrlPath.length > 1 ? objContext.props.UrlPath.split("/")[1] : "";

            let arrNavigationData = this.GetNavigationData(objContext);
            if (strComponentName == "") {
                let arrMainNavigationData = arrNavigationData?.filter(obj => obj["ParentNavigationId"] == 0);
                strActiveMainNavigationId = arrMainNavigationData?.[0]?.["NavigationId"] ?? "";
            }
            else {
                let objActiveMainNavigation = arrNavigationData?.find(obj => obj["NavigationName"] == strComponentName);
                if (objActiveMainNavigation?.NavigationType) { //for Task and Test...
                    strActiveMainNavigationId = objActiveMainNavigation.NavigationType?.toLowerCase() == "task" ? -1 : -2;
                    ApplicationState.SetProperty('ActiveSubNavigationId', 0);
                }
                else {
                    strActiveMainNavigationId = objActiveMainNavigation ? objActiveMainNavigation["NavigationId"] : "";
                }
            }
            ApplicationState.SetProperty("ActiveMainNavigationId", strActiveMainNavigationId);
        }
        return strActiveMainNavigationId;
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
        let arrNavigationData = objNavigation[strApplicationName] ?? [];
        let blnIsDevMode = false;
        if (objContext.props.IsForServerRenderHtml) {
            blnIsDevMode = objContext.props.IsForServerRenderHtml && objContext.props.QueryStringObject && objContext.props.QueryStringObject.IsDevMode == "Y"
        }
        else {
            blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y";
        }
        arrNavigationData = arrNavigationData?.filter(obj => !obj["ProjectIdentifier"] || blnIsDevMode || (obj["ProjectIdentifier"] && obj["ProjectIdentifier"]?.split(",")?.includes(JConfiguration.ProjectIdentifier)));
        return arrNavigationData;
    }

    /**
     * @name LoadModuleForSSR
     * @param {any} objContext
     * @summary Loads the Module for SSR based on the URL
     */
    LoadModuleForSSR(objContext) {
        let strComponentName = objContext.props.UrlPath.split("/")[objContext.props.UrlPath.split("/").length - 1]//"NavigationCommonPage";
        let arrNavigationData = this.GetNavigationData(objContext);
        let objSubNavigation;
        if (strComponentName == "" && DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)) {
            let arrMainNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == 0);
            let strActiveMainNavigationId = arrMainNavigationData[0]["NavigationId"];
            let arrSubNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == strActiveMainNavigationId);
            let objFirstNavigation = arrSubNavigationData[0];
            if (arrNavigationData.find(obj => obj["ParentNavigationId"] == objFirstNavigation["NavigationId"])) {
                strComponentName = "NavigationCommonPage";
            }
            else {
                strComponentName = objFirstNavigation["NavigationName"];
            }
            objSubNavigation = objFirstNavigation;
        }
        else if (DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)) {
            let strSSRComponentName = "";
            if (strComponentName == "NavigationCommonPage") {
                strSSRComponentName = objContext.props.UrlPath.split("/")[objContext.props.UrlPath.split("/").length - 2]
            }
            else {
                strSSRComponentName = strComponentName;
            }
            objSubNavigation = arrNavigationData.find(obj => obj["NavigationName"] == strSSRComponentName);
        }
        if (objSubNavigation?.["SSREnabled"] !== "N") {
            let strSubNavigationId = objSubNavigation ? objSubNavigation["NavigationId"] : "";
            ApplicationState.SetProperty("ActiveSubNavigationId", strSubNavigationId);
            ApplicationState.SetProperty("BreadCrumbNavigationId", strSubNavigationId);
            //------------Maintaining list of ServerRendered Modules---------------------------
            let arrServerRenderedModules = objContext.props.ApplicationStateData?.FullServerRenderedModules ?? [];
            if (arrServerRenderedModules.filter(strComponent => strComponent == strComponentName).length == 0) {
                arrServerRenderedModules = [...arrServerRenderedModules, strComponentName];
                ApplicationState.SetProperty("FullServerRenderedModules", arrServerRenderedModules);
            }
            //----------------------------------------------------------------------------------
            let Component = objContext.props.ComponentController.GetComponent(strComponentName);
            return <div type="RDiv">< Component
                {...objContext.props}
            /></div>;
        }
        else {
            return <React.Fragment/>;
        }
    }

    /**
     * @name GetPrefetchNavigations
     * @param {any} objContext
     * @summary Forms the array of Navigations to be Prefetched.
     */
    GetPrefetchNavigations(arrNavigation) {
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let arrMainNavigations = arrNavigationData.filter(obj => obj["ParentNavigationId"] == 0);
        let arrSubNavigations = [];
        arrMainNavigations.forEach(obj => {
            let objFirstSubNavigation = arrNavigationData.find(objTemp => objTemp["ParentNavigationId"] == obj["NavigationId"]);
            if (objFirstSubNavigation)
                arrSubNavigations = [...arrSubNavigations, objFirstSubNavigation];
        });
        return [{ ...objNavigation, [strApplicationName]: [...arrMainNavigations, ...arrSubNavigations] }];
    }

    /**
     * @name GetDynamicStyles
     * @param {any} objContext
     * @summary Returns list of css files used for the Module.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
}

export default Master_ModuleProcessor;