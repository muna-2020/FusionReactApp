// React related imports.
import React from 'react';

/**
 * @name Algorithm
 * @param {object} props props
 * @summary This component is used for Algorithm in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const Algorithm = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div> 
            <h2>{Localization.TextFormatter(objTextResource, 'Algorithm')}</h2>
            <h3>{Localization.TextFormatter(objTextResource, 'DisplayOptions')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, "Algorithm") + ":"}</td>
                    <td>{props.Data.TestData.strAlgorithm}</td>
                </tr>
                <tr><td>{Localization.TextFormatter(objTextResource, "LinearIndex") + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowLinearIndex ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowLinearIndex :"N"}</td>
                </tr>
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage != "External" ? GetContent() : <div />
    );
};

export default Algorithm;
