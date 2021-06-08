// React related imports.
import React from 'react';

/**
 * @name Filter
 * @param {object} props props
 * @summary This component is used for Filter in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const Filter = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'TestFilter')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Active') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cIsActive ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cIsActive :"N" }</td>
                </tr>
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "Presentation" || props.Data.TestData.strTestUsage == "Demo" || props.Data.TestData.strTestUsage == "LowStake" || props.Data.TestData.strTestUsage == "External" || props.Data.TestData.strTestUsage == "Survey" ?  GetContent() : <React.Fragment/>
    );
};

export default Filter;
