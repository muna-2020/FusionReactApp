//Base classes.
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

//Objects used...
import Object_DevServer_ProductManagement_Folder from "@shared/Object/c.ProductManagement/Folder/Folder";
import Object_DevServer_ProductManagement_Module from '@shared/Object/c.ProductManagement/Module/Module';

//Core imports...
import { LoadPrefetchLinksForNavigation, GetObjectListForModule } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';
import { LoadPrefetchEditorChunks } from '@root/Application/e.Editor/PC/EditorPrefetch';

//Module files
import * as SubNavigation_ContextMenuData from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/SubNavigation_ContextMenuData';

class SubNavigation_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
            "Object_DevServer_ProductManagement_Folder",
            "Object_DevServer_ProductManagement_Module",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation",
            { "StoreKey": "ApplicationState", "DataKey": "ActiveMainNavigationId" },
            { "StoreKey": "ApplicationState", "DataKey": "ActiveSubNavigationId" },
            { "StoreKey": "ApplicationState", "DataKey": "blnShowSubNavigation" },
            { "StoreKey": "ApplicationState", "DataKey": "TreeContextMenuData" }
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

        let strActiveMainNavigationId = ApplicationState.GetProperty("ActiveMainNavigationId");
        if (!strActiveMainNavigationId && props.IsForServerRenderHtml && props.MainNavigationId) {
            strActiveMainNavigationId = props.MainNavigationId;
        }
        let objFolderParams = {
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
        let objModuleParams = {
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

        Object_DevServer_ProductManagement_Folder.Initialize(objFolderParams);
        //Object_DevServer_ProductManagement_Folder.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_Folder];

        Object_DevServer_ProductManagement_Module.Initialize(objModuleParams);
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_Module];

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation"];
        // let arrResourceParams = ["/c.Intranet/LoginAndMaster/Navigation/SubNavigation"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name LoadSelectedModuleUseCases
    * @param {object} objContext Context Object
    * @summary Makes Multi Api call to get Folder And Modules for selected ApplicationType
    */
    LoadDataForSelectedApplicationType(objContext, strActiveMainNavigationId) {
        let arrDataRequest = [];
        let objFolderParams = {
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
            //"IsAvoidTimeStamp": true
        };

        let objModuleParams = {
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
            ],
            //"IsAvoidTimeStamp": true
        };

        if (!DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"] || !DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"]) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": false } });
        }        

        //Multi Call
        Object_DevServer_ProductManagement_Folder.Initialize(objFolderParams);
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_Folder];

        Object_DevServer_ProductManagement_Module.Initialize(objModuleParams);
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_Module];

        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        });
    }

    /**
     * @name GetTreeData
     * @param {any} objContext
     * @summary Returns the tree data(Subnavigation), based on the ActiveMainNavigationId
     */
    GetTreeData(objContext) {       
        let strActiveMainNavigationId = objContext.props.IsForServerRenderHtml && objContext.props.ApplicationStateData ? objContext.props.ApplicationStateData.ActiveMainNavigationId : ApplicationState.GetProperty("ActiveMainNavigationId");
        let strActiveSubNavigationId = objContext.props.IsForServerRenderHtml ? ApplicationState.GetProperty("ActiveSubNavigationId") : objContext.props.ActiveSubNavigationId;        
        let objActiveMainNavigationNode = objContext.props.NavigationData.find(x => x.NavigationId == strActiveMainNavigationId);
        if (objActiveMainNavigationNode && objActiveMainNavigationNode["NavigationType"]) {
            //-------To get the Folders and modules for the selected MainNavigation(ApplicationType)
            let arrFolderData = [], arrModuleData = [];
            DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"]?.map(obj => {
                if (obj["uApplicationTypeId"] == strActiveMainNavigationId && obj.cIsDeleted == "N") {
                    arrFolderData = [...arrFolderData, { ...obj, ["IdField"]: obj.uFolderId, ["ParentIdField"]: obj.uParentFolderId, ["TextField"]: obj.vFolderName, ["ImageType"]: "Folder" }]
                }
            });
            DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"]?.map(obj => {
                if (obj["uApplicationTypeId"] == strActiveMainNavigationId && obj.cIsDeleted == "N") {
                    arrModuleData = [...arrModuleData, { ...obj, ["IdField"]: obj.uModuleId, ["ParentIdField"]: obj.uFolderId, ["TextField"]: obj.vModuleName, ["ImageType"]: "Module" }]
                }
            });
            //To get the root folders
            let arrRootFolders = arrFolderData.filter(obj => obj["uParentFolderId"] == "00000000-0000-0000-0000-000000000000");
            //To sort the root folders
            arrRootFolders = arrRootFolders.sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
            //To get the child folders
            let arrChildFolders = arrFolderData.filter(obj => obj["uParentFolderId"] != "00000000-0000-0000-0000-000000000000");
            //To sort the child folders
            arrChildFolders = arrChildFolders.sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
            //To combine the folder and modules
            let NodeData = [...arrRootFolders, ...arrChildFolders, ...arrModuleData]
            let objNodeFields = {
                IdField: 'IdField', ParentIdField: 'ParentIdField', TextField: 'TextField', RootNodeId: '00000000-0000-0000-0000-000000000000'
            };
            return {
                Data: { NodeData, SelectedNodeId: strActiveSubNavigationId },
                Meta: { ...objNodeFields, "ShowExpandCollapseIcon": true, AllowDragDrop: true }
            };
        }
        else {
            var intNavId = objContext.props.ActiveMainNavigationId;
            let blnIsDevMode = QueryString.GetQueryStringValue('IsDevMode') === 'Y' || (objContext.props.IsForServerRenderHtml && objContext.props.QueryStringObject["IsDevMode"] == "Y");
            let arrData, objNodeFields, strRootNodeId;
            strRootNodeId = objActiveMainNavigationNode["NavigationId"];
            arrData = objContext.props.NavigationData.filter(objNavigationData => objNavigationData.NavigationId != objContext.props.ActiveMainNavigationId && (blnIsDevMode || (objNavigationData["ProjectIdentifier"] ? objNavigationData["ProjectIdentifier"].split(',').indexOf(JConfiguration.ProjectIdentifier) > -1 : true))); //to display the SubNavigation items in tree based on ProjectIdentifier.
            objNodeFields = { IdField: 'NavigationId', ParentIdField: 'ParentNavigationId', TextField: 'DisplayName', RootNodeId: strRootNodeId };
            return {
                Data: {
                    NodeData: arrData,
                    SelectedNodeId: intNavId < 0 ? "0" : strActiveSubNavigationId
                },
                Meta: { ...objNodeFields, "ShowExpandCollapseIcon": true }//, AllowDragDrop: true
            };
        }
    }

    /**
    * @name GetTreeCallBacks
    * @param {any} objContext
    * @summary Returns TreeCallBacks
    */
    GetTreeCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeShowNode: (objItem) => {
                let strActiveMainNavigationId = ApplicationState.GetProperty("ActiveMainNavigationId");
                if (!strActiveMainNavigationId && objContext.props.IsForServerRenderHtml && objContext.props.NavigationData) {
                    let arrNavigationData = objContext.props.NavigationData.filter(obj => !obj["ProjectIdentifier"] || (obj["ProjectIdentifier"] && obj["ProjectIdentifier"].split(",").includes(JConfiguration.ProjectIdentifier)));
                    strActiveMainNavigationId = arrNavigationData[0]["NavigationId"];
                }
                let objActiveMainNavigationNode = objContext.props.NavigationData.find(x => x.NavigationId == strActiveMainNavigationId);
                if (objActiveMainNavigationNode["NavigationType"]) {
                    return objItem.cIsDeleted == "N" && objItem["uApplicationTypeId"] == strActiveMainNavigationId ? objItem : null
                }
                else {
                    return { ...objItem, "DisplayName": Localization.TextFormatter(objContext.props.TextResource, objItem["TextResourceKey"]) }
                }
            }
        }
        return objCallBacks;
    }

    /**
    * @name GetTreeEvents
    * @param {any} objContext
    * @summary Returns TreeEvents
    */
    GetTreeEvents(objContext) {
        let objEvents = {
            OnSelectNode: (objSelectedNode) => { objContext.SubNavigation_ModuleProcessor.OnSelectNode(objContext, objSelectedNode) },
            OnContextMenuClick: (objContextMenuDimensions, objNode) => { objContext.SubNavigation_ModuleProcessor.OnContextMenuClick(objContext, objContextMenuDimensions, objNode) },
            OnDragDrop: (strDraggedFolderId, strDroppedFolderId) => { objContext.SubNavigation_ModuleProcessor.OnDragDrop(strDraggedFolderId, strDroppedFolderId, objContext) },
            OnExpandOrCollapse: (arrNewNodes, objNodeToExpandOrCollapse, blnIsNodeExpanded) => { !blnIsNodeExpanded ? objContext.SubNavigation_ModuleProcessor.LoadPrefetchSubNavigationLinks(objNodeToExpandOrCollapse, objContext) : null }
        }
        return objEvents;
    }

    /**
     * @name OnSelectNode
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary Decides either to call the OnSubNavigationClick or set the folder
     */
    OnSelectNode(objContext, objSelectedNode) {
        //To Prefetch the SubNavigations of Selected Node
        objContext.SubNavigation_ModuleProcessor.LoadPrefetchSubNavigationLinks(objSelectedNode, objContext);
        let strActiveSubNavigationId = ApplicationState.GetProperty('ActiveSubNavigationId');
        let objActiveMainNavigationNode = objContext.props.NavigationData.find(x => x.NavigationId == ApplicationState.GetProperty("ActiveMainNavigationId"));
        if (objActiveMainNavigationNode && objActiveMainNavigationNode["NavigationType"]) {
            if (!strActiveSubNavigationId || (strActiveSubNavigationId != objSelectedNode.uModuleId && strActiveSubNavigationId != objSelectedNode.uFolderId)) {
                ApplicationState.SetProperty("blnShowAnimation", true);
            }
            //Module to be loaded by router
            let arrNavigationTypes = objActiveMainNavigationNode["NavigationType"].split(',');
            let strPushModule = (objSelectedNode.vFolderName ? arrNavigationTypes[0] : arrNavigationTypes[1]);

            //Check and push pathname to history for routing
            let strPathName = window.location.pathname;
            let strQueryString = QueryString.SetQueryStringValue(window.location.search, "SubNavigationId", (objSelectedNode.uModuleId || objSelectedNode.uFolderId));
            strQueryString = strPushModule != "Document" && QueryString.GetQueryStringValue("DocumentId") ? QueryString.RemoveQueryStringValue(window.location.search, "DocumentId") : strQueryString;//HARDCODE_CHECK
            if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) != strPushModule) {
                //If the new component to Route is not loaded already
                strPathName = strPathName.split('/').indexOf(strPushModule) > -1 ? strPathName.substring(0, strPathName.lastIndexOf(strPushModule) - 1) : strPathName
                let strPushUrl = strPathName + objContext.props.JConfiguration.VirtualDirName + strPushModule;
                let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
                ApplicationState.SetProperty('RouterPath', strRouterPath);

                strPushUrl += strQueryString;
                objContext.props.history.push({ pathname: strPushUrl.replace("//", "/") });
            }
            else if (!strActiveSubNavigationId) {
                //For routing to required component on Page Refresh
                let strPushUrl = window.location.pathname + strQueryString;
                let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
                ApplicationState.SetProperty('RouterPath', strRouterPath);
                objContext.props.history.push({ pathname: strPushUrl.replace("//", "/") });
            }
            else {
                //Only setting the SubNavigationId in query string and no Routing in case of similar component
                let strPushUrl = window.location.pathname + strQueryString;
                window.history.pushState({ path: strPushUrl }, '', strPushUrl);
            }
            ApplicationState.SetProperty('ActiveSubNavigationId', objSelectedNode.uModuleId || objSelectedNode.uFolderId);
            //ApplicationState.SetProperty('SelectedRows', null);
            if (objSelectedNode.uModuleId)
                ApplicationState.SetProperty('ActiveModuleName', objSelectedNode.vModuleName);
            let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
            objOnlineHelpObject = { ...objOnlineHelpObject, "HelpKey": strPushModule };
            ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
        }
        else {
            this.OnOtherSubNavigationClick(objContext, objSelectedNode);
        }
        ApplicationState.SetProperty("BreadCrumbNavigation", null);
    }

    /**
     * @name OnContextMenuClick
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary Decides either to call the OnSubNavigationClick or set the folder
     */
    OnContextMenuClick(objContext, objContextMenuDimensions, objSelectedNode) {
        let objActiveMainNavigationNode = objContext.props.NavigationData.find(x => x.NavigationId == ApplicationState.GetProperty("ActiveMainNavigationId"));
        if (objActiveMainNavigationNode["NavigationType"]) {
            let objData = {
                objContext,
                AddFolder: () => this.OpenAddEditFolderPopup(objContext, objSelectedNode),
                AddModule: () => this.OpenAddEditModulePopup(objContext, objSelectedNode),
                AddDocument: () => this.OpenAddEditDocumentPopup(objContext, objSelectedNode),
                Edit: () => objSelectedNode ? (objSelectedNode.vFolderName ? this.OpenAddEditFolderPopup(objContext, objSelectedNode, true) : this.OpenAddEditModulePopup(objContext, objSelectedNode, true)) : null,
                Delete: () => objSelectedNode ? this.OpenDeletePopup(objContext, objSelectedNode) : null,                
                CopyModule: () => {
                    ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": { "Type": "Copy", "Data": [objSelectedNode ?? {}] } })
                },
                CopyDocument: () => { },
                CutModule: () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": { "Type": "Cut", "Data": [objSelectedNode ?? {}] } }) },
                CutDocument: () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Document": { "Type": "Cut", "Data": [objSelectedNode ?? {} ]} }) },
                PasteModule: () => { objSelectedNode ? this.PasteModule(objSelectedNode) : null },
                PasteDocument: () => { objSelectedNode ? this.PasteDocument(objSelectedNode) : null },
                objSelectedNode
            };
            let objContextMenu = {
                Data: SubNavigation_ContextMenuData.GetContextMenuData(objData),
                objEvent: objContextMenuDimensions
            };
            let fnShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
            fnShowContextMenu(objContextMenu);
            //ApplicationState.SetProperty("ContextMenuDetails", objContextMenu);
        }
    }
    
    /**
     * @name OnDragDrop
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary Decides either to call the DragDropEvent of Module or Document
     */
    OnDragDrop(strDraggedFolderId, strDroppedFolderId, objContext) {
        if (strDraggedFolderId && strDroppedFolderId) {
            if (objContext.props.location.pathname.split('/')[1] === "Documents") {
                let fnDocumentDragDrop = ApplicationState.GetProperty("DragDropDocument");
                if (fnDocumentDragDrop)
                    fnDocumentDragDrop(strDraggedFolderId, strDroppedFolderId);
            }
            else {
                let fnModuleDragDrop = ApplicationState.GetProperty("DragDropModule");
                if (fnModuleDragDrop)
                    fnModuleDragDrop(strDraggedFolderId, strDroppedFolderId);
            }
        }
    }

    /**
    * @name OpenDeletePopup
    * @param {object} objContext passes Context object
    * @summary Call Confirmation popup for Deleting subject
    * @return null
    */
    OpenDeletePopup(objContext, objSelectedNode) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", objContext.props);

        let objVaribales = {
            FolderOrModule: objSelectedNode["vFolderName"] ? Localization.TextFormatter(objTextResource, 'Folder') : Localization.TextFormatter(objTextResource, 'Module'),
            Name: objSelectedNode["vFolderName"] ? objSelectedNode["vFolderName"] : objSelectedNode["vModuleName"]
        };
        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                ShowHeader: true,
                ShowCloseIcon: true,
            },
            Resource: {
                Text: objTextResource,
                TextResourcesKey: "DeleteConfirmationPopup",
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                Variables: objVaribales
            },
            Events: {
                ConfirmEvent: (strPopupId) => this.DeleteFolderOrModule(objContext, objSelectedNode, strPopupId)
            },
            CallBacks: {}
        });
    }

    /**
     * @name DeleteFolderOrModule
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close popup on success
    */
    DeleteFolderOrModule(objContext, objSelectedNode, strPopupId) {
        let objSearchQuery = {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                },
                {
                    "match": {
                        "uApplicationTypeId": ApplicationState.GetProperty("ActiveMainNavigationId")
                    }
                }
            ]
        };
        let objParams = {
            "SearchQuery": objSearchQuery,
            "vDeleteData": [{ ...objSelectedNode, cIsDeleted: "Y" }],
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        let objEntity = objSelectedNode.vFolderName ? Object_DevServer_ProductManagement_Folder : Object_DevServer_ProductManagement_Module;
        objEntity.DeleteData(objParams, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                this.SelectPreviousNode(objContext, objSelectedNode);
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
    * @name SelectPreviousNode
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes Subject and close popup on success
    */
    SelectPreviousNode(objContext, objSelectedNode) {
        let intParentId = objSelectedNode.vFolderName ? objSelectedNode.uParentFolderId : objSelectedNode.uFolderId;
        if (objSelectedNode.vFolderName) {
            intParentId = objSelectedNode.uParentFolderId;
            let arrFolderData = [];
            DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"].map(obj => {
                if (obj["uApplicationTypeId"] == ApplicationState.GetProperty("ActiveMainNavigationId") && obj.cIsDeleted == "N" && obj["uParentFolderId"] == intParentId && obj.uFolderId != objSelectedNode.uFolderId) {
                    arrFolderData = [...arrFolderData, { ...obj, ["IdField"]: obj.uFolderId, ["ParentIdField"]: obj.uParentFolderId, ["TextField"]: obj.vFolderName, ["ImageType"]: "Folder" }]
                }
            });
            //sorting 
            //arrFolderData = arrFolderData.sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
            let objNode, arrSortedFolderData = [];
            arrSortedFolderData = arrFolderData.filter(obj => obj["iOrderId"] < objSelectedNode["iOrderId"]);
            if (arrSortedFolderData.length == 0) {
                arrSortedFolderData = arrFolderData.filter(obj => obj["iOrderId"] > objSelectedNode["iOrderId"]);
                objNode = arrSortedFolderData[0] ? arrSortedFolderData[0] : null;
            }
            else {
                objNode = arrSortedFolderData[arrSortedFolderData.length - 1];
            }

            //if no module is there , takes the parent folder
            if (!objNode) {
                objNode = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"].find(obj => obj["uApplicationTypeId"] == ApplicationState.GetProperty("ActiveMainNavigationId") && obj["uFolderId"] == objSelectedNode["uParentFolderId"]);
                objNode = {
                    ...objNode,
                    ["IdField"]: objNode["uFolderId"],
                    ["ParentIdField"]: objNode["uParentFolderId"],
                    ["TextField"]: objNode.vFolderName,
                    ["ImageType"]: "Folder"
                };
            }
            //selects the node
            if (objNode) {
                let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                if (fnSelectSubNavigation) {
                    fnSelectSubNavigation(objNode);
                }
            }
        }
        else {
            intParentId = objSelectedNode.uFolderId;
            let arrModuleData = [];

            DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"].map(obj => {
                if (obj["uApplicationTypeId"] == ApplicationState.GetProperty("ActiveMainNavigationId") && obj.cIsDeleted == "N" && obj.uFolderId == intParentId && obj.uModuleId != objSelectedNode.uModuleId) {
                    arrModuleData = [...arrModuleData, { ...obj, ["IdField"]: obj.uModuleId, ["ParentIdField"]: obj.uFolderId, ["TextField"]: obj.vModuleName, ["ImageType"]: "Module" }]
                }
            });
            //sorting 
            //arrFolderData = arrFolderData.sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
            let objNode;
            let arrSortModuleData = arrModuleData.filter(obj => obj["iOrderId"] < objSelectedNode["iOrderId"]);
            if (arrSortModuleData.length == 0) {
                arrSortModuleData = arrModuleData.filter(obj => obj["iOrderId"] > objSelectedNode["iOrderId"]);
                objNode = arrSortModuleData[0] ? arrSortModuleData[0] : null;
            }
            else {
                objNode = arrSortModuleData[arrSortModuleData.length - 1];
            }
            //if no module is there , takes the parent folder
            if (!objNode) {
                objNode = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"].find(obj => obj["uApplicationTypeId"] == ApplicationState.GetProperty("ActiveMainNavigationId") && obj["uFolderId"] == objSelectedNode["uFolderId"]);
                objNode = {
                    ...objNode,
                    ["IdField"]: objNode["uFolderId"],
                    ["ParentIdField"]: objNode["uParentFolderId"],
                    ["TextField"]: objNode.vFolderName,
                    ["ImageType"]: "Folder"
                };
            }
            //selects the node
            if (objNode) {
                let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                if (fnSelectSubNavigation) {
                    fnSelectSubNavigation(objNode);
                }
            }
        }
    }

    /**
     * @name OnMainDivRightClick
     * @param {any} objContext
     * @param {any} e
     */
    OnMainDivRightClick(objContext, e) {
        e.preventDefault();
        let objDimensions = {
            clientX: e.clientX,
            clientY: e.clientY
        };
        this.OnContextMenuClick(objContext, objDimensions);
    }

    /**
  * @name OpenAddEditTaskFolderPopup
  * @param {object} objContext passes Context object
  * @param {object} objRowData selected row data
  * @param {boolean} blnIsEdit is either edit or Add    * 
  * @summary Call tabbed popup for Add/Edit of Task folder
  * @return null
  */
    OpenAddEditFolderPopup(objContext, objSelectedNode, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", objContext.props);
        Popup.ShowTabbedPopup({
            Data: {
                SelectedNode: objSelectedNode,
                IsEdit: blnIsEdit,
                DropDownData: {
                    SkinData: DataRef(objContext.props.Object_Cockpit_Skin)["Data"]
                }

            },
            Meta: {
                PopupName: "AddEditFolder",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                JConfiguration: objContext.props.JConfiguration
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: objContext.props
        });
    }

    /**
     * @name OpenAddEditModulePopup
     * @param {object} objContext passes Context object
     * @param {object} objRowData selected row data
     * @param {boolean} blnIsEdit is either Edit or Add
     * @summary Call tabbed popup for Add/Edit of ProductManagementModule
     * @return null
     */
    OpenAddEditModulePopup(objContext, objSelectedNode, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", objContext.props);
        Popup.ShowTabbedPopup({
            Data: {
                SelectedNode: objSelectedNode,
                IsEdit: blnIsEdit
            },
            Meta: {
                PopupName: "AddEditModule",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                JConfiguration: objContext.props.JConfiguration
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: objContext.props
        });
    }

    /**
     * @name OpenAddEditDocumentPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call tabbed popup for Add/Edit of Document
     * @return null
     */
    OpenAddEditDocumentPopup(objContext, objSelectedNode) {

        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", objContext.props);

        var objData = {
            //IsEdit: blnIsEdit,
            //Object_DevServer_ProductManagement_ProductDocument: DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument),
            DocumentFolderId: objSelectedNode["uFolderId"],
            IsForModule: false
        }

        Popup.ShowTabbedPopup({
            Data: objData,
            Meta: {
                PopupName: "AddEditDocument",
                Height: 663,
                Width: 850,
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                JConfiguration: objContext.props.JConfiguration
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: objContext.props
        });
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
        let arrAllNavigations = objContext.props.NavigationData;
        var strFullQueryString = window.location.search;
        ApplicationState.SetProperty("blnShowAnimation", true);
        var arrSubNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
        Performance.Reset();
        if (arrSubNavigation.length == 0) {
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + strFullQueryString;
            strPushUrl = QueryString.RemoveQueryStringValue(strPushUrl, "SubNavigatioId");
            objContext.props.history.push({
                pathname: strPushUrl,
                state: objNavigation
            });
            let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
            ApplicationState.SetProperty('RouterPath', strRouterPath);
        }
        else {
            let strRouterPath = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations);
            ApplicationState.SetProperty('RouterPath', strRouterPath);
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + "/NavigationCommonPage" + QueryString.SetQueryStringValue(strFullQueryString, "SubNavigationId", objNavigation.NavigationId);
            objContext.props.history.push({
                pathname: strPushUrl,
                state: objNavigation
            });
        }
        ApplicationState.SetProperty("BreadCrumbNavigation", null);
    }


    /**
     * @name OnSubNavigationClick
     * @param {any} objContext
     * @param {any} objNavigation
     * @summary Does the Routing based on the SubNavigation...
     * When the SubNavigation parent has children, Calls the the NavigationCommonPage...
     * Otherwise does the normal routing...
     */
    OnOtherSubNavigationClick(objContext, objNavigation) {
        let arrAllNavigations = objContext.props.NavigationData;
        var strFullQueryString = window.location.search;
        ApplicationState.SetProperty("blnShowAnimation", true);
        var arrSubNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
        Performance.Reset();
        if (arrSubNavigation.length == 0) {
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + strFullQueryString;
            strPushUrl = QueryString.SetQueryStringValue(strPushUrl, "SubNavigationId", objNavigation.NavigationId);
            objContext.props.history.push({
                pathname: strPushUrl,
                state: objNavigation
            });
            let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
            ApplicationState.SetProperty('RouterPath', strRouterPath);
        }
        else {
            let strRouterPath = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations);
            ApplicationState.SetProperty('RouterPath', strRouterPath);
            var strPushUrl = objContext.props.JConfiguration.VirtualDirName + this.FormUrl(objNavigation, arrAllNavigations) + "/NavigationCommonPage" + QueryString.SetQueryStringValue(strFullQueryString, "SubNavigationId", objNavigation.NavigationId);
            objContext.props.history.push({
                pathname: strPushUrl,
                state: objNavigation
            });
        }
        ApplicationState.SetProperty('BreadCrumbNavigationId', objNavigation.NavigationId);
        ApplicationState.SetProperty("BreadCrumbNavigation", null);
        let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
        objOnlineHelpObject = { ...objOnlineHelpObject, "HelpKey": objNavigation.NavigationName };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
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
     * @name PasteModule
     * @param {any} objSelectedNode
     * @summary Paste Module in folder...
     */
    PasteModule(objSelectedNode) {
        if (objSelectedNode["uModuleId"]) {
            let fnPasteUseCase = ApplicationState.GetProperty("PasteUseCase") && ApplicationState.GetProperty("PasteUseCase") ? ApplicationState.GetProperty("PasteUseCase") : null;
            if (fnPasteUseCase) {
                fnPasteUseCase(objSelectedNode["uModuleId"]);
            }
        }
        else {
            let fnPasteModule = ApplicationState.GetProperty("PasteModule") && ApplicationState.GetProperty("PasteModule") ? ApplicationState.GetProperty("PasteModule") : null;
            if (fnPasteModule) {
                fnPasteModule(objSelectedNode["uFolderId"]);
            }
        }
        
    }

    /**
     * @name PasteDocument
     * @param {any} objSelectedNode
     * @summary Paste document in folder...
     */
    PasteDocument(objSelectedNode) {
        let fnPasteDocument = ApplicationState.GetProperty("PasteDocument") && ApplicationState.GetProperty("PasteDocument") ? ApplicationState.GetProperty("PasteDocument") : null;
        if (fnPasteDocument) {
            fnPasteDocument(objSelectedNode["uFolderId"]);
        }
    }

    /**
     * @name LoadNavigationOnRefresh
     * @param {any} objContext
     * @summary LoadNavigationOnRefresh
     */
    LoadNavigationOnRefresh(objContext) {
        if (objContext.state.isLoadComplete && ApplicationState.GetProperty("ActiveMainNavigationId")) {
            var browserUrl = window.location.pathname;
            var arrBrowserUrl = browserUrl.split("/");
            let strSubNavigationName = arrBrowserUrl[arrBrowserUrl.length - 1];
            if (strSubNavigationName.toLowerCase().includes("navigationcommonpage", 0)) {
                strSubNavigationName = arrBrowserUrl[arrBrowserUrl.length - 2];
            }
            let objSubNavToSelect = null;
            if (arrBrowserUrl.length > 2 && !QueryString.GetQueryStringValue("SubNavigationId").includes('-')) { //&& (Number.isInteger(QueryString.GetQueryStringValue("SubNavigationId")) || !QueryString.GetQueryStringValue("SubNavigationId"))                
                objSubNavToSelect = objContext.props.NavigationData.filter(x => x.NavigationName == strSubNavigationName)[0];
            }
            else if (!QueryString.GetQueryStringValue("SubNavigationId")) {
                let blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y";
                if (blnIsDevMode || JConfiguration.ProjectIdentifier === "STAGING") {
                    let arrFolderData = [];
                    DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.map(obj => {
                        if (obj["uApplicationTypeId"] == ApplicationState.GetProperty("ActiveMainNavigationId") && obj.cIsDeleted == "N" && obj["uParentFolderId"] == '00000000-0000-0000-0000-000000000000') {
                            arrFolderData = [...arrFolderData, { ...obj, ["IdField"]: obj.uFolderId, ["ParentIdField"]: obj.uParentFolderId, ["TextField"]: obj.vFolderName, ["ImageType"]: "Folder" }]
                        }
                    });
                    //sorting 
                    arrFolderData = arrFolderData.sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
                    //takes the first node
                    objSubNavToSelect = arrFolderData[0] ? arrFolderData[0] : null;
                }
                else {
                    objSubNavToSelect = objContext.props.NavigationData.filter(x => x.ParentNavigationId == ApplicationState.GetProperty("ActiveMainNavigationId"))[0];
                }
            }
            else {
                //When we login for first and we don't have any second level, we take ActiveSubNavigationId from Query string or set to null
                let strSubNavigationId = QueryString.GetQueryStringValue("SubNavigationId");
                let objTreeData = objContext.SubNavigation_ModuleProcessor.GetTreeData(objContext);
                objSubNavToSelect = objTreeData["Data"]["NodeData"].find(objFolder => objFolder["IdField"] == strSubNavigationId);
            }
            //selects the node
            if (objSubNavToSelect) {
                let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                if (fnSelectSubNavigation) {
                    fnSelectSubNavigation(objSubNavToSelect);
                }
                let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") && ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] : [];
                //ApplicationState.SetProperty('ExpandedNodes', { 'Tree_Master': [...arrExpandedNodes, objSubNavToSelect] });
                if (arrExpandedNodes.length == 0) {
                    let fnExpandTreeTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] : null;
                    if (fnExpandTreeTreeNodes) {
                        fnExpandTreeTreeNodes([objSubNavToSelect]);
                        ApplicationState.SetProperty('ExpandedNodes', { 'Tree_Master': [...arrExpandedNodes, objSubNavToSelect] });
                    }
                }
            }
        }
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

    /**
     * @name LoadPrefetchSubNavigationLinks
     * @param {object} objNode Selected Node
     * @param {boolean} blnIsNodeExpanded IsNodeExpanded
     * @param {object} objContext objContext
     * @summary Forms Links to be Prefetched from SubNaviagtion events - Select/Exapand Node
     */
    LoadPrefetchSubNavigationLinks(objNode, objContext) {
        if (JConfiguration.IsPrefetchEnabled) {
            let objActiveMainNavigationNode = objContext.props.NavigationData.find(x => x.NavigationId == ApplicationState.GetProperty("ActiveMainNavigationId"));
            if (objActiveMainNavigationNode["NavigationType"]) {
                let arrPrefetchFilterData = [];
                let strModuleName = "";//Module Name to Prefetch
                let arrNavigationTypes = objActiveMainNavigationNode["NavigationType"].split(',');
                if (arrNavigationTypes.includes("UseCase") && !objNode["uModuleId"] ) {
                    strModuleName = "UseCase";
                    arrPrefetchFilterData = DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.filter(objModule => objModule["uFolderId"] == objNode["uFolderId"])                    
                }                
                else if (arrNavigationTypes.includes("Document")) {
                    strModuleName = "Document";
                    arrPrefetchFilterData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.filter(objFolder => objFolder["uParentFolderId"] == objNode["uFolderId"])                   
                }
                else if (arrNavigationTypes.includes("Example")) {
                    strModuleName = "Example";                    
                }
                if (arrPrefetchFilterData?.length > 0)
                    GetObjectListForModule(strModuleName, objContext, true, arrPrefetchFilterData);
                LoadPrefetchEditorChunks(true);//Prefetch of Editor
            }
            else {
                let arrChildNavigations = objContext.props.NavigationData.filter(objNav => objNav["ParentNavigationId"] == objNode["NavigationId"]);
                if (arrChildNavigations.length > 0) {
                    //Manually forming the NavigationArray like Data from FrameworkNavigation object
                    let arrPrefetchNavigations = [{ "ApplicationType": objContext.props.JConfiguration.ApplicationTypeId, [objContext.props.JConfiguration.ApplicationName]: arrChildNavigations }];
                    LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext);
                }
            }            
        }
    }
}

export default SubNavigation_ModuleProcessor;