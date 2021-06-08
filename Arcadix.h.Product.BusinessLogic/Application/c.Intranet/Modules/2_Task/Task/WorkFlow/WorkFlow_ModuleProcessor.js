//Objects required for module.
import Object_Cockpit_Workflow_Workflow from '@shared/Object/c.Cockpit/Workflow/Workflow';
import Object_Cockpit_Workflow_WorkflowType from '@shared/Object/c.Cockpit/Workflow/WorkflowType/WorkflowType';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditWorkFlow_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow_MetaData';

//Module related imports.
import * as WorkFlow_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/WorkFlow_OfficeRibbon';

/**
* @name WorkFlow_ModuleProcessor
* @param NA
* @summary Class for WorkFlow module display.
* @return NA
*/
class WorkFlow_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_Workflow_Workflow",
            "Object_Cockpit_Workflow_WorkflowType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlow",
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

        //WorkFlow Type
        Object_Cockpit_Workflow_WorkflowType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowType]

        // WorkFlow
        Object_Cockpit_Workflow_Workflow.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_Workflow];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/2_Task/Task/WorkFlow"];
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
            RowData: DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"] ? DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"] : [],
            LanguageData: objContext.WorkFlow_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
            DropDownData: objContext.WorkFlow_ModuleProcessor.GetDependingColumnData(objContext)
        };
        return objData;
    }


    /**
* @name GetCallBackforGrid
* @param {any} objContext
* @summary Return Grid data
* @returns {object} Grid data
*/
    GetCallBackforGrid(objRow, objContext) {
        let objReturn;
        if (objRow["uWorkflowTypeId"] == objContext.state.strWorkflowTypeId) {
            return objReturn = objRow["uWorkflowId"] == objContext.state.strActiveWorkFlowId ? { ...objRow, "IsActivate": "Y" } : { ...objRow, "IsActivate": "N" }
        }
        else {
            return null;
        }
    }


    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call Confirmation pop-up for Deleting WorkFlow
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlow", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["WorkFlowGrid"] : 0;
        let intApplicationTypeForWorkflowData = 2;
        if (objContext.props.ClientUserDetails.MainClientId == 0) {
            intApplicationTypeForWorkflowData = 7;
        }
        //let intApplicationTypeForCompetencyLevelData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = objContext.props.ClientUserDetails.MainClientId == 0 ? ((!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false) : ((!arrSelectedRows || arrSelectedRows.length <= 0 || arrSelectedRows[0]["iMainClientId"] == 0) ? true : false)
        }
        else {
            blnShowErrorPopup = objContext.state.strWorkflowTypeId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForWorkflowData),
                    DropdownData: {
                        strWorkflowTypeId: objContext.state.strWorkflowTypeId,
                        TargetGroup: DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"]
                    },
                    //Object_Cockpit_Workflow_Workflow: objContext.props.Object_Cockpit_Workflow_Workflow,
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditWorkFlow",
                    HeaderData: AddEditWorkFlow_MetaData.GetAddEditMetaData(),
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
        } else {
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
    * @summary Call Confirmation pop-up for Deleting WorkFlow
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlow", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["WorkFlowGrid"];
        let blnShowErrorPopup = false;
        if (objContext.props.ClientUserDetails.MainClientId == 0) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false
        }
        else {
            arrSelectedRows.map(objSelectedRow => {
                if (objSelectedRow["iMainClientId"] == 0 || arrSelectedRows.length <= 0) {
                    blnShowErrorPopup = true;
                }
            })
        }

        if (!blnShowErrorPopup) {
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
                    //Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteWorkFlow(arrSelectedRows, strPopupId)
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
  * @name OpenDeletePopup
  * @param {object} objContext passes Context object
  * @summary Call Confirmation pop-up for Deleting WorkFlow
  * @return null
  */
    OpenActivatePopup(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["WorkFlowGrid"];
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objRowToActivate = { ...arrSelectedRows[0], "IsActivate": "Y" };
            let objParams = {
                "vEditData": [objRowToActivate]
            };
            objContext.props.Object_Cockpit_Workflow_Workflow.EditData(objParams);
            objContext.dispatch({ type: "SET_STATE", payload: { "strActiveWorkFlowId": objRowToActivate["uWorkflowId"] } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }


   


    /**
* @name DeleteWorkFlow
* @param {array} arrSelectedRows selected row from the display grid
* @param {object} objModal objModal
* @summary Deletes Subject and close pop-up on success
*/
    DeleteWorkFlow(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_Workflow_Workflow.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                Popup.ClosePopup(strPopupId);
                this.SelectAdjacentGridRow("WorkFlowGrid", arrSelectedRows);
            }
        });
    }

    /**
   * @name OnWorkflowTypeDropDownChange
   * @param {*} objContext objChangeData
   * @param {*} objChangeData objChangeData
   * @summary   To change the subject Dropdown Data on change of the subject dropdown value
   */
    OnWorkflowTypeDropDownChange(objContext, objChangeData) {
        let strActiveWorkFlowId =null;
        objContext.props.Object_Cockpit_Workflow_Workflow["Data"].map(objRow => {
            if (objRow["uWorkflowTypeId"] == objChangeData["uWorkflowTypeId"] && objRow["cIsDeleted"] !== 'Y') {
                objRow["t_TestDrive_Workflow_Active"].map(objActiveData => {
                    strActiveWorkFlowId = (objActiveData["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId ? objActiveData["uWorkflowId"] : (objActiveData["iMainClientId"] == "0" ? objActiveData["uWorkflowId"] : null))
                })
            }
        })
        objContext.dispatch({ type: "SET_STATE", payload: { "strWorkflowTypeId": objChangeData["uWorkflowTypeId"], "strActiveWorkFlowId": strActiveWorkFlowId } });
        objContext.dispatch({ type: "SET_STATE", payload: { objFilter: { ...objContext.state.objFilter, "strWorkflowTypeId": objChangeData["uWorkflowTypeId"] } } });
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
    * @name GetDependingColumnData
    * @param {*} objContext objContext
    * @summary Return depending column Dropdown data
    * @returns {obj} depending column object
    */
    GetDependingColumnData(objContext) {
        let objClientDropDownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "uWorkflowTypeId",
            "DisplayColumn": "vWorkflowType",
            "DependingTableName": "t_TestDrive_WorkflowType_Data",
            "Data": DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"]
        };

        //objContext.props.Object_Cockpit_Workflow_WorkflowType["Data"].map((objClient) => {
        //    objClientDropDownData["Data"] = [...objClientDropDownData["Data"], objClient];
        //});

        return { "uWorkflowTypeId": objClientDropDownData };
    }
          
    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.WorkFlow_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.WorkFlow_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.WorkFlow_ModuleProcessor.OpenDeletePopup(objContext),
            "ActivatePopup": () => objContext.WorkFlow_ModuleProcessor.OpenActivatePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", WorkFlow_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
        ];
    }
}

export default WorkFlow_ModuleProcessor;