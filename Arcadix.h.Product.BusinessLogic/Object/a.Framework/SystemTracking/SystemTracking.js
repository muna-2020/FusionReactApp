//Helper classes.
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Framework_SystemTracking
* @summary SystemTracking object
*/
var Object_Framework_SystemTracking = {

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for SystemTracking(windowService Status and Scheduler Status)
     */
    GetServiceStatusData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Framework/SystemTracking/GetWindowServiceStatus", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for ArcadixAppPool
     */
    GetSchedulerStatus: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Framework/SystemTracking/GetSchedulerStatus", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }
};

export default Object_Framework_SystemTracking;
