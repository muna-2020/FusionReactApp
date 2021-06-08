//Helper components.
import * as OfficeRibbon_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/OfficeRibbon_Sample/OfficeRibbon_Sample_Data';

/**
* @name OfficeRibbon_Sample_ModuleProcessor
* @summary Class for OfficeRibbon_Sample module display.
*/
class OfficeRibbon_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: OfficeRibbon_Sample_Data.GetData()
            };
        };
    }    
}

export default OfficeRibbon_Sample_ModuleProcessor;