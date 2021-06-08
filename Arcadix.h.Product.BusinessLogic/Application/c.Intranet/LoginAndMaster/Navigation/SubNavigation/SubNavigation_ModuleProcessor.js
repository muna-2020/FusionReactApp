//Base classes.
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

//Core Imports.
import { LoadPrefetchLinksForNavigation, GetObjectListForModule, RenewPrefetchToken} from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';
import { LoadPrefetchEditorChunks } from '@root/Application/e.Editor/PC/EditorPrefetch';

//Objects used...
import Object_Intranet_Task_TaskFolder from "@shared/Object/c.Intranet/2_Task/TaskFolder/TaskFolder"
import Object_Intranet_Test_TestFolder from '@shared/Object/c.Intranet/3_Test/TestFolder/TestFolder';

class SubNavigation_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Task_TaskFolder",
            "Object_Intranet_Test_TestFolder",
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

        if (props.JConfiguration.ApplicationTypeId == 4) {
            var objTaskParams = {
                "SortKeys": [
                    {
                        "vPageFolderName": {
                            "order": "asc"
                        }
                    }
                ]
            };
            var objTestParams = {
                "SortKeys": [
                    {
                        "vTestFolderName": {
                            "order": "asc"
                        }
                    }
                ]
            };

            Object_Intranet_Task_TaskFolder.Initialize(objTaskParams);
            arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskFolder];

            Object_Intranet_Test_TestFolder.Initialize(objTestParams);
            arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestFolder];
        }

        return arrDataRequest;
    }

    /**
     * @name GetTreeData
     * @param {any} objContext
     * @summary Returns the tree data(Subnavigation), based on the ActiveMainNavigationId
     */
    GetTreeData(objContext) {
        var intNavId = objContext.props.IsForServerRenderHtml && objContext.props.ApplicationStateData ? objContext.props.ApplicationStateData.ActiveMainNavigationId : objContext.props.ActiveMainNavigationId;
        let arrData, objNodeFields, objRootNode;
        if (intNavId == -1) {
            arrData = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"];
            objNodeFields = { IdField: 'iPageFolderId', ParentIdField: 'iPageParentFolderId', TextField: 'vPageFolderName', RootNodeId: -1 };
            objRootNode = { iPageFolderId: "0", iPageParentFolderId: "-1", vPageFolderName: "Tasks", expanded: true }
        }
        else if (intNavId == -2) {
            arrData = DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"];
            objNodeFields = { IdField: 'iTestFolderId', ParentIdField: 'iTestParentFolderId', TextField: 'vTestFolderName', RootNodeId: -1 };
            objRootNode = { iTestFolderId: "0", iTestParentFolderId: "-1", vTestFolderName: "Tests", expanded: true }
        }
        else {
            arrData = objContext.props.NavigationData.filter(objNavigationData => objNavigationData.NavigationId !== intNavId);
            objNodeFields = { IdField: 'NavigationId', ParentIdField: 'ParentNavigationId', TextField: 'DisplayName', RootNodeId: intNavId };
        }
        if (intNavId == -1 || intNavId == -2) {
            arrData = arrData.filter(objItem => {
                return objItem.cIsDeleted == "N"
            });
            arrData = [objRootNode, ...arrData];
        }
        return {
            Data: {
                NodeData: arrData,
                SelectedNodeId: intNavId < 0 ? "0" : ApplicationState.GetProperty("ActiveSubNavigationId")
            },
            Meta: { ...objNodeFields, "ShowExpandCollapseIcon": true, AllowDragDrop: true }            
        };
    }


    /**
     * @name OnSelectNode
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary Decides either to call the OnSubNavigationClick or set the folder(in case of Task or Test)
     */
    OnSelectNode(objContext, objSelectedNode) {
        //To Prefetch the SubNavigations of Selected Node
        objContext.SubNavigation_ModuleProcessor.LoadPrefetchSubNavigationLinks(objSelectedNode, objContext)
        if (objSelectedNode.NavigationId) {
            this.OnSubNavigationClick(objContext, objSelectedNode);
        }
        else {
            let objSelctedRows = ApplicationState.GetProperty('SelectedRows') ? ApplicationState.GetProperty('SelectedRows') : {};
            if (objSelectedNode.iPageFolderId) {
                ApplicationState.SetProperty('SelectedRows', { ...objSelctedRows, ["TaskGrid"]: null });
                let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["TaskGrid"] : null;
                if (fnResetGridSelection) {
                    fnResetGridSelection();
                }
            }
            else {
                ApplicationState.SetProperty('SelectedRows', { ...objSelctedRows, ["TestGrid"]: null });
            }
            ApplicationState.SetProperty('FolderId', objSelectedNode.iPageFolderId || objSelectedNode.iTestFolderId);
        }
    }

    /**
     * @name OnContextMenuClick
     * @param {any} objContext
     * @param {any} objSelectedNode
     * @summary Decides either to call the OnSubNavigationClick or set the folder(in case of Task or Test)
     */
    OnContextMenuClick(objContext, objContextMenuDimensions, objSelectedNode) {
        let objContextMenu = {
            Data: ApplicationState.GetProperty("GetTreeContextMenuData")(objSelectedNode),
            objEvent: objContextMenuDimensions
        };
        let fnShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
        fnShowContextMenu(objContextMenu);

        //ApplicationState.SetProperty("ContextMenuDetails", objContextMenu);
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
        var strFullQueryString = window.location.search;
        Performance.Reset();
        var strPushUrl = "";
        var arrSubNavigation = objContext.props.NavigationData.filter(x => x.ParentNavigationId == objNavigation.NavigationId);
        if (arrSubNavigation.length == 0) {
            strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.URL + strFullQueryString;
            strPushUrl = QueryString.RemoveQueryStringValue(strPushUrl, "SubNavigationId");
            if (ApplicationState.GetProperty("ActiveSubNavigationId") != objNavigation.NavigationId) {
                ApplicationState.SetProperty("blnShowAnimation", true);
            }
        }
        else {
            strPushUrl = objContext.props.JConfiguration.VirtualDirName + objNavigation.URL + QueryString.SetQueryStringValue(strFullQueryString, "SubNavigationId", objNavigation.NavigationId);
        }
        let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
        ApplicationState.SetProperty('RouterPath', strRouterPath);
        objContext.props.history.push({
            pathname: strPushUrl,
            state: objNavigation
        });
        let objOnlineHelpObject = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
        objOnlineHelpObject = { ...objOnlineHelpObject, "HelpKey": objNavigation.NavigationName };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
        ApplicationState.SetProperty('BreadCrumbNavigationId', objNavigation.NavigationId);
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

    GetTreeCallBacks(objContext) {
        return {
            OnBeforeShowNode: (objNode) => {
                if (!objNode["ProjectIdentifier"] || objNode["ProjectIdentifier"].split(',').indexOf(JConfiguration.ProjectIdentifier) > -1) {
                    return {
                        ...objNode,
                        "DisplayName": Localization.TextFormatter(objContext.props.TextResource, objNode["TextResourceKey"])
                    }
                }
            }
        }
    }

    GetTreeEvents(objContext) {
        return {
            OnSelectNode: (objSelectedNode) => { objContext.SubNavigation_ModuleProcessor.OnSelectNode(objContext, objSelectedNode) },
            OnContextMenuClick: (objContextMenuDimensions, objNode) => { objContext.SubNavigation_ModuleProcessor.OnContextMenuClick(objContext, objContextMenuDimensions, objNode) },
            OnDragDrop: (strDraggedFolderId, strDroppedFolderId) => {
                if (ApplicationState.GetProperty("OnDragDrop"))
                    ApplicationState.GetProperty("OnDragDrop")(strDraggedFolderId, strDroppedFolderId)
            },
            OnExpandOrCollapse: (arrNewNodes, objNodeToExpandOrCollapse, blnIsNodeExpanded) => { !blnIsNodeExpanded ? objContext.SubNavigation_ModuleProcessor.LoadPrefetchSubNavigationLinks(objNodeToExpandOrCollapse, objContext) : null }            
        }
    }

    LoadPrefetchLinks(objNode, blnIsNodeExpanded, objContext) {
        if(JConfiguration.IsPrefetchEnabled && !blnIsNodeExpanded){
            let arrChildNavigations = objContext.props.NavigationData.filter(objNav => objNav["ParentNavigationId"] == objNode["NavigationId"]);
            if (arrChildNavigations.length > 0) {
                //Manually forming the NavigationArray like Data from FrameworkNavigation object
                let arrPrefetchNavigations = [{ "ApplicationType": objContext.props.JConfiguration.ApplicationTypeId, [objContext.props.JConfiguration.ApplicationName]: arrChildNavigations }];
                LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext)
            }
        }
    }

    /**
     * @name LoadPrefetchSubNavigationLinks
     * @param {object} objNode Selected Node
     * @param {boolean} blnIsNodeExpanded IsNodeExpanded
     * @param {object} objContext objContext
     * @summary Forms Links to be PreFetched from SubNaviagtion events - Select/Expand Node
     */
    LoadPrefetchSubNavigationLinks(objNode, objContext) {
        if (JConfiguration.IsPrefetchEnabled) {
            if (ApplicationState.GetProperty("ActiveMainNavigationId") == -1) {
                let arrPrefetchFilterData = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"]?.filter(objFolder => objFolder["iPageParentFolderId"] == objNode["iPageFolderId"]);
                RenewPrefetchToken(() => {
                    if (arrPrefetchFilterData?.length > 0)
                        GetObjectListForModule("Task", objContext, false, arrPrefetchFilterData);
                    GetObjectListForModule("TaskPropertyDetails", objContext, true);//Prefetch of TaskPropertyDetails
                        LoadPrefetchEditorChunks();//Prefetch of Editor
                });
            }
            else if (ApplicationState.GetProperty("ActiveMainNavigationId") == -2) {
                let arrPrefetchFilterData = DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"]?.filter(objFolder => objFolder["iTestParentFolderId"] == objNode["iTestFolderId"])                               
                RenewPrefetchToken(() => {
                    if (arrPrefetchFilterData?.length > 0)
                        GetObjectListForModule("Test", objContext, false, arrPrefetchFilterData);
                    GetObjectListForModule("TestPropertyDetails", objContext, true);
                });
            }
            else {
                let arrChildNavigations = objContext.props.NavigationData.filter(objNav => objNav["ParentNavigationId"] == objNode["NavigationId"]);
                if (arrChildNavigations.length > 0) {
                    //Manually forming the NavigationArray like Data from FrameworkNavigation object
                    let arrPrefetchNavigations = [{ "ApplicationType": objContext.props.JConfiguration.ApplicationTypeId, [objContext.props.JConfiguration.ApplicationName]: arrChildNavigations }];
                    LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext)
                }
            }
        }
    }
}

export default SubNavigation_ModuleProcessor;