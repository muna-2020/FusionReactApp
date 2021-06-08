import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import * as MultiSelectDropdown_DefaultText_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropDown_DefaultText_Sample/MultiSelectDropdown_DefaultText_Sample_ResourceData';
import * as MultiSelectDropdown_DefaultText_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropDown_DefaultText_Sample/MultiSelectDropdown_DefaultText_Sample_Data';

/**
* @name MultiSelectDropDown_DefaultText_Sample__ModuleProcessor
* @summary Class for MultiSelectDropDown_DefaultText_Sample__ModuleProcessor module display.
*/
class MultiSelectDropDown_DefaultText_Sample__ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: MultiSelectDropdown_DefaultText_Sample_Data.GetData(),
                ["Resource"]: MultiSelectDropdown_DefaultText_Sample_ResourceData.GetResourceData()
            };
        };
    }

    /**
    * @name CheckDeletedDropDownData
    * @param {object} objItem Item
    * @summary returns true if the item has cIsDeleted as N
    * @returns {boolean} true/false
    */
    CheckDeletedDropDownData(objItem) { //this function returns true or false
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
    * @name OnChangeEventHandler
    * @param {array} objItem Item
    * @summary Executes when dropdown value is selected
    */
    OnChangeEventHandler(arrItem) {
        console.log("Selected object ", arrItem);
    }
    
    /**
    * @name GetEvents
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
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
    GetCallbacks() {
        return {
            CheckDeletedDropDownData: this.CheckDeletedDropDownData
        };
    }
}

export default MultiSelectDropDown_DefaultText_Sample__ModuleProcessor;