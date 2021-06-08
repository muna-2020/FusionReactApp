
//Module related files
import AssignTaskToDescription_Module from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AssignTaskToDescription/AssignTaskToDescription_Module';
import Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription';


/**
* @name AssignTaskToDescription_ModuleProcessor
* @summary Class for Adding Task to description module.
*/
class AssignTaskToDescription_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
    * @name LoadInitialData
    * @param {object} objContext passes Context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        let objTestTaskParams = {
            "iSubjectId": objContext.props.Data.intSubjectId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        AssignTaskToDescription_Module.GetAssignTaskToDescriptionData(objTestTaskParams, (objData) => {
            let arrFolderData = objData["AssignTaskToDescription_Module"].Data[0].ValidTaskFolders;
            arrFolderData = arrFolderData.sort((a, b) => a["vPageFolderName"].toUpperCase() - b["vPageFolderName"].toUpperCase() );
            let arrValidTaskData = objData["AssignTaskToDescription_Module"].Data[0].ValidTasks;
            arrValidTaskData = arrValidTaskData.sort((a, b) => a["iFolderId"] - b["iFolderId"]);
            //let arrFilteredValidTaskData = arrValidTaskData.filter(objTaskData => {
            //    let arr = objContext.props.Data.objTopicDescription["t_TestDrive_Subject_FeedbackThreshold_Description_Tasks"].filter(objDescriptionTasks => {
            //        return objDescriptionTasks["iTaskId"] == objTaskData["iPageId"];
            //    });
            //    if (arr.length > 0) {
            //        return false;
            //    } else {
            //        return true;
            //    }
            //});
            let objRootNode = { iPageId: "0", iFolderId: "-1", vPageName: "Tasks", Type: "FOLDER", expanded: true };
            let arrFormattedTaskListData = {
                ...objContext.props.Data.objTopicDescription,
                ["t_TestDrive_Subject_FeedbackThreshold_Description_Tasks"]: objContext.props.Data.objTopicDescription["t_TestDrive_Subject_FeedbackThreshold_Description_Tasks"].map(objEditData => {
                    return {
                        ...objEditData, ["iPageId"]: objEditData["iTaskId"], ["vPageName"]: objEditData["vTaskName"]//, ["iFolderId"]: arrValidTaskData.find(objTaskData => objTaskData["iPageId"] == objEditData["iTaskId"]).iFolderId
                    };
                })
            };
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "isLoadComplete": true,
                    "arrTaskListData": arrFormattedTaskListData["t_TestDrive_Subject_FeedbackThreshold_Description_Tasks"].map(obj => { return { ...obj, ["vAction"]: "Edit" }; }),
                    "arrTreeData": [
                        objRootNode,
                        ...arrFolderData.map(obj => {
                            return { ...obj, ["iPageId"]: obj.iPageFolderId, ["iFolderId"]: obj.iPageParentFolderId, ["vPageName"]: obj.vPageFolderName, Type: "FOLDER" };
                        }),
                        ...arrValidTaskData
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
    * @name GetTreeData
    * @param {object} objContext Context object
    * @summary Forms the tree data
    * @return {object} Tree data
    */
    GetTreeData(objContext) {
        const objMeta = {
            IdField: 'iPageId', //Id field of the Node
            ParentIdField: 'iFolderId', //Parent Id field of the Node.
            TextField: 'vPageName', //The value with the this key from the node object will be diplayed.
            RootNodeId: -1, //The value of the Node to be taken as the parent folder.
            ShowExpandCollapseIcon: true
        };
        const objData = {
            NodeData: objContext.state.arrTreeData
        };
        let objEvents = {
            OnSelectNode: (objNode) => {
                objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTaskInTree: objNode } });
            },
            OnDoubleClick: (objNode) => { objNode["Type"] == "FOLDER" ? this.OnFolderDoubleClick(objContext, objNode) : this.AddToList(objContext, objNode, true) }
        };
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
        };
        let objResource = {
            SkinPath: JConfiguration.IntranetSkinPath,
            ImagePathDetails: { "FOLDER": "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png", "TASK": "/Images/Application/Modules/Test/AssignTaskToTest/Base.gif" }
            //ImagePathDetails: { "FOLDER": objContext.ImageMeta.FolderImage, "TASK": objContext.ImageMeta.TaskImage }
        };
        return {
            Data: objData,
            Meta: objMeta,
            Events: objEvents,
            CallBacks: objCallBacks,
            Resource: objResource
        };
    }

    /**
    * @name OnSelectListNode
    * @param {object} objtask Task object
    * @param {object} intIndex Index field
    * @param {object} objContext Context object
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
            objTaskToAdd = objTaskToAdd["TaskProperties"] ? objTaskToAdd : { ...objTaskToAdd, "vAction": "New" };
            let intNextSelectedTaskInTreeIndex = objContext.state.arrTreeData.findIndex((obj) => obj["iPageId"] == objTaskToAdd["iPageId"]) + 1;            
            let objNextSelectedTaskInTree = objContext.state.arrTreeData[intNextSelectedTaskInTreeIndex];
            if (objNextSelectedTaskInTree["iFolderId"] != objTaskToAdd["iFolderId"]) {
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

    /**
    * @name OnFolderDoubleClick
    * @param {object} objContext Context object
    * @param {objNode} objNode Node object
    * @summary Adds all tasks in the selected folder to the list 
    */
    OnFolderDoubleClick(objContext, objNode) {
        let arrSelectedFolderTasks = objContext.state.arrTreeData.filter(objData => objData["iFolderId"] == objNode["iPageFolderId"] && objData["Type"] != "FOLDER").map(objTaskToAdd => objTaskToAdd["TaskProperties"] ? objTaskToAdd : { ...objTaskToAdd, "vAction": "New" });
        let arrSelectedTaskIds = arrSelectedFolderTasks.map(objSelectedTask => objSelectedTask["iPageId"]);      
        let arrTreeData = objContext.state.arrTreeData.filter(obj => !arrSelectedTaskIds.includes(obj["iPageId"]));

        objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: [...objContext.state.arrTaskListData, ...arrSelectedFolderTasks], arrTreeData: arrTreeData, objSelectedTaskInList: arrSelectedFolderTasks[0], objSelectedTaskInTree: null  } });       
    }

    /**
    * @name RemoveFromList
    * @param {object} objContext Context object
    * @param {object} objListData List object
    * @param {Boolean} blnIsDoubleClick Double clicked or not
    * @summary Removes the selected task to the list
    */
    RemoveFromList(objContext, objListData = {}, blnIsDoubleClick = false) {
        let objTaskToRemove = blnIsDoubleClick ? objListData : objContext.state.objSelectedTaskInList;
        if (objTaskToRemove) {
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
                arrNewTaskListData = objContext.state.arrTaskListData.filter(obj => obj["iPageId"] != objTaskToRemove["iPageId"]);
            }
            let intNextTaskListIndex;
            let objNextSelectedTaskInList = {};
            if (objContext.state.intIndex < objContext.state.arrTaskListData.length - 1) {
                intNextTaskListIndex = objContext.state.intIndex + 1;
                objNextSelectedTaskInList = objContext.state.arrTaskListData[intNextTaskListIndex];
            }
            else {
                intNextTaskListIndex = objContext.state.intIndex;
                objNextSelectedTaskInList = objContext.state.arrTaskListData[intNextTaskListIndex - 1];
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
    * @name SaveTaskToDescription
    * @param {object} objContext Context object
    * @param {Boolean} blnSaveAndClose Is save and close
    * @summary Performs the Save action
    */
    SaveTaskToDescription(objContext, blnSaveAndClose = false) {
        let arrNonDeletedData = objContext.state.arrTaskListData.filter(obj => obj["vAction"] != "Delete");
        let arrSortedNonDeletedData = arrNonDeletedData.map((obj, intIndex) => { return { ...obj, ["iOrderId"]: intIndex + 1 }; });
        let arrDeletedData = objContext.state.arrTaskListData.filter(obj => obj["vAction"] == "Delete");
        let arrEditData = [...arrSortedNonDeletedData, ...arrDeletedData];
        let arrFormattedEditData = arrEditData.map(objEditData => {
            return { ...objEditData, ["iTaskId"]: objEditData["iPageId"], ["vTaskName"]: objEditData["vPageName"]};
        });
        let objDescriptionData = {
            ...objContext.props.Data.objTopicDescription,
            ["t_TestDrive_Subject_FeedbackThreshold_Description_Tasks"]: arrFormattedEditData
        };
        let objTaskParam = {
            "ForeignKeyFilter": {
                "iSubjectId": objContext.props.Data.intSubjectId
            },
            "SortKeys": [
                {
                    "iOrder": {
                        "order": "asc"
                    }
                }
            ],
            "vEditData": [objDescriptionData]
        };
        Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription.EditData(objTaskParam, (objReturn, blnEdited) => {
            if (blnEdited && blnSaveAndClose)
                Popup.ClosePopup(objContext.props.Id);
        });
    }

    /**
    * @name OnListUp
    * @param {object} objContext Context object
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
                else return obj;
            });
            objContext.dispatch({ type: "SET_STATE", payload: { arrTaskListData: arrNewTaskLists } });
            objContext.dispatch({ type: "SET_STATE", payload: { intIndex: objContext.state.intIndex - 1 } });
        }        
    }

    /**
    * @name OnListDown
    * @param {object} objContext Context object
    * @summary Moves the selected task down
    */
    OnListDown(objContext) {
        if (objContext.state.intIndex < objContext.state.arrTaskListData.length - 1) {
            let arrNewTaskLists = objContext.state.arrTaskListData.map((obj, intIndex) => {
                if (intIndex == objContext.state.intIndex + 1) {
                    return objContext.state.arrTaskListData[objContext.state.intIndex];
                }
                if (intIndex == objContext.state.intIndex) {
                    return objContext.state.arrTaskListData[objContext.state.intIndex + 1];
                }
                else return obj;
            });
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
                };
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
    * @name AddTaskById
    * @param {object} objContext takes objContext
    * @summary Adds tasks to test by taskId input
    */
    AddTaskById(objContext) {
        let blnValidTask = false;
        if (objContext.state.strTaskId !== "" && !isNaN(objContext.state.strTaskId)) {
            let objTaskToAdd = objContext.state.arrTreeData.find(objTask => objTask["iPageId"] == objContext.state.strTaskId);
            if (objTaskToAdd) {
                this.AddToList(objContext, objTaskToAdd, true);
                let objContainingFolder = objContext.state.arrTreeData.filter(objData => objData["iPageFolderId"] == objTaskToAdd["iFolderId"] && objData["Type"] == "FOLDER");
                let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes") : {};
                ApplicationState.SetProperty("ExpandedNodes", { ...arrExpandedNodes, "Tree_Sample1": [objContainingFolder] });
                let arrSelectedNodes = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};                
                ApplicationState.SetProperty("SelectedNode", { ...arrSelectedNodes, "Tree_Sample1": objContainingFolder });
                objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTaskInTree: null, strTaskId:"" } });
                blnValidTask = true;            
            }
        }
        if (!blnValidTask) {
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

export default AssignTaskToDescription_ModuleProcessor;