// React related import
import React from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

import Document_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/5_Document/Document_ModuleProcessor";

const EditorLinkDocumentDetails = (props) => {

    const strLink = props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?FileName=" + props.ElementDetails.uDocumentId + "." + props.ElementDetails.vFileType + "&Type=ProductManagement&DisplayFileName=" + props.ElementDetails.vFileName + "." + props.ElementDetails.vFileType + "&sessionkey=" + JConfiguration.SessionKey;

    const GetContent = () => {
        return (
            <div className="object-detail-document-properties">
                <h2>{props.TextResource["Document_Title"]}</h2>
                <h3>{props.TextResource["Properties"]}</h3>
                <table>
                    <tr>
                        <td>{props.TextResource["Name"]}:</td>
                        <td>{props.ElementDetails["vDocumentName"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["File_Type"]}:</td>
                        <td>{props.ElementDetails["vFileType"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Description"]}:</td>
                        <td>{props.ElementDetails["vDescription"]}</td>
                    </tr>
                </table>
                <h3>{props.TextResource["Description"]}:</h3>
                <p>-</p>
                <h2>{props.TextResource["preview"]}</h2>
                <a style={{ "textDecoration": "underline"}} target="_blank" href={strLink}>{props.ElementDetails["vDocumentName"]} </a>
            </div>
        );
    };

    return GetContent();
};

export default EditorLinkDocumentDetails;