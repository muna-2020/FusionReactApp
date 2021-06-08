// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_Common/CMSRadioMatrix_Common';
import * as CMSRadioMatrix_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_TestApplication/CMSRadioMatrix_TestApplication_Hooks';
import CMSRadioMatrix_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_TestApplication/CMSRadioMatrix_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSRadioMatrix_TestApplication
 * @param {object} props component props
 * @param {ref} ref componet ref
 * @summary CMSRadioMatrix's test application version.
 * @returns {any} CMSRadioMatrix_TestApplication
 */
const CMSRadioMatrix_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSRadioMatrix_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSRadioMatrix_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state, dispatch, props,
        "ModuleName": "CMSRadioMatrix_TestApplication_" + props.ElementJson.iElementId,
        "CMSRadioMatrix_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSRadioMatrix_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSRadioMatrix_TestApplication_ModuleProcessor);

    /**
     * @name CMSRadioMatrix_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSRadioMatrix_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSRadioMatrix_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "ChangeSelection": (objRowItem, objColumnItem) => {
                    objContext.CMSRadioMatrix_TestApplication_ModuleProcessor.ChangeSelection(objContext, objRowItem, objColumnItem);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSRadioMatrix_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId)
                    };
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default CMSRadioMatrix_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSRadioMatrix_TestApplication_ModuleProcessor; 