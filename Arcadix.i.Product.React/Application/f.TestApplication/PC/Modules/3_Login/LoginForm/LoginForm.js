// React related imports.
import React from 'react';

//StandardLogin is for Standard Login Form
import LoginFormController from '@root/Application/f.TestApplication/PC/Modules/3_Login/LoginForm/LoginFormController/LoginFormController';

/**
 * @name LoginForm
 * @param {object} props props object
 * @summary LoginForm method call in LoginFormController, that contains all the Login Controls.
 * @returns null
 */
const LoginForm = (props) => {

    /**
     * @name LoginControl
     * @param {object} props props object
     * @summary contains all the Login Controls.
     * @returns null
     */
    const LoginControl = LoginFormController.GetLoginControl(props.TestState.LoginPageProperties.LoginControl);

    return <LoginControl {...props} />;
};

export default LoginForm;