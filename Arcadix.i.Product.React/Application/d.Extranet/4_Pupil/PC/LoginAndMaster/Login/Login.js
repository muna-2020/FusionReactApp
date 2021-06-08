//React related imports
import React, { useReducer } from 'react';

//Base classes
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module realted fies.
import * as Login_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Login/Login_Hook';
import Login_ModuleProcessor from "@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Login/Login_ModuleProcessor";

//Controls
import Animation from '@root/Framework/Controls/Animation/Animation';

//Inline Images import
import imgExclamationMark from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Login/exclamation_mark.svg?inline';

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
            objContext.Login_ModuleProcessor.OnLoginClick(state.strUserName, state.strPassword, objContext);
        }
    }

    function GetContent() {
        let objTextResource = props.IsForServerRenderHtml ? props.LoginTextResources : LoginTextResources ?? {};
        return (
            <React.Fragment>
                <PerformanceProfiler ComponentName={"AnimationId"} JConfiguration={props.JConfiguration} >
                    <Animation
                        Resource={{ "ImagePath": props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/Clock.gif' }}
                        Meta={{ "ShowAnimationImage": true }}
                        Id="AnimationId"
                    />
                </PerformanceProfiler>
                <div className="lgnWrp pupil-login-page">
                    <div className="wrap-bg">
                        <div className="lgnHdr">

                            <img className="Img" src={props.JConfiguration ? props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/logo.svg" : ""} />
                        </div>
                        <div className={"lgnFm"}>
                            <div className="lform" >
                                <p className="heading">{objTextResource.SignUpHeader}</p>
                                <input
                                    id="txtUsername"
                                    className={state.blnLoginDataNotEntered || state.blnEmailNotEntered ? "txtIpt error-field" : "txtIpt"}
                                    type="text"
                                    placeholder="Benutzername"
                                    onChange={HandleChange}
                                />
                                <input
                                    id="txtPassword"
                                    className={state.blnLoginDataNotEntered || state.blnPasswordNotEntered ? "txtIpt error-field" : "txtIpt"}
                                    type="password"
                                    placeholder="Passwort"
                                    onChange={HandleChange}
                                    onKeyPress={HandleOnEnterKeyPress}
                                />
                                <button
                                    id="SubmitButton"
                                    className="mybtn"
                                    onClick={() => {
                                        //ApplicationState.SetProperty("blnShowAnimation", true);
                                        objContext.Login_ModuleProcessor.OnLoginClick(state.strUserName, state.strPassword, objContext);
                                    }}
                                >
                                    {objTextResource.Login}
                                </button>
                                {state.blnLoginFailed && !state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                    <img src={imgExclamationMark} />
                                    <p> {objTextResource.LoginFailed}</p>
                                </div>}

                                {state.blnEmailNotEntered && !state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                    <img src={imgExclamationMark} />
                                    <p>{objTextResource.EmailNotEntered}</p>
                                </div>}

                                {state.blnPasswordNotEntered && !state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                    <img src={imgExclamationMark} />
                                    <p>{objTextResource.PasswordNotEntered}</p>
                                </div>}

                                {state.blnLoginDataNotEntered && <div className="warningText  fontBold">
                                    <img src={imgExclamationMark} />
                                    <p>{objTextResource.FillAllFields}</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return GetContent()

};

export default Login;