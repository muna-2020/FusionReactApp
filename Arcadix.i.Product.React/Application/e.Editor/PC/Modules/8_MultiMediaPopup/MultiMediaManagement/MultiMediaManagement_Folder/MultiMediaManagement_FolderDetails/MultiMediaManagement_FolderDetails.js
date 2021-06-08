// React related import
import React from 'react';

/**
 * @name MultiMediaManagement_FolderDetails
 * @param {object} props props from parent
 * @summary For displaying folder details in MulitMediaManagement
 * @returns {any} retuns JSX
 */
const MultiMediaManagement_FolderDetails = (props) => {
    return (
        <React.Fragment>
            <div className="object-detail-multimedia-folder-properties">
                <h2>{props.TextResource["Folder"]}</h2>
                <h3>{props.TextResource["Base_Data"]}</h3>
                <table>
                    <tr>
                        <td>{props.TextResource["Name"]}:</td>
                        <td>{props.FolderDetails["vElementFolderName"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["No_Of_Objects"]}:</td>
                        <td>{props.FolderDetails["iElementCount"] + props.FolderDetails["iSubNavigationCount"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Created_On"]}:</td>
                        <td>{Localization.DateFormatter(props.FolderDetails.dtCreatedOn)}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Edited_On"]}:</td>
                        <td>{Localization.DateFormatter(props.FolderDetails.dtModifiedOn)}</td>
                    </tr>
                </table>
                <h3>{props.TextResource["Description"]}:</h3>
                <p>{props.FolderDetails["vElementFolderDescription"] !== null ? props.FolderDetails["vElementFolderDescription"] : "-"}</p>
            </div>
        </React.Fragment>
    );
};

export default MultiMediaManagement_FolderDetails;