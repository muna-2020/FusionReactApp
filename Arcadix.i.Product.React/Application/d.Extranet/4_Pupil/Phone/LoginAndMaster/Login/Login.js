//React related imports
import React, { useReducer } from 'react';

//Base classes
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module realted fies.
import * as Login_Hook from '@shared/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Login/Login_Hook';
import Login_ModuleProcessor from "@shared/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Login/Login_ModuleProcessor";

//Controls
import Animation from '@root/Framework/Controls/Animation/Animation';

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
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Login_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Login", ["Login_ModuleProcessor"]: new Login_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Login_ModuleProcessor.Initialize(objContext, objContext.Login_ModuleProcessor);

    /**
    * @name HandleChange
    * @param {any} event event
    * @summary Checks if the 
    */
    function HandleChange(event) {
        if (event.target.id == "txtUsername")
            dispatch({ type: "SET_STATE", payload: { "strUserName": event.target.value, "blnLoginFailed": false, "blnLoginDataNotEntered": false } });

        else if (event.target.id == "txtPassword")
            dispatch({ type: "SET_STATE", payload: { "strPassword": event.target.value, "blnLoginFailed": false, "blnLoginDataNotEntered": false } });
    }

    function HandleOnEnterKeyPress(event) {
        if (event.keyCode === 0) {
            //ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.Login_ModuleProcessor.OnLoginClick(state.strUserName, state.strPassword);
        }
    }

    return (
        <React.Fragment>
            <PerformanceProfiler ComponentName={"AnimationId"} JConfiguration={props.JConfiguration} >
                <Animation
                    Resource={{ "ImagePath": props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/Clock.gif' }}
                    Meta={{ "ShowAnimationImage": true }}
                    Id="AnimationId"
                />
            </PerformanceProfiler>
            <div className="login-wrap pupil-login-page">
                <div className="wrap-bg">
                    <div className="login-header">
                        <img className="Img" src={props.JConfiguration ? props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/logo.svg" : ""} />
                    </div>
                    <div className={"login-form"}>
                        <div className="lform" >
                            <p className="heading">Melde dich für den Arbeitsbereich an.</p>
                            <input
                                id="txtUsername"
                                className={state.blnLoginDataNotEntered || state.blnEmailNotEntered ? "text-input error-field" : "text-input"}
                                type="text"
                                placeholder="Benutzername"
                                onChange={HandleChange}
                            />
                            <input
                                id="txtPassword"
                                className={state.blnLoginDataNotEntered || state.blnPasswordNotEntered ? "text-input error-field" : "text-input"}
                                type="password"
                                placeholder="Passwort"
                                onChange={HandleChange}
                                onKeyPress={HandleOnEnterKeyPress}
                            />
                            <button
                                id="SubmitButton"
                                className="my-button"
                                onClick={() => {
                                    //ApplicationState.SetProperty("blnShowAnimation", true);
                                    objContext.Login_ModuleProcessor.OnLoginClick(state.strUserName, state.strPassword, objContext);
                                }}
                            >
                                Anmelden
                        </button>
                            {state.blnLoginFailed && !state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                <p>Das eingegebene Login ist falsch.</p>
                            </div>}

                            {state.blnEmailNotEntered && !state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                <p>Bitte geben Sie Ihre E-Mail ein.</p>
                            </div>}

                            {state.blnPasswordNotEntered && !state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                <p>Bitte geben Sie Ihr Passwort ein.</p>
                            </div>}

                            {state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/icons/exclamation_mark.svg"} />
                                <p>Bitte füllen Sie die fett markierten Felder aus.</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

//Login.DynamicStyles = (props) => {
//    return [
//        JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css",
//        JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/LoginAndMaster/Login.css"
//    ];
//};

export default Login;