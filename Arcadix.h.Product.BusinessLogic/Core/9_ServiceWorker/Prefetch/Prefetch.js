//Framework imports.
import { getProcessUrl } from '@shared/Framework/DataService/ArcadixCacheData/Redux/ProcessUrl';
import { GetUniqueId } from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name LoadPrefetchLinksForNavigation
 * @param {Array} arrNavigation arrNavigation
 * @param {object} objContext objContext
 * @summary Loops through the Navigation Data and forms Prefetch links for Modules
 */
export function LoadPrefetchLinksForNavigation(arrNavigation, objContext, arrPrefetchFilterData) {
    if (JConfiguration.IsPrefetchEnabled) {
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        RenewPrefetchToken(() => {
            arrNavigationData?.forEach((objModule, intIndex) => {
                //Creating Prefetch links only for Modules not rendered yet
                if (objModule["URL"] != undefined && objModule["URL"] != "") {
                    let strModuleName = objModule["URL"].split('/')[objModule["URL"].split('/').length - 1];
                    if (!global.arrModulesRendered.includes(strModuleName))
                        GetObjectListForModule(strModuleName, objContext, intIndex == arrNavigationData.length - 1, arrPrefetchFilterData);
                }
            });
        });
    }
}

/**
 * @name GetObjectListForModule
 * @param {object} objModule objModule
 * @param {object} objContext objContext
 * @summary Gets the list of all objects used in the Module from InitialDataParams
 */
export function GetObjectListForModule(strModuleName, objContext, blnClearToken, arrPrefetchFilterData) {
    let arrObjectList = [];
    let arrCssList = [];
    let Component = objContext.props.ComponentController.GetComponent(strModuleName);
    if (Component) {
            Component.load()
                .then(objLoadedComponent => {
                    if (objLoadedComponent && objLoadedComponent.ModuleProcessor) {
                        if (strModuleName?.includes("?"))
                            global.PrefetchHref = strModuleName;//Setting URL from Navigation JSON if navigation contains querystring
                        let objModuleProcessorInstance = new objLoadedComponent.ModuleProcessor();
                        if (objModuleProcessorInstance.InitialDataParams) {
                            arrObjectList = objModuleProcessorInstance.InitialDataParams(objContext.props, arrPrefetchFilterData);
                            arrObjectList.forEach(objPrefetchObject => {
                                //Creating separate Prefetch Link tags if multiple DataCallParams are there for object(like TextResource)
                                if (Array.isArray(objPrefetchObject["InitialDataCallParam"])) {
                                    objPrefetchObject["InitialDataCallParam"].map(objDataCall => {
                                        CreateObjectPrefetchLinkTag(objPrefetchObject["URL"], objDataCall["SearchParams"] ?? objDataCall);
                                    })
                                }
                                else
                                    CreateObjectPrefetchLinkTag(objPrefetchObject["URL"], objPrefetchObject["InitialDataCallParam"]);
                            });
                        }
                        global.PrefetchHref = null;//To clear Prefetch Href
                        if (objModuleProcessorInstance.GetDynamicStyles) {
                            arrCssList = objModuleProcessorInstance.GetDynamicStyles(objContext.props);
                            arrCssList.forEach(strUrl => {
                                var strId = strUrl.substring(strUrl.indexOf("Theme") + 7);
                                CreateCssPrefetchLinkTag(strId, strUrl)
                            });
                        }
                        if (objModuleProcessorInstance.GetPrefetchFiles) {
                            let arrFilesList = objModuleProcessorInstance.GetPrefetchFiles(objContext.props);
                            arrFilesList["Components"]?.forEach(strComponent => {
                                let strComponentPath = JConfiguration.BaseUrl + "Bundle/" + JConfiguration["ApplicationFolderName"] + JConfiguration["DeviceType"] + "/ClientBuild/" + strComponent + ".chunk.js"
                                CreatePrefetchFilesLinkTag(strComponent, strComponentPath)
                            });

                            arrFilesList["Files"]?.forEach(strFilePath => {
                                var strId = strFilePath.substring(strFilePath.lastIndexOf('/') + 1);
                                CreatePrefetchFilesLinkTag(strId, strFilePath)
                            });
                        }
                    }
                    //To Renew Token before forming next set of Prefetch links(as token would have expired).
                    if (blnClearToken) {
                        ApplicationState.SetProperty("IsRenewPrefetchToken", true);
                    }
                }
            )
    }  
}

/**
 * @name CreateObjectPrefetchLinkTag
 * @param {string} strPrefetchUrl strPrefetchUrl
 * @param {string} objPrefetchParams objPrefetchParams
 * @summary Dynamically Creates a link tag with Prefetch hint to load Object Data 
 */
export function CreateObjectPrefetchLinkTag(strPrefetchUrl, objPrefetchParams) {
    let strEntity = getProcessUrl(strPrefetchUrl, "GET", true);
    let strFilters = ArcadixCacheData.fnGetFilters(strEntity, objPrefetchParams);
    let objHead = document.getElementsByTagName('head')[0];
    let objExistingLink = document.getElementById(strFilters);
    if (objExistingLink != null) {
        console.log("Prefetch Object link already added");
    }
    else {
        if (strPrefetchUrl && objPrefetchParams) {
            //Renewing Prefetch Token if required, before forming the Prefetch Link tag.   
            //RenewPrefetchToken(() => {
                //generate link prefetch tag 
                let strToken = ApplicationState.GetProperty("PrefetchToken") ?? Token?.["PrefetchToken"];
                let strUrl = JConfiguration.BaseUrl + "Prefetch/Prefetch.html" + QueryString.SetQueryStringValue("", "APIUrl", strPrefetchUrl);
                strUrl = QueryString.SetQueryStringValue(strUrl, "APIParams", JSON.stringify(objPrefetchParams));
                strUrl = QueryString.SetQueryStringValue(strUrl, "token", strToken);
                strUrl = QueryString.SetQueryStringValue(strUrl, "PrefetchUrl", JConfiguration.PrefetchUrl);
                strUrl = QueryString.SetQueryStringValue(strUrl, "ApplicationHostUrl", JConfiguration.strHostUrl);
                strUrl = QueryString.SetQueryStringValue(strUrl, "UniqueId", GetUniqueId());
                let objLinkTag = document.createElement('link');
                objLinkTag.setAttribute('id', strFilters);
                objLinkTag.setAttribute('rel', 'prefetch');
                objLinkTag.setAttribute('as', 'fetch');
                objLinkTag.setAttribute('href', strUrl);
                //inject tag in the head of the document 
                objHead.appendChild(objLinkTag);               
            //})                
        }
    }    
}

/**
 * @name CreateCssPrefetchLinkTag
 * @param {string} strId strId
 * @param {string} strUrl strUrl
 * @summary Dynamically Creates a link tag with Prefetch hint to load Css
 */
export function CreateCssPrefetchLinkTag(strId, strUrl) {
    var objHead = document.getElementsByTagName('head')[0];
    var objExistingLink = document.getElementById(strId);
    if (objExistingLink != null) {
        console.log("Prefetch Stylesheet already added");
    }
    else {
        let objLinkTag = document.createElement('link');
        objLinkTag.setAttribute('id', strId);
        objLinkTag.setAttribute('rel', 'prefetch stylesheet');
        objLinkTag.setAttribute('type', 'text/css');
        objLinkTag.setAttribute('href', strUrl);
        objLinkTag.setAttribute('media', 'all');
        objHead.appendChild(objLinkTag);
    }
}

/**
 * @name CreatePrefetchFilesLinkTag
 * @param {string} strId strId
 * @param {string} strUrl strUrl
 * @summary Dynamically Creates a link tag with Prefetch hint to load Files
 */
export function CreatePrefetchFilesLinkTag(strId, strUrl) {
    var objHead = document.getElementsByTagName('head')[0];
    var objExistingLink = document.getElementById(strId);
    if (objExistingLink != null) {
        console.log("Prefetch File already added");
    }
    else {
        let objLinkTag = document.createElement('link');
        objLinkTag.setAttribute('id', strId);
        objLinkTag.setAttribute('rel', 'prefetch');
        objLinkTag.setAttribute('href', strUrl);
        objLinkTag.setAttribute('media', 'all');
        objHead.appendChild(objLinkTag);
    }
}

/**
 * @name RenewPrefetchToken
 * @summary Temporary method to Renew the Prefetch Token.
 */
export function RenewPrefetchToken(fnCallBack) {
    if (ApplicationState.GetProperty("IsRenewPrefetchToken")) {    
        ApplicationState.SetProperty("IsRenewPrefetchToken", false);
        ArcadixFetchData.ExecuteCustom("API/Framework/Core/Prefetch/GetPrefetchToken", "POST", {})
            .then(objResponse => objResponse.json())
            .then(objJSON => {
                if (objJSON["PrefetchToken"]) {
                    ApplicationState.SetProperty("PrefetchToken", objJSON["PrefetchToken"]);                    
                }
                if(fnCallBack)
                    fnCallBack();
            });
    }
    else{
        if(fnCallBack)
            fnCallBack();
    }        
}

/**
 * @name LoadPrefetchLinksForFilter
 * @summary Forms the Prefetch Links for loading Object data with Filters if any.
 */
export function LoadPrefetchLinksForFilter(arrPrefetchLinksForFilter) {
    if (JConfiguration.IsPrefetchEnabled) {
        arrPrefetchLinksForFilter.forEach(objPrefetch => {
            CreateObjectPrefetchLinkTag(objPrefetch["URL"], objPrefetch["Params"]);
        });
    }
}