//React Imports
import React from 'react';

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';
import WikiInfoPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_TestApplication/WikiInfoPopup/WikiInfoPopup_ModuleProcessor";

/**
 * @name WikiInfoPopup
 * @param {object} props parent props
 * @summary Contains the JSX for wiki info popup.
 * @returns {any} JSX
 */
const WikiInfoPopup = (props) => {

    let objContext = {
        props,
        "WikiInfoPopup_ModuleProcessor": new WikiInfoPopup_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.WikiInfoPopup_ModuleProcessor.Initialize(objContext, objContext.WikiInfoPopup_ModuleProcessor);

    const GetTextElementProps = () => {
        let objTextElementJson = props.Data.ElementJson["vElementJson"]["TextElements"][0];
        let objTextElementProps = {
            ...props,
            ["ComponentController"]: props.Data.ComponentController,
            ["ElementRef"]: objTextElementJson["Ref"] ? objTextElementJson["Ref"] : React.createRef(),
            ["ParentRef"]: React.createRef(),
            ["ElementJson"]: {
                ...objTextElementJson,
                ["TextRef"]: objTextElementJson["TextRef"] ? objTextElementJson["TextRef"] : React.createRef(),
            },
            ["IsSubElement"]: true
        };
        return objTextElementProps;
    }

    /**
     * @name GetContent
     * @summary Contains the JSX of the component.
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let objTextElementProps = GetTextElementProps();
        return (
            <div>
                <p className="wikiinfopopup-heading">
                    <b dangerouslySetInnerHTML={{ __html: props.Data.ElementJson["vElementJson"]["Values"][0]["vWikiKeyword"] }}>
                    </b>
                </p>
                <p className="wikiinfopopup-details">
                    <CMSText_TestApplication {...objTextElementProps} />
                </p>
            </div>
        );
    };

    /**
     * @summary Calls the GetContent().
     * */
    return GetContent();
};

export default WikiInfoPopup;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = WikiInfoPopup_ModuleProcessor; 
