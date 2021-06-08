// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related fies.
import TrueFalse_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_Common/CMSTrueFalse_Common';
import * as CMSTrueFalse_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_Editor/CMSTrueFalse_Editor_Hooks';
import CMSTrueFalse_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_Editor/CMSTrueFalse_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSTrueFalse_Editor
 * @param {object} props props from parent.
 * @param {any} ref ref to component.
 * @summary CMSTrueFalse's editor version.
 * @returns {any} CMSTrueFalse_Editor.
 */
const CMSTrueFalse_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSTrueFalse_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSTrueFalse_Editor_" + props.ElementJson.iElementId,
        "CMSTrueFalse_Editor_ModuleProcessor": new CMSTrueFalse_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSTrueFalse_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSTrueFalse_Editor_ModuleProcessor);

    /**
     * @name CMSTrueFalse_Editor_Hook.Initialize
     * @summary Initialize method call in CMSTrueFalse_Editor_Hook, that contains all the custom hooks.
     */
    CMSTrueFalse_Editor_Hooks.Initialize(objContext);

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
                    objContext.CMSTrueFalse_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "OnCheckChange": (objValue) => {
                    objContext.CMSTrueFalse_Editor_ModuleProcessor.OnCheckChange(objContext, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSTrueFalse_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <TrueFalse_Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default CMSTrueFalse_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTrueFalse_Editor_ModuleProcessor; 