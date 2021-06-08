// React related imports.
import React from 'react';

/**
 * @name HostHeader
 * @param {object} props props
 * @summary This component is used for HostHeader in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const HostHeader = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>           
                <h2>{Localization.TextFormatter(objTextResource, 'TestCall')}</h2>
                <h3>{Localization.TextFormatter(objTextResource, "HostHeader")}</h3>
                <table>
                    <tr><td style={{ color: "red" }}>To be implemented</td></tr>
                </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Demo" || props.Data.TestData.strTestUsage == "Presentation" || props.Data.TestData.strTestUsage == "Survey" ? GetContent() : <React.Fragment />
    );
    
};

export default HostHeader;
