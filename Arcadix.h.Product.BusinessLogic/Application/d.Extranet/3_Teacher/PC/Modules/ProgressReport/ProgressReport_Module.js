//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Extranet_Teacher_ProgressReport_Module
* @summary ProgressReport object
*/
var Extranet_Teacher_ProgressReport_Module = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/Teacher/ProgressReport_Module",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the ProgressReport object to store
    */
    Initialize: function (objParam) {
        Extranet_Teacher_ProgressReport_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_ProgressReport_Module", Extranet_Teacher_ProgressReport_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for ProgressReport
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Teacher_ProgressReport_Module.URL,
            "Params": Extranet_Teacher_ProgressReport_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ProgressReport
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Teacher_ProgressReport_Module.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name GenerateProgressReportExcel
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Generates the ProgressReport Excel
    */
    GenerateProgressReportExcel: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_ProgressReport_Module.URL + '/GenerateProgressReportExcel',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    GetLearningTestStatistics: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_ProgressReport_Module.URL + '/GetLearningTestStatistics',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }
};

export default Extranet_Teacher_ProgressReport_Module;