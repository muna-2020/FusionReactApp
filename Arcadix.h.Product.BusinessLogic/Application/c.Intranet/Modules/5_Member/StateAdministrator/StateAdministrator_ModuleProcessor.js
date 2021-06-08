//Objects required for module.
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Intranet_Member_StateAdministrator from '@shared/Object/c.Intranet/5_Member/StateAdministrator/StateAdministrator';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as StateAdministrator_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/StateAdministrator_OfficeRibbon';
import * as StateAdministrator_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/StateAdministrator_MetaData';
import * as AddEditStateAdministrator_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/AddEditStateAdministrator/AddEditStateAdministrator_MetaData';

/**
 * @name StateAdministrator_ModuleProcessor
 * @param NA
 * @summary Class for StateAdministrator module display.
 * @return NA
 */
class StateAdministrator_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_State_State",
            "Object_Intranet_Member_StateAdministrator",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/StateAdministrator",
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

        //Compentency_level
        Object_Intranet_Member_StateAdministrator.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Member_StateAdministrator]

        // State
        Object_Extranet_State_State.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/StateAdministrator"];
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
        let objData = {
            RowData: DataRef(objContext.props.Object_Intranet_Member_StateAdministrator)["Data"] ?? [],
            DropDownData: objContext.StateAdministrator_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.StateAdministrator_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary it returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData(objContext) {
        var objFilter = objContext.state.strStateId == -1 ? { "cIsDeleted": "N" } : {
            "cIsDeleted": "N",
            "iStateId": objContext.state.strStateId
        };
        return {
            ...StateAdministrator_MetaData.GetMetaData(),
            Filter: {
                ...objFilter
            }
        };
    }

    /**
     * @name GetGridResource
     * @param {object} objContext
     * @summary it returns the object for Grid Resources
     * @returns {object}  resource object
     */
    GetGridResource(objContext, objTextResource) {
        return {
            Text: objTextResource,
            SkinPath: objContext.props.JConfiguration.IntranetSkinPath
        };
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/StateAdministrator", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["StateAdministratorGrid"] : [];
        let intApplicationTypeForClassTypeData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            //blnShowErrorPopup = objContext.state.strStateId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        State: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        StateDropdownSelectedValue: objContext.state.strStateId,
                    },
                    Object_Intranet_Member_StateAdministrator: objContext.props.Object_Intranet_Member_StateAdministrator,
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForClassTypeData),
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditStateAdministrator",
                    HeaderData: AddEditStateAdministrator_MetaData.GetAddEditStateAdministratorMetaData(),
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
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/StateAdministrator", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["StateAdministratorGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["iDisplayOrder"] + ", ";
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
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteClassType(arrSelectedRows, strPopupId)
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
     * @name DeleteClassType
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close popup on success
     */
    DeleteClassType(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Member_StateAdministrator.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "StateAdministratorGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name OnStateDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the ClassType Dropdown Data on change of the state dropdown value
     */
    OnStateDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "StateAdministratorGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "strStateId": objChangeData["iStateId"] } });
    };

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    OpenSendLoginProgressBarPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/StateAdministrator", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["StateAdministratorGrid"] : 0;
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let arrMainClientUserIds = arrSelectedRows.map(t => t.uStateAdministratorId)
            Popup.ShowProgressBarPopup({
                "Data": {
                    "ProgressText": Localization.TextFormatter(objTextResource, 'PopupText')
                },
                "Meta": {
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "Y",
                    "StartProgressOnLoad": false,
                    "CloseProgessBarOnComplete": true
                },
                "Resource": {
                    "Text": {
                        "ProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'Process'),
                        "ProgressBarPopup_Total": Localization.TextFormatter(objTextResource, 'Total'),
                        "ProgressBarPopup_Posted": Localization.TextFormatter(objTextResource, 'Posted'),
                        "ProgressBarPopup_Failed": Localization.TextFormatter(objTextResource, 'Failed'),
                        "ProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'AbortStop'),
                        "ProgressBarPopup_CloseButtonText": Localization.TextFormatter(objTextResource, 'ShutDown'),
                        "ProgressBarPopup_StartButtonText": Localization.TextFormatter(objTextResource, 'Begin'),
                    },
                    "TextResourcesKey": Localization.TextFormatter(objTextResource, 'ProgressBarPopup'),

                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                "Events": {
                    "StartProgress": (strProgressBarId) => {
                        this.sendLogin(objContext, strProgressBarId, arrMainClientUserIds);
                    },
                },
                CallBacks: {
                    PopupCallBack: () => ({})
                }
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
     * @name sendLogin
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting CompetencyRange
     * @return null
     */
    sendLogin(objContext, strProgressBarID, arrSelectedRows) {
        let objSendMailParams =
        {
            ["StateAdmins"]: arrSelectedRows,
            ["ProgressBarId"]: strProgressBarID,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        objContext.props.Object_Intranet_Member_StateAdministrator.SendLogins(objSendMailParams);
    }

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
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {
       
        let objStateDropDownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iStateId",
            "DisplayColumn": "vStateName",
            "DependingTableName": "t_TestDrive_Member_State_Data",
            "Data": []
        };
      
        let arrState = DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [];
        arrState.map((objState) => {
            objStateDropDownData["Data"] = [...objStateDropDownData["Data"], objState];
        });
        return { "iStateId": objStateDropDownData };
    };

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.StateAdministrator_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.StateAdministrator_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.StateAdministrator_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenSendLoginProgressBarPopup": () => objContext.StateAdministrator_ModuleProcessor.OpenSendLoginProgressBarPopup(objContext),
        };
        ApplicationState.SetProperty("OfficeRibbonData", StateAdministrator_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }

}

export default StateAdministrator_ModuleProcessor;