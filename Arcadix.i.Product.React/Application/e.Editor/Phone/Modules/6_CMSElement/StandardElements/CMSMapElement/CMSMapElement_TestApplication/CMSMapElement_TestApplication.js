// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Common/CMSMapElement_Common';
import * as CMSMapElement_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_TestApplication/CMSMapElement_TestApplication_Hooks';
import CMSMapElement_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_TestApplication/CMSMapElement_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSMapElement_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary CMSMapElement's test application version.
 * @returns {component} CMSMapElement_TestApplication
 */
const CMSMapElement_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSMapElement_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSMapElement_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSMapElement_TestApplication_" + props.ElementJson.iElementId,
        "CMSMapElement_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMapElement_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSMapElement_TestApplication_ModuleProcessor);

    /**
     * @name CMSMapElement_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSMapElement_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSMapElement_TestApplication_Hooks.Initialize(objContext);

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
                    objContext.CMSMapElement_TestApplication_ModuleProcessor.OnCheckChange(objContext, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSMapElement_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
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

export default CMSMapElement_TestApplication;
