// React related imports.
import React, { useEffect } from 'react';

//EditorState State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";
import LinkInfoPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_TestApplication/LinkInfoPopup/LinkInfoPopup_ModuleProcessor";


/**
 * @name LinkInfoPopup
 * @summary This component is responsible for loading linkinfo Popup.
 * @param {any} props Component Props.
 * @returns {any} returns JSX
 */
const LinkInfoPopup = (props) => {

    let objContext = {
        props,
        "LinkInfoPopup_ModuleProcessor": new LinkInfoPopup_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.LinkInfoPopup_ModuleProcessor.Initialize(objContext, objContext.LinkInfoPopup_ModuleProcessor);

    const DisplayElement = props.ComponentController.GetComponent(`CMS${props.Data.ElementTypeName}_TestApplication`);
    return (
        <React.Fragment>
            <div className="link-header">
                <h3> Link Info </h3>
            </div>
            <div className="link_popupContent" style={{ "display": "flex", "justifyContent": "center", "padding":"4px" }}>
                <DisplayElement {...props} blnDisplayPurpose="true" ElementJson={props.Data.ElementJson} />
            </div>
            <div className="link_popupContent_footer">            
                <div className="fR">
                     <button className="link_btn" onClick={() => { TestApplicationPopup.ClosePopup(props.Id); }}> Close </button>
                </div>
            </div>
        </React.Fragment>    
    )
};

export default LinkInfoPopup;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LinkInfoPopup_ModuleProcessor; 