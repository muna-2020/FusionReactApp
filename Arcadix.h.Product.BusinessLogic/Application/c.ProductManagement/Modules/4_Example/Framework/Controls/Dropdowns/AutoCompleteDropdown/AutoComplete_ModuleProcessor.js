import * as AutoComplete_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoComplete/AutoComplete_MetaData';
import * as AutoComplete_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoComplete/AutoComplete_Data';

/**
* @name AutoComplete_ModuleProcessor
* @summary Class for AutoComplete module display.
*/
class AutoComplete_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: AutoComplete_Data.GetData(),
                ["Meta"]: AutoComplete_MetaData.GetMetaData()
            }
        };
    }
}

export default AutoComplete_ModuleProcessor;