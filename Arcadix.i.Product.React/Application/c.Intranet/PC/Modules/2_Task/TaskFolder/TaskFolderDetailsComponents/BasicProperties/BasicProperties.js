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
                <h3>{Localization.TextFormatter(objTextResource, 'BaseFolderData') + ":"}</h3>
                <table>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Name')}</td><td>{props.Data.TaskFolderData.vPageFolderName}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Number')}</td><td>{props.Data.TaskFolderData.iPageFolderId}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'NumberOfObjects')}</td><td style={{ color: "red" }}>{"(-NI-)"}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Owner')}</td><td>{props.Data.TaskFolderData.strOwner}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'EditedBy')}</td><td>{props.Data.TaskFolderData.strEditedBy}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'CreatedOn')}</td><td>{Localization.DateFormatter(props.Data.TaskFolderData.dtCreatedOn)}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'EditedOn')}</td><td>{Localization.DateFormatter(props.Data.TaskFolderData.dtModifiedOn)}</td></tr>
                </table>

                <h3>{Localization.TextFormatter(objTextResource, 'Description') + ":"}</h3>
                <table>
                    <tr><td>{props.Data.TaskFolderData.vPageFolderDescription ? props.Data.TaskFolderData.vPageFolderDescription : "-" }</td></tr>
                </table>
        </div>
    }
    return (
        GetContent()
    );
};

export default BasicProperties;
