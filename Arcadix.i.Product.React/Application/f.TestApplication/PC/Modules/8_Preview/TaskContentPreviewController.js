//React Related Modules
import React, {useReducer} from 'react';
import { connect } from "react-redux";

// Content Component import
import TaskContentPreview from "@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview";

//Component related imports
import TaskContentPreviewController_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/8_Preview/TaskContentPreviewController_ModuleProcessor';

/**
* @name TaskContentPreviewController
* @param {object} props props object
* @summary TaskContentPreviewController for Task Preview direct calling content Component
* @returns {object} TaskContentPreview
*/
const TaskContentPreviewController = (props) => {

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
            <div>
                <TaskContentPreview
                    {...props}
                    PageJson={props.TestState.TaskPageProperties.PageJson}
                    ClientUserDetails={props.ClientUserDetails}
                    JConfiguration={props.JConfiguration}
                    IsFromRouteLoader={false}
                    IsShowSideBar={false}
                />
            </div>
        );
    };

    return GetContent();
};

export default connect(TestApplicationBase_Hook.MapStoreToProps(TaskContentPreviewController_ModuleProcessor.StoreMapList()))(TaskContentPreviewController);
