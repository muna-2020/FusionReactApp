//React Related Modules
import React from 'react';

//Module related import
import TaskPropertyDetailsPrintVersion_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetailsPrintVersion/TaskPropertyDetailsPrintVersion_ModuleProcessor';

//Component import
import TaskPropertyDetails from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetails';

/**
* @name TaskPropertyDetailsPrintVersion
* @param {object} props props object
* @summary TaskPropertyDetailsPrintVersion for Task Preview direct calling content Component
* @returns {object} TaskContentPreview
*/
const TaskPropertyDetailsPrintVersion = (props) => {

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { props, ["ModuleName"]: "TaskFolderDetails", ["TaskPropertyDetailsPrintVersion_ModuleProcessor"]: new TaskPropertyDetailsPrintVersion_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles  
     * @returns null
     */
    objContext.TaskPropertyDetailsPrintVersion_ModuleProcessor.Initialize(objContext, objContext.TaskPropertyDetailsPrintVersion_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = props.Resource.Text ?? Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        return (
            <div className="taskcontent-printversion">
                <div className="printversion-header">
                    <div className="top-left">
                        <img src={props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/JLogo.svg"} />
                    </div>
                    <div className="top-right">
                        <div>
                            <b>{Localization.TextFormatter(objTextResource, "TaskType")}: </b> <b>{props.SelectedRow.TaskType}</b>
                        </div>
                        <div>
                            <b>{Localization.TextFormatter(objTextResource, "TaskName")}: </b> <b>{props.SelectedRow.vPageName}</b>
                        </div>
                    </div>
                </div>
               
                <div className="printversion-body">
                    <TaskPropertyDetails
                        {...props}
                    />
                </div>
            </div>
        );
    };

    return GetContent();
}

export default TaskPropertyDetailsPrintVersion;