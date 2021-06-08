//Objects required for module.
import Object_Intranet_Setting_PathFinder_JobLevel from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobLevel/JobLevel';
import Object_Intranet_Setting_PathFinder_JobField from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobField/JobField';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports.
import * as JobLevel_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/JobLevel_OfficeRibbon';
import * as AddEditJobLevel_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/AddEditJobLevel/AddEditJobLevel_MetaData';
import * as JobLevel_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/JobLevel_MetaData';

/**
* @name JobLevel_ModuleProcessor
* @param NA
* @summary Class for Job module display.
* @return NA
*/
class JobLevel_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Setting_PathFinder_JobLevel",
            "Object_Intranet_Setting_PathFinder_JobField",
            "Object_Extranet_State_State",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/PathFinder/JobLevel",
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

        let objStateParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_State_Data.vStateName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iStateId", "cIsDeleted", "t_TestDrive_Member_State_Data"]
        }

        //State
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        Object_Intranet_Setting_PathFinder_JobLevel.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobLevel];

        //PathFinder
        Object_Intranet_Setting_PathFinder_JobField.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobField];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/PathFinder/JobLevel"];
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
        let intApplicationTypeForJobData = 2;
        let objData = {
            RowData: DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobLevel)["Data"] ?? [],
            LanguageData: objContext.JobLevel_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForJobData),
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
        return {
            ...JobLevel_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "iStateId": objContext.state.iStateId,
                "uJobFieldId": objContext.state.uJobFieldId
            }
        }
    }

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} Object with callback methods
     */
    GetGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => objContext.JobLevel_ModuleProcessor.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobLevel", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
     * @name OnStateDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the State Dropdown Data on change of the State dropdown value
     */
    OnStateDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobLevelGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "iStateId": objChangeData["iStateId"], "uJobFieldId": "00000000-0000-0000-0000-000000000000"} });
    }

    /**
     * @name OnJobFieldDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the State Dropdown Data on change of the JobType dropdown value
     */
    OnJobFieldDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobLevelGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "uJobFieldId": objChangeData["uJobFieldId"] } });
    }

    /**
    * @name OnBeforeGridRowRender
    * @param {any} objContext
    * @summary BeforeGridRowRender callback for Grid
    * @returns {object} Grid row data
    */
    OnBeforeGridRowRender(objRow, objContext) {
        let vJobFieldName = objRow["uJobFieldId"] == "00000000-0000-0000-0000-000000000000"?"All,":"";
        if (objRow["t_PathFinder_Job_JobField"].length > 0) {
            let objJobField = objContext.props.Object_Intranet_Setting_PathFinder_JobField["Data"].filter(objJobField => objJobField["uJobFieldId"] === objRow["uJobFieldId"]);
            if (objJobField.length >0) {
                objJobField[0]["t_PathFinder_JobField_Data"].map((objJobFieldData) => {
                    if (objContext.props.JConfiguration.InterfaceLanguageId == objJobFieldData["iLanguageId"]) {
                        vJobFieldName = vJobFieldName + objJobFieldData["vJobFieldName"] + ",";
                    }
                })
            }
           
        }
        vJobFieldName = vJobFieldName.substring(0, vJobFieldName.length - 1);
        return { ...objRow, "vJobFieldName": vJobFieldName };
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Tabbed pop-up for Job
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobLevel", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["JobLevelGrid"] : [];
        let intApplicationTypeForJobData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForJobData),
                    IsEdit: blnIsEdit,
                    iStateId: objContext.state.iStateId,
                    uJobFieldId: objContext.state.uJobFieldId,
                    MultiselectDropdownData: {
                        JobField: objContext.props.Object_Intranet_Setting_PathFinder_JobField["Data"],
                    }
                },
                Meta: {
                    PopupName: "AddEditJobLevel",
                    HeaderData: AddEditJobLevel_MetaData.GetAddEditMetaData(),
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
                    TextResourcesKey: blnIsEdit ? "EditErrorPopup" : "AddErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name OpenDeletePopup
    * @param {object} objContext passes Context object
    * @summary Call Confirmation pop-up for Deleting subject
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobLevel", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["JobLevelGrid"] : [];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "DeleteConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteJobLevel(arrSelectedRows, strPopupId)
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
                    TextResourcesKey: "DeleteErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name DeleteJob
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes Job and close pop-up on success
    */
    DeleteJobLevel(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Setting_PathFinder_JobLevel.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobLevelGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.JobLevel_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.JobLevel_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.JobLevel_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", JobLevel_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/MultiSelectDropdown/MultiSelectDropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css"
        ];
    }
}

export default JobLevel_ModuleProcessor;