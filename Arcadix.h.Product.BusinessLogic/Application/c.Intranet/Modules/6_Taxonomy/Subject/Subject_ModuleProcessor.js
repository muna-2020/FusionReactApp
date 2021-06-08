//Objects required for module.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related files
import * as Subject_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/Subject_OfficeRibbon';
import * as AddEditSubject_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/AddEditSubject/AddEditSubject_MetaData';
import * as Subject_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/Subject_MetaData';

/**
 * @name Subject_ModuleProcessor
 * @param NA
 * @summary Class for Subject module display.
 * @return NA
 */
class Subject_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/Subject",
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
        let objSubjectParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Subject_Data.vSubjectName": {
                        "order": "asc"
                    }
                }]
        }
        // Subject
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParam);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/6_Taxonomy/Subject"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetSubjectDropDownData
     * @param {*} objContext objContext
     * @param {*} objTextResource objTextResource
     * @param {*} arrSubjectData arrSubjectData
     * @summary Return subject dropdown data
     * @returns {object} SubjectDropDownData
     */
    GetSubjectDropDownData(objContext) {
        let arrSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] ?? [];//.filter(obj => obj["cIsDeleted"] == "N");
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Subject", objContext.props) ?? {};
        let objMainSubjectData = {
            "iSubjectId": 0,
            "iParentSubjectId": -2,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
                    "vSubjectName": objTextResource["MainSubject"] ?? "",
                    "vSubjectDisplayName": null,
                    "vSubjectShortName": null,
                    "tSubjectDescription": null,
                    "iDataMainClientId": objContext.props.JConfiguration.MainClientId
                }
            ]
        };
        return [objMainSubjectData, ...arrSubjectData];
    };

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let intApplicationTypeForLanguageData = 2;
        let objDropDownData = {
            "iParentSubjectId": {
                "cISLanguageDependent": "Y",
                "ValueColumn": "iParentSubjectId",
                "DisplayColumn": "vSubjectName",
                "DependingTableName": "t_TestDrive_Subject_Data",
                "Data": DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] ?? []
            }
        };
        let objData = {
            LanguageData: objContext.Subject_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
            RowData: DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] ?? [],
            DropDownData: objDropDownData
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
            ...Subject_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "iParentSubjectId": objContext.state.intParentSubjectId
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
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Subject", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    }

    /**
     * @name OnDropDownChange
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "SubjectGrid": null });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intParentSubjectId": objChangeData["iSubjectId"],
                objFilter: { ...objContext.state.objFilter, ["iParentSubjectId"]: objChangeData["iSubjectId"] }
            }
        });
    };

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting subject
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Subject", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SubjectGrid"] : [];
        let intApplicationTypeForSubjectData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intParentSubjectId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForSubjectData),
                    Object_Cockpit_Subject: DataRef(objContext.props.Object_Cockpit_Subject),
                    IsEdit: blnIsEdit,
                    SubjectData: DataRef(objContext.props.Object_Cockpit_Subject)["Data"],
                    ParentSubjectId: objContext.state.intParentSubjectId,
                    DropDownData: objContext.Subject_ModuleProcessor.GetSubjectDropDownData(objContext)
                },
                Meta: {
                    PopupName: "AddEditSubject",
                    HeaderData: AddEditSubject_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "",
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
     * @summary Call Confirmation popup for Deleting subject
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Subject", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SubjectGrid"] : [];
        //let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["SubjectGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            Popup.ShowConfirmationPopup({
                Data: {
                    //HeaderMainTitle: "ConfirmationPopup_MainTitle",
                    //HeaderSubTitle: "ConfirmationPopup_subtitle"
                },
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "DeleteConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteSubject(arrSelectedRows, strPopupId)
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
     * @name DeleteSubject
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close popup on success
     */
    DeleteSubject(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Taxonomy_Subject.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "SubjectGrid": null });
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
            "AddPopup": () => objContext.Subject_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Subject_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Subject_ModuleProcessor.OpenDeletePopup(objContext)
        };
        if (objContext.props.IsForTaskPopup && objContext.props.SetTaskPopupRibbon)
            objContext.props.Events.SetSubjectOfficeRibbon(Subject_OfficeRibbon.GetOfficeRibbonData(objRibbonData))
        else if (!objContext.props.IsForTaskPopup)
            ApplicationState.SetProperty("OfficeRibbonData", Subject_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/HierarchicalDropDown/HierarchicalDropDown.css"
        ];
    }
}

export default Subject_ModuleProcessor;