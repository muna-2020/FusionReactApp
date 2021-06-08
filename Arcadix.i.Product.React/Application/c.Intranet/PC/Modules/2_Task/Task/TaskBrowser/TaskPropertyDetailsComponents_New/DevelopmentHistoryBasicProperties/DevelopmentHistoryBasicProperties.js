// React related imports.
import React from 'react';

/**
 * @name DevelopmentHistoryBasicProperties
 * @param {object} props props
 * @summary This component is used for DevelopmentHistoryBasicProperties in TaskPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskPropertyDetails.
 */
const DevelopmentHistoryBasicProperties = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
                    <h3>{Localization.TextFormatter(objTextResource, 'General')}</h3>
                    <table>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'Source') + ""}</td> <td>{props.Data.TaskData.vSource}</td></tr>
                    </table>
               </div>
    }
    return (
        GetContent()
    );
};

export default DevelopmentHistoryBasicProperties;
