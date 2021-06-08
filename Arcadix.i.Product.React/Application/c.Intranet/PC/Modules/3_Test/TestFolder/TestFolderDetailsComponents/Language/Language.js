// React related imports.
import React from 'react';

/**
 * @name Language
 * @param {object} props props
 * @summary This component is used for Language in TaskFolderDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskFolderDetails.
 */
const Language = props => {

    let objTextResource = props.Resource.Text;

    const GetLanguageDetails = () => {
        return <div> 
                   <h3>{Localization.TextFormatter(objTextResource, 'Languages')}</h3>
                    <table>
                        <tr>
                           <td>{Localization.TextFormatter(objTextResource, 'Languages')}</td>
                           <td>{props.Data.TestFolderData.arrLanguageDetails.map(strLanguageName => {return (strLanguageName+" ") })}</td>
                        </tr>
                    </table>
        </div>        
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <div>
            {props.Data.TestFolderData.t_TestDrive_FileSystem_TestFolder_Language && props.Data.TestFolderData.t_TestDrive_FileSystem_TestFolder_Language.length > 1 ? GetLanguageDetails() : <div/>}
        </div>
    }
    return (
        GetContent()
    );
};

export default Language;