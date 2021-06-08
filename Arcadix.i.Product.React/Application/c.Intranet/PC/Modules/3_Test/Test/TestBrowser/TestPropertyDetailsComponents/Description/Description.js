// React related imports.
import React from 'react';

/**
 * @name Description
 * @param {object} props props
 * @summary This component is used for Description in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const Description = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div> 
            <h3>{Localization.TextFormatter(objTextResource, 'Description') + ":"}</h3>
            <table>
                <tr><td>{props.Data.TestData.vTestDescription}</td></tr>
            </table>
        </div>
    }
    return (
        GetContent()
    );
};

export default Description;
