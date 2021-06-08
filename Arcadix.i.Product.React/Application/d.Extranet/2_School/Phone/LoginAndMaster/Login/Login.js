//React related imports
import React, { useReducer } from 'react';

//Base classes
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module realted fies.
import * as Login_Hook from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Login/Login_Hook';
import Login_ModuleProcessor from "@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Login/Login_ModuleProcessor";

/**
 * @name Login
 * @param {any} props props
 * @summary Consists of E-mail id field and password field
 * @returns {object} React.Fragement that encapsulated div.
 */
const Login = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Login_Hook.GetInitialState());

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["Login_ModuleProcessor"]: new Login_ModuleProcessor() };

    /**
   * @name  InitializeDataForSSR
   * @param {object} objContext context object
   * @summary Initializing API and DynamicStyles
   * @returns Setting ApplicationState
   */
    objContext.Login_ModuleProcessor.Initialize(objContext, objContext.Login_ModuleProcessor);

    /**
     * @name CheckEnteredValues
     * @summary Checks if the entered Email id and password is same.
     * */
    function CheckEnteredValues() {
        var EmailInput = document.getElementById("EmailInput");
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

    return (
        <React.Fragment>
            <div className="login-wrap">
                <div className="wrap-bg">
                    <div className="login-header">
                        <img className="Img" src={props.JConfiguration ? props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/logo.svg" : ""} />
                    </div>

                    <div className="login-form">
                        <div className="lform">
                            <input
                                className="text-input"
                                id="txtUsername"
                                type="text"
                                placeholder="Benutzername"
                                onChange={HandleChange} />
                            <input
                                id="txtPassword"
                                className="text-input"
                                type="password"
                                placeholder="Passwort"
                                onChange={HandleChange}
                            />
                            <button className="my-button" onClick={() => {
                                //ApplicationState.SetProperty("blnShowAnimation", true);
                                objContext.Login_ModuleProcessor.OnLoginClick(state.strUserName, state.strPassword, objContext);
                            }}
                            >
                                Anmelden
                        </button>

                            <p className="login-text" onClick={() => objContext.Login_ModuleProcessor.HandleResetPassword(objContext)}>
                                Passwort vergessen
                        </p>

                            <React.Fragment>
                                {
                                    props.JConfiguration.ApplicationTypeId === "6" ?
                                        <React.Fragment>
                                            <p className="login-text fontBold" onClick={() => {
                                                objContext.Login_ModuleProcessor.OpenSchoolRegistrationPopup();
                                            }}
                                            >
                                                <b>Noch nicht registriert? Hier gehts zur Anmeldung.</b>
                                            </p>
                                        </React.Fragment> :
                                        <React.Fragment />
                                }
                            </React.Fragment>
                        </div>
                    </div>


                    <div className="reset-password-block" style={{ display: "none" }}>
                        <input
                            className="txtIpt"
                            type="text"
                            placeholder="E-Mail"
                            id="EmailInput"
                        />
                        <button className="mybtn" onClick={CheckEnteredValues}>Senden</button>

                        <span className="back-button" onClick={() => objContext.Login_ModuleProcessor.HandleBackButton(objContext)}>
                            Zurück zum Login
                        </span>
                    </div>

                    {/* Confirmation Message */}
                    <div className="confirmation-block" style={{ display: "none" }}>
                        <div className="reset-div">
                            <span className="confirmation-message">Diese E-Mail Adresse ist bei Lernlupe nicht registriert.</span>
                        </div>
                        <span className="back-button" onClick={
                            () => {
                                document.querySelector(".lform").style.display = "block";
                                document.querySelector(".confirmation-block").style.display = "none";
                            }
                        }>Zurück zum Login</span>
                    </div>

                </div>

            </div >
        </React.Fragment>
    );
};

Login.DynamicStyles = (props) => {
    return [
        //JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css",
        //JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/LoginAndMaster/Login.css",
        //JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
        //JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
    ];
};

export default Login;