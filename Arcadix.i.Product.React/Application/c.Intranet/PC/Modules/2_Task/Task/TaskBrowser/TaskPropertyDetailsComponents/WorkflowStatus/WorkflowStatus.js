// React related imports.
import React from 'react';

/**
 * @name WorkflowStatus
 * @param {object} props props
 * @summary This component is used for WorkflowStatus in TaskPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskPropertyDetails.
 */
const WorkflowStatus = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
            
        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'Lektorat') + ""}</h3>
            <table>
                <tr><td>{Localization.TextFormatter(objTextResource, 'WorkFlowStatus') + ""}</td><td>{props.Data.TaskData.strWorkFlowStatus}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'Audit') + ""}</td><td>{props.Data.TaskData.strWorkFlowComment}</td></tr>
            </table>
        </div>
    }
    return (
        GetContent()
    );
};

export default WorkflowStatus;
