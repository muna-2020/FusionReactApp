
var Intranet_Report_DataExport_Module = {

    /**
      * @name GetAssignTaskToTestData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for AssignTaskToTest
      */   
    InsertOfflineExecutionDetails: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Report/DataExport/InsertOfflineExecutionDetails", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }

};

export default Intranet_Report_DataExport_Module;
