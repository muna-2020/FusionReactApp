
var PupilLearningTestRoundCreation_Module = {

    /**
     * @name URL
     * @summary Path to Server Side Pupil Document  object.
     */
    URL: "API/Extranet/PupilLearningTest/PupilLearningTestRoundCreation_Module",

    /**
     * @name InitialDataCallParam
     * @summary Holds the initial search params.
     */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @summary Sets the InitialDataCallParam by Recieved Params and puts the object into store.
    * @param {any} objParam Param
    */
    Initialize: function (objParam) {
        PupilLearningTestRoundCreation_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("PupilLearningTestRoundCreation", PupilLearningTestRoundCreation_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": PupilLearningTestRoundCreation_Module.URL,
            "Params": PupilLearningTestRoundCreation_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name CreateTestRound
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary Creates the test round
    */
    CreateTestRound: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": PupilLearningTestRoundCreation_Module.URL,
                "Params": objParams,
                "MethodType": "Post"
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }
};

export default PupilLearningTestRoundCreation_Module;