// React related imports.
import React from 'react';

/**
 * @name Taxonomy
 * @param {object} props props
 * @summary This component is used for Taxonomy in TaskPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskPropertyDetails.
 */
const Taxonomy = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'Taxonomy') + ""}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Subject') + ""}</td>
                    <td>{props.Data.TaskData.strSubjectName}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'SubSubject') + ""}</td>
                    <td>{props.Data.TaskData.strSubSubjectName}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Category') + ""}</td>
                    <td>{props.Data.TaskData.strCategoryName}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Competency') + ""}</td>
                    <td>{props.Data.TaskData.strCategoryCompetencyName}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'CompetencyRange') + ""}</td>
                    <td>{props.Data.TaskData.strCompetencyRangeName}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'CompetencyLevel') + ""}</td>
                    <td>{props.Data.TaskData.strCompetencyLevelName}</td>
                </tr>
            </table>   
        </div>
    }
    return (
        GetContent()
    );
};

export default Taxonomy;
