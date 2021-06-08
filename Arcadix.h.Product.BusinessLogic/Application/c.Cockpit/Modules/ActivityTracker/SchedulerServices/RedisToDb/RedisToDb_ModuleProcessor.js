//Objects required for module.
import Object_Framework_SystemTracking_DataLog from '@shared/Object/a.Framework/SystemTracking/DataLog/DataLog';
import Object_Framework_SystemTracking from '@shared/Object/a.Framework/SystemTracking/SystemTracking';

//Module related files...
import * as RedisToDb_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/RedisToDb/RedisToDb_MetaData';

/**
 * @name RedisToDb_ModuleProcessor
 * @param NA
 * @summary Class for ApplicationServer module display.
 * @return NA
 */
class RedisToDb_ModuleProcessor extends IntranetBase_ModuleProcessor {
    /**
      * @name StoreMapList   
      * @param NA
      * @summary Returns list of objects used in the module
      * @return {Array} Array of object list
      */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/SchedulerServices/RedisToDb"
        ];
    }

    /**
      * @name LoadInitialData
      * @param {object} objContext passes Context object
      * @summary Calls the Queue and Execute method
      */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.GetRedisToDbData(objContext);
    }

    /**
     * @name GetRedisToDbData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetRedisToDbData(objContext) {
        let objFileWatcherParam = {
            "vSchedulerName": "RedisToDb"
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking.GetSchedulerStatus(objFileWatcherParam, (objReturn) => {
            //let arrOfflineProgress = objReturn ? objReturn["Data"] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "objSchedulerStatusData": objReturn } });
        });
        let objRedisToDbParam = {};
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking_DataLog.GetActivityData(objRedisToDbParam, (objReturnData) => {
            let arrRedisToDb = objReturnData[Object.keys(objReturnData)[0]] ? objReturnData[Object.keys(objReturnData)[0]] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrRedisToDbData": arrRedisToDb } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "RedisToDbGrid": arrRedisToDb[0] ? [arrRedisToDb[0]] : [] });
            let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
            ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, "RedisToDbGrid": arrRedisToDb[0] ? [arrRedisToDb[0]] : [] });
        });
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
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/SchedulerServices/RedisToDb"];
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
            RowData: objContext.state.arrRedisToDbData ?? [],
            AdditionalPaddingIds: ["RedisToDb"]
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
            ...RedisToDb_MetaData.GetMetaData()
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/RedisToDb", objContext.props) ?? {};
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

export default RedisToDb_ModuleProcessor;