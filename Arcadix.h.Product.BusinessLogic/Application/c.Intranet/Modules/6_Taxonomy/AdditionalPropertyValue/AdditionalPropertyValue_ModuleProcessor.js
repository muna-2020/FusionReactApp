//Objects required for module.
import Object_Intranet_Task_TaskAdditionalPropertyValue from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalPropertyValue/TaskAdditionalPropertyValue';
import Object_Intranet_Task_TaskAdditionalProperty from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalProperty/TaskAdditionalProperty';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Taxonomy_Category from '@shared/Object/c.Intranet/6_Taxonomy/Category/Category';
import Object_Intranet_Taxonomy_CategoryCompetency from '@shared/Object/c.Intranet/6_Taxonomy/CategoryCompetency/CategoryCompetency';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditAdditionalPropertyValue_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AddEditAdditionalPropertyValue/AddEditAdditionalPropertyValue_MetaData';
import * as AdditionalPropertyValue_MetaData from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AdditionalPropertyValue_MetaData';
import * as AdditionalPropertyValue_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AdditionalPropertyValue_OfficeRibbon';

/**
 * @name AdditionalPropertyValue_ModuleProcessor
 * @param NA
 * @summary Class for Subject module display.
 * @return NA
 */
class AdditionalPropertyValue_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Task_TaskAdditionalPropertyValue",
            "Object_Intranet_Task_TaskAdditionalProperty",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Taxonomy_Category",
            "Object_Intranet_Taxonomy_CategoryCompetency",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue",
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

        //AddtionalPropertyValue
        Object_Intranet_Task_TaskAdditionalPropertyValue.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskAdditionalPropertyValue];


        //AdditionalProperty
        Object_Intranet_Task_TaskAdditionalProperty.Initialize(objAdditionalPropertyParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskAdditionalProperty];

        // Subject
        Object_Intranet_Taxonomy_Subject.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        // Category
        Object_Intranet_Taxonomy_Category.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Category];

        // CategoryCompetency
        Object_Intranet_Taxonomy_CategoryCompetency.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CategoryCompetency];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }


    /**
     * @name OnAdditionalPropertyChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnAdditionalPropertyChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyValueGrid": null });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strAdditionalTaskPropertyId": objChangeData["iAdditionalTaskPropertyId"], "strDependencyColumnValueId": objChangeData["iDependencyId"] == -1 ? null : objChangeData["iDependencyId"]
                , "intSubjectDropdownSelectedValue": -1,
                "intSubSubjectDropdownSelectedValue": -1,
                "intCategoryDropdownSelectedValue": -1,
                "intCompetencyDropdownSelectedValue": -1,
                "arrAdditionalPropertySubjectData": objChangeData["t_TestDrive_Task_AdditionalTaskProperty_Subject"] != undefined ? objChangeData["t_TestDrive_Task_AdditionalTaskProperty_Subject"] : []
            }
        });
    };


    /**
     * @name GetCallBackForSubjectDropDown
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetCallBackForSubjectDropDown(objNode, objContext) {
        let returnValue = false;
        objContext.state.arrAdditionalPropertySubjectData.map(objAdditionalPropertySubjectData => {
            if (objAdditionalPropertySubjectData["iSubjectId"] == objNode["iSubjectId"]) {
                returnValue = true
            }
        })
        return returnValue;
    }

    /**
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnSubjectDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyValueGrid": null });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intSubjectDropdownSelectedValue": objChangeData["iSubjectId"],
                "intSubSubjectDropdownSelectedValue": -1,
                "intCategoryDropdownSelectedValue": -1,
                "intCompetencyDropdownSelectedValue": -1,
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
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyValueGrid": null });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intSubSubjectDropdownSelectedValue": objChangeData["iSubjectId"],
                "intCategoryDropdownSelectedValue": -1,
                "intCompetencyDropdownSelectedValue": -1,
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
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyValueGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "intCompetencyDropdownSelectedValue": -1, "intCategoryDropdownSelectedValue": objChangeData["iCategoryId"], objFilter: { ...objContext.state.objFilter, "iCategoryId": objContext.state.intCategoryDropdownSelectedValue } } });
    };

    /**
     * @param {*} objChangeData 
     * @param {*} props 
     * @summary   To change the category selected value on change of the category dropdown 
     */
    OnCompetencyDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyValueGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "intCompetencyDropdownSelectedValue": objChangeData["iCategoryCompetencyId"], objFilter: { ...objContext.state.objFilter, "iCategoryCompetencyId": objContext.state.intCompetencyDropdownSelectedValue } } });
    };


    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let intApplicationTypeForLanguageData = 2;
        let objData = {
            RowData: DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"] ?? [],
            LanguageData: objContext.AdditionalPropertyValue_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...AdditionalPropertyValue_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "iAdditionalTaskPropertyId": objContext.state.strAdditionalTaskPropertyId
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
            OnBeforeGridRowRender: (objRow) => objContext.AdditionalPropertyValue_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
        };
    }

    /**
     * @name GetCallBackforGrid
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetCallBackforGrid(objRow, objContext) {
        if (objContext.state.strDependencyColumnValueId == null) {
            return { ...objRow }
        }
        else {
            if (objContext.state.strDependencyColumnValueId == 1) {
                if (objRow["iDependencyColumnValueId"] == objContext.state.intCategoryDropdownSelectedValue) {
                    return { ...objRow }
                }
            }
            else if (objContext.state.strDependencyColumnValueId == 2) {
                if (objRow["iDependencyColumnValueId"] == objContext.state.intCompetencyDropdownSelectedValue) {
                    return { ...objRow }
                }
            }
            else {
                return null
            }
        }
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
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call tabbed popup for Add/Edit of Category
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["AdditionalPropertyValueGrid"] : [];
        let intApplicationTypeForAdditionalPropertyValueData = 2;
        let blnShowErrorPopup = false;
        let strDependentValue = objContext.state.intCategoryDropdownSelectedValue;
        if (objContext.state.strDependencyColumnValueId == 2) {
            strDependentValue = objContext.state.intCompetencyDropdownSelectedValue;
        }
        if (objContext.state.strDependencyColumnValueId == 2) {
            strDependentValue = objContext.state.intCompetencyDropdownSelectedValue;
        }
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            if (objContext.state.strDependencyColumnValueId == null) {
                blnShowErrorPopup = objContext.state.strAdditionalTaskPropertyId == -1
            }
            else if (objContext.state.strDependencyColumnValueId == 1) {
                blnShowErrorPopup = objContext.state.intCategoryDropdownSelectedValue == -1
            }
            else {
                blnShowErrorPopup = objContext.state.intCompetencyDropdownSelectedValue == -1
            }
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForAdditionalPropertyValueData),
                    IsEdit: blnIsEdit,
                    Object_Intranet_Task_TaskAdditionalProperty: objContext.props.Object_Intranet_Task_TaskAdditionalProperty,
                    SubjectData: objContext.props.Object_Intranet_Taxonomy_Subject["Data"],
                    strDependentValue: strDependentValue,
                    strAdditionalTaskPropertyId: objContext.state.strAdditionalTaskPropertyId,
                },
                Meta: {
                    PopupName: "AddEditAdditionalPropertyValue",
                    HeaderData: AddEditAdditionalPropertyValue_MetaData.GetAddEditMetaData(),
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["AdditionalPropertyValueGrid"];

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
                    ConfirmEvent: (strPopupId) => this.DeleteAdditonalPropertyValue(arrSelectedRows, strPopupId)
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
    DeleteAdditonalPropertyValue(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Task_TaskAdditionalPropertyValue.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ApplicationPropertyGrid": null, "t_TestDrive_Task_AdditionalTaskProperty_Subject": [] });
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
            "AddPopup": () => objContext.AdditionalPropertyValue_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.AdditionalPropertyValue_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.AdditionalPropertyValue_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", AdditionalPropertyValue_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
export default AdditionalPropertyValue_ModuleProcessor;

