//Module specific imports
import * as AutoCompleteDropdown_MultiLanguage_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown_MultiLanguage/AutoCompleteDropdown_MultiLanguage_MetaData';
import * as AutoCompleteDropdown_MultiLanguage_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown_MultiLanguage/AutoCompleteDropdown_MultiLanguage_Data';
import * as AutoCompleteDropdown_MultiLanguage_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown_MultiLanguage/AutoCompleteDropdown_MultiLanguage_ResourceData';

/**
* @name AutoCompleteDropdown_MultiLanguage_ModuleProcessor
* @summary Class for AutoCompleteDropdown_MultiLanguage module display.
*/
class AutoCompleteDropdown_MultiLanguage_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: AutoCompleteDropdown_MultiLanguage_Data.GetData(),
                ["Meta"]: AutoCompleteDropdown_MultiLanguage_MetaData.GetMetaData(),
                ["Resource"]: AutoCompleteDropdown_MultiLanguage_ResourceData.GetResourceData()
            }
        };
    }
}

export default AutoCompleteDropdown_MultiLanguage_ModuleProcessor;