// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Common/CMSText_Common';
import * as CMSText_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication_Hooks';
import CMSText_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication_ModuleProcessor';

//Components used.
import Text_TestApplication from "@root/Application/e.Editor/PC/Modules/7_Text/Text_TestApplication/Text_TestApplication";

/**
 * @name CMSText_TestApplication
 * @param {obejct} props props from parent
 * @param {ref} ref forwarded ref
 * @summary CMSText's test application version.
 * @returns {any} CMSText_TestApplication
 */
const CMSText_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSText_TestApplication_Hooks.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSText_TestApplication_" + props.ElementJson.iElementId,
        "CMSText_TestApplication_ModuleProcessor": new CMSText_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSText_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSText_TestApplication_ModuleProcessor);

    /**
     * @name CMSText_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSText_TestApplication_Hooks, that contains all the custom hooks.
     * @returns null
     */
    CMSText_TestApplication_Hooks.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Calls the render body function of the common.
    * @returns {any} JSX
    */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnStartClick": () => objContext.CMSText_TestApplication_ModuleProcessor.OnStartClick(objContext)
            },
            "Callbacks": {},
            "TextElement": Text_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is loaded and then calls the GetContent().
     * @returns {any} JSX
     * */
    return GetContent();
};

export default CMSText_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSText_TestApplication_ModuleProcessor; 