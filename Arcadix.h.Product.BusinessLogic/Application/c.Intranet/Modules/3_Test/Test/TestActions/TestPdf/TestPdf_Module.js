
var Intranet_Test_GenerateTestPdf_Module = {

    /**
      * @name GetAssignTaskToTestData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for AssignTaskToTest
      */   
    InsertOfflineExecutionDetails: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Test/GenerateTestPdf/InsertOfflineExecutionDetails", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
      * @name GenerateTaskPdfClick
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
    * @summary GenerateTaskPdf
      */
    GenerateTestPdf: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Test/GenerateTestPdf", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }

    // /**
    //  * @name GetAssignTaskToTestData
    //  * @param {objParams} objParams Passes objParams
    //  * @param {callback} fnCallback Callback function
    //  * @summary Gets data for AssignTaskToTest
    //  */   
    //EditAssignTaskToTestData: (objParams, fnCallback) => {
    //    ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objParams, "Put", fnCallback);
    //}

};

export default Intranet_Test_GenerateTestPdf_Module;
