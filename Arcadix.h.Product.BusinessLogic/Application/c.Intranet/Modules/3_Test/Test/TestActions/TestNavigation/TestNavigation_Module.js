
var Intranet_Test_TestNavigation_Module = {

    /**
      * @name GetData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for AssignTaskToTest
      */   
    GetData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Test/TestNavigation", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

     /**
      * @name AssignTestNavigation
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for AssignTaskToTest
      */   
    AssignTestNavigation: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Test/TestNavigation/AssignTestNavigation", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }

};

export default Intranet_Test_TestNavigation_Module;
