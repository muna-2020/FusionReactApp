// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_Common/CMSTextArea_Common';
import * as CMSTextArea_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_TestApplication/CMSTextArea_TestApplication_Hook';
import CMSTextArea_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_TestApplication/CMSTextArea_TestApplication_ModuleProcessor';

/**
 * @name CMSTextArea_TestApplication
 * @param {object} props props from parent
 * @param {Ref} ElementRef ref to component
 * @summary CMSTextArea's TestApplication version.
 * @returns {Component} CMSTextArea TestApplication
 */
const CMSTextArea_TestApplication = (props, ElementRef) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSTextArea_TestApplication_Hook.GetInitialState(props, new CMSTextArea_TestApplication_ModuleProcessor()));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSTextArea_TestApplication_" + props.ElementJson.iElementId,
        "CMSTextArea_TestApplication_ModuleProcessor": new CMSTextArea_TestApplication_ModuleProcessor(),
        "Ref": React.createRef()
    };

    CMSTextArea_TestApplication_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the RenderBody method to get the JSX.
     * @returns {any} JSX of the Component
     * */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {
                "HandleTextAreaOnChange": (objEvent) => {
                    let strDictationValue = objEvent.target.value;
                    objContext.CMSTextArea_TestApplication_ModuleProcessor.HandleTextAreaOnChange(objContext, strDictationValue);
                }
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "TestApplication"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Returs the JSX of the Component
     */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default CMSTextArea_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTextArea_TestApplication_ModuleProcessor; 