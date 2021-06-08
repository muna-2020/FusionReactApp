
//Module related files
import Object_Intranet_Task_Task from '@shared/Object/c.Intranet/2_Task/Task/Task';
import Intranet_Test_TestNavigation_Module from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/TestNavigation_Module';

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
        Intranet_Test_TestNavigation_Module.GetData(objTestTaskParams, (objData) => {
            let arrFolderData = objData["ValidTaskFolders"];
            arrFolderData = arrFolderData.sort((a, b) => a["vPageFolderName"].toUpperCase() - b["vPageFolderName"].toUpperCase() );
            let objRootNode = { iPageId: "0", iFolderId: "-1", vPageName: "Tasks", Type: "FOLDER", expanded: true, ShowExpandCollapseIcon: true };
            let objNavigationRootNode = { uTestNavigationId: "00000000-0000-0000-0000-000000000000", uParentTestNavigationId: "-1", vNavigationName: "MainNavigation", Type: "FOLDER", expanded: true };
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "isLoadComplete": true,
                    "arrProductionReadyWorkFlowStatuses": objData["ProductionReadyWorkflowStatuses"] ?? [],
                    //"strProductionReadyWorkFlowStatusId": objData["ProductionReadyWorkflowStatusId"],
                    "arrTaskListData": [objNavigationRootNode, ...objData["TestNavigationData"]],
                    "arrTreeData": [
                        objRootNode,
                        ...arrFolderData.map(obj => {
                            return { ...obj, ["iPageId"]: obj.iPageFolderId, ["iFolderId"]: obj.iPageParentFolderId, ["vPageName"]: obj.vPageFolderName, Type: "FOLDER", ShowExpandCollapseIcon: true };
                        }),
                    ]
                }
            });
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
                        //"match": {
                        //    "uWorkflowStatusId": objContext.state.strProductionReadyWorkFlowStatusId
                        //}
                    },
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
            NodeData: objContext.state.arrTreeData,
            SelectedNodeId: "0"
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
     * @name GetNavigationTreeData
     * @param {any} objContext
     * @summary Forms the tree data
     * @return {object}
     */
    GetNavigationTreeData(objContext) {
        const objMeta = {
            IdField: 'uTestNavigationId', //Id field of the Node
            ParentIdField: 'uParentTestNavigationId', //Parent Id field of the Node.
            TextField: 'vNavigationName', //The value with the this key from the node object will be displayed.
            RootNodeId: "-1", //The value of the Node to be taken as the parent folder.
            ShowExpandCollapseIcon: true,
            ForceShowExpandCollapseIcon: true
        };
        //let arrTaskListData = objContext.state.arrTaskListData;
        //let arrTaskData = [];
        //arrTaskListData.map(objListData => {
        //    let objTaskData = objContext.state.arrTreeData.find(objTask => objTask.iPageId == objListData.iPageId);
        //    if (objTaskData)
        //        arrTaskData = [...arrTaskData, objTaskData];
        //})
        const objData = {
            //NodeData: [...objContext.state.arrTaskListData, ...arrTaskData]
            NodeData: objContext.state.arrTaskListData,
            SelectedNodeId: "00000000-0000-0000-0000-000000000000"
        };
        let objEvents = {
            OnSelectNode: (objNode, arrNodes, intIndex) => {
                objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTaskInList: objNode, intIndex: intIndex } });
            },
        }
        let objCallBacks = {
            OnBeforeShowNode: (objNode) => {
                let strNavigationName = "";
                if (objNode.uTestNavigationId || objNode.uParentTestNavigationId) {
                    if (objNode.uTestNavigationId == "00000000-0000-0000-0000-000000000000") {
                        strNavigationName = objNode["vNavigationName"];
                    }
                    else {
                        let objNavigationData = {};
                        if (objNode["t_TestDrive_Test_Navigation_Data"]) {
                            objNavigationData = objNode["t_TestDrive_Test_Navigation_Data"].find(obj => obj["iLanguageId"] = JConfiguration.InterfaceLanguageId);
                        }
                        strNavigationName = objNavigationData ? objNavigationData["vNavigationName"] : "";
                    }                    
                }                
                if (objNode.iFolderId) {
                    strNavigationName = objNode["vPageName"];
                    objNode = { ...objNode, "uTestNavigationId": objNode.iPageId };
                }
                return {
                    ...objNode,                    
                    "vNavigationName": strNavigationName,
                    "ImageType": objNode.vPageName ? "TASK" : "FOLDER"
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
                //let arrSelectedNodes = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                //ApplicationState.SetProperty("SelectedNode", { ...arrSelectedNodes, "Tree_Sample1": objNextSelectedTaskInTree });
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
    RemoveFromList(objContext) {
        if (objContext.state.objSelectedTaskInTree.Type != "FOLDER" && objContext.state.objSelectedTaskInList.uTestNavigationId != "00000000-0000-0000-0000-000000000000" && !objContext.state.objSelectedTaskInList.iPageId) {
            //objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: [...objContext.state.arrTaskListData, { ...objContext.state.objSelectedTaskInTree, ["uParentTestNavigationId"]: objContext.state.objSelectedTaskInList.uTestNavigationId, "Type": "TASK" }] } });
            //let arr = objContext.state.arrTaskListData.map((obj, intIndex) => intIndex == objContext.state.intIndex ? { ...obj, ["iPageId"]: objContext.state.objSelectedTaskInTree.iPageId } : obj);
            //let objTaskToAssign = { ...objContext.state.objSelectedTaskInList, ["iPageId"]: objContext.state.objSelectedTaskInTree.iPageId };
            //objContext.dispatch({ type: "SET_STATE", payload: { "arrNavigationsToSave": arr, "objSelectedTaskInList": objTaskToAssign}});

            //let objTaskToAssign = { ...objContext.state.objSelectedTaskInList, ["iPageId"]: objContext.state.objSelectedTaskInTree.iPageId };
            let obj = { ...objContext.state.objSelectedTaskInTree, ["uParentTestNavigationId"]: objContext.state.objSelectedTaskInList.uTestNavigationId, "Type": "TASK" };
            let objNavToSave = { ...objContext.state.objSelectedTaskInList, ["iPageId"]: objContext.state.objSelectedTaskInTree.iPageId };
            let arrNavigationsToSave = [];
            if (objContext.state.arrNavigationsToSave.find(obj => obj["uTestNavigationId" == objNavToSave["uTestNavigationId"]])) {
                arrNavigationsToSave = objContext.state.arrNavigationsToSave.map(obj => obj["uTestNavigationId" == objNavToSave["uTestNavigationId"]] ? objNavToSave : obj);
            }
            else {
                arrNavigationsToSave = [...objContext.state.arrNavigationsToSave, objNavToSave];
            }
            //let arrTaskListData = [];
            //if (objContext.state.arrTaskListData.find(obj => obj["uTestNavigationId" == objNavToSave["uTestNavigationId"]])) {
            //    arrTaskListData = objContext.state.arrTaskListData.map(obj => obj["uTestNavigationId" == objNavToSave["uTestNavigationId"]] ? objNavToSave : obj);
            //}
            //else {
            //    arrTaskListData = [...objContext.state.arrTaskListData, objNavToSave];
            //}
            let arrTaskListData = [...objContext.state.arrTaskListData, obj];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTaskListData": arrTaskListData, "arrNavigationsToSave": arrNavigationsToSave}});
        }        
    }

    /**
    * @name SaveData
    * @param {object} objContext takes objContext
    * @param {boolean} blnClose sends true when SaveAndClosed is pressed
    * @summary hits the add/edit api after validation succeeds
    */
    SaveData(objContext, blnClose = false) {
        let objParams = {
            //"SearchQuery": objSearchQuery,
            "vAddData": objContext.state.arrNavigationsToSave,
            "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
        };
        Intranet_Test_TestNavigation_Module.AssignTestNavigation(objParams, (objReturn, cIsNewData) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (objContext.props.CallBacks && objContext.props.CallBacks.OnSaveTestNavigation) {
                objContext.props.CallBacks.OnSaveTestNavigation(objReturn[0]);
            }
            if (blnClose) {
                Popup.ClosePopup(objContext.props.Id);
            }
            else {
                this.LoadInitialData(objContext);
            }
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
     * @name AssignTasksToTest
     * @param {any} objContext
     * @param {any} objSelectedRow
     * @summary Opens the Assign TasktoTest Popup
     */
    OpenAddEditNavigationPopup(objContext, blnIsEdit) {
        let objRowData = {};
        Popup.ShowTabbedPopup({
            Data: {
                TestData: objContext.props.Data.TestData,
                MultiLanguageData: objContext.props.Data.MultiLanguageData,
                ParentNavigationData: objContext.state.objSelectedTaskInList,
                TaskData: objContext.state.objSelectedTaskInTree          
            },
            Meta: {
                PopupName: "AddEditTestNavigation",
                Height: "auto",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props),
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            ParentProps: objContext.Props,
            Events: {},
            CallBacks: {
                OnSaveTestNavigation: (objTestNavigationData) => {
                    let obj = { ...objTestNavigationData, "uTestNavigationId": new Date().getTime(), "Type": "FOLDER" };
                    objContext.dispatch({
                        type: "SET_STATE", payload: {
                            //"arrTaskListData": [...objContext.state.arrTaskListData, objTestNavigationData],
                            "arrNavigationsToSave": [...objContext.state.arrNavigationsToSave, obj],
                            "arrTaskListData": [...objContext.state.arrTaskListData, obj]
                        }
                    });
                }
            }
        })
    }
}

export default AssignTaskToTest_ModuleProcessor;