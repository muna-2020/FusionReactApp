
/**
* @name Extranet_Teacher_ImportData
* @summary ImportData object
*/
var Extranet_Teacher_ImportData = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/Teacher/SaveTeacherDetailsFromExcel",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name SaveTeacherDetailsFromExcel
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Saves teacher's details in excel
    */
    SaveTeacherDetailsFromExcel: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom(Extranet_Teacher_ImportData.URL, "POST", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }    
};

export default Extranet_Teacher_ImportData;