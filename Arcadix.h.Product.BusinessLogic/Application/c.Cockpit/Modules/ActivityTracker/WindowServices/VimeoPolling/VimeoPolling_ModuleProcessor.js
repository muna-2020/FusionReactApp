//Objects required for module.
import Object_Framework_SystemTracking from '@shared/Object/a.Framework/SystemTracking/SystemTracking';
import Object_Cockpit_ActivityTracker_WindowServices_VimeoPolling_Module from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling/VimeoPolling_Module';

//Module related imports.
import * as VimeoPolling_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling/VimeoPolling_MetaData';

/**
 * @name VimeoPolling_ModuleProcessor
 * @param NA
 * @summary Class for ApplicationServer module display.
 * @return NA
 */
class VimeoPolling_ModuleProcessor extends IntranetBase_ModuleProcessor {
    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.GetVimeoPollingData(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetVimeoPollingData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetVimeoPollingData(objContext) {
        var arrFilters = [];
        arrFilters = [...arrFilters, {
            "match": {
                uTargetTypeId: "FF1D7C1B-E3E5-49A8-BC42-A0564C9E276F"
            }
        }];
        arrFilters = [...arrFilters, {
            "match": {
                "cIsDeleted": "N"
            }
        }];
        let objVimeopollingServiceStatusParam = {
            "vServiceName": "VimeoPollingService"
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking.GetServiceStatusData(objVimeopollingServiceStatusParam, (objReturn) => {
            let arrVimeoPolling = objReturn ? objReturn["Data"] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrServerStatusData": arrVimeoPolling } });
            //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            // ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "FileWatcherGrid": arrVimeoPolling[0] ? [arrVimeoPolling[0]] : [] });
        });


        let objVimeoPollingParam = {
            ["ServerName"]: "ax-mgmtserver3"
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Cockpit_ActivityTracker_WindowServices_VimeoPolling_Module.GetVimeoPolling(objVimeoPollingParam, (objReturn) => {
            let arrVimeoPolling = objReturn["Data"] ? objReturn["Data"] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrVimeoPollingData": arrVimeoPolling } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "VimeoPollingGrid": arrVimeoPolling[0] ? [arrVimeoPolling[0]] : [] });

            let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
            ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, "VimeoPollingGrid": arrVimeoPolling != [] ? [0] : [] });
        });
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: objContext.state.arrVimeoPollingData ?? [],
            AdditionalPaddingIds: ["VimeoPolling"]
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling", objContext.props) ?? {};
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
        return { ...VimeoPolling_MetaData.GetMetaData() };
    }

    /**
     * @name GetCallBacks
     * @summary Returns GetCallBacks for Grid
     * @returns {object} GetCallBacks
     */
    GetCallBacks(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => objContext.VimeoPolling_ModuleProcessor.OnBeforeGridRowRender(objRow)
        }
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    OnBeforeGridRowRender(objRow) {
        let objFileDetails = JSON.parse(objRow["vElementJson"]);
        return { ...objRow, "vFileName": objFileDetails?.["vVideoFileName"] };
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ];
    }
}

export default VimeoPolling_ModuleProcessor;