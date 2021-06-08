//React related imports.
import React, { useReducer } from 'react';

//Localization for Text Resource
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

//Submit_ModuleProcessor imports for common methods
import PreLoginButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/PreLoginButton/PreLoginButton_ModuleProcessor';

//Test TestApplicationBase_Hook class import common methods used in Test Application components
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';

//UseEffect implementation
import * as TestApplicationPreLogin_Hook from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/TestApplicationPreLogin_Hook';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @summary It is used to check or validate all the login details.
 * @param {any} props
 */
const PreLoginButton = (props) => {

    /**
     * @name [state,dispatch]s
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationPreLogin_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups props and dispatch and PreLoginSubmit_ModuleProcessor object, which can be passed across method in the module and used
     */
    const objContext = { props, dispatch, 'objTextResource': props.objTextResource, PreLoginButton_ModuleProcessor: new PreLoginButton_ModuleProcessor() };

    return (

        <PerformanceProfiler ComponentName="PreLoginButton" JConfiguration={props.JConfiguration} >
            <WrapperComponent
                ComponentName={"Button"}
                Meta={{ "ClassName": "loginBtn" }}
                Events={{ "OnClickEventHandler": () => objContext.PreLoginButton_ModuleProcessor.HandleSubmitClick(objContext) }}
                Resource={{ "ButtonText": Localization.TextFormatter(props.objTextResource, 'TestApplicationLoginControl_LoginButtonText') }}
                ParentProps={props}
            />
        </PerformanceProfiler>

    );
}

export default PreLoginButton;