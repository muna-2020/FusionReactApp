// React related imports.
import React from 'react';

/**
 * @name PreLogin
 * @param {object} props props
 * @summary This component is used for PreLogin in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const PreLogin = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'PreLogin')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ShowPreLogin') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowTeacherLoginPage ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowTeacherLoginPage : "N"}</td>
                </tr>
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Survey" ? GetContent() : <React.Fragment />
    );
};

export default PreLogin;
