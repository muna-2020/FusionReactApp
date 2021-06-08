//Objects required for module.
import Object_Intranet_Taxonomy_CategoryCompetency from '@shared/Object/c.Intranet/6_Taxonomy/CategoryCompetency/CategoryCompetency';
import Object_Intranet_Taxonomy_Category from '@shared/Object/c.Intranet/6_Taxonomy/Category/Category';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as CategoryCompetency_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/CategoryCompetency_MetaData';
import * as CategoryCompetency_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/CategoryCompetency_OfficeRibbon';
import * as AddEditCategoryCompetency_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/AddEditCategoryCompetency/AddEditCategoryCompetency_MetaData';

/**
 * @name CategoryCompetency_ModuleProcessor
 * @param NA
 * @summary Class for CategoryCompetency module display.
 * @return NA
 */
class CategoryCompetency_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Taxonomy_CategoryCompetency",
            "Object_Intranet_Taxonomy_Category",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/CategoryCompetency",
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

        let objCatCompetencyParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Category_Competency_Data.tCompetencyText": {
                        "order": "asc"
                    }
                }]
        }
        // CategoryCompetency
        Object_Intranet_Taxonomy_CategoryCompetency.Initialize(objCatCompetencyParam);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CategoryCompetency];

        let objCategoryParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Category_Data.vCategoryName": {
                        "order": "asc"
                    }
                }]
        }
        // Category
        Object_Intranet_Taxonomy_Category.Initialize(objCategoryParam);
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

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/6_Taxonomy/CategoryCompetency"];
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
            RowData: DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] ?? [],
            LanguageData: objContext.CategoryCompetency_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...CategoryCompetency_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "iCategoryId": objContext.state.intCategoryDropdownSelectedValue
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
     * @summary Call tabbed popup for Add/Edit of CategoryCompetency
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/CategoryCompetency", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CategoryCompetencyGrid"] : [];
        let intApplicationTypeForCategoryCompetencyData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intCategoryDropdownSelectedValue == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForCategoryCompetencyData),
                    Object_Intranet_Taxonomy_CategoryCompetency: objContext.props.Object_Intranet_Taxonomy_CategoryCompetency,
                    IsEdit: blnIsEdit,
                    CategoryDropdownSelectedValue: objContext.state.intCategoryDropdownSelectedValue,
                },
                Meta: {
                    PopupName: "AddEditCategoryCompetency",
                    HeaderData: AddEditCategoryCompetency_MetaData.GetAddEditMetaData(),
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
     * @summary Call Confirmation popup for Deleting CategoryCompetency
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/CategoryCompetency", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CategoryCompetencyGrid"] : 0;

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
                    ConfirmEvent: (strPopupId) => this.DeleteCategoryCompetency(arrSelectedRows, strPopupId)
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
     * @name DeleteCategoryCompetency
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes CategoryCompetency and close popup on success
     */
    DeleteCategoryCompetency(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Taxonomy_CategoryCompetency.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CategoryCompetencyGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }


    /**
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnSubjectDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CategoryCompetencyGrid": null });
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
                "intCategoryDropdownSelectedValue": -1,
                "arrSubSubjectData": arrSubSubjectData,
                "arrCategoryData": []
            }
        });
    };

    /**
     * @param {*} objChangeData 
     * @param {*} props 
     * @summary   To change the sub subject Dropdown value on change of the sub subject dropdown 
     */
    OnSubSubjectDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CategoryCompetencyGrid": null });
        let arrCategoryData = [];
        DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"].map((objSubSubject) => {
            if (objSubSubject["iSubjectId"] === objChangeData["iSubjectId"]) {
                arrCategoryData = [...arrCategoryData, objSubSubject];
            }
        });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intSubSubjectDropdownSelectedValue": objChangeData["iSubjectId"],
                "intCategoryDropdownSelectedValue": -1,
                "arrCategoryData": arrCategoryData
            }
        });
    };

    /**
     * @param {*} objChangeData 
     * @param {*} props 
     * @summary   To change the category selected value on change of the category dropdown 
     */
    OnCategoryDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CategoryCompetencyGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "intCategoryDropdownSelectedValue": objChangeData["iCategoryId"], objFilter: { ...objContext.state.objFilter, "iCategoryId": objContext.state.intCategoryDropdownSelectedValue } } });
    };

    /**
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
            "AddPopup": () => objContext.CategoryCompetency_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.CategoryCompetency_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.CategoryCompetency_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", CategoryCompetency_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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

export default CategoryCompetency_ModuleProcessor;