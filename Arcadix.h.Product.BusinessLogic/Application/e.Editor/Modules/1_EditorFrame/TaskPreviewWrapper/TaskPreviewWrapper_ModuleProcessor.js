//Objects required for module.
import Object_Intranet_Task_Task from '@shared/Object/c.Intranet/2_Task/Task/Task';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//Base classes/hooks.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
 *@name TaskPreviewWrapper_ModuleProcessor
 *@summary for event on click handling methods
 */
class TaskPreviewWrapper_ModuleProcessor extends Base_ModuleProcessor  {

    /**
     * @name StoreMapList
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Task_Task",
            "Object_Intranet_Taxonomy_Subject"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let objTaskParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iPageId": props.TestState.TaskPageProperties.PageJson.iPageId
                        }
                    }
                ]
            },
            "OutputColumns": [
                "iPageId",
                "iFolderId",
                "vPageName",
                "vPageDescription",
                "iTaskTypeId",
                "iTaskUsageId",
                "cIsAdaptiveTask",
                "iSubjectId",
                "iCategoryId",
                "iCategoryCompetencyId",
                "iCategoryCompetencyLevelId",
                "iCategoryCompetencyRangeId",
                "dPoints",
                "iEstimatedTimeToSolveSolveInSeconds",
                "t_TestDrive_Task_AssignedTaskDifficultyLevel",
                "cIsShortcut",
                "vCustomerTaskId",
                "iIntermediateId",
                "vSource",
                "cIsForInternalTesting",
                "uSkinId",
                "t_CMS_Page_Container",
                "t_CMS_Page_Language",
                "t_CMS_Page_AssignedWorkflowStatus",
                "t_CMS_Page_Data",
                "cIsDeleted",
                "uUserId",
                "uModifiedById",
                "dtCreatedOn",
                "dtModifiedOn",
                "cIsFusionVersion"
            ]
        };
        Object_Intranet_Task_Task.Initialize(objTaskParams);
        let arrDataRequest = [Object_Intranet_Task_Task];
        let objSubjectParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];
        return arrDataRequest;
    }
}
export default TaskPreviewWrapper_ModuleProcessor;