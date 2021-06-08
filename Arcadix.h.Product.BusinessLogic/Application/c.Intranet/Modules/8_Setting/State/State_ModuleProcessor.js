//Objects required for module...
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Extranet_School_Title from '@shared/Object/d.Extranet/2_School/Title/Title'
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports
import * as State_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/State/State_MetaData';
import * as State_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/State/State_OfficeRibbon';

/**
 * @name State_ModuleProcessor
 * @param NA
 * @summary Class for State module display.
 * @return NA
 */
class State_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_State_State",     
            "Object_Extranet_School_Title",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/State"
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
        let objStateParams = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_State_Data.vStateName": {
                        "order": "asc"
                    }
                }
            ]
        };
        // State
        Object_Extranet_State_State.Initialize(objStateParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        // Title
        Object_Extranet_School_Title.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Title];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];
               
        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/State"];
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
            RowData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
            DropDownData: this.GetDependingColumnData(objContext),
            LanguageData: objContext.State_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData)
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
            ...State_MetaData.GetMetaData()           
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/State", objContext.props) ?? {};        
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetGridEvents(objContext) {
        let objCallBacks = {
            //OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
        };
        return objCallBacks;
    }       

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {
        let objTitleData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iTitleId",
            "DisplayColumn": "vTitleName",
            "DependingTableName": "t_TestDrive_Member_Title_Data",
            "Data": []
        };

        DataRef(objContext.props.Object_Extranet_School_Title)["Data"]?.forEach((objTitle) => {
            objTitleData["Data"] = [...objTitleData["Data"], objTitle];
        });
        return { "iTitleId": objTitleData };
    };

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let intApplicationTypeForLanguageData = 2;
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/State", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["StateGrid"] : 0;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    IsEdit: blnIsEdit,
                    DropdownData: {
                        TitleData: DataRef(objContext.props.Object_Extranet_School_Title)["Data"]
                    },
                    MultiLanguageData: objContext.State_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData)
                },
                Meta: {
                    PopupName: "AddEditState",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    JConfiguration: objContext.props.JConfiguration
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
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
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/State", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["StateGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                let objState = objSelectedRows["t_TestDrive_Member_State_Data"].find(obj => obj["iLanguageId"] == JConfiguration.InterfaceLanguageId);
                strDeleteVariables = strDeleteVariables + objState["vStateName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
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
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteState(arrSelectedRows, strPopupId, objContext)
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
     * @name DeleteState
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close popup on success
     * @returns null
     */
    DeleteState(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Extranet_State_State.DeleteData({ vDeleteData: arrDeleteRow, "uUserId": objContext.props.ClientUserDetails.UserId }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "StateGrid": null });
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
            "AddPopup": () => objContext.State_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.State_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.State_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", State_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/8_Setting/State/AddEditState/AddEditState.css"
        ];
    }    
}

export default State_ModuleProcessor;