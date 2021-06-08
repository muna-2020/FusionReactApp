//Objects required for module.
import Object_Intranet_Setting_PathFinder_JobSubjectTemplate from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate';
import Object_Intranet_Setting_PathFinder_JobField from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobField/JobField';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports.
import * as JobSubjectTemplate_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate_OfficeRibbon';
import * as JobSubjectTemplate_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate_MetaData';

/**
 * @name JobSubjectTemplate_ModuleProcessor
 * @param NA
 * @summary Class for JobSubjectTemplate module display.
 * @return NA
 */
class JobSubjectTemplate_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Setting_PathFinder_JobSubjectTemplate",
            "Object_Intranet_Setting_PathFinder_JobField",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate",
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
        let objJobSubjectTemplateParams = {
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ]
        }
       
        //JobSubjectTemplate
        Object_Intranet_Setting_PathFinder_JobSubjectTemplate.Initialize(objJobSubjectTemplateParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobSubjectTemplate];

        let objJobFieldParam = {
            "SortKeys": [
                {
                    "t_PathFinder_JobField_Data.vJobFieldName": {
                        "order": "asc"
                    }
                }]
        }
        //JobField
        Object_Intranet_Setting_PathFinder_JobField.Initialize(objJobFieldParam);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobField];

        //Subject
        Object_Intranet_Taxonomy_Subject.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate"];
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
            RowData: DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobSubjectTemplate)["Data"] ?? [],
            DropDownData: objContext.JobSubjectTemplate_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.JobSubjectTemplate_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...JobSubjectTemplate_MetaData.GetMetaData(),
            Filter: {
                "uJobFieldId": objContext.state.uJobFieldId,
                "cIsDeleted": "N"
            }
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate", objContext.props) ?? {};        
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

   /**
    * @name OnJobFieldDropDownChange
    * @param {*} objContext objChangeData
    * @param {*} objChangeData objChangeData
    * @summary Handles change in JobField DropDown filter
    */
    OnJobFieldDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobSubjectTemplateGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "uJobFieldId": objChangeData["uJobFieldId"] } });
    }

    /**
   * @name GetGridCallBacks
   * @param {object} objContext
   * @summary Returns object that contains all the CallBack methods.
   * @return {object} Object with callback methods
   */
    GetGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => objContext.JobSubjectTemplate_ModuleProcessor.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name OnBeforeGridRowRender
    * @param {any} objContext
    * @summary Return Grid data
    * @returns {object} Grid data
    */
    OnBeforeGridRowRender(objRow, objContext) {
        let arrSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"]?.filter(objSubject => objSubject["iSubjectId"] === objRow["iSubjectId"]);
        let vSubjectName = arrSubject[0]["t_TestDrive_Subject_Data"].filter(objSubjectData => objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId)?.[0]["vSubjectName"];
        //return { ...objRow};
        return { ...objRow, "vSubjectName": arrSubject[0]["iParentSubjectId"] == 0 ? vSubjectName : " --" + vSubjectName };
    }

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {
        let objSubjectDropDownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iSubjectId",
            "DisplayColumn": "vSubjectName",
            "DependingTableName": "t_TestDrive_Subject_Data",
            "Data": []
        };

        let arrSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] ?? [];
        arrSubject.map((objSubject) => {
            objSubjectDropDownData["Data"] = [...objSubjectDropDownData["Data"], objSubject];
        });
        return { "iSubjectId": objSubjectDropDownData };
    };

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Tabbed popup for JobSubjectTemplate
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["JobSubjectTemplateGrid"] : [];
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.uJobFieldId == "00000000-0000-0000-0000-000000000000";
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    IsEdit: blnIsEdit,
                    SelectedJobFieldId: objContext.state.uJobFieldId,
                    DropdownData: {
                        SubjectData: DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"]                        
                    }
                },
                Meta: {
                    PopupName: "AddEditJobSubjectTemplate",
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
     * @summary Call Confirmation popup for Deleting subject
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["JobSubjectTemplateGrid"] : [];

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
                    ConfirmEvent: (strPopupId) => this.DeleteJobSubjectTemplate(arrSelectedRows, strPopupId)
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
     * @name DeleteJobSubjectTemplate
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes JobSubjectTemplate and close popup on success
     */
    DeleteJobSubjectTemplate(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Setting_PathFinder_JobSubjectTemplate.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobSubjectTemplateGrid": null });
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
            "AddPopup": () => objContext.JobSubjectTemplate_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.JobSubjectTemplate_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.JobSubjectTemplate_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", JobSubjectTemplate_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css"
        ];
    }
}

export default JobSubjectTemplate_ModuleProcessor;