// React related imports.
import React from "react";

//Base classes.
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Internal service class imports
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';

//Object used...
import Object_Framework_Services_FrameworkNavigation from "@shared/Object/a.Framework/Services/Navigation/FrameworkNavigation"
import Object_DevServer_ProductManagement_Folder from "@shared/Object/c.ProductManagement/Folder/Folder";
import Object_DevServer_ProductManagement_Module from '@shared/Object/c.ProductManagement/Module/Module';

//Module related fies...
import Master_Module from '@shared/Application/c.ProductManagement/LoginAndMaster/Master/Master_Module';

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
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/LoginAndMaster/Master",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation"
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

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/LoginAndMaster/Master", "/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation","/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    HandleSideNavigation(objContext){
        objContext.dispatch({ type: "SET_STATE", payload: { "blnOpenSideNav": !objContext.state.blnOpenSideNav  } });
    };

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
     * @name OnHelpClick
     * @param {any} objContext
     * @summary Handles the Help click
     */
    OnHelpClick(objContext) {
        let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
        objOnlineHelpObject = { ...objOnlineHelpObject, "HelpAction": "Open" };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
        //to display the SplitPane on HelpClick
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
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteCustom("API/ProductManagement/LoginAndMaster/Login/Logout", "POST", {})
            .then(response => response.json())
            .then(objResponse => {
                let strBaseUrl = objContext.props.JConfiguration.BaseUrl + "?LoggedOut=Y"; //adding LoggedOut to querystring in order to redirect to Logout page.
                window.location = strBaseUrl;
            });
    }

    LoadNavigationForSSR(objContext) {
        if (objContext.props.IsForServerRenderHtml) {
            //ApplicationState.SetProperty("RouterPath", "/SoftwareEngineerSupport/CommonSupport");
            //let strPushUrl = objContext.props.JConfiguration.VirtualDirName + "/SoftwareEngineerSupport/CommonSupport/NavigationCommonPage";
            //objContext.props.history.push({ pathname: strPushUrl.replace("//", "/") });
        }
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
            if (strActiveMainNavigationId.length == 36) { //If the Main Navigation is one of the Module Navigations
                strComponentName = "Module"
            }
            else {
                let arrSubNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == strActiveMainNavigationId);
                let objFirstNavigation = arrSubNavigationData[0];
                if (arrNavigationData.find(obj => obj["ParentNavigationId"] == objFirstNavigation["NavigationId"])) {
                    strComponentName = "NavigationCommonPage";
                }
                else {
                    strComponentName = objFirstNavigation["NavigationName"];
                }                
                objSubNavigation = objFirstNavigation
            }
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
            if (!objSubNavigation) {
                objSubNavigation = this.GetSubNavigationNode(objContext);
            }
        }
        if (objSubNavigation?.["SSREnabled"] !== "N") {
            let strSubNavigationId = objSubNavigation ? objSubNavigation["NavigationId"] : "";
            ApplicationState.SetProperty("ActiveSubNavigationId", strSubNavigationId);
            //------------Maintaining list of ServerRendered Modules---------------------------
            let arrServerRenderedModules = objContext.props.ApplicationStateData?.FullServerRenderedModules ?? [];
            if (arrServerRenderedModules.filter(strComponent => strComponent == strComponentName).length == 0) {
                arrServerRenderedModules = [...arrServerRenderedModules, strComponentName];
                ApplicationState.SetProperty("FullServerRenderedModules", arrServerRenderedModules);
            }

            let Component = objContext.props.ComponentController.GetComponent(strComponentName);
            return < Component
                {...objContext.props}
            //MainNavigationId={this.GetMainNavigationId(objContext)}
            //SubNavigationId={this.GetSubNavigationId(objContext)}
            />;
        }
        else {
            return <React.Fragment />;
        }
        //need to review using ComponentLoader
        //return <ComponentLoader
        //    IsForServerRenderHtml={objContext.props.IsForServerRenderHtml}
        //    ComponentController={objContext.props.ComponentController}
        //    JConfiguration={JConfiguration}
        //    ClientUserDetails={objContext.props.ClientUserDetails}
        //    ComponentName={strComponentName}
        //    IsForceClientRender={true}
        ///>
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
            let strComponentName = arrUrlPath.length > 1 ?  objContext.props.UrlPath.split("/")[1] : "";
                      
            let arrNavigationData = this.GetNavigationData(objContext);
            if (strComponentName == "") {
                let arrMainNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == 0);
                strActiveMainNavigationId = arrMainNavigationData[0]["NavigationId"];
            }
            else {
                let objActiveMainNavigation = arrNavigationData.find(obj => obj["NavigationName"] == strComponentName);
                strActiveMainNavigationId = objActiveMainNavigation ? objActiveMainNavigation["NavigationId"] : "";
            }
            ApplicationState.SetProperty("ActiveMainNavigationId", strActiveMainNavigationId);
        }    
        return strActiveMainNavigationId;
    }

    /**
    * @name GetSubNavigationId
    * @param {any} objContext
    * @summary Gets the Sub navigation for SSR
    */
    GetSubNavigationId(objContext) {
        let strActiveSubNavigationId = "";
        if (objContext.props.IsForServerRenderHtml) {
            let strActiveMainNavigationId = this.GetMainNavigationId(objContext);
            if (objContext.props.QueryStringObject?.SubNavigationId)
                strActiveSubNavigationId = objContext.props.QueryStringObject.SubNavigationId;
            else {
                //CHECK
                if (DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)) {
                    let arrMainNavData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"].filter(obj => obj.uParentFolderId == "00000000-0000-0000-0000-000000000000").sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
                    strActiveSubNavigationId = arrMainNavData && arrMainNavData[0] ? arrMainNavData[0]["uFolderId"] : "";
                }
            }
            ApplicationState.SetProperty("ActiveSubNavigationId", strActiveSubNavigationId);
        }
        return strActiveSubNavigationId;
    }
    
    /**
    * @name GetSubNavigationNode
    * @param {any} objContext
    * @summary Gets the Sub Navigation Node for SSR
    */
    GetSubNavigationNode(objContext) {
        let objSubNavigation = {};
        let strActiveMainNavigationId = this.GetMainNavigationId(objContext);
        let strActiveSubNavigationId = "";
        if (objContext.props.QueryStringObject?.SubNavigationId) {
            strActiveSubNavigationId = objContext.props.QueryStringObject.SubNavigationId;
            objSubNavigation = {
                "NavigationId": strActiveSubNavigationId
            };            
        }
        else {
            //CHECK
            if (DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)) {
                let arrSubNavData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"].filter(obj => obj.uParentFolderId == "00000000-0000-0000-0000-000000000000").sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
                objSubNavigation = arrSubNavData?.[0] ?? {};
                objSubNavigation = {
                    ...objSubNavigation,
                    "NavigationId": objSubNavigation["uFolderId"] || objSubNavigation["uModuleId"]
                }
            }            
        }
        return objSubNavigation;
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
     * @name GetPrefetchNavigations
     * @param {any} objContext
     * @summary Forms the array of Navigations to be Prefetched.
     */
    GetPrefetchNavigations(arrNavigation) {
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y";
        let arrMainNavigations = arrNavigationData.filter(objNav => (blnIsDevMode || !objNav["ProjectIdentifier"] || objNav["ProjectIdentifier"].split(',').indexOf(JConfiguration.ProjectIdentifier) > -1) && objNav["ParentNavigationId"] == 0);
        let arrSubNavigations = [];
        arrMainNavigations.forEach(obj => {
            let objFirstSubNavigation = arrNavigationData.find(objTemp => objTemp["ParentNavigationId"] == obj["NavigationId"]);
            if (objFirstSubNavigation)
                arrSubNavigations = [...arrSubNavigations, objFirstSubNavigation];
        });
        return [{ ...objNavigation, [strApplicationName]: [...arrMainNavigations, ...arrSubNavigations] }];
    }
    
    /**
     * @name GetPrefetchLinksForFilter
     * @param {any} objContext
     * @summary Forms the array of Object data to be Prefetched with Filter.
     */
    GetPrefetchLinksForFilter(objContext) {
        let arrPrefetchLinksForFilter = [];
        let arrFolderParams = [];
        let arrModuleParams = [];
        let arrNavigation = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y";
        arrNavigationData = arrNavigationData.filter(objNav => blnIsDevMode || !objNav["ProjectIdentifier"] || objNav["ProjectIdentifier"].split(',').indexOf(JConfiguration.ProjectIdentifier) > -1);

        Object_DevServer_ProductManagement_Folder.Initialize({});
        Object_DevServer_ProductManagement_Module.Initialize({});
        
        arrNavigationData?.forEach(objNav => {
            if (objNav["NavigationType"]) {
                arrFolderParams = [
                    ...arrFolderParams,
                    {
                        "URL": Object_DevServer_ProductManagement_Folder.URL,
                        "Params": this.GetFolderParams(objNav["NavigationId"])
                    }
                ];
                arrModuleParams = [
                    ...arrModuleParams,
                    {
                        "URL": Object_DevServer_ProductManagement_Module.URL,
                        "Params": this.GetModuleParams(objNav["NavigationId"])
                    }
                ];
            }
        });
        return [...arrFolderParams, ...arrModuleParams];        
    }

    GetFolderParams(strActiveMainNavigationId) {
        return {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "uApplicationTypeId": strActiveMainNavigationId
                        }
                    }
                ]
            }
        };
    }

    GetModuleParams(strActiveMainNavigationId) {
        return {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "uApplicationTypeId": strActiveMainNavigationId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ]
        };
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        let arrDynamicStyles = [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css"
        ]
        if (JConfiguration.Performance) {
            arrDynamicStyles = [...arrDynamicStyles,
            props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
        }
        return arrDynamicStyles;
    }
}

export default Master_ModuleProcessor;