//Validate Import
import * as Validator from "@root/Framework/Services/Validator/Validator";

//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

/**
 * @name LoginForm_ModuleProcessor
 * @summary  LoginForm_ModuleProcessor for validate Credentials Client Side
 */
class LoginForm_ModuleProcessor{

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     *@param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multi language input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "LoginDetails", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "LoginDetails": objNewData } });
    }

    /**
     * @name GetMetaData
     * @summary For Validating
     */
    GetMetaData() {
        return [
            { "vColumnName": "Username", "IsMandatory": "Y", "vValidationType": null, "vValidationKey": "Username_ValidationKey" },
            { "vColumnName": "Token1", "IsMandatory": "Y", "vValidationType": "number", "vValidationKey": "Token_ValidationKey" },
            { "vColumnName": "Token2", "IsMandatory": "Y", "vValidationType": "number", "vValidationKey": "Token_ValidationKey" },
            { "vColumnName": "Token3", "IsMandatory": "Y", "vValidationType": "number", "vValidationKey": "Token_ValidationKey" },
            { "vColumnName": "Token4", "IsMandatory": "Y", "vValidationType": "number", "vValidationKey": "Token_ValidationKey" }
        ];
    }

    /**
     * @name Validate
     * @param {object} objContext 
     * @summary Validate Client Details
     */
    Validate(objContext, blnFocus = false, strColumnName = "") {
        const arrMetaData = this.GetMetaData();
        let objLoginDetails = objContext.state ? objContext.state.LoginDetails : objContext.props.Callbacks.GetLoginInfo();
        let objTextResource = objContext.props.TextResources;
        let objValidationObject = Validator.ValidateClientSide(arrMetaData, objTextResource, objLoginDetails ? objLoginDetails : {}, strColumnName, blnFocus, "ErrorMessageBlock", "", false)
        if (objValidationObject && objValidationObject !== null) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        else {
            return null;
        }
    }

    /**
     * @name OnBlurHandleChange
     * @param {object} objContext
     * @summary On Blur Handle Validations
     */
    OnBlurHandleChange(strColumnName,objContext) {
        this.Validate(objContext, false, strColumnName);
    }

    /**
     * @name OnFocusHandleChange
     * @param {object} objContext
     * @summary Removing Error Messages if passes correct data
     */
    OnFocusHandleChange(strColumnName, objContext) {
        Validator.ValidateFocus("ErrorMessageBlock", objContext.objValidationObject, strColumnName, "")
    }
}
export default LoginForm_ModuleProcessor;

 