//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports.
import * as Language_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/Language/Language_MetaData';
import * as Language_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/Language/Language_OfficeRibbon';
import * as AddEditLanguage_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/Language/AddEditLanguage/AddEditLanguage_MetaData';

/**
 * @name Language_ModuleProcessor
 * @param NA
 * @summary Class for Language module display.
 * @return NA
 */
class Language_ModuleProcessor extends CockpitBase_ModuleProcessor {
    
    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Cockpit_Language", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/Language", "Object_Cockpit_MainClient_MainClientLanguage"];
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

        var objLanguageParams = {
            "SortKeys": [
                {
                    "iFrameworkLanguageId": {
                        "order": "asc"
                    }
                }
            ]
        };

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize(objLanguageParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/Language"];
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
            LanguageData: objContext.Language_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
            RowData: DataRef(objContext.props.Object_Cockpit_Language)["Data"] ?? [],
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Language", objContext.props) ?? {};
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
        return Language_MetaData.GetMetaData();
    }

    /**
     * @name GetCallBacks
     * @summary Returns GetCallBacks for Grid
     * @returns {object} GetCallBacks
     */
    GetCallBacks() {
        return {
            OnBeforeGridRowRender: (objRow) => {
                return objRow["cIsDeleted"] == "N" ? objRow : null
            }
        }
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting subject
     * @return null
     */
    OpenAddEditPopup(objContext,blnIsEdit) {
        let arrHeaderData = AddEditLanguage_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Language", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["LanguageGrid"];
        let intApplicationTypeForLanguageData = 7;
        let blnShowErrorPopup = blnIsEdit && (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;

        if (!blnShowErrorPopup)
        {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),    
                    Object_Cockpit_Language: objContext.props.Object_Cockpit_Language,
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditLanguage",
                    HeaderData: arrHeaderData,
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    ClientUserDetails: objContext.props.ClientUserDetails
                },
                Events: {
                },
                CallBacks: {
                }
            });
        }
        else
        {
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
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Language", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["LanguageGrid"];
              
        if (arrSelectedRows && arrSelectedRows.length > 0)
        {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vLanguageIdentifier"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2),
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
                    ConfirmEvent: (objModal) => this.DeleteLanguage(arrSelectedRows, objModal)
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
     * @name DeleteLanguage
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Language and close pop-up on success
     */
    DeleteLanguage(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_Language.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                this.SelectAdjacentGridRow("LanguageGrid", arrSelectedRows);
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
            "AddPopup": () => objContext.Language_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Language_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Language_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Language_OfficeRibbon.GetLanguageOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css"
        ];
    }
}

export default Language_ModuleProcessor;