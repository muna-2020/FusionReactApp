//React related imports.
import React from 'react';

//TestApplicationLogin_ModuleProcessor imports for common methods
import LoginButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/3_Login/LoginButton/LoginButton_ModuleProcessor';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @summary It is used to check or validate all the login details.
 * @param {any} props
 */
const LoginButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups props and dispatch and TestApplicationLogin_ModuleProcessor object, which can be passed across method in the module and used
     */
    const objContext = { props, LoginButton_ModuleProcessor: new LoginButton_ModuleProcessor() };

    return (
        <PerformanceProfiler ComponentName="LoginButton" JConfiguration={props.JConfiguration} >

            <WrapperComponent
                ComponentName={"Button"}
                Meta={{ "ClassName": "loginBtn" }}
                Events={{ "OnClickEventHandler": () => objContext.LoginButton_ModuleProcessor.HandleSubmitClick(objContext) }}
                Resource={{
                    "ButtonText": Localization.TextFormatter(props.TextResources, 'TestApplicationLoginControl_LoginButtonText')
                }}
                ParentProps={props}
            />

        </PerformanceProfiler>
    );
}

export default LoginButton;