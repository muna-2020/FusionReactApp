// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Common/CMSMoveableElementHolder_Common';
import * as CMSMoveableElementHolder_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_TestApplication/CMSMoveableElementHolder_TestApplication_Hooks';
import CMSMoveableElementHolder_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_TestApplication/CMSMoveableElementHolder_TestApplication_ModuleProcessor";

//CMSText Test Application version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSMoveableElementHolder_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary CMSMoveableElementHolder's test application version.
 * @returns {component} CMSMoveableElementHolder_TestApplication
 */
const CMSMoveableElementHolder_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSMoveableElementHolder_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSMoveableElementHolder_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSMoveableElementHolder_TestApplication_" + props.ElementJson.iElementId,
        "CMSMoveableElementHolder_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMoveableElementHolder_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSMoveableElementHolder_TestApplication_ModuleProcessor);

    /**
     * @name CMSMoveableElementHolder_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSMoveableElementHolder_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSMoveableElementHolder_TestApplication_Hooks.Initialize(objContext);

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
                    return objContext.CMSMoveableElementHolder_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                },
                "GetMappedElementProps": (objMappedElementJson) => {
                    return {
                        ...objContext.CMSMoveableElementHolder_TestApplication_ModuleProcessor.GetMappedElementProps(objContext, objMappedElementJson),
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
    return GetContent();
};

export default CMSMoveableElementHolder_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSMoveableElementHolder_TestApplication_ModuleProcessor; 