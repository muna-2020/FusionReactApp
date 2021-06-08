// React related import
import React from 'react';

/**
 * @name DocumentManagement_DocumentDetails
 * @param {object} props props from parent.
 * @summary Contains the DocumentManagement_DocumentDetails module.
 * @returns {component} DocumentManagement_DocumentDetails
 */
const DocumentManagement_DocumentDetails = (props) => {

    const strLink = `${props.JConfiguration.BaseUrl}API/Framework/Services/StreamFile?FileName=${props.ElementDetails.iElementId}_Document_${props.ElementDetails.vElementJson.iDocumentFileVersion}.${props.ElementDetails.vElementJson.vDocumentType}&Type=Document&DisplayFileName=${props.ElementDetails.vElementJson.vDocumentName}.${props.ElementDetails.vElementJson.vDocumentType}&sessionkey=${JConfiguration.SessionKey}`;
    const GetContent = () => {
        return (
            <div className="object-multimedia-detail-properties">
                <h2>{props.TextResource["Document_Title"]}</h2>
                <h3>{props.TextResource["Properties"]}</h3>
                <table>
                    <tr>
                        <td>{props.TextResource["Name"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["vDocumentName"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["FileType_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["vDocumentType"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["FileSize_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["iDocumentSizeInBytes"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Created_On"]}:</td>
                        <td>{props.ElementDetails["dtCreatedOn"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Edited_On"]}:</td>
                        <td>{props.ElementDetails["dtModifiedOn"]}</td>
                    </tr>
                </table>
                <h3>{props.TextResource["Description"]}:</h3>
                <p>{props.ElementDetails.vElementJson["vElementDocumentDescription"]}</p>
                <h2>{props.TextResource["DocumentPreview_Title"]}</h2>
                <a href={strLink} style={{ "textDecoration": "underline" }} target="_blank">{props.ElementDetails["vElementJson"]["vDocumentName"]} </a>
            </div>
        );
    };

    return GetContent();
};

export default DocumentManagement_DocumentDetails;
