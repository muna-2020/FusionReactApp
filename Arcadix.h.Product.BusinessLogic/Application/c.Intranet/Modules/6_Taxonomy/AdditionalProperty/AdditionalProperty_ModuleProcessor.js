//Objects required for module.
import Object_Intranet_Task_TaskAdditionalProperty from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalProperty/TaskAdditionalProperty';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditAdditionalProperty_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AddEditAdditionalProperty/AddEditAdditionalProperty_MetaData';
import * as AdditionalProperty_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AdditionalProperty_MetaData';
import * as AdditionalProperty_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AdditionalProperty_OfficeRibbon';

/**
* @name AdditionalProperty_ModuleProcessor
* @param NA
* @summary Class for Subject module display.
* @return NA
*/
class AdditionalProperty_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Task_TaskAdditionalProperty",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/AdditionalProperty",
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
        var objAdditionalPropertyParams = {
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ]
        };

        //AdditionalProperty
        Object_Intranet_Task_TaskAdditionalProperty.Initialize(objAdditionalPropertyParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskAdditionalProperty];

        // Subject
        Object_Intranet_Taxonomy_Subject.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/6_Taxonomy/AdditionalProperty"];
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
    GetDependencyData() {
        const arrDependencyData = [
            { iAdditionalPropertyDependencyDataId: "1", iAdditionalPropertyDependencyId: 1, vDependencyName: "Category" },
            { iAdditionalPropertyDependencyDataId: "2", iAdditionalPropertyDependencyId: 2, vDependencyName: "Competency" }
        ];
        return arrDependencyData;
    }

    /**
     * @name GetCallBackforGrid
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetCallBackforGrid(objRow, objContext) {
        console.log(objRow);
        let arrSubjectData = objContext.props.Object_Intranet_Taxonomy_Subject["Data"] ?? [];
        let arrDependencyData = this.GetDependencyData();
        let vGridDependendencyData = "";
        let vGridSubject = "";
        if (objRow["iDependencyId"] != '') {
            arrDependencyData.map(dependstring => {
                if (objRow["iDependencyId"] == dependstring["iAdditionalPropertyDependencyId"]) {
                    vGridDependendencyData = dependstring["vDependencyName"];
                }
            })
        }
        if (objRow["t_TestDrive_Task_AdditionalTaskProperty_Subject"]) {
            objRow["t_TestDrive_Task_AdditionalTaskProperty_Subject"] ? objRow["t_TestDrive_Task_AdditionalTaskProperty_Subject"].map(TableSubjectData => {
                arrSubjectData.map(subjectisd => {
                    if (subjectisd["iSubjectId"] == TableSubjectData["iSubjectId"]) {
                        subjectisd["t_TestDrive_Subject_Data"].map(data => {
                            if (objContext.props.JConfiguration.InterfaceLanguageId == data["iLanguageId"]) {
                                vGridSubject = vGridSubject + data["vSubjectName"] + ",";
                            }
                        })
                    }
                })
            }) : ""
        }
        vGridSubject = vGridSubject.substring(0, vGridSubject.length - 1);
        let objSubject = { "vSubjectName": vGridSubject };
        let objDependendencyData = { "vDependencyName": vGridDependendencyData };
        return { ...objRow, ...objSubject, ...objDependendencyData };
        //return objRow;
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
            RowData: DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalProperty)["Data"] ?? [],
            LanguageData: objContext.AdditionalProperty_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...AdditionalProperty_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N"
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
     * @name GetGridResource
     * @param {object} objContext
     * @summary it returns the object for Grid Resources
     * @returns {object}  resource object
     */
    GetGridCallBack(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => objContext.AdditionalProperty_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
        };
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call tabbed popup for Add/Edit of Category
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalProperty", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["AdditionalPropertyGrid"] : [];
        let intApplicationTypeForCategoryData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intSubSubjectDropdownSelectedValue == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForCategoryData),
                    IsEdit: blnIsEdit,
                    SubjectData: objContext.props.Object_Intranet_Taxonomy_Subject["Data"],
                    DropdownData: {
                        TargetGroup: this.GetDependencyData(),
                    },
                    MultiselectDropdownData: {
                        AdditionalPropertySubjectTable: objContext.props.Object_Intranet_Task_TaskAdditionalProperty["Data"],
                        TargetGroup: objContext.props.Object_Intranet_Taxonomy_Subject["Data"],
                    },
                },
                Meta: {
                    PopupName: "AddEditAdditionalProperty",
                    HeaderData: AddEditAdditionalProperty_MetaData.GetAddEditMetaData(),
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalProperty", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["AdditionalPropertyGrid"];

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
                    ConfirmEvent: (strPopupId) => this.DeleteAdditonalProperty(arrSelectedRows, strPopupId)
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
    DeleteAdditonalProperty(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Task_TaskAdditionalProperty.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyGrid": null, "t_TestDrive_Task_AdditionalTaskProperty_Subject": [] });
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
            "AddPopup": () => objContext.AdditionalProperty_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.AdditionalProperty_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.AdditionalProperty_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", AdditionalProperty_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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

export default AdditionalProperty_ModuleProcessor;

