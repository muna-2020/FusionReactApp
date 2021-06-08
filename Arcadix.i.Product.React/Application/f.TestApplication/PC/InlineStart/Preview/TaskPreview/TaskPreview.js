//React Related Modules
import React, { useReducer } from 'react';

//Module Related Imports
import * as TaskPreview_Hook from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskPreview_Hook';
 
//Application State Classes
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';

//Component Controller Import
import ComponentController from "@root/Application/f.TestApplication/PC/Controller/Componentcontroller/Componentcontroller";

/**
 * @name TaskPreview
 * @param {object} props props object
 * @summary Task Preview for loading the task
 * @returns {object} TaskPreview
 */
const TaskPreview = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TaskPreview_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize the Task Preview properties which is required for render the page
     * @returns null
     */
    TaskPreview_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let TestApplicationMaster = ComponentController.GetComponent("TestApplicationMaster");
        return (
            <div id="TaskPreviewMain">
                <TestApplicationMaster
                    {...props}
                    ClientUserDetails={props.ClientUserDetails}
                    ComponentController={ComponentController}
                    JConfiguration={props.JConfiguration}
                    IsFromRouteLoader={false}
                    IsShowSideBar={false}
                    IsTaskPreview />
            </div>
        );
    };

    return state.blnIsLoadComplete ? GetContent() : "";
};

export default TaskPreview;
