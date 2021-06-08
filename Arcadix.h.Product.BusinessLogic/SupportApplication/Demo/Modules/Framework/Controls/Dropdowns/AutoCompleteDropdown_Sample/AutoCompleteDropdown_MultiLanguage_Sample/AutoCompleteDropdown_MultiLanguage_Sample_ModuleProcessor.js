//Base Class imports.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Module specific imports
import * as AutoCompleteDropdown_MultiLanguage_Sample_MetaData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoCompleteDropdown_Sample/AutoCompleteDropdown_MultiLanguage_Sample/AutoCompleteDropdown_MultiLanguage_Sample_MetaData';
import * as AutoCompleteDropdown_MultiLanguage_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoCompleteDropdown_Sample/AutoCompleteDropdown_MultiLanguage_Sample/AutoCompleteDropdown_MultiLanguage_Sample_Data';
import * as AutoCompleteDropdown_MultiLanguage_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoCompleteDropdown_Sample/AutoCompleteDropdown_MultiLanguage_Sample/AutoCompleteDropdown_MultiLanguage_Sample_ResourceData';

/**
* @name AutoCompleteDropdown_MultiLanguage_Sample_ModuleProcessor
* @summary Class for AutoCompleteDropdown_MultiLanguage_Sample module display.
*/
class AutoCompleteDropdown_MultiLanguage_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: AutoCompleteDropdown_MultiLanguage_Sample_Data.GetData(),
                ["Meta"]: AutoCompleteDropdown_MultiLanguage_Sample_MetaData.GetMetaData(),
                ["Resource"]: AutoCompleteDropdown_MultiLanguage_Sample_ResourceData.GetResourceData()
            }
        };
    }
}

export default AutoCompleteDropdown_MultiLanguage_Sample_ModuleProcessor;