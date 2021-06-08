//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_MainClient_MainClientThemeConfiguration from '@shared/Object/c.Cockpit/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration';
import Object_Cockpit_MainClient_MainClientConfiguration from '@shared/Object/c.Cockpit/MainClient/MainClientConfiguration/MainClientConfiguration';

//Module related imports.
import * as MainClient_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/MainClient_OfficeRibbon';
import * as MainClient_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/MainClient_MetaData';
import * as AddEditMainClient_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/AddEditMainClient/AddEditMainClient_MetaData';

/**
 * @name MainClient_ModuleProcessor
 * @summary Class for MainClient module display.
 */
class MainClient_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
      * @name StoreMapList     
      * @summary Returns list of objects used in the module
      * @return {Array} Array of object list
      */
    static StoreMapList() {
        return ["Object_Cockpit_MainClient_MainClient", "Object_Cockpit_MainClient_MainClientThemeConfiguration", "Object_Cockpit_MainClient_MainClientConfiguration", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/MainClient", "Object_Cockpit_MainClient_MainClientLanguage", "Object_Cockpit_Language"];
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

        var objMainClientParams = {
            "SortKeys": [
                {
                    "iMainClientId": {
                        "order": "asc"
                    }
                }
            ]
        };

        let arrDataRequest = [];

        //MainClientThemeConfiguration object
        Object_Cockpit_MainClient_MainClientThemeConfiguration.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientThemeConfiguration];

        //MainClientConfiguration object
        Object_Cockpit_MainClient_MainClientConfiguration.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientConfiguration];

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize(objMainClientParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/MainClient"];
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
        let intApplicationTypeForLanguageData = 7;
        let objData = {
            RowData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"] ?? [],
            DropDownData: objContext.MainClient_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.MainClient_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClient", objContext.props) ?? {};
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
        return MainClient_MetaData.GetMetaData();
    }

    /**
     * @name GetCallBacks
     * @summary Returns GetCallBacks for Grid
     * @returns {object} GetCallBacks
     */
    GetCallBacks(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => {
                return objRow["iMainClientId"] != 0 ? objRow : null
            }
        }
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenAddEditPopup(objContext,blnIsEdit) {
        let arrHeaderData = AddEditMainClient_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClient", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["MainClientGrid"];
        let intApplicationTypeForLanguageData = 7;

        let blnShowErrorPopup = blnIsEdit && (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),    
                    DropdownData: {
                        MainClientThemeConfiguration: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientThemeConfiguration)["Data"],
                        MainClientConfiguration: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientConfiguration)["Data"]
                    },
                    Object_Cockpit_MainClient_MainClient: objContext.props.Object_Cockpit_MainClient_MainClient,                   
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditMainClient",
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
        } else {
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClient", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["MainClientGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0)
        {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vMainClientIdentifier"] + ", ";
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
                    ConfirmEvent: (objModal) => this.DeleteMainClient(arrSelectedRows, objModal)
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
    DeleteMainClient(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_MainClient_MainClient.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                this.SelectAdjacentGridRow("MainClientGrid", arrSelectedRows);
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
        var arrMainClientThemeConfiguration  = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientThemeConfiguration)["Data"] ?? [];
        var arrMainClientConfiguration = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientConfiguration)["Data"] ?? [];
        let objMainClientConfigurationListDropDownData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "iMainClientConfigurationId",
            "DisplayColumn": "vMainClientConfigurationName",
            "Data": []
        };

        let objMainClientThemeConfigurationListDropDownData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "iMainClientThemeConfigurationId",
            "DisplayColumn": "vThemeConfigurationName",
            "Data": []
        };              

        arrMainClientConfiguration.map((objMainCLientConfig) => {
            if (objMainCLientConfig["cIsDeleted"] === "N") {
                objMainClientConfigurationListDropDownData["Data"] = [...objMainClientConfigurationListDropDownData["Data"], objMainCLientConfig];
            }
        });

        arrMainClientThemeConfiguration.map((objMainCLientThemeConfig) => {
            if (objMainCLientThemeConfig["cIsDeleted"] === "N") {
                objMainClientThemeConfigurationListDropDownData["Data"] = [...objMainClientThemeConfigurationListDropDownData["Data"], objMainCLientThemeConfig];
            }
        });

        return { "iFusionMainClientConfigurationId": objMainClientConfigurationListDropDownData, "iMainClientThemeConfigurationId": objMainClientThemeConfigurationListDropDownData };
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.MainClient_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.MainClient_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.MainClient_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", MainClient_OfficeRibbon.GetMainClientOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css"
        ];
    }
}

export default MainClient_ModuleProcessor;