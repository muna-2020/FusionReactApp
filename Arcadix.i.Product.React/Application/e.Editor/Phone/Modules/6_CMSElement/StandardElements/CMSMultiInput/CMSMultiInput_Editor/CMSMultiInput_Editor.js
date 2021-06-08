//React imports 
import React, { useReducer, useRef } from 'react';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Common/CMSMultiInput_Common'
import * as CMSMultiInput_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/CMSMultiInput_Editor_Hooks';
import CMSMultiInput_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/CMSMultiInput_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSMultiInput_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSMultiInput's editor version.
 * @returns {any} CMSMultiInput_Editor
 */
const CMSMultiInput_Editor = (props) => {

     /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSMultiInput_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSMultiInput_Editor_" + props.ElementJson.iElementId,
        "CMSMultiInput_Editor_ModuleProcessor": new CMSMultiInput_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMultiInput_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSMultiInput_Editor_ModuleProcessor);

    /**
     * @name CMSMultiInput_Editor_Hook.Initialize
     * @summary Initialize method call in CMSMultiInput_Editor_Hook, that contains all the custom hooks.
     */
    CMSMultiInput_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnOpenContextMenu": (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSMultiInput_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                },
                "ShowMultiInputSidebar": (event) => {
                    event.preventDefault();
                    objContext.CMSMultiInput_Editor_ModuleProcessor.ShowMultiInputSidebar(objContext);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSMultiInput_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        if (state.ElementJson["cIsFirstLoad"] && state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.CMSMultiInput_Editor_ModuleProcessor.ShowMultiInputSidebar(objContext);
        }
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSMultiInput_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSMultiInput_Editor_ModuleProcessor; 