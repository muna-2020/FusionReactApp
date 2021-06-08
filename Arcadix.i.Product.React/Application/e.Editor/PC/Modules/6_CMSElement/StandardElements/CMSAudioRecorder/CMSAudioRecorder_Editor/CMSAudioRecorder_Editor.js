//React related imports
import React, { useReducer, useRef, useState, useEffect, useCallback } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import AudioRecorder_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Common/CMSAudioRecorder_Common';
import CMSAudioRecorder_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Editor/CMSAudioRecorder_Editor_ModuleProcessor';
import CMSAudioRecorder_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Common/CMSAudioRecorder_Common_ModuleProcessor';
import * as CMSAudioRecorder_Common_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Common/CMSAudioRecorder_Common_Hook';
import * as CMSAudioRecorder_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Editor/CMSAudioRecorder_Editor_Hook';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

// CMSAudio editor version
import CMSAudio_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor';

/**
 * @name CMSAudioRecorder_Editor
 * @param {object} props props from parent
 * @param {reference} ref ref to component
 * @summary CMSAudioRecorder's editor version.
 * @returns {component} CMSAudioRecorder_Editor
 */
const CMSAudioRecorder_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSAudioRecorder_Editor_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSAudioRecorder_Editor_" + props.ElementJson.iElementId,
        ["AudioRef"]: useRef(null),
        ["ContextRef"]: useRef(null),
        ["volumeCircleRef"]: useRef(null),
        ["outerContainerRef"]: useRef(null),
        ["CMSAudioRecorder_Editor_ModuleProcessor"]: new CMSAudioRecorder_Editor_ModuleProcessor(),
        ["CMSAudioRecorder_Common_ModuleProcessor"]: new CMSAudioRecorder_Common_ModuleProcessor()
    };

    /**
     * @name CMSAudioRecorder_Common_Hook.Initialize
     * @summary Initialize method call in CMSAudioRecorder_Common_Hook, that contains all the common custom hooks.
     */
    CMSAudioRecorder_Common_Hook.Initialize(objContext);

    /**
     * @name CMSAudioRecorder_Editor_Hook.Initialize
     * @summary Initialize method call in CMSAudioRecorder_Editor_Hook, that contains all the custom hooks for Editor.
     */
    CMSAudioRecorder_Editor_Hook.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSAudioRecorder_Common_ModuleProcessor.Initialize(objContext, objContext.CMSAudioRecorder_Common_ModuleProcessor);

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
                    objContext.CMSAudioRecorder_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                },
                "HandleOnChange": (event) => {
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "vExternalSourceURL": event.target.value, "iCurrentSelectedId": event.target.id } });
                    if (objContext.AudioRef.current && objContext.AudioRef.current.ReloadAudio) {
                        objContext.AudioRef.current.ReloadAudio(event.target.value);
                    }
                },
            },
            "Callbacks": {
                "HandleAudioRecord": (blnIsRecording) => {
                    if (blnIsRecording) {
                        objContext.CMSAudioRecorder_Common_ModuleProcessor.HandleRecordStart(objContext);
                    }
                    else {
                        objContext.CMSAudioRecorder_Common_ModuleProcessor.HandleRecordStop(objContext);
                    }
                    objContext.CMSAudioRecorder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                },
                "HandleOnRadioClick": (id) => {
                    objContext.CMSAudioRecorder_Common_ModuleProcessor.HandleOnRadioClick(objContext, id);
                    objContext.CMSAudioRecorder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                },
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSAudioRecorder_Common_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "Audio": CMSAudio_Editor,
            "AppType": "Editor"
        };
        return <AudioRecorder_Common {...objCommonProps} />;
    };

    /**
     * @summary returns JSX of slide element
     * */
    return GetContent();
};

export default CMSAudioRecorder_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSAudioRecorder_Common_ModuleProcessor; 