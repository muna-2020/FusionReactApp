//Component Specific  imports
import * as MultiLanguageInputs_Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/MultiLanguageControls/MultiLanguageInputs_Sample/MultiLanguageInputs_Sample_MetaData';
import * as MultiLanguageInputs_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/MultiLanguageControls/MultiLanguageInputs_Sample/MultiLanguageInputs_Sample_Data';

/**
* @name MultiLanguageInputs_Sample_ModuleProcessor
* @summary Class for MultiLanguageInputs_Sample module display.
*/
class MultiLanguageInputs_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Meta"]: MultiLanguageInputs_Sample_MetaData.GetMetaData(),
                ["Data"]: MultiLanguageInputs_Sample_Data.GetData(),
            }
        };
    }
}

export default MultiLanguageInputs_Sample_ModuleProcessor;