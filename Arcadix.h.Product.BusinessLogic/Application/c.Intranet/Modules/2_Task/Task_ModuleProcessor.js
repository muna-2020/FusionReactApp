// React related imports.
import React from 'react';

//Core Imports.
import { GetObjectListForModule } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

//Objects required for module.
import Object_Intranet_Task_Task from '@shared/Object/c.Intranet/2_Task/Task/Task';
import Object_Intranet_Task_TaskFolder from '@shared/Object/c.Intranet/2_Task/TaskFolder/TaskFolder';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Intranet_Task_TaskDifficultyLevel from '@shared/Object/c.Intranet/2_Task/Task/TaskDifficultyLevel/TaskDifficultyLevel';
import Object_Cockpit_Workflow_Workflow from '@shared/Object/c.Cockpit/Workflow/Workflow';
import Object_Cockpit_Workflow_WorkflowType from '@shared/Object/c.Cockpit/Workflow/WorkflowType/WorkflowType';
import Object_Cockpit_Workflow_WorkflowStatus from '@shared/Object/c.Cockpit/Workflow/WorkFlowStatus/WorkflowStatus';
import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';

//Module related fies...
import * as Task_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task_MetaData';
import * as AddEditTaskFolder_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/AddEditTaskFolder/AddEditTaskFolder_MetaData';
import * as Task_ContextMenuData from '@shared/Application/c.Intranet/Modules/2_Task/Task_ContextMenuData';
import Task_Module from '@shared/Application/c.Intranet/Modules/2_Task/Task_Module';
import * as Task_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task_OfficeRibbon';

/**
* @name Task_ModuleProcessor
* @summary Class for Task module display.
*/
class Task_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Task_Task",
            "Object_Intranet_Task_TaskFolder",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Task_TaskDifficultyLevel",
            "Object_Cockpit_Workflow_WorkflowStatus",
            "Object_Cockpit_Workflow_Workflow",
            "Object_Cockpit_Workflow_WorkflowType",
            { "StoreKey": "ApplicationState", "DataKey": "FolderId" },
            { "StoreKey": "ApplicationState", "DataKey": "ShowEditor" },
            //{ "StoreKey": "ApplicationState", "DataKey": "SelectedRows" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecuteAPI(this, objContext.props);
        //this.GetActiveWorkFlowStatuses(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @param {Array} arrPrefetchFilterData contains PrefetchFilterData if any
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props, arrPrefetchFilterData) {

        let arrDataRequest = [];
        if (arrPrefetchFilterData) {
            //Task object
            Object_Intranet_Task_Task.Initialize({});
            arrPrefetchFilterData?.forEach(objFolder => {
                arrDataRequest = [
                    ...arrDataRequest,
                    {
                        "URL": Object_Intranet_Task_Task.URL,
                        "InitialDataCallParam": this.GetTaskParams(objFolder["iPageFolderId"])
                    }
                ]
            });
        }
        else {
            let objTaskParams = this.GetTaskParams(0);//to get Root Folder Tasks
            Object_Intranet_Task_Task.Initialize(objTaskParams);
            arrDataRequest = [...arrDataRequest, Object_Intranet_Task_Task];
        }
        
        let objTaskFolderParams = {            
            "SortKeys": [
                {
                    "vPageFolderName": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objWorkFlowStatusParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        //TaskFolder
        Object_Intranet_Task_TaskFolder.Initialize(objTaskFolderParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskFolder];

        //MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        //Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/2_Task/Task"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //TaskDifficultyLevel
        Object_Intranet_Task_TaskDifficultyLevel.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskDifficultyLevel];

        //WorkFlow Type
        Object_Cockpit_Workflow_WorkflowType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowType]

        // WorkFlow
        Object_Cockpit_Workflow_Workflow.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_Workflow];

        // WorkFlowStatus
        Object_Cockpit_Workflow_WorkflowStatus.Initialize(objWorkFlowStatusParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowStatus];

        return arrDataRequest;
    }

    /**
     * @name GetTaskParams
     * @param {string} strFolderId FolderId
     * @summary Forms the Params for Task object.
     */
    GetTaskParams(strFolderId) {
        return {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iFolderId": strFolderId
                        }
                    }
                ]
            },
            "OutputColumns": [
                "iPageId",
                "iFolderId",
                "vPageName",
                "vPageDescription",
                "iTaskTypeId",
                "iTaskUsageId",
                "cIsAdaptiveTask",
                "iSubjectId",
                "iCategoryId",
                "iCategoryCompetencyId",
                "iCategoryCompetencyLevelId",
                "iCategoryCompetencyRangeId",
                "dPoints",
                "iEstimatedTimeToSolveSolveInSeconds",
                "t_TestDrive_Task_AssignedTaskDifficultyLevel",
                "cIsShortcut",
                "vCustomerTaskId",
                "iIntermediateId",
                "vSource",
                "cIsForInternalTesting",
                "uSkinId",
                "t_CMS_Page_Container",
                "t_CMS_Page_Language",
                "t_CMS_Page_AssignedWorkflowStatus",
                "t_TestDrive_Task_AssignedAdditionalTaskProperty",
                "t_CMS_Page_Data",
                "cIsDeleted",
                "uUserId",
                "uModifiedById",
                "dtCreatedOn",
                "dtModifiedOn",
                "cIsFusionVersion",
                "iNumberOfQuestionsPerPage",
                "iStartIndexForSurvey",
                "cShowRandomQuestions"
            ]
        };
    }

    /**
     * @name GetActiveWorkFlowStatuses
     * @param {object} objContext Context Object
     * @summary To get GetActiveWorkFlowStatuses.
     */
    GetActiveWorkFlowStatuses(objContext) {
        let arrWorkFlowTypes = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"];
        let arrWorkFlows = DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"];
        let arrWorkFlowStatuses = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus)["Data"];

        let strTaskWorkflowTypeId = arrWorkFlowTypes.find(obj => obj["vWorkflowTypeIdentifier"] == "Task Object")?.["uWorkflowTypeId"];
        let arrActiveFlows = arrWorkFlows.filter(obj => obj["uWorkflowTypeId"] == strTaskWorkflowTypeId && obj["t_TestDrive_Workflow_Active"].length > 0);
        let objClientActiveWorkflow = arrActiveFlows?.find(obj => obj["t_TestDrive_Workflow_Active"] && obj["t_TestDrive_Workflow_Active"]?.find(objActive => objActive["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId));
        if (!objClientActiveWorkflow) {
            objClientActiveWorkflow = arrActiveFlows?.find(obj => obj["t_TestDrive_Workflow_Active"] && obj["t_TestDrive_Workflow_Active"]?.find(objActive => objActive["iMainClientId"] == 0));
        }
        let strActiveWorkflowId = objClientActiveWorkflow && objClientActiveWorkflow["uWorkflowId"];
        let arrActiveWorkFlowStatuses = arrWorkFlowStatuses.filter(obj => obj["uWorkflowId"] == strActiveWorkflowId && obj["cIsDeleted"] == "N");
        objContext.dispatch({ type: "SET_STATE", payload: { "arrActiveWorkFlowStatuses": arrActiveWorkFlowStatuses } });
        objContext.dispatch({ type: "SET_STATE", payload: { "blnActiveWorkFlowStatusesLoaded": true } });
    }

    /**
     * @name LoadFoldersAndTaskse
     * @param {object} objContext Context 
     * @param {string} strFolderId strFolderId
     * @summary To set state data after the load is complete.
     */
    LoadSelectedFolderTasks(objContext, strFolderId, blnIsResetGrid = true) {
        let objTaskParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iFolderId": strFolderId
                        }
                    }
                ]
            },
            "OutputColumns": [
                "iPageId",
                "iFolderId",
                "vPageName",
                "vPageDescription",
                "iTaskTypeId",
                "iTaskUsageId",
                "cIsAdaptiveTask",
                "iSubjectId",
                "iCategoryId",
                "iCategoryCompetencyId",
                "iCategoryCompetencyLevelId",
                "iCategoryCompetencyRangeId",
                "dPoints",
                "iEstimatedTimeToSolveSolveInSeconds",
                "t_TestDrive_Task_AssignedTaskDifficultyLevel",
                "cIsShortcut",
                "vCustomerTaskId",
                "iIntermediateId",
                "vSource",
                "cIsForInternalTesting",
                "uSkinId",
                "t_CMS_Page_Container",
                "t_CMS_Page_Language",
                "t_CMS_Page_AssignedWorkflowStatus",
                "t_CMS_Page_Data",
                "cIsDeleted",
                "uUserId",
                "uModifiedById",
                "dtCreatedOn",
                "dtModifiedOn",
                "cIsFusionVersion"
            ]
        };
                if (blnIsResetGrid) {
            if (!DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;" + objContext.props.FolderId)) {
                ApplicationState.SetProperty("blnShowAnimation", true);
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": null });
            }
            else {
                let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["TaskGrid"] : null;
                if (fnResetGridSelection) {
                    fnResetGridSelection();
                }
            }
        }        

        Object_Intranet_Task_Task.GetData(objTaskParams, (arrData, blnLoadComplete) => {
            if (blnLoadComplete) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["TaskGrid"] : null;
                if (fnResetGridSelection && blnIsResetGrid) {
                    fnResetGridSelection();
                }
            }
        });
    }

    /**
     * @name SetTaskDataInLocalState
     * @param {object} objContext Context Object
     * @param {array} arrTaskData TaskData
     * @summary To set state TaskData and objSelectedRow in local state.
     */
    SetTaskDataInLocalState(objContext, arrTaskData) {
        if (!arrTaskData) {
            arrTaskData = DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;" + objContext.props.FolderId).Data;
        }
        let arrtaskfolder = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"];
        var arrFirstChildFolders = arrtaskfolder.filter(item => { return item.iPageParentFolderId == objContext.props.FolderId });
        var arrData = [...(arrFirstChildFolders ? arrFirstChildFolders : []), ...(arrTaskData ? arrTaskData : [])];
        objContext.dispatch({ type: "SET_STATE", payload: { "arrTaskData": this.GetNonDeletedData(arrData) } });
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": arrData[0] } });
    }

    /**
    * @name OpenAddEditTaskPopup
    * @param {object} objContext passes Context object
    * @param {string} strType Type of Task
    * @param {boolean} blnIsEdit is either edit or Add
    * @param {object} objSelectedRow selected row data
    * @summary Call tabbed popup for Add/Edit of Task
    * @return null
    */
    OpenAddEditTaskPopup(objContext, strType = "", blnIsEdit, objSelectedRow = null, fnEditCallBack) {
        objSelectedRow = objSelectedRow ? objSelectedRow : this.GetSelectedRow(objContext);

        if (blnIsEdit && objSelectedRow.vPageName == undefined)
            this.OpenAddEditTaskFolderPopup(objContext, objSelectedRow, true)
        else {
            let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
            let intApplicationTypeForLanguageData = 2;
            let objDropDownData = {
                arrActiveWorkFlowStatuses: objContext.state.arrActiveWorkFlowStatuses
            };
            let blnShowErrorPopup = false;
            let arrAuditData = [];
            if (blnIsEdit) {
                blnShowErrorPopup = (!objSelectedRow || objSelectedRow.length <= 0) ? true : false;
            }

            if (blnIsEdit) {
                if (objSelectedRow["iTaskTypeId"] == 2 && objSelectedRow["iTaskUsageId"] == 7 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "Presentation";
                else if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 5 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "Demo";
                else if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 1 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "Learning";
                else if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 2 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "LowStake";
                else if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "HighStake";
                else if (objSelectedRow["iTaskTypeId"] == 3 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "HighStakeExample";
                else if (objSelectedRow["iTaskTypeId"] == 2 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "HighStakeIntro";
                else if (objSelectedRow["iTaskTypeId"] == 5 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "HighStakeBreak";
                else if (objSelectedRow["iTaskTypeId"] == 6 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "HighStakeSurvey";
                else if (objSelectedRow["iTaskTypeId"] == 4 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "HighStakeSurveyList";
                else if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'Y')
                    strType = "HighStakeAdaptive";
                else if (objSelectedRow["iTaskTypeId"] == 6 && objSelectedRow["iTaskUsageId"] == 6 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "Survey";
                else if (objSelectedRow["iTaskTypeId"] == 4 && objSelectedRow["iTaskUsageId"] == 6 && objSelectedRow["cIsAdaptiveTask"] == 'N')
                    strType = "SurveyList";
                else
                    blnShowErrorPopup = true;
            }

            if (!blnShowErrorPopup) {
                var objData = {
                    Title: Localization.TextFormatter(objTextResource, strType),
                    IsEdit: blnIsEdit,
                    Type: strType, //Required When adding the task
                    objSelectedRow: objSelectedRow, //Required When editing the task
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
                    LanguageData: DataRef(objContext.props.Object_Cockpit_Language)["Data"],
                    MainClientLanguageData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"],
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    Object_Intranet_Task_Task: DataRef(objContext.props.Object_Intranet_Task_Task),
                    FolderId: objContext.props.FolderId,
                    IsForInternalTesting: this.IsForInternalTestingTask(objContext),
                    DropDownData: objDropDownData,
                    AuditData: arrAuditData
                }
                ApplicationState.SetProperty("blnShowAnimation", true);

                Popup.ShowTabbedPopup({
                    Data: objData,
                    Meta: {
                        PopupName: "AddEdit" + strType + "Task",
                        ShowHeader: true,
                        ShowCloseIcon: true,
                        ShowToggleMaximizeIcon: true
                    },
                    Resource: {
                        Text: objTextResource,
                        TextResourcesKey: "AddEdit" + strType + "Task",
                        SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                        JConfiguration: objContext.props.JConfiguration
                    },
                    Events: {
                        InitializeGrid: () => { InitializeGrid(objContext) }
                    },
                    CallBacks: {
                        OnAddEditComplete: (objReturnData) => objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": objReturnData } }),
                        OpenEditorOnSaveTask: (objReturnData) => this.OpenTaskInEditor(objContext, objReturnData),
                        EditCallBack: fnEditCallBack
                    },
                    ParentProps: objContext.props
                });
            }
            else {
                Popup.ShowErrorPopup({
                    Data: {},
                    Meta: {
                        "ShowHeader": true,
                        "ShowCloseIcon": true,
                    },
                    Resource: {
                        Text: objTextResource,
                        TextResourcesKey: blnIsEdit ? "ErrorPopup" : "AddErrorPopup",
                        SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                    },
                    CallBacks: {}
                });
            }
        }

    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @param {object} objSelectedRow SelectedRow
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenDeletePopup(objContext, objSelectedRow = null, blnFromTree = false) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        let arrSelectedRows = [];
        if (!objSelectedRow) {
            arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TaskGrid"] : [];
        }
        else {
            arrSelectedRows = [objSelectedRow];
        }
        let blnIsTask;

        var strDeleteVariables = "";
        arrSelectedRows.map(objSelectedRows => {
            strDeleteVariables = strDeleteVariables + (objSelectedRows["vPageName"] ? objSelectedRows["vPageName"] : objSelectedRows["vPageFolderName"]) + ", ";
            blnIsTask = objSelectedRows["vPageName"] ? true : false;
        });

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => {
                        blnIsTask ? this.DeleteTask(arrSelectedRows, strPopupId, objContext) : this.DeleteTaskFolder(arrSelectedRows, strPopupId, blnFromTree)
                    }
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteTask
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {string} strPopupId PopupId
     * @param {object} objContext objContext
     * @summary Deletes Task and close popup on success
     */
    DeleteTask(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iFolderId": objContext.props.FolderId
                    }
                }
            ]
        }
        objParams = {

            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.ClientUserDetails.uUserId

        };

        Object_Intranet_Task_Task.DeleteData(objParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(strPopupId);
                let fnSelectAdjacentGridRow = ApplicationState.GetProperty("SelectAdjacentGridRow") && ApplicationState.GetProperty("SelectAdjacentGridRow")["TaskGrid"] ? ApplicationState.GetProperty("SelectAdjacentGridRow")["TaskGrid"] : null;
                if (fnSelectAdjacentGridRow) {
                    fnSelectAdjacentGridRow(arrSelectedRows);
                }
            }
        });
    }

    /**
     * @name DeleteTaskFolder
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {string} strPopupId PopupId
     * @summary Deletes TaskFolder and close popup on success
     */
    DeleteTaskFolder(arrSelectedRows, strPopupId, blnFromTree) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Task_TaskFolder.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                Popup.ClosePopup(strPopupId);
                if (blnFromTree) {
                    let fnSelectAdjacentGridRow = ApplicationState.GetProperty("SelectAdjacentTreeNode") && ApplicationState.GetProperty("SelectAdjacentTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectAdjacentTreeNode")["Tree_Master"] : null;
                    if (fnSelectAdjacentGridRow) {
                        fnSelectAdjacentGridRow(objReturn[0]);
                    }
                }
                else {
                    let fnSelectAdjacentGridRow = ApplicationState.GetProperty("SelectAdjacentGridRow") && ApplicationState.GetProperty("SelectAdjacentGridRow")["TaskGrid"] ? ApplicationState.GetProperty("SelectAdjacentGridRow")["TaskGrid"] : null;
                    if (fnSelectAdjacentGridRow) {
                        fnSelectAdjacentGridRow(arrSelectedRows);
                    }
                }                
            }
        });
    }

    /**
     * @name IsForInternalTestingTask
     * @param {object} objContext objContext
     * @summary Gets the cIsForInternalTesting of Parent Folder
     */
    IsForInternalTestingTask(objContext) {
        let blncIsForInternalTesting = false;
        let objFolderData = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"].find(objFolder => { return objFolder["iPageFolderId"] == objContext.props.FolderId });
        if (objFolderData) {
            blncIsForInternalTesting = objFolderData["cIsForInternalTesting"] ? objFolderData["cIsForInternalTesting"] : false;
        }
        return blncIsForInternalTesting;
    }

    /**
     * @name GetSubjectId
     * @param {string} strSubSubjectId subject Id
     * @param {object} objContext objContext
     * @summary Gets the subject Id/ parent subject id
     */
    GetSubjectId(strSubSubjectId, objContext) {
        let objSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSubject => {
            return objSubject["iSubjectId"] == strSubSubjectId
        });
        if (objSubSubject) {
            return objSubSubject["iParentSubjectId"];
        }
    }

    /**
     * @name GetTaskDetails
     * @param {object} objContext objContext
     * @param {object} objSelectedRow SelectedRow
     * @summary Gets the property details to be displayed on TaskDisplayProperties
     */
    GetTaskDetails(objContext, objSelectedRow) {
        var strSubjectName = "", strSubSubjectName = "", strCategoryName = "", strCategoryCompetencyName = "", strCompetencyRangeName = "", strCompetencyLevelName = "", strWorkFlowStatus = "", strWorkFlowComment = "", strTasktype = "", strTaskUsage = "",
            strOwner = "", strEditedBy = "", strDifficultyLevel = "";

        //Getting subject and SubSubject Names
        let objSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSubject => {
            return objSubject["iSubjectId"] == objSelectedRow["iSubjectId"]
        });
        if (objSubSubject) {
            let objSubSubjectData = objSubSubject.t_TestDrive_Subject_Data.find(objSubjectData => { return objSubjectData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strSubSubjectName = objSubSubjectData ? objSubSubjectData["vSubjectName"] : "";
            let objSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSubject => {
                return objSubject["iSubjectId"] == objSubSubject["iParentSubjectId"]
            });
            if (objSubject) {
                let objSubjectData = objSubject.t_TestDrive_Subject_Data.find(objSubjectData => { return objSubjectData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
                strSubjectName = objSubjectData ? objSubjectData["vSubjectName"] : "";
            }
        }

        //Getting Category Name
        let objCategory = DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"].find(objCat => {
            return objCat["iCategoryId"] == objSelectedRow["iCategoryId"]
        });
        if (objCategory) {
            let objCategoryData = objCategory.t_TestDrive_Category_Data.find(objCatData => { return objCatData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strCategoryName = objCategoryData ? objCategoryData["vCategoryName"] : "";
        }

        //Getting CategoryCompetency Name
        let objCategoryCompetency = DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"].find(objComp => {
            return objComp["iCategoryCompetencyId"] == objSelectedRow["iCategoryCompetencyId"]
        });
        if (objCategoryCompetency) {
            let objCategoryCompetencyData = objCategoryCompetency.t_TestDrive_Category_Competency_Data.find(objCompData => { return objCompData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strCategoryCompetencyName = objCategoryCompetencyData ? objCategoryCompetencyData["tCompetencyText"] : "";
        }

        //Competency level
        let objCompetencyLevel = DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyLevel)["Data"].find(objCompetencyLevel => {
            return objCompetencyLevel["iCompetencyLevelId"] == objSelectedRow["iCategoryCompetencyLevelId"]
        });
        if (objCompetencyLevel) {
            let objCompetencyLevelData = objCompetencyLevel.t_testdrive_Category_Competency_CompetencyLevel_Data.find(objCompetencyLevelData => { return objCompetencyLevelData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strCompetencyLevelName = objCompetencyLevelData ? objCompetencyLevelData["cCompetencyLevel"] : "";
        }

        //Competency Range
        let objCompetencyRange = DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyRange)["Data"].find(objCompetencyRange => {
            return objCompetencyRange["iCompetencyRangeId"] == objSelectedRow["iCategoryCompetencyRangeId"]
        });
        if (objCompetencyRange) {
            let objCompetencyRangeData = objCompetencyRange.t_testdrive_Category_Competency_CompetencyRange_Data.find(objCompetencyRangeData => { return objCompetencyRangeData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strCompetencyRangeName = objCompetencyRangeData ? objCompetencyRangeData["vCompetencyRange"] : "";
        }

        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Workflow status      
        if (objSelectedRow.t_CMS_Page_AssignedWorkflowStatus && objSelectedRow.t_CMS_Page_AssignedWorkflowStatus.length > 0) {
            let objLatestWorkFlowStatus = objSelectedRow.t_CMS_Page_AssignedWorkflowStatus.find(objAssignedWorkflowStatus => objAssignedWorkflowStatus["cIsLatest"] == "Y" || objAssignedWorkflowStatus["cIsLatest"] == true && objAssignedWorkflowStatus["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId);
            let objActiveWorkFlowStatus;
            if (objLatestWorkFlowStatus) {
                strWorkFlowComment = objLatestWorkFlowStatus["vComment"];
                objActiveWorkFlowStatus = objContext.state.arrActiveWorkFlowStatuses.find(objActiveWorkFlowStatus => objActiveWorkFlowStatus["uWorkflowStatusId"] == objLatestWorkFlowStatus["uWorkflowStatusId"]);
            }

            if (objActiveWorkFlowStatus) {
                let objActiveWorkFlowStatusData = objActiveWorkFlowStatus.t_TestDrive_WorkflowStatus_Data.find(objActiveWorkFlowStatusData => objActiveWorkFlowStatusData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
                strWorkFlowStatus = objActiveWorkFlowStatusData ? objActiveWorkFlowStatusData["vWorkflowStatus"] : ""
            }
        }

        //Language details
        let arrLanguageIds = objSelectedRow.t_CMS_Page_Language ? objSelectedRow.t_CMS_Page_Language.map(objLanguage => { return objLanguage["iLanguageId"] }) : [];

        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"].map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });

        let arrLanguageDetails = arrLanguageIds.map(iLanguageId => { return objLanguages[iLanguageId] })

        //DifficultyLevel
        //let arrAssignedDifficultyLevelDetails = []
        if (objSelectedRow.t_TestDrive_Task_AssignedTaskDifficultyLevel) {

            let objDifficultyLevels = {}
            DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel)["Data"].map(objDifficultyLevel => {
                objDifficultyLevel.t_TestDrive_Task_TaskDifficultyLevel_Data.map(objDifficultyLevelData => {
                    if (objDifficultyLevelData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
                        objDifficultyLevels = { ...objDifficultyLevels, [objDifficultyLevel.iTaskDifficultyLevelId]: objDifficultyLevelData.vTaskDifficultyLevelName }
                })
            })

            objSelectedRow.t_TestDrive_Task_AssignedTaskDifficultyLevel.map(objAssignedDifficultyLevel => {
                if (objAssignedDifficultyLevel["iSchoolYearId"] == -1) {
                    strDifficultyLevel = objDifficultyLevels[objAssignedDifficultyLevel["iTaskDifficultyLevelId"]]
                }
            })

            //for multiple school year settings

            //let objSchoolYears = {}
            //DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"].map(objSchoolYear => {
            //    objSchoolYear.t_TestDrive_Member_Class_SchoolYear_Data.map(objSchoolYearData => {
            //        if (objSchoolYearData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
            //            objSchoolYears = { ...objSchoolYears, [objSchoolYear.iSchoolYearId]: objSchoolYearData.vSchoolYearName }
            //    })
            //})
            //arrAssignedDifficultyLevelDetails = objSelectedRow.t_TestDrive_Task_AssignedTaskDifficultyLevel.map(objAssignedDifficultyLevel => { return { "SchoolYear": objSchoolYears[objAssignedDifficultyLevel["iSchoolYearId"]], "DifficultyLevel": objDifficultyLevels[objAssignedDifficultyLevel["iTaskDifficultyLevelId"]] } })
        }

        //Additional Properties
        let arrAssignedAdditionalPropertyDetails = []
        if (objSelectedRow.t_TestDrive_Task_AssignedAdditionalTaskProperty) {
            let objAdditionalProperties = {}
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalProperty)["Data"].map(objAdditionalProperty => {
                objAdditionalProperty.t_TestDrive_Task_AdditionalTaskProperty_Data.map(objAdditionalPropertyData => {
                    if (objAdditionalPropertyData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
                        objAdditionalProperties = { ...objAdditionalProperties, [objAdditionalProperty.iAdditionalTaskPropertyId]: [objAdditionalPropertyData.vAdditionalTaskProperty] }
                })
            })
            let objAdditionalPropertyValues = {}
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"].map(objAdditionalPropertyValue => {
                objAdditionalPropertyValue.t_TestDrive_Task_AdditionalTaskProperty_Value_Data.map(objAdditionalPorpertyValueData => {
                    objAdditionalPropertyValues = { ...objAdditionalPropertyValues, [objAdditionalPropertyValue.iAdditionalTaskPropertyValueId]: objAdditionalPorpertyValueData.vAdditionalTaskPropertyValueText }
                })
            })

            arrAssignedAdditionalPropertyDetails = objSelectedRow.t_TestDrive_Task_AssignedAdditionalTaskProperty.map(objAssignedAdditionalProperty => {
                return { "PropertyName": objAdditionalProperties[objAssignedAdditionalProperty["iAdditionalTaskPropertyId"]], "PropertyValue": objAdditionalPropertyValues[objAssignedAdditionalProperty["iAdditionalTaskPropertyValueId"]] }
            })
        }
        //TaskType and TaskUsage

        switch (objSelectedRow.iTaskTypeId) {
            case 1:
                strTasktype = "Test";
                break;
            case 2:
                strTasktype = "Manual";
                break;
            case 3:
                strTasktype = "Demo";
                break;
            case 4:
                strTasktype = "Interrogation List";
                break;
            case 5:
                strTasktype = "Break";
                break;
            case 6:
                strTasktype = "Survey";
                break;
            default:
                strTasktype = "";
        }

        switch (objSelectedRow.iTaskUsageId) {
            case 1:
                strTaskUsage = "Learning Task";
                break;
            case 2:
                strTaskUsage = "Examination Paper";
                break;
            case 3:
                strTaskUsage = "Test Task";
                break;
            case 5:
                strTaskUsage = "ShowCase Task";
                break;
            case 6:
                strTaskUsage = "Survey Task";
                break;
            case 7:
                strTaskUsage = "Presentation Task";
                break;
            default:
                strTaskUsage = "";
        }

        //Separation And Calibration details
        let arrSeparationAndCalibrationTaskDetails = [];
        if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'Y') {
            arrSeparationAndCalibrationTaskDetails = DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationTask)["Data"]
                .filter(objSepTask => objSepTask["iTaskId"] == objSelectedRow["iPageId"])
                .map(objTask => {
                    let objGroup = DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"].find(obj => obj["uSeparationAndCalibrationGroupId"] == objTask["uSeparationAndCalibrationGroupId"]);
                    let strGroupName = objGroup ? objGroup.t_TestDrive_SeparationAndCalibration_Group_Data.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId)["vGroupName"] : "";
                    let objInputStatus = DataRef(objContext.props.Object_Intranet_Test_InputStatus)["Data"].find(obj => obj["iInputStatusId"] == objTask["iInputStatusId"]);
                    let strInputStatusName = objInputStatus ? objInputStatus.t_TestDrive_InputStatus_Data.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId)["vInputStatusName"] : "";

                    return {
                        ...objTask,
                        ["GroupName"]: strGroupName,
                        ["InputStatusName"]: strInputStatusName
                    }
                });
            if (arrSeparationAndCalibrationTaskDetails.length == 0)
                arrSeparationAndCalibrationTaskDetails = [{ "NotAssigned": true }]
        }


        let objTaskDetails = {
            ...objSelectedRow,
            strTasktype: strTasktype,
            strTaskUsage: strTaskUsage,
            strSubjectName: strSubjectName,
            strSubSubjectName: strSubSubjectName,
            strCategoryName: strCategoryName,
            strCategoryCompetencyName: strCategoryCompetencyName,
            strCompetencyRangeName: strCompetencyRangeName,
            strCompetencyLevelName: strCompetencyLevelName,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            strWorkFlowStatus: strWorkFlowStatus,
            strWorkFlowComment: strWorkFlowComment,
            arrLanguageDetails: arrLanguageDetails,
            //arrAssignedDifficultyLevelDetails: arrAssignedDifficultyLevelDetails,
            strDifficultyLevel: strDifficultyLevel,
            arrAssignedAdditionalPropertyDetails: arrAssignedAdditionalPropertyDetails,
            arrSeparationAndCalibrationTaskDetails: arrSeparationAndCalibrationTaskDetails
        };

        return objTaskDetails;
    }

    /**
     * @name GetTaskFolderDetails
     * @param {object} objContext objContext
     * @param {object} objSelectedRow SelectedRow
     * @summary Gets the property details to be displayed on TaskFolderDetails
     */
    GetTaskFolderDetails(objContext, objSelectedRow) {
        let strOwner = "", strEditedBy = "";
        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Language details
        let arrLanguageIds = objSelectedRow.t_CMS_FileSystem_PageFolder_Langauge ? objSelectedRow.t_CMS_FileSystem_PageFolder_Langauge.map(objLanguage => { return objLanguage["iLanguageId"] }) : [];
        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"].map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });
        let arrLanguageDetails = arrLanguageIds.map(iLanguageId => { return objLanguages[iLanguageId] })

        let objTaskFolderDetails = {
            ...objSelectedRow,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            arrLanguageDetails: arrLanguageDetails,
        };

        return objTaskFolderDetails;
    }

    /**
     * @name GetAdministratorName
     * @param {string} strUserId uUserId
     * @param {object} objContext objContext
     * @summary Gets the administrator name for the UserId
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"];
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }

    /**
     * @name GetNonDeletedData
     * @param {array} arrData arrData
     * @param {string} strKey strKey to filter
     * @param {strValue} strValue strValue
     * @summary return the filtered data
     */
    GetNonDeletedData(arrData, strKey = "cIsDeleted", strValue = "N") {
        return arrData.filter(objData => { return objData[strKey] == strValue });
    }

    /**
     * @name to get the previous or next task
     * @param {object} objContext {state, props, dispatch, ...}
     * @param {string} strTaskId current task id
     * @param {string} strType Next/Previous
     * @summary Returns the adjacent task data.
     * @returns {obejct} Task Properties.
     */
    GetAdjacentTask(objContext, strTaskId, strType) {
        let arrTaskData = objContext.state.blnSearchMode ? objContext.state.arrFilterdTaskData : DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;" + objContext.props.FolderId).Data;
        let intTaskIndex;
        arrTaskData.map((objTaskItem, intIndex) => {
            if (objTaskItem.iPageId == strTaskId) {
                intTaskIndex = intIndex;
            }
        });
        let objTaskData = null;
        while (objTaskData === null && intTaskIndex >= 0 && intTaskIndex < arrTaskData.length) {
            intTaskIndex = strType.toLowerCase() == "previous" ? intTaskIndex - 1 : intTaskIndex + 1;
            //if (this.OnBeforeGridRowRender(arrTaskData[intTaskIndex])) {
            if (arrTaskData[intTaskIndex] && arrTaskData[intTaskIndex]["iFolderId"] == ApplicationState.GetProperty("FolderId") && arrTaskData[intTaskIndex]["cIsDeleted"] == "N") {
                objTaskData = { ...arrTaskData[intTaskIndex] };
            }
        }
        return objTaskData;
    }


    /**
     * @name OpenTaskInEditor
     * @param {object} objContext {state, props, dispatch, ...}
     * @param {object} objPageProperties task data
     * @summary Opens up Editor for selected/passed task.
     */
    OpenTaskInEditor(objContext, objPageProperties = null, intLaguageId = null) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        intLaguageId = intLaguageId ?? JConfiguration.InterfaceLanguageId;
        if (objPageProperties == null) {
            objPageProperties = objSelectedRows && objSelectedRows["TaskGrid"] && objSelectedRows["TaskGrid"][0] ? objSelectedRows["TaskGrid"][0] : null;
        }
        if (objSelectedRows && objSelectedRows["TaskGrid"] && objSelectedRows["TaskGrid"].length > 0) {
            let arrPageIds = [], arrTaskProperties = [];
            objSelectedRows["TaskGrid"].forEach(objTemp => {
                if (objTemp.iPageId) {
                    let strWorkFlowStatus = this.GetWorkFlowStatus(objTemp, objContext, true);
                    arrPageIds = [...arrPageIds, parseInt(objTemp["iPageId"])];
                    arrTaskProperties = [...arrTaskProperties, { ...objTemp, "WorkFlowStatus": strWorkFlowStatus }];
                }
            });
            if (arrPageIds.length > 0 && arrTaskProperties.length > 0) {
                objContext.props.JConfiguration["IsSSREnabled"] = objContext.props.JConfiguration["IsSSREnabled_Editor"];
                let objParams = {
                    "Data": {
                        "PageIds": arrPageIds,
                        "LanguageId": intLaguageId,
                        "SubjectForMainClient": DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"],
                        "TaskProperties": arrTaskProperties,
                        "LanguageData": DataRef(objContext.props.Object_Cockpit_Language)["Data"],
                        "IsFirstTask": this.GetAdjacentTask(objContext, arrPageIds[arrPageIds.length - 1], "previous") == -1,
                        "IsLastTask": this.GetAdjacentTask(objContext, arrPageIds[arrPageIds.length - 1], "last") == -1,
                        "ContentUsageGroupId": null,
                        "MultiMediaUsageGroupId": null,
                        "LoadEditorFor": "intranet"
                    },
                    "CallBacks": {
                        "GetAdjacentTask": (strTaskId, strType) => {
                            let objPageProperties = this.GetAdjacentTask(objContext, strTaskId, strType);
                            return objPageProperties;
                        },
                        "GetAdjacentTaskStatus": (strTaskId, strType) => {
                            let objPageProperties = this.GetAdjacentTask(objContext, strTaskId, strType);
                            return objPageProperties != null;
                        },
                        "OpenTaskEditPopup": (objTaskData, fnEditCallBack) => {
                            objContext.Task_ModuleProcessor.OpenAddEditTaskPopup(objContext, "", true, objTaskData, fnEditCallBack);
                        },
                        "TaskSaveCallback": (iPageId) => {
                            this.TaskSaveEditorCallback(objContext, iPageId);
                        },
                        "GenerateTaskPdf": (objTaskData, objPageJson) => {
                            this.GenerateTaskPdf(objContext, objTaskData, intLaguageId, "Task", objPageJson)
                        }
                    },
                    "Events": {},
                    "ParentProps": {
                        "JConfiguration": objContext.props.JConfiguration,
                        "ClientUserDetails": objContext.props.ClientUserDetails,
                    }
                };
                let Editor = objContext.props.ComponentController.GetComponent("Editor")
                Editor.load().then(obj => {
                    new obj.default().OpenEditor(objParams)
                });
            }
            else {
                let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
                Popup.ShowErrorPopup({
                    Data: {},
                    Meta: {
                        "ShowHeader": true,
                        "ShowCloseIcon": true,
                    },
                    Resource: {
                        Text: objTextResource,
                        TextResourcesKey: "EditorErrorPopup",
                        SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                    },
                    CallBacks: {}
                });
            }
        }
    }

    /**
     * @name ShowEditor
     * @summary Sets ShowEditor as true in ApplicationState
     */
    ShowEditor() {
        ApplicationState.SetProperty("ShowEditor", true);
    }

    /**
     * @name TaskSaveEditorCallback
     * @param {object} objContext objContext
     * @param {iPageId} iPageId iPageId
     * @summary To update Task on Editor Content Save
     */
    TaskSaveEditorCallback(objContext, iPageId) {
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iFolderId": ApplicationState.GetProperty("FolderId")
                        }
                    }
                ]
            },
            "vEditData": [
                {
                    "iPageId": iPageId
                }
            ],
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        Object_Intranet_Task_Task.EditData(objParams, (objReturn, cIsNewData) => {
        });
    }

    /**
     * @name Search
     * @param {object} objContext objContext
     * @summary Search the task based on given inputs(Name,Task Id, folder, WorkFlowStatus)
     */
    Search(objContext, objDetails) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": true } });
        let blnIsTaskName = isNaN(objDetails.strSearchText);
        let objTaskIdMatch = {};
        let intSearchId = -1;
        let objWildcard = {
            "wildcard": {
                "vPageName": "*" + objDetails.strSearchText.toLowerCase() + "*"
            }
        };
        if (!blnIsTaskName && objDetails.strSearchText != "") {
            objTaskIdMatch = {
                "match": {
                    "iPageId": parseInt(objDetails.strSearchText)
                }
            }
            intSearchId = parseInt(objDetails.strSearchText);
        }

        let objFolderMatch = {
            "match": {
                "iFolderId": objContext.props.FolderId
            }
        }
        let objWorkFlowMatch = {
            "match": {
                "uWorkflowStatusId": objDetails.struWorkflowStatusId
            }
        }
        let objIsInternalTestingMatch = {
            "match": {
                "cIsForInternalTesting": objDetails.blnInternalTesting ? "Y" : "N"
            }
        }

        let arrMustQuery = [];
        if (objDetails.blnSearchFromSameFolder) {
            if (objDetails.struWorkflowStatusId != -1) {
                arrMustQuery = [objWildcard, objFolderMatch, objWorkFlowMatch, objTaskIdMatch, objIsInternalTestingMatch]
            }
            else {
                arrMustQuery = [objWildcard, objFolderMatch, objTaskIdMatch, objIsInternalTestingMatch]
            }
        }
        else {
            if (objDetails.struWorkflowStatusId != -1) {
                arrMustQuery = [objWildcard, objWorkFlowMatch, objTaskIdMatch, objIsInternalTestingMatch]
            }
            else {
                arrMustQuery = [objWildcard, objTaskIdMatch, objIsInternalTestingMatch]
            }
        }

        let objParams = {
            "SearchQuery": {
                "must": arrMustQuery
            }
        };

        let arrDataRequest = [
            {
                "URL": "API/Object/Intranet/Task",
                "Params": objParams,
                "MethodType": "Get",
            }
        ];
        let arrFolderData = objDetails.blnSearchFromSameFolder ? DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"].filter(obj => obj["iPageParentFolderId"] == objContext.props.FolderId && obj["cIsDeleted"] == "N") : DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"];
        arrFolderData = arrFolderData ? arrFolderData : [];
        if (objDetails.strSearchText != "") {
            if (intSearchId != -1)
                arrFolderData = arrFolderData.filter(objFolderData => objFolderData["iPageFolderId"] == intSearchId)
            else
                arrFolderData = arrFolderData.filter(objFolderData => objFolderData["vPageFolderName"].toLowerCase().includes(objDetails.strSearchText.toLowerCase()))
        }
        if (arrFolderData?.length > 0)
            GetObjectListForModule("Task", objContext, true, arrFolderData);
        ArcadixFetchData.Execute(arrDataRequest, function (objReturn, blnIsDataPresent) {
            if (blnIsDataPresent) {
                var arrFilterdTaskData = Object.values(objReturn.Object_Intranet_Task_Task)[0].Data ? Object.values(objReturn.Object_Intranet_Task_Task)[0].Data : objReturn.Object_Intranet_Task_Task["Data"];                
                objContext.dispatch({ type: "SET_STATE", payload: { "arrFilterdTaskData": [...arrFolderData, ...arrFilterdTaskData] } });
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": null });
                let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["TaskGrid"] : null;
                if (fnResetGridSelection) {
                    fnResetGridSelection();
                }
                setTimeout(() => {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }, 500)
            }
        });
    }

    /**
     * @name SearchCancel
     * @param {object} objContext objContext
     * @summary Handle for Search Cancel
     */
    SearchCancel(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false } });
    }

    /**
     * @name HandleChange
     * @param {object} objContext objContext
     * @param {object} objValue objValue
     * @param {string} strType strType
     * @summary Handles changes in search inputs
     */
    HandleChange(objContext, objValue, strType) {
        switch (strType) {
            case "SearchInput":
                objContext.dispatch({ type: "SET_STATE", payload: { "strSearchText": objValue, "blnSearchMode": false } });
                break;
            case "SearchOption":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchFromSameFolder": Boolean(Number(objValue["OptionId"])), "blnSearchMode": false } });
                break;
            case "WorkFlowStatus":
                objContext.dispatch({ type: "SET_STATE", payload: { "struWorkflowStatusId": objValue["uWorkflowStatusId"], "blnSearchMode": false } });
                break;
            case "InternalTesting":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnInternalTesting": objValue, "blnSearchMode": false } });
                break;
        }
    }

    /**
     * @name GetSearchDropDownData
     * @param {object} objContext objContext
     * @summary gets SearchDropDownData
     */
    GetSearchDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        var arrDropDownData = [
            {
                "OptionId": 1,
                "OptionText": objTextResource["This_Folder"]
            },
            {
                "OptionId": 0,
                "OptionText": objTextResource["All_Folder"]
            }
        ]
        return arrDropDownData;
    }

    /**
     * @name OpenAddEditTaskFolderPopup
     * @param {object} objContext passes Context object
     * @param {object} objRowData selected row data
     * @param {boolean} blnIsEdit is either edit or Add 
     * @summary Call tabbed popup for Add/Edit of Task folder
     * @return null
     */
    OpenAddEditTaskFolderPopup(objContext, objRowData, blnIsEdit) {
        var objSelectedRow = this.GetSelectedRow(objContext, objContext.props.FolderId);
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        let intApplicationTypeForTaskData = 2;
        if (objRowData["iPageFolderId"] == undefined && objRowData["iPageId"]) {
            if (objRowData["iFolderId"] == 0) {
                objRowData = {
                    "iPageFolderId": 0,
                    "iPageParentFolderId": -1
                }
            }
            else {
                objRowData = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"].find(objTaskFolder => objTaskFolder["iPageFolderId"] == objRowData["iFolderId"]);
            }
        }
        if (objRowData["iPageFolderId"]) {
            Popup.ShowTabbedPopup({
                Data: {
                    LanguageData: DataRef(objContext.props.Object_Cockpit_Language)["Data"],
                    MainClientLanguageData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"],
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForTaskData),
                    //Object_Intranet_Task_TaskFolder: objContext.props.Object_Intranet_Task_TaskFolder,
                    FolderId: objContext.props.FolderId,
                    objSelectedRow: objSelectedRow,
                    objRowData: objRowData,
                    IsEdit: blnIsEdit,
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    DropDownData: {
                        SkinData: DataRef(objContext.props.Object_Cockpit_Skin)["Data"]
                    }

                },
                Meta: {
                    PopupName: "AddEditTaskFolder",
                    HeaderData: AddEditTaskFolder_MetaData.GetAddEditMetaData(),
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
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name GetSelectedRow
     * @param {object} objContext objContext
     * @param {string} strFolderId FolderId
     * @summary Returns the selected row
     * @returns {object} objSelectedRow
     */
    GetSelectedRow(objContext, strFolderId) {
        var objSelectedRow;
        if (!strFolderId) {
            objSelectedRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TaskGrid"] ? ApplicationState.GetProperty("SelectedRows")["TaskGrid"][0] : {};
        }
        else {//Called from the tree
            objSelectedRow = objContext.props.Object_Intranet_Task_TaskFolder.Data.find(objTaskFolder => { return objTaskFolder.iPageFolderId == strFolderId });
        }
        return objSelectedRow ? objSelectedRow : {};
    }

    /**
     * @name GetTaskGridData
     * @param {object} objContext objContext
     * @summary it returns the object for TaskGrid Data
     * @returns {object} Data
     */
    GetTaskGridData(objContext) {
        let arrRowData = [];
        if (objContext.state.blnSearchMode) {
            arrRowData = objContext.state.arrFilterdTaskData ?? []
        }
        else {
            let strFolderId = objContext.props.IsForServerRenderHtml ? 0 : objContext.props.FolderId; //as only root folder content will be loaded during SSR
            let arrTaskData = DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;" + strFolderId).Data ?? [];
            arrTaskData = arrTaskData ? arrTaskData : [];
            let arrFolderData = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"]?.filter(obj => obj["iPageParentFolderId"] == strFolderId && obj["cIsDeleted"] == "N") ?? [];
            arrRowData = [...arrFolderData, ...arrTaskData];
        }
        let intApplicationTypeForLanguageData = 2;
        return {
            RowData: arrRowData,
            AdditionalPaddingIds: ["FilterBlock"],
            LanguageData: objContext.Task_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
        };
    }

    /**
     * @name GetTaskMetaData
     * @param {object} objContext objContext
     * @summary it returns the object for TaskGrid Meta Data
     * @returns {object} Data
     */
    GetTaskMetaData(objContext) {
        return {
            HeaderData: Task_MetaData.GetMetaData(),
            Filter: null,
            PrimaryKey: "Id",
            AllowDragDrop: true
        };
    }

    /**
     * @name GetResourceData
     * @param {object} objContext objContext
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceData(objContext) {
        //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
     * @name GetTaskGridEvents
     * @param {object} objContext objContext
     * @summary Returns object that contains all the Events methods.
     * @return {object}
     */
    GetTaskGridEvents(objContext) {
        let objEvents = {
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
            OnContextMenuClick: (objRowData, event, arrCheckedRows) => this.OnContextMenuClick(objRowData, event, objContext, arrCheckedRows),
            OnDoubleClick: (objRowData, event) => this.OnDoubleClick(objRowData, objContext),
            OnDragDrop: (objDragDetails, objDropDetails) => this.OnDragDrop(objDragDetails, objDropDetails, objContext)
        };
        return objEvents;
    }

    /**
     * @name OnDragDrop
     * @param {object} objDragDetails objDragDetails
     * @param {object} objDropDetails objDropDetails
     * @param {object} objContext objContext
     * @summary Handles on dragdrop event
     * @return {object}
     */
    OnDragDrop(objDragDetails, objDropDetails, objContext) {
        if (!objDropDetails.Type) {
            objDropDetails.Type = "Folder"; //Type will be null, when we drop into the Tree, so making it Folder
        }
        if (objDropDetails.Type == "Folder" && objDragDetails.Id != objDropDetails.Id) {
            let objDragData = null;
            if (objDragDetails.Type == "Folder") {
                objDragData = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"]?.find(obj => obj["iPageFolderId"] == objDragDetails.Id);
            }
            else {
                objDragData = DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;" + objContext.props.FolderId).Data?.find(obj => obj["iPageId"] == objDragDetails.Id);
            }
            if (objDragData && objDropDetails.Id) {
                this.CutPaste([objDragData], objDropDetails.Id, objContext, false);
            }
        }
    }

    /**
     * @name OnClickRow
     * @param {object} objSelectedRow
     * @param {object} objContext
     * @summary Handles the click event of the grid.
     */
    OnClickRow(objSelectedRow, objContext) {
        //objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": objSelectedRow } });
    }

    /**
    * @name OnContextMenuClick
    * @param {object} objRowData
    * @param {object} event
    * @param {object} objContext
    * @summary Handles the click event of the grid.
    */
    OnContextMenuClick(objRowData, objEvent, objContext, arrCheckedRows) {
        let objContextMenu = {
            Data: this.GetContextMenuData(objRowData, objContext, arrCheckedRows),
            objEvent: { clientX: objEvent.clientX, clientY: objEvent.clientY }
        };
        //objEvent.preventDefault();
        //objEvent.stopPropagation();
        let fnShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
        fnShowContextMenu(objContextMenu);
        //ApplicationState.SetProperty("ContextMenuDetails", objContextMenu);
    }

    /**
     * @name GetContextMenuData
     * @param {object} objRowData objRowData
     * @param {object} objContext objContext
     * @param {array} arrCheckedRows CheckedRows
     * @summary Forms the data for Context menu.
     * @return {object} arrContextListSample
     */
    GetContextMenuData(objRowData, objContext, arrCheckedRows) {
        let arrContextListSample = [];
        if (objRowData.iPageId) {
            let objData = {
                objContext,
                MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], 2),
                OpenAddEditTaskPopup: (strType = "", blnIsEdit = false) => this.OpenAddEditTaskPopup(objContext, strType, blnIsEdit, objRowData),
                DeleteTask: () => this.OpenDeletePopup(objContext, objRowData),
                OnTaskPreviewClick: (strLanguageId, strWindowToOpen) => this.OnTaskPreviewContextMenuClick(objContext, objRowData, strWindowToOpen, strLanguageId),
                //IsShowTaskPreview: objRowData.t_CMS_Page_Container.length > 0 ? true : false,
                AddTaskFolder: () => this.OpenAddEditTaskFolderPopup(objContext, objRowData, false),
                IsSearch: objContext.state.blnSearchMode,
                GoToFolder: () => this.GoToFolder(objRowData, objContext),
                CutTask: () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": { "Type": "Cut", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } }) },
                CopyTask: () => {
                    ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": { "Type": "Copy", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } })
                },
                ConvertTaskType: (strToTaskType) => { this.ConvertTaskType(objRowData, strToTaskType, objContext) },
                OpenTaskInEditor: (intLanguageId) => this.OpenTaskInEditor(objContext, objRowData, intLanguageId),
                OnTaskQuestionClick: () => this.OnTaskQuestionClick(objContext, objRowData),
                TaskUsage: objRowData.iTaskUsageId != null ? objContext.Task_ModuleProcessor.GetTaskUsage(objRowData, objContext) : "",
                OnGenerateTaskPdfClick: (strLanguageId) => this.GenerateTaskPdf(objContext, objRowData, strLanguageId, "Task")
            };
            arrContextListSample = Task_ContextMenuData.GetTaskContextMenuData(objData);
        }
        else {
            let objData = {
                objContext,
                MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], 2),
                AddTaskFolder: () => this.OpenAddEditTaskFolderPopup(objContext, objRowData, false),
                EditTaskFolder: () => this.OpenAddEditTaskFolderPopup(objContext, objRowData, true),
                DeleteTaskFolder: () => this.OpenDeletePopup(objContext, objRowData, objRowData.Id ? false : true),
                CutFolder: () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": { "Type": "Cut", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } }) },
                CopyFolder: () => {
                    ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": { "Type": "Copy", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } })
                },
                PasteFolder: () => this.PasteFolder(objContext, objRowData.iPageFolderId),
                PasteAsShortcut: () => this.PasteAsShortcut(objContext, objRowData.iPageFolderId),
                OpenAddEditTaskPopup: (strType = "", blnIsEdit = false, objSelectedRow = null) => this.OpenAddEditTaskPopup(objContext, strType, blnIsEdit, objSelectedRow),
                ResetWorkflowStatus: (iFrameworkLanguageId) => { this.ResetWorkflowStatus(objContext, objRowData.iPageFolderId, iFrameworkLanguageId) },
                TaskExportAsExcel: () => this.TaskExportAsExcel(objContext, objRowData.iPageFolderId),
                OnGenerateTaskPdfClick: (strLanguageId) => this.GenerateTaskPdf(objContext, objRowData, strLanguageId, "TaskFolder")
            };
            if (objRowData.Id) {
                arrContextListSample = Task_ContextMenuData.GetGridTaskFolderContextMenuData(objData);
            }
            else {
                arrContextListSample = Task_ContextMenuData.GetTreeTaskFolderContextMenuData(objData);
            }
        }
        return arrContextListSample;
    }

   /**
    * @name OnTaskPreviewContextMenuClick
    * @param {any} objContext
    * @param {any} objRowData
    * @param {any} StrWindowToOpen
    * @param {any} strLanguageId
    * @summary Opens the task preview.
    */
    OnTaskPreviewContextMenuClick(objContext, objRowData, StrWindowToOpen, strLanguageId) {
        if (StrWindowToOpen == 'SameWindow') {
            var TaskDetails = { 'iPageId': objRowData["iPageId"], 'iLanguageId': strLanguageId };
            Popup.ShowPopup({
                Data: {
                    ModuleName: "TaskPreview"
                },
                Meta: {
                    PopupName: "TaskPreview",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: '100vh',
                    Width: '100%',
                    HeaderData: []
                },
                TaskDetails: TaskDetails,
                Resource: {
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
            });
        }
        else {
            let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + "TaskPreview?TaskId=" + objRowData["iPageId"] + "&LanguageId=" + strLanguageId;
            window.open(vHostUrl, '_blank');
        }
    }

    /**
     * @name ConvertTaskType
     * @param {object} objRowData objRowData
     * @param {string} strToTaskType strToTaskType
     * @param {object} objContext objContext
     * @summary Forms the data for Context menu.
     * @return {object} Handles convert task type event
     */
    ConvertTaskType(objRowData, strToTaskType, objContext) {
        let objEditedTask = {}, strTaskTypeId, strTaskUsageId, strAdaptiveTask;
        switch (strToTaskType) {
            case "Presentation":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 2, ["iTaskUsageId"]: 7, ["cIsAdaptiveTask"]: "N" };
                break;
            case "Demo":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 1, ["iTaskUsageId"]: 5, ["cIsAdaptiveTask"]: "N" };
                break;
            case "Learning":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 1, ["iTaskUsageId"]: 1, ["cIsAdaptiveTask"]: "N" };
                break;
            case "LowStake":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 1, ["iTaskUsageId"]: 2, ["cIsAdaptiveTask"]: "N" };
                break;
            case "HighStake":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 1, ["iTaskUsageId"]: 3, ["cIsAdaptiveTask"]: "N" };
                break;
            case "HighStakeExample":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 3, ["iTaskUsageId"]: 3, ["cIsAdaptiveTask"]: "N" };
                break;
            case "HighStakeIntro":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 2, ["iTaskUsageId"]: 3, ["cIsAdaptiveTask"]: "N" };
                break;
            case "HighStakeBreak":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 5, ["iTaskUsageId"]: 3, ["cIsAdaptiveTask"]: "N" };
                break;
            case "HighStakeSurvey":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 6, ["iTaskUsageId"]: 3, ["cIsAdaptiveTask"]: "N" };
                break;
            case "HighStakeSurveyList":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 4, ["iTaskUsageId"]: 3, ["cIsAdaptiveTask"]: "N" };
                break;
            case "HighStakeAdaptive":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 1, ["iTaskUsageId"]: 3, ["cIsAdaptiveTask"]: "N" };
                break;
            case "Survey":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 6, ["iTaskUsageId"]: 6, ["cIsAdaptiveTask"]: "N" };
                break;
            case "SurveyList":
                objEditedTask = { ...objRowData, ["iTaskTypeId"]: 4, ["iTaskUsageId"]: 6, ["cIsAdaptiveTask"]: "N" };
                break;
        }
        let objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iFolderId": ApplicationState.GetProperty("FolderId")
                    }
                }
            ]
        }
        let objParams = {
            "SearchQuery": objSearchQuery,
            "vEditData": [objEditedTask],
            "uUserId": objContext.props.ClientUserDetails.UserId

        };
        Object_Intranet_Task_Task.EditData(objParams, (objReturn, cIsNewData) => {
            console.log(objReturn)
        })
    }

    /**
     * @name GetTaskGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object}
     */
    GetTaskGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext),
            OnBeforeRowSelect: (objRow) => this.OnBeforeRowSelect(objRow, objContext),
        };
        return objCallBacks;
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {object} objRow
     * @param {object} objContext
     * @summary returns the modified row data
     * @return {object}
     */
    OnBeforeGridRowRender(objRow, objContext) {
        {
            let objReturnRow = null;
            if (objRow.iPageFolderId) {
                if (objContext.state.blnSearchMode) {
                    if (objRow["cIsDeleted"] == "N") {
                        objReturnRow = {
                            ...objRow,
                            Id: objRow.iPageFolderId,
                            Name: objRow.vPageFolderName,
                            ...this.GetTaskTypeInfo(objRow, objContext),
                            WorkFlowIcons: this.GetWorkFlowStatusIcons(objRow, objContext),
                            Adaptive: "SpacerImage",
                            AccessControl: objRow["cIsShortcut"] == "Y" ? "LockOpenShortcutImage" : "LockOpenImage",
                            Type: "FolderImage",
                            Description: objRow.vPageFolderDescription
                        }
                    }
                }
                else {
                    if (objRow["cIsDeleted"] == "N") {
                        objReturnRow = {
                            ...objRow,
                            Id: objRow.iPageFolderId,
                            Name: objRow.vPageFolderName,
                            ...this.GetTaskTypeInfo(objRow, objContext),
                            WorkFlowIcons: this.GetWorkFlowStatusIcons(objRow, objContext),
                            Adaptive: "SpacerImage",
                            AccessControl: objRow["cIsShortcut"] == "Y" ? "LockOpenShortcutImage" : "LockOpenImage",
                            Type: "FolderImage",
                            Description: objRow.vPageFolderDescription
                        }
                    }
                }
            }
            else if (objRow["cIsDeleted"] == "N") {
                objReturnRow = {
                    ...objRow,
                    Id: objRow.iPageId,
                    Name: objRow.vPageName,
                    ...this.GetTaskTypeInfo(objRow, objContext),
                    WorkFlowIcons: this.GetWorkFlowStatusIcons(objRow, objContext),
                    Adaptive: objRow.cIsAdaptiveTask == "Y" ? "BaseImage" : "SpacerImage",
                    WorkFlowStatus: this.GetWorkFlowStatus(objRow, objContext),
                    DifficultyLevel: this.GetDifficultyLevel(objRow, objContext),
                    AccessControl: objRow["cIsShortcut"] == "Y" ? "LockOpenShortcutImage" : "LockOpenImage",
                    Type: "TaskImage",
                    Description: objRow.vPageDescription
                }
            }
            return objReturnRow;

        }
    }

    /**
     * @name OnBeforeRowSelect
     * @param {object} objRow
     * @param {object} objContext
     * @summary returns the selected row data
     * @return {object}
     */
    OnBeforeRowSelect(objRow, objContext) {
        let objReturnRow = null;
        if (objRow.iPageFolderId) {
            if (objContext.state.blnSearchMode) {
                if (objRow["cIsDeleted"] == "N") {
                    objReturnRow = {
                        ...objRow,
                        Id: objRow.iPageFolderId,
                        Name: objRow.vPageFolderName,
                    }
                }
            }
            else {
                if (objRow["cIsDeleted"] == "N") {
                    objReturnRow = {
                        ...objRow,
                        Id: objRow.iPageFolderId,
                        Name: objRow.vPageFolderName,
                    }
                }
            }
        }
        else if (objRow["cIsDeleted"] == "N") {
            objReturnRow = {
                ...objRow,
                Id: objRow.iPageId,
                Name: objRow.vPageName
            }
        }
        return objReturnRow;
    }

    /**
     * @name GoToFolder
     * @param {object} objRowData
     * @param {object} objContext
     * @summary Navigates into the folder.
     * @return {string}
     */
    GoToFolder(objRowData, objContext) {
        if (objRowData.iFolderId) {
            ApplicationState.SetProperty("SelectedRows", null);
            ApplicationState.SetProperty("FolderId", objRowData.iFolderId);
            objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false, "strSearchText": "", "blnSearchFromSameFolder": true, "struWorkflowStatusId": -1, "blnInternalTesting": false, "intSearchId": -1 } });
            let objFolderData = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"].find(objFolder => { return objFolder["iPageFolderId"] == objRowData["iFolderId"] });
            //let objSelectedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
            //ApplicationState.SetProperty("SelectedNode", { ...objSelectedNode, ["Tree_Master"]: objFolderData ? objFolderData : {} });
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode(objFolderData ? objFolderData : {});
            }
            console.log(objFolderData);
        }
    }

    /**
     * @name GetWorkFlowStatus
     * @param {object} objRow objRow
     * @param {object} objContext objContext
     * @param {boolean} blnForEditor blnForEditor
     * @summary Forms the WorkflowStatus name.
     * @return {string}
     */
    GetWorkFlowStatus(objRow, objContext, blnForEditor = false) {
        let strWorkFlowStatus = "";
        if (objRow.t_CMS_Page_AssignedWorkflowStatus.length > 0 && (objRow.t_CMS_Page_Container.length > 0 || blnForEditor)) {
            let objLatestWorkFlowStatus = objRow.t_CMS_Page_AssignedWorkflowStatus.find(objAssignedWorkflowStatus => objAssignedWorkflowStatus["cIsLatest"] == "Y" && objAssignedWorkflowStatus["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId);
            if (objLatestWorkFlowStatus) {
                let objActiveWorkFlowStatus = objContext.state.arrActiveWorkFlowStatuses.find(objActiveWorkFlowStatus => objActiveWorkFlowStatus["uWorkflowStatusId"] == objLatestWorkFlowStatus["uWorkflowStatusId"]);
                if (objActiveWorkFlowStatus) {
                    let objActiveWorkFlowStatusData = objActiveWorkFlowStatus.t_TestDrive_WorkflowStatus_Data.find(objActiveWorkFlowStatusData => objActiveWorkFlowStatusData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
                    strWorkFlowStatus = objActiveWorkFlowStatusData["vWorkflowStatusShortName"]
                }
            }
        }
        return strWorkFlowStatus;
    }

    /**
     * @name GetDifficultyLevel
     * @param {object} objRow
     * @param {object} objContext
     * @summary Forms the difficulty level name.
     * @return {string}
     */
    GetDifficultyLevel(objRow, objContext) {
        let strAssignedDifficultyLevel = "";
        if (objRow.t_TestDrive_Task_AssignedTaskDifficultyLevel) {
            objRow.t_TestDrive_Task_AssignedTaskDifficultyLevel.map(objAssignedDifficultyLevel => {
                if (objAssignedDifficultyLevel.iSchoolYearId == -1) {
                    DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel)["Data"].map(objDifficultyLevel => {
                        if (objDifficultyLevel["iTaskDifficultyLevelId"] == objAssignedDifficultyLevel["iTaskDifficultyLevelId"]) {
                            objDifficultyLevel.t_TestDrive_Task_TaskDifficultyLevel_Data.map(objDifficultyLevelData => {
                                if (objDifficultyLevelData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
                                    strAssignedDifficultyLevel = objDifficultyLevelData["vTaskDifficultyLevelName"]
                            })
                        }
                    })
                }
            })
        }
        return strAssignedDifficultyLevel;
    }

    /**
     * @name GetTaskTypeInfo
     * @param {object} objRow
     * @param {object} objContext objContext
     * @summary Forms the Image name and task Type based on iTaskTypeId and iTaskUsageId.
     * @return {object}
     */
    GetTaskTypeInfo(objRow, objContext) {
        let strImageSrc = "", strType = "";
        if (objRow.cIsAdaptiveTask == 'Y') {
            //objRow.iTaskTypeId == 1 && objRow.iTaskUsageId == 3
            strImageSrc = "HighStakeAdaptiveImage";
            strType = "Test";
        }
        else {
            switch (objRow.iTaskUsageId) {
                case 1:
                    switch (objRow.iTaskTypeId) {
                        case 1:
                            strImageSrc = "LearningGridImage";
                            strType = "Learn";
                            break;
                    }
                    break;
                case 2:
                    switch (objRow.iTaskTypeId) {
                        case 1:
                            strImageSrc = "LowStakeGridImage";
                            strType = "Check";
                            break;
                    }
                    break;
                case 3:
                    switch (objRow.iTaskTypeId) {
                        case 1:
                            strImageSrc = "HighStakeImage";
                            strType = "Test";
                            break;
                        case 2:
                            strImageSrc = "HighStakeIntroGridImage";
                            strType = "Manual";
                            break;
                        case 3:
                            strImageSrc = "HighStakeExampleImage";
                            strType = "Example";
                            break;
                        case 4:
                            strImageSrc = "HighStakeSurveyListImage";
                            strType = "HighStakeSurveyList";
                            break;
                        case 5:
                            strImageSrc = "HighStakeBreakGridImage";
                            strType = "Pause";
                            break;
                        case 6:
                            strImageSrc = "HighStakeSurveyImage";
                            strType = "HighStakeSurvey";
                            break;
                    }
                    break;
                case 5:
                    switch (objRow.iTaskTypeId) {
                        case 1:
                            strImageSrc = "DemoGridImage";
                            strType = "Demo";
                            break;
                    }
                    break;
                case 6:
                    switch (objRow.iTaskTypeId) {
                        case 4:
                            strImageSrc = "SurveyListGridImage";
                            strType = "SurveyList"
                            break;
                        case 6:
                            strImageSrc = "SurveyImage";
                            strType = "Survey";
                            break;
                    }
                    break;
                case 7:
                    switch (objRow.iTaskTypeId) {
                        case 2:
                            strImageSrc = "PresentationImage";
                            strType = "Course";
                            break;
                    }
                    break;
                default:
                    strImageSrc = "SpacerImage";
                    strType = "";
                    break;
            }
        }
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        return {
            TaskTypeIcon: strImageSrc,
            TaskType: Localization.TextFormatter(objTextResource, strType)
        };
    }

    /**
     * @name GetWorkFlowStatusIcons
     * @param {object} objRow
     * @param {object} objContext objContext
     * @summary Forms the type name based on iTaskUsageId.
     * @return {string}
     */
    GetWorkFlowStatusIcons(objRow, objContext) {
        if (objRow.iPageFolderId) {
            return [{
                "JSX": < div className="flex" >
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: objContext.ImageMeta.FolderImage
                        }}
                        ParentProps={objContext.props.ParentProps}
                    />
                </div>,
                "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId
            }]

        }
        else {
            if (objRow.t_CMS_Page_Container.length > 0) {            
                let arrLatestWorkFlowStatus = objRow.t_CMS_Page_AssignedWorkflowStatus.filter(objAssignedWorkflowStatus => objAssignedWorkflowStatus["cIsLatest"] == "Y" || objAssignedWorkflowStatus["cIsLatest"] == true);
                let arrJSXWorkFlowIcons = arrLatestWorkFlowStatus.map(objLatestWorkFlowStatus => {
                    let objActiveWorkFlowStatus = objContext.state.arrActiveWorkFlowStatuses.find(objActiveWorkFlowStatus => objActiveWorkFlowStatus["uWorkflowStatusId"] == objLatestWorkFlowStatus["uWorkflowStatusId"]);

                    if (objActiveWorkFlowStatus)
                        return {
                            "JSX": <div className="flex">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objContext.ImageMeta.TaskImage
                                    }}
                                    Events={{
                                        OnClickEventHandler: () => { this.OnTaskPreviewClick(objRow, objContext) }
                                    }}
                                    ParentProps={objContext.props.ParentProps}
                                />
                                {objActiveWorkFlowStatus["cIsProductionReady"] == "Y" ?
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objContext.ImageMeta.Review3Image
                                        }}
                                        ParentProps={objContext.props.ParentProps}
                                    />
                                    :
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objContext.ImageMeta.Review1Image
                                        }}
                                        ParentProps={objContext.props.ParentProps}
                                    />
                                    }
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objContext.ImageMeta.IconDeleteSmallImage
                                    }}
                                    Events={{
                                        OnClickEventHandler: () => { this.DeleteContentPopup(objRow, objContext) }
                                    }}
                                    ParentProps={objContext.props.ParentProps}
                                />
                            </div>,
                            "iLanguageId": objLatestWorkFlowStatus["iLanguageId"]
                        }
                    else
                        return {
                            "iLanguageId": objLatestWorkFlowStatus["iLanguageId"]
                        }

                })
                return arrJSXWorkFlowIcons;
            }
            else
                return [{
                    "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId
                }]
        }

    }

    /**
     * @name DeleteContentPopup
     * @param {object} objRow objRow
     * @param {object} objContext objContext
     * @summary Delete editor content popup
     * @return {string}
     */
    DeleteContentPopup(objRow, objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            Resource: {
                Text: objTextResource,
                TextResourcesKey: "ContentConfirmationPopup",
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                //Variables: objVaribales
            },
            Events: {
                ConfirmEvent: (strPopupId) => { this.DeleteContent(objRow, objContext, strPopupId) }
            },
            CallBacks: {}
        });
    }

    /**
    * @name OnTaskPreviewClick
    * @param {object} objRow objRow
    * @param {object} objContext objContext
    * @summary open Task preview popup
    * @return {string}
    */
    OnTaskPreviewClick(objRow, objContext) {
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iPageId": objRow["iPageId"]
                        }
                    },
                    {
                        "match": {
                            "iLanguageId": JConfiguration.InterfaceLanguageId
                        }
                    }
                ]
            },
            "cIsForEditor": "Y"
        };
        //Object_Editor_TaskContent_CMSPageContent.GetData(objParams).then((objResponse) => {
        //    Popup.ShowPopup({
        //        Data: {
        //            ModuleName: "TaskContentPreview"
        //        },
        //        Meta: {
        //            PopupName: "TaskContentPreview",
        //            ShowHeader: true,
        //            ShowCloseIcon: true,
        //            Height: "auto",
        //            Width: 825,
        //            HeaderData: []
        //        },
        //        PageJson: objResponse[Object.keys(objResponse)[0]]["Data"][0],
        //        Resource: {
        //        },
        //        Events: {
        //        },
        //        CallBacks: {
        //        },
        //        ParentProps: objContext.props
        //    });
        //}
        //);
        Object_Editor_TaskContent_CMSPageContent.GetData(objParams, objResponse => {
            Popup.ShowPopup({
                Data: {
                    ModuleName: "TaskContentPreview"
                },
                Meta: {
                    PopupName: "TaskContentPreview",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: "auto",
                    Width: 825,
                    HeaderData: []
                },
                PageJson: objResponse[Object.keys(objResponse)[0]]["Data"][0],
                Resource: {
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
            });
        }
        );
    }

    /**
    * @name OnTaskQuestionClick
    * @param {object} objRow objRow
    * @param {object} objContext objContext
    * @summary open Task preview popup
    * @return {string}
    */
    OnTaskQuestionClick(objContext, objRow) {
        Popup.ShowTabbedPopup({
            Data: {
            },
            Meta: {
                PopupName: "TaskQuestion",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true
            },
            PageId: objRow["iPageId"],
            TaskData: objRow,
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props),
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: objContext.props
        });
    }

    /**
     * @name DeleteContent
     * @param {object} objRow objRow
     * @param {object} objContext objContext
     * @param {string} strPopupId strPopupId
     * @summary Delete editor content event
     * @return {string}
     */
    DeleteContent(objRow, objContext, strPopupId) {
        let objParams = {};
        let objData = { ...objRow, ["t_CMS_Page_Container"]: [] };
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iFolderId": objContext.props.FolderId
                    }
                }
            ]
        }
        objParams = {

            "SearchQuery": objSearchQuery,
            "vEditData": [objData],
            "uUserId": objContext.props.ClientUserDetails.UserId

        };

        objContext.props.Object_Intranet_Task_Task.EditData(objParams, (objReturn, cIsNewData) => {
            Popup.ClosePopup(strPopupId);
        });
    }

    //Adding changes
    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit API after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }

    /**
     * @name CreateItemEventHandler
     * @param {object} objItem objItem
     * @summary   To filter the dropdown data based on the condition
     * @return {bool} boolean
     */
    CreateItemEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name OnDoubleClick
     * @param {object} objRow objRow
     * @param {object} objContext objContext
     * @summary Handles the double click event
     */
    OnDoubleClick(objRow, objContext) {
        if (objRow.iPageFolderId) { //When folder is selected
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode(objRow);
            }
            let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") && ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] : [];
            let fnExpandTreeNode = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] : null;
            if (fnExpandTreeNode) {
                fnExpandTreeNode([...arrExpandedNodes, objRow]);
            }
            ApplicationState.SetProperty("FolderId", objRow.iPageFolderId);
        }
        else {//When task is selected
            this.OpenAddEditTaskPopup(objContext, "", true, objRow);
        }
    }

    /**
     * @name PasteFolder
     * @param {object} objContext objContext
     * @param {string} strFolderId strFolderId
     * @summary Handles the PasteFolder event
     */
    PasteFolder(objContext, strFolderId) {
        let objCutCopySource = ApplicationState.GetProperty("CutCopySource")["Task"];
        let arrFetchParams =
        {
            ["SourceData"]: objCutCopySource["Data"],
            ["DestinationId"]: strFolderId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        if (objCutCopySource.Type == "Cut") {
            this.CutPaste(objCutCopySource["Data"], strFolderId, objContext);
        }
        else {
            ApplicationState.SetProperty("blnShowAnimation", true);
            ArcadixFetchData.ExecuteCustom("API/Object/Intranet/Task/CutCopyPaste/CopyPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": null });
                ArcadixCacheData.AddData("Object_Intranet_Task_TaskFolder", { "Value": { "Data": objResopnse.CopyPaste.Data } });
                ArcadixCacheData.DeleteEntity("Object_Intranet_Task_Task");
                this.LoadSelectedFolderTasks(objContext, objContext.props.FolderId, false);
                //-------------------------------------------Commented out Logic to navigate into DestinationFolder and select the node--------------------------------------
                //ApplicationState.SetProperty("FolderId", strFolderId);
                //let objDestinationFolder = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"].find(obj => obj["iPageFolderId"] == strFolderId);
                //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["Tree_Master"]: objDestinationFolder });
                //let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                //if (fnSelectTreeNode) {
                //    fnSelectTreeNode(objDestinationFolder);
                //}
                //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": objCutCopySource["Data"][0] });
                //-------------------------------------------------------------------------------------------------------------------------------------------------------------
            });
        }
    }

    /**
     * @name CutPaste
     * @param {array} arrData arrData
     * @param {string} strFolderId strFolderId
     * @param {object} objContext objContext
     * @param {bool} blnNavigate blnNavigate
     * @summary Handles the CutPaste event
     */
    CutPaste(arrData, strFolderId, objContext, blnNavigate = true) {
        let arrFetchParams =
        {
            ["SourceData"]: arrData,
            ["DestinationId"]: strFolderId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteCustom("API/Object/Intranet/Task/CutCopyPaste/CutPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": null });
            //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), "Tree_Master": objReturn[0] });
            ArcadixCacheData.EditData("Object_Intranet_Task_TaskFolder", {
                "Value": {
                    "Data": objResopnse.CutPaste.Data,
                    "PrimaryKeyName": "iPageFolderId"
                }
            });
            ArcadixCacheData.DeleteEntity("Object_Intranet_Task_Task");
            this.LoadSelectedFolderTasks(objContext, objContext.props.FolderId, false);
            //-------------------------------------------Commented out Logic to navigate into DestinationFolder and select the node--------------------------------------
            //if (blnNavigate) {
            //    ApplicationState.SetProperty("FolderId", strFolderId);
            //    let objDestinationFolder = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"].find(obj => obj["iPageFolderId"] == strFolderId);
            //    //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["Tree_Master"]: objDestinationFolder });
            //    let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
            //    if (fnSelectTreeNode) {
            //        fnSelectTreeNode(objDestinationFolder);
            //    }
            //}
            //-------------------------------------------------------------------------------------------------------------------------------------------------------------
        });
    }

    /**
     * @name PasteAsShortcut
     * @param {object} objContext objContext
     * @param {string} strFolderId strFolderId
     * @summary Handles the PasteAsShortcut event
     */
    PasteAsShortcut(objContext, strFolderId) {
        let objCutCopySource = ApplicationState.GetProperty("CutCopySource")["Task"];
        let arrDataforPaste = [];
        objCutCopySource["Data"].map(objCopyData => {
            arrDataforPaste = [...arrDataforPaste, { ...objCopyData, ["cIsShortcut"]: "Y", ["iShortcutToTaskId"]: objCopyData["iPageId"], ["iFolderId"]: strFolderId }]
        })
        let arrFetchParams =
        {
            ["SourceData"]: arrDataforPaste,
            ["DestinationId"]: strFolderId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteCustom("API/Object/Intranet/Task/CutCopyPaste/CopyPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": null });
            //ApplicationState.SetProperty("FolderId", strFolderId);
            ArcadixCacheData.AddData("Object_Intranet_Task_TaskFolder", { "Value": { "Data": objResopnse.CopyPaste.Data } });
            ArcadixCacheData.DeleteEntity("Object_Intranet_Task_Task");
            this.LoadSelectedFolderTasks(objContext, objContext.props.FolderId, false);
            //-------------------------------------------Commented out Logic to navigate into DestinationFolder and select the node--------------------------------------
            //let objDestinationFolder = DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"].find(obj => obj["iPageFolderId"] == strFolderId);
            ////ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["Tree_Master"]: objDestinationFolder });
            //let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
            //if (fnSelectTreeNode) {
            //    fnSelectTreeNode(objDestinationFolder);
            //}
            //-------------------------------------------------------------------------------------------------------------------------------------------------------------
        });
    }


    /**
     * @name ResetWorkflowStatus      
     * @param {object} objContext objContext
     * @param {string} strFolderId strFolderId
     * @summary Handles the ResetWorkflowStatus event
     */
    ResetWorkflowStatus(objContext, strFolderId, iFrameworkLanguageId = null) {
        let objText = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        Popup.ShowPopup({
            Data: {
                HeaderTitle: Localization.TextFormatter(objText, "WorkflowStatus"),
                ActiveWorkFlowStatuses: objContext.state.arrActiveWorkFlowStatuses
            },
            Meta: {
                PopupName: 'ResetWorkFlowStatus',
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: "auto",
                Width: 480
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props),
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            Events: {
                ResetWorkflowStatus: (strWorkFlowId, strPopupId) => { this.Reset(objContext, strWorkFlowId, strPopupId, strFolderId, iFrameworkLanguageId) }
            },
            CallBacks: {
                //PopupCallBack: (strPopupUniqueId) => alert("popup callback... Do any module specific operations here with the PopupUniqueId: " + strPopupUniqueId)
            }
        });
    }

    /**
     * @name Reset
     * @param {string} objData strWorkFlowId
     * @summary Handles the Reset event
     */
    GetResetWorkFlowChildData(objData, arrMainClientLanguageData) {
        let arrTreeContextMenuData = [];
        arrMainClientLanguageData.map((objMainClientLanguageData, index) => {
            objMainClientLanguageData["t_Framework_Language_Data"].map(objLanguageData => {
                if (objLanguageData["iFrameworkLanguageId"] == objMainClientLanguageData["iFrameworkLanguageId"] && objLanguageData["iLanguageId"] == objData.objContext.props.JConfiguration.InterfaceLanguageId) {
                    arrTreeContextMenuData = [...arrTreeContextMenuData, {
                        ParentId: 10,
                        Id: parseFloat('10.' + (index + 1)),
                        ClickEvent: () => objData.ResetWorkflowStatus(objLanguageData["iFrameworkLanguageId"]),
                        Text: objLanguageData["vLanguageName"],
                        //Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
                    }]
                }
            })
        })
        return arrTreeContextMenuData;
    }

    /**
    * @name Reset
    * @param {string} strWorkFlowId strWorkFlowId
    * @param {string} strPopupId strPopupId
    * @summary Handles the Reset event
    */
    Reset(objContext = null, strWorkFlowId, strPopupId, strFolderId, iFrameworkLanguageId = null) {
        let objParams = {
            FolderId: strFolderId,//plicationState.GetProperty("FolderId"),
            WorkFlowId: strWorkFlowId,
            iFrameworkLanguageId: iFrameworkLanguageId == null ? objContext.props.JConfiguration.InterfaceLanguageId : iFrameworkLanguageId
        }
        Task_Module.ResetWorkflowStatus(objParams, (objResponse) => {
            ArcadixCacheData.DeleteEntity("Object_Intranet_Task_Task");
            Popup.ClosePopup(strPopupId);
        });
    }

    /**
     * @name TaskExportAsExcel
     * @param {object} objContext objContext
     * @param {string} strFolderId strFolderId
     * @summary Exports the Task of Selected Folder into Excel.
     */
    TaskExportAsExcel(objContext, strFolderId) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        Popup.ShowPopup({
            Data: {
                FolderId: strFolderId,
                HeaderTitle: Localization.TextFormatter(objTextResource, "TaskExport_Title"),
                ExecutionName: "ExportAufgabeneigenschaften" + "_" + Localization.DateFormatter(new Date()).replaceAll("/", ".")
            },
            Meta: {
                PopupName: 'TaskExport',
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: "auto",
                Width: "auto"
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: { ...objContext.props }
        });
    }

    /**
    * @name GetTestUsage
    * @param {object} objRow
    * @param {object} objContext
    * @summary returns the TestType based on iTestUsageId
    * @return {object}
    */
    GetTaskUsage(objRow, objContext) {
        let strTestUsage = "";
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);

        if (objRow.iTaskTypeId == 2 && objRow.iTaskUsageId == 7 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "Presentation";
        else if (objRow.iTaskTypeId == 1 && objRow.iTaskUsageId == 5 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "Demo";
        else if (objRow.iTaskTypeId == 1 && objRow.iTaskUsageId == 1 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "Learning";
        else if (objRow.iTaskTypeId == 1 && objRow.iTaskUsageId == 2 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "LowStake";
        else if (objRow.iTaskTypeId == 1 && objRow.iTaskUsageId == 3 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "HighStake";
        else if (objRow.iTaskTypeId == 3 && objRow.iTaskUsageId == 3 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "HighStakeExample";
        else if (objRow.iTaskTypeId == 2 && objRow.iTaskUsageId == 3 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "HighStakeIntro";
        else if (objRow.iTaskTypeId == 5 && objRow.iTaskUsageId == 3 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "HighStakeBreak";
        else if (objRow.iTaskTypeId == 6 && objRow.iTaskUsageId == 3 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "HighStakeSurvey";
        else if (objRow.iTaskTypeId == 4 && objRow.iTaskUsageId == 3 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "HighStakeSurveyList";
        else if (objRow.iTaskTypeId == 1 && objRow.iTaskUsageId == 3 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "HighStakeAdaptive";
        else if (objRow.iTaskTypeId == 6 && objRow.iTaskUsageId == 6 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "Survey";
        else if (objRow.iTaskTypeId == 4 && objRow.iTaskUsageId == 6 && objRow.cIsAdaptiveTask == "N")
            strTestUsage = "SurveyList";

        return Localization.TextFormatter(objTextResource, strTestUsage);
    }
    
    /**
     * @name TaskExportAsExcel
     * @param {object} objContext objContext
     * @param {string} strFolderId strFolderId
     * @summary Generates Task PDF.
     */
    GenerateTaskPdf(objContext, objRowData, strLanguageId, strPdfType, objPageJson) {
        
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        objRowData = {
            ...objRowData,
            TaskType: this.GetTaskTypeInfo(objRowData, objContext)["TaskType"]
        }
        Popup.ShowPopup({
            Data: {
                SelectedRow: objRowData,
                PdfType: strPdfType,
                ContentLanguageId: strLanguageId,
                PageJson: objPageJson,
                ExecutionName: (objRowData["vPageName"] ?? objRowData["vPageFolderName"]) + "_" + Localization.TextFormatter(objTextResource, "Print") + "_" + Localization.DateTimeFormatter(new Date()).replaceAll("/", ".").replaceAll(":", ".").replaceAll(" ", "_")
            },
            Meta: {
                PopupName: 'GenereateTaskPdf',
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: "auto",
                Width: "auto"
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: { ...objContext.props }
        });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TaskGrid"] : [];
        var objRibbonData = {
            objContext,
            MultiLanguageData: objContext.Task_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], 2) ?? [],
            "AddPopup": (strTaskType) => objContext.Task_ModuleProcessor.OpenAddEditTaskPopup(objContext, strTaskType, false),
            "EditPopup": () => objContext.Task_ModuleProcessor.OpenAddEditTaskPopup(objContext, "", true),
            "DeletePopup": () => objContext.Task_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenTaskInEditor": (strLanguageId) => objContext.Task_ModuleProcessor.OpenTaskInEditor(objContext, null, strLanguageId),
            "CutTask": () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": { "Type": "Cut", "Data": [arrSelectedRows[0] ?? {} ] } }) },
            "CopyTask": () => {
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": { "Type": "Copy", "Data": [arrSelectedRows[0] ?? {} ] } })
            },
            "PasteFolder": () => {
                objContext.Task_ModuleProcessor.PasteFolder(objContext, arrSelectedRows[0]?.iPageFolderId)
            },
            "CancelCutCopy": () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Task": null }) }
        };
        ApplicationState.SetProperty("OfficeRibbonData", Task_OfficeRibbon.GetTaskOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ];
    }
}

export default Task_ModuleProcessor;