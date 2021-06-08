//React Related Modules
import React, { useReducer } from 'react';
import { connect } from "react-redux";

//Component related imports
import TestApplicationCourse_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/7_Course/TestApplicationCourse_ModuleProcessor';

//Component Controller Import
import ComponentController from "@root/Application/f.TestApplication/PC/Controller/Componentcontroller/Componentcontroller";

// Content Component import
import Content from "@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Content";

//Component used
import Tree from '@root/Framework/Controls/Tree/Tree';

/**
 * @name TestApplicationCourse
 * @param {object} props props object
 * @summary TaskContentPreviewController for Task Preview direct calling content Component
 * @returns {object} Course
 */
const TestApplicationCourse = (props) => {


    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, { "objSelectedNode": {}});

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, "ModuleName": "TestApplicationCourse", ["TestApplicationCourse_ModuleProcessor"]: new TestApplicationCourse_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.TestApplicationCourse_ModuleProcessor.Initialize(objContext, objContext.TestApplicationCourse_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetPageJson = () => {
        let objPageJson = {
            ...props,
            ["TestState"]: {
                ["TaskPageProperties"]: {
                    ["PageJson"]: props.TestState.TaskPageProperties.PageJson
                }
            }
        }
        return objPageJson["TestState"];
    }


    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objNextStyle = props.TestState.IsNextButton ? { "opacity": 0.3, "cursor": "none" } : {};
        let objPreviousStyle = props.TestState.IsPreviousButton ? { "opacity": 0.3, "cursor": "none" } : {};
        return (
            <div class="outer-frame">
                <div class="inner-frame">
                    <div class="main-header">
                        <div class="header-left">
                            <img src={props.TestState.Logo} alt=""/>
                          </div>
                            <div class="header-center-text">
                                <h3>Im</h3>
                            </div>
                        </div>
                        <div class="wrapper-content">
                            <div class="tob-main">
                                <h4>Table of Contents</h4>
                                <div class="table-of-contents">
                                <Tree
                                    Id="Tree_Master"
                                    Meta={objContext.TestApplicationCourse_ModuleProcessor.GetMetaData()}
                                    Data={objContext.TestApplicationCourse_ModuleProcessor.GetData(objContext)}
                                    Events={{
                                        OnSelectNode: (objSelectedNode) => { objContext.Course_ModuleProcessor.OnSelectNode(objContext, objSelectedNode) }       
                                    }}

                                    CallBacks={{}}
                                    Resource={{
                                        SkinPath: JConfiguration.IntranetSkinPath,
                                    }}
                                    ParentProps={props}
                                />
                                </div>
                            </div>
                            <div class="page-content-main">
                            <div class="nav-arrows">
                                <img onClick={() => objContext.TestApplicationCourse_ModuleProcessor.OnPreviousNode(objContext, ApplicationState.GetProperty("objSelectedNode"))} class="arrow arrow-left" alt="" src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/Course/caret-left.svg'} style={objPreviousStyle} />
                                <img onClick={() => objContext.TestApplicationCourse_ModuleProcessor.OnNextNode(objContext, ApplicationState.GetProperty("objSelectedNode"))} class="arrow arrow-right" alt="" src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/Course/caret-right.svg'} style={objNextStyle} />
                             </div>
                            <div class="page-contents">
                                <Content
                                    {...props}
                                    TestState={GetPageJson()}
                                    ClientUserDetails={props.ClientUserDetails}
                                    ComponentController={ComponentController}
                                    JConfiguration={props.JConfiguration}
                                    IsFromRouteLoader={false}
                                    IsShowSideBar={false}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           

        );
    };

    return GetContent();
};

export default connect(TestApplicationBase_Hook.MapStoreToProps(TestApplicationCourse_ModuleProcessor.StoreMapList()))(TestApplicationCourse);
