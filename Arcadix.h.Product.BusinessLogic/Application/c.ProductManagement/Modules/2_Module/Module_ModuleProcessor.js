//Objects required for module.
import Object_DevServer_ProductManagement_Module from '@shared/Object/c.ProductManagement/Module/Module';
import Object_DevServer_ProductManagement_UseCase from '@shared/Object/c.ProductManagement/UseCase/UseCase';

//Module related fies...
import * as Module_MetaData from '@shared/Application/c.ProductManagement/Modules/2_Module/Module_MetaData';
import * as Module_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/2_Module/Module_OfficeRibbon';
import * as Module_ContextMenuData from '@shared/Application/c.ProductManagement/Modules/2_Module/Module_ContextMenuData';

//Editor Main Module.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
* @name Module_ModuleProcessor
* @summary Class for Module Module display.
*/
class Module_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_Folder",
            "Object_DevServer_ProductManagement_Module",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/2_Module/Module",
            { "StoreKey": "ApplicationState", "DataKey": "ModuleId" },
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" },
            { "StoreKey": "ApplicationState", "DataKey": "ActiveSubNavigationId" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //ApplicationState.SetProperty("SelectedRows" , null);
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

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/2_Module/Module"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name OpenAddEditModulePopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed pop-up for Add/Edit of Module
    * @return null
    */
    OpenAddEditModulePopup(objContext, blnIsEdit) {

        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props);
        let blnShowErrorPopup;
        if (blnIsEdit) {
            //blnShowErrorPopup = (!objSelectedRow || objSelectedRow.length <= 0) ? true : false;
            blnShowErrorPopup = false;
        }

        if (!blnShowErrorPopup) {
            var objData = {
                IsEdit: blnIsEdit,
                ModuleId: ApplicationState.GetProperty("ActiveSubNavigationId")
            }

            Popup.ShowTabbedPopup({
                Data: objData,
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
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ModuleGrid"] : [];
        //let arrSelectedRows = this.GetSelectedRow(objContext);

        var strDeleteVariables = "";

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vModuleName"] + ", ";
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
                        this.DeleteModule(arrSelectedRows, strPopupId, objContext)
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
    * @name DeleteModule
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objContext objContext
    * @summary Deletes Module and close popup on success
    */
    DeleteModule(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
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
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.ClientUserDetails.uUserId

        };

        Object_DevServer_ProductManagement_Module.DeleteData(objParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(strPopupId);
                let fnSelectAdjacentGridRow = ApplicationState.GetProperty("SelectAdjacentGridRow") && ApplicationState.GetProperty("SelectAdjacentGridRow")["ModuleGrid"] ? ApplicationState.GetProperty("SelectAdjacentGridRow")["ModuleGrid"] : null;
                if (fnSelectAdjacentGridRow) {
                    fnSelectAdjacentGridRow(arrSelectedRows);
                }

            }
        });
    }

    /**
    * @name GetModuleGridData
    * @param {object} objContext
    * @summary it returns the object for ModuleGrid Data
    * @returns {object} Data
    */
    GetModuleGridData(objContext) {
        let strActiveMainNavId = objContext.props.IsForServerRenderHtml && objContext.props.ApplicationStateData ? objContext.props.ApplicationStateData.ActiveMainNavigationId : ApplicationState.GetProperty("ActiveMainNavigationId");
        let strActiveSubNavId = objContext.props.IsForServerRenderHtml ? this.GetSubNavigationId(objContext) : objContext.props.ActiveSubNavigationId;
        let arrModuleData = DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavId)["Data"]?.filter(obj => obj["uFolderId"] == strActiveSubNavId);
        arrModuleData = arrModuleData ? arrModuleData : [];
        return {
            RowData: arrModuleData,
        };
    }

    /**
    * @name GetSubNavigationId
    * @param {any} objContext
    * @summary Gets the Sub navigation for SSR
    */
    GetSubNavigationId(objContext) {
        if (objContext.props.IsForServerRenderHtml) {
            let strActiveMainNavigationId = objContext.props.ApplicationStateData ? objContext.props.ApplicationStateData.ActiveMainNavigationId : null;
            let strActiveSubNavId = objContext.props.QueryStringObject ? objContext.props.QueryStringObject.SubNavigationId : null;
            if (!strActiveSubNavId && DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)) {
                let arrMainNavData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + strActiveMainNavigationId)["Data"].filter(obj => obj.uParentFolderId == "00000000-0000-0000-0000-000000000000").sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
                strActiveSubNavId = arrMainNavData && arrMainNavData[0] ? arrMainNavData[0]["uFolderId"] : "";
            }
            return strActiveSubNavId;
        }
    }

    /**
    * @name GetModuleMetaData
    * @param {object} objContext
    * @summary it returns the object for ModuleGrid Meta Data
    * @returns {object} Data
    */
    GetModuleMetaData(objContext) {
        return {
            HeaderData: Module_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N"
            },
            PrimaryKey: "uModuleId",
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
        //Has all the fields corresponding to the Header (MetaData). These values are going to get displayed in the HTML. It is a mandatory props.
        let Text = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props);
        Text = Text ? Text : {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetModuleGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetModuleGridEvents(objContext) {
        let objCallBacks = {
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
            OnDoubleClick: (objRowData, event) => this.OnDoubleClick(objRowData),
            OnDragDrop: (objDragDetails, objDropDetails) => this.OnDragDrop(objDragDetails, objDropDetails, objContext),
            OnContextMenuClick: (objRowData, event, arrCheckedRows) => this.OnContextMenuClick(objRowData, event, objContext, arrCheckedRows)
        };
        return objCallBacks;
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
        let objDragData = null;
        if (!objDropDetails.Type) {
            objDropDetails.Type = "Folder"; //Type will be null, when we drop into the Tree, so making it Folder
        }
        if (!objDragDetails.Type) {
            objDragData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.find(obj => obj["uFolderId"] == objDragDetails.Id);
            objDragDetails.Type = objDragData ? "Folder" : "Module"; //Type will be null, when we drop into the Tree, so making it Folder
        }
        if (objDropDetails.Type == "Folder" && objDragDetails.Id != objDropDetails.Id) {            
            if (objDragDetails.Type == "Folder") {
                objDragData = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.find(obj => obj["uFolderId"] == objDragDetails.Id);
            }
            else if (objDragDetails.Type != "Folder" && !objDragData) {
                objDragData = DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.find(obj => obj["uModuleId"] == objDragDetails.Id);
            }

            if (objDragData && objDropDetails.Id) {
                this.CutPaste([objDragData], objDropDetails.Id, objContext, true);
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
            "AddEditModule": (blnIsEdit = false) => this.OpenAddEditModulePopup(objContext, blnIsEdit, objRowData),
            "DeleteModule": () => this.OpenDeletePopup(objContext, objRowData),
            "OpenContent": () => { objContext.Module_ModuleProcessor.OpenContent(objContext) },
            "OpenDocuments": () => { objContext.Module_ModuleProcessor.OpenDocuments(objContext) },
            "PreviewModule": () => { objContext.Module_ModuleProcessor.PreviewModule(objContext) },
            "CopyLinkToClipBoard": () => { objContext.Module_ModuleProcessor.CopyLinkToClipBoard() },
            "Cut": () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": { "Type": "Cut", "Data": [objRowData ?? {}] } }) },
            "Copy": () => {
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": { "Type": "Copy", "Data": [objRowData ?? {}] } })
            },
            "Paste": () => { objContext.Module_ModuleProcessor.Paste(objContext, objContext.props.ActiveSubNavigationId) },
        };
        arrContextListSample = Module_ContextMenuData.GetContextMenuData(objData);
        return arrContextListSample;
    }

    /**
    * @name GetModuleGridCallBacks
    * @param {object} objContext
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetModuleGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => {
                return {
                    ...objRow,
                    Id: objRow.iPageFolderId,
                    Name: objRow.vPageFolderName,
                    Type: "Module",
                }
            }
        };
        return objCallBacks;
    }

    /**
     * @name PreviewModule
     * @param {any} objContext
     */
    PreviewModule(objContext) {
        let strModule = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows").ModuleGrid[0].vModuleName : ApplicationState.GetProperty("ActiveModuleName");
        window.open(JConfiguration.BaseUrl + "ModulePreview?PreviewComponent=" + strModule + "&sessionkey=" + JConfiguration.SessionKey);
    }

    /**
     * @name CopyLinkToClipBoard
     * @summary To Copy link of the Example to Clipboard.
     */
    CopyLinkToClipBoard() {
        let strSelectedExampleId = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows").ModuleGrid[0]?.uModuleId : ApplicationState.GetProperty("ActiveModuleName");
        //------------------------Create a Dummy element in DOM, set the value to it and then using execCommand("copy") to copy the link to Clipboard-------------------
        let objDomElement = document.createElement("input");
        document.body.appendChild(objDomElement);
        objDomElement.value = QueryString.SetQueryStringValue(window.location.href, "SubNavigationId", strSelectedExampleId);
        objDomElement.select();
        document.execCommand("copy");
        document.body.removeChild(objDomElement);
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------
    }

    /**
     * @name Paste
     * @param {object} objContext objContext
     * @param {string} strFolderId strFolderId
     * @summary Handles the PasteFolder event
     */
    Paste(objContext, strFolderId, blnIsResetGrid = true) {
        let objCutCopySource = ApplicationState.GetProperty("CutCopySource")["Module"];        
        if (objCutCopySource.Type == "Cut") {
            this.CutPaste(objCutCopySource["Data"], strFolderId, objContext, blnIsResetGrid);
        }
        else if (objCutCopySource.Type == "Copy"){
            this.CopyPaste(objCutCopySource["Data"], strFolderId, objContext, blnIsResetGrid);
        }
    }

    /**
     * @name CopyPaste
     * @param {array} arrData arrData
     * @param {string} strFolderId strFolderId
     * @param {object} objContext objContext
     * @param {bool} blnNavigate blnNavigate
     * @summary Handles the CopyPaste event
     */
    CopyPaste(arrSourceData, strFolderId, objContext, blnIsResetGrid) {
        let arrFetchParams =
        {
            ["SourceData"]: arrSourceData,
            ["DestinationId"]: strFolderId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteCustom("API/Object_DevServer/ProductManagement/Module/CutCopyPaste/CopyPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {            
            ArcadixCacheData.AddData("Object_DevServer_ProductManagement_Folder", { "Filter": "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"), "Value": { "Data": objResopnse.CopyPaste.Data.CopiedFolders } });
            ArcadixCacheData.AddData("Object_DevServer_ProductManagement_Module", { "Filter": "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"), "Value": { "Data": objResopnse.CopyPaste.Data.CopiedModules } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": null });
            if (blnIsResetGrid)
                this.ResetGridSelection("ModuleGrid");
        });
    }

    /**
     * @name CutPaste
     * @param {array} arrData arrData
     * @param {string} strFolderId strFolderId
     * @param {object} objContext objContext
     * @param {bool} blnNavigate blnNavigate
     * @summary Handles the CutPaste event
     */
    CutPaste(arrSourceData, strFolderId, objContext, blnIsResetGrid) {
        if (ApplicationState.GetProperty("CutCopySource")["Module"]?.["Data"].length > 0) {
            arrSourceData = arrSourceData ? arrSourceData : ApplicationState.GetProperty("CutCopySource")["Module"]?.["Data"];
            let arrFetchParams =
            {
                ["SourceData"]: arrSourceData,
                ["DestinationId"]: strFolderId,
                ["uUserId"]: objContext.props.ClientUserDetails.UserId
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            ArcadixFetchData.ExecuteCustom("API/Object_DevServer/ProductManagement/Module/CutCopyPaste/CutPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {
                ArcadixCacheData.EditData("Object_DevServer_ProductManagement_Folder", { "Filter": "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"), "Value": { "Data": objResopnse.CutPaste.Data.MovedFolders, "PrimaryKeyName": "uFolderId" } });
                ArcadixCacheData.EditData("Object_DevServer_ProductManagement_Module", { "Filter": "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"), "Value": { "Data": objResopnse.CutPaste.Data.MovedModules, "PrimaryKeyName": "uModuleId" } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": null });
                if (blnIsResetGrid)
                    this.ResetGridSelection("ModuleGrid");
            });
        }
        else {
            arrSourceData = arrSourceData ? arrSourceData : ApplicationState.GetProperty("CutCopySource")["UseCase"]?.["Data"];
            //let strActiveModuleId = (props.IsForServerRenderHtml && props.QueryStringObject?.SubNavigationId) ?? ApplicationState.GetProperty("ActiveSubNavigationId") ?? "";
            var objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "uModuleId": strFolderId
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
                arrEditData = [...arrEditData, { ...objSourceData, "uModuleId": strFolderId }];
            })
            let objParams = {
                "SearchQuery": objSearchQuery,
                "vEditData": arrEditData,
                "uUserId": objContext.props.ClientUserDetails.UserId
            };
            Object_DevServer_ProductManagement_UseCase.EditData(objParams, (objReturn, cIsNewData) => {
                ArcadixCacheData.EditData("Object_DevServer_ProductManagement_UseCase", { "Filter": "Object_DevServer_ProductManagement_UseCase;uModuleId;" + arrSourceData[0]["uModuleId"] + ";cIsDeleted;N", "Value": { "Data": objReturn, "PrimaryKeyName": "uUseCaseId" } });
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "UseCase": null });
                if (blnIsResetGrid)
                    this.ResetGridSelection("UseCaseGrid");
            });
        }
        
    }

    /**
         * @name OpenContent
         * @param {object} objContext passes Context object.
         * @summary this open the Editor.
         */
    OpenContent(objContext) {
        if (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["ModuleGrid"].length > 0) {
            let arrPageIds = ApplicationState.GetProperty("SelectedRows")["ModuleGrid"].map(objTemp => {
                return parseInt(objTemp.iPageId);
            });
            let arrPageProperties = ApplicationState.GetProperty("SelectedRows")["ModuleGrid"].map(objTemp => {
                return {
                    "iPageId": parseInt(objTemp.iPageId),
                    "vPageName": objTemp.vModuleName
                };
            });
            if (arrPageIds.length > 0) {
                let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails");
                let objEditor = new Editor();
                let objParams = {
                    "Data": {
                        "PageIds": arrPageIds,
                        "TaskProperties": arrPageProperties,
                        "IsFirstTask": true,
                        "IsLastTask": true,
                        "iLanguageId": objContext.props.JConfiguration["InterfaceLanguageId"],
                        "ContentUsageGroupId": "UseCaseContentGroup",
                        "MultiMediaUsageGroupId": "UseCaseMediaGroup",
                    },
                    "CallBacks": {
                        "GetAdjacentTask": (strTaskId, strType) => {
                            return -1;
                        },
                        "EditorCloseCallback": (objPageJson) => {
                            objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objPageJson } });
                        }
                    },
                    "ParentProps": {
                        "JConfiguration": objContext.props.JConfiguration,
                        "ClientUserDetails": objClientUserDetails
                    }
                };
                objEditor.OpenEditor(objParams);
            }
        }
    }

    /**
    * @name OpenContent
    * @param {any} objContext
    */
    OpenDocuments(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props)
        var objData = {
            IsForModule: true,
            DocumentFolderId: ApplicationState.GetProperty("SelectedRows")["ModuleGrid"][0]["uModuleId"]
        }
        Popup.ShowTabbedPopup({
            Data: objData,
            Meta: {
                PopupName: "Document",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text,
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

    /**
     * @name OnDoubleClick
     * @param {object} objRow objRow
     * @param {object} objContext objContext
     * @summary Handles the double click event
     */
    OnDoubleClick(objRow) {
        let fnSelectTreeNode = ApplicationState.GetProperty("SelectSubNavigation") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
        if (fnSelectTreeNode) {
            let objSelectedRow = {
                ...objRow,
                IdField: objRow.uModuleId,
                TextField: objRow.vModuleName,
                Type: "Module",
            };
            fnSelectTreeNode(objSelectedRow);
        }
    }

    /**
    * @name SetRibbonData.
    * @param {object} objContext takes  objContext.
    * @summary To set and update the Ribbon Data when the State changes.
    */
    SetRibbonData(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ModuleGrid"] : [];
        if (objContext.props.isLoadComplete || objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "AddPopup": () => objContext.Module_ModuleProcessor.OpenAddEditModulePopup(objContext, false),
                "EditPopup": () => objContext.Module_ModuleProcessor.OpenAddEditModulePopup(objContext, true),
                "DeletePopup": () => objContext.Module_ModuleProcessor.OpenDeletePopup(objContext),
                "OpenContent": () => { objContext.Module_ModuleProcessor.OpenContent(objContext) },
                "OpenDocuments": () => { objContext.Module_ModuleProcessor.OpenDocuments(objContext) },
                "PreviewModule": () => { objContext.Module_ModuleProcessor.PreviewModule(objContext) },
                "CopyLinkToClipBoard": () => { objContext.Module_ModuleProcessor.CopyLinkToClipBoard() },
                "Cut": () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": { "Type": "Cut", "Data": arrSelectedRows ?? [] } }) }, //[arrSelectedRows[0] ?? {}]
                "Copy": () => {
                    ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Module": { "Type": "Copy", "Data": arrSelectedRows ?? [] } })
                },
                "Paste": () => {objContext.Module_ModuleProcessor.Paste(objContext, objContext.props.ActiveSubNavigationId)},
            };
            ApplicationState.SetProperty("OfficeRibbonData", Module_OfficeRibbon.GetModuleOfficeRibbonData(objRibbonData));
        }
    }

    /**
    * @name SetRibbonDataForSSR.
    * @param {object} objContext takes  objContext.
    * @summary To set and update the Ribbon Data for SSR
    */
    SetRibbonDataForSSR(objContext) {
        if (objContext.props.IsForServerRenderHtml) {
            objContext.Module_ModuleProcessor.SetRibbonData(objContext);
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/PC/1_Master/Master.css"
        ];
    }
}

export default Module_ModuleProcessor;