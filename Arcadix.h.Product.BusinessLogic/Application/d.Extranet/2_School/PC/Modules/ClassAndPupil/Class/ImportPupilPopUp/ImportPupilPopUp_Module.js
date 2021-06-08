
/**
* @name Object_Extranet_Teacher_ImportData
* @summary Extranet_Pupil_ImportData object to save pupil data from execl to database
*/
var Extranet_Pupil_ImportData = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Pupil/Pupil/SavePupilDetailsFromExcel",

    /**
       * @name SavePupilDetailsFromExcel
       * @param {objParams} objParams Passes objParams
       * @param {callback} fnCallback Callback function
       * @summary Save pupil data from execl to database
       */
    SavePupilDetailsFromExcel: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom(Extranet_Pupil_ImportData.URL, "POST", objParams).then(response => response.json()).then(json => { fnCallback(json); });
        
    }    
};

export default Extranet_Pupil_ImportData;