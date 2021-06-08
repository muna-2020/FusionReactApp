
/**
* @name PropertyDisplay_ModuleProcessor
* @summary Class for Task module display.
*/
class PropertyDisplay_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" }
        ];
    }
}

export default PropertyDisplay_ModuleProcessor;