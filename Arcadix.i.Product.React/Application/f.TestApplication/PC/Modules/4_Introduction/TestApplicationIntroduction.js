//React related imports
import  React, { useReducer }  from 'react';
import { connect } from "react-redux";

//Module related imports.
import TestApplicationIntroduction_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/4_Introduction/TestApplicationIntroduction_ModuleProcessor';
import * as  TestApplicationIntroduction_Hook from '@shared/Application/f.TestApplication/PC/Modules/4_Introduction/TestApplicationIntroduction_Hook';

//Test TestApplicationBase_Hook class import common methods used in components  
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';


//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name Introduction
 * @param {object} props props object
 * @summary Introduction method for loading Introduction Layout.
 * @returns Introduction Page
 */
const TestApplicationIntroduction = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationIntroduction_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, "ModuleName": "TestApplicationIntroduction", ["TestApplicationIntroduction_ModuleProcessor"]: new TestApplicationIntroduction_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestApplicationIntroduction_ModuleProcessor.Initialize(objContext, objContext.TestApplicationIntroduction_ModuleProcessor); 

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in TestApplicationLogin_Hook, that contains all the custom hooks.
     * @returns null
     */
    TestApplicationIntroduction_Hook.Initialize(objContext);

    /**
     * @name IntroductionLayout
     * @param {object} {props,ComponentName}
     * @summary contains Layout info.
     * @returns IntroductionLayout
     */
    const IntroductionLayout = props.ComponentController.GetLayoutComponent("Standard", 'Introduction');
    return (
        <PerformanceProfiler ComponentName="TestApplicationIntroduction" JConfiguration={props.JConfiguration} >
              <IntroductionLayout {...props} TextResources={props.TestState.IntroductionPageProperties.TextResources} />
        </PerformanceProfiler>
    );
}

export default connect(TestApplicationBase_Hook.MapStoreToProps(TestApplicationIntroduction_ModuleProcessor.StoreMapList()))(TestApplicationIntroduction);