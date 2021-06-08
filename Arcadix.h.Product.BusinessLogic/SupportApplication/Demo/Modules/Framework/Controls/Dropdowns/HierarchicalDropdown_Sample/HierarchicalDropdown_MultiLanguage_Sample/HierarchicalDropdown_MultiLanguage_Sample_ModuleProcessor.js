import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import * as HierarchicalDropdown_MultiLanguage_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/HierarchicalDropdown_Sample/HierarchicalDropdown_MultiLanguage_Sample/HierarchicalDropdown_MultiLanguage_Sample_ResourceData';
import * as HierarchicalDropdown_MultiLanguage_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/HierarchicalDropdown_Sample/HierarchicalDropdown_MultiLanguage_Sample/HierarchicalDropdown_MultiLanguage_Sample_Data';

/**
* @name HierarchicalDropdown_MultiLanguage_Sample_ModuleProcessor
* @summary Class for ApplicationType module display.
*/
class HierarchicalDropdown_MultiLanguage_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: HierarchicalDropdown_MultiLanguage_Sample_Data.GetData(),
                ["Resource"]: HierarchicalDropdown_MultiLanguage_Sample_ResourceData.GetResourceData()
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

    /**
    * @name GetCallBacks
    * @summary Returns object that contains all the CallBack methods.
    * @return {object} objCallBasics
    * */
    GetCallBacks() {
        return {
            OnBeforeShowNode: (objNode) => {
                return { ...objNode, Icon: "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png" }
            }
        };
    }    


}

export default HierarchicalDropdown_MultiLanguage_Sample_ModuleProcessor;