// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_Common/CMSDragdropSort_Common';
import * as CMSDragdropSort_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_Editor/CMSDragdropSort_Editor_Hooks';
import CMSDragdropSort_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_Editor/CMSDragdropSort_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSDragdropSort_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSDragdropSort's editor version.
 * @returns {any} CMSDragdropSort_Editor
 */
const CMSDragdropSort_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSDragdropSort_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSDragDropSort_Editor_" + props.ElementJson.iElementId,
        "CMSDragdropSort_Editor_ModuleProcessor": new CMSDragdropSort_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDragdropSort_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSDragdropSort_Editor_ModuleProcessor);

    /**
     * @name CMSDragdropSort_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSDragdropSort_Editor_Hooks, that contains all the custom hooks.
     */
    CMSDragdropSort_Editor_Hooks.Initialize(objContext);

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
                    objContext.CMSDragdropSort_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSDragdropSort_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * @returns {any} JSX
     * */
    return GetContent();
};

export default CMSDragdropSort_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDragdropSort_Editor_ModuleProcessor; 