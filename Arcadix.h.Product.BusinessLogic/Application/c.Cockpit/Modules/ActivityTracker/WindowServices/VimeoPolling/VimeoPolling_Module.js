var Object_Cockpit_ActivityTracker_WindowServices_VimeoPolling_Module = {

    /**
     * @name VimeoPolling
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for VimeoPolling
     */
    GetVimeoPolling: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/ActivityTracker/WindowServices/VimeoPolling/GetData", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },


};

export default Object_Cockpit_ActivityTracker_WindowServices_VimeoPolling_Module;
