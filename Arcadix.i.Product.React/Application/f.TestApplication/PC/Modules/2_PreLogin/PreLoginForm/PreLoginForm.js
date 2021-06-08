//React Related imports
import React, { useReducer, useImperativeHandle } from 'react';

//For API Calls
import PreLoginForm_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/PreLoginForm/PreLoginForm_ModuleProcessor';

//TestApplicationBase_Hook  Having common methods for TestAplication
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';

//UseEffect implementation
import * as TestApplicationPreLogin_Hook from '@shared/Application/f.TestApplication/PC/Modules/2_PreLogin/TestApplicationPreLogin_Hook';

//Localization for Implement Text Resource
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const PreLoginForm = (props) => { 

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationPreLogin_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and PreLoginForm_ModuleProcessor object, which can be passed across method in the module and used
     */
    var objContext = { state, props, dispatch, PreLoginForm_ModuleProcessor: new PreLoginForm_ModuleProcessor() };

    /**
     * @name useImperativeHandle
     * @summary Used to get data from one component to other
     */
    useImperativeHandle(props.PreLoginRef, () => ({
        "GetPreLoginDetails": () => {
            return state.PreLoginDetails;
        }
    }), [props,state]);

    return (
            <div>

                <div className="formCon">
                    {/*login title*/}
                <p className="titleLogin kSans"> <strong>{Localization.TextFormatter(props.objTextResource, "TestApplicationLoginPage_LoginSubTitle")}</strong> </p>

                    <table width="360">
                        {/*user Id*/}
                        <tr>
                            <td></td>
                        <td className="LoginLabel" >{Localization.TextFormatter(props.objTextResource, 'TestApplicationLoginControl_Name')}</td>
                        <td className="loginIn" > <input type="text" id="Username" value={state.PreLoginDetails.Username}
                        onChange={(e) => {
                            objContext.PreLoginForm_ModuleProcessor.HandleChange('Username', e.target.value, objContext)
                        }}
                        onBlur={(e) => {
                                objContext.PreLoginForm_ModuleProcessor.OnBlurHandleChange('Username', objContext);
                        }}
                        onFocus={(e) => {
                                objContext.PreLoginForm_ModuleProcessor.OnFocusHandleChange('Username', objContext);
                        }}/></td>
                        </tr>
                        <tr>
                            <td></td>
                        <td className="LoginLabel" >{Localization.TextFormatter(props.objTextResource, 'TestApplicationLoginControl_Password')}</td>
                        <td className="loginIn" > <input type="text" id="Password" value={state.PreLoginDetails.Password}
                        onChange={(e) => {
                            objContext.PreLoginForm_ModuleProcessor.HandleChange('Password', e.target.value, objContext)
                        }}
                        onBlur={(e) => {
                                objContext.PreLoginForm_ModuleProcessor.OnBlurHandleChange('Password', objContext);
                        }}
                        onFocus={(e) => {
                                objContext.PreLoginForm_ModuleProcessor.OnFocusHandleChange('Password', objContext);
                        }}/></td>
                        </tr>
                        
                    </table>

                    {/*validation error message*/}
                <div className="errorBlock" id="ErrorMessageBlock">
                    </div>
                </div>
                {/*note on languages*/}
            <p className="loginTxt">{Localization.TextFormatter(props.objTextResource, 'PageOutput_LoginAudiotitle')}</p>

                {/*audio block placeholder*/}
                <div></div>

            </div>
        );
}

export default PreLoginForm ;