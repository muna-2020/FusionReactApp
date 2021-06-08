// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_Common/CMSTrueFalse_Common';
import * as CMSTrueFalse_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_TestApplication/CMSTrueFalse_TestApplication_Hooks';
import CMSTrueFalse_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_TestApplication/CMSTrueFalse_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSTrueFalse_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary CMSTrueFalse's test application version.
 * @returns {component} CMSTrueFalse_TestApplication
 */
const CMSTrueFalse_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSTrueFalse_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state, dispatch, props,
        "ModuleName": "CMSTrueFalse_TestApplication_" + props.ElementJson.iElementId,
        ["CMSTrueFalse_TestApplication_ModuleProcessor"]: new CMSTrueFalse_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSTrueFalse_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSTrueFalse_TestApplication_ModuleProcessor);

    /**
     * @name CMSTrueFalse_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSTrueFalse_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSTrueFalse_TestApplication_Hooks.Initialize(objContext);

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
                    objContext.CMSTrueFalse_TestApplication_ModuleProcessor.OnCheckChange(objContext, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSTrueFalse_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
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
    return state.isLoadComplete ? GetContent() : "";
};

export default CMSTrueFalse_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTrueFalse_TestApplication_ModuleProcessor; 