// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module related fies.
import IFrame_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Common/CMSIFrame_Common';
import * as CMSIFrame_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Editor/CMSIFrame_Editor_Hooks';
import CMSIFrame_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Editor/CMSIFrame_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSIFrame_Editor
 * @param {object} props props from parent.
 * @param {ref} ref ref to component.
 * @summary CMSIFrame's editor version.
 * @returns {component} CMSIFrame_Editor.
 */
const CMSIFrame_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSIFrame_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSIframe_Editor_" + props.ElementJson.iElementId,
        "ComponentAnimationRef": useRef(null),
        "OverlayDiv_Ref": useRef(null),
        "iFrameRef": useRef(null),
        "MainRef": useRef(null),
        "iFrame_LoadedOnceRef": useRef(false),
        "CMSIFrame_Editor_ModuleProcessor": new CMSIFrame_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSIFrame_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSIFrame_Editor_ModuleProcessor);

    /**
     * @name CMSIFrame_Editor_Hook.Initialize
     * @summary Initialize method call in CMSIFrame_Editor_Hook, that contains all the custom hooks.
     */
    CMSIFrame_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSIFrame_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSIFrame_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        if (state.ElementJson["cIsFirstLoad"] && state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.CMSIFrame_Editor_ModuleProcessor.ShowPropertiesSidebar({ objContext });
        }
        return <IFrame_Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSIFrame_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSIFrame_Editor_ModuleProcessor; 