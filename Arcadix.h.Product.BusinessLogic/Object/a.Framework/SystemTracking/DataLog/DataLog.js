//Common functionality imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_Framework_SystemTracking_DataLog
 * @summary This front-end object consists of GetData method for DataLog.
 */
var Object_Framework_SystemTracking_DataLog = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/SystemTracking/DataLog",

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for Audit
     */
    GetData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle(Object_Framework_SystemTracking_DataLog.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name GetRedisData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for Logs and Exceptions from Redis
    */
    GetLogsAndExceptionFromRedisData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Framework/SystemTracking/DataLog/GetLogsAndExceptionFromRedisData", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json) });
    },

    /**
     * @name GetActivityData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for Activity
     */
    GetActivityData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Framework/SystemTracking/DataLog/GetActivityData", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json) });
    }
}

export default Object_Framework_SystemTracking_DataLog;