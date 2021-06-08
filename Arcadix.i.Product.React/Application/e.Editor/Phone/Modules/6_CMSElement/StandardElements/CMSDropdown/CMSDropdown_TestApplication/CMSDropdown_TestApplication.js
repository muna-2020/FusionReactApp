// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Common/CMSDropdown_Common';
import * as CMSDropdown_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_TestApplication/CMSDropdown_TestApplication_Hooks';
import CMSDropdown_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_TestApplication/CMSDropdown_TestApplication_ModuleProcessor";

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

/**
 * @name CMSDropdown_TestApplication
 * @param {object} props component props
 * @param {any} ref componet ref
 * @summary CMSDropdown's test application version.
 * @returns {any} CMSDropdown_TestApplication
 */
const CMSDropdown_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSDropdown_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSDropdown_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSDropdown_TestApplication_" + props.ElementJson.iElementId,
        "CMSDropdown_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name CMSDropdown_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSDropdown_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSDropdown_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDropdown_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSDropdown_TestApplication_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnSelectionChange": (strValue) => {
                    objContext.CMSDropdown_TestApplication_ModuleProcessor.OnSelectionChange(objContext, parseInt(strValue));
                }
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "TestApplication"
        };
        return (<Common {...objCommonProps} />);
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return GetContent();
};

export default CMSDropdown_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDropdown_TestApplication_ModuleProcessor; 