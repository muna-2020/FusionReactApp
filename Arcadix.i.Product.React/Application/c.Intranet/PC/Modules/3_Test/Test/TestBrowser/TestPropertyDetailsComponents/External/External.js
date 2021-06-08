// React related imports.
import React from 'react';

/**
 * @name External
 * @param {object} props props
 * @summary This component is used for External in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const External = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'ExternalTest') + ":"}</h3>
            <table>
                <tr><td>{Localization.TextFormatter(objTextResource, 'ExternalTestUrl')}</td><td>{props.Data.TestData.objTestData.vExternalTestUrl}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'ExternalCertificate')}</td><td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].vExternalCertificateUrl}</td></tr>                
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "External" ? GetContent() : <React.Fragment />
    );
};

export default External;
