//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_MainClient_MainClientThemeConfiguration from '@shared/Object/c.Cockpit/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration';
import Object_Cockpit_TargetGroup from '@shared/Object/c.Cockpit/TargetGroup/TargetGroup';
import Object_Cockpit_Country from '@shared/Object/c.Cockpit/Country/Country';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports.
import * as MainClientThemeConfiguration_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration_OfficeRibbon';
import * as MainClientThemeConfiguration_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration_MetaData';
import * as AddEditMainClientThemeConfiguration_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/AddEditMainClientThemeConfiguration/AddEditMainClientThemeConfiguration_MetaData';

/**
 * @name MainClient_ModuleProcessor
 * @summary Class for MainClient module display.
 */
class MainClientThemeConfiguration_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClientThemeConfiguration",
            "Object_Cockpit_Language",
            "Object_Cockpit_TargetGroup",
            "Object_Cockpit_Country",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration"
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

        var objMainClientThemeParams = {
            "SortKeys": [
                {
                    "vThemeConfigurationName": {
                        "order": "asc"
                    }
                }
            ]
        };

        //MainClientThemeConfiguration object
        Object_Cockpit_MainClient_MainClientThemeConfiguration.Initialize(objMainClientThemeParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientThemeConfiguration];

        //TargetGroup object
        Object_Cockpit_TargetGroup.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_TargetGroup];

        //Country object
        Object_Cockpit_Country.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Country];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration"];
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
        let objData = {
            RowData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientThemeConfiguration)["Data"] ?? [],
            DropDownData: objContext.MainClientThemeConfiguration_ModuleProcessor.GetDependingColumnData(objContext)
        };
        return objData;
    }

    /**
     * @name GetResourceData
     * @param {any} objContext
     * @summary Returns Resource Data for Grid
     * @returns {object} Resource Data
     */
    GetResourceData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration", objContext.props) ?? {};
        return {
            Text: objTextResource,
            SkinPath: objContext.props.JConfiguration.CockpitSkinPath
        };
    }

    /**
     * @name GetMetaData
     * @summary Returns Meta Data for Grid
     * @returns {object} Meta Data
     */
    GetMetaData() {
        return MainClientThemeConfiguration_MetaData.GetMetaData();
    }

    /**
     * @name GetCallBacks
     * @summary Returns GetCallBacks for Grid
     * @returns {object} GetCallBacks
     */
    GetCallBacks(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => objContext.MainClientThemeConfiguration_ModuleProcessor.OnBeforeGridRowRender(objRow, objContext)
        }
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {any} objContext
     * @summary Return Grid row data after executing CallBack
     * @returns {object} Grid row data
     */
    OnBeforeGridRowRender(objRow, objContext) {
        let vLanguageName = "";
        let vDefaultLanguage = "";
        objContext.props.Object_Cockpit_Language["Data"].map(objLanguage => {
            if (objRow["iLanguageId"] == objLanguage["iFrameworkLanguageId"]) {
                objLanguage["t_Framework_Language_Data"].map(objLanguageData => {
                    if (objLanguageData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId) {
                        vLanguageName = objLanguage["vLanguageIdentifier"]
                    }
                })
            }
            if (objRow["iDefaultLanguageId"] == objLanguage["iFrameworkLanguageId"]) {
                objLanguage["t_Framework_Language_Data"].map(objLanguageData => {
                    if (objLanguageData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId) {
                        vDefaultLanguage = objLanguage["vLanguageIdentifier"]
                    }
                })
            }
        })
        let objLanguageName = { "vLanguageName": vLanguageName };
        let objDefaultLanguage = { "vDefaultLanguageName": vDefaultLanguage }
        objRow = { ...objRow, ...objLanguageName, ...objDefaultLanguage };
        return objRow;
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditMainClientThemeConfiguration_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows").MainClientThemeConfigurationGrid;
        let blnShowErrorPopup = blnIsEdit && (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;

        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        TargetGroup: DataRef(objContext.props.Object_Cockpit_TargetGroup)["Data"],
                        Country: DataRef(objContext.props.Object_Cockpit_Country)["Data"],
                        Languagename: DataRef(objContext.props.Object_Cockpit_Language)["Data"],
                    },
                    Object_Cockpit_MainClient_MainClientThemeConfiguration: objContext.props.Object_Cockpit_MainClient_MainClientThemeConfiguration,
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditMainClientThemeConfiguration",
                    HeaderData: arrHeaderData,
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    ClientUserDetails: objContext.props.ClientUserDetails,
                },
                Events: {
                },
                CallBacks: {
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
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows").MainClientThemeConfigurationGrid;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vThemeConfigurationName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                    Variables: objVaribales
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (objModal) => this.DeleteMainClientThemeConfiguration(arrSelectedRows, objModal)
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
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteMainClient
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes MainClient and close pop-up on success
     */
    DeleteMainClientThemeConfiguration(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_MainClient_MainClientThemeConfiguration.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                this.SelectAdjacentGridRow("MainClientThemeConfigurationGrid", arrSelectedRows);
            }
        });
    }

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {

        var arrCountry = DataRef(objContext.props.Object_Cockpit_Country)["Data"] ?? [];
        var arrTargetGroup = DataRef(objContext.props.Object_Cockpit_TargetGroup)["Data"] ?? [];

        let objCountryListDropDownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iCountryId",
            "DisplayColumn": "vCountryName",
            "DependingTableName": "t_Framework_Country_Data",
            "Data": []
        };

        let objTargetGroupListDropDownData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "iTargetGroupId",
            "DisplayColumn": "vTargetGroupName",
            "DependingTableName": "t_Framework_MainClient_Configuration_TargetGroup",
            "Data": []
        };

        arrCountry.map((objCountry) => {
            if (objCountry["cIsDeleted"] === "N") {
                objCountryListDropDownData["Data"] = [...objCountryListDropDownData["Data"], objCountry];
            }
        });

        arrTargetGroup.map((objTargetGroup) => {
            objTargetGroupListDropDownData["Data"] = [...objTargetGroupListDropDownData["Data"], objTargetGroup];
        });
        return { "iCountryId": objCountryListDropDownData, "iTargetGroupId": objTargetGroupListDropDownData };
    }

    /**
   * @name GetAdministratorName
   * @param {object} objContext takes objContext
   * @summary Returns MultilanguageData
   */
    GetMultiLanguageData(objContext) {
        let arrClientLanguageId = [];
        let arrMultiLanguageData = [];
        let arrMultiLanguageDetails = [];
        if (objContext.props.Data.MainClientLanguageData && objContext.props.Data.LanguageData) {
            objContext.props.Data.MainClientLanguageData.map((objMainClientLanguage) => {
                if (objMainClientLanguage["cIsDeleted"] == 'N' && objMainClientLanguage["iApplicationTypeId"] == 2)
                    arrClientLanguageId = [...arrClientLanguageId, objMainClientLanguage["iLanguageId"]]
            })

            objContext.props.Data.LanguageData.map((objLanguage) => {
                if (arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                    let obj = {
                        "iLanguageId": objLanguage["iFrameworkLanguageId"],
                        "vPageTitle": null,
                        "tCorrectAnswerExplanation": null,
                        "cPointOverride": null,
                        "dPoints": null
                    };
                    arrMultiLanguageData = [...arrMultiLanguageData, obj];
                    arrMultiLanguageDetails = [...arrMultiLanguageDetails, objLanguage];
                }
            })
        }
        return { arrMultiLanguageData, arrMultiLanguageDetails };
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.MainClientThemeConfiguration_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.MainClientThemeConfiguration_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.MainClientThemeConfiguration_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", MainClientThemeConfiguration_OfficeRibbon.GetMainClientThemeConfigurationOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.CockpitSkinPath + "/Css/Application/ReactJs/PC/Modules/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration.css"
        ];
    }
}

export default MainClientThemeConfiguration_ModuleProcessor;