//React imports
import React, { useReducer } from 'react';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Common/CMSWiki_Common';
import * as CMSWiki_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/CMSWiki_Editor_Hooks';
import CMSWiki_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/CMSWiki_Editor_ModuleProcessor";

/**
 * @name CMSWiki_Editor
 * @param {object} props component props
 * @param {any} ref component's ref
 * @summary CMS Wiki's editor version
 * @returns {any} CMSWiki_Editor
 */
const CMSWiki_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSWiki_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSWiki_Editor_" + props.ElementJson.iElementId,
        ["CMSWiki_Editor_ModuleProcessor"]: new CMSWiki_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSWiki_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSWiki_Editor_ModuleProcessor);

    /**
     * @name CMSWiki_Editor_Hook.Initialize
     * @summary Initialize method call in CMSWiki_Editor_Hook, that contains all the custom hooks.
     */
    CMSWiki_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        // Selection.SetCaretAtLast("subelement_" + state.ElementJson["iElementId"], true);
        if (state.ElementJson["cIsFirstLoad"] && state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.CMSWiki_Editor_ModuleProcessor.ShowWikiSidebar(objContext);
        }
        let objProps = {
            "Context": objContext,
            "Events": {
                "ShowWikiSidebar": (event) => {
                    event.preventDefault();
                    objContext.CMSWiki_Editor_ModuleProcessor.ShowWikiSidebar(objContext);
                }
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "Editor"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default CMSWiki_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSWiki_Editor_ModuleProcessor; 