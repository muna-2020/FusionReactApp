// React related imports.
import React from 'react';

/**
 * @name BasicProperties
 * @param {object} props props
 * @summary This component is used for BasicProperties in TaskPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskPropertyDetails.
 */
const BasicProperties = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
                <h3>{Localization.TextFormatter(objTextResource, 'General') + ":"}</h3>
                <table>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Name')}</td><td>{props.Data.TaskData.vPageName}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'CustomerID')}</td><td>{props.Data.TaskData.vCustomerTaskId}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Number')}</td><td>{props.Data.TaskData.iPageId}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'GuidId')}</td><td>{props.Data.TaskData.uPageGuid}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Usage')}</td><td>{props.Data.TaskData.strTaskUsage}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'TimeEstimate')}</td><td>{props.Data.TaskData.iEstimatedTimeToSolveSolveInSeconds}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Points')}</td><td>{"-----"}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'TaskType')}</td><td>{props.Data.TaskData.strTasktype}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Owner')}</td><td>{props.Data.TaskData.strOwner}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'EditedBy')}</td><td>{props.Data.TaskData.strEditedBy}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'CreatedOn')}</td><td>{Localization.DateFormatter(props.Data.TaskData.dtCreatedOn)}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'EditedOn')}</td><td>{Localization.DateFormatter(props.Data.TaskData.dtModifiedOn)}</td></tr>
                </table>

                <h3>{Localization.TextFormatter(objTextResource, 'Description') + ":"}</h3>
                <table>
                    <tr><td>{props.Data.TaskData.vPageDescription}</td></tr>
                </table>
        </div>
    }
    return (
        GetContent()
    );
};

export default BasicProperties;
