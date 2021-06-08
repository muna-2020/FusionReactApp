// React related imports.
import React from 'react';

/**
 * @name AdditionalProperties
 * @param {object} props props
 * @summary This component is used for AdditionalProperties in TaskPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskPropertyDetails.
 */
const AdditionalProperties = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetAssignedAdditionalPropertyDetails
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetAssignedAdditionalPropertyDetails = () => {
        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'AdditionalProperties')}</h3>
            <table>
                <tr style={{ background: "gainsboro" }}>
                    <td>{Localization.TextFormatter(objTextResource, 'AddtionalTaskProperty')}</td>
                    <td>{Localization.TextFormatter(objTextResource, 'AddtionalTaskPropertyValue')}</td>
                </tr>

                {props.Data.TaskData.arrAssignedAdditionalPropertyDetails.map(objAssignedAdditionalPorpertyDetail => {
                    return <tr>
                        <td>{objAssignedAdditionalPorpertyDetail["PropertyName"]}</td>
                        <td>{objAssignedAdditionalPorpertyDetail["PropertyValue"]}</td>
                    </tr>
                })}
            </table>
        </div>
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component based on condition.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            {props.Data.TaskData.arrAssignedAdditionalPropertyDetails && props.Data.TaskData.arrAssignedAdditionalPropertyDetails.length > 0 ? GetAssignedAdditionalPropertyDetails() : <div />}
        </div>
    }
    return (
        GetContent()
    );
};

export default AdditionalProperties;