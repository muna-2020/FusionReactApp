//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Extranet_Teacher_PracticeTestDisplay_Module
* @summary Extranet_Teacher_PracticeTestDisplay_Module object
*/
var Extranet_Teacher_PracticeTestDisplay_Module = {

    /**
     * @name URL
     * @summary Path to Server Side Practice test display  object.
     */
    URL: "API/Extranet/Teacher/PracticeTestDisplay_Module",

    /**
     * @name InitialDataCallParam
     * @summary Holds the initial search params.
     */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Extranet_Teacher_PracticeTestDisplay_Module to store
    */
    Initialize: function (objParam) {
        Extranet_Teacher_PracticeTestDisplay_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_PracticeTestDisplay_Module", Extranet_Teacher_PracticeTestDisplay_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Practice Test
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Teacher_PracticeTestDisplay_Module.URL,
            "Params": Extranet_Teacher_PracticeTestDisplay_Module.InitialDataCallParam,
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
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Teacher_PracticeTestDisplay_Module.URL, objParams, "Get", fnCallback);
    }

};

export default Extranet_Teacher_PracticeTestDisplay_Module;