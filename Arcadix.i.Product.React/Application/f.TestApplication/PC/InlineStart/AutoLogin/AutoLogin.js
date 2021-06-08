//React Related Modules
import React, { useReducer } from 'react';

//Module Related Imports
import * as AutoLogin_Hook from '@shared/Application/f.TestApplication/PC/InlineStart/AutoLogin/AutoLogin_Hook';

//Application State Classes
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';
import TestApplicationMaster from '@root/Application/f.TestApplication/PC/Modules/1_Master/TestApplicationMaster';

//Component Import
import ComponentController from "@root/Application/f.TestApplication/PC/Controller/Componentcontroller/Componentcontroller";

/**
 * @name AutoLogin
 * @param {object} props props object
 * @summary AutoLogin Component loads Introduction or Task page.
 * @returns {object} Introduction or Task page
 */
const AutoLogin = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, AutoLogin_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize the AutoLogin properties which is required for render the page
     * @returns null
     */
    AutoLogin_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
            <div>
                {state.blnIsLoadComplete ? <TestApplicationMaster {...objContext.props} JConfiguration={props.JConfiguration} ComponentController={ComponentController} IsShowSideBar={false}/> : <React.Fragment />}
            </div>
        );
    };

    return GetContent();
};

export default AutoLogin;