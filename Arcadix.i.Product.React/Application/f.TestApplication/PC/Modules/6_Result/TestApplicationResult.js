//React related Import
import React, { useReducer } from 'react';
import { connect } from "react-redux";

//Module related imports
import * as TestApplicationResult_Hook from '@shared/Application/f.TestApplication/PC/Modules/6_Result/TestApplicationResult_Hook';
import TestApplicationResult_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/6_Result/TestApplicationResult_ModuleProcessor';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name Result
 * @param {object} props props object
 * @summary Result method for Result.
 * @returns Result Page
 */
const TestApplicationResult = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer,TestApplicationResult_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, "ModuleName": "TestApplicationResult", ["TestApplicationResult_ModuleProcessor"]: new TestApplicationResult_ModuleProcessor() };

     /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestApplicationResult_ModuleProcessor.Initialize(objContext, objContext.TestApplicationResult_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TestApplicationLogin_Hook, that contains all the custom hooks.
    * @returns null
    */
    TestApplicationResult_Hook.Initialize(objContext);

    /**
     * @name ResultLayout
     * @param {object} {props,LayoutName}
     * @summary contains Layout info.
     * @returns ResultLayout
     */
    const ResultLayout = props.ComponentController.GetLayoutComponent(props.TestState.LayoutName, 'Result');

    return (
        <PerformanceProfiler ComponentName="TestApplicationTask" JConfiguration={props.JConfiguration} >
        <div className="resultPage">
            <ResultLayout {...props} />
            </div>
        </PerformanceProfiler>
    );
}

export default connect(TestApplicationBase_Hook.MapStoreToProps(TestApplicationResult_ModuleProcessor.StoreMapList()))(TestApplicationResult);
