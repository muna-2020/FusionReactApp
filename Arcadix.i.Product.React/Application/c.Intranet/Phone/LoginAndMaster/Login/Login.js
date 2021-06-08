// React related imports.
import React, { useReducer } from "react";

////Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
//import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";
//import * as IntranetBase_Form from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Form';
//global.IntranetBase_Hook = IntranetBase_Hook;
//global.IntranetBase_ModuleProcessor = new IntranetBase_ModuleProcessor();
//global.IntranetBase_Form = IntranetBase_Form;

//Module related fies.
import Login_ModuleProcessor from "@shared/Application/c.Intranet/LoginAndMaster/Login/Login_ModuleProcessor";
import * as Login_Hook from "@shared/Application/c.Intranet/LoginAndMaster/Login/Login_Hook";

//Components used in module.
import SystemCheck from '@root/Application/c.Intranet/PC/LoginAndMaster/Login/SystemCheck/SystemCheck'

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
    * @name InitializeValidation
    * @param {object} objContext context object
    * @summary Initializes validations.
    * @returns null
    */
   // Login_Hook.InitializeValidation(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let objTextResource = props.IsForServerRenderHtml ? props.LoginTextResources : LoginTextResources ?? {};
        return (
            <div className="login-page-containter">
                <div className="login-page-header" />
                <div className="form-overlay">
                    <div className="form-center">
                        <div className="form-box">
                            <div className="logo">
                                <img className="Img" src={props.JConfiguration ? props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/Jlogo.svg" : ""} />
                            </div>

                            <div style={{ display: (!state.strUserValidated ? "block" : "none") }}>
                                <div className="form-header">
                                    <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/log_in.png"} />
                                    <div className="titleOne"> {objTextResource["Login"]} </div>
                                </div>

                                <SystemCheck {...props} />

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
                                            objContext.Login_ModuleProcessor.OnLoginClick(objContext);
                                        }}
                                            className="login-button">{objTextResource["Submit"]}</button>
                                    </div>

                                    <div className="email-block">
                                        <h3>{objTextResource["Email"]}</h3>
                                        <input type="text" id="txtEmail" placeholder={objTextResource["Email"]}
                                            onChange={(e) => {
                                                objContext.Login_ModuleProcessor.HandleChange("txtEmail", e.target.value, objContext, "");
                                            }}
                                            onBlur={(e) => { objContext.Login_ModuleProcessor.ValidateOnBlur(objContext, "txtEmail"); }}
                                            onFocus={(e) => { objContext.Login_ModuleProcessor.ValidateOnFocus(objContext, "txtEmail"); }}
                                        />
                                        <div className="button-right">
                                            <button className="login-button">{objTextResource["Submit"]}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            {/*
                             * Removed Temporarily....
                             *  <div style={{ display: (state.strUserValidated || ApplicationState.GetProperty("strUserValidated") ? "block" : "none") }}>
                                <div>
                                    <img src={objContext.state.strBarcodeImageUrl != "" ? objContext.state.strBarcodeImageUrl: ApplicationState.GetProperty('strBarcodeImageUrl')} />
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
                             */}
                           

                        </div>
                        <div className="copy-right">
                            <a href="http://www.arcadix.com/" target="_blank">Arcadix© 2018</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return GetContent();
};

/**
* @name DynamicStyles
* @param {props} props to the method
* @summary Forms the whole jsx required for the module.
* @returns {Array} Array of the CSS
*/
Login.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Login/Login.css",
        props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css",
        props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
        props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
        props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/DropDown/DropDown/DropDown.css"
    ];
    if (JConfiguration.Performance) {
        arrStyles = [...arrStyles, props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
    }
    return arrStyles;
};

export default Login;
