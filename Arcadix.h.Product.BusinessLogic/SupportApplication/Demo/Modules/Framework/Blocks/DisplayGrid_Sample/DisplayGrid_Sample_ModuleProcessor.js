import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import * as DisplayGrid_Sample_MetaData from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Blocks/DisplayGrid_Sample/DisplayGrid_Sample_MetaData';
import * as DisplayGrid_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Blocks/DisplayGrid_Sample/DisplayGrid_Sample_ResourceData';
import * as DisplayGrid_Sample_Data from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Blocks/DisplayGrid_Sample/DisplayGrid_Sample_Data';

/**
* @name DisplayGrid_Sample_ModuleProcessor
* @summary Class for ApplicationType module display.
*/
class DisplayGrid_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: DisplayGrid_Sample_Data.GetData(),
                ["Meta"]: DisplayGrid_Sample_MetaData.GetMetaData(),
                ["Resource"]: DisplayGrid_Sample_ResourceData.GetResourceData()
            }
        };
    }

    /**
     * @name StoreMapList
     * @summary CallBack for on click row
     */
    OnClickRow(objSelectedRow, objContext) {
        //Just write your logic here for the seleceted row
    }

    /**
    * @name StoreMapList
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetCallBacks(objContext) {
        let objCallBacks = {
            OnClickRow: (objSelectedRow) => this.OnClickRow(objSelectedRow, objContext)
        };
        return objCallBacks;
    }
    
}

export default DisplayGrid_Sample_ModuleProcessor;