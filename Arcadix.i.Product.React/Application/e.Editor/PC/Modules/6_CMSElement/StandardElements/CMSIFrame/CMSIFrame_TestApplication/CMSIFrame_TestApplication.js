// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Common/CMSIFrame_Common';
import * as CMSIFrame_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_TestApplication/CMSIFrame_TestApplication_Hooks';
import CMSIFrame_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_TestApplication/CMSIFrame_TestApplication_ModuleProcessor";

//CMSText Test Application version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSIFrame_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary CMSIFrame's test application version.
 * @returns {component} CMSIFrame_TestApplication
 */
const CMSIFrame_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSIFrame_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSIframe_TestApplication_" + props.ElementJson.iElementId,
        "ComponentAnimationRef": useRef(null),
        "OverlayDiv_Ref": useRef(null),
        "iFrameRef": useRef(null),
        "MainRef": useRef(null),
        "iFrame_LoadedOnceRef": useRef(false),
        "CMSIFrame_TestApplication_ModuleProcessor": new CMSIFrame_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSIFrame_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSIFrame_TestApplication_ModuleProcessor);

    /**
     * @name CMSIFrame_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSIFrame_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSIFrame_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {},
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSIFrame_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
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
    return GetContent();
};

export default CMSIFrame_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSIFrame_TestApplication_ModuleProcessor; 