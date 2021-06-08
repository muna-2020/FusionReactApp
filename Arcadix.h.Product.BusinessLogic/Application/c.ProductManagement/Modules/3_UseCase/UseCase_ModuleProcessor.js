// React related imports.
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store";

//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Core imports...
import { GetObjectListForModule } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

//Objects required for module.
import Object_DevServer_ProductManagement_UseCase from '@shared/Object/c.ProductManagement/UseCase/UseCase';
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Object_DevServer_ProductManagement_TestCase from '@shared/Object/c.ProductManagement/TestCase/TestCase';
import Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep from '@shared/Object/c.ProductManagement/ImplementationStep/ImplementationStep';
import Object_DevServer_ProductManagement_TestCaseStep from '@shared/Object/c.ProductManagement/TestCase/TestCaseStep/TestCaseStep';
import Object_Cockpit_Workflow_WorkflowType from '@shared/Object/c.Cockpit/Workflow/WorkFlowType/WorkflowType';

//Module related fies...
import * as UseCase_MetaData from '@shared/Application/c.ProductManagement/Modules/3_UseCase/UseCase_MetaData';
import * as UseCase_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/3_UseCase/UseCase_OfficeRibbon';
import * as UseCase_ContextMenuData from '@shared/Application/c.ProductManagement/Modules/3_UseCase/UseCase_ContextMenuData';

//Helper classes.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//Editor Main Module.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
* @name UseCase_ModuleProcessor
* @summary Class for UseCase module display.
*/
class UseCase_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_UseCase",
            "Object_DevServer_ProductManagement_Folder",
            "Object_DevServer_ProductManagement_Module",
            "Object_DevServer_ProductManagement_TestCase",
            "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep",
            "Object_Cockpit_Workflow_WorkflowType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3_UseCase/UseCase",
            { "StoreKey": "ApplicationState", "DataKey": "ActiveSubNavigationId" },
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" },
            { "StoreKey": "ApplicationState", "DataKey": "SelectedUseCaseIdforCollapse" },
            //{ "StoreKey": "ApplicationState", "DataKey": "SelectedUseCaseReference" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        ApplicationState.SetProperty("SelectedRows", null);
        new ObjectQueue().QueueAndExecuteAPI(this, objContext.props);
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

        //UseCase object
        if (arrPrefetchFilterData) {
            Object_DevServer_ProductManagement_UseCase.Initialize({});
            arrPrefetchFilterData?.forEach(objModule => {
                arrDataRequest = [
                    ...arrDataRequest,
                    {
                        "URL": Object_DevServer_ProductManagement_UseCase.URL,
                        "InitialDataCallParam": this.GetUseCaseParams(objModule["uModuleId"])
                    }
                ]
            });                     
        }
        else {
            let strModuleId = (props.IsForServerRenderHtml && props.QueryStringObject?.SubNavigationId) ?? ApplicationState.GetProperty("ActiveSubNavigationId") ?? "";
            let objUseCaseParams = this.GetUseCaseParams(strModuleId);
             
            //Object_DevServer_ProductManagement_UseCase.Initialize({});
            Object_DevServer_ProductManagement_UseCase.Initialize(objUseCaseParams);
            arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_UseCase];
        }

        //Workflowtype object
        let objWorkflowType = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vWorkflowTypeIdentifier": "UseCase"
                        }
                    }
                ]
            }
        };
        Object_Cockpit_Workflow_WorkflowType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowType];

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/3_UseCase/UseCase"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetUseCaseParams
     * @param {string} strModuleId ModuleId
     * @summary Forms the filter params for the UseCase object.
     */
    GetUseCaseParams(strModuleId) {
        return {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uModuleId": strModuleId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
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
     * @name LoadSelectedModuleUseCases
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
     */
    LoadSelectedModuleUseCases(objContext, strModuleId) {
        let objUseCaseParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uModuleId": strModuleId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_DevServer_ProductManagement_UseCase.GetData(objUseCaseParams, (arrData) => {
            this.ResetGridSelection("UseCaseGrid");
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name OpenAddEditUseCasePopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call tabbed pop-up for Add/Edit of UseCase
     * @return null
     */
    OpenAddEditUseCasePopup(objContext, blnIsEdit) {

        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrWorkflowType = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType).Data;
        let objWf = arrWorkflowType.find(obj => obj["vWorkflowTypeIdentifier"] == "UseCase");
        let blnShowErrorPopup;
        if (blnIsEdit) {
            //blnShowErrorPopup = (!objSelectedRow || objSelectedRow.length <= 0) ? true : false;
            blnShowErrorPopup = false;
        }

        if (!blnShowErrorPopup) {
            var objData = {
                IsEdit: blnIsEdit,
                //Object_DevServer_ProductManagement_UseCase: DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase),
                ModuleId: ApplicationState.GetProperty("ActiveSubNavigationId"),
                WorkflowTypeId: objWf.uWorkflowTypeId
            }

            Popup.ShowTabbedPopup({
                Data: objData,
                Meta: {
                    PopupName: "AddEditUseCase",
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
                    InitializeGrid: () => { InitializeGrid(objContext) }
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
                    ShowHeader: true,
                    ShowCloseIcon: true,
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

    /**
     * @name DeletePopup  
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : [];
        //let arrSelectedRows = this.GetSelectedRow(objContext);

        var strDeleteVariables = "";

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vUseCaseName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => {
                        this.DeleteUseCase(arrSelectedRows, strPopupId, objContext)
                    }
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
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
    * @name DeleteUseCase
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes UseCase and close popup on success
    */
    DeleteUseCase(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uModuleId": ApplicationState.GetProperty("ActiveSubNavigationId")
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
        objParams = {

            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.ClientUserDetails.uUserId

        };

        Object_DevServer_ProductManagement_UseCase.DeleteData(objParams, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                Popup.ClosePopup(strPopupId);
                let fnSelectAdjacentGridRow = ApplicationState.GetProperty("SelectAdjacentGridRow") && ApplicationState.GetProperty("SelectAdjacentGridRow")["UseCaseGrid"] ? ApplicationState.GetProperty("SelectAdjacentGridRow")["UseCaseGrid"] : null;
                if (fnSelectAdjacentGridRow) {
                    fnSelectAdjacentGridRow(arrSelectedRows);
                }
            }
        });
    }

    /**
     * @name GetUseCaseGridData
     * @param {object} objContext
     * @summary it returns the object for UseCaseGrid Data
     * @returns {object} Data
     */
    GetUseCaseGridData(objContext) {
        let strModuleId = (objContext.props.IsForServerRenderHtml && objContext.props.QueryStringObject?.SubNavigationId) ?? ApplicationState.GetProperty("ActiveSubNavigationId") ?? "";
        let arrUseCaseData = DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + strModuleId + ";cIsDeleted;N").Data;
        //we will be Sorting data before passing to grid 
        arrUseCaseData = arrUseCaseData ? arrUseCaseData.sort((a, b) => a.iOrderId - b.iOrderId) : [];
        //arrUseCaseData = arrUseCaseData ? arrUseCaseData : [];
        //objContext.dispatch({ type: "SET_STATE", payload: { arrUseCaseData: arrUseCaseData } });
        return {
            RowData: arrUseCaseData,
            //IsHierarchicalGrid: "Y",
            //HierarchicalGridHeaderText: "TestCase",
        };
    }

    /**
    * @name GetUseCaseMetaData
    * @param {object} objContext
    * @summary it returns the object for UseCaseGrid Meta Data
    * @returns {object} Data
    */
    GetUseCaseMetaData(objContext) {
        return {
            HeaderData: UseCase_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N"
            },
            PrimaryKey: "uUseCaseId",
            AllowDragDrop: true
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
        let Text = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetUseCaseGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetUseCaseGridEvents(objContext) {
        let objCallBacks = {
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
            OnDoubleClick: (objRowData, event) => this.OnDoubleClick(objRowData, objContext),
            OnContextMenuClick: (objRowData, event, arrCheckedRows) => this.OnContextMenuClick(objRowData, event, objContext, arrCheckedRows),
            OnDragDrop: (objDragDetails, objDropDetails) => this.OnDragDrop(objDragDetails, objDropDetails, objContext),
            //OnCollapseClick: (objRowData, event, refHierarchicalGrid, strClickFrom) => this.OnCollapseClick(objRowData, objContext, refHierarchicalGrid, strClickFrom, event),
            //OnContextMenuClick: (objRowData, event) => this.OnContextMenuClick(objRowData, event, objContext)
        };
        return objCallBacks;
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
        let fnShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
        fnShowContextMenu(objContextMenu);
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
        let objData = {
            objContext,
            "AddEditUseCase": (blnIsEdit = false) => this.OpenAddEditUseCasePopup(objContext, blnIsEdit),
            "DeleteUseCase": () => this.OpenDeletePopup(objContext, objRowData),
            "OpenContent": () => { objContext.UseCase_ModuleProcessor.OpenContent(objContext) },
            "OpenDocuments": () => { objContext.UseCase_ModuleProcessor.OpenDocuments(objContext) },
            "OpenCodeCrawler": () => objContext.UseCase_ModuleProcessor.OpenCodeCrawler(objContext, "UseCase"),
            "OpenImplementationStep": () => objContext.UseCase_ModuleProcessor.OpenImplementationStep(objContext),
            "OpenTestCase": () => objContext.UseCase_ModuleProcessor.OpenTestCase(objContext),
            "Cut": () => {
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "UseCase": { "Type": "Cut", "Data": [objRowData ?? {}] } })
            },
            "Paste": () => { objContext.UseCase_ModuleProcessor.Paste(objContext, objContext.props.ActiveSubNavigationId) },
        };
        arrContextListSample = UseCase_ContextMenuData.GetContextMenuData(objData);
        return arrContextListSample;
    }

    /**
 * @name OnDragDrop
 * @param {object} objDragDetails objDragDetails
 * @param {object} objDropDetails objDropDetails
 * @param {object} objContext objContext
 * @summary Handles on drag drop event
 * @return {object}
 */
    OnDragDrop(objDragDetails, objDropDetails, objContext) {
        let objDragData = null;
        if (!objDropDetails.Type) {
            objDragData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.find(obj => obj["uFolderId"] == objDropDetails.Id);
            objDropDetails.Type = objDragData ? "Folder" : "Module"; //Type will be null, when we drop into the Tree, so making it Folder
            //objDropDetails.Type = objDragData ? "Module" : "Folder";
        }
        if (objDropDetails.Type == "Module" && objDragDetails.Id != objDropDetails.Id) {
            objDragData = DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + ApplicationState.GetProperty("ActiveSubNavigationId") + ";cIsDeleted;N")["Data"];
            if (objDragData && objDropDetails.Id) {
                this.CutPaste(objDragData, objDropDetails.Id, objContext, true);
            }
        }
    }

    /**
  * @name OnCollapseClick
  * @param {object} objSelectedRow
  * @param {object} objContext
  * @summary Handles the click event of the grid.
  */
    OnCollapseClick(objSelectedRow, objContext, refHierarchicalGrid, strClickFrom, event) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        let arrSelectedUseCaseIdforCollapse = ApplicationState.GetProperty("SelectedUseCaseIdforCollapse") ? ApplicationState.GetProperty("SelectedUseCaseIdforCollapse") : [];
        let objSelectedUseCaseIdforCollapse = arrSelectedUseCaseIdforCollapse.length > 0 ? arrSelectedUseCaseIdforCollapse.filter((objData) => objData["uUseCaseId"] == objSelectedRow["uUseCaseId"])[0] ? arrSelectedUseCaseIdforCollapse.filter((objData) => objData["uUseCaseId"] == objSelectedRow["uUseCaseId"])[0] : {} : {};
        let arrReturnData = arrSelectedUseCaseIdforCollapse.length > 0 ? arrSelectedUseCaseIdforCollapse.filter((objData) => objData["uUseCaseId"] != objSelectedRow["uUseCaseId"]) : [];
        if (objSelectedUseCaseIdforCollapse.uUseCaseId) {
            if (objSelectedRow.HierarchicalGridCollapse == "N") {
                let TestCase = objContext.props.ComponentController.GetComponent("TestCase");
                ReactDOM.hydrate(
                    <Provider store={store}>
                        <TestCase
                            Id="TestCase"
                            Data={{
                                "uUseCaseId": objSelectedRow["uUseCaseId"]
                            }}
                            Events={{
                                OnDoubleClick: (objSelectedRow) => {
                                    objContext.dispatch({ type: "SET_STATE", payload: { "GridToDisplay": "ImplementationGrid", "objSelectedTestCase": objSelectedRow } });
                                }
                            }}
                            ParentProps={{ ...objContext.props }}
                            JConfiguration={{ ...objContext.props.JConfiguration }}
                        />
                    </Provider>,
                    refHierarchicalGrid.current
                );
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestCaseGrid": [] });
                ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", [...arrReturnData, { "uUseCaseId": objSelectedRow["uUseCaseId"], "IsSubGrid": "Y", "SelectedUseCaseReference": refHierarchicalGrid }]);
            }
            else {
                ReactDOM.hydrate(
                    <Provider store={store}>
                    </Provider>,
                    refHierarchicalGrid.current
                );
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ImplementationStepGrid": null, "TestCaseGrid": null });
                ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", [...arrReturnData, { "uUseCaseId": objSelectedRow["uUseCaseId"], "IsSubGrid": "N" }]);
            }

        }
        else {
            let TestCase = objContext.props.ComponentController.GetComponent("TestCase");
            ReactDOM.hydrate(
                <Provider store={store}>
                    <TestCase
                        Id="TestCase"
                        Data={{
                            "uUseCaseId": objSelectedRow["uUseCaseId"]
                        }}
                        Events={{
                            OnDoubleClick: (objSelectedRow) => {
                                objContext.dispatch({ type: "SET_STATE", payload: { "GridToDisplay": "TestCaseStepGrid", "objSelectedTestCase": objSelectedRow } });
                            }
                        }}
                        ParentProps={{ ...objContext.props }}
                        JConfiguration={{ ...objContext.props.JConfiguration }}
                    />
                </Provider>,
                refHierarchicalGrid.current
            );
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestCaseGrid": [] });
            ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", [...arrReturnData, { "uUseCaseId": objSelectedRow["uUseCaseId"], "IsSubGrid": "Y", "SelectedUseCaseReference": refHierarchicalGrid }]);
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
    }

    /**
    * @name OnClickRow
    * @param {object} objSelectedRow
    * @param {object} objContext
    * @summary Handles the click event of the grid.
    */
    OnClickRow(objSelectedRow, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": objSelectedRow } });
        var BreadCrumbNavigation = ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"][0]["vFolderName"] + ":" + ApplicationState.GetProperty("ActiveModuleName") + ":" + ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["vUseCaseName"];
        ApplicationState.SetProperty("BreadCrumbNavigation", BreadCrumbNavigation);
    }

    /**
     * @name OnDoubleClick
     * @param {object} objRowData objRowData
     * @param {object} objContext objContext
     * @summary Handles the double click event
     */
    OnDoubleClick(objRowData, objContext) {
        this.OpenAddEditUseCasePopup(objContext, true);      //objRowData  
        //ApplicationState.SetProperty("blnShowAnimation", true);
        //objContext.dispatch({ type: "SET_STATE", payload: { "GridToDisplay": "ImplementationGrid" } });
    }

    /**
    * @name OnContextMenuClick
    * @param {object} objRowData
    * @param {object} event
    * @param {object} objContext
    * @summary Handles the click event of the grid.
    */
    //OnContextMenuClick(objContextMenuDimensions, objRowData, objContext) {
    //    let objContextMenu = {
    //        Data: this.GetContextMenuData(objRowData, objContext),
    //        objEvent: objContextMenuDimensions
    //    };
    //    ApplicationState.SetProperty("ContextMenuDetails", objContextMenu);
    //}

    /**
     * @name GetContextMenuData
     * @param {any} objRowData
     * @param {any} objContext
     * @summary Forms the data for Context menu.
     * @return {object}
     */
    //GetContextMenuData(objRowData, objContext) {
    //    let arrContextListSample = [];
    //    if (objRowData.iPageId) {
    //        let objData = {
    //            objContext,
    //            OpenAddEditTaskPopup: (strType = "", blnIsEdit = true, objSelectedRow = null) => this.OpenAddEditTaskPopup(objContext, strType, blnIsEdit, objSelectedRow),
    //            OnTaskPreviewClick: () => {
    //                window.open("https://devfusionlernlupe.arcadixdevelopment.com/Test/TaskPreview/Index?TaskId=" + objRowData["iPageId"] + "&LanguageId=3", "_blank");
    //            }
    //        };
    //        arrContextListSample = Task_ContextMenuData.GetTaskContextMenuData(objData);
    //    }
    //    else {
    //        let objData = {
    //            objContext,
    //            AddTaskFolder: () => this.OpenAddEditTaskFolderPopup(objContext, objRowData, false),
    //            EditTaskFolder: () => this.OpenAddEditTaskFolderPopup(objContext, objRowData, true)
    //        };
    //        arrContextListSample = Task_ContextMenuData.GetTaskFolderContextMenuData(objData);
    //    }
    //    return arrContextListSample;
    //}

    /**
    * @name GetUseCaseGridCallBacks
    * @param {object} objContext
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetUseCaseGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => {
                let objReturnRow = null;
                let objSelectedUseCaseIdforCollapse = ApplicationState.GetProperty("SelectedUseCaseIdforCollapse") ? ApplicationState.GetProperty("SelectedUseCaseIdforCollapse").filter((objData) => objData["uUseCaseId"] == objRow["uUseCaseId"])[0] ? ApplicationState.GetProperty("SelectedUseCaseIdforCollapse").filter((objData) => objData["uUseCaseId"] == objRow["uUseCaseId"])[0] : {} : {};
                // if (objRow["uModuleId"] == ApplicationState.GetProperty("ActiveSubNavigationId") && objRow["cIsDeleted"] == "N") {
                objReturnRow = {
                    ...objRow,
                    Id: objRow.iPageFolderId,
                    Name: objRow.vPageFolderName,
                    Type: "UseCase",
                    HierarchicalGridCollapse: objSelectedUseCaseIdforCollapse ? objSelectedUseCaseIdforCollapse.uUseCaseId == objRow["uUseCaseId"] ? objSelectedUseCaseIdforCollapse.IsSubGrid : "N" : "N",
                }
                //}
                return objReturnRow;
            }
        };
        return objCallBacks;
    }

    /**
     * @name OpenContent
     * @param {object} objContext passes Context object.
     * @summary this open the Editor.
     */
    OpenContent(objContext) {
        let arrPageIds = [], arrPageProperties = [];
        ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"].forEach(objTemp => {
            arrPageIds = [...arrPageIds, parseInt(objTemp.iPageId)];
            arrPageProperties = [...arrPageProperties, { "iPageId": parseInt(objTemp.iPageId), "vPageName": objTemp.vUseCaseName }];
        });
        if (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"].length > 0) {
            let objParams = {
                "Data": {
                    "PageIds": arrPageIds,
                    "SubjectForMainClient": null,
                    "TaskProperties": arrPageProperties,
                    "LanguageData": null,
                    "IsFirstTask": true,
                    "IsLastTask": true,
                    "IsNotFromIntranet": true,
                    "ContentUsageGroupId": "UseCaseContentGroup",
                    "MultiMediaUsageGroupId": "UseCaseMediaGroup"
                },
                "CallBacks": {
                    "EditorCloseCallback": (objPageJson) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objPageJson } });
                    }
                },
                "ParentProps": {
                    "JConfiguration": objContext.props.JConfiguration,
                    "ClientUserDetails": objContext.props.ClientUserDetails,
                }
            };
            let objEditor = new Editor();
            objEditor.OpenEditor(objParams);
        }
    }

    /**
    * @name OpenContent
    * @param {any} objContext
    */
    OpenDocuments(objContext, strGridId, strPrimaryKey) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        var objData = {
            IsForUseCase: strPrimaryKey.toString() == "uUseCaseId" ? true : false,
            IsForTestCase: strPrimaryKey.toString() == "uTestCaseId" ? true : false,
            IsForImplementationStep: strPrimaryKey.toString() == "uUseCaseImplementationStepId" ? true : false,
            DocumentFolderId: ApplicationState.GetProperty("SelectedRows")[strGridId.toString()] ? ApplicationState.GetProperty("SelectedRows")[strGridId.toString()][0] ? ApplicationState.GetProperty("SelectedRows")[strGridId.toString()][0][strPrimaryKey.toString()] : "" : "" //ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["uUseCaseId"]
        }
        if (objData.DocumentFolderId != "") {
            Popup.ShowTabbedPopup({
                Data: objData,
                Meta: {
                    PopupName: "Document",
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
                    InitializeGrid: () => { InitializeGrid(objContext) }
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
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }

    }

    //TestCase Code
    /**
    * @name OpenAddEditTestCasePopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed pop-up for Add/Edit of UseCase
    * @return null
    */
    OpenAddEditTestCasePopup(objContext, blnIsEdit) {

        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"] : [];
        let arrSelectedUseCaseRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : [];
        let arrWorkflowType = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType).Data;
        let objWf = arrWorkflowType.find(obj => obj["vWorkflowTypeIdentifier"] == "TestCase");
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }

        if (!blnShowErrorPopup) {
            var objData = {
                IsEdit: blnIsEdit,
                UseCaseId: arrSelectedUseCaseRows[0]["uUseCaseId"],
                WorkflowTypeId: objWf.uWorkflowTypeId
            }

            Popup.ShowTabbedPopup({
                Data: objData,
                Meta: {
                    PopupName: "AddEditTestCase",
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
                    ShowHeader: true,
                    ShowCloseIcon: true,
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

    /**
    * @name OpenAddEditImplementationStepPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed pop-up for Add/Edit of UseCase
    * @return null
    */
    OpenAddEditImplementationStepPopup(objContext, blnIsEdit) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"] : [];
        let arrSelectedUseCaseRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : [];

        let arrWorkflowType = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType).Data;
        let objWf = arrWorkflowType.find(obj => obj["vWorkflowTypeIdentifier"] == "ImplementationStep");
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        if (!blnShowErrorPopup) {
            var objData = {
                IsEdit: blnIsEdit,
                UseCaseId: arrSelectedUseCaseRows[0]["uUseCaseId"],
                WorkflowTypeId: objWf.uWorkflowTypeId
            }

            Popup.ShowTabbedPopup({
                Data: objData,
                Meta: {
                    PopupName: "AddEditImplementationStep",
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
                    ShowHeader: true,
                    ShowCloseIcon: true,
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

    //open Content for implementationType and TestCase
    /**
    * @name OpenContent
    * @param {object} objContext passes Context object.
    * @summary this open the Editor.
    */
    OpenImplementationStepContent(objContext) {
        let arrPageIds = [], arrPageProperties = [];
        if (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"].length > 0) {
            ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"].forEach(objTemp => {
                arrPageIds = [...arrPageIds, parseInt(objTemp.iPageId)];
                arrPageProperties = [...arrPageProperties, { "iPageId": parseInt(objTemp.iPageId), "vPageName": objTemp.vImplementationStepName }];
            });
            let objParams = {
                "Data": {
                    "PageIds": arrPageIds,
                    "SubjectForMainClient": null,
                    "TaskProperties": arrPageProperties,
                    "LanguageData": null,
                    "IsFirstTask": true,
                    "IsLastTask": true,
                    "IsNotFromIntranet": true,
                    "ContentUsageGroupId": "UseCaseContentGroup",
                    "MultiMediaUsageGroupId": "UseCaseMediaGroup"
                },
                "CallBacks": {
                    "EditorCloseCallback": (objPageJson) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objPageJson } });
                    }
                },
                "ParentProps": {
                    "JConfiguration": objContext.props.JConfiguration,
                    "ClientUserDetails": objContext.props.ClientUserDetails,
                }
            };
            let objEditor = new Editor();
            objEditor.OpenEditor(objParams);
        }
    }

    /**
    * @name OpenContent
    * @param {object} objContext passes Context object.
    * @summary this open the Editor.
    */
    OpenTestCaseContent(objContext) {
        let arrPageIds = [], arrPageProperties = [];
        if (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"].length > 0) {
            ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"].forEach(objTemp => {
                arrPageIds = [...arrPageIds, parseInt(objTemp.iPageId)];
                arrPageProperties = [...arrPageProperties, { "iPageId": parseInt(objTemp.iPageId), "vPageName": objTemp.vTestCaseName }];
            });
            let objParams = {
                "Data": {
                    "PageIds": arrPageIds,
                    "SubjectForMainClient": null,
                    "TaskProperties": arrPageProperties,
                    "LanguageData": null,
                    "IsFirstTask": true,
                    "IsLastTask": true,
                    "IsNotFromIntranet": true,
                    "ContentUsageGroupId": "UseCaseContentGroup",
                    "MultiMediaUsageGroupId": "UseCaseMediaGroup"
                },
                "CallBacks": {
                    "EditorCloseCallback": (objPageJson) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objPageJson } });
                    }
                },
                "ParentProps": {
                    "JConfiguration": objContext.props.JConfiguration,
                    "ClientUserDetails": objContext.props.ClientUserDetails,
                }
            };
            let objEditor = new Editor();
            objEditor.OpenEditor(objParams);
        }
    }

    /**
     * @name DeletePopup  
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenDeleteImplementationPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"] : [];
        var strDeleteVariables = "";
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vImplementationStepName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => {
                        this.DeleteImplementationStep(arrSelectedRows, strPopupId, objContext)
                    }
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
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
    * @name DeleteImplementationStep
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes UseCase and close popup on success
    */
    DeleteImplementationStep(arrSelectedRows, strPopupId, objContext) {
        let objselectedUseCaseRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] : {};
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uUseCaseId": objselectedUseCaseRow.uUseCaseId
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
        objParams = {
            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.ClientUserDetails.uUserId
        };

        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.DeleteData(objParams, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ImplementationStepGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name OpenDeleteTestCasePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting TestCase
     */
    OpenDeleteTestCasePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"] : [];
        var strDeleteVariables = "";
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vTestCaseName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => {
                        this.DeleteTestCase(arrSelectedRows, strPopupId, objContext)
                    }
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
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
    * @name DeleteTestCase
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes UseCase and close popup on success
    */
    DeleteTestCase(arrSelectedRows, strPopupId, objContext) {
        let objselectedUseCaseRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] : {};
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uUseCaseId": objselectedUseCaseRow.uUseCaseId
                    }
                }
            ]
        }
        objParams = {
            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.ClientUserDetails.uUserId
        };
        Object_DevServer_ProductManagement_TestCase.DeleteData(objParams, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestCaseGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name OpenUseCase
     * @param {object} objContext objContext
     * @summary Handles the double click event
     */
    OpenUseCase(objContext) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        objContext.dispatch({ type: "SET_STATE", payload: { "GridToDisplay": "UseCaseGrid" } });
        ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", []);
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ImplementationStepGrid": null });
        var BreadCrumbNavigation = ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"][0]["vFolderName"] + ":" + ApplicationState.GetProperty("ActiveModuleName") + ":" + ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["vUseCaseName"];
        ApplicationState.SetProperty("BreadCrumbNavigation", BreadCrumbNavigation);
    }

    /**
     * @name OpenImplementationStep
     * @param {any} objContext
     * @summary to openPopup to see code for implementationStep
     */
    OpenImplementationStep(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : [];
        if (arrSelectedRows.length > 0) {
            Popup.ShowTabbedPopup({
                Data: {
                    ModuleName: "ImplementationStep",
                    Id: "ImplementationStep",
                    UseCaseId: arrSelectedRows[0]["uUseCaseId"]
                },
                Meta: {
                    PopupName: "ImplementationStep",
                    CssClassName: "code-crawler-popup-parent",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    //ShowToggleMaximizeIcon: true,
                    Height: "100%",
                    Width: "100%",
                    HeaderData: []
                },
                Resource: {
                    JConfiguration: objContext.props.JConfiguration,
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props),
                    //TextResourcesKey: "ImplementationStepPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    OnClosePopup: () => {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ImplementationStepGrid": null });
                    }
                },
                CallBacks: {}
            })
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props),
                    TextResourcesKey: "ContentErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenTestCase
     * @param {any} objContext
     * @summary to openPopup to see code for implementationStep
     */
    OpenTestCase(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : [];
        if (arrSelectedRows.length > 0) {
            Popup.ShowTabbedPopup({
                Data: {
                    ModuleName: "TestCase",
                    Id: "TestCase",
                    UseCaseId: arrSelectedRows[0]["uUseCaseId"]
                },
                Meta: {
                    PopupName: "TestCase",
                    CssClassName: "code-crawler-popup-parent",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    //ShowToggleMaximizeIcon: true,
                    Height: "100%",
                    Width: "100%",
                    HeaderData: []
                },
                Resource: {
                    JConfiguration: objContext.props.JConfiguration,
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props),
                    //TextResourcesKey: "ImplementationStepPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    OnClosePopup: () => {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestCaseGrid": null });
                    }
                },
                CallBacks: {}
            })
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props),
                    TextResourcesKey: "ContentErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenCodeCrawler
     * @param {any} objContext
     * @summary to openPopup to see code for implementationStep
     */
    OpenCodeCrawler(objContext, strModuleFrom) {
        if (strModuleFrom == "UseCase") {
            let objselectedUseCaseRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] : {};
            let objImplementationStepParam = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "uUseCaseId": objselectedUseCaseRow.uUseCaseId
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                }
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.GetData(objImplementationStepParam, (objReturnData) => {
                let arrImplementationStepData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
                if (arrImplementationStepData.length > 0) { }
                else {
                    arrImplementationStepData = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep, "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep;uUseCaseId;" + objselectedUseCaseRow.uUseCaseId + ";cIsDeleted;N")["Data"]
                }
                let arrUniqueId = []
                arrImplementationStepData.map((objImplementationStep) => {
                    arrUniqueId = objImplementationStep["vUniqueCode"] && objImplementationStep["cIsDeleted"] == "N" ? [...arrUniqueId, objImplementationStep["vUniqueCode"]] : [...arrUniqueId]
                });
                this.OpenCodeCrawlerPopup(objContext, arrUniqueId);
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        else {
            this.OpenCodeCrawlerPopup(objContext, [ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"][0]["vUniqueCode"]]);
        }
    }

    /**
     * @name OpenCodeCrawler
     * @param {any} objContext
     * @summary to openPopup to see code for implementationStep
     */
    OpenCodeCrawlerPopup(objContext, arrUniqueId) {
        if (arrUniqueId.length > 0) {
            Popup.ShowPopup({
                Data: {
                    ModuleName: "CodeCrawler",
                    Id: "CodeCrawler",
                    CodeCrawlerUniqueId: arrUniqueId,
                    objContext: objContext
                },
                Meta: {
                    PopupName: "CodeCrawler",
                    CssClassName: "code-crawler-popup-parent",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: 500,
                    Width: 900,
                    HeaderData: []
                },
                Resource: {
                    Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props),
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                },
                Events: {
                },
                CallBacks: {}
            })
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props),
                    TextResourcesKey: "ContentErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenAddEditTestCaseStepPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call tabbed pop-up for Add/Edit of UseCase
     * @return null
     */
    OpenAddEditTestCaseStepPopup(objContext, blnIsEdit) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"] : [];
        let arrSelectedTestCaseStepRows = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TestCaseStepGrid"] ? ApplicationState.GetProperty("SelectedRows")["TestCaseStepGrid"] : [];
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }

        if (!blnShowErrorPopup) {
            var objData = {
                IsEdit: blnIsEdit,
                TestCaseId: objContext.state.objSelectedTestCase.uTestCaseId
            }

            Popup.ShowTabbedPopup({
                Data: objData,
                Meta: {
                    PopupName: "AddEditTestCaseStep",
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
                    ShowHeader: true,
                    ShowCloseIcon: true,
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

    /**
     * @name DeletePopup   
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenDeleteTestCaseStepPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestCaseStepGrid"] : [];
        var strDeleteVariables = "";
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vTestCaseStepName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => {
                        this.DeleteTestCaseStep(arrSelectedRows, strPopupId, objContext)
                    }
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
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
    * @name DeleteImplementationStep
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes UseCase and close popup on success
    */
    DeleteTestCaseStep(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uTestCaseId": objContext.state.objSelectedTestCase.uTestCaseId
                    }
                }
            ]
        }
        objParams = {
            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
        };
        Object_DevServer_ProductManagement_TestCaseStep.DeleteData(objParams, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ImplementationStepGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
        * @name MoveSelectedRow
        * @param {any} objContext
        * @summary Return Grid data
        * @returns {object} Grid data
        */
    MoveSelectedRow(objContext, strType) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        var objSelectedRows = arrSelectedRows && arrSelectedRows["UseCaseGrid"] && arrSelectedRows["UseCaseGrid"][0] ? arrSelectedRows["UseCaseGrid"][0] : null;
        let arrUseCaseData = DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + ApplicationState.GetProperty("ActiveSubNavigationId") + ";cIsDeleted;N").Data;
        arrUseCaseData = arrUseCaseData.length > 0 ? arrUseCaseData.filter((objData) => objData["cIsDeleted"] == "N") : [];
        var objEditData = this.GetAdjacentUseCase(objSelectedRows, strType, arrUseCaseData);
        //arrUseCaseData.filter(objEditedData => objEditedData["uUseCaseId"] == objEditData["uUseCaseId"])[0]["iOrderId"];
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uModuleId": ApplicationState.GetProperty("ActiveSubNavigationId")
                    }
                }, {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
        if (objEditData != null) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
                "SearchQuery": objSearchQuery,
                "vEditData": [{ ...objSelectedRows, "iOrderId": arrUseCaseData.filter(objEditedData => objEditedData["uUseCaseId"] == objEditData["uUseCaseId"])[0]["iOrderId"] }, objEditData],
                "uUserId": objContext.props.ClientUserDetails.UserId
            };
            Object_DevServer_ProductManagement_UseCase.EditData(objParams, (objReturn, cIsNewData) => {
                let objSelectedRow = objReturn.filter(objEditedData => objEditedData["uUseCaseId"] == objSelectedRows["uUseCaseId"]);
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "UseCaseGrid": [{ ...objSelectedRow[0], "HierarchicalGridCollapse": 'N' }] });
                //ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", []);
                ApplicationState.SetProperty("blnShowAnimation", false);

                //Adding code to set div reference to null
                let arrSelectedUseCaseIdForcollapse = ApplicationState.GetProperty("SelectedUseCaseIdforCollapse");
                let arrSelectedRowForRefChange = [];
                arrSelectedUseCaseIdForcollapse.map((objSelectedUseCaseIdForCollapse) => {
                    if (objReturn.filter((objData) => objData["uUseCaseId"] == objSelectedUseCaseIdForCollapse["uUseCaseId"] && objSelectedUseCaseIdForCollapse["IsSubGrid"] == "Y").length > 0) {
                        let refHierarchicalGrid = objSelectedUseCaseIdForCollapse["SelectedUseCaseReference"] ? objSelectedUseCaseIdForCollapse["SelectedUseCaseReference"] : ""
                        if (refHierarchicalGrid != "") {
                            ReactDOM.hydrate(
                                <Provider store={store}>
                                </Provider>,
                                refHierarchicalGrid.current
                            );
                        }
                        arrSelectedRowForRefChange = [...arrSelectedRowForRefChange, { ...objSelectedUseCaseIdForCollapse, "IsSubGrid": "N" }];
                    }
                    else {
                        arrSelectedRowForRefChange = [...arrSelectedRowForRefChange, { ...objSelectedUseCaseIdForCollapse }];
                    }
                });
                ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", arrSelectedRowForRefChange);
                //End
            });
        }
        ApplicationState.SetProperty("blnShowAnimation", false);
    }

    /**
     * @name to get the up or down task
     * @param {object} objContext {state, props, dispatch, ...}
     * @param {object} objSelectedRow current task id
     * @param {string} strType up/Down
     * @summary Returns the adjacent task data.
     * @returns {obejct} Task Properties.
     */
    GetAdjacentUseCase(objSelectedRow, strType, arrUseCaseData) {
        let intUseCaseIndex;
        //arrUseCaseData.sort((a, b) => a.iOrderId - b.iOrderId);
        arrUseCaseData.map((objUseCaseItem, intIndex) => {
            if (objUseCaseItem.uUseCaseId == objSelectedRow["uUseCaseId"]) {
                intUseCaseIndex = intIndex;
            }
        });
        let objUseCaseData = null;
        while (objUseCaseData === null && intUseCaseIndex >= 0 && intUseCaseIndex < arrUseCaseData.length) {
            intUseCaseIndex = strType.toLowerCase() == "up" ? intUseCaseIndex - 1 : intUseCaseIndex + 1;
            if (arrUseCaseData[intUseCaseIndex] && arrUseCaseData[intUseCaseIndex]["uModuleId"] == ApplicationState.GetProperty("ActiveSubNavigationId")) {
                objUseCaseData = { ...arrUseCaseData[intUseCaseIndex], "iOrderId": objSelectedRow["iOrderId"] };
            }
        }
        return objUseCaseData;
    }

    /**
     * @name MoveSelectedRow
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    MoveTestCaseSelectedRow(objContext, strType) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        var objSelectedUseCaseRows = arrSelectedRows && arrSelectedRows["UseCaseGrid"] && arrSelectedRows["UseCaseGrid"][0] ? arrSelectedRows["UseCaseGrid"][0] : null;
        var objSelectedRows = arrSelectedRows && arrSelectedRows["TestCaseGrid"] && arrSelectedRows["TestCaseGrid"][0] ? arrSelectedRows["TestCaseGrid"][0] : null;
        let arrTestCaseData = DataRef(objContext.props.Object_DevServer_ProductManagement_TestCase, "Object_DevServer_ProductManagement_TestCase;uUseCaseId;" + objSelectedUseCaseRows.uUseCaseId).Data;
        arrTestCaseData = arrTestCaseData && arrTestCaseData.length > 0 ? arrTestCaseData.filter((objData) => objData["cIsDeleted"] == "N") : [];
        var objEditData = this.GetAdjacentTestCase(objSelectedRows, strType, arrTestCaseData, objSelectedUseCaseRows.uUseCaseId);
        //arrTestCaseData.filter(objEditedData => objEditedData["uTestCaseId"] == objEditData["uTestCaseId"])[0]["iOrderId"];
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uUseCaseId": objSelectedUseCaseRows.uUseCaseId
                    }
                }
            ]
        }
        if (objEditData != null) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
                "SearchQuery": objSearchQuery,
                "vEditData": [{ ...objSelectedRows, "iOrderId": arrTestCaseData.filter(objEditedData => objEditedData["uTestCaseId"] == objEditData["uTestCaseId"])[0]["iOrderId"] }, objEditData],
                "uUserId": objContext.props.ClientUserDetails.UserId
            };
            Object_DevServer_ProductManagement_TestCase.EditData(objParams, (objReturn, cIsNewData) => {
                let objSelectedRow = objReturn.filter(objEditedData => objEditedData["uTestCaseId"] == objSelectedRows["uTestCaseId"]);
                ApplicationState.SetProperty("SelectedRows", { ...arrSelectedRows, "TestCaseGrid": [objSelectedRow[0]] });
                ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", []);
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        ApplicationState.SetProperty("blnShowAnimation", false);
    }

    /**
     * @name to get the up or down task
     * @param {object} objContext {state, props, dispatch, ...}
     * @param {object} objSelectedRow current task id
     * @param {string} strType up/Down
     * @summary Returns the adjacent task data.
     * @returns {obejct} Task Properties.
     */
    GetAdjacentTestCase(objSelectedRow, strType, arrTestCaseData, uUseCaseId) {
        let intTestCaseIndex;
        arrTestCaseData.map((objUseCaseItem, intIndex) => {
            if (objUseCaseItem.uTestCaseId == objSelectedRow["uTestCaseId"]) {
                intTestCaseIndex = intIndex;
            }
        });
        let objUseCaseData = null;
        while (objUseCaseData === null && intTestCaseIndex >= 0 && intTestCaseIndex < arrTestCaseData.length) {
            intTestCaseIndex = strType.toLowerCase() == "up" ? intTestCaseIndex - 1 : intTestCaseIndex + 1;
            if (arrTestCaseData[intTestCaseIndex] && arrTestCaseData[intTestCaseIndex]["uUseCaseId"] == uUseCaseId) {
                objUseCaseData = { ...arrTestCaseData[intTestCaseIndex], "iOrderId": objSelectedRow["iOrderId"] };
            }
        }
        return objUseCaseData;
    }

    /**
     * @name MoveSelectedRow
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    MoveImplementationStepSelectedRow(objContext, strType) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        var objSelectedUseCaseRows = arrSelectedRows && arrSelectedRows["UseCaseGrid"] && arrSelectedRows["UseCaseGrid"][0] ? arrSelectedRows["UseCaseGrid"][0] : null;
        var objSelectedRows = arrSelectedRows && arrSelectedRows["ImplementationStepGrid"] && arrSelectedRows["ImplementationStepGrid"][0] ? arrSelectedRows["ImplementationStepGrid"][0] : null;
        let arrImplementationStepData = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep, "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep;uUseCaseId;" + objSelectedUseCaseRows.uUseCaseId + ";cIsDeleted;N")["Data"]
        arrImplementationStepData = arrImplementationStepData.length > 0 ? arrImplementationStepData.filter((objData) => objData["cIsDeleted"] == "N") : [];
        var objEditData = this.GetAdjacentImplementationStep(objSelectedRows, strType, arrImplementationStepData, objSelectedUseCaseRows.uUseCaseId);
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uUseCaseId": objSelectedUseCaseRows.uUseCaseId
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
        if (objEditData != null) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
                "SearchQuery": objSearchQuery,
                "vEditData": [{ ...objSelectedRows, "iOrderId": arrImplementationStepData.filter(objEditedData => objEditedData["uUseCaseImplementationStepId"] == objEditData["uUseCaseImplementationStepId"])[0]["iOrderId"] }, objEditData],
                "uUserId": objContext.props.ClientUserDetails.UserId
            };
            Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.EditData(objParams, (objReturn, cIsNewData) => {
                let objSelectedRow = objReturn.filter(objEditedData => objEditedData["uUseCaseImplementationStepId"] == objSelectedRows["uUseCaseImplementationStepId"]);
                ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", []);
                ApplicationState.SetProperty("SelectedRows", { ...arrSelectedRows, "ImplementationStepGrid": [objSelectedRow[0]] });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        //ApplicationState.SetProperty("blnShowAnimation", false);
    }

    /**
     * @name to get the up or down task
     * @param {object} objContext {state, props, dispatch, ...}
     * @param {object} objSelectedRow current task id
     * @param {string} strType up/Down
     * @summary Returns the adjacent task data.
     * @returns {obejct} Task Properties.
     */
    GetAdjacentImplementationStep(objSelectedRow, strType, arrImplementationStepData, uUseCaseId) {
        let intImplementationStepIndex;
        arrImplementationStepData.map((objUseCaseItem, intIndex) => {
            if (objUseCaseItem.uUseCaseImplementationStepId == objSelectedRow["uUseCaseImplementationStepId"]) {
                intImplementationStepIndex = intIndex;
            }
        });
        let objUseCaseData = null;
        while (objUseCaseData === null && intImplementationStepIndex >= 0 && intImplementationStepIndex < arrImplementationStepData.length) {
            intImplementationStepIndex = strType.toLowerCase() == "up" ? intImplementationStepIndex - 1 : intImplementationStepIndex + 1;
            if (arrImplementationStepData[intImplementationStepIndex] && arrImplementationStepData[intImplementationStepIndex]["uUseCaseId"] == uUseCaseId) {
                objUseCaseData = { ...arrImplementationStepData[intImplementationStepIndex], "iOrderId": objSelectedRow["iOrderId"] };
            }
        }
        return objUseCaseData;
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        let arrOfficeRibbonData = [], objRibbonData;
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] : [];
        switch (objContext.state.GridToDisplay) {
            case "ImplementationGrid":
                objRibbonData = {
                    objContext,
                    "AddImplementationStepPopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditImplementationStepPopup(objContext, false),
                    "EditImplementationStepPopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditImplementationStepPopup(objContext, true),
                    "OpenDeleteImplementationPopup": () => objContext.UseCase_ModuleProcessor.OpenDeleteImplementationPopup(objContext),
                    "OpenImplementationStepContent": () => objContext.UseCase_ModuleProcessor.OpenImplementationStepContent(objContext),
                    "OpenUseCase": () => objContext.UseCase_ModuleProcessor.OpenUseCase(objContext),
                    "OpenCodeCrawler": () => objContext.UseCase_ModuleProcessor.OpenCodeCrawler(objContext, "implementationStep"),
                    "MoveImplementationStepUp": () => objContext.UseCase_ModuleProcessor.MoveImplementationStepSelectedRow(objContext, "up"),
                    "MoveImplementationStepDown": () => objContext.UseCase_ModuleProcessor.MoveImplementationStepSelectedRow(objContext, "down"),
                    "OpenImplementationDocuments": () => objContext.UseCase_ModuleProcessor.OpenDocuments(objContext, "ImplementationStepGrid", "uUseCaseImplementationStepId")
                }
                arrOfficeRibbonData = UseCase_OfficeRibbon.GetImplementationOfficeRibbonData(objRibbonData);
                break;
            case "TestCaseStepGrid":
                objRibbonData = {
                    objContext,
                    "OpenAddTestCaseStepPopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditTestCaseStepPopup(objContext, false),
                    "OpenEditTestCaseStepPopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditTestCaseStepPopup(objContext, true),
                    "OpenDeleteTestCaseStepPopup": () => objContext.UseCase_ModuleProcessor.OpenDeleteTestCaseStepPopup(objContext),
                    "OpenUseCase": () => objContext.UseCase_ModuleProcessor.OpenUseCase(objContext),
                }
                arrOfficeRibbonData = UseCase_OfficeRibbon.GetTestCaseStepOfficeRibbonData(objRibbonData);
                break;
            case "UseCaseGrid":
                objRibbonData = {
                    objContext,
                    "AddPopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditUseCasePopup(objContext, false),
                    "EditPopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditUseCasePopup(objContext, true),
                    "DeletePopup": () => objContext.UseCase_ModuleProcessor.OpenDeletePopup(objContext),
                    "OpenContent": () => objContext.UseCase_ModuleProcessor.OpenContent(objContext),
                    "OpenDocuments": () => objContext.UseCase_ModuleProcessor.OpenDocuments(objContext, "UseCaseGrid", "uUseCaseId"),
                    "MoveUp": () => objContext.UseCase_ModuleProcessor.MoveSelectedRow(objContext, "up"),
                    "MoveDown": () => objContext.UseCase_ModuleProcessor.MoveSelectedRow(objContext, "down"),
                    "OpenCodeCrawler": () => objContext.UseCase_ModuleProcessor.OpenCodeCrawler(objContext, "UseCase"),
                    "OpenImplementationStep": () => objContext.UseCase_ModuleProcessor.OpenImplementationStep(objContext),
                    "OpenTestCase": () => objContext.UseCase_ModuleProcessor.OpenTestCase(objContext),
                    "Cut": () => {
                        ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "UseCase": { "Type": "Cut", "Data": arrSelectedRows ?? [] } })
                    }, //[arrSelectedRows[0] ?? {}]
                    "Paste": () => { objContext.UseCase_ModuleProcessor.Paste(objContext, objContext.props.ActiveSubNavigationId) },
                    //"TestCasePopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditTestCasePopup(objContext, false),
                    //"EditTestCasePopup": () => objContext.UseCase_ModuleProcessor.OpenAddEditTestCasePopup(objContext, true),
                    //"OpenDeleteTestCasePopup": () => objContext.UseCase_ModuleProcessor.OpenDeleteTestCasePopup(objContext),
                    //"OpenTestCaseContent": () => objContext.UseCase_ModuleProcessor.OpenTestCaseContent(objContext),

                    //"MoveTestCaseUp": () => objContext.UseCase_ModuleProcessor.MoveTestCaseSelectedRow(objContext, "up"),
                    //"MoveTestCaseDown": () => objContext.UseCase_ModuleProcessor.MoveTestCaseSelectedRow(objContext, "down"),
                    //"OpenTestDocuments": () => objContext.UseCase_ModuleProcessor.OpenDocuments(objContext, "TestCaseGrid", "uTestCaseId"),
                };
                arrOfficeRibbonData = UseCase_OfficeRibbon.GetUseCaseOfficeRibbonData(objRibbonData);
                break;
        }
        ApplicationState.SetProperty("OfficeRibbonData", arrOfficeRibbonData);
    }

    /**
    * @name Paste
    * @param {object} objContext objContext
    * @param {string} strModuleId strModuleId
    * @summary Handles the PasteFolder event
    */
    Paste(objContext, strModuleId, blnIsResetGrid = true) {
        let objCutCopySource = ApplicationState.GetProperty("CutCopySource")["UseCase"];
        if (objCutCopySource.Type == "Cut") {
            this.CutPaste(objCutCopySource["Data"], strModuleId, objContext, blnIsResetGrid);
        }
        //else if (objCutCopySource.Type == "Copy") {
        //    this.CopyPaste(objCutCopySource["Data"], strModuleId, objContext, blnIsResetGrid);
        //}
    }

    /**
     * @name CutPaste
     * @param {array} arrData arrData
     * @param {string} strModuleId strModuleId
     * @param {object} objContext objContext
     * @param {bool} blnNavigate blnNavigate
     * @summary Handles the CutPaste event
     */
    CutPaste(arrSourceData, strModuleId, objContext, blnIsResetGrid) {
        arrSourceData = arrSourceData ? arrSourceData : ApplicationState.GetProperty("CutCopySource")["UseCase"]?.["Data"];
        //let strActiveModuleId = (props.IsForServerRenderHtml && props.QueryStringObject?.SubNavigationId) ?? ApplicationState.GetProperty("ActiveSubNavigationId") ?? "";
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uModuleId": strModuleId
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
        let arrEditData = [];
        arrSourceData.map((objSourceData) => {
            arrEditData = [...arrEditData, { ...objSourceData, "uModuleId": strModuleId }];
        })
        let objParams = {
            "SearchQuery": objSearchQuery,
            "vEditData": arrEditData,
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        let arrPasteModuleUseCaseData = DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + strModuleId + ";cIsDeleted;N")["Data"];
        if (arrPasteModuleUseCaseData.length > 0) {
            Object_DevServer_ProductManagement_UseCase.EditData(objParams, (objReturn, cIsNewData) => {
                let arrUseCaseData = arrSourceData.length > 0 ? DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + arrSourceData[0]["uModuleId"] + ";cIsDeleted;N")["Data"] : [];
                if (arrUseCaseData.length > 0) {
                    ArcadixCacheData.EditData("Object_DevServer_ProductManagement_UseCase", { "Filter": "Object_DevServer_ProductManagement_UseCase;uModuleId;" + arrSourceData[0]["uModuleId"] + ";cIsDeleted;N", "Value": { "Data": objReturn, "PrimaryKeyName": "uUseCaseId" } });
                }
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "UseCase": null });
                if (blnIsResetGrid)
                    this.ResetGridSelection("UseCaseGrid");
            });
        }
        else {
            Object_DevServer_ProductManagement_UseCase.EditData(objParams, (objReturn, cIsNewData) => {
                let arrUseCaseData = arrSourceData.length > 0 ? DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + arrSourceData[0]["uModuleId"] + ";cIsDeleted;N")["Data"] : [];
                if (arrUseCaseData.length > 0) {
                    ArcadixCacheData.EditData("Object_DevServer_ProductManagement_UseCase", { "Filter": "Object_DevServer_ProductManagement_UseCase;uModuleId;" + arrSourceData[0]["uModuleId"] + ";cIsDeleted;N", "Value": { "Data": objReturn, "PrimaryKeyName": "uUseCaseId" } });
                }
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "UseCase": null });
                if (blnIsResetGrid)
                    this.ResetGridSelection("UseCaseGrid");
            }, true);
        }
        
    }

    /**
     * @name LoadSubModulePrefetchLinks
     * @param {object} objContext objContext
     * @summary Forms Links to be Prefetched for TestCase and ImplementationStep
     */
    LoadSubModulePrefetchLinks(objContext) {
        if (JConfiguration.IsPrefetchEnabled && objContext.props.ActiveSubNavigationId) {
            let arrPrefetchFilterData = DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + objContext.props.ActiveSubNavigationId + ";cIsDeleted;N")["Data"]; 
            if (arrPrefetchFilterData?.length > 0){
                GetObjectListForModule("TestCase", objContext, true, arrPrefetchFilterData);
                GetObjectListForModule("ImplementationStep", objContext, true, arrPrefetchFilterData)
            }
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css"
        ];
    }
}

export default UseCase_ModuleProcessor;