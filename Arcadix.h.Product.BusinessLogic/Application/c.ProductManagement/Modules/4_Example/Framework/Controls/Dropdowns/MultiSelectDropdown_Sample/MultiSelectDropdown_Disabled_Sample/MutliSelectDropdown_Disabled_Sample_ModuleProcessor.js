import * as MultiSelectDropdown_Disabled_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropdown_Disabled_Sample/MultiSelectDropdown_Disabled_Sample_ResourceData';
import * as MultiSelectDropdown_Disabled_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropdown_Disabled_Sample/MultiSelectDropdown_Disabled_Sample_Data';

/**
* @name MultiSelectDropDown_Disabled_Sample__ModuleProcessor
* @summary Class for MultiSelectDropDown_Disabled_Sample__ModuleProcessor module display.
*/
class MultiSelectDropDown_Disabled_Sample__ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: MultiSelectDropdown_Disabled_Sample_Data.GetData(),
                ["Resource"]: MultiSelectDropdown_Disabled_Sample_ResourceData.GetResourceData()
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

export default MultiSelectDropDown_Disabled_Sample__ModuleProcessor;