//React related imports
import React, { useReducer, useRef } from 'react';

//Module realted fies.
import Audio_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Common/CMSAudio_Common';
import CMSAudio_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Common/CMSAudio_Common_ModuleProcessor';
import * as CMSAudio_Common_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Common/CMSAudio_Common_Hook';
import * as CMSAudio_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_TestApplication/CMSAudio_TestApplication_Hook';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSAudio_TestApplication
 * @param {any} props props from parent
 * @param {any} ref ref to component
 * @summary CMSAudio's testapplication version.
 */
const CMSAudio_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSAudio_TestApplication_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        ["AudioRef"]: useRef(null),
        ["ContextRef"]: useRef(null),
        ["volumeCircleRef"]: useRef(null),
        ["outerContainerRef"]: useRef(null),
        ["ModuleName"]: "CMSAudio_TestApplication_" + props.ElementJson.iElementId,
        ["CMSAudio_Common_ModuleProcessor"]: new CMSAudio_Common_ModuleProcessor()
    };

    /**
     * @name CMSAudio_Common_Hook.Initialize
     * @summary Initialize method call in CMSAudio_Common_Hook, that contains all the custom hooks.
     */
    CMSAudio_Common_Hook.Initialize(objContext);

    /**
    * @name CMSAudio_TestApplication_Hook.Initialize
    * @summary Initialize method call in CMSAudio_TestApplication_Hook, that contains all the custom hooks for TestApplication.
    */
    CMSAudio_TestApplication_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnPlayerTimeUpdate": () => {
                    objContext.CMSAudio_Common_ModuleProcessor.HandlePlayerTimeUpdate(objContext);
                },
                "OnEnded": () => {
                    objContext.CMSAudio_Common_ModuleProcessor.HandleOnEnd(objContext);
                },
                "OnPlaying": () => {
                    objContext.CMSAudio_Common_ModuleProcessor.HandleOnPlay(objContext);
                },
                "HandleLoadedMetaData": (event) => {
                    objContext.CMSAudio_Common_ModuleProcessor.HandleMetaDataLoad(objContext);
                },
                "HandleSliderClick": (blnPlay, blnIncrementReplay = true) => {
                    objContext.CMSAudio_Common_ModuleProcessor.HandleSliderClick(objContext, blnPlay, blnIncrementReplay);
                },
                "HandleValueChange": (iCurrentTime) => {
                    objContext.CMSAudio_Common_ModuleProcessor.HandleValueChange(objContext, iCurrentTime);
                },
                "HandleVolumeChange": (iVolume) => {
                    objContext.CMSAudio_Common_ModuleProcessor.HandleVolumeChange(objContext, iVolume);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return { ...objContext.CMSAudio_Common_ModuleProcessor.GetTextElementProps(objContext, intElementTextId) };
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Audio_Common {...objCommonProps} />;
    };

    /**
    * @summary returns JSX of audio element
    * */
    return GetContent();
};

export default CMSAudio_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSAudio_TestApplication; 