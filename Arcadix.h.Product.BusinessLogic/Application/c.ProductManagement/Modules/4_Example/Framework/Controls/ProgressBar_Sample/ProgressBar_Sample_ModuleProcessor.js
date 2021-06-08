//Component Specific  imports
import * as ProgressBar_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/ProgressBar_Sample/ProgressBar_Sample_Data';

/**
* @name ProgressBar_Sample_ModuleProcessor
* @summary Class for ProgressBar_Sample module display.
*/
class ProgressBar_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: ProgressBar_Sample_Data.GetData()
            }
        };
    }
}

export default ProgressBar_Sample_ModuleProcessor;