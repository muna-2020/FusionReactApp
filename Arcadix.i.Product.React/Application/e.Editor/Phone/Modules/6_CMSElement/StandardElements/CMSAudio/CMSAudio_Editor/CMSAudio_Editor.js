//React related imports
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Audio_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Common/CMSAudio_Common';
import CMSAudio_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_ModuleProcessor';
import CMSAudio_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Common/CMSAudio_Common_ModuleProcessor';
import * as CMSAudio_Common_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Common/CMSAudio_Common_Hook';
import * as CMSAudio_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_Hook';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSAudio_Editor
 * @param {object} props props from parent
 * @param {reference} ref ref to component
 * @summary CMSAudio's editor version.
 * @returns {component} CMSAudio_Editor
 */
const CMSAudio_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSAudio_Editor_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSAudio_Editor_" + props.ElementJson.iElementId,
        ["AudioRef"]: useRef(null),
        ["ContextRef"]: useRef(null),
        ["volumeCircleRef"]: useRef(null),
        ["outerContainerRef"]: useRef(null),
        ["CMSAudio_Editor_ModuleProcessor"]: new CMSAudio_Editor_ModuleProcessor(),
        ["CMSAudio_Common_ModuleProcessor"]: new CMSAudio_Common_ModuleProcessor()
    };

    /**
     * @name CMSAudio_Common_Hook.Initialize
     * @summary Initialize method call in CMSAudio_Common_Hook, that contains all the common custom hooks.
     */
    CMSAudio_Common_Hook.Initialize(objContext);

    /**
     * @name CMSAudio_Editor_Hook.Initialize
     * @summary Initialize method call in CMSAudio_Editor_Hook, that contains all the custom hooks for Editor.
     */
    CMSAudio_Editor_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSAudio_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                },
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
                "HandleSliderClick": (blnPlay, blnIncrementReplay) => {
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
                    return {
                        ...objContext.CMSAudio_Common_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <Audio_Common {...objCommonProps} />;
    };

    /**
     * @summary returns JSX of slide element
     * */
    return GetContent();
};

export default CMSAudio_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSAudio_Common_ModuleProcessor; 