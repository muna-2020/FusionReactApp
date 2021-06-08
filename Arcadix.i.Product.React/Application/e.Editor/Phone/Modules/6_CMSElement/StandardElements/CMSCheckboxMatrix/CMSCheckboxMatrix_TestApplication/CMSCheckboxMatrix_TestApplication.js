// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_Common/CMSCheckboxMatrix_Common';
import * as CMSCheckboxMatrix_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_TestApplication/CMSCheckboxMatrix_TestApplication_Hooks';
import CMSCheckboxMatrix_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_TestApplication/CMSCheckboxMatrix_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSCheckboxMatrix_TestApplication
 * @param {object} props component props
 * @param {ref} ref component ref
 * @summary CMSCheckboxMatrix's test application version.
 * @returns {any} CMSCheckboxMatrix_TestApplication
 */
const CMSCheckboxMatrix_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSCheckboxMatrix_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSCheckboxMatrix_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSCheckboxMatrix_TestApplication_" + props.ElementJson.iElementId,
        "CMSCheckboxMatrix_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor);

    /**
     * @name CMSCheckboxMatrix_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSCheckboxMatrix_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSCheckboxMatrix_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnCheckChange": (objRowItem, objColumnItem) => {
                    objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.OnCheckChange(objContext, objRowItem, objColumnItem);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return (
            <Common {...objCommonProps} />
        );
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default CMSCheckboxMatrix_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSCheckboxMatrix_TestApplication_ModuleProcessor; 