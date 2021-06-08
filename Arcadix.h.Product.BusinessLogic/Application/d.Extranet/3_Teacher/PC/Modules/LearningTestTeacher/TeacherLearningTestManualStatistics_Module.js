
/**
* @name Extranet_Teacher_TeacherLearningTestManualStatistics_Module
* @summary Teacher object
*/
var Extranet_Teacher_TeacherLearningTestManualStatistics_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/TeacherLearningTestManualStatistics_Module",

    /**
     * @summary Initializes Data
     */
    DataCallParams: null,

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     */
    GetInitialDataCall: function () {
        return Extranet_Teacher_TeacherLearningTestManualStatistics_Module.DataCallParams;
    },

    /**
     * @name GetLowStakeTestStatistics
     * @summary Gets the test preview link.
     * @param {any} objParam
     */
    GetLowStakeTestStatistics: function (objParam) {
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_TeacherLearningTestManualStatistics_Module", Extranet_Teacher_TeacherLearningTestManualStatistics_Module);
        Extranet_Teacher_TeacherLearningTestManualStatistics_Module.DataCallParams = {
            "URL": Extranet_Teacher_TeacherLearningTestManualStatistics_Module.URL + "/GetLowStakeTestStatistics",
            "Params": objParam,
            "UseFullName": true,
            "ActionType": "Replace"
        };
    },

    /**
     * @name GetLowStakeTestStatistics
     * @summary Gets the test preview link.
     * @param {any} objParam
     */
    GetLearningTestStatistics: function (objParam) {
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_TeacherLearningTestManualStatistics_Module", Extranet_Teacher_TeacherLearningTestManualStatistics_Module);
        Extranet_Teacher_TeacherLearningTestManualStatistics_Module.DataCallParams = {
            "URL": Extranet_Teacher_TeacherLearningTestManualStatistics_Module.URL + "/GetLearningTestStatistics",
            "Params": objParam,
            "UseFullName": true,
            "ActionType": "Replace"
        };
    }
};

export default Extranet_Teacher_TeacherLearningTestManualStatistics_Module;