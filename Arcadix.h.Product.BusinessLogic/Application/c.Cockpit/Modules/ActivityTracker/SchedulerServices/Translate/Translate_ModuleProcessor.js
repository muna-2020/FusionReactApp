//Objects required for module.
import Object_Framework_SystemTracking from '@shared/Object/a.Framework/SystemTracking/SystemTracking';
import Object_Framework_SystemTracking_Translate from '@shared/Object/a.Framework/SystemTracking/Translate/Translate';

//Module related fies.
import * as Translate_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Translate/Translate_MetaData';

/**
 * @name Translate_ModuleProcessor
 * @param NA
 * @summary Class for ApplicationServer module display.
 * @return NA
 */
class Translate_ModuleProcessor extends IntranetBase_ModuleProcessor {
    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_SystemTracking_Translate", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Translate"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.GetDataAuditData(objContext);
    }

    /**
     * @name GetDataAuditData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetDataAuditData(objContext) {
        let objFileWatcherParam = {
            "vSchedulerName": "TranslateAll"
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking.GetSchedulerStatus(objFileWatcherParam, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSchedulerStatusData": objReturn } });
        });

        //let objDataAuditParam = {};
        //ApplicationState.SetProperty("blnShowAnimation", true);
        //Object_Cockpit_Translate.GetData(objDataAuditParam, (objReturn) => {
        //    let arrDataAudit = objReturn["Data"] ? objReturn["Data"] : [];
        //    objContext.dispatch({ type: "SET_STATE", payload: { "arrDataAuditData": arrDataAudit } });
        //    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        //    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "DataAuditGrid": arrDataAudit[0] ? [arrDataAudit[0]] : [] });
        //});
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        arrDataRequest = [...arrDataRequest, Object_Framework_SystemTracking_Translate];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Translate"];
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
            RowData: DataRef(objContext.props.Object_Framework_SystemTracking_Translate)["Data"] ?? [],
            AdditionalPaddingIds: ["Translate"]
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
            ...Translate_MetaData.GetMetaData()
        };
    }

    /**
     * @name GetResourceData
     * @param {object} objContext
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Translate", objContext.props) ?? {};
        let SkinPath = JConfiguration.CockpitSkinPath;
        return {
            Text,
            SkinPath
        };
    }

    /**
     * @name GetCallBacks
     * @param {object} objContext passes objContext
     * @summary Gets Callbacks for Grid.
     * @returns {object} return objDataCalls
     */
    GetCallBacks(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow)
        }
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {objRow} objRow passes objRow
     * @param {object} objContext passes objContext
     * @summary OnBeforeGridRowRender functionality.
     * @returns {object} return objDataCalls
     */
    OnBeforeGridRowRender(objRow) {
        return { ...objRow, "StartTime": objRow["dtStartTime"] ? Localization.DateTimeFormatter(objRow["dtStartTime"]) : "_", "EndTime": objRow["dtEndTime"] ? Localization.DateTimeFormatter(objRow["dtEndTime"]) : "_" };
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ];
    }
}

export default Translate_ModuleProcessor;