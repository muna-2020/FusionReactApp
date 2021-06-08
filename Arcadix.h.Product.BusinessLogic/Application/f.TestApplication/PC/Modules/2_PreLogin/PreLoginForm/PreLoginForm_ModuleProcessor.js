//Validate Import
import * as Validator from "@root/Framework/Services/Validator/Validator";


/**
 * @name LoginForm_ModuleProcessor
 * @summary  LoginForm_ModuleProcessor validations
 */
class PreLoginForm_ModuleProcessor {

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multi language input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "PreLoginDetails", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "PreLoginDetails": objNewData } });
    }

    /**
     * @name GetMetaData
     * @summary For Validating
     */
    GetMetaData() {
        return [
            { "vColumnName": "Username", "IsMandatory": "Y", "vValidationType": "Email", "vValidationKey": "TestApplicationLoginControl_ErrorEmailInvalid" },
            { "vColumnName": "Password", "IsMandatory": "Y", "vValidationType": null, "vValidationKey": "TestApplicationLoginControl_ErrorPasswordRequired" },
        ];
    }

    /**
     * @name Validate
     * @param {object} objContext 
     * @summary Validate Client Details
     */
    Validate(objContext, blnFocus = false, strColumnName = "") {
        const arrMetaData = this.GetMetaData();
        let objPreLoginDetails = objContext.state ? objContext.state.PreLoginCredentials: objContext.props.Callbacks.GetPreLoginInfo();
        let objTextResource = Object_Framework_Services_TextResource.GetData("/f.TestApplication/Modules/2_PreLogin/PreLogin", objContext.props);
        let objValidationObject = Validator.ValidateClientSide(arrMetaData, objTextResource, objPreLoginDetails ? objPreLoginDetails : {}, strColumnName, blnFocus, "ErrorMessageBlock", "", false)
        if (objValidationObject && objValidationObject !== null) {
          objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
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
    OnBlurHandleChange(strColumnName, objContext) {
        this.Validate(objContext, false, strColumnName);
    }

    /**
     * @name OnFocusHandleChange
     * @param {object} objContext
     * @summary Removing Error Messages if passes correct data
     */
    OnFocusHandleChange(strColumnName, objContext) {
        Validator.ValidateFocus("ErrorMessageBlock",objContext.objValidationObject,strColumnName,"")
    }
}

export default PreLoginForm_ModuleProcessor;

