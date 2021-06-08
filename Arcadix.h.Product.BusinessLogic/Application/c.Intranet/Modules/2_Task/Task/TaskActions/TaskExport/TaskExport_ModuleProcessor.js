//Objects required for module.
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

/**
* @name TaskExport_ModuleProcessor
* @summary Class for TaskExport module popup.
*/
class TaskExport_ModuleProcessor extends IntranetBase_ModuleProcessor {
    
    /**
     * @name HandleChange
     * @param {object} objContext objContext
     * @param {object} objEvent objEvent
     * @summary Handles changes in the Execution Name input.
     */
    HandleChange(objContext, objEvent) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "strExecutionName": event.target.value } });
    }

    /**
     * @name InsertOfflineExecutionDetails
     * @param {object} objContext objContext
     * @summary Insert Offline Execution Details and Register SignalR event.
     */
    InsertOfflineExecutionDetails(objContext) {
        let strEventName = "ExportAufgabeneigenschaften" + "_" + Localization.DateTimeFormatter(new Date()).replaceAll("/", ".").replaceAll(" ", "_").replaceAll(":", "_") + "_" + objContext.props.ParentProps.ClientUserDetails.UserId;
        let objParams = {
            ["OfflineProcessParams"]: {
                ["TaskFolderId"]: objContext.props.Data.FolderId,
                ["LanguageAndCountryInfo"]: {
                    ["LanguageCultureInfo"]: JConfiguration.LanguageCultureInfo,
                    ["LanguageId"]: JConfiguration.InterfaceLanguageId,
                    ["CountryCultureInfo"]: JConfiguration.CountryCultureInfo
                },
                ["vExecutionName"]: objContext.state.strExecutionName,
                ["Event"]: strEventName,
                //["UserId"]: objContext.props.ClientUserDetails.UserId
            },
            ["OfflineProcessKeyWord"]: "TaskExportAsExcel"
        }
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.StartOfflineExecution(objParams, objContext, (objReturn) => {
            Popup.ClosePopup(objContext.props.Id);
        });
    }
}

export default TaskExport_ModuleProcessor;