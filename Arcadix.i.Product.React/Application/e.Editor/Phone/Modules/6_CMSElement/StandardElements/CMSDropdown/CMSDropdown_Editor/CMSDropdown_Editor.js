//React imports 
import React, { useReducer } from 'react';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Common/CMSDropdown_Common'
import * as CMSDropdown_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/CMSDropdown_Editor_Hooks';
import CMSDropdown_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/CMSDropdown_Editor_ModuleProcessor";

/**
 * @name CMSDropdown_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSDropdown's editor version.
 * @returns {any} CMSDropdown_Editor
 */
const CMSDropdown_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSDropdown_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSDropdown_Editor_" + props.ElementJson.iElementId,
        "CMSDropdown_Editor_ModuleProcessor": new CMSDropdown_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDropdown_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSDropdown_Editor_ModuleProcessor);

    /**
     * @name CMSDropdown_Editor_Hook.Initialize
     * @summary Initialize method call in CMSDropdown_Editor_Hook, that contains all the custom hooks.
     */
    CMSDropdown_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        if (state.ElementJson["cIsFirstLoad"] && state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.CMSDropdown_Editor_ModuleProcessor.ShowDropdownSidebar(objContext);
        }
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "ShowDropdownSidebar": (event) => {
                    event.preventDefault();
                    objContext.CMSDropdown_Editor_ModuleProcessor.ShowDropdownSidebar(objContext);
                }
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSDropdown_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDropdown_Editor_ModuleProcessor; 