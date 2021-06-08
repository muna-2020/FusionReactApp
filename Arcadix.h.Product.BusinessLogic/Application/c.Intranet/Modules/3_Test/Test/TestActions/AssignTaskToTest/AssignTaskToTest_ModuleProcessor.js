
//Module related files
import Object_Intranet_Task_Task from '@shared/Object/c.Intranet/2_Task/Task/Task';
import Intranet_Test_AssignTaskToTest_Module from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest_Module';

/**
* @name AssignTaskToTest_ModuleProcessor
* @param NA
* @summary Class for Subject module display.
* @return NA
*/
class AssignTaskToTest_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        let objTestTaskParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.props.Data.TestData.uTestId
                        }
                    }
                ]
            },
            "iSubjectId": objContext.props.Data.TestData.iSubjectId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Intranet_Test_AssignTaskToTest_Module.GetAssignTaskToTestData(objTestTaskParams, (objData) => {
            let arrFolderData = objData["ValidTaskFolders"];
            arrFolderData = arrFolderData.sort((a, b) => a["vPageFolderName"].toUpperCase() - b["vPageFolderName"].toUpperCase() );
            //let arrValidTaskData = objData["ValidTasks"];
            //arrValidTaskData = arrValidTaskData.sort((a, b) => a["iFolderId"] - b["iFolderId"] );
            let objRootNode = { iPageId: "0", iFolderId: "-1", vPageName: "Tasks", Type: "FOLDER", expanded: true, ShowExpandCollapseIcon: true }
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "isLoadComplete": true,
                    "arrProductionReadyWorkFlowStatuses": objData["ProductionReadyWorkflowStatuses"] ?? [],
                    "arrTaskListData": objData["AssignedTasks"].map(obj => { return { ...obj, ["vAction"]: "Edit" } }),
                    "arrTreeData": [
                        objRootNode,
                        ...arrFolderData.map(obj => {
                            return { ...obj, ["iPageId"]: obj.iPageFolderId, ["iFolderId"]: obj.iPageParentFolderId, ["vPageName"]: obj.vPageFolderName, Type: "FOLDER", ShowExpandCollapseIcon: true };
                        }),
                        //...arrValidTaskData
                    ]
                }
            });
            let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes") : {};
            ApplicationState.SetProperty("ExpandedNodes", { ...arrExpandedNodes, "Tree_Sample1": [objRootNode] });
            let arrSelectedNodes = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
            ApplicationState.SetProperty("SelectedNode", { ...arrSelectedNodes, "Tree_Sample1": objRootNode });
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name LoadValidTasksForFolder
     * @param {object} objNode objNode
     * @param {object} objContext objContext
     * @param {any} fnHandleValidTaskData Callback function to handle returned ValidTaskData in state.
     * @summary Makes API call to fetch the valid Tasks for the folder.
     * @return {object}
     */
    LoadValidTasksForFolder(objNode, objContext, fnHandleValidTaskData) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objTaskParams = {
            ["SearchQuery"]: {
                "must": [
                    {
                        "match": {
                            "iFolderId": objNode["iPageFolderId"]
                        }
                    },                   
                    {
                        "match": {
                            "iSubjectIds": objContext.props.Data.TestData.iSubjectId 
                        }
                    }, 
                    {
                        "terms": {
                            "uWorkflowStatusIds": objContext.state.arrProductionReadyWorkFlowStatuses.map(objProductionReadyWorkFlowStatus => objProductionReadyWorkFlowStatus["uWorkflowStatusId"])
                        }
                    }                                      
                ]
            },
            ["OutputColumns"]: ["iPageId", "iFolderId", "vPageName", "iSubjectId", "dtModifiedOn"]
        };
        Object_Intranet_Task_Task.GetData(objTaskParams, (objReturnData) => {
            let arrValidTaskData = objReturnData[Object.keys(objReturnData)[0]]?.["Data"] ?? [];
            fnHandleValidTaskData(arrValidTaskData);
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }

    /**
     * @name GetTreeData
     * @param {any} objContext
     * @summary Forms the tree data
     * @return {object}
     */
    GetTreeData(objContext) {
        const objMeta = {
            IdField: 'iPageId', //Id field of the Node
            ParentIdField: 'iFolderId', //Parent Id field of the Node.
            TextField: 'vPageName', //The value with the this key from the node object will be diplayed.
            RootNodeId: -1, //The value of the Node to be taken as the parent folder.
            ShowExpandCollapseIcon: true,
            ForceShowExpandCollapseIcon: true
        };
        const objData = {
            NodeData: objContext.state.arrTreeData
        };
        let objEvents = {
            OnSelectNode: (objNode) => {
                objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTaskInTree: objNode } });
            },
            OnDoubleClick: (objNode) => { objNode["Type"] == "FOLDER" ? this.OnFolderDoubleClick(objContext, objNode) : this.AddToList(objContext, objNode, true) },
            OnExpandOrCollapse: (arrNodes, objNode) => this.LoadTasksOnFolderExpand(objNode, objContext)
        }
        let objCallBacks = {
            OnBeforeShowNode: (objNode) => {
                if (objNode.iFolderId) {
                    //alert('task')
                }
                return {
                    ...objNode,
                    "ImageType": objNode.Type == "FOLDER" ? "FOLDER" : "TASK"
                };
            }
        }
        let objResource = {
            SkinPath: JConfiguration.IntranetSkinPath,
            ImagePathDetails: { "FOLDER": "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png", "TASK": "/Images/Application/Modules/Test/AssignTaskToTest/Base.gif" }
        }
        return {
            Data: objData,
            Meta: objMeta,
            Events: objEvents,
            CallBacks: objCallBacks,
            Resource: objResource
        }
    }

    /**
     * @name LoadTasksOnFolderExpand
     * @param {object} objNode objNode
     * @param {object} objContext objContext
     * @summary Loads the Task for the expanded folder in tree.   
     */
    LoadTasksOnFolderExpand(objNode, objContext) {
        if (!objContext.state.arrTreeData.find((objTreeData) => objTreeData["iFolderId"] == objNode["iPageFolderId"] && objTreeData["Type"] != "FOLDER")) {
            this.LoadValidTasksForFolder(objNode, objContext, (arrValidTaskData) => {
                let arrTaskData = arrValidTaskData;
                objContext.state.arrTaskListData.forEach(objTaskList => {
                    arrTaskData = arrTaskData.filter(objTask => objTask["iPageId"] != objTaskList["iPageId"])
                });
                objContext.dispatch({ type: "SET_STATE", payload: { arrTreeData: [...objContext.state.arrTreeData, ...arrTaskData] } }); //, objSelectedTaskInTree: objTaskToRemove
            });
        }
    }

    /**
     * @name OnSelectListNode
     * @param {any} objtask
     * @param {any} intIndex
     * @param {any} objContext
     * @summary Sets the selected task in the state 
     */
    OnSelectListNode(objtask, intIndex, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTaskInList: objtask } });
        objContext.dispatch({ type: "SET_STATE", payload: { intIndex: intIndex } });
    }

    /**
     * @name AddToList
     * @param {object} objContext objContext
     * @param {objNode} objNode objNode
     * @param {boolean} blnIsDoubleClick blnIsDoubleClick
     * @summary Adds the selected task to the list 
     */
    AddToList(objContext, objNode = {}, blnIsDoubleClick = false) { 
        let objTaskToAdd = blnIsDoubleClick ? objNode : objContext.state.objSelectedTaskInTree;
        if (objTaskToAdd) {
            if (objTaskToAdd.Type == "FOLDER") {
                this.OnFolderDoubleClick(objContext, objTaskToAdd)
            }
            else {
                objTaskToAdd = objTaskToAdd["TaskProperties"] ? objTaskToAdd : { ...objTaskToAdd, "vAction": "New" };
                let intNextSelectedTaskInTreeIndex = objContext.state.arrTreeData.findIndex((obj) => obj["iPageId"] == objTaskToAdd["iPageId"]) + 1;
                let objNextSelectedTaskInTree = objContext.state.arrTreeData[intNextSelectedTaskInTreeIndex];
                if (objNextSelectedTaskInTree && objNextSelectedTaskInTree["iFolderId"] != objTaskToAdd["iFolderId"]) {
                    objNextSelectedTaskInTree = objContext.state.arrTreeData.find((obj) => obj["Type"] == "FOLDER" && obj["iPageId"] == objTaskToAdd["iFolderId"])
                }
                objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: [...objContext.state.arrTaskListData, objTaskToAdd], objSelectedTaskInList: objTaskToAdd, objSelectedTaskInTree: objNextSelectedTaskInTree, intIndex: objContext.state.arrTaskListData.length } });
                objContext.dispatch({
                    type: "SET_STATE", payload: { arrTreeData: objContext.state.arrTreeData.filter(obj => obj["iPageId"] != objTaskToAdd["iPageId"]) }
                });
                let arrSelectedNodes = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                ApplicationState.SetProperty("SelectedNode", { ...arrSelectedNodes, "Tree_Sample1": objNextSelectedTaskInTree });
            }
        }               
    }

    /**
     * @name OnFolderDoubleClick
     * @param {object} objContext
     * @param {objNode} objNode
     * @summary Adds all tasks in the selected folder to the list on double click event of Folder.
     */
    OnFolderDoubleClick(objContext, objNode) {
        this.LoadValidTasksForFolder(objNode, objContext, (arrValidTaskData) => {
            let arrSelectedFolderTasks = arrValidTaskData.map(objTaskToAdd => objTaskToAdd["TaskProperties"] ? objTaskToAdd : { ...objTaskToAdd, "vAction": "New" });
            let arrSelectedTaskIds = arrSelectedFolderTasks.map(objSelectedTask => objSelectedTask["iPageId"]);      
            let arrTreeData = objContext.state.arrTreeData.filter(obj => !arrSelectedTaskIds.includes(obj["iPageId"]));
            objContext.state.arrTaskListData.forEach(objTaskList => {
                arrSelectedFolderTasks = arrSelectedFolderTasks.filter(objTask => objTask["iPageId"] != objTaskList["iPageId"])
            });
            objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: [...objContext.state.arrTaskListData, ...arrSelectedFolderTasks], arrTreeData: arrTreeData, objSelectedTaskInList: arrSelectedFolderTasks[0], objSelectedTaskInTree: null, intIndex: objContext.state.arrTaskListData.filter(obj => obj["vAction"] != "Delete").length } });       
        });
    }

    /**
     * @name RemoveFromList
     * @param {any} objContext
     * @summary Removes the selected task to the list
     */
    RemoveFromList(objContext, objListData = {}, blnIsDoubleClick = false) {
        let objTaskToRemove = blnIsDoubleClick ? objListData : objContext.state.objSelectedTaskInList;
        if (objTaskToRemove?.iPageId) {
            let arrNewTaskListData = [];
            if (objTaskToRemove["TaskProperties"]) {
                objTaskToRemove = {
                    ...objTaskToRemove,
                    "iFolderId": objTaskToRemove["TaskProperties"]["iFolderId"],
                    "vPageName": objTaskToRemove["TaskProperties"]["vPageName"]
                };
                arrNewTaskListData = objContext.state.arrTaskListData.map(obj => obj["iPageId"] != objTaskToRemove["iPageId"] ? obj : { ...obj, ["vAction"]: "Delete" });
            }
            else {
                arrNewTaskListData = objContext.state.arrTaskListData.filter(obj => obj["iPageId"] != objTaskToRemove["iPageId"])
            }
            let intNextTaskListIndex;
            let objNextSelectedTaskInList = {};
            if (objContext.state.intIndex < objContext.state.arrTaskListData.filter(obj => obj["vAction"] != "Delete").length - 1) {
                intNextTaskListIndex = objContext.state.intIndex + 1;
                objNextSelectedTaskInList = objContext.state.arrTaskListData.filter(obj => obj["vAction"] != "Delete")[intNextTaskListIndex]
            }
            else {
                intNextTaskListIndex = objContext.state.intIndex;
                objNextSelectedTaskInList = objContext.state.arrTaskListData.filter(obj => obj["vAction"] != "Delete")[intNextTaskListIndex -1]
            }
            objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: arrNewTaskListData, objSelectedTaskInList: objNextSelectedTaskInList, intIndex: intNextTaskListIndex -1 } });
            objContext.dispatch({ type: "SET_STATE", payload: { arrTreeData: [...objContext.state.arrTreeData, objTaskToRemove], objSelectedTaskInTree: objTaskToRemove} });
            objContext.dispatch({ type: "SET_STATE", payload: { arrAssignedTasks: objContext.state.arrAssignedTasks.filter(obj => obj["iPageId"] != objTaskToRemove["iPageId"]) } });
            if (objTaskToRemove["TaskProperties"]) {
                objContext.dispatch({
                    type: "SET_STATE", payload: {
                        arrDeletedTasks: [
                            ...objContext.state.arrDeletedTasks, { ...objTaskToRemove, "vAction": "Delete" }
                        ]
                    }
                });
            }
            let arrSelectedNodes = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
            ApplicationState.SetProperty("SelectedNode", { ...arrSelectedNodes, "Tree_Sample1": objTaskToRemove });
        }
    }

    /**
     * @name SaveTaskToTest
     * @param {any} objContext
     * @param {any} blnSaveAndClose
     * @summary Performs the Save action
     */
    SaveTaskToTest(objContext, blnSaveAndClose = false) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let arrNonDeletedData = objContext.state.arrTaskListData.filter(obj => obj["vAction"] != "Delete");
        let arrSortedNonDeletedData = arrNonDeletedData.map((obj, intIndex) => { return { ...obj, ["iOrderId"]: intIndex + 1 } });
        let arrDeletedData = objContext.state.arrTaskListData.filter(obj => obj["vAction"] == "Delete");
        let arrEditData = [...arrSortedNonDeletedData, ...arrDeletedData];
        let objTestTaskParams = {
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.props.Data.TestData.uTestId
                        }
                    }
                ]
            },
            "vEditData": arrEditData,
            "uTestId": objContext.props.Data.TestData.uTestId,
            "DeleteBeforeEdit": "Y"
        };
        Intranet_Test_AssignTaskToTest_Module.EditAssignTaskToTestData(objTestTaskParams, (objReturn, blnEdited) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (blnEdited && blnSaveAndClose)
                Popup.ClosePopup(objContext.props.Id);
        });
    }

    /**
     * @name SaveTaskToTest
     * @param {any} objContext
     * @summary Moves the selected task up
     */
    OnListUp(objContext) {
        if (objContext.state.intIndex > 0) {
            let arrNewTaskLists = objContext.state.arrTaskListData.map((obj, intIndex) => {
                if (intIndex == objContext.state.intIndex - 1) {
                    return objContext.state.arrTaskListData[objContext.state.intIndex]
                }
                if (intIndex == objContext.state.intIndex) {
                    return objContext.state.arrTaskListData[objContext.state.intIndex - 1]
                }
                else return obj
            })
            objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: arrNewTaskLists } });
            objContext.dispatch({ type: "SET_STATE", payload: { intIndex: objContext.state.intIndex - 1 } });
        }        
    }

    /**
     * @name SaveTaskToTest
     * @param {any} objContext
     * @summary Moves the selected task down
     */
    OnListDown(objContext) {
        if (objContext.state.intIndex < objContext.state.arrTaskListData.length - 1) {
            let arrNewTaskLists = objContext.state.arrTaskListData.map((obj, intIndex) => {
                if (intIndex == objContext.state.intIndex + 1) {
                    return objContext.state.arrTaskListData[objContext.state.intIndex]
                }
                if (intIndex == objContext.state.intIndex) {
                    return objContext.state.arrTaskListData[objContext.state.intIndex + 1]
                }
                else return obj
            })
            objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: arrNewTaskLists } });
            objContext.dispatch({ type: "SET_STATE", payload: { intIndex: objContext.state.intIndex + 1 } });
        }
    }

    /**
     * @name OnListEmpty
     * @param {object} objContext objContext
     * @summary Clears all the Assigned Tasks of Test
     */
    OnListEmpty(objContext) {
        let arrDeletedTasks = objContext.state.arrDeletedTasks;
        let arrNewTaskListData = [];
        let arrRemovedTasks = objContext.state.arrTaskListData.map(objTaskToRemove => {
            if (objTaskToRemove["TaskProperties"]) {
                arrDeletedTasks = [...arrDeletedTasks, { ...objTaskToRemove, "vAction": "Delete" }];
                arrNewTaskListData = [...arrNewTaskListData, { ...objTaskToRemove, "vAction": "Delete" }];
                return {
                    ...objTaskToRemove,
                    "iFolderId": objTaskToRemove["TaskProperties"]["iFolderId"],
                    "vPageName": objTaskToRemove["TaskProperties"]["vPageName"]
                }
            }
            else {
                return objTaskToRemove;
            }
        });

        objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: arrNewTaskListData, objSelectedTaskInList: null, arrAssignedTasks: [], arrTreeData: [...objContext.state.arrTreeData, ...arrRemovedTasks], arrDeletedTasks: arrDeletedTasks } });      
    }    

    /**
     * @name HandleChange
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strValue, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strTaskId": strValue } });
    }

    /**
     * @name ToggleShowListData
     * @param {any} objContext
     * @summary Sets the selected task in the state 
     */
    ToggleShowListData(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnHideListData": !objContext.state.blnHideListData } });
    }

    /**
     * @name AddTaskById
     * @param {object} objContext takes objContext
     * @summary Adds tasks to test by taskId input
     */
    AddTaskById(objContext) {
        if (objContext.state.strTaskId !== "" && !isNaN(objContext.state.strTaskId)) {
            if (!objContext.state.arrTaskListData.find((objTaskListData) => objTaskListData["iPageId"] == objContext.state.strTaskId)) {
                ApplicationState.SetProperty("blnShowAnimation", true);
                let objTaskParams = {
                    ["SearchQuery"]: {
                        "must": [
                            {
                                "match": {
                                    "iPageId": objContext.state.strTaskId
                                }
                            },
                            {
                                "match": {
                                    "iSubjectIds": objContext.props.Data.TestData.iSubjectId
                                }
                            },
                            {
                                "terms": {
                                    "uWorkflowStatusIds": objContext.state.arrProductionReadyWorkFlowStatuses.map(objProductionReadyWorkFlowStatus => objProductionReadyWorkFlowStatus["uWorkflowStatusId"])
                                }
                            } 
                        ]
                    },
                    ["OutputColumns"]: ["iPageId", "iFolderId", "vPageName", "iSubjectId", "dtModifiedOn"]
                };
                Object_Intranet_Task_Task.GetData(objTaskParams, (objReturnData) => {
                    let objTaskToAdd = objReturnData[Object.keys(objReturnData)[0]]?.["Data"]?.[0]// ?? null;
                    if (objTaskToAdd) {
                        this.AddToList(objContext, objTaskToAdd, true);
                        let objContainingFolder = objContext.state.arrTreeData.filter(objData => objData["iPageFolderId"] == objTaskToAdd["iFolderId"] && objData["Type"] == "FOLDER");
                        let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes") : {};
                        ApplicationState.SetProperty("ExpandedNodes", { ...arrExpandedNodes, "Tree_Sample1": [objContainingFolder] });
                        let arrSelectedNodes = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                        ApplicationState.SetProperty("SelectedNode", { ...arrSelectedNodes, "Tree_Sample1": objContainingFolder });
                        objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTaskInTree: null, strTaskId: "" } });
                    }
                    else {
                        Popup.ShowErrorPopup({
                            Data: {},
                            Meta: {
                                "ShowHeader": true,
                                "ShowCloseIcon": true,
                            },
                            Resource: {
                                Text: objContext.props.Resource.Text,
                                TextResourcesKey: "AssignTaskErrorPopup",
                                SkinPath: objContext.props.Resource.SkinPath
                            },
                            CallBacks: {}
                        });
                    }
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }, true);
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { strTaskId: "" } });
                Popup.ShowErrorPopup({
                    Data: {},
                    Meta: {
                        "ShowHeader": true,
                        "ShowCloseIcon": true,
                    },
                    Resource: {
                        Text: objContext.props.Resource.Text,
                        TextResourcesKey: "ExistingAssignedTaskErrorPopup",
                        SkinPath: objContext.props.Resource.SkinPath
                    },
                    CallBacks: {}
                });
            }
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objContext.props.Resource.Text,
                    TextResourcesKey: "AssignTaskErrorPopup",
                    SkinPath: objContext.props.Resource.SkinPath
                },
                CallBacks: {}
            });
        }
    }
}

export default AssignTaskToTest_ModuleProcessor;