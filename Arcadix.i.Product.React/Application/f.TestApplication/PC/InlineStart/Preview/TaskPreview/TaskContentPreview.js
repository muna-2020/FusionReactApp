//React Related Modules
import React, { useReducer } from 'react';
import { connect } from "react-redux";

//Module related import
import * as TaskContentPreview_Hook from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview/TaskContentPreview_Hook';

//Application State Classes
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';

//Component Controller Import
import ComponentController from "@root/Application/f.TestApplication/PC/Controller/Componentcontroller/Componentcontroller";

// Content Component import
import Content from "@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Content";


/**
* @name TaskContentPreview
* @param {object} props props object
* @summary TaskContentPreview for Task Preview direct calling content Component
* @returns {object} TaskContentPreview
*/
const TaskContentPreview = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TaskContentPreview_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize the TaskContentPreview Preview properties which is required for render the page
     * @returns null
     */
    TaskContentPreview_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objPageJson = {
            ...props,
            ["TestState"]: {
                ["TaskPageProperties"]: {
                    ["PageJson"]: objContext.props.PageJson
                }
            }
        }

        return (
            <div>
                <Content
                    {...props}
                    TestState={objPageJson.TestState}
                    ClientUserDetails={props.ClientUserDetails}
                    ComponentController={ComponentController}
                    JConfiguration={props.JConfiguration}
                    IsFromRouteLoader={false}
                    IsShowSideBar={false}
                />
            </div>
        );
    };

    return GetContent();
};


export default TaskContentPreview;
