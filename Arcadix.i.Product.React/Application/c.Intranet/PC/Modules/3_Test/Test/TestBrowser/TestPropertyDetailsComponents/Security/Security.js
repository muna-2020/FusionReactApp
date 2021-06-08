// React related imports.
import React from 'react';

/**
 * @name Security
 * @param {object} props props
 * @summary This component is used for Security in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const Security = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'Security') + ":"}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Validity') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cAllowTokenValidityDate ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cAllowTokenValidityDate : "N"}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'TokenActivation') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cAllowTokenActivation ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cAllowTokenActivation : "N"}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'SecureBrowser') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cUseSecuredBrowser ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cUseSecuredBrowser : "N"}</td>
                </tr>
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Survey" || props.Data.TestData.strTestUsage == "Wrapper" ? GetContent() : <React.Fragment />);
    );
};

export default Security;
