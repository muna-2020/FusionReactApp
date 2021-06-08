//Objects required for module.
import Object_Intranet_Taxonomy_Category from '@shared/Object/c.Intranet/6_Taxonomy/Category/Category';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as Category_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/Category_OfficeRibbon';
import * as Category_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/Category_MetaData';
import * as AddEditCategory_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/AddEditCategory/AddEditCategory_MetaData';


/**
* @name Category_ModuleProcessor
* @param NA
* @summary Class for Category module display.
* @return NA
*/
class Category_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Taxonomy_Category",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/Category",
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

        // Category
        Object_Intranet_Taxonomy_Category.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Category];

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

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/6_Taxonomy/Category"];
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
            RowData: DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"] ?? [],
            LanguageData: objContext.Category_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...Category_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "iSubjectId": objContext.state.intSubSubjectDropdownSelectedValue
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
    * @summary Call tabbed popup for Add/Edit of Category
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Category", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CategoryGrid"] : [];
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
                    SubSubjectDropdownSelectedValue: objContext.state.intSubSubjectDropdownSelectedValue,
                },
                Meta: {
                    PopupName: "AddEditCategory",
                    HeaderData: AddEditCategory_MetaData.GetAddEditMetaData(),
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
     * @summary Call Confirmation popup for Deleting Category
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Category", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CategoryGrid"] : 0;

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
                    ConfirmEvent: (strPopupId) => this.DeleteCategory(arrSelectedRows, strPopupId)
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
     * @name DeleteCategory
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Category and close popup on success
     */
    DeleteCategory(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Taxonomy_Category.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CategoryGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name OnSubjectDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnSubjectDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CategoryGrid": null });
        let arrSubSubjectData = [];
        DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].map((objSubject) => {
            if (objSubject["iParentSubjectId"] === objChangeData["iSubjectId"]) {
                arrSubSubjectData = [...arrSubSubjectData, objSubject];
            }
        });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intSubjectDropdownSelectedValue": objChangeData["iSubjectId"],
                "intSubSubjectDropdownSelectedValue": -1,
                "arrSubSubjectData": arrSubSubjectData,
                "arrCategoryData": []
            }
        });
    };

    /**
     * @name OnSubSubjectDropDownChange
     * @param {*} objContext
     * @param {*} objChangeData
     * @summary   To change the sub subject Dropdown value on change of the sub subject dropdown 
     */
    OnSubSubjectDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CategoryGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "intSubSubjectDropdownSelectedValue": objChangeData["iSubjectId"], objFilter: { ...objContext.state.objFilter, "iSubjectId": objContext.state.intSubSubjectDropdownSelectedValue } } });
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
            "AddPopup": () => objContext.Category_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Category_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Category_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Category_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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

    /**
     * @name GetPrefetchFiles
     * @param {object} props props
     * @returns {object} PrefetchFiles
     */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"]
        }
    }
}

export default Category_ModuleProcessor;