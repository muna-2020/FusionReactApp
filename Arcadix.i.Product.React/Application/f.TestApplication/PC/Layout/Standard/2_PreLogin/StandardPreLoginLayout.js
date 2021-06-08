//React Relaetd Imports
import React from 'react';

//Module Related Imports
import PreLoginForm from '@root/Application/f.TestApplication/PC/Modules/2_PreLogin/PreLoginForm/PreLoginForm';
import PreLoginButton from '@root/Application/f.TestApplication/PC/Modules/2_PreLogin/PreLoginButton/PreLoginButton';

/**
 *@name PreLogin Prelogin Layout
 *@param {any} props
 */
const StandardPreLoginLayout= (props)=>{
    return (
        <div>
                <table className="loginHead">
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="Headerstart">
                                <div className="IdNum"></div>
                                <div className="logo"></div>
                            </td>
                            <td></td>
                            <td><p></p></td>
                        </tr>
                        <tr className="topClientTitle"><td colSpan={5}><span>TESTAUFGABEN</span></td>
                        </tr>
                    </tbody>
                </table>

                {/*form structure*/}

                <div className="formWrapper">
                <PreLoginForm {...props} />
                </div>
            <PreLoginButton {...props} />
        </div>
    );
}

export default StandardPreLoginLayout;