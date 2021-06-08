//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Common helper file.
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";
import * as AddEditProductManagementModule_MetaData from "@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/AddEditProductManagementModule/AddEditProductManagementModule_MetaData";
import Object_ProductManagement_ProductManagementModule from '@shared/Object/c.ProductManagement/ProductManagementModule/ProductManagementModule';

/**
 * @name AddEditProductManagementModule_ModuleProcessor
 * @summary Class for Add/Edit ProductManagementModule.
 */
class AddEditProductManagementModule_ModuleProcessor extends Base_ModuleProcessor {

    /**
    * @name GetInitilaData 
    * @param {object} objContext takes objContext
    * @summary Creates Initial data - objAddData for the module
    */
    GetInitilaData(objContext) {
        let objAddData = {
            "uFolderId": objContext.props.Data.SelectedNode["uFolderId"],
            "uApplicationTypeId": ApplicationState.GetProperty("ActiveMainNavigationId")
        }
        return objAddData;
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
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit api after validation succeeds
     */
    SaveData(objContext, blnClose = false) {
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
            if (objContext.state.objData["uModuleId"] && objContext.state.objData["uModuleId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_ProductManagement_ProductManagementModule.EditData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId}, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_ProductManagement_ProductManagementModule.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId}, (objReturn, cIsNewData) => {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditProductManagementModule_MetaData.GetAddEditProductManagementModuleMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
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
}

export default AddEditProductManagementModule_ModuleProcessor;