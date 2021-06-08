// React related imports.
import React from 'react';

/**
 * @name SecurityTestNumber
 * @param {object} props props
 * @summary This component is used for SecurityTestNumber in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const SecurityTestNumber = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div> 
            <h3>{Localization.TextFormatter(objTextResource, 'SecurityTestNumber') + ":"}</h3>
            <table>
                <tr><td style={{ color: "red" }}> To be implemented (Pupil and Teacher templates)</td></tr>
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Survey" || props.Data.TestData.strTestUsage == "Wrapper" ? GetContent() : <React.Fragment />
    );
};

export default SecurityTestNumber;
