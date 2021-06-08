// React related imports.
import React, { useReducer } from "react";

//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";

//Module related fies.
import Login_ModuleProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Login/Login_ModuleProcessor";
import * as Login_Hook from "@shared/Application/c.ProductManagement/LoginAndMaster/Login/Login_Hook";

//global imports
global.IntranetBase_Hook = IntranetBase_Hook;

/**
* @name Login
* @param {object} props props
* @summary This component displays the Login control.
* @returns {object} React.Fragement that encapsulated the login fields and system check.
*/
const Login = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Login_Hook.GetInitialState(props));


    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
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
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Login_Hook, that contains all the custom hooks.
    * @returns null
    */
    Login_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let objTextResource = objContext.props.IsForServerRenderHtml ? objContext.props.LoginTextResources : LoginTextResources ?? {};
        const jsxReturn =
            <div className="login-page-containter">
                <div className="login-page-header" />
                <div className="form-overlay">
                    <div className="form-center">
                        <div className="form-box">
                            <div style={{ display: (!state.strUserValidated ? "block" : "none") }}>
                                <div className="form-header">
                                    <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/log_in.png"} />
                                    <div className="titleOne"> {objTextResource["Login"]} </div>
                                </div>
                                <div className="content">
                                    <h3>{objTextResource["LoginInformation"]}</h3>
                                    <div id="divValidationMessage" className="validation-message" style={{ display: "none" }}></div>
                                    <div className="titleThree">{objTextResource["Email"]}</div>
                                    <input placeholder={objTextResource["Email"]} type="text" className="loginIn" id="txtUsername" onChange={(e) => { objContext.Login_ModuleProcessor.HandleChange("txtUsername", e.target.value, objContext, ""); }}
                                        onBlur={(e) => { objContext.Login_ModuleProcessor.ValidateOnBlur(objContext, "txtUsername"); }}
                                        onFocus={(e) => { objContext.Login_ModuleProcessor.ValidateOnFocus(objContext, "txtUsername"); }}
                                    />
                                    <div className="label">{objTextResource["Password"]}
                                    </div>
                                    <input placeholder={objTextResource["Password"]} type="password" className="loginIn" id="txtPassword" onChange={(e) => { objContext.Login_ModuleProcessor.HandleChange("txtPassword", e.target.value, objContext, ""); }}
                                        onBlur={(e) => { objContext.Login_ModuleProcessor.ValidateOnBlur(objContext, "txtPassword"); }}
                                        onFocus={(e) => { objContext.Login_ModuleProcessor.ValidateOnFocus(objContext, "txtPassword"); }}
                                    />
                                    <div className="button-right">
                                        <button onClick={() => {
                                            ApplicationState.SetProperty("blnShowAnimation", true);
                                            objContext.Login_ModuleProcessor.OnLoginClick(objContext, "txtEmail");
                                        }}
                                            className="login-button">{objTextResource["Submit"]}</button>
                                    </div>

                                    <div className="email-block">
                                        <h3>{objTextResource["Email"]}</h3>
                                        <input type="text" id="txtEmail" placeholder={objTextResource["Email"]}
                                            onChange={(e) => {
                                                objContext.Login_ModuleProcessor.HandleChange("txtEmail", e.target.value, objContext, "");
                                            }}
                                            onBlur={(e) => { objContext.Login_ModuleProcessor.ValidateOnBlur(objContext); }}
                                            onFocus={(e) => { objContext.Login_ModuleProcessor.ValidateOnFocus(objContext, "txtEmail"); }}
                                        />
                                        <div className="button-right">
                                            <button className="login-button">{objTextResource["Submit"]}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{ display: (state.strUserValidated ? "block" : "none") }}>
                                <div>
                                    <img src={objContext.state.strBarcodeImageUrl} />
                                </div>
                                <div className="content">
                                    <h3>{objTextResource["BarCodeText"]}</h3>
                                    <input className="loginIn" onChange={(e) => { objContext.Login_ModuleProcessor.HandleChange("strAuthenticationCode", e.target.value, objContext, ""); }}></input>
                                    <div className="button-right">
                                        <button onClick={() => {
                                            objContext.Login_ModuleProcessor.OnTwoFactorAuthenticateClick(objContext);
                                        }} className="login-button">Authenticate</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="copy-right">
                            <a href="www.arcadix.com">Arcadix© 2018</a>
                        </div>
                    </div>
                </div>

            </div>
        return jsxReturn;
    }

    return (
        <React.Fragment>{GetContent()}</React.Fragment>

    );
};

export default Login;
