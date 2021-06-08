//Objects required for module.
//import * as TabbedPopup_Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_MetaData';
//import * as TabbedPopup_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_ResourceData';
//import * as TabbedPopup_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_Data';

//Common helper file.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

//Module Objects
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

/**
* @name TabbedPopup_Sample_ModuleProcessor
* @param NA
* @summary Class for TaskQuestion module display.
* @return NA
*/
class TabbedPopup_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return (objStore) => {
            return {
               // ["Data"]: TabbedPopup_Sample_Data.GetData(),
               // ["Meta"]: TabbedPopup_Sample_MetaData.GetMetaData(),
               // ["Resource"]: TabbedPopup_Sample_ResourceData.GetResourceData()
            }
        };
    }

    /**
        * @name HandleChange
        * @param {string} strAttributeName consists of the vColumnName
        * @param {string} strValue consists of value of the input
        * @param {object} objContext takes objContext
        * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
        * @summary Handle change method to handle changes in the jsx elements
        */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit api after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }

    /**
 * @name SaveData
 * @param {object} objContext takes objContext
 * @param {boolean} blnClose sends true when SaveAndClosed is pressed
 * @summary hits the add/edit api after validation succeeds
 */
    SaveData(objContext) {
        //Validate method will validate the Data(if in metadata, we have provided "IsMandatory" as Y then if textbox is empty then this will give object with message)
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
            //If we have Text into Textbox then we have can have a logic for SaveButton
            alert("write logic on click of Save like : Api call to insert Data in table");
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
            //if we have empty textbox then we will be displaying Error message saying  "Field is Required"
        }
    }

    /**
   * @name Validate
   * @param {object} objContext takes objContext
   * @param {strColumnName} strColumnName strColumnName
   * @summary Validate
   * @returns {object} objNewValidationObject
   */
    Validate(objContext, strColumnName) {
        var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError", "", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStyles
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
        ];
    }
}

export default TabbedPopup_Sample_ModuleProcessor;