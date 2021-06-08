
var Framework_FileUpload_Sample_OneDrive_Module = {

    /**
      * @name SaveFileToOneDrive
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Saves File To OneDrive
      */   
    SaveFileToOneDrive: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/ProductManagement/Modules/Example/SaveFileToOneDrive", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }
};

export default Framework_FileUpload_Sample_OneDrive_Module;