import Object_DevServer_ProductManagement_TestCase from '@shared/Object/c.ProductManagement/TestCase/TestCase';
import Object_Cockpit_Workflow_WorkflowType from '@shared/Object/c.Cockpit/Workflow/WorkFlowType/WorkflowType';

//Module related fies...
import * as TestCase_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/3.1_TestCase/TestCase_OfficeRibbon';

//Editor Main Module.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
 * @name TestCase_ModuleProcessor
 * @param NA
 * @summary Class for DevLinkRefresh module display.
 * @return NA
 */
class TestCase_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_TestCase",
            "Object_Cockpit_Workflow_WorkflowType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.1_TestCase/TestCase",
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
        //TestCase object
        if (arrPrefetchFilterData) {
            Object_DevServer_ProductManagement_TestCase.Initialize({});
            arrPrefetchFilterData?.forEach(objUseCase => {
                arrDataRequest = [
                    ...arrDataRequest,
                    {
                        "URL": Object_DevServer_ProductManagement_TestCase.URL,
                        "InitialDataCallParam": this.GetTestCaseParams(objUseCase["uUseCaseId"])
                    }
                ]
            });
        }
        else {
            let objTestCaseParams = this.GetTestCaseParams(props.Data.UseCaseId);
            Object_DevServer_ProductManagement_TestCase.Initialize(objTestCaseParams);
            arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_TestCase]
        }
       
        //Workflowtype object
        let objWorkflowType = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vWorkflowTypeIdentifier": "TestCase"
                        }
                    }
                ]
            }
        };
        Object_Cockpit_Workflow_WorkflowType.Initialize(objWorkflowType);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowType];

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/3.1_TestCase/TestCase"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetTestCaseParams
     * @param {string} strUseCaseId UseCaseId
     * @summary Forms the filter params for the TestCase object.
     */
    GetTestCaseParams(strUseCaseId) {
        return {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUseCaseId": strUseCaseId
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
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props)
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
        //var BreadCrumbNavigation = ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"][0]["vFolderName"] + ":" + ApplicationState.GetProperty("ActiveModuleName") + ":" + ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["vUseCaseName"] + ":" + ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"][0]["vTestCaseName"];
        //ApplicationState.SetProperty("BreadCrumbNavigation", BreadCrumbNavigation);
    }

    /**
    * @name OpenAddEditUseCasePopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed pop-up for Add/Edit of UseCase
    * @return null
    */
    OpenAddEditTestCasePopup(objContext, blnIsEdit) {

        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"] : [];
        let arrWorkflowType = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType).Data;
        let objWf = arrWorkflowType.find(obj => obj["vWorkflowTypeIdentifier"] == "TestCase");
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
                ParentProps: objContext.props.ParentProps
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
     * @name OpenDeleteTestCasePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting TestCase
     */
    OpenDeleteTestCasePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props);
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
                }
            ]
        }
        objParams = {
            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.Resource.ClientUserDetails.uUserId
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
    * @name OpenDocuments
    * @param {any} objContext
    * @summary Opens the Document in popup to Add/Edit document for the TestCase
    */
    OpenDocuments(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props);
        var objData = {
            IsForTestCase: true,
            DocumentFolderId: ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"]?.[0]?.["uTestCaseId"] ?? ""
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
                },
                CallBacks: {
                },
                ParentProps: objContext.props.ParentProps
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
                    "ClientUserDetails": objContext.props.Resource.ClientUserDetails,
                }
            };
            let objEditor = new Editor();
            objEditor.OpenEditor(objParams);
        }
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
        var objSelectedRows = arrSelectedRows && arrSelectedRows["TestCaseGrid"] && arrSelectedRows["TestCaseGrid"][0] ? arrSelectedRows["TestCaseGrid"][0] : null;
        let arrTestCaseData = DataRef(objContext.props.Object_DevServer_ProductManagement_TestCase, "Object_DevServer_ProductManagement_TestCase;uUseCaseId;" + objContext.props.Data.UseCaseId).Data;
        arrTestCaseData = arrTestCaseData && arrTestCaseData.length > 0 ? arrTestCaseData.filter((objData) => objData["cIsDeleted"] == "N") : [];
        var objEditData = this.GetAdjacentTestCase(objSelectedRows, strType, arrTestCaseData, objContext.props.Data.UseCaseId);
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "uUseCaseId": objContext.props.Data.UseCaseId
                    }
                }
            ]
        }
        if (objEditData != null) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
                "SearchQuery": objSearchQuery,
                "vEditData": [{ ...objSelectedRows, "iOrderId": arrTestCaseData.filter(objEditedData => objEditedData["uTestCaseId"] == objEditData["uTestCaseId"])[0]["iOrderId"] }, objEditData],
                "uUserId": objContext.props.Resource.ClientUserDetails.UserId
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
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        let objRibbonData = {
            objContext,
            "AddPopup": () => objContext.TestCase_ModuleProcessor.OpenAddEditTestCasePopup(objContext, false),
            "EditPopup": () => objContext.TestCase_ModuleProcessor.OpenAddEditTestCasePopup(objContext, true),
            "DeletePopup": () => objContext.TestCase_ModuleProcessor.OpenDeleteTestCasePopup(objContext),
            "OpenContent": () => objContext.TestCase_ModuleProcessor.OpenTestCaseContent(objContext),
            "OpenDocuments": () => objContext.TestCase_ModuleProcessor.OpenDocuments(objContext),
            "MoveUp": () => objContext.TestCase_ModuleProcessor.MoveSelectedRow(objContext, "up"),
            "MoveDown": () => objContext.TestCase_ModuleProcessor.MoveSelectedRow(objContext, "down"),
            "OpenUseCase": () => Popup.ClosePopup(objContext.props.Id),
        }

        if (objContext.props.SetOfficeRibbonData)
            objContext.props.SetOfficeRibbonData(TestCase_OfficeRibbon.GetTestCaseOfficeRibbonData(objRibbonData))
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

export default TestCase_ModuleProcessor;