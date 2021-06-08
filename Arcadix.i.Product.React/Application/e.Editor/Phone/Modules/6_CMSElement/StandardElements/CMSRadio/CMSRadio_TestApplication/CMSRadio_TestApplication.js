// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Common/CMSRadio_Common';
import * as CMSRadio_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_TestApplication/CMSRadio_TestApplication_Hooks';
import CMSRadio_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_TestApplication/CMSRadio_TestApplication_ModuleProcessor';

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSRadio_TestApplication
 * @param {object} props pratent props
 * @param {Ref} ref forwaded ref
 * @summary CMSRadio's test application version.
 * @returns {Component} CMSRadio_TestApplication
 */
const CMSRadio_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSRadio_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSRadio_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSRadio_TestApplication_" + props.ElementJson.iElementId,
        "CMSRadio_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSRadio_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSRadio_TestApplication_ModuleProcessor);

    /**
     * @name CMSRadio_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSRadio_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSRadio_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {
                "ChangeSelection": (objValue) => {
                    objContext.CMSRadio_TestApplication_ModuleProcessor.ChangeSelection(objContext, objValue);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSRadio_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Returns the JSX of the component
     */
    return GetContent();
};

export default CMSRadio_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSRadio_TestApplication_ModuleProcessor; 