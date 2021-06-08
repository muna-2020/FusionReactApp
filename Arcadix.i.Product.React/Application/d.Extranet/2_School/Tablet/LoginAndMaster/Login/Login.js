import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useState, useEffect, useReducer, useLayoutEffect, useMutationEffect } from 'react';
import { OnLoginClick } from '@shared/Application/d.Extranet/2_School/LoginAndMaster/Login/LoginBusinessLogic';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

const Login = (props) => {
    const [strUserName, SetUserName] = useState("");
    const [strPassword, SetPassword] = useState("");
    const [blnShowAnimation, SetShowAnimation] = useState(false);
    const [resetForm, ShowResetForm] = useState(false);
    const [resetDiv, SetResetDiv] = useState(true);

    function HandleResetPassword() {
        ShowResetForm(true);
    }
    function HandleBackButton() {
        ShowResetForm(false);
        SetResetDiv(true)
    }
    const HandleChange = (e) => {

        var EmailInput = document.getElementById("EmailInput");
        if (EmailInput.value === "") {
            EmailInput.focus();
        };
        if (EmailInput.value.length > 0) {
            SetResetDiv(false)
        };
    };
    function changeValues(event) {
        if (event.target.id == "txtUsername")
            SetUserName(event.target.value)
        else if (event.target.id == "txtPassword")
            SetPassword(event.target.value)
    }
    return (
        <div className="lgnWrp">
            <div className="wrap-bg">

                <div className="lgnHdr">
                    <img className="Img" src={props.JConfiguration ? props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/logo.svg" : ""} />
                </div>


                <div className={resetForm === true ? "lgnFm Hide" : "lgnFm"}>
                    <div className="lform">
                        <input
                            id="txtUsername"
                            className="txtIpt"
                            type="text"
                            placeholder="Benutzername"
                            onChange={changeValues} />
                        <input
                            id="txtPassword"
                            className="txtIpt"
                            type="password"
                            placeholder="Passwort"
                            onChange={changeValues} />
                        <button
                            className="mybtn"
                            onClick={() => {
                                ApplicationState.SetProperty("blnShowAnimation", true);
                                OnLoginClick(strUserName, strPassword)
                            }}>Anmelden</button>

                        <p className="loginTxt" onClick={() => HandleResetPassword()}>Passwort vergessen</p>

                        <p className="loginTxt fontBold"><b>Noch nicht registriert? Hier gehts zur Anmeldung.</b></p>
                    </div>

                </div>

                <div className={resetForm === true ? "lgnFm" : "lgnFm Hide"}>
                    <div className="lform">

                        <div className={resetDiv === false ? "resetDiv hide" : "resetDiv show"}>
                            <input
                                className="txtIpt"
                                type="text"
                                placeholder="E-Mail"
                                id="EmailInput"
                            />
                            <button className="mybtn" onClick={HandleChange}>Senden</button>
                        </div>
                        <div className={resetDiv === false ? "resetDiv" : "resetDiv hide"}>
                            <span className="confirmation-message">Diese E-Mail Adresse ist bei Lernlupe nicht registriert.</span>
                        </div>
                        <span className="back-button" onClick={() => HandleBackButton()}>Zurück zum Login</span>

                    </div>

                </div>


            </div>
        </div >
    );
}

Login.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/LoginAndMaster/Login.css"
    ];
    return arrStyles;
}

export default Login;