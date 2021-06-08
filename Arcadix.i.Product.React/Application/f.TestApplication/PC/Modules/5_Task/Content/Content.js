//React Related Imports 
import React, { useRef, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

//Common methods for all components in TestApplication are implemented here
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';
import * as Content_Hook from '@shared/Application/f.TestApplication/PC/Modules/5_Task/Content/Content_Hook';
import Content_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/Content/Content_ModuleProcessor';
import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name Content
 * @param {object} props props object
 * @summary Content  method Loading the Task with Page Id and Page Json
 * @returns {Component} Content component.
 */
const PageContent = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, Content_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary  which can be passed across method in the module and used
     */
    let objContext = {
        props,
        state,
        dispatch,
        "PageContentRef": useRef(null),
        "Content_ModuleProcessor": new Content_ModuleProcessor(),
        "TestApplicationTask_ModuleProcessor": new TestApplicationTask_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Content_ModuleProcessor.Initialize(objContext, objContext.Content_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Teacher_Hook, that contains all the custom hooks.
     * @returns null
     */
    Content_Hook.Initialize(objContext);

    /**
     * @name GetComponent
     * @summary Contains the JSX of Content Component.
     * @returns {JSX} JSX.
     */
    const GetContent = () => {

        let CMSPageContent = props.ComponentController.GetComponent("CMSPageContent_TestApplication");
        let objPageJsonWithAnswer, objUserAnswer, arrTaskEvaluationResult;
        if (props.TestState.PreviewTestControl) {
            objPageJsonWithAnswer = props.TestState.TaskPageProperties.PageJsonWithAnswer;
        }
        let objLinearTest = props.TestState.LinearTestProperties ? true : false;
        if (objLinearTest) {
            objUserAnswer = props.TestState.LinearTestProperties.UserAnswer;
        }
        objContext.TestApplicationTask_ModuleProcessor.GetTimeTakenforTask();
        return (
            <PerformanceProfiler ComponentName="TestApplicationTask" JConfiguration={props.JConfiguration} >
                <div id="TaskContent" className="taskContent">
                    {
                        props.TestState.TaskPageProperties.PageJson.iPageId > 0 ?
                            <PerformanceProfiler IsMainModule={true} ComponentName={"CMSPageContent_TestApplication_" + props.TestState.TaskPageProperties.PageJson.iPageId} JConfiguration={props.JConfiguration} >
                                <CMSPageContent
                                    {...(props.IsForServerRenderHtml ? props : {})}
                                    PageContentRef={objContext.PageContentRef}
                                    PageJson={props.TestState.TaskPageProperties.PageJson}
                                    PageId={props.TestState.TaskPageProperties.PageJson.iPageId}
                                    Mode="Test"
                                    PageProperties={props.TestState.TaskPageProperties.TaskConfigurationProperties}
                                    SubjectForMainClient={props.TestState.TaskPageProperties.Subjects}
                                    ComponentController={props.ComponentController}
                                    PageJsonWithAnswer={objPageJsonWithAnswer}
                                    UserAnswerJson={objUserAnswer}
                                    TaskEvaluationResult={arrTaskEvaluationResult}
                                    JConfiguration={props.JConfiguration} />
                            </PerformanceProfiler>
                            :
                            <div align="center">
                                <b>
                                    {props.TestState.TaskPageProperties.PageJson.ExpiredMessage}
                                </b>
                            </div>
                    }
                </div>
            </PerformanceProfiler>
        );
    };

    return GetContent();
};

const Content = (props) => {
    var blnRenderPageContent = props.IsForServerRenderHtml ? props.JConfiguration["SSR_TestApplication"]["PageContent"] == "Y" ? true : false : true;
    return (<div>
        {
            blnRenderPageContent == true ? <PageContent
                {...props}
            /> : <React.Fragment />
        }
    </div>)
}

export default withRouter(connect(TestApplicationBase_Hook.MapStoreToProps(Content_ModuleProcessor.StoreMapList()))(Content));
