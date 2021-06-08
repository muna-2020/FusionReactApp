// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related fies.
import Checkbox_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Common/CMSCheckbox_Common';
import * as CMSCheckbox_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CMSCheckbox_Editor_Hooks';
import CMSCheckbox_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CMSCheckbox_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSCheckbox_Editor
 * @param {object} props props from parent.
 * @param {any} ref ref to component.
 * @summary CMSCheckbox's editor version.
 * @returns {any} CMSCheckbox_Editor.
 */
const CMSCheckbox_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSCheckbox_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        Element_UndoRedoDataRef,
        dispatch,
        "ModuleName": "CMSCheckbox_Editor_" + props.ElementJson.iElementId,
        "CMSCheckbox_Editor_ModuleProcessor": new CMSCheckbox_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSCheckbox_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSCheckbox_Editor_ModuleProcessor);

    /**
     * @name CMSCheckbox_Editor_Hook.Initialize
     * @summary Initialize method call in CMSCheckbox_Editor_Hook, that contains all the custom hooks.
     */
    CMSCheckbox_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSCheckbox_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "OnCheckChange": (objValue) => {
                    objContext.CMSCheckbox_Editor_ModuleProcessor.OnCheckChange(objContext, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSCheckbox_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <Checkbox_Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default CMSCheckbox_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSCheckbox_Editor_ModuleProcessor; 