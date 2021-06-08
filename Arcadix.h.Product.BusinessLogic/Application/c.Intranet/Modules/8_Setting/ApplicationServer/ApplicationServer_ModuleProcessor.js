//Objects required for module.
import Object_Intranet_Setting_ApplicationServer from '@shared/Object/c.Intranet/8_Setting/ApplicationServer/ApplicationServer';
import Object_Intranet_Setting_GateKeeperTargetType from '@shared/Object/c.Intranet/8_Setting/GateKeeperTargetType/GateKeeperTargetType';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as ApplicationServer_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/ApplicationServer_OfficeRibbon';
import * as ApplicationServer_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/ApplicationServer_MetaData';
import * as AddEditApplicationServer_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/AddEditApplicationServer/AddEditApplicationServer_MetaData';

/**
* @name ApplicationServer_ModuleProcessor
* @param NA
* @summary Class for ApplicationServer module display.
* @return NA
*/
class ApplicationServer_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Setting_ApplicationServer",
            "Object_Intranet_Setting_GateKeeperTargetType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/ApplicationServer",
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

        //ApplicationServer
        Object_Intranet_Setting_ApplicationServer.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_ApplicationServer]

        // GateKeeperTargetType
        Object_Intranet_Setting_GateKeeperTargetType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_GateKeeperTargetType];
        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/ApplicationServer"];
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
            RowData: objContext.state.strGateKeeperTargetTypeId == -1?[]: DataRef(objContext.props.Object_Intranet_Setting_ApplicationServer)["Data"] ?? [],// objContext.state.arrApplicationServerData,
            DropDownData: objContext.ApplicationServer_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.ApplicationServer_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData)
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
            ...ApplicationServer_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "uTargetTypeId": objContext.state.strGateKeeperTargetTypeId
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
            OnBeforeGridRowRender: (objRow) => objContext.ApplicationServer_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
        };
    }

    /**
* @name GetCallBackforGrid
* @param {any} objContext
* @summary Return Grid data
* @returns {object} Grid data
*/
    GetCallBackforGrid(objRow, objContext) {
        console.log(objRow);
        let objLanguage = DataRef(objContext.props.Object_Cockpit_Language)["Data"] ?DataRef(objContext.props.Object_Cockpit_Language)["Data"].filter(objLanguage => objLanguage["iFrameworkLanguageId"] === objRow["iLanguageId"]):[];
        let vLanguageName = "";
        if (objRow["iLanguageId"]) {
            objLanguage[0]["t_Framework_Language_Data"].map((objLangugageData) => {
                if (objContext.props.JConfiguration.InterfaceLanguageId == objLangugageData["iLanguageId"]) {
                    vLanguageName = objLangugageData["vLanguageName"];
                }
            })
        }
        return { ...objRow,  "vLanguageName": vLanguageName  };
    }

    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call Confirmation pop-up for Deleting Competency level
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ApplicationServer", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ApplicationServerGrid"] : 0;
        let intApplicationTypeForApplicatioServer = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        //else {
        //    blnShowErrorPopup = objContext.state.strGateKeeperTargetTypeId == -1
        //}
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForApplicatioServer),
                    IsEdit: blnIsEdit,
                    uTargetDropDownData: objContext.state.strGateKeeperTargetTypeId,
                    vTargetType: objContext.state.strGateKeeperTargetType,
                    arrLanguageData: objContext.props.Object_Cockpit_Language["Data"]
                },
                Meta: {
                    PopupName: "AddEditApplicationServer",
                    HeaderData: AddEditApplicationServer_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
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
    * @summary Call Confirmation pop-up for Deleting Competency level
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ApplicationServer", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["ApplicationServerGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vServerName"] + ", ";
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
                    ConfirmEvent: (strPopupId) => this.DeleteApplicationServer(arrSelectedRows, strPopupId, objContext)
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
* @name DeleteApplicationServer
* @param {array} arrSelectedRows selected row from the display grid
* @param {object} objModal objModal
* @summary Deletes Subject and close pop-up on success
*/
    DeleteApplicationServer(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Setting_ApplicationServer.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            //objContext.ApplicationServer_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, "Delete")
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ApplicationServerGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }


    /**
   * @name OnGateKeeperTargetTypeDropDownChange
   * @param {*} objContext objChangeData
   * @param {*} objChangeData objChangeData
   * @summary   To change the subject Dropdown Data on change of the subject dropdown value
   */
    OnGateKeeperTargetTypeDropDownChange(objContext, objChangeData) {
        if (objChangeData["uTargetTypeId"] != -1) {
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ApplicationServerGrid": null });
            objContext.dispatch({ type: "SET_STATE", payload: { "strGateKeeperTargetTypeId": objChangeData["uTargetTypeId"], "strGateKeeperTargetType": objChangeData["vTargetGroupIdentifier"] } });
        }
    };

    /**
* @name GetSearchFilters
* @param {any} objContext
* @summary Return Grid data
* @returns {object} Grid data
*/
    GetSearchFilters(objSearchFilters) {
        var arrFilters = [];
        if (objSearchFilters["uTargetTypeId"] && objSearchFilters["uTargetTypeId"] !== -1) {
            arrFilters = [...arrFilters, {
                match: {
                    uTargetTypeId: objSearchFilters["uTargetTypeId"]
                }
            }];
        }
        return arrFilters;
    }

    /**
  * @name GetDependingColumnData
  * @param {*} objContext objContext
  * @summary Return depending column Dropdown data
  * @returns {obj} depending column object
  */
    GetDependingColumnData(objContext) {

        let objGateKeeperTargetDropdownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "uTargetTypeId",
            "DisplayColumn": "vTargetTypeName",
            "DependingTableName": "t_Framework_Gatekeeper_TargetType_Data",
            "Data": []
        };
        objContext.props.Object_Intranet_Setting_GateKeeperTargetType ? objContext.props.Object_Intranet_Setting_GateKeeperTargetType["Data"] ? objContext.props.Object_Intranet_Setting_GateKeeperTargetType["Data"].map((objGetKeeperTarget) => {
            objGateKeeperTargetDropdownData["Data"] = [...objGateKeeperTargetDropdownData["Data"], objGetKeeperTarget];
        }):"":"";
        return { "uTargetTypeId": objGateKeeperTargetDropdownData };
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
            "AddPopup": () => objContext.ApplicationServer_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.ApplicationServer_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.ApplicationServer_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", ApplicationServer_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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

export default ApplicationServer_ModuleProcessor;