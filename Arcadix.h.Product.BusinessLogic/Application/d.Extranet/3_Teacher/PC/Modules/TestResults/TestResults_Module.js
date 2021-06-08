
/**
* @name Extranet_Teacher_TestResults_Module
* @summary Teacher object
*/
var Extranet_Teacher_TestResults_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/TestResults_Module",

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
        return Extranet_Teacher_TestResults_Module.DataCallParams;
    },

    /**
    * @name ResetResult
    * @param {object} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary resets the pupil result.
    */
    ResetResult: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_TestResults_Module.URL + '/ResetResult',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name ReCalculateTestResultForPupil
    * @param {object} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary Re caluculate pupil results.
    */
    ReCalculateTestResultForPupil: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_TestResults_Module.URL + '/ReCalculateTestResultForPupil',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name MoveResults
    * @param {object} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary Move results from one pupil to another.
    */
    MoveResults: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_TestResults_Module.URL + '/MoveResults',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name GetTestResultExcel
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets Test Result Excel
    */
    GetTestResultExcel: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_TestResults_Module.URL + '/GetTestResultExcel',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name GenerateDataExport
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets Test Result Excel
    */
    GenerateDataExport: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_TestResults_Module.URL + '/GenerateDataExport',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name CreateCompetencyPdf
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Generates the competency pdf.
    */
    CreateCompetencyPdf: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_TestResults_Module.URL + '/CreateCompetencyPdf',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name InsertLearningTestGenerationForLastRound
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Inserts the Executions to Generate LearningTests from service.
    */
    InsertLearningTestGenerationForLastRound: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_TestResults_Module.URL + '/InsertLearningTestGenerationForLastRound',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }


};

export default Extranet_Teacher_TestResults_Module;