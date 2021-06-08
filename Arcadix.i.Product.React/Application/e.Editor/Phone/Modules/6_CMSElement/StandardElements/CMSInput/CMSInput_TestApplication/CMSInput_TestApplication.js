// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Common/CMSInput_Common';
import * as CMSInput_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_TestApplication/CMSInput_TestApplication_Hooks';
import CMSInput_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_TestApplication/CMSInput_TestApplication_ModuleProcessor";

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

/**
 * @name CMSInput_TestApplication
 * @param {object} props component props
 * @param {any} ref componet ref
 * @summary CMSInput's test application version.
 * @returns {any} CMSInput_TestApplication
 */
const CMSInput_TestApplication = (props) => {

    let objModuleProcessor = new CMSInput_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSInput_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state, dispatch, props,
        "ModuleName": "CMSInput_TestApplication_" + props.ElementJson.iElementId,
        "CMSInput_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name CMSDropdown_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSDropdown_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSInput_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnInputChange": (strValue) => {
                    objContext.CMSInput_TestApplication_ModuleProcessor.OnInputChange(objContext, strValue);
                }
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary calls the GetContent()
     */
    return GetContent();
};

export default CMSInput_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSInput_TestApplication_ModuleProcessor; 