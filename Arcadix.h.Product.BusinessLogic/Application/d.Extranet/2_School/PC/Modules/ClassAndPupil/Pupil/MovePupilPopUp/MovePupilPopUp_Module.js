
/**
* @name Extranet_Pupil_MovePupil
* @summary MovePupipl object
*/
var Extranet_Pupil_MovePupil = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/Pupil_Module/MovePupil",

    /**
    * @name MovePupil
    * @param {objParams} objParams objPupilData
    * @param {*} fnCallback fnCallback
    * @summary Moves pupil data
    */
    MovePupil: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle(Extranet_Pupil_MovePupil.URL, objParams,null, fnCallback);
    },

    /**
     * @name MovePupil
     * @param {objext} strPupil strPupil
     * @param {objext} objPupilData objPupilData
     * @param {*} fnCallback fnCallback
     * @summary Edits the pupil data
     */
    EditData: (strPupil,objPupilData, fnCallback) => {
        ArcadixCacheData.EditData(strPupil, objPupilData, fnCallback);
    }
};

export default Extranet_Pupil_MovePupil;