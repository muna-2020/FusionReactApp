﻿//Base classes.
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

/**
 * @name AddEditHighStakeSurveyTask_ModuleProcessor
 * @summary Class for Add/Edit Task module.
 */
class AddEditHighStakeSurveyTask_ModuleProcessor extends Base_AddEditTaskMaster_ModuleProcessor {

    /**
    * @name GetInitilaData 
    * @param {object} props takes props
    * @summary Creates Initial data - objAddData for the module
    */
    static GetInitialData(props) {
        let objAddData = {
            "uUserId": props.Data.ClientUserDetails.UserId,
            "iFolderId": props.Data.FolderId,
            "iTaskTypeId": 6,
            "iTaskUsageId": 3,
            "cIsAdaptiveTask": 'N',
            "cIsForInternalTesting": props.Data.IsForInternalTesting ? "Y" : "N"
        }
        return objAddData;
    }
}
export default AddEditHighStakeSurveyTask_ModuleProcessor;