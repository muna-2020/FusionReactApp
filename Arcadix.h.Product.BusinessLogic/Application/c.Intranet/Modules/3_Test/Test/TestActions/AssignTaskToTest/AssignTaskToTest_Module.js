
var Intranet_Test_AssignTaskToTest_Module = {

    /**
      * @name GetAssignTaskToTestData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for AssignTaskToTest
      */   
    GetAssignTaskToTestData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Test/AssignTaskToTest", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

     /**
      * @name GetAssignTaskToTestData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for AssignTaskToTest
      */   
    EditAssignTaskToTestData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objParams, "Put", fnCallback);
    }

};

export default Intranet_Test_AssignTaskToTest_Module;
