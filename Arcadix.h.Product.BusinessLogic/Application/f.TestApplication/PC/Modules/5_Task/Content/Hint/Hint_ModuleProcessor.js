
/**
 *@name Hint_ModuleProcessor
 *@summary Re render if there is change in IsShowHint
 */
class Hint_ModuleProcessor {

    /**
     * @name StoreMapList
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "IsShowHint" }];
    }

    OnClickCloseHint() {
        ApplicationState.SetProperty('IsShowHint', false);
    }
}
export default Hint_ModuleProcessor;

