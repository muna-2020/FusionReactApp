//React related imports
import React, { useEffect, useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Common/CMSMultiPageElement_Common';
import CMSMultiPageElement_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_TestApplication/CMSMultiPageElement_TestApplication_ModuleProcessor';
import * as CMSMultiPageElement_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_TestApplication/CMSMultiPageElement_TestApplication_Hook';

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

import CMSImage_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_TestApplication/CMSImage_TestApplication';
/**
 * @name CMSMultiPageElement_TextApplication
 * @param {any} props props from parent
 * @param {any} ref ref to component
 * @summary CMSMultiPageElement's editor version.
 * @returns {any} returns JSX
 */
const CMSMultiPageElement_TextApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSMultiPageElement_TestApplication_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "slideContainer": useRef(null),
        "slideWrapper": useRef(null),
        "ModuleName": "CMSMultiPageElement_TestApplication_" + props.ElementJson.iElementId,
        ["CMSMultiPageElement_TestApplication_ModuleProcessor"]: new CMSMultiPageElement_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMultiPageElement_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSMultiPageElement_TestApplication_ModuleProcessor);

    /**
     * @name CMSMultiPageElement_TestApplication_Hook.Initialize
     * @summary Initialize method call in CMSMultiPageElement_TestApplication_Hook, that contains all the custom hooks.
     */
    CMSMultiPageElement_TestApplication_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the RenderBody method to get the JSX.
     * @returns {JSX} JSX of the Component
     * */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "HandleSlideNavigation": (strNavigateTo, blnButtonDisabled) => {
                    if (!blnButtonDisabled) {
                        objContext.CMSMultiPageElement_TestApplication_ModuleProcessor.HandleSlideNavigation(objContext, strNavigateTo);
                    }
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSMultiPageElement_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                },
                "AddOrDeleteSlide": (intSelectedIndex) => {
                    objContext.CMSMultiPageElement_TestApplication_ModuleProcessor.AddOrDeleteSlide(objContext, intSelectedIndex);
                }
            },
            "TextElement": CMSText_TestApplication,
            "ImageElement": CMSImage_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default CMSMultiPageElement_TextApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSMultiPageElement_TestApplication_ModuleProcessor; 