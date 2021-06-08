//Objects required for module.
import Object_Cockpit_OnlineHelp from '@shared/Object/c.Cockpit/OnlineHelp/OnlineHelp';
//import Framework_Core_OnlineHelpView_Module from '@shared/Core/8_OnlineHelpView/OnlineHelpView/OnlineHelpView_Module';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name OnlineHelpView_ModuleProcessor
 * @summary Processor file for OnlineHelpView.
 */
class OnlineHelpView_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { StoreKey: "ApplicationState", DataKey: "HelpData" }
            //{ StoreKey: "ApplicationState", DataKey: "HelpGroup" },
            //{ StoreKey: "ApplicationState", DataKey: "HelpKey" },
        ];
    }

    /**
     * @name GetOnlineHelp
     * @param {object} objContext Context Object
     * @summary gets the PageId for the OnlineHelp
     */
    GetOnlineHelp(objContext) {
        let objParams = {
            ["HelpGroupName"]: objContext.props.HelpData.HelpGroup,
            ["HelpKeyName"]: objContext.props.HelpData.HelpKey,
            ["ApplicationTypeId"]: objContext.props.JConfiguration.ApplicationTypeId
        };
        Object_Cockpit_OnlineHelp.GetOnlineHelp(objParams, (objResponse) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "strPageId": objResponse.Data.PageId ? objResponse.Data.PageId : "NO_CONTENT", PageJson: objResponse.Data.PageJson } });
        });
    }

    /**
    * @name HandleOnClose
    * @param {object} objContext Context Object
    * @summary handles Close
    */
    HandleOnClose(objContext) {
        let objHelpData = ApplicationState.GetProperty("HelpData") ? ApplicationState.GetProperty("HelpData") : {};
        objHelpData = { ...objHelpData, "HelpAction": "Close" };        
        ApplicationState.SetProperty("HelpData", objHelpData);
        objContext.dispatch({ type: "SET_STATE", payload: { "strPageId": null, PageJson: null } });
        if (objContext.props.Events?.OnOnlineHelpClose) {
            objContext.props.Events.OnOnlineHelpClose();
        }
    }

    /**
    * @name PrintToPdf
    * @param {object} objContext Context Object
    * @summary handles Close
    */
    PrintToPdf(objContext) {
        if (objContext.state.strPageId != null && objContext.state.strPageId != "NO_CONTENT") {
            Popup.ShowPopup({
                Data: {
                    PageJson: objContext.state.PageJson,
                    DisplayFileName: objContext.props.HelpData.HelpGroup + "_" + objContext.props.HelpData.HelpKey
                },
                Meta: {
                    PopupName: 'GenerateOnlineHelpContentPdf',
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    Height: "auto",
                    Width: "400px"
                },
                Resource: {
                    Text: { "OkButtonText": "Ok", "MessageText": "Generating OnlineHelp Content Pdf" },
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: { ...objContext.props }
            });
        }

        //direct approach
        //let objParams = {
        //    ...objContext.props,
        //    "PageJson": objContext.state.PageJson,
        //    "FileName": "Sample" + "_" + Date.now()
        //};
        //ApplicationState.SetProperty("blnShowAnimation", true);
        //Framework_Core_OnlineHelpView_Module.GenerateOnlineHelpContentPdf(objParams, (objResponse) => {
        //    objContext.dispatch({ type: 'SET_STATE', payload: { "strFilePath": objResponse.FilePath, "strPerCentage": 100 } });
        //    console.log(objContext.state.refPrintToPdf);
        //    ApplicationState.SetProperty("blnShowAnimation", false);
        //    objContext.state.refPrintToPdf.current.href = JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objResponse.FileName + "&Type=" + "Offline/GenerateOnlineHelpContentPdf" + "&DisplayFileName=" + objContext.props.HelpData.HelpGroup +"_" + objContext.props.HelpData.HelpKey + ".pdf"; 
        //    objContext.state.refPrintToPdf.current.click();
        //    objContext.state.refPrintToPdf.current.href = null;
        //});    
    }
    
    /**
    * @name ContentPreview
    * @param {object} objContext Context Object
    * @summary Opens the OnlineHelp Content in a new window.
    */
    ContentPreview(objContext) {
        if (objContext.state.strPageId != null && objContext.state.strPageId != "NO_CONTENT") {
            let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + "TaskContentPreview?TaskId=" + objContext.state.strPageId + "&LanguageId=" + JConfiguration.InterfaceLanguageId + "&OnlineHelp=Y";
            window.open(vHostUrl, '_blank');
            this.HandleOnClose(objContext);
        }
    }
}

export default OnlineHelpView_ModuleProcessor;