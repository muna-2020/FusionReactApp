// React related imports.
import React from 'react';

/**
 * @name HostHeader
 * @param {object} props props
 * @summary This component is used for HostHeader in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const HostHeader = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>
                <div className="title">{Localization.TextFormatter(objTextResource, "HostHeader")}</div>                       
               
                <table className="add-edit-test-table align-center w-100">
                    <tr>
                        <th>{Localization.TextFormatter(objTextResource, "IIS")}</th>
                        <th>{Localization.TextFormatter(objTextResource, "Domain")}</th>
                        <th>{Localization.TextFormatter(objTextResource, "Hostheader")}</th>
                    </tr>
                    <tr>
                        <td colspan="3">{Localization.TextFormatter(objTextResource, "HostHeaderNote")}</td>
                    </tr>
                </table>
                <div className="align-right mt-10 mb-10">
                    <button className="btn">
                        {Localization.TextFormatter(objTextResource, "AddButton")}
                        </button>
                </div>
        </React.Fragment>      
    }

    return (
        //GetContent()
        <React.Fragment>
        <div className="title">{Localization.TextFormatter(objTextResource, "HostHeader")}</div>
        <div className="mb-10" style={{color:"red"}}> To be implemented</div>
        </React.Fragment>
    );
};

export default HostHeader;