//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from "react-redux";
 
//For API Calls
import TestApplicationLogin_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/3_Login/TestApplicationLogin_ModuleProcessor';

//UseEffect implementation
import * as TestApplicationLogin_Hook from '@shared/Application/f.TestApplication/PC/Modules/3_Login/TestApplicationLogin_Hook';

//Test TestApplicationBase_Hook class import common methods used in Test Application components  
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name TestApplicationLogin
 * @param {object} props props object
 * @summary TestApplicationLogin method for getting LoginLoyout and rendering Login Page.
 * @returns Login Page
 */
const TestApplicationLogin = (props) => {

   /**
    * @name [state,dispatch]s
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationLogin_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestApplicationLogin", ["TestApplicationLogin_ModuleProcessor"]: new TestApplicationLogin_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestApplicationLogin_ModuleProcessor.Initialize(objContext, objContext.TestApplicationLogin_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in TestApplicationLogin_Hook, that contains all the custom hooks.
     * @returns null
     */
    TestApplicationLogin_Hook.Initialize(objContext);

    /**
     * @name LoginLayout
     * @param {object} props props object
     * @summary contains Layout info.
     * @returns Login Layout
     */
    const LoginLayout = props.ComponentController.GetLayoutComponent(props.TestState.LayoutName, 'Login');

    /**
     * @name useRef
     * @summary Used For Getting Details from other Component
     * @param {any} null
     */
    const LoginRef = useRef(null);

    /**
     * @name GetLoginInfo
     * @summary Proving the State.LoginDetails from StandardLogin
     * @param {any} props Props
     */
    const GetLoginInfo = () => {
        return LoginRef.current.GetLoginDetails();
    };

    return ( 
        state.isLoadComplete ||  props.isLoadComplete ?
        <PerformanceProfiler ComponentName="TestApplicationLogin" JConfiguration={props.JConfiguration}>
                <div id="divLoginPage" className="loginPage">
                    <LoginLayout {...props} TextResources={props.TestState.LoginPageProperties.TextResources} LoginRef={LoginRef} Callbacks={{ "GetLoginInfo": GetLoginInfo }} />
                </div>
        </PerformanceProfiler> : <React.Fragment/>
    );
}
export default connect(TestApplicationBase_Hook.MapStoreToProps(TestApplicationLogin_ModuleProcessor.StoreMapList()))(TestApplicationLogin);