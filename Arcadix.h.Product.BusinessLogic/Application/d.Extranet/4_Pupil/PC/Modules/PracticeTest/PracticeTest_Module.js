//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Extranet_Pupil_PracticeTest_Module
* @summary Teacher object
*/
var Extranet_Pupil_PracticeTest_Module = {

    /**
     * @name URL
     * @summary Path to Server Side Practice test  object.
     */
    URL: "API/Extranet/Pupil/PracticeTest_Module",

    /**
     * @name InitialDataCallParam
     * @summary Holds the initial search params.
     */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Teacher object to store
    */
    Initialize: function (objParam) {
        Extranet_Pupil_PracticeTest_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Pupil_PracticeTest_Module", Extranet_Pupil_PracticeTest_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Practice Test
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Pupil_PracticeTest_Module.URL,
            "Params": Extranet_Pupil_PracticeTest_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Teacher
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Pupil_PracticeTest_Module.URL, objParams, "Get", fnCallback);
    },


    /**
    * @name ResetResults
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Reset the results
    */
    ResetResults: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Extranet/Pupil/PracticeTest/ResetResults", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    },

    /**
    * @name StartTest
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary For start the test.
    */
    StartTest: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Extranet/Pupil/PracticeTest/StartTest", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Extranet_Pupil_PracticeTest_Module;