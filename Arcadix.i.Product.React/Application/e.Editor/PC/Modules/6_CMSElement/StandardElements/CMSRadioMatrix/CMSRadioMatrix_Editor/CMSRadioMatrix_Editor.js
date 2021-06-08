//React imports
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_Common/CMSRadioMatrix_Common';
import * as CMSRadioMatrix_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_Editor/CMSRadioMatrix_Editor_Hooks';
import CMSRadioMatrix_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_Editor/CMSRadioMatrix_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSRadioMatrix_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSRadioMatrix's editor version.
 * @returns {any}  CMSRadioMatrix_Editor
 */
const CMSRadioMatrix_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSRadioMatrix_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSRadioMatrix_Editor_" + props.ElementJson.iElementId,
        ["CMSRadioMatrix_Editor_ModuleProcessor"]: new CMSRadioMatrix_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSRadioMatrix_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSRadioMatrix_Editor_ModuleProcessor);

    /**
     * @name CMSRadioMatrix_Editor_Hook.Initialize
     * @summary Initialize method call in CMSRadioMatrix_Editor_Hook, that contains all the custom hooks.
     */
    CMSRadioMatrix_Editor_Hooks.Initialize(objContext);

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
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "ChangeSelection": (objRowItem, objColumnItem) => {
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.ChangeSelection(objContext, objRowItem, objColumnItem);
                },
                "OnBlur": (objTextElementJson) => {
                    objContext.CMSRadioMatrix_Editor_ModuleProcessor.OnBlur(objContext, objTextElementJson);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSRadioMatrix_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId)
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
     */
    return GetContent();
};

export default CMSRadioMatrix_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSRadioMatrix_Editor_ModuleProcessor; 