import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import * as MultiSelectDropdown_UnselectedOption_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropDown_UnselectedOption_Sample/MultiSelectDropDown_UnselectedOption_Sample_ResourceData';
import * as MultiSelectDropdown_UnselectedOption_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropDown_UnselectedOption_Sample/MultiSelectDropDown_UnselectedOption_Sample_Data';

/**
* @name MultiSelectDropdown_UnselectedOption_Sample_ModuleProcessor
* @summary Class for MultiSelectDropdown_UnselectedOption_Sample_ModuleProcessor module display.
*/
class MultiSelectDropdown_UnselectedOption_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: MultiSelectDropdown_UnselectedOption_Sample_Data.GetData(),
                ["Resource"]: MultiSelectDropdown_UnselectedOption_Sample_ResourceData.GetResourceData()
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
    * @param {array} arrItem arrItem
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

export default MultiSelectDropdown_UnselectedOption_Sample_ModuleProcessor;