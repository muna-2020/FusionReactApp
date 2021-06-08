
/**
 * @name Extranet_Pupil_PupilLearningTest
 * @summary This object consists of sendemail method.
 */
var Extranet_Pupil_PupilLearningTest = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/Pupil/PupilLearningTest/PupilLearningTestStatistics_Module",

    /**
    * @name SendEmail
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary SendEmail to MainClient
    */
    PupilLearningTestStatistics: (objParams, fnCallback) => {
        let arrParams =
            [{
                "URL": Extranet_Pupil_PupilLearningTest.URL,
                "Params": objParams,
                "MethodType": "Get"
            }];
        ArcadixFetchData.Execute(arrParams, fnCallback);
    }
};

/**
* @summary Exports the object.
*/
export default Extranet_Pupil_PupilLearningTest;