//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Helper components.
import * as Dropdown_Disabled_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/Dropdown_Sample/Dropdown_Disabled_Sample/Dropdown_Disabled_Sample_Data';

/**
* @name Dropdown_Sample_ModuleProcessor
* @summary Class for ApplicationType module display.
*/
class Dropdown_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: Dropdown_Disabled_Sample_Data.GetData()
            };
        };
    }    
  
    /**
    * @name CheckDeletedDropDownData
    * @param {object} objItem object of the data of dropdown
    * @summary This function returns true or false based on some condition that is module dependent. If returns true, dropdown will display that object else it won't.
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
    * @param {object} objItem Item
    * @summary Executes when dropdown value is selected
    */
    OnChangeEventHandler(objItem) {
        console.log("Selected object ", objItem);
    }

    /**
    * @name GetEvents
    * @param {object} objContext Context object
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
    * @param {object} objContext Context object
    * @summary Returns object that contains all the CallBack methods.
    * @return {object} objCallBasics
    */
    GetCallbacks() {
        return {
            CheckDeletedDropDownData: this.CheckDeletedDropDownData
        };
    }
}

export default Dropdown_Sample_ModuleProcessor;