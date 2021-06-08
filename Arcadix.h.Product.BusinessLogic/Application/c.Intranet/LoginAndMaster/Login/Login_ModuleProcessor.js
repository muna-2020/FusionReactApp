//Base classes.
import * as IntranetBase_Form from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Form';
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Module related files.
import Login_Module from '@shared/Application/c.Intranet/LoginAndMaster/Login/Login_Module'

//Helper classes
import { ValidateClientSide, ValidateFocus } from '@root/Framework/Services/Validator/Validator';

/**
 * @name Login_ModuleProcessor
 * @summary Class for Login module display.
 */
class Login_ModuleProcessor extends IntranetBase_ModuleProcessor {

    constructor() {
        super();

    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        return [];
    }

    GetMetaData() {
        return [{ "vColumnName": "txtUsername", "IsMandatory": "Y" }, { "vColumnName": "txtPassword", "IsMandatory": "Y" }, { "vColumnName": "txtEmail", "IsMandatory": "N", "vValidationType": "email", "vValidationKey": "Email_Key" }];
    }

    ValidateOnBlur(objContext, strAttributeName) {
        if (objContext.state.blnLoginClicked) {
            const arrMeta = this.GetMetaData();
            let objTextResource = objContext.props.IsForServerRenderHtml ? objContext.props.LoginTextResources : LoginTextResources ?? {};
            let objNewValidationMessageJson = ValidateClientSide(arrMeta, objTextResource, objContext.state.objData, strAttributeName, false, "divValidationMessage");
            objNewValidationMessageJson = { ...objContext.state.objValidationMessageJson, [strAttributeName]: (objNewValidationMessageJson && objNewValidationMessageJson[strAttributeName] ? objNewValidationMessageJson[strAttributeName] : "") };
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessageJson": objNewValidationMessageJson } });
            //onBlur for client Dom
            let domClientDiv = document.querySelectorAll('#divRootClient #' + strAttributeName)[0];
            let domClientValidationDiv = document.querySelectorAll('#divRootClient #divValidationMessage')[0];
            if (objNewValidationMessageJson && objNewValidationMessageJson[strAttributeName]) {
                if (domClientDiv && domClientValidationDiv) {
                    domClientDiv.classList.add("error-field");
                    domClientValidationDiv.style.display = "block";
                }
            }
            else {
                if (domClientDiv && domClientValidationDiv) {
                    domClientDiv.classList.remove("error-field");
                    domClientValidationDiv.style.display = "none";
                }
            }
        }
    }


    ValidateOnFocus(objContext, strAttributeName) {
        //ValidateFocus("divValidationMessage", objContext.state.objValidationMessageJson, strAttributeName, "");
        //client div
        let domClientValidationDiv = document.querySelectorAll('#divRootClient #divValidationMessage')[0];
        let strValidationMessage = objContext.state.objValidationMessageJson && objContext.state.objValidationMessageJson[strAttributeName] ? objContext.state.objValidationMessageJson[strAttributeName] : "";
        if (domClientValidationDiv) {
            if (strValidationMessage != "")
                domClientValidationDiv.style.display = "block";
            else
                domClientValidationDiv.style.display = "none";
            domClientValidationDiv.innerHTML = "<span className='validationmessage'>" + strValidationMessage + "</span>"
        }
    }


    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext) {

        let objNewData = IntranetBase_Form.HandleChange(objContext, strAttributeName, strValue, "objData");
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name OnLoginClick
     * @param {objContext} Context object
     * @summary Invoked on login click button, Validates and set values if valid
     */
    OnLoginClick(objContext) {
        //const arrMeta = [{ "vColumnName": "txtUsername", "IsMandatory": "Y" }, { "vColumnName": "txtPassword", "IsMandatory": "Y" }];
        const arrMeta = this.GetMetaData();
        let objTextResource = objContext.props.IsForServerRenderHtml ? objContext.props.LoginTextResources : LoginTextResources ?? {};
        let objNewValidationMessageJson = ValidateClientSide(arrMeta, objTextResource, objContext.state.objData, "", true, "divValidationMessage");
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessageJson": objNewValidationMessageJson } });

        if (objNewValidationMessageJson == null) {
            var objParams = {
                UserName: objContext.state.objData["txtUsername"].trim(), Password: objContext.state.objData["txtPassword"].trim(), Host: window.location.host + '/' + window.location.pathname.split('/')[1],
                JConfiguration
            };
            Login_Module.ValidateUser(objParams, (objResponse) => {
                if (objResponse.login.Data.Success == true) {
                    ApplicationState.SetProperty('ClientUserDetails', objResponse.login.Data);
                    ApplicationState.SetProperty('FullServerRenderedModules', objResponse["FullServerRenderedModules"] ?? []);
                    ApplicationState.SetProperty('blnShowAnimation', false);
                    ApplicationState.SetProperty('strBarcodeImageUrl', objResponse.login.Data.BarcodeImageUrl);
                    ApplicationState.SetProperty('txtUsername', objResponse.login.Data.UserId);
                    ApplicationState.SetProperty('strUserValidated', true);
                    if (!objResponse.login.Data.IsTwoFactorAuthenticationRequired) {
                        ApplicationState.SetProperty('LoggedIn', { 'IsLoggedIn': true, 'MasterHTML': objResponse["ServerRenderHtml"] });
                    }
                } else {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginClicked": true } });
                    //alert("Invalid username or password");
                    let domClientValidationDiv = document.querySelectorAll('#divRootClient #divValidationMessage')[0];
                    if (domClientValidationDiv) {
                        domClientValidationDiv.style.display = "block";
                        domClientValidationDiv.innerHTML = "<span className='validationmessage'>" + "Invalid username or password" + "</span>"
                    }
                }
            })
        }
        else {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginClicked": true } });
            this.ClientValidate(arrMeta, objNewValidationMessageJson)
        }
    }

    ClientValidate(arrMeta, objValidationMessageJson) {
        arrMeta.map(objMetaData => {
            let domClientDiv = document.querySelectorAll('#divRootClient #' + objMetaData["vColumnName"])[0];
            if (objValidationMessageJson && objValidationMessageJson[objMetaData["vColumnName"]]) {
                if (domClientDiv)
                    domClientDiv.classList.add("error-field");
            }
            else {
                if (domClientDiv)
                    domClientDiv.classList.remove("error-field");
            }
        });

        //focus on first invalid element
        let strFirstInvalidElement = Object.keys(objValidationMessageJson)[0];
        let domClientFirstInvalidDiv = document.querySelectorAll('#divRootClient #' + strFirstInvalidElement)[0];
        if (domClientFirstInvalidDiv) {
            domClientFirstInvalidDiv.focus();
        }
        let domClientValidationDiv = document.querySelectorAll('#divRootClient #divValidationMessage')[0];
        if (domClientValidationDiv) {
            domClientValidationDiv.style.display = "block";
            domClientValidationDiv.innerHTML = "<span className='validationmessage'>" + objValidationMessageJson[strFirstInvalidElement] + "</span>"
        }
    }

    /**
     * @name OnTwoFactorAuthenticateClick
     * @param {objContext} Context object
     * @summary Invoked on login click button, Validates and set values if valid
     */
    OnTwoFactorAuthenticateClick(objContext) {
        if (objContext.state.objData.strAuthenticationCode != "") {
            var objParams = {
                UserId: objContext.state.txtPassword ? objContext.state.txtPassword : ApplicationState.GetProperty('txtUsername'),
                AuthenticationCode: objContext.state.objData.strAuthenticationCode,
            }
            Login_Module.TwoFactorAuthenticate(objParams, (objResponse) => {
                if (objResponse.TwoFactorAuthenticate.Data.isAuthenticated == true) {
                    ApplicationState.SetProperty('LoggedIn', { 'IsLoggedIn': true, 'MasterHTML': objResponse["ServerRenderHtml"] });
                    ApplicationState.SetProperty('blnShowAnimation', false);
                } else {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    alert("Invalid Authentication Code");
                }
            });
        }
    }

    ///**
    // * @name GetDynamicStyles
    // * @param {object} props props
    // * @returns {object} DynamicStyles
    // */
    //GetDynamicStyles(props) {
    //    return [
    //        props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Login.css",
    //        props.JConfiguration.IntranetSkinPath + "/Css/Common/ReactJs/PC/Font.css"
    //    ];
    //}
}

export default Login_ModuleProcessor;