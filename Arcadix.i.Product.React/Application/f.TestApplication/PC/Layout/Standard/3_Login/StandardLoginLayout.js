//React Related Imports
import React from 'react';

//Module Imports
import LoginForm from '@root/Application/f.TestApplication/PC/Modules/3_Login/LoginForm/LoginForm';
import LoginButton from '@root/Application/f.TestApplication/PC/Modules/3_Login/LoginButton/LoginButton';

/**
 * @name StandardLoginLayout
 * @summary Standard Login Layout page
 * @param {any} props Props
 */
const StandardLoginLayout = (props) => {
    return (
        <div className="test-application">
            <div className="header">
                <div className="header-left">
                    TESTAUFGABEN
            </div>
                <img
                    src={props.TestState.Logo}
                    alt=""
                />
                <div className="header-right">
                </div>
            </div>
            <div className="test-application-login">
                <div className="login-form">
                    <LoginForm {...props} />
                </div>
            </div>
            <div className="footer">
                <LoginButton {...props} />
            </div>
        </div>
    );
}

export default StandardLoginLayout;