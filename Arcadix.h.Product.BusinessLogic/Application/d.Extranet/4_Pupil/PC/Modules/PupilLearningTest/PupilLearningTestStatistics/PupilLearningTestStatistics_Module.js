import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Extranet_Pupil_PupilLearningTestStatistics_Module = {

    /**
     * @name URL
     * @summary Path to Server Side Pupil Document  object.
     */
    URL: "API/Extranet/Pupil/PupilLearningTestStatistics_Module",

    /**
     * @name InitialDataCallParam
     * @summary Holds the initial search params.
     */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {object} objParam passes objParam
    * @summary Initialize initial data call param and then adds the Extranet_Pupil_PupilLearningTestStatistics_Module object to store
    */
    Initialize: function (objParam) {
        Extranet_Pupil_PupilLearningTestStatistics_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Pupil_PupilLearningTestStatistics_Module", Extranet_Pupil_PupilLearningTestStatistics_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Pupil_PupilLearningTestStatistics_Module.URL,
            "Params": Extranet_Pupil_PupilLearningTestStatistics_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for Extranet_Pupil_PupilLearningTestStatistics_Module
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Pupil_PupilLearningTestStatistics_Module.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name GetLowStakeTestStatistics
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for Extranet_Pupil_PupilLearningTestStatistics_Module
    */
    GetLowStakeTestStatistics: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Pupil_PupilLearningTestStatistics_Module.URL + '/GetLowStakeTestStatistics',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }
};

export default Extranet_Pupil_PupilLearningTestStatistics_Module;