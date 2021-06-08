
/**
* @name Intranet_Task_TaskActions_TaskPdf
* @summary Intranet_Task_TaskActions_TaskPdf object
*/
var Intranet_Task_TaskActions_TaskPdf = {

     /**
      * @name GenerateTaskPdfClick
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
    * @summary GenerateTaskPdf
      */
    GenerateTaskPdf: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Task/GenereateTaskPdf", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Intranet_Task_TaskActions_TaskPdf;