//Base classes.
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

/**
 * @name AddEditHighStakeAdaptiveTask_ModuleProcessor
 * @summary Class for Add/Edit Task module.
 */
class AddEditHighStakeAdaptiveTask_ModuleProcessor extends Base_AddEditTaskMaster_ModuleProcessor {

    /**
    * @name GetInitilaData 
    * @param {object} objContext takes objContext
    * @summary Creates Initial data - objAddData for the module
    */
    static GetInitialData(props) {
        let objAddData = {
            "uUserId": props.Data.ClientUserDetails.UserId,
            "iFolderId": props.Data.FolderId,
            "iTaskTypeId": 1,
            "iTaskUsageId": 3,
            "cIsAdaptiveTask": 'Y',
            "cIsForInternalTesting": props.Data.IsForInternalTesting ? "Y" : "N"
        }
        return objAddData;
    }  
}
export default AddEditHighStakeAdaptiveTask_ModuleProcessor;