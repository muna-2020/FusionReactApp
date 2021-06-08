/**
* @name Extranet_Teacher_TeacherLearningTest_Module
* @summary Teacher object
*/
var Extranet_Teacher_TeacherLearningTest_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/TeacherLearningTest_Module",

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
        return Extranet_Teacher_TeacherLearningTest_Module.DataCallParams;
    },

    /**
     * @name GetTestPreviewLink
     * @summary Gets the test preview link.
     * @param {any} objParam
     */
    GetTestPreviewLink: function (objParam) {
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_TeacherLearningTest_Module", Extranet_Teacher_TeacherLearningTest_Module);
        Extranet_Teacher_TeacherLearningTest_Module.DataCallParams = {
            "URL": Extranet_Teacher_TeacherLearningTest_Module.URL + "/GetTestPreviewLink",
            "Params": objParam,
            "UseFullName": true,
            "ActionType": "Replace"
        };
    }
};

export default Extranet_Teacher_TeacherLearningTest_Module;