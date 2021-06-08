/**
 *@name EvaluationButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class AdditionalInformation_ModuleProcessor {

    /**
     * @name StoreMapList
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "IsShowAdditionalInformation" }];
    }
}
export default AdditionalInformation_ModuleProcessor;

