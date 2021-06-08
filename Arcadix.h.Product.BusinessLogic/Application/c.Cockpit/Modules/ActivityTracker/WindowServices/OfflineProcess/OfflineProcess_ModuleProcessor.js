//Objects required for module.
import Object_Cockpit_ActivityTracker_WindowServices_OfflineProcess_Module from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcess_Module';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Intranet_Setting_GateKeeperTargetType from '@shared/Object/c.Intranet/8_Setting/GateKeeperTargetType/GateKeeperTargetType';

//Module related imports.
import * as OfflineProcess_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcess_OfficeRibbon';
import * as OfflineProcess_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcess_MetaData';

/**
* @name OfflineProcess_ModuleProcessor
* @param NA
* @summary Class for ApplicationServer module display.
* @return NA
*/
class OfflineProcess_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Setting_GateKeeperTargetType",
            "Object_Cockpit_MainClient_MainClient",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess"
            
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

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        // GateKeeperTargetType
        Object_Intranet_Setting_GateKeeperTargetType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_GateKeeperTargetType];


        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetOfflineProgressData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetOfflineProgressData(objContext,objChangeData) {
        var arrFilters = [];
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objChangeData["uTargetTypeId"] != -1) {
            var arrSearchFilters = this.GetSearchFilters({ "uTargetTypeId": objChangeData["uTargetTypeId"] }, objContext);
            arrFilters = [...arrFilters, ...arrSearchFilters];
            arrFilters = [...arrFilters, {
                "match": {
                    "cIsDeleted": "N"
                }
            }];
            let objOfflineProgressParam = {
                "SearchQuery": {
                    ... {
                        "must": arrFilters
                    }
                },
                "TakeServerDetailsFromParams": true
            };
            Object_Cockpit_ActivityTracker_WindowServices_OfflineProcess_Module.GetOfflineProcess(objOfflineProgressParam, (objReturn) => {
                let arrOfflineProgress = objReturn ? objReturn["Data"] : [];
                objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineProgressData": arrOfflineProgress } });
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "OfflineProcessGrid": arrOfflineProgress[0] ? [arrOfflineProgress[0]] : [] });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineProgressData": [] } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }

    /**
     * @name GetSearchFilters
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetSearchFilters(objSearchFilters, objContext) {
        var arrFilters = [];
        if (objSearchFilters["uTargetTypeId"] && objSearchFilters["uTargetTypeId"] !== -1) {
            arrFilters = [...arrFilters, {
                match: {
                    uTargetTypeId: objSearchFilters["uTargetTypeId"]
                }
            }];
            arrFilters = [...arrFilters, {
                match: {
                    iMainClientId: objContext.state.strMainClientId
                }
            }];
        }
        return arrFilters;
    }

    /**
     * @name GetGridData
     * @param {object} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: objContext.state.arrOfflineProgressData ?? []
        };
        return objData;
    }

    /**
     * @name GetResourceData
     * @param {object} objContext
     * @summary Returns Resource Data for Grid
     * @returns {object} Resource Data
     */
    GetResourceData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess", objContext.props) ?? {};
        return {
            Text: objTextResource,
            SkinPath: objContext.props.JConfiguration.CockpitSkinPath
        };
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary Returns Meta Data for Grid
     * @returns {object} Meta Data
     */
    GetMetaData(objContext) {
        var objGridFilter = objContext.state.strMainClientId == -1 ? { "cIsDeleted": "N" } : { "cIsDeleted": "N", "iMainClientId": objContext.state.strMainClientId };
        return {
            ...OfflineProcess_MetaData.GetMetaData(),
            Filter: objGridFilter
        };
    }

    /**
     * @name OnGateKeeperTargetTypeDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the GateKeeper Dropdown Data on change of the GateKeeeper dropdown value
     */
    OnGateKeeperTargetTypeDropDownChange(objContext, objChangeData) {
        if (objChangeData["uTargetTypeId"] != -1) {
            this.GetOfflineProgressData(objContext, objChangeData);
            //ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "strGateKeeperTargetTypeId": objChangeData["uTargetTypeId"], "strGateKeeperTargetType": objChangeData["vTargetGroupIdentifier"] } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineProgressData": [] } });
        }
    };

    /**
     * @name OnMainClientDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the MainClient Dropdown Data on change of the MainClient dropdown value
     */
    OnMainClientDropDownChange(objContext, objChangeData) {
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strMainClientId": objChangeData["iMainClientId"],
                "strGateKeeperTargetTypeId": -1,
                "strGateKeeperTargetType": "",
                "strMainClientIdentifier": objChangeData["vMainClientIdentifier"]
            }
        });
    };

    /**
     * @name ShowActivityDetailsPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
      * @summary Call Confirmation pop-up for Deleting subject
     */
    ShowActivityDetailsPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["OfflineProcessGrid"];
        let blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        if (!blnShowErrorPopup) {
            Popup.ShowPopup({
                Data: {
                    ModuleName: "OfflineProcessPopup",
                    strHostName: arrSelectedRows[0]["vHostName"],
                    MainClientId: objContext.state.strMainClientId,
                    MainClientIdentifier: objContext.state.strMainClientIdentifier,
                   // MultiLanguageData: objContext.OfflineProcess_ModuleProcessor.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], 7),
                },
                Meta: {
                    PopupName: "OfflineProcessPopup",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: 700,
                    Width: 1200,
                    HeaderData: []
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                ParentProps: objContext.Props,
                Events: {},
                CallBacks: {}
            })
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
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "ShowActivityDetailsPopup": () => objContext.OfflineProcess_ModuleProcessor.ShowActivityDetailsPopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", OfflineProcess_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
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

export default OfflineProcess_ModuleProcessor;