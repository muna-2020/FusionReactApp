/**
* @name ProductManagement_Master
* @summary Module object for PM master
*/
var ProductManagement_Master = {

    /**
    * @name ResetWorkflowStatus
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Reset WorkflowStatus
    */
    GetOfflineProgressDetails: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/ProductManagement/Master/GetOfflineProgressDetails", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }

};

export default ProductManagement_Master;