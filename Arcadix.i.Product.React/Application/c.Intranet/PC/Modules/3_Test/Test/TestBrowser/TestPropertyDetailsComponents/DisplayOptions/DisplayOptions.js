// React related imports.
import React from 'react';

/**
 * @name DisplayOptions
 * @param {object} props props
 * @summary This component is used for DisplayOptions in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const DisplayOptions = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h2>{Localization.TextFormatter(objTextResource, 'Timekeeping')}</h2>
            <h3>{Localization.TextFormatter(objTextResource, 'DisplayOptions')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Progress') + ":"}</td>
                    <td>{props.Data.TestData.strProgressDisplay}</td>
                    </tr>
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Survey" ? GetContent() : <React.Fragment />
    );
};

export default DisplayOptions;
