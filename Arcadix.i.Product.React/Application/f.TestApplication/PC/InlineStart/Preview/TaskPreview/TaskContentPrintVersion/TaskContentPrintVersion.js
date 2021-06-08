//React Related Modules
import React from 'react';

//Module related import
import TaskContentPrintVersion_ModuleProcessor from '@shared/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPrintVersion/TaskContentPrintVersion_ModuleProcessor';

//Content Component import
import TaskContentPreview from "@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview";

/**
* @name TaskContentPrintVersion
* @param {object} props props object
* @summary TaskContentPrintVersion for Task Preview direct calling content Component
* @returns {object} TaskContentPreview
*/
const TaskContentPrintVersion = (props) => {

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { props, ["ModuleName"]: "TaskContentPrintVersion", ["TaskContentPrintVersion_ModuleProcessor"]: new TaskContentPrintVersion_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.TaskContentPrintVersion_ModuleProcessor.Initialize(objContext, objContext.TaskContentPrintVersion_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
            <div className="taskcontent-printversion">
                <div className="printversion-header">
                    <div className="top-left">
                        <img src={props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/JLogo.svg"} />
                    </div>
                    <div className="top-right">
                        <div className="task-details" style={{ textAlign: "left" }}>
                            <b>Aufgabentyp: </b> <b>{props.TaskData.TaskType}</b>
                        </div>
                        <div className="task-details" style={{ textAlign: "left" }}>
                            <b>Aufgabenname: </b> <b>{props.TaskData.vPageName}</b>
                        </div>
                    </div>
                </div>
                <div className="standard-task-layout">
                    <div className="task-layout-header">                        
                        <div className="logo-block">
                            <div className="logo-image">
                                <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/Test.svg'}  />
                            </div>
                        </div>                        
                    </div>
                    <div className="task-content">
                        <TaskContentPreview
                            {...props}
                        />
                    </div>
                </div>                
            </div>
        );
    };

    return GetContent();
}

export default TaskContentPrintVersion;