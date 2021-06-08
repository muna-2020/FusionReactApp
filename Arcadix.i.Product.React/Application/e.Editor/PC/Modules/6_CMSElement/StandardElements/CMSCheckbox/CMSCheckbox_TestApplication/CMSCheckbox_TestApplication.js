// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Common/CMSCheckbox_Common';
import * as CMSCheckbox_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_TestApplication/CMSCheckbox_TestApplication_Hooks';
import CMSCheckbox_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_TestApplication/CMSCheckbox_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSCheckbox_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary CMSCheckbox's test application version.
 * @returns {component} CMSCheckbox_TestApplication
 */
const CMSCheckbox_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSCheckbox_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSCheckbox_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSCheckbox_TestApplication_" + props.ElementJson.iElementId,
        "CMSCheckbox_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSCheckbox_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSCheckbox_TestApplication_ModuleProcessor);

    /**
     * @name CMSCheckbox_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSCheckbox_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSCheckbox_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnCheckChange": (objValue) => {
                    objContext.CMSCheckbox_TestApplication_ModuleProcessor.OnCheckChange(objContext, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSCheckbox_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     * */
    return GetContent();
};

export default CMSCheckbox_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSCheckbox_TestApplication_ModuleProcessor; 