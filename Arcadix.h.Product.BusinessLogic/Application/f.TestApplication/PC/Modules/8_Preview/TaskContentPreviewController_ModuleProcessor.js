//Base classes/hooks.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
 *@name EvaluationButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class TaskContentPreviewController_ModuleProcessor extends Base_ModuleProcessor  {

    /**
     * @name StoreMapList
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { StoreKey: "ApplicationState", DataKey: "TestState"}
        ];
    }   
}
export default TaskContentPreviewController_ModuleProcessor;

