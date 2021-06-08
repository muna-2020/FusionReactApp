
var Object_Cockpit_ActivityTracker_SchedulerServices_DataAudit_Module = {

    /**
    * @name GetDataAudit
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for GetDataAudit
    */
    GetDataAudit: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/ActivityTracker/SchedulerServices/DataAudit", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },


};

export default Object_Cockpit_ActivityTracker_SchedulerServices_DataAudit_Module;
