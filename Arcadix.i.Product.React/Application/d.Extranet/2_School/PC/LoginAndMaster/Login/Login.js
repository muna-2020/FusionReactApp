//React related imports
import React, { useReducer, useRef } from 'react';

//Base classes
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module realted fies.
import * as Login_Hook from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Login/Login_Hook';
import Login_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Login/Login_ModuleProcessor";


//Controls
import Popup from "@root/Framework/Blocks/Popup/Popup";

//global imports
global.ExtranetBase_Hook = ExtranetBase_Hook;

/**
 * @name Login
 * @param {any} props props
 * @summary Consists of E-mail id field and password field
 * @returns {object} React.Fragement that encapsulated div.
 */
const Login = (props) => {

    const emailRef = useRef(null)

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Login_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Login", dispatch, ["Login_ModuleProcessor"]: new Login_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Login_ModuleProcessor.Initialize(objContext, objContext.Login_ModuleProcessor);


    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Login_Hook, that contains all the custom hooks.
    * @returns null
    */
    Login_Hook.Initialize(objContext);


    /**
     * @name CheckEnteredValues
     * @summary Checks if the entered Email id and password is same.
     * */
    function CheckEnteredValues() {
        //var EmailInput = document.getElementById("EmailInput");
        var EmailInput = emailRef.current;
        if (EmailInput.value === "") {
            EmailInput.focus();
            objContext.dispatch({ type: "SET_STATE", payload: { "blnForgotPasswordEmailnotEntered": true } });
        }
        if (EmailInput.value.length > 0) {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnForgotPasswordEmailnotEntered": false } });
            objContext.Login_ModuleProcessor.SendLoginDetails(objContext, EmailInput.value);
        }
    }

    /**
     * @name HandleChange
     * @param {any} event event
     * @summary Checks if the 
     */
    function HandleChange(event) {
        if (event.target.id == "txtUsername")
            dispatch({ type: "SET_STATE", payload: { "strUserName": event.target.value } });

        else if (event.target.id == "txtPassword")
            dispatch({ type: "SET_STATE", payload: { "strPassword": event.target.value } });
    }

    function HandleOnEnterKeyPress(event) {
        //////if (event.keyCode  === 0) {
        //////    ApplicationState.SetProperty("blnShowAnimation", true);
        //////    objContext.Login_ModuleProcessor.OnLoginClick(state.strUserName, state.strPassword);
        //////}
    }

    function GetContent() {
        let objTextResource = props.IsForServerRenderHtml ? props.LoginTextResources : LoginTextResources ?? {};
        return (
            <React.Fragment>
               <div className="lgnWrp">
                    <Popup Id="PopupId"
                        Meta={{ GroupName: "Popup" }}
                        Resource={{ SkinPath: JConfiguration.ExtranetSkinPath }}
                        ParentProps={props}
                    />
                    <div className="wrap-bg">
                        <div className="lgnHdr">
                            <img className="Img" src={props.JConfiguration ? props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/logo.svg" : ""} />
                        </div>
                        <div className={state.blnResetForm === true ? "lgnFm Hide" : "lgnFm"}>
                            <div className="lform">
                                <input
                                    //className={'txtIpt {state.blnLoginDataNotEntered ? "error-field" : null}'}
                                    className={state.blnLoginDataNotEntered || state.blnEmailNotEntered ? "txtIpt error-field" : "txtIpt"}
                                    id="txtUsername"
                                    type="text"
                                    placeholder="E-Mail"
                                    onChange={HandleChange} />
                                <input
                                    id="txtPassword"
                                    //className={'txtIpt {state.blnLoginDataNotEntered ? "error-field" : null}'}
                                    className={state.blnLoginDataNotEntered || state.blnPasswordNotEntered ? "txtIpt error-field" : "txtIpt"}
                                    type="password"
                                    placeholder="Passwort"
                                    onChange={HandleChange}
                                    onKeyPress={HandleOnEnterKeyPress}
                                />
                                <button className="mybtn" onClick={() => {
                                    //ApplicationState.SetProperty("blnShowAnimation", true);
                                    objContext.Login_ModuleProcessor.OnLoginClick(state.strUserName, state.strPassword, objContext);
                                }}
                                >
                                    {objTextResource.Login}
                        </button>

                                {state.blnPasswordNotEntered && <div className="warningText  fontBold">
                                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                    <p>{objTextResource.PasswordNotEntered}</p>
                                </div>}

                                {state.blnEmailNotEntered && <div className="warningText  fontBold">
                                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                    <p>{objTextResource.EmailNotEntered}</p>
                                </div>}

                                <p className="loginTxt" onClick={() => objContext.Login_ModuleProcessor.HandleResetPassword(objContext)}>
                                    {objTextResource.ForgotPassword}
                            </p>

                                <React.Fragment>
                                    {
                                        props.JConfiguration.ApplicationTypeId === "6" ?
                                            <React.Fragment>
                                                <p className="loginTxt fontBold" onClick={() => {
                                                    objContext.Login_ModuleProcessor.OpenSchoolRegistrationPopup();
                                                }}
                                                >
                                                    <b>{objTextResource.ClickHereToRegister}</b>
                                                </p>
                                            </React.Fragment> :
                                            <React.Fragment />
                                    }
                                </React.Fragment>

                                {state.blnLoginFailed && <div className="warningText  fontBold">
                                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                    <p>{objTextResource.LoginFailed}</p>
                                </div>}
                                {state.blnShowStellwerkValidationMsg && <div className="warningText  fontBold">
                                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                    <p>{objTextResource.StellwerkLoginFailed}</p>
                                </div>}
                                {/*state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                            <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                            <p>Please enter login details</p>
                        </div>*/}

                            </div>
                        </div>

                        <div className={state.blnResetForm === true ? "lgnFm" : "lgnFm Hide"}>
                            <div className="lform">
                                {
                                    state.forgotPasswordEmailSatus != undefined ?
                                        <React.Fragment>
                                            <span className="warning-text">{state.forgotPasswordEmailSatus}</span>
                                            <span className="back-button yellow-button" onClick={() => objContext.Login_ModuleProcessor.HandleBackButton(objContext)}>
                                                Zurück zum Login
                                        </span>
                                        </React.Fragment>
                                        : <React.Fragment>
                                            <div className={state.blnResetDiv === false ? "resetDiv hide" : "resetDiv show"}>
                                                <input
                                                    className={state.blnForgotPasswordEmailnotEntered ? "txtIpt error-field" : "txtIpt"}
                                                    type="text"
                                                    placeholder="E-Mail"
                                                    id="EmailInput"
                                                    ref={emailRef}
                                                />
                                                <button className="mybtn" onClick={CheckEnteredValues}>Senden</button>
                                            </div>
                                            <div className={state.blnResetDiv === false ? "resetDiv" : "resetDiv hide"}>
                                                <span className="confirmation-message">
                                                    {objTextResource.EmailIdIsNotRegistered}  
                                            </span>
                                            </div>
                                            {state.blnForgotPasswordEmailnotEntered === false ? <React.Fragment /> : <div>
                                                <span className="confirmation-message">
                                                    <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                                    {objTextResource.PlaseEnterYourEmail}
                                            </span>
                                            </div>
                                            }
                                            <div className="back-btn-flex">
                                                <span className="back-button" onClick={() => objContext.Login_ModuleProcessor.HandleBackButton(objContext)}>
                                                    {objTextResource.BackToLogin}
                                            </span>
                                            </div>
                                        </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>

                </div >
            </React.Fragment>
        )
    }

    return GetContent()
};

Login.DynamicStyles = (props) => {
    let arrDynamicStyles = [
        JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/LoginAndMaster/Login.css",
        JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
        JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
    ];

    if (JConfiguration.Performance) {
        arrDynamicStyles = [...arrDynamicStyles, JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
    }
    return arrDynamicStyles;
};

export default Login;