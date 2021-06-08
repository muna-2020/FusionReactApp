
/**
* @name Intranet_Task
* @summary Billing object
*/
var Intranet_Task = {

    /**
      * @name ResetWorkflowStatus
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
    * @summary Reset WorkflowStatus
      */
    ResetWorkflowStatus: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Task/ResetWorkflowStatus", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    },

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

export default Intranet_Task;