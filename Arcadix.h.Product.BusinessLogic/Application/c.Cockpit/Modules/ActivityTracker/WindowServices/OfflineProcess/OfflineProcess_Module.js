
var Object_Cockpit_ActivityTracker_WindowServices_OfflineProcess_Module = {

    /**
    * @name GetOfflineProcess
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for OfflineProcess
    */
    GetOfflineProcess: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/ActivityTracker/WindowServices/OfflineProcess/GetApplicationServerServiceStatus", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    
};

export default Object_Cockpit_ActivityTracker_WindowServices_OfflineProcess_Module;
