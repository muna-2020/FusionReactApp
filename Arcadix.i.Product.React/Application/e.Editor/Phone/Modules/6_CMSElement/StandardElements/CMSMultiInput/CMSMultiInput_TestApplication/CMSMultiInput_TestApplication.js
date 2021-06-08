// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Common/CMSMultiInput_Common';
import * as CMSMultiInput_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_TestApplication/CMSMultiInput_TestApplication_Hooks';
import CMSMultiInput_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_TestApplication/CMSMultiInput_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSMultiInput_TestApplication
 * @param {object} props component props
 * @param {any} ref componet ref
 * @summary CMSMultiInput's test application version.
 * @returns {any} CMSMultiInput_TestApplication
 */
const CMSMultiInput_TestApplication = (props) => {

    let objModuleProcessor = new CMSMultiInput_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSMultiInput_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSMultiInput_TestApplication_" + props.ElementJson.iElementId,
        "ValuesDataRef": useRef([]),
        "IsInputChanged": useRef(false),
        "CMSMultiInput_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMultiInput_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSMultiInput_TestApplication_ModuleProcessor);

    /**
     * @name CMSDropdown_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSDropdown_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSMultiInput_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnInputChange": (strValue, objValue) => {
                    objContext.CMSMultiInput_TestApplication_ModuleProcessor.OnInputChange(objContext, strValue, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSMultiInput_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                },
                "VerifyResponse": (strText) => {
                    return objContext.CMSMultiInput_TestApplication_ModuleProcessor.VerifyResponse(objContext, strText);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary calls the GetContent()
     */
    return GetContent();
};

export default CMSMultiInput_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSMultiInput_TestApplication_ModuleProcessor; 