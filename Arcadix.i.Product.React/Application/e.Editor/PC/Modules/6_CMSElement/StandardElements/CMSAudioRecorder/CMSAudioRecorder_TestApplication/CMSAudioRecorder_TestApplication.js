//React related imports
import React, { useReducer, useRef } from 'react';

//Module realted fies.
import AudioRecorder_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Common/CMSAudioRecorder_Common';
import CMSAudioRecorder_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Common/CMSAudioRecorder_Common_ModuleProcessor';
import * as CMSAudioRecorder_Common_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Common/CMSAudioRecorder_Common_Hook';
import * as CMSAudioRecorder_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_TestApplication/CMSAudioRecorder_TestApplication_Hook';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

// CMSAudio testapplication version
import CMSAudio_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_TestApplication/CMSAudio_TestApplication';

/**
 * @name CMSAudioRecorder_TestApplication
 * @param {any} props props from parent
 * @param {any} ref ref to component
 * @summary CMSAudioRecorder's testapplication version.
 */
const CMSAudioRecorder_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSAudioRecorder_TestApplication_Hook.GetInitialState(props));

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
        ["ModuleName"]: "CMSAudioRecorder_TestApplication_" + props.ElementJson.iElementId,
        ["CMSAudioRecorder_Common_ModuleProcessor"]: new CMSAudioRecorder_Common_ModuleProcessor()
    };

    /**
     * @name CMSAudioRecorder_Common_Hook.Initialize
     * @summary Initialize method call in CMSAudioRecorder_Common_Hook, that contains all the custom hooks.
     */
    CMSAudioRecorder_Common_Hook.Initialize(objContext);

    /**
    * @name CMSAudioRecorder_TestApplication_Hook.Initialize
    * @summary Initialize method call in CMSAudioRecorder_TestApplication_Hook, that contains all the custom hooks for TestApplication.
    */
    CMSAudioRecorder_TestApplication_Hook.Initialize(objContext);


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
                "HandleOnChange": (event) => {
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "vExternalSourceURL": event.target.value, "iCurrentSelectedId": event.target.id } });
                    if (objContext.AudioRef.current && objContext.AudioRef.current.ReloadAudio) {
                        objContext.AudioRef.current.ReloadAudio(event.target.value);
                    }
                }
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
                    return { ...objContext.CMSAudioRecorder_Common_ModuleProcessor.GetTextElementProps(objContext, intElementTextId) };
                }
            },
            "TextElement": CMSText_TestApplication,
            "Audio": CMSAudio_TestApplication,
            "AppType": "TestApplication"
        };
        return <AudioRecorder_Common {...objCommonProps} />;
    };

    return GetContent();
};

export default CMSAudioRecorder_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSAudioRecorder_TestApplication; 