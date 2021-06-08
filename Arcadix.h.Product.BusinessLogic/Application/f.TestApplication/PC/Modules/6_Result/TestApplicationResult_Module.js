
/**
 * @name TestApplicationIntroduction_Module
 * @summary common data call methods for Introduction Page
 **/
var ResultPageText_Module = {

    URL: "API/TestApplication/TestApplicationResult/ResultExcel",


    /**
     * @name GetData
     * @summary ExecuteAPI method call is there which takes three Arguments URL, objNewParams and fnCallBack 
     * @returns {object} fnCallBack having TestState 
     */
    GetData: function (objContext, fnCallback) {
        Popup.ShowProgressBarPopup({
            "Data": {
                "ModuleName":"test-application-result-progress-bar"
            },
            "Meta": {
                "ShowProgressStatus": "N",
                "HasCloseButton": "Y",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": false,
                "ShowFileToDownload": "Y",
                Height: "auto",
                Width:"390px"
            },
            "Resource": {
                "Text": objContext.props.TestState.ResultPageProperties.TextResources,                 
                "TextResourcesKey": "ProgressBarPopup",
                "SkinPath": JConfiguration.IntranetSkinPath
            },
            "Events": {
                "StartProgress": (strProgressId) => {
                    let TestState = {...objContext.props.TestState, "ProgressId": strProgressId }
                    var objNewParams = {
                        "URL": "API/TestApplication/TestApplicationResult/ResultExcel",
                        "TestState": TestState
                    };
                        var objTestApplicationBase_ModuleProcessor = new TestApplicationBase_ModuleProcessor();
                        return objTestApplicationBase_ModuleProcessor.ExecuteAPI(ResultPageText_Module.URL, objNewParams, fnCallback); 
                }
            },
            "CallBacks": {}
        });
    }
};



export default ResultPageText_Module;