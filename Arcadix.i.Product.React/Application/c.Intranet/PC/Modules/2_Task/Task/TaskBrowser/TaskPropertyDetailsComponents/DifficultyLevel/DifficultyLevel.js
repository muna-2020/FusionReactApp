// React related imports.
import React from 'react';

/**
 * @name DifficultyLevel
 * @param {object} props props
 * @summary This component is used for DifficultyLevel in TaskPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskPropertyDetails.
 */
const DifficultyLevel = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetAssignedDifficultyLevelDetails
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetAssignedDifficultyLevelDetails = () => {
        return <div> 
                   <h3>{Localization.TextFormatter(objTextResource, 'DifficultyPerGradeLevel')}</h3>
            <table>
                {
                //<tr style={{ background: "gainsboro"}}>
                //    <td>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</td>
                //    <td>{Localization.TextFormatter(objTextResource, 'DifficultyLevel')}</td>
                //</tr>
                //{props.Data.TaskData.arrAssignedDifficultyLevelDetails.map( objAssignedDifficultyLevelDetail => {
                //        return <tr>
                //                    <td>{objAssignedDifficultyLevelDetail["SchoolYear"]}</td>
                //                    <td>{objAssignedDifficultyLevelDetail["DifficultyLevel"]}</td>
                //                </tr>                                           
                //})} 
                }
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'DifficultyLevel')}</td>
                    <td>{props.Data.TaskData.strDifficultyLevel}</td>
                </tr>
            </table>
               </div>        
    }


    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component based on condition.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            {props.Data.TaskData.strDifficultyLevel != "" ? GetAssignedDifficultyLevelDetails() : <div/>}
        </div>
    }
    return (
        GetContent()
    );
};

export default DifficultyLevel;