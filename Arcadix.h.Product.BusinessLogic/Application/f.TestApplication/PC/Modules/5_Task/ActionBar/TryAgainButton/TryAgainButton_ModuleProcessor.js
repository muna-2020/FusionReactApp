/**
 *@name EvaluationButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class TryAgainButton_ModuleProcessor {

   /**
    * @name StoreMapList
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            { StoreKey: "ApplicationState", DataKey: "ShowTryAgainButton" }
        ];
    }

    /**
     * @name TryAgainButtonClick
     * @param {object} objContext Context Object
     * @param {objContext} objParams Call params
     * @summary Updating Application State
     */
    async TryAgainButtonClick(objContext) {
        ApplicationState.SetProperty('iTaskStatusId', null);
        ApplicationState.SetProperty('IsShowAdditionalInformation', false);
        objContext.props.TaskLayoutRef.current.OnClickTryAgainTask();
    }
}

export default TryAgainButton_ModuleProcessor;

