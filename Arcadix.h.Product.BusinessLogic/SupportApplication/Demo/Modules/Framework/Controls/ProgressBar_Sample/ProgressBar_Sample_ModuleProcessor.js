//Common imports
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Component Specific  imports
import * as ProgressBar_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/ProgressBar_Sample/ProgressBar_Sample_Data';

/**
* @name ProgressBar_Sample_ModuleProcessor
* @summary Class for ProgressBar_Sample module display.
*/
class ProgressBar_Sample_ModuleProcessor extends Base_ModuleProcessor {

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