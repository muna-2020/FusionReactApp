import * as HierarchicalDropdown_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample_ResourceData';
import * as HierarchicalDropdown_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample_Data';

/**
* @name HierarchicalDropdown_Sample_ModuleProcessor
* @summary Class for ApplicationType module display.
*/
class HierarchicalDropdown_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: HierarchicalDropdown_Sample_Data.GetData(),
                ["Resource"]: HierarchicalDropdown_Sample_ResourceData.GetResourceData()
            };
        };
    }

    /**
     * @name OnChangeEventHandler
     * @param {objItem} objItem objItem
     * @summary Onclicking the dropdown menu this function will be executed
     */
    OnChangeEventHandler(objItem) {
       console.log("Selected object ", objItem);
     }
    
    /**
     * @name GetEvents
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} objCallBasics
     * */
    GetEvents() {
        return {
            OnChangeEventHandler: this.OnChangeEventHandler
        };
    }    
}

export default HierarchicalDropdown_Sample_ModuleProcessor;