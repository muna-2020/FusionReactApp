//Helper components.
import * as Tab_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Tab_Sample/Tab_Sample_Data';

/**
* @name Tab_Sample_ModuleProcessor
* @summary Class for Tab_Sample module display.
*/
class Tab_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: Tab_Sample_Data.GetData()
            };
        };
    }    

    /**
    * @name OnTabClick
    * @param {object} objItem Item
    * @summary Executes when Tab is selected
    */
    OnTabClick(objItem) {
        console.log("Selected item ", objItem);
    }
    /**
    * @name GetCallBacks
    * @param {object} objContext Context object
    * @summary Returns object that contains all the CallBack methods.
    * @return {object} objCallBasics
    */
    GetEvents() {
        return {
            OnTabClick: this.OnTabClick
        };
    }
}

export default Tab_Sample_ModuleProcessor;