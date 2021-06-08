// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Common/CMSRadio_Common';
import * as CMSRadio_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/CMSRadio_Editor_Hooks';
import CMSRadio_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/CMSRadio_Editor_ModuleProcessor';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSRadio_Editor
 * @param {object} props props from parent
 * @param {Ref} ElementRef ref to component
 * @summary CMSRadio's editor version.
 * @returns {Component} CMSRadio Editor
 */
const CMSRadio_Editor = (props, ref) => {

     /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSRadio_Editor_Hooks.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props, state, dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSRadio_Editor_" + props.ElementJson.iElementId,
        ["CMSRadio_Editor_ModuleProcessor"]: new CMSRadio_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSRadio_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSRadio_Editor_ModuleProcessor);

    /**
     * @name CMSRadio_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSRadio_Editor_Hooks, that contains all the custom hooks.
     */
    CMSRadio_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the RenderBody method to get the JSX.
     * @returns {any} JSX of the Component
     * */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSRadio_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "ChangeSelection": (objValue) => {
                    objContext.CMSRadio_Editor_ModuleProcessor.ChangeSelection(objContext, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSRadio_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId)
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Returs the JSX of the Component
     */
    return GetContent();
};

export default CMSRadio_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSRadio_Editor_ModuleProcessor; 