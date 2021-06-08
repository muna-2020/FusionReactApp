//React Related Modules
import React from 'react';

//Module related import
import TaskFolderDetailsPrintVersion_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/TaskFolderDetails/TaskFolderDetailsPrintVersion/TaskFolderDetailsPrintVersion_ModuleProcessor';

//Component import
import TaskFolderDetails from '@root/Application/c.Intranet/PC/Modules/2_Task/TaskFolder/TaskFolderDetails/TaskFolderDetails';

/**
* @name TaskFolderDetailsPrintVersion
* @param {object} props props object
* @summary TaskFolderDetailsPrintVersion for Task Preview direct calling content Component
* @returns {object} TaskContentPreview
*/
const TaskFolderDetailsPrintVersion = (props) => {

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { props, ["ModuleName"]: "TaskFolderDetails", ["TaskFolderDetailsPrintVersion_ModuleProcessor"]: new TaskFolderDetailsPrintVersion_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles  
     * @returns null
     */
    objContext.TaskFolderDetailsPrintVersion_ModuleProcessor.Initialize(objContext, objContext.TaskFolderDetailsPrintVersion_ModuleProcessor);

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
                            <b>{Localization.TextFormatter(objTextResource, 'Pdf_FolderHeader1')}: </b>
                        </div>
                        <div>
                            <b>{Localization.TextFormatter(objTextResource, 'Pdf_FolderHeader2')}: </b> <b>{props.SelectedRow.vPageFolderName}</b>
                        </div>
                    </div>
                </div>
               
                <div className="printversion-body">
                    <TaskFolderDetails
                        {...props}
                    />
                </div>
            </div>
        );
    };

    return GetContent();
}

export default TaskFolderDetailsPrintVersion;