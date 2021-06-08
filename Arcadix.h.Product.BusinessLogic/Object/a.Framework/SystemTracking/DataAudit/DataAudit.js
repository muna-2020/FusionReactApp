//Common functionality imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_Framework_SystemTracking_DataAudit
 * @summary This front-end object consists of GetData method for DataAudit.
 */
var Object_Framework_SystemTracking_DataAudit = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/SystemTracking/DataAudit",

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for Audit
     */
    GetData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle(Object_Framework_SystemTracking_DataAudit.URL, objParams, "Get", fnCallback);
    }
}

export default Object_Framework_SystemTracking_DataAudit;