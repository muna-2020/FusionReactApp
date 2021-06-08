//Helper classes.
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Framework_SystemTracking
* @summary SystemTracking object
*/
var Object_ProductManagement_SoftwareEngineerSupport_DevLinkRefresh = {

    /**
     * @name RefreshLink
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    RefreshLink: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/ProductManagement/SoftwareEngineerSupport/DevLinkRefresh/RefreshLink", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    } ,

    /**
     * @name GetServicesStatus
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    GetServicesStatus: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/ProductManagement/SoftwareEngineerSupport/DevLinkRefresh/GetServicesStatus", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    } 
};

export default Object_ProductManagement_SoftwareEngineerSupport_DevLinkRefresh;
