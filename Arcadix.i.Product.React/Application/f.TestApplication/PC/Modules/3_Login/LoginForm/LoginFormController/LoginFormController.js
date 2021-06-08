//For Loading Component
import loadable from '@loadable/component'

/**
 * @name LoginControl
 * @summary Contains path to StandardLogin
 * @returns null
 */
const LoginControl = {    
    Standard: function () {
        return loadable(() => import(/* webpackChunkName: "StandardLogin" */ '@root/Application/f.TestApplication/PC/Modules/3_Login/LoginForm/LoginFormController/StandardLogin/StandardLogin'));
    }    
};

/**
 * @name LoginFormController
 * @summary Getting Login Control
 * @returns null
 */
const LoginFormController = {
    GetLoginControl: function (strLoginControlName) {
        if (LoginControl[strLoginControlName]) {
            return LoginControl[strLoginControlName]();
        }
        else {
            console.error('%cno such LoginControl exists', 'background: beige; color: red; font-weight: bold');
            return undefined;
        }
    }
}

export default LoginFormController;