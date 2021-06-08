//React imports
import React, { useEffect, useReducer } from 'react';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Common/CMSOverlay_Common';
import * as CMSOverlay_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/CMSOverlay_Editor_Hooks';
import CMSOverlay_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/CMSOverlay_Editor_ModuleProcessor";

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSOverlay_Editor
 * @param {object} props component props
 * @param {any} ref component's ref
 * @summary CMS Overlay's editor version
 * @returns {any} CMSOverlay_Editor
 */
const CMSOverlay_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSOverlay_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSOverlay_Editor_" + props.ElementJson.iElementId,
        ["CMSOverlay_Editor_ModuleProcessor"]: new CMSOverlay_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSOverlay_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSOverlay_Editor_ModuleProcessor);

    /**
     * @name CMSOverlay_Editor_Hook.Initialize
     * @summary Initialize method call in CMSOverlay_Editor_Hook, that contains all the custom hooks.
     */
    CMSOverlay_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        if (state.ElementJson["cIsFirstLoad"] && state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.CMSOverlay_Editor_ModuleProcessor.ShowOverlaySidebar(objContext);
        }
        let objProps = {
            "Context": objContext,
            "Events": {
                "ShowOverlaySidebar": (event) => {
                    event.preventDefault();
                    objContext.CMSOverlay_Editor_ModuleProcessor.ShowOverlaySidebar(objContext);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSOverlay_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default CMSOverlay_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSOverlay_Editor_ModuleProcessor; 