//React related imports...
import React from "react";

/**
* @name TaskDetail
* @param {object} props props
* @summary This component displays the Task details.
* @returns {object} jsx.
*/
const TaskDetail = props => {

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        var objTextResource = props.TextResource;
        return <div className="file-explorer-detail">
            <FillHeight
                id={"FillHeight_" + props.Id}
                Meta={{
                    HeaderIds: ["Header", "TaskTitle", "filterHeader"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <h2>{Localization.TextFormatter(objTextResource, 'Task')}</h2>
                <h3>{Localization.TextFormatter(objTextResource, 'General') + ":"}</h3>
                <table>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Name')}</td><td>{props.TaskData.vPageName}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'CustomerID')}</td><td>{props.TaskData.vCustomerTaskId}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Number')}</td><td>{props.TaskData.iPageId}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'GuidId')}</td><td>{props.TaskData.uPageGuid}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Usage')}</td><td>{props.TaskData.iTaskUsageId}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'TimeEstimate')}</td><td>{props.TaskData.iEstimatedTimeToSolveSolveInSeconds}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Points')}</td><td>{"-----"}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'TaskType')}</td><td>{props.TaskData.iTaskTypeId}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Owner')}</td><td>{props.TaskData.strOwner}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'EditedBy')}</td><td>{props.TaskData.strEditedBy}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'CreatedOn')}</td><td>{Localization.DateFormatter(props.TaskData.dtCreatedOn)}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Name')}</td><td>{Localization.DateFormatter(props.TaskData.dtModifiedOn)}</td></tr>
                </table>

                <h3>{Localization.TextFormatter(objTextResource, 'Description') + ":"}</h3>
                <table>
                    <tr><td>{props.TaskData.vPageDescription}</td></tr>
                </table>

                <h3>{Localization.TextFormatter(objTextResource, 'Taxonomy') + ""}</h3>
                <table>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'Subject') + ""}</td>
                        <td>{props.TaskData.strSubjectName}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'SubSubject') + ""}</td>
                        <td>{props.TaskData.strSubSubjectName}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'Category') + ""}</td>
                        <td>{props.TaskData.strCategoryName}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'Competency') + ""}</td>
                        <td>{props.TaskData.strCategoryCompetencyName}</td>
                    </tr>
                </table>

                <h3>{Localization.TextFormatter(objTextResource, 'WorkFlow') + ":"}</h3>
                <table>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Source') + ""}</td><td>{props.TaskData.vSource}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Lektorat') + ""}</td><td></td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'WorkFlowStatus') + ""}</td><td>{props.TaskData.WorkFlowStatus}</td></tr>
                </table>

            </FillHeight>
        </div>;
    }

    return (
        props.TaskData ? GetContent() : <React.Fragment />
    );

};

/**
* @name DynamicStyles
* @param {object} props props
* @summary required for loading the CSS
* @returns {array} arrStyles
*/
TaskDetail.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.IntranetSkinPath +
        "/Css/Application/ReactJs/PC/Modules/Task/TaskDetails/TaskDetails.css"
    ];
    return arrStyles;
};

export default TaskDetail;
