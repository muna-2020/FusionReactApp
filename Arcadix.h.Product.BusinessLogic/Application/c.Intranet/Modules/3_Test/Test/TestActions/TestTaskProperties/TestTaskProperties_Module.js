
var Intranet_Test_TestTaskProperties_Module = {

    /**
      * @name GetAssignTaskToTestData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for AssignTaskToTest
      */   
    GetAssignTaskToTestData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Test/TestTaskProperties", "Post", objParams).then(response => response.json()).then(json => {
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
        ArcadixFetchData.ExecuteCustom("API/Intranet/Test/TestTaskProperties", "Put", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        })
        //ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objParams, "Put", fnCallback);
    }

};

export default Intranet_Test_TestTaskProperties_Module;
