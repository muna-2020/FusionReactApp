//React imports
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_Common/CMSCheckboxMatrix_Common';
import * as CMSCheckboxMatrix_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_Editor/CMSCheckboxMatrix_Editor_Hooks';
import CMSCheckboxMatrix_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_Editor/CMSCheckboxMatrix_Editor_ModuleProcessor";

//CMSText Editor version.
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSCheckboxMatrix_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSCheckboxMatrix's editor version.
 * @returns {any} CMSCheckboxMatrix_Editor
 */
const CMSCheckboxMatrix_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSCheckboxMatrix_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSCheckboxMatrix_Editor_" + props.ElementJson.iElementId,
        ["CMSCheckboxMatrix_Editor_ModuleProcessor"]: new CMSCheckboxMatrix_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSCheckboxMatrix_Editor_ModuleProcessor);

    /**
     * @name CMSCheckboxMatrix_Editor_Hook.Initialize
     * @summary Initialize method call in CMSCheckboxMatrix_Editor_Hook, that contains all the custom hooks.
     */
    CMSCheckboxMatrix_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "OnCheckChange": (objRowItem, objColumnItem) => {
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.OnCheckChange(objContext, objRowItem, objColumnItem);
                },
                "OnBlur": (objTextElementJson) => {
                    objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.OnBlur(objContext, objTextElementJson);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return (
            <Common {...objCommonProps} />
        );
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSCheckboxMatrix_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSCheckboxMatrix_Editor_ModuleProcessor; 