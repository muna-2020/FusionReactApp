//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from "react-redux";

//For API Calls
import TestApplicationPreLogin_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/TestApplicationPreLogin_ModuleProcessor';

//UseEffect implementation
import * as TestApplicationPreLogin_Hook from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/TestApplicationPreLogin_Hook';

//Test TestApplicationBase_Hook class import common methods used in Test Application components  
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';


/**
 * @name PreLogin
 * @param {object} props props object
 * @summary PreLogin method for getting LoginLoyout and rendering Login Page.
 * @returns PreLogin Page
 */
const TestApplicationPreLogin = (props) => {
   
    /**
     * @name [state,dispatch]s
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationPreLogin_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, "ModuleName": "TestApplicationPreLogin", ["TestApplicationPreLogin_ModuleProcessor"]: new TestApplicationPreLogin_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestApplicationPreLogin_ModuleProcessor.Initialize(objContext, objContext.TestApplicationPreLogin_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in TestApplicationPreLogin_Hook, that contains all the custom hooks.
     * @returns null
     */
    TestApplicationPreLogin_Hook.Initialize(objContext);

    /**
     * @name LoginLayout
     * @param {object} props props object
     * @summary contains Layout info.
     * @returns PreLoginLayout
     */
    const PreLoginLayout = props.ComponentController.GetLayoutComponent(props.TestState.LayoutName, 'PreLogin');  

    /**
     * @name useRef
     * @summary Used For Getting Details from other Component
     * @param {any} null
     */
    const PreLoginRef = useRef(null);

    /**
     * @name GetLoginInfo
     * @summary Proving the State.LoginDetails from StandardLogin
     * @param {any} props Props
     * @returns PreLoginDetails
     */
    const GetPreLoginInfo = () => {
        return PreLoginRef.current.GetPreLoginDetails();
    };

    return (
        <PerformanceProfiler ComponentName="TestApplicationPreLogin" JConfiguration={props.JConfiguration} >
        <div id="divLoginPage" className="loginPage">
                <PreLoginLayout {...props} objTextResource={props.TestState.PreLoginPageProperties.TextResources} PreLoginRef={PreLoginRef} Callbacks={{ "GetPreLoginInfo": GetPreLoginInfo }} /> : <React.Fragment />
            </div>
        </PerformanceProfiler>
    );
} 


export default connect(TestApplicationBase_Hook.MapStoreToProps(TestApplicationPreLogin_ModuleProcessor.StoreMapList()))(TestApplicationPreLogin);