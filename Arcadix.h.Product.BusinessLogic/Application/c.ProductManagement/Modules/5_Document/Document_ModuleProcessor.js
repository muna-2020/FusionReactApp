// React related imports.
import React from 'react';

//Objects required for module.
import Object_DevServer_ProductManagement_ProductManagementUser from '@shared/Object/c.Cockpit/ProductManagementUser/ProductManagementUser';
import Object_DevServer_ProductManagement_ProductDocument from '@shared/Object/c.ProductManagement/Document/Document';

//Module related fies...
import * as Document_MetaData from '@shared/Application/c.ProductManagement/Modules/5_Document/Document_MetaData';
import * as Document_ContextMenuData from '@shared/Application/c.ProductManagement/Modules/5_Document/Document_ContextMenuData';

/**
* @name Document_ModuleProcessor
* @summary Class for Document module display.
*/
class Document_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_Folder",
            "Object_DevServer_ProductManagement_ProductDocument",
            "Object_DevServer_ProductManagement_ProductManagementUser",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/5_Document/Document",
            { "StoreKey": "ApplicationState", "DataKey": "ActiveSubNavigationId" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        let blnIsForModule = objContext.props.Data && objContext.props.Data.IsForModule;
        if (!blnIsForModule) {
            ApplicationState.SetProperty("SelectedRows", null);
        }
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
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
        //Document object
        if (arrPrefetchFilterData) {
            Object_DevServer_ProductManagement_ProductDocument.Initialize({});
            arrPrefetchFilterData?.forEach(objFolder => {
                arrDataRequest = [
                    ...arrDataRequest,
                    {
                        "URL": Object_DevServer_ProductManagement_ProductDocument.URL,
                        "InitialDataCallParam": this.GetDocumentParams(objFolder["uFolderId"], props)
                    }
                ]
            }); 
        }
        else {
            let strDocumentFolderId = props.Data && (props.Data.IsForModule || props.Data.IsForUseCase || props.Data.IsForTestCase || props.Data.IsForImplementationStep) ? props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId");
            if (!strDocumentFolderId && props.IsForServerRenderHtml && props.SubNavigationId) {
                strDocumentFolderId = props.SubNavigationId;
            }
            //Condition check added to Initialize Document Object only if DocumentFolderId is present (for Prefetch -temp)
            if (strDocumentFolderId) {
                let objDocumentParams = this.GetDocumentParams(strDocumentFolderId, props);
                Object_DevServer_ProductManagement_ProductDocument.Initialize(objDocumentParams);
                arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ProductDocument];
            }            
        }
       
        //ProductManagmentuser
        Object_DevServer_ProductManagement_ProductManagementUser.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ProductManagementUser];

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/5_Document/Document"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    GetDocumentParams(strDocumentFolderId, props) {
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
                            "uDocumentFolderId": strDocumentFolderId
                        }
                    },
                    {
                        "match": {
                            "cIsForModule": (props.Data && props.Data.IsForModule ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForUseCase": (props.Data && props.Data.IsForUseCase ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForTestCase": (props.Data && props.Data.IsForTestCase ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForImplementationStep": (props.Data && props.Data.IsForImplementationStep ? "Y" : "N")
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
     * @name LoadSelectedFolderDocuments
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
     */
    LoadSelectedFolderDocuments(objContext, strModuleId, blnIsResetGrid = true) {
        if (blnIsResetGrid) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            //objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: false } });
        }
        var objDocumentSortParams = {
            "iOrderId": {
                "order": "asc"
            }
        };
        let objDocumentParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "uDocumentFolderId": strModuleId
                        }
                    },
                    {
                        "match": {
                            "cIsForModule": (objContext.props.Data && objContext.props.Data.IsForModule ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForUseCase": (objContext.props.Data && objContext.props.Data.IsForUseCase ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForTestCase": (objContext.props.Data && objContext.props.Data.IsForTestCase ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForImplementationStep": (objContext.props.Data && objContext.props.Data.IsForImplementationStep ? "Y" : "N")
                        }
                    }
                ]
            },
            "SortKeys": [objDocumentSortParams],
        };
        //if (!blnIsCheckInOrCheckOut && !QueryString.GetQueryStringValue("DocumentId")) {
        //    var strFilter = ";cIsForModule;" + (objContext.props.Data && objContext.props.Data.IsForModule ? "Y" : "N") + ";cIsForUseCase;" + (objContext.props.Data && objContext.props.Data.IsForUseCase ? "Y" : "N") + ";cIsForTestCase;" + (objContext.props.Data && objContext.props.Data.IsForTestCase ? "Y" : "N") + ";cIsForImplementationStep;" + (objContext.props.Data && objContext.props.Data.IsForImplementationStep ? "Y" : "N");
        //    if (!DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")) + strFilter.toString())) {
        //        ApplicationState.SetProperty("blnShowAnimation", true);
        //        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        //        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "DocumentGrid": null });
        //    }
        //    else {
        //        let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["DocumentGrid"] : null;
        //        if (fnResetGridSelection) {
        //            fnResetGridSelection();
        //        }
        //    }
        //}

        Object_DevServer_ProductManagement_ProductDocument.GetData(objDocumentParams, (arrData) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (blnIsResetGrid && !QueryString.GetQueryStringValue("DocumentId")) {
                this.ResetGridSelection("DocumentGrid");
                //let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["DocumentGrid"] : null;
                //if (fnResetGridSelection) {
                //    fnResetGridSelection();
                //}
                //let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["DocumentGrid"] : null;
                //if (fnResetGridSelection) {
                //    fnResetGridSelection();
                //}
                //this.ResetGridSelection("DocumentGrid");
                //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "DocumentGrid": null });
                //ApplicationState.SetProperty("blnShowAnimation", false);
                //objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            }
            //if (blnLoadComplete) {
                //ApplicationState.SetProperty("blnShowAnimation", false);
                //let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["DocumentGrid"] : null;
                //if (fnResetGridSelection) {
                //    fnResetGridSelection();
                //}
            //}
            //ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
    * @name OpenAddEditDocumentPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed popup for Add/Edit of Document
    * @return null
    */
    OpenAddEditDocumentPopup(objContext, blnIsEdit) {

        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props);
        let blnShowErrorPopup;
        if (blnIsEdit) {
            //blnShowErrorPopup = (!objSelectedRow || objSelectedRow.length <= 0) ? true : false;
            blnShowErrorPopup = false;
        }

        if (!blnShowErrorPopup) {
            var objData = {
                IsEdit: blnIsEdit,
                Object_DevServer_ProductManagement_ProductDocument: DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument),
                DocumentFolderId: (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")),
                IsForModule: objContext.props.Data && objContext.props.Data.IsForModule ? objContext.props.Data.IsForModule : false,
                IsForUseCase: objContext.props.Data && objContext.props.Data.IsForUseCase ? objContext.props.Data.IsForUseCase : false,
                IsForTestCase: objContext.props.Data && objContext.props.Data.IsForTestCase ? objContext.props.Data.IsForTestCase : false,
                IsForImplementationStep: objContext.props.Data && objContext.props.Data.IsForImplementationStep ? objContext.props.Data.IsForImplementationStep : false,
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

    /**
     * @name DeletePopup  
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["DocumentGrid"] : [];
        //let arrSelectedRows = this.GetSelectedRow(objContext);

        var strDeleteVariables = "";

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vDocumentName"] + ", ";
            });
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
                        this.DeleteDocument(arrSelectedRows, strPopupId, objContext)
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
    * @name DeleteDocument
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes Document and close popup on success
    */
    DeleteDocument(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                },
                {
                    "match": {
                        "uDocumentFolderId": (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId"))
                    }
                },
                {
                    "match": {
                        "cIsForModule": (objContext.props.Data && objContext.props.Data.IsForModule ? "Y" : "N")
                    }
                },
                {
                    "match": {
                        "cIsForUseCase": (objContext.props.Data && objContext.props.Data.IsForUseCase ? "Y" : "N")
                    }
                },
                {
                    "match": {
                        "cIsForTestCase": (objContext.props.Data && objContext.props.Data.IsForTestCase ? "Y" : "N")
                    }
                },
                {
                    "match": {
                        "cIsForImplementationStep": (objContext.props.Data && objContext.props.Data.IsForImplementationStep ? "Y" : "N")
                    }
                }
            ]
        }
        objParams = {

            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.ParentProps.ClientUserDetails.UserId : objContext.props.ClientUserDetails.UserId

        };

        Object_DevServer_ProductManagement_ProductDocument.DeleteData(objParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {                
                Popup.ClosePopup(strPopupId);
                this.SelectAdjacentGridRow("DocumentGrid", arrSelectedRows);
            }
        });
    }

    /**
    * @name GetDocumentGridData
    * @param {object} objContext
    * @summary it returns the object for DocumentGrid Data
    * @returns {object} Data
    */
    GetDocumentGridData(objContext) {
        var strFilter = ";cIsForModule;" + (objContext.props.Data && objContext.props.Data.IsForModule ? "Y" : "N") + ";cIsForUseCase;" + (objContext.props.Data && objContext.props.Data.IsForUseCase ? "Y" : "N") + ";cIsForTestCase;" + (objContext.props.Data && objContext.props.Data.IsForTestCase ? "Y" : "N") + ";cIsForImplementationStep;" + (objContext.props.Data && objContext.props.Data.IsForImplementationStep ? "Y" : "N");
        let arrDocumentData = DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")) + strFilter.toString()).Data;
        arrDocumentData = arrDocumentData ? arrDocumentData : [];
        if (QueryString.GetQueryStringValue("DocumentId")) {
            let objPreSelectedRow = arrDocumentData.find(objDocument => objDocument["uDocumentId"] == QueryString.GetQueryStringValue("DocumentId"));
            if (objPreSelectedRow) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, ["DocumentGrid"]: objPreSelectedRow ? [objPreSelectedRow] : null });
            }
            else {
                let strQueryString = QueryString.RemoveQueryStringValue(window.location.search, "DocumentId");
                let strPushUrl = window.location.pathname + strQueryString;
                let strRouterPath = strPushUrl.substring(0, strPushUrl.lastIndexOf("/"));
                ApplicationState.SetProperty('RouterPath', strRouterPath);
                objContext.props.history.push({ pathname: strPushUrl.replace("//", "/") });
            }
        }
        return {
            RowData: arrDocumentData,
        };
    }

    /**
    * @name GetDocumentMetaData
    * @param {object} objContext
    * @summary it returns the object for DocumentGrid Meta Data
    * @returns {object} Data
    */
    GetDocumentMetaData(objContext) {
        return {
            HeaderData: Document_MetaData.GetMetaData(objContext),
            Filter: null,
            PrimaryKey: "uDocumentId",
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
        let Text = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetDocumentGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetDocumentGridEvents(objContext) {
        let objEvents = {
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
            OnDragDrop: (objDragDetails, objDropDetails) => this.OnDragDrop(objDragDetails, objDropDetails, objContext),
            OnContextMenuClick: (objRowData, event, arrCheckedRows) => this.OnContextMenuClick(objRowData, event, objContext, arrCheckedRows)
        };
        return objEvents;
    }

    /**
    * @name OnClickRow
    * @param {object} objSelectedRow
    * @param {object} objContext
    * @summary Handles the click event of the grid.
    */
    OnClickRow(objSelectedRow, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": objSelectedRow } });     
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
        if (!objDropDetails.Type) {
            objDropDetails.Type = "Folder"; //Type will be null, when we drop into the Tree, so making it Folder
        }
        if (objDropDetails.Type == "Folder" && objDragDetails.Id != objDropDetails.Id) {
            let objDragData = null;
            if (objDragDetails.Type == "Folder") {
                objDragData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.find(obj => obj["uFolderId"] == objDragDetails.Id);
            }
            else {
                var strFilter = ";cIsForModule;" + (objContext.props.Data?.IsForModule ? "Y" : "N") + ";cIsForUseCase;" + (objContext.props.Data?.IsForUseCase ? "Y" : "N") + ";cIsForTestCase;" + (objContext.props.Data?.IsForTestCase ? "Y" : "N") + ";cIsForImplementationStep;" + (objContext.props.Data?.IsForImplementationStep ? "Y" : "N");
                let arrDocumentData = DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")) + strFilter.toString()).Data ?? [];
                objDragData = arrDocumentData.find(obj => obj["uDocumentId"] == objDragDetails.Id);
            }
            if (objDragData && objDropDetails.Id) {
                this.CutPaste(objContext, objDropDetails.Id, true, [objDragData]);
            }
        }
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
            AddDocument: (blnIsEdit = false) => this.OpenAddEditDocumentPopup(objContext, blnIsEdit, objRowData),
            DeleteDocument: () => this.OpenDeletePopup(objContext, objRowData),
            Cut: () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Document": { "Type": "Cut", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } }) },
            Paste: () => { this.CutPaste(objContext, objRowData.uDocumentFolderId, true) }
        };
        arrContextListSample = Document_ContextMenuData.GetDocumentContextMenuData(objData);                
        return arrContextListSample;
    }

    /**
    * @name GetDocumentGridCallBacks
    * @param {object} objContext
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetDocumentGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => {
                let objReturnRow = null;
                if (objRow["cIsDeleted"] == "N") {
                    objReturnRow = {
                        ...objRow,
                        Id: objRow.iPageFolderId,
                        Name: objRow.vPageFolderName,
                        Type: "Document",
                        cIsCheckedOut: this.GetCheckInInfo(objRow, objContext),
                        Edit: this.GetEditInfo(objRow, objContext),
                        CopyLink: this.CopyDocumentLink(objRow, objContext),
                        LastModifiedBy: this.CheckOutBy(objRow.uModifiedByUserId, objContext),
                        Read: this.ReadDocument(objRow, objContext)
                    }
                }
                return objReturnRow;
            }
        };
        return objCallBacks;
    }

    /**
     * @name
     * @param {any} objRow
     * @param {any} objContext
     * @summary forms the JSX based on the check in status of the document.
     * @return {object} React JSX
     */
    GetCheckInInfo(objRow, objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props);
        let strUserId = objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.ParentProps.ClientUserDetails.UserId : objContext.props.ClientUserDetails.UserId;

        if (objRow.cIsCheckedOut == "Y" && objRow.uCheckedOutUserId == strUserId) {
            return <div className="flex align-middle">
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: objContext.ImageMeta.CheckInImage
                    }}
                    Events={{
                        OnClickEventHandler: () => { !this.CheckIsMicrosoftDocument(objRow, objContext) && this.CheckIn(objRow, objContext) }
                    }}
                    ParentProps={objContext.props}
                />
                <span >{Localization.TextFormatter(objTextResource, "Me")}</span></div>
        }
        else if (objRow.cIsCheckedOut == "Y" && objRow.uCheckedOutUserId != strUserId) {
            return <div className="flex align-middle">
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: objContext.ImageMeta.CheckGreyImage
                    }}
                    ParentProps={objContext.props}
                />
                <span >{"(" + this.CheckOutBy(objRow.uCheckedOutUserId, objContext) + ")"}</span></div>
        }
        else {
            return <div className="flex align-middle">
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: objContext.ImageMeta.CheckOutImage
                    }}
                    Events={{
                        OnClickEventHandler: () => { !this.CheckIsMicrosoftDocument(objRow, objContext) && this.CheckOut(objRow, objContext)  }
                    }}
                    ParentProps={objContext.props}
                />
            </div>
        }
    }

    //---------------------------------------Commented out for now as WebSocket is disabled------------------------------------------
    ///** CheckOut
    // * @name
    // * @param {any} objRow
    // * @param {any} objContext
    // * @summary Calls the API to check out the document, if already checked out by some one, just loads the new data.
    // */
    //CheckOut(objRow, objContext) {
    //    let objParams = {
    //        Params: {
    //            "Event": objContext.state.CheckOutEvent,
    //            DocumentId: objRow.uDocumentId,
    //            SearchQuery: {
    //                "must": [
    //                    {
    //                        "match": {
    //                            "cIsDeleted": "N"
    //                        }
    //                    }
    //                ]
    //            }
    //        }
    //    }
    //    if (!this.CheckIsMicrosoftDocument(objRow)) {
    //        this.OpenConfirmationPopup(objContext, "CheckOutConfirmationPopup", objRow.vDocumentName, (strPopupKey) => {

    //            Object_DevServer_ProductManagement_ProductDocument.CheckOut(objParams, (objResponse) => {
    //                if (!objResponse.CheckOutByTheCurrentUser) {
    //                    this.OpenCheckOutErrorPopup(objContext);
    //                    this.LoadSelectedFolderDocuments(objContext, (objContext.props.Data && objContext.props.Data.IsForModule ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")), true)
    //                }
    //                else {
    //                    this.LoadSelectedFolderDocuments(objContext, (objContext.props.Data && objContext.props.Data.IsForModule ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")), true)
    //                }
    //                ApplicationState.SetProperty("CurrentRowData", { ...objRow, cIsCheckedOut: "Y" });
    //                Popup.ClosePopup(strPopupKey);
    //            })
    //        });
    //    }
    //    else {
    //        //this.OpenConfirmationPopup(objContext, "CheckOutConfirmationPopup", objRow.vDocumentName, (strPopupKey) => {
    //            Object_DevServer_ProductManagement_ProductDocument.CheckOut(objParams, (objResponse) => {
    //                if (!objResponse.CheckOutByTheCurrentUser) {
    //                    this.OpenCheckOutErrorPopup(objContext);
    //                    this.LoadSelectedFolderDocuments(objContext, (objContext.props.Data && objContext.props.Data.IsForModule ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")), true)
    //                }
    //                else {
    //                    this.LoadSelectedFolderDocuments(objContext, (objContext.props.Data && objContext.props.Data.IsForModule ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")), true)
    //                }
    //                ApplicationState.SetProperty("CurrentRowData", { ...objRow, cIsCheckedOut: "Y" });
    //                //Popup.ClosePopup(strPopupKey);
    //            });
    //        //});
    //    }
    //}

    ///** 
    // * @name CheckIn
    // * @param {any} objRow
    // * @param {any} objContext
    // * @summary Call the API To check the document 
    // */
    //CheckIn(objRow, objContext) {
    //    var objDocumentSortParams = {
    //        "iOrderId": {
    //            "order": "asc"
    //        }
    //    };
    //    let objParams = {
    //        "Event": objContext.state.CheckInEvent,
    //        SearchQuery: {
    //            "must": [
    //                {
    //                    "match": {
    //                        "cIsDeleted": "N"
    //                    }
    //                },
    //                {
    //                    "match": {
    //                        "uDocumentFolderId": (objContext.props.Data && objContext.props.Data.IsForModule ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId"))
    //                    }
    //                }
    //            ]
    //        },
    //        "SortKeys": [objDocumentSortParams],
    //        uUserId: objRow.uUserId,
    //        vEditData: [{ ...objRow, cIsCheckedOut: "N" }]
    //    }

    //    if (!this.CheckIsMicrosoftDocument(objRow)) {
    //        this.OpenConfirmationPopup(objContext, "CheckInConfirmationPopup", objRow.vDocumentName, (strPopupKey) => {
    //            Object_DevServer_ProductManagement_ProductDocument.EditData(objParams, (obj, blnCheckedIn) => {
    //                if (blnCheckedIn) {
    //                    //--------------------Commented out for now as Manual CheckIn/CheckOut is enabled---------------------
    //                    objContext.SignalRClass.Invoke({
    //                        "Event": objContext.state.CheckInEvent,
    //                        "AuthenticationKey": "2133",
    //                        "Data": { ...objRow, cIsCheckedOut: "N" }
    //                    })
    //                    //---------------------------------------------------------------------------------------------------
    //                    Popup.ClosePopup(strPopupKey);
    //                    ApplicationState.SetProperty("CurrentRowData", { ...objRow, cIsCheckedOut: "N" });
    //                }
    //            });
    //        })
    //    }
    //    else {
    //        let blnUpdateCheckoutStatus = ApplicationState.GetProperty("UpdateCheckoutStatus");
    //        if (blnUpdateCheckoutStatus == undefined || blnUpdateCheckoutStatus == false) {
    //        //this.OpenConfirmationPopup(objContext, "CheckInConfirmationPopup", objRow.vDocumentName, (strPopupKey) => {
    //            Object_DevServer_ProductManagement_ProductDocument.EditData(objParams, (obj, blnCheckedIn) => {
    //                if (blnCheckedIn) {
    //                    //--------------------Commented out for now as Manual CheckIn/CheckOut is enabled---------------------
    //                    ApplicationState.SetProperty("UpdateCheckoutStatus", true);
    //                    objContext.SignalRClass.Invoke({
    //                        "Event": objContext.state.CheckInEvent,
    //                        "AuthenticationKey": "2133",
    //                        "Data": { ...objRow, cIsCheckedOut: "N" }
    //                    })
    //                    //----------------------------------------------------------------------------------------------------
    //                    //Popup.ClosePopup(strPopupKey);
    //                    ApplicationState.SetProperty("CurrentRowData", { ...objRow, cIsCheckedOut: "N" });
    //                }
    //            });
    //        //})
    //        }
    //    }
    //}
    //------------------------------------------------------------------------------------------------------------------------------------

    /** CheckOutBy
    * @name
    * @param {any} objRow
    * @param {any} objContext
    * @summary Calls the API to check out userId for the document
    */
    CheckOutBy(uCheckedOutUserId, objContext) {
        let strProductMgmtUser;
        objContext.props.Object_DevServer_ProductManagement_ProductManagementUser["Data"].map(objProductMgmtUsers => {
            if (objProductMgmtUsers["uProductManagementUserId"] == uCheckedOutUserId) {
                strProductMgmtUser = objProductMgmtUsers["vFirstName"] + " " + objProductMgmtUsers["vName"]
            }
        })
        return strProductMgmtUser;
    }
    
    /** CheckIsMicrosoftDocument
    * @name
    * @param {any} objRow
    * @param {any} objContext
    * @summary Checks if the document is a MS-Document or of other type.
    */
    CheckIsMicrosoftDocument(objRow, objContext) {
        if (!objContext.props.IsForServerRenderHtml) {
            ITHit.WebDAV.Client.LicenseId = '05994e7f-cda0-4359-ba31-696d9a8aa0b3'; //ajax library license
            var strDocumentUrl = JConfiguration.WebDAVServer + JConfiguration.MainClientId + "/ProductManagement/Document/" + objRow.uDocumentId + "." + objRow.vFileType;

            var objDocManager = ITHit.WebDAV.Client.DocManager;
            if (objDocManager.IsMicrosoftOfficeDocument(strDocumentUrl))
                return true;
            else
                return false;
        }
    }

    /** 
     * @name CopyDocumentLink
     * @param {any} objRow objRow
     * @param {any} objContext objContext
     * @summary To Copy document link to 
     */
    CopyDocumentLink(objRow, objContext) {
        return <div className="flex align-middle">
            <WrapperComponent
                ComponentName={"Image"}
                Data={{
                    Image: objContext.ImageMeta.CopyImage
                }}
                Events={{
                    OnClickEventHandler: () => { this.CopyLinkToClipboard(objRow) }
                }}
                ParentProps={objContext.props}
            />
        </div>
    }

    /**
    * @name CopyDocumentLink
    * @param {any} objRow objRow
    * @summary Handles event to copy Document Link to clipboard.
    */
    CopyLinkToClipboard(objRow) {
        //------------------------Create a Dummy element in DOM, set the value to it and then using execCommand("copy") to copy the link to Clipboard-------------------
        let objDomElement = document.createElement("input");
        document.body.appendChild(objDomElement);
        //objDomElement.value = JConfiguration.WebDAVServer + JConfiguration.MainClientId + "/ProductManagement/Document/" + objRow.uDocumentId + "." + objRow.vFileType;
        objDomElement.value = QueryString.SetQueryStringValue(window.location.href, "DocumentId", objRow.uDocumentId);
        objDomElement.select();
        document.execCommand("copy");
        document.body.removeChild(objDomElement);
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------
    }

    /**
     * @name OpenConfirmationPopup
     * @param {any} objContext
     * @param {any} strKey
     * @param {any} ConfirmEvent
     */
    OpenConfirmationPopup(objContext, strKey, strDocumentName, ConfirmEvent) {
        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props),
                TextResourcesKey: strKey,
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                Variables: { "DocumentName": strDocumentName }
            },
            Events: {
                ConfirmEvent: ConfirmEvent
            },
            CallBacks: {}
        });
    }

    /**
     * @name OpenCheckOutErrorPopup
     * @param {any} objContext
     */
    OpenCheckOutErrorPopup(objContext) {
        Popup.ShowErrorPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props),
                TextResourcesKey: "CheckOutErrorPopup",
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath
            },
            CallBacks: {}
        });
    };

    /**
     * @name GetEditInfo
     * @param {any} objRow
     * @param {any} objContext
     * @summary Forms the JSX based on the Checked in info to read or read/write the document
     * @return {object} JSX
     */
    GetEditInfo(objRow, objContext) {
        let strUserId = objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.ParentProps.ClientUserDetails.UserId : objContext.props.ClientUserDetails.UserId
        let blnIsDocument = this.CheckIsMicrosoftDocument(objRow, objContext); //false;//
        if (!blnIsDocument) {
            if (objRow.cIsCheckedOut == "Y" && objRow.uCheckedOutUserId == strUserId) {
                return <div className="flex align-middle pointer">
                    <span onClick={() => this.Open(objRow, objContext)}>
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: objContext.ImageMeta.ReadWriteImage
                            }}
                            ParentProps={objContext.props}
                        />
                    </span>
                </div>
            }
            else {
                return <div className="flex align-middle pointer">
                    <a href={objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?FileName=" + objRow.uDocumentId + "." + objRow.vFileType + "&Type=ProductManagement&DisplayFileName=" + objRow.vFileName + "." + objRow.vFileType + "&sessionkey=" + JConfiguration.SessionKey}>
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: objContext.ImageMeta.ReadOnlyImage
                            }}
                            ParentProps={objContext.props}
                        />
                    </a>
                </div >
            }
        }
        else {
            if (objRow.cIsCheckedOut == "N" || objRow.cIsCheckedOut == null && objRow.uCheckedOutUserId == strUserId || objRow.uCheckedOutUserId == null) {
                return <div className="flex align-middle pointer">
                    <span onClick={() => this.Open(objRow, objContext)}>
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: objContext.ImageMeta.ReadWriteImage
                            }}
                            ParentProps={objContext.props}
                        />
                    </span>
                </div>
            }
            else {
                return <div className="flex align-middle pointer">
                    <a href={objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?FileName=" + objRow.uDocumentId + "." + objRow.vFileType + "&Type=ProductManagement&DisplayFileName=" + objRow.vFileName + "." + objRow.vFileType + "&sessionkey=" + JConfiguration.SessionKey}>
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: objContext.ImageMeta.ReadOnlyImage
                            }}
                            ParentProps={objContext.props}
                        />
                    </a>
                </div >
            }
        }
    }

    /**
     * @name ReadDocument
     * @param {any} objRow
     * @param {any} objContext
     * @summary Downloads the document in Read mode.
     * @return {object} JSX
     */
    ReadDocument(objRow, objContext) {
        return <div className="flex align-middle pointer">
            <a href={objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?FileName=" + objRow.uDocumentId + "." + objRow.vFileType + "&Type=ProductManagement&DisplayFileName=" + objRow.vFileName + "." + objRow.vFileType + "&sessionkey=" + JConfiguration.SessionKey}>
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: objContext.ImageMeta.DownloadImage
                    }}
                    ParentProps={objContext.props}
                />
            </a>
        </div >
    }

    /**
     * @name Open
     * @param {any} objRow
     * @param {any} objContext
     * @summary Opens the webNav document reader
     */
    Open(objRow, objContext, blnSetCurrentRow = true) {
        ITHit.WebDAV.Client.LicenseId = '05994e7f-cda0-4359-ba31-696d9a8aa0b3'; //ajax library license
        var strDocumentUrl = JConfiguration.WebDAVServer + JConfiguration.MainClientId + "/ProductManagement/Document/" + objRow.uDocumentId + "." + objRow.vFileType;

        var objDocManager = ITHit.WebDAV.Client.DocManager;
        if (objDocManager.IsMicrosoftOfficeDocument(strDocumentUrl)) {
            objDocManager.MicrosoftOfficeEditDocument(strDocumentUrl)
        }
        else {
            objDocManager.EditDocument(strDocumentUrl);
        }

        if (blnSetCurrentRow) {
            ApplicationState.SetProperty("strDocumentURL", strDocumentUrl);
            ApplicationState.SetProperty("CurrentRowData", objRow);
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
    CutPaste(objContext, strFolderId, blnIsResetGrid, objSourceData = null) {
        let objCutCopySource = objSourceData ? objSourceData : ApplicationState.GetProperty("CutCopySource")["Document"]?.["Data"];
        let arrFetchParams =
        {
            ["SourceData"]: objCutCopySource,
            ["DestinationId"]: strFolderId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteCustom("API/Object_DevServer/ProductManagement/ProductDocument/CutCopyPaste/CutPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {
            ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Document": null });      
            ArcadixCacheData.EditData("Object_DevServer_ProductManagement_Folder", { "Filter": "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"), "Value": { "Data": objResopnse.CutPaste.Data, "PrimaryKeyName": "uFolderId" } });
            ArcadixCacheData.DeleteEntity("Object_DevServer_ProductManagement_ProductDocument");
            this.LoadSelectedFolderDocuments(objContext, objContext.props.ActiveSubNavigationId, blnIsResetGrid);            
        });
    }

    //---------------------------------------Commented out for now as WebSocket is disabled------------------------------------------
    ///**
    // * @name GetLocks
    // * @summary used to get the lock information.
    // */
    //GetLocks(objContext) {
    //    let strDocuement = ApplicationState.GetProperty("strDocumentURL");
    //    let objRow = ApplicationState.GetProperty("CurrentRowData");
    //    let blnUpdateCheckoutStatus = ApplicationState.GetProperty("UpdateCheckoutStatus");
    //    blnUpdateCheckoutStatus ? ApplicationState.SetProperty("UpdateCheckoutStatus", false) : "";
    //    if (strDocuement) {
    //        ITHit.WebDAV.Client.LicenseId = '05994e7f-cda0-4359-ba31-696d9a8aa0b3'; //ajax library license

    //        var webDavSession = new ITHit.WebDAV.Client.WebDavSession();
    //        var fCallback = function () { };//CHECK]

    //        //webDavSession.AddListener('OnResponse', function (oEvent) {

    //        //    // Show HTTP status and description
    //        //    console.log(oEvent.Status + ' ' + oEvent.StatusDescription);

    //        //    // Show headers
    //        //    for (var sKey in oEvent.Headers) {
    //        //        if (oEvent.Headers.hasOwnProperty(sKey)) {
    //        //            console.log(sKey + ': ' + oEvent.Headers[sKey]);
    //        //        }
    //        //    }

    //        //    // Show response body
    //        //    console.log(oEvent.BodyText);

    //        //    fCallback(oEvent);
    //        //});

    //        //var strDocumentPath = JConfiguration.WebDAVServer + JConfiguration.MainClientId + "/ProductManagement/Document/";
    //        //webDavSession.OpenFolderAsync(strDocumentPath,null, (objResp) => {
    //        //    console.log(objResp);
    //        //});

    //        webDavSession.OpenFileAsync(strDocuement, null, function (oAsyncResult) {

    //            /** @typedef {ITHit.WebDAV.Client.File} oFile */
    //            var oFile = oAsyncResult.Result;

    //            if (oFile.ActiveLocks.length != 0 && objRow.cIsCheckedOut == "N") {
    //                objContext.Document_ModuleProcessor.CheckOut(objRow, objContext);
    //            }

    //            if (oFile.ActiveLocks.length == 0 && objRow.cIsCheckedOut == "Y") {
    //                objContext.Document_ModuleProcessor.CheckIn(objRow, objContext);
    //            }

    //            fCallback(oAsyncResult);//CHECK
    //        });
    //    }
    //}
    //--------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/FileUpload/FileUpload.css",
            //props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }

}

export default Document_ModuleProcessor;
