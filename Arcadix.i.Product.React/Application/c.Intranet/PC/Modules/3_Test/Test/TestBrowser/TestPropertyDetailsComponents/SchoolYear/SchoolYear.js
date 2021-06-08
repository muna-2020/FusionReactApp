// React related imports.
import React from 'react';

/**
 * @name SchoolYear
 * @param {object} props props
 * @summary This component is used for SchoolYear in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const SchoolYear = props => {

    let objTextResource = props.Resource.Text;

    const GetSchoolYearDetails = () => {
        return <div> 
                   <h3>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</h3>
                    <table>
                        <tr>                           
                           {props.Data.TestData.arrSchoolYearDetails.map(objSchoolYear => { return <td>{objSchoolYear.SchoolYear}</td> })}
                        </tr>                       
                    </table>
               </div>        
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            {props.Data.TestData.t_TestDrive_Test_AssignedSchoolYear.length > 0 ? GetSchoolYearDetails() : <div/>}
        </div>
    }
    return (
        GetContent()
    );
};

export default SchoolYear;