import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import * as AutoComplete_Sample_MetaData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoComplete_Sample/AutoComplete_Sample_MetaData';
import * as AutoComplete_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoComplete_Sample/AutoComplete_Sample_Data';

/**
* @name AutoComplete_Sample_ModuleProcessor
* @summary Class for AutoComplete_Sample module display.
*/
class AutoComplete_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: AutoComplete_Sample_Data.GetData(),
                ["Meta"]: AutoComplete_Sample_MetaData.GetMetaData()
            }
        };
    }
}

export default AutoComplete_Sample_ModuleProcessor;