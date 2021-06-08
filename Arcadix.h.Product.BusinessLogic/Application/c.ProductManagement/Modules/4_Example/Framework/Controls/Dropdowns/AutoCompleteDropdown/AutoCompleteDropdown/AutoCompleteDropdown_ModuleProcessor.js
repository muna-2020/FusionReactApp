//Module specific imports.
import * as AutoCompleteDropdown_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown/AutoCompleteDropdown_MetaData';
import * as AutoCompleteDropdown_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown/AutoCompleteDropdown_Data';
import * as AutoCompleteDropdown_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown/AutoCompleteDropdown_ResourceData';

/**
* @name AutoCompleteDropdown_ModuleProcessor
* @summary Class for AutoCompleteDropdown module display.
*/
class AutoCompleteDropdown_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: AutoCompleteDropdown_Data.GetData(),
                ["Meta"]: AutoCompleteDropdown_MetaData.GetMetaData(),
                ["Resource"]: AutoCompleteDropdown_ResourceData.GetResourceData()
            }
        };
    }
}

export default AutoCompleteDropdown_ModuleProcessor;