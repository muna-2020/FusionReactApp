//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';


/**
* @name OfficeRibbon_ComponentProcessor
* @summary Class for OfficeRibbon Component.
*/
class OfficeRibbon_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "OfficeRibbonData" }
        ];
    }
}


export default OfficeRibbon_ComponentProcessor;