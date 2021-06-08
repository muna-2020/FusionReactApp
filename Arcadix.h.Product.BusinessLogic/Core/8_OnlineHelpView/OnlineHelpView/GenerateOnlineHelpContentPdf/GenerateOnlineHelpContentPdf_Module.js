
/**
* @name Framework_Core_OnlineHelpView_Module
* @summary Framework_Core_OnlineHelpView_Module object
*/
var Framework_Core_OnlineHelpView_Module = {

    /**
     * @name GenerateOnlineHelpContentPdf
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GenerateOnlineHelpContentPdf
     */
    GenerateOnlineHelpContentPdf: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Framework/Core/GenerateOnlineHelpContentPdf", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Framework_Core_OnlineHelpView_Module;