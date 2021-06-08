//React related imports
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Common/CMSVideo_Common';
import CMSVideo_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Common/CMSVideo_Common_ModuleProcessor';
import * as CMSVideo_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_TestApplication/CMSVideo_TestApplication_Hook';
import * as CMSVideo_Common_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Common/CMSVideo_Common_Hook';

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSVideo_TestApplication
 * @param {any} props props from parent
 * @param {any} ref ref to component
 * @summary CMSVideo's editor version.
 */
const CMSVideo_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSVideo_TestApplication_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSVideo_TestApplication_" + props.ElementJson.iElementId,
        ["CMSVideo_Common_ModuleProcessor"]: new CMSVideo_Common_ModuleProcessor(),
        ["Ref"]: useRef(null),
        ["ContextRef"]: useRef(null),
        ["outerContainerRef"]: useRef(null),
        ["VideoPlayerRef"]: useRef(null)
    };

    /**
    * @name CMSVideo_Common_Hook.Initialize
    * @summary Initialize method call in CMSVideo_Common_Hook, that contains all the common custom hooks.
    */
    CMSVideo_Common_Hook.Initialize(objContext);

    /**
     * @name CMSVideo_TestApplication_Hook.Initialize
     * @summary Initialize method call in CMSVideo_TestApplication_Hook, that contains all the custom hooks.
     */
    CMSVideo_TestApplication_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {JSX} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnPlayerTimeUpdate": () => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandlePlayerTimeUpdate(objContext);
                },
                "OnEnded": () => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleOnEnd(objContext);
                },
                "OnPlaying": () => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleOnPlay(objContext);
                },
                "HandleLoadedMetaData": (event) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleMetaDataLoad(objContext);
                },
                "HandleSliderClick": (blnPlay, blnIncrementReplay) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleSliderClick(objContext, blnPlay, blnIncrementReplay);
                },
                "HandleValueChange": (iCurrentTime) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleValueChange(objContext, iCurrentTime);
                },
                "HandleVolumeChange": (iVolume) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleVolumeChange(objContext, iVolume);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSVideo_Common_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                },
                "GetVideoPath": () => {
                    return objContext.CMSVideo_Common_ModuleProcessor.GetVideoPath(objContext);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    return GetContent()
};

export default CMSVideo_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSVideo_Common_ModuleProcessor; 