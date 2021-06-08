//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Helper components.
import * as ToolBar_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/ToolBar_Sample/ToolBar_Sample_Data';

/**
* @name ToolBar_Sample_ModuleProcessor
* @summary Class for ToolBar_Sample module display.
*/
class ToolBar_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: ToolBar_Sample_Data.GetData()
            };
        };
    }    
}

export default ToolBar_Sample_ModuleProcessor;