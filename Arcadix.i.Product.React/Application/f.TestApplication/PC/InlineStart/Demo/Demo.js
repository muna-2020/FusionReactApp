//React Related Modules
import React, { useReducer } from 'react';

//Demo Hook for Initialize
import * as Demo_Hook from '@shared/Application/f.TestApplication/PC/InlineStart/Demo/Demo_Hook';

//Application State Classes
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';
import TestApplicationMaster from '@root/Application/f.TestApplication/PC/Modules/1_Master/TestApplicationMaster';

//Component Import
import ComponentController from "@root/Application/f.TestApplication/PC/Controller/Componentcontroller/Componentcontroller";

/**
 * @name Demo
 * @param {object} props props object
 * @summary Demo for loading the Demo Test tasks
 * @returns {object} Test Task
 */
const Demo = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, Demo_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize the Demo properties which is required for render the page
     * @returns null
     */
    Demo_Hook.Initialize(objContext);

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
}

export default Demo;