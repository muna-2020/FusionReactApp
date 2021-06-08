//Objects required for module.
//import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';
import TaskPdf_Module from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskPdf/TaskPdf_Module';
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

/**
* @name TaskPdf_ModuleProcessor
* @summary Class for TaskExport module popup.
*/
class TaskPdf_ModuleProcessor extends IntranetBase_ModuleProcessor {
       
    /**
     * @name HandleChange
     * @param {object} objContext objContext
     * @param {object} objEvent objEvent
     * @summary Handles changes in the Execution Name input.
     */
    HandleChange(objContext, event) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "strExecutionName": event.target.value } });
    }
    
    /**
     * @name GenerateSingleTaskPdf
     * @param {object} props passes props
     * @summary Generates Single Task PDF.
     */
    GenerateSingleTaskPdf(objContext) {
        let objParams = {
            ...objContext.props,
            PageJson: objContext.props.Data.PageJson,
            TaskData: objContext.props.Data.SelectedRow,
            SelectedRow: objContext.props.Data.SelectedRow,
            ContentLanguageId: objContext.props.Data.ContentLanguageId,
            InterfaceLanguageId: JConfiguration.InterfaceLanguageId,
            ExecutionName: objContext.state.strExecutionName
        };
        objContext.dispatch({ type: 'SET_STATE', payload: {"strPerCentage": 10} });
        TaskPdf_Module.GenerateTaskPdf(objParams, (objResponse) => {
            objContext.dispatch({ type: 'SET_STATE', payload: { "strFilePath": objResponse.FilePath, "strPerCentage": 100, "strDisplayFileName": objResponse.DisplayFileName } });
        });

        //let objParams = {
        //    "SearchQuery": {
        //        "must": [
        //            {
        //                "match": {
        //                    "iPageId": objContext.props.Data.SelectedRow["iPageId"]
        //                }
        //            },
        //            {
        //                "match": {
        //                    "iLanguageId": JConfiguration.InterfaceLanguageId
        //                }
        //            }
        //        ]
        //    },
        //     "cIsForEditor": "Y"
        //}
        //Object_Editor_TaskContent_CMSPageContent.GetData(objParams, objResponse => {
        //    let objParams1 = {
        //        ...objContext.props,
        //        PageJson: objResponse[Object.keys(objResponse)[0]]["Data"][0],
        //        SelectedRow: objContext.props.Data.SelectedRow,
        //        TaskData: objContext.props.Data.SelectedRow
        //    };
        //    GenereateTaskPdf_Module.GenerateTaskPdf(objParams1, (objResponse) => {
        //        objContext.dispatch({ type: 'SET_STATE', payload: { "strFilePath": objResponse.FilePath, "strPerCentage": 100 } });
        //    });
        //});
    }

    /**
    * @name InsertOfflineExecutionDetails
    * @param {object} props passes props
    * @summary Insert offline Execution Details and Register SignalR event.
    */
    InsertOfflineExecutionDetails(objContext) {
        let strEventName = "GenerateTaskPdf" + "_" + Date.now() + "_" + objContext.props.ParentProps.ClientUserDetails.UserId;
        let objParams = {
            ["OfflineProcessParams"]: {
                JConfiguration: objContext.props.JConfiguration,
                SelectedRow: objContext.props.Data.SelectedRow,
                ContentLanguageId: objContext.props.Data.ContentLanguageId,
                vExecutionName: objContext.state.strExecutionName,
                Event: objContext.state.strExecutionName,                
            },
            ["OfflineProcessKeyWord"]: "GenerateTaskPdf"
        }
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.StartOfflineExecution(objParams, objContext, (objReturn) => {
            Popup.ClosePopup(objContext.props.Id);
        });
    }
}

export default TaskPdf_ModuleProcessor;