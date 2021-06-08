//React Related Modules
import React, { useRef, useReducer, useEffect } from 'react';
import { connect } from "react-redux";

import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';
import * as TestApplicationTask_Hook from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_Hook';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

//Store related imports
import { Provider } from 'react-redux';

/**
 * @name Task
 * @param {object} props props object
 * @summary Task  method call for Loading the Task
 * @returns {Component} Task Page
 */
const TestApplicationTask = (props) => {

    TestApplicationTask.StyleArray = useRef([]);
    let objClientDivRef = useRef(null);
    let objServerDivRef = useRef(null);

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationTask_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    let objContext = {
        state,
        props,
        dispatch,
        "ModuleName": "TestApplicationTask",
        StyleArray: TestApplicationTask.StyleArray,
        "TaskLayoutRef": useRef(null),
        ["TestApplicationTask_ModuleProcessor"]: new TestApplicationTask_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestApplicationTask_ModuleProcessor.Initialize(objContext, objContext.TestApplicationTask_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in TestApplicationLogin_Hook, that contains all the custom hooks.
     * @returns null
     */
    TestApplicationTask_Hook.Initialize(objContext);

    /**
     * @name useEffect
     * @param {object}
     * @summary For loading the component
     * @returns null
     */
    useEffect(() => {
        const TaskLayout = props.ComponentController.GetLayoutComponent("Standard", "Task");
        if (props.CurrentRoute.SSRData !== undefined) {
            ReactDOM.hydrate(
                <Provider store={store}>
                    <BrowserRouter>
                        <PerformanceProfiler ComponentName="TestApplicationTask" JConfiguration={props.JConfiguration} >
                            <TaskLayout
                                {...props}
                                TextResources={props.TestState.TaskPageProperties.TextResources}
                                TaskLayoutRef={objContext.TaskLayoutRef}
                                RerouteTo={objContext.TestApplicationTask_ModuleProcessor.RerouteTo}
                            />
                        </PerformanceProfiler>
                    </BrowserRouter>
                </Provider>
                ,
                objClientDivRef.current, function () {
                    HideServerDiv(objClientDivRef.current, objServerDivRef.current);
                });
        }
    }, [props.TestState.TaskPageProperties.PageJson.iPageId])

    /**
    * @name HideServerDiv
    * @param {object}
    * @summary For Hiding the div
    * @returns null
    */
    function HideServerDiv(objClientDom, objServerDom) {
        if (objClientDom.childElementCount > 0) {
            objServerDom.style.display = "none";
        }
        else {
            window.setTimeout(function () {
                HideServerDiv(objClientDom, objServerDom);
            }, 100);
        }
    }

    /**
     * @name  GetContent
     * @summary Contains the JSX for TestApplicationTask
     * @returns {JSX} JSX
     * */
    const GetContent = () => {
        const TaskLayout = props.ComponentController.GetLayoutComponent("Standard", props.TestState.CurrentRoute);
        return (
            <PerformanceProfiler ComponentName="TestApplicationTask" JConfiguration={props.JConfiguration} >
                {
                    props.CurrentRoute.SSRData ?
                        <div className="taskPage">
                            <div id="Server_Task" ref={objServerDivRef} className="server-render" dangerouslySetInnerHTML={{ __html: props.CurrentRoute.SSRData.Html }}></div>
                            <div id={"Client_Task"} ref={objClientDivRef} className="client-render"></div>
                        </div>
                        :
                        <div className="taskPage">
                            <div id={"Client_Task"} ref={objClientDivRef} className="client-render">
                                {
                                    (TaskLayout !== undefined) ?
                                        <TaskLayout
                                            {...props}
                                            objTextResource={props.TestState.TaskPageProperties.TextResources}
                                            TaskLayoutRef={objContext.TaskLayoutRef}
                                            RerouteTo={objContext.TestApplicationTask_ModuleProcessor.RerouteTo}
                                        /> : <React.Fragment />
                                }
                            </div>
                        </div>
                }
            </PerformanceProfiler>
        );
    };
    return GetContent();
};

export default connect(TestApplicationBase_Hook.MapStoreToProps(TestApplicationTask_ModuleProcessor.StoreMapList()))(TestApplicationTask);
