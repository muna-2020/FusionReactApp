//Objects required for module.
import Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep from '@shared/Object/c.ProductManagement/ImplementationStep/ImplementationStep';
import Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType from '@shared/Object/c.ProductManagement/ImplementationStep/ImplementationStepLayerTaskType/ImplementationStepLayerTaskType';
import Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer from '@shared/Object/c.ProductManagement/ImplementationStep/ImplementationStepLayer/ImplementationStepLayer';
import Object_Cockpit_Workflow_WorkflowType from '@shared/Object/c.Cockpit/Workflow/WorkFlowType/WorkflowType';

//Module related fies...
import * as ImplementationStep_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep_OfficeRibbon';

//Editor Main Module.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
 * @name ImplementationStep_ModuleProcessor
 * @param NA
 * @summary Class for DevLinkRefresh module display.
 * @return NA
 */
class ImplementationStep_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType",
            "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer",
            "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep",
            "Object_Cockpit_Workflow_WorkflowType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep",
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" }
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
     * @param {Array} arrPrefetchFilterData contains PrefetchFilterData if any
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props, arrPrefetchFilterData) {
        let arrDataRequest = [];
        //ImplementaionStep object
        if (arrPrefetchFilterData) {
            Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.Initialize({});
            arrPrefetchFilterData?.forEach(objUseCase => {
                arrDataRequest = [
                    ...arrDataRequest,
                    {
                        "URL": Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.URL,
                        "InitialDataCallParam": this.GetImplementaionStepParams(objUseCase["uUseCaseId"])
                    }
                ]
            });
        }
        else {
            let objImplementationStepParams = this.GetImplementaionStepParams(props.Data.UseCaseId);
            Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.Initialize(objImplementationStepParams);
            arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep];
        }

        ////ImplementaionSteplayerTaskType object
        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType];

        ////ImplementaionSteplayer object
        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer];

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetImplementaionStepParams
     * @param {string} strUseCaseId UseCaseId
     * @summary Forms the filter params for the ImplementaionStep object.
     */
    GetImplementaionStepParams(strUseCaseId) {
        return {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUseCaseId": strUseCaseId
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
    * @name HandleDropDownChange
    * @param {string} strAttributeName consists of the vColumnName
    * @param {*} objChangeData selected object of the dropdown
    * @param {*} props takes props
    * @param {*} objContext takes objContext
    * @summary   To change the row Data on change of the dropdown value
    */
    HandleDropDownChange(strAttributeName, objChangeData, props, objContext) {
        if (strAttributeName == "uImplementationStepLayerId") {
            let arrImplementationStepLayerTaskType = [];
            DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"].map((objImplementationStepLayerTaskType) => {
                if (objImplementationStepLayerTaskType["uImplementationStepLayerId"] == objChangeData["uImplementationStepLayerId"]) {
                    arrImplementationStepLayerTaskType = [...arrImplementationStepLayerTaskType, objImplementationStepLayerTaskType];
                }
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "arrImplementationStepLayerTaskType": arrImplementationStepLayerTaskType, "uImplementationStepLayerId": objChangeData["uImplementationStepLayerId"], "uImplementationStepLayerTaskTypeId": -1 } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "uImplementationStepLayerTaskTypeId": objChangeData["uImplementationStepLayerTaskTypeId"] } });
        }
    }

    /**
     * @name GetImplementationStepGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object}
     */
    GetImplementationStepGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => {
                let objReturnRow = {
                    ...objRow,
                    uImplementationStepLayerId: this.GetImplementationStepLayer(objContext,objRow)
                    }
                return objReturnRow;
            }
        };
        return objCallBacks;
    } 

    /**
     * * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetImplementationStepLayer(objContext, objRow) {
        let strImplementationStepLayerName = "";
        try {
            let objImplementationStepTaskTypeData = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"].filter((objData) => objData["uImplementationStepLayerTaskTypeId"] == objRow["uImplementationStepLayerTaskTypeId"])[0];
            let objImplementationStepLayer = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer)["Data"].filter((objData) => objData["uImplementationStepLayerId"] == objImplementationStepTaskTypeData["uImplementationStepLayerId"])[0];
            strImplementationStepLayerName =  objImplementationStepLayer["vImplementationStepLayerName"];
        }
        catch (err) {
        }
        return strImplementationStepLayerName;
    };

    /**
     * * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {

        let objImplementationStepData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "uImplementationStepLayerTaskTypeId",
            "DisplayColumn": "vImplementationStepLayerTaskTypeName",
            //"DependingTableName": "t_TestDrive_Member_Class_SchoolYear_Data",
            "Data": []
        };

        objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType["Data"].map((objImplementatioStep) => {
            objImplementationStepData["Data"] = [...objImplementationStepData["Data"], objImplementatioStep];
        });

        return { "uImplementationStepLayerTaskTypeId": objImplementationStepData };
    };

    /**
     * @param {*} objItem objItem
     * @summary  To filter the dropdown data based on the condition
     * @returns {bool} boolean
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
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep", objContext.props)
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name OnClickRow
    * @param {object} objSelectedRow
    * @param {object} objContext
    * @summary Handles the click event of the grid.
    */
    OnClickRow(objSelectedRow, objContext) {
        //var BreadCrumbNavigation = ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"][0]["vFolderName"] + ":" + ApplicationState.GetProperty("ActiveModuleName") + ":" + ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["vUseCaseName"] + ":" + ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"][0]["vImplementationStepName"];
        //ApplicationState.SetProperty("BreadCrumbNavigation", BreadCrumbNavigation);
    }

    /**
    * @name OpenAddEditImplementationStepPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed pop-up for Add/Edit of UseCase
    * @return null
    */
    OpenAddEditImplementationStepPopup(objContext, blnIsEdit) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"] : [];

        let arrWorkflowType = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType).Data;
        let objWf = arrWorkflowType.find(obj => obj["vWorkflowTypeIdentifier"] == "ImplementationStep");
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        if (!blnShowErrorPopup) {
            var objData = {
                IsEdit: blnIsEdit,
                UseCaseId: objContext.props.Data.UseCaseId,
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

    /**
     * @name DeletePopup  
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenDeleteImplementationPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep", objContext.props);
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
    * @summary Deletes ImplementationStep and close popup on success
    */
    DeleteImplementationStep(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uUseCaseId": objContext.props.Data.UseCaseId
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
            "uUserId": objContext.props.Resource.ClientUserDetails.uUserId
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
    * @name OpenImplementationStepContent
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
                    "ClientUserDetails": objContext.props.Resource.ClientUserDetails,
                }
            };
            let objEditor = new Editor();
            objEditor.OpenEditor(objParams);
        }
    }


    /**
    * @name OpenDocuments
    * @param {any} objContext
    * @summary Opens the Document in popup to Add/Edit document for the ImplementationStep
    */
    OpenDocuments(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep", objContext.props);
        var objData = {
            IsForImplementationStep: true,
            DocumentFolderId: ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"]?.[0]?.["uUseCaseImplementationStepId"] ?? ""
        };
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


    /**
     * @name MoveSelectedRow
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    MoveImplementationStepSelectedRow(objContext, strType) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        var objSelectedRows = arrSelectedRows && arrSelectedRows["ImplementationStepGrid"] && arrSelectedRows["ImplementationStepGrid"][0] ? arrSelectedRows["ImplementationStepGrid"][0] : null;
        let arrImplementationStepData = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep, "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep;uUseCaseId;" + objContext.props.Data.UseCaseId + ";cIsDeleted;N")["Data"]
        arrImplementationStepData = arrImplementationStepData.length > 0 ? arrImplementationStepData.filter((objData) => objData["cIsDeleted"] == "N") : [];
        var objEditData = this.GetAdjacentImplementationStep(objSelectedRows, strType, arrImplementationStepData, objContext.props.Data.UseCaseId);
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uUseCaseId": objContext.props.Data.UseCaseId
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
                "uUserId": objContext.props.Resource.ClientUserDetails.UserId
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
        let objRibbonData = {
            objContext,
            "AddImplementationStepPopup": () => objContext.ImplementationStep_ModuleProcessor.OpenAddEditImplementationStepPopup(objContext, false),
            "EditImplementationStepPopup": () => objContext.ImplementationStep_ModuleProcessor.OpenAddEditImplementationStepPopup(objContext, true),
            "OpenDeleteImplementationPopup": () => objContext.ImplementationStep_ModuleProcessor.OpenDeleteImplementationPopup(objContext),
            "OpenImplementationStepContent": () => objContext.ImplementationStep_ModuleProcessor.OpenImplementationStepContent(objContext),
            "OpenUseCase": () => Popup.ClosePopup(objContext.props.Id), //objContext.props.Events.CloseParentPopup(),
            "OpenCodeCrawler": () => objContext.ImplementationStep_ModuleProcessor.OpenCodeCrawler(objContext, "implementationStep"),
            "MoveImplementationStepUp": () => objContext.ImplementationStep_ModuleProcessor.MoveImplementationStepSelectedRow(objContext, "up"),
            "MoveImplementationStepDown": () => objContext.ImplementationStep_ModuleProcessor.MoveImplementationStepSelectedRow(objContext, "down"),
            "OpenImplementationDocuments": () => objContext.ImplementationStep_ModuleProcessor.OpenDocuments(objContext, "ImplementationStepGrid", "uUseCaseImplementationStepId")
        }
        
        if (objContext.props.SetOfficeRibbonData)
            objContext.props.SetOfficeRibbonData(ImplementationStep_OfficeRibbon.GetImplementationOfficeRibbonData(objRibbonData))        
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ]
    }
}

export default ImplementationStep_ModuleProcessor;