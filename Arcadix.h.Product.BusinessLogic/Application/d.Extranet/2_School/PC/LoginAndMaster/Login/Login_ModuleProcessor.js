//Base classes.
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Objects required for module.
import Extranet_ExtranetLogin_Module from '@shared/Application/d.Extranet/5_Shared/PC/Modules/ExtranetLogin/ExtranetLogin';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//Global declaration of the base files.
global.ExtranetBase_ModuleProcessor = ExtranetBase_ModuleProcessor;

/**
 * @name Login_ModuleProcessor
 * @summary Class for Notes module display and manipulate.
 */
class Login_ModuleProcessor extends ExtranetBase_ModuleProcessor {

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

    /**
     * @name OnLoginClick
     * @param {any} strUserName strUserName
     * @param {any} strPassword strPassword
     * @summary The user is validated 
     */
    OnLoginClick(strUserName, strPassword, objContext) {
        if (strUserName == "" && strPassword !== "") {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnEmailNotEntered": true, "blnPasswordNotEntered": false, "blnLoginFailed": false, "blnLoginDataNotEntered": false, blnShowStellwerkValidationMsg: false } });
        }
        else if (strUserName !== "" && strPassword == "") {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnPasswordNotEntered": true, "blnEmailNotEntered": false, "blnLoginFailed": false, "blnLoginDataNotEntered": false, blnShowStellwerkValidationMsg: false } });
        }

        else if (strUserName !== "" && strPassword !== "") {

            //objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginDataNotEntered": false } });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnEmailNotEntered": false, "blnPasswordNotEntered": false, "blnLoginDataNotEntered": false } });


            var objLoginDataRequest = {
                Params: {
                    UserName: strUserName.trim(),
                    Password: strPassword.trim(),
                    Host: window.location.host + '/' + window.location.pathname.split('/')[1],
                    JConfiguration: JConfiguration
                }
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Extranet_ExtranetLogin_Module.ValidateUser(objLoginDataRequest, (objReturnData) => {
                if (objReturnData) {
                    if (objReturnData.login.Data.Success === true) {
                        let blnStellwerk = QueryString.GetQueryStringValue("Stellwerk") == 'Y';
                        let blnStellwerkUser = (objReturnData.login.Data["cIsStellwerk"] == "Y")
                        if (blnStellwerk == blnStellwerkUser) {
                            ApplicationState.SetProperty('ClientUserDetails', objReturnData.login.Data);
                            ApplicationState.SetProperty('FullServerRenderedModules', objReturnData["FullServerRenderedModules"] ?? []);
                            ClientUserDetails = objReturnData.login.Data;
                            ApplicationState.SetProperty('SelectedClassId', objReturnData.login.Data.SelectedClassId);
                            ApplicationState.SetProperty('LoggedIn', { 'IsLoggedIn': true, 'MasterHTML': objReturnData["ServerRenderHtml"] });
                            objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginFailed": false, blnShowStellwerkValidationMsg: false } });
                            if (ClientUserDetails.ApplicationTypeId == 1) {
                                let strSchoolId = ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["uSchoolId"];
                                GetStateIdBasedOnSchool(strSchoolId);
                            }
                        } else {
                            ApplicationState.SetProperty("blnShowAnimation", false);
                            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowStellwerkValidationMsg": true } });
                        }
                    } else {
                        ApplicationState.SetProperty("blnShowAnimation", false);
                        objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginFailed": true } });
                    }
                    // ApplicationState.SetProperty("blnShowAnimation", false);
                }
            });
        }
        else {
            //objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginDataNotEntered": true } });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnEmailNotEntered": true, "blnPasswordNotEntered": false, "blnLoginFailed": false, "blnLoginDataNotEntered": true, blnShowStellwerkValidationMsg: false } }); //when both userid and password are empty, then show email validation failed
        }
    }

    /**
     * @name SendLoginDetails
     * @param {any} strEmail strEmail
     * @summary Sending login details to the email
     * @returns {*} object
     */
    SendLoginDetails(objContext, strEmail) {
        var objLoginDataRequest = {
            Params: {
                vEmail: strEmail,
                uUserId: "00000000-0000-0000-0000-000000000000"
            }
        };
        //ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/SendExtranetLogin", "POST", objLoginDataRequest)
        Extranet_ExtranetLogin_Module.SendLoginDetails(objLoginDataRequest, (objReturnData) => {
            if (objReturnData.ForgotPassword) {
                objContext.dispatch({ type: 'SET_STATE', payload: { forgotPasswordEmailSatus: objReturnData.ForgotPassword } });
            }
        });
        //return objReturnData;
    }

    /**
     * @name SetToggle
     * @param {any} toggle toggle
     * @returns {*} not of toggle value
     */
    SetToggle(toggle) {
        return !toggle;
    }

    /**
     * @name HandleResetPassword
     * @param {any} objContext objContext
     * @summary Sets the blnResetForm 
     */
    HandleResetPassword(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnResetForm": true } });
    }

    /**
     * @name HandleBackButton
     * @param {any} objContext objContext
     * @summary Sets the blnResetForm and blnResetDiv
     */
    HandleBackButton(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnResetForm": false, "blnResetDiv": true, forgotPasswordEmailSatus: undefined } });
    }

    OpenSchoolRegistrationPopup() {
        Popup.ShowPopup({
            Data: {
                AuthenticateRequest: false
            },
            Meta: {
                PopupName: 'SchoolRegistration',
                ShowHeader: false,
                ShowCloseIcon: false,
                Width: '396px',
                Height: 'auto'
            },
            Resource: {
                Text: {},
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
        });
    }

    // /**
    //* @name GetDynamicStyles
    //* @param {object} props props
    //* @returns {object} DynamicStyles
    //*/
    // GetDynamicStyles(props) {
    //     let arrDynamicStyles = [
    //         props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/LoginAndMaster/Login.css",
    //         props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
    //         props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
    //     ];

    //     if (props.JConfiguration.Performance) {
    //         arrDynamicStyles = [...arrDynamicStyles, props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
    //     }
    //     return arrDynamicStyles;
    // }
}
export default Login_ModuleProcessor;