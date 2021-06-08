//Objects required for module.
import Object_Cockpit_Workflow_Workflow from '@shared/Object/c.Cockpit/Workflow/Workflow';
import Object_Cockpit_Workflow_WorkflowType from '@shared/Object/c.Cockpit/Workflow/WorkflowType/WorkflowType';
import Object_Cockpit_Workflow_WorkflowStatus from '@shared/Object/c.Cockpit/Workflow/WorkFlowStatus/WorkflowStatus';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditWorkFlowStatus_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus_MetaData';

//Module related imports.
import * as WorkFlowStatus_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/WorkFlowStatus_OfficeRibbon';

/**
* @name WorkFlowStatus_ModuleProcessor
* @param NA
* @summary Class for Category module display.
* @return NA
*/
class WorkFlowStatus_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_Workflow_WorkflowStatus",
            "Object_Cockpit_Workflow_Workflow",
            "Object_Cockpit_Workflow_WorkflowType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlowStatus",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language"    
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

        var objWorkFlowStatusParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        //WorkFlow Type
        Object_Cockpit_Workflow_WorkflowType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowType]

        // WorkFlow
        Object_Cockpit_Workflow_Workflow.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_Workflow];

        // WorkFlowStatus
        Object_Cockpit_Workflow_WorkflowStatus.Initialize(objWorkFlowStatusParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowStatus];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/2_Task/Task/WorkFlowStatus"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);

        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
* @name GetGridData
* @param {any} objContext
* @summary Return Grid data
* @returns {object} Grid data
*/
    GetGridData(objContext) {
        let intApplicationTypeForLanguageData = 2;
        if (objContext.props.ClientUserDetails.MainClientId == 0) {
            intApplicationTypeForLanguageData = 7;
        }
        let objData = {
            RowData: DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus)["Data"] ? DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus)["Data"] : [],
            LanguageData: objContext.WorkFlowStatus_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
        };
        return objData;
    }

    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed pop-up for Add/Edit of Category
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlowStatus", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["WorkFlowStatusGrid"] : [];
        let intApplicationTypeForWorkFlowStatusData = 2;
        if (objContext.props.ClientUserDetails.MainClientId == 0) {
            intApplicationTypeForWorkFlowStatusData = 7;
        }
        //let intApplicationTypeForWorkFlowStatusData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intWorkFlowDropdownSelectedValue == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForWorkFlowStatusData),
                    //Object_Cockpit_Workflow_WorkflowStatus: objContext.props.Object_Cockpit_Workflow_WorkflowStatus,
                    IsEdit: blnIsEdit,
                    intWorkFlowDropdownSelectedValue: objContext.state.intWorkFlowDropdownSelectedValue,
                },
                Meta: {
                    PopupName: "AddEditWorkFlowStatus",
                    HeaderData: AddEditWorkFlowStatus_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
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
    * @name OpenDeletePopup
    * @param {object} objContext passes Context object
    * @summary Call Confirmation pop-up for Deleting Category
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlowStatus", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["WorkFlowStatusGrid"] : 0;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteWorkFlowStaus(arrSelectedRows, strPopupId)
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
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name DeleteWorkFlowStaus
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes Category and close pop-up on success
    */
    DeleteWorkFlowStaus(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_Workflow_WorkflowStatus.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                Popup.ClosePopup(strPopupId);
                this.SelectAdjacentGridRow("WorkFlowStatusGrid", arrSelectedRows);
            }
        });
    }

    /**
    * @name OnSubjectDropDownChange
    * @param {*} objContext objChangeData
    * @param {*} objChangeData objChangeData
    * @summary   To change the WorkFlow Type Dropdown Data on change of the subject dropdown value
    */
    OnWorkFlowTypeDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "WorkFlowStatusGrid": null });
        let arrSubSubjectData = [];
        DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"].map((objWorkFlowType) => {
            if (objWorkFlowType["uWorkflowTypeId"] === objChangeData["uWorkflowTypeId"]) {
                arrSubSubjectData = [...arrSubSubjectData, objWorkFlowType];
            }
        });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intWorkFlowTypeDropdownSelectedValue": objChangeData["uWorkflowTypeId"],
                "intWorkFlowDropdownSelectedValue": -1,
                "arrWorkFlowData": arrSubSubjectData,
                "arrWorkFlowStatusData": []
            }
        });
    };

    /**
    * @name OnSubSubjectDropDownChange
    * @param {*} objContext
    * @param {*} objChangeData
    * @summary   To change the Work Flow Dropdown value on change of the sub subject dropdown 
    */
    OnWorkFlowDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "WorkFlowGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "intWorkFlowDropdownSelectedValue": objChangeData["uWorkflowId"], objFilter: { ...objContext.state.objFilter, "uWorkflowId": objContext.state.intWorkFlowDropdownSelectedValue } } });
    };


    /**
    * @name CreateItemEventHandler
    * @param {*} objItem objItem
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
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.WorkFlowStatus_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.WorkFlowStatus_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.WorkFlowStatus_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", WorkFlowStatus_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStyles
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css"
        ];
    }
}

export default WorkFlowStatus_ModuleProcessor;