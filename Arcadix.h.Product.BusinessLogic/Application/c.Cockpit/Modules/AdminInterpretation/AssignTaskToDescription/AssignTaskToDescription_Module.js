
var AssignTaskToDescription_Module = {

    /**
    * @name GetAssignTaskToTestData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for AssignTaskToTest
    */   
    GetAssignTaskToDescriptionData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/AssignTaskToDescription/GetTasksAndFolders", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }//,

    // /**
    //* @name GetAssignTaskToTestData
    //* @param {objParams} objParams Passes objParams
    //* @param {callback} fnCallback Callback function
    //* @summary Gets data for AssignTaskToTest
    //*/   
    //EditAssignTaskToTestData: (objParams, fnCallback) => {
    //    ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objParams, "Put", fnCallback);
    //}

};

export default AssignTaskToDescription_Module;
