//React Imports
import React, { useReducer } from 'react';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Common/CMSInput_Common'
import * as CMSInput_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/CMSInput_Editor_Hooks';
import CMSInput_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/CMSInput_Editor_ModuleProcessor";

/**
 * @name CMSInput_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary Editor version of CMSInput
 * @returns {any} CMSInput_Editor
 */
const CMSInput_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSInput_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSInput_Editor_" + props.ElementJson.iElementId,
        ["CMSInput_Editor_ModuleProcessor"]: new CMSInput_Editor_ModuleProcessor()
    };

    /**
     * @name CMSInput_Editor_Hook.Initialize
     * @summary Initialize method call in CMSInput_Editor_Hook, that contains all the custom hooks.
     */
    CMSInput_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "ShowInputSidebar": (event) => {
                    event.preventDefault();
                    objContext.CMSInput_Editor_ModuleProcessor.ShowInputSidebar(objContext);
                }
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "Editor"
        };
        let intTextFieldType = parseInt(props.ElementJson["vElementJson"]["iTextFieldType"]);
        if (intTextFieldType === 5 || intTextFieldType === 6 || intTextFieldType === 7) {
            objCommonProps["Events"] = {};
        }
        else {
            if (state.ElementJson["cIsFirstLoad"] && state.ElementJson["cIsFirstLoad"] === "Y") {
                objContext.CMSInput_Editor_ModuleProcessor.ShowInputSidebar(objContext);
            }
        }
        return <Common {...objCommonProps} />;
    };

    return GetContent();
};

export default CMSInput_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSInput_Editor_ModuleProcessor; 