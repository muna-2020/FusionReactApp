// React related imports.
import React, { useEffect, useReducer } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_Common/CMSTextArea_Common';
import * as CMSTextArea_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_Editor/CMSTextArea_Editor_Hook';
import CMSTextArea_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_Editor/CMSTextArea_Editor_ModuleProcessor';

/**
 * @name CMSTextArea_Editor
 * @param {object} props props from parent
 * @param {Ref} ElementRef ref to component
 * @summary CMSTextArea's editor version.
 * @returns {Component} CMSTextArea Editor
 */
const CMSTextArea_Editor = (props, ElementRef) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSTextArea_Editor_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSTextArea_Editor_" + props.ElementJson.iElementId,
        "CMSTextArea_Editor_ModuleProcessor": new CMSTextArea_Editor_ModuleProcessor(),
        "Ref": React.createRef()
    };

    /**
     * @name CMSTextArea_Editor_Hook.Initialize
     * @summary Initialize method call in CMSTextArea_Editor_Hook, that contains all the custom hooks.
     */
    CMSTextArea_Editor_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSTextArea_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSTextArea_Editor_ModuleProcessor);

    /**
     * @name useEffect
     * @summary this show the context menu for the sub-element.
     */
    useEffect(() => {
     objContext.Ref.current.addEventListener("contextmenu", (event) => {
         event.preventDefault();
         event.stopImmediatePropagation();
        objContext.CMSTextArea_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY)
     });
     objContext.Ref.current.addEventListener("paste", (event) => {
        event.stopImmediatePropagation();
     });
    },[objContext]);

    /**
     * @name GetContent
     * @summary Calls the RenderBody method to get the JSX.
     * @returns {any} JSX of the Component
     * */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event) => {
                    objContext.CMSTextArea_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                },
                "OnKeyPress": (objEvent) => {
                    objEvent.stopPropagation();
                    objEvent.nativeEvent.stopImmediatePropagation();
                },
                "HandleTextAreaOnChange": (objEvent) => {
                    let strDictationValue = objEvent.target.value;
                    objContext.CMSTextArea_Editor_ModuleProcessor.HandleTextAreaOnChange(objContext, strDictationValue);
                }
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "Editor"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Returs the JSX of the Component
     */
    return GetContent();
};

export default CMSTextArea_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTextArea_Editor_ModuleProcessor; 