//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

import { Recorder } from "vmsg";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

import * as CMSAudio_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData';

const recorder = new Recorder(
    {
        wasmURL: JConfiguration.OnlineBaseUrl + "Library/WebAssembly/vmsg.wasm",
        shimURL: "https://unpkg.com/wasm-polyfill.js@0.2.0/wasm-polyfill.js"
    }
);

/**
 * @name CMSAudioRecorder_Common_ModuleProcessor
 * @summary Contains the Audio's editor version module specific methods.
 * */
class CMSAudioRecorder_Common_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name HandleRecordStart
     * @param {object} objContext {state, props, dispatch, CMSAudioRecorder_Common_ModuleProcessor }
     */
    HandleRecordStart(objContext) {
        recorder
            .init()
            .then((b) => {
                recorder.startRecording();
                objContext.CMSAudioRecorder_Common_ModuleProcessor.SetRecordingStatus(objContext, true);
                console.log(b)
            })
            .catch((err) => {
                console.log("Recording Error", err);
            })
    }

    /**
     * @name HandleRecordStop
     * @param {object} {state, props, dispatch, CMSAudioRecorder_Common_ModuleProcessor }
     */
    HandleRecordStop(objContext) {
        if (recorder) {
            recorder.stopRecording()
                .then((blob) => {
                    console.log("Recorded mp3", blob)
                    var audioURL = window.URL.createObjectURL(blob);
                    objContext.CMSAudioRecorder_Common_ModuleProcessor.SetRecordingStatus(objContext, false);
                    var id = UniqueId.GetUniqueId();
                    var objAudioSource = {
                        "id": id,
                        "name": id + "_Audio.mp3",
                        "cIsBlobSource": "Y",
                        "cIsExternalSourceURL": "Y",
                        "vExternalSourceURL": audioURL
                    };
                    var arrAudioSources = [...objContext.state.ElementJson.vElementJson.AudioSources];
                    if (objContext.state.blnAllowMultipleRecording) {
                        arrAudioSources = [...arrAudioSources, objAudioSource];
                    }
                    else {
                        arrAudioSources = [objAudioSource];
                    }
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "ElementJson": {
                                ...objContext.state.ElementJson, "vElementJson": { ...objContext.state.ElementJson.vElementJson, "AudioSources": arrAudioSources }
                            },
                            "objAudioSource": { ...objAudioSource },
                            "blnLoadAudioPlayer": true,
                            "iCurrentSelectedId": id
                        }
                    });
                    if (objContext.AudioRef.current && objContext.AudioRef.current.ReloadAudio) {
                        objContext.AudioRef.current.ReloadAudio(audioURL);
                    }
                })
                .catch((err) => {
                    console.log("Recording Error", err);
                })
        }
    }

    /**
     * @name HandleOnRadioClick
     * @param {object} objContext {state, props, dispatch, CMSAudioRecorder_Common_ModuleProcessor }
     * @param {integer} id
     */
    HandleOnRadioClick(objContext, id) {
        var arrFilterAudioSources = objContext.state.ElementJson.vElementJson.AudioSources.filter(a => a.id != id);
        var iCurrentSelectedId = objContext.state.iCurrentSelectedId;
        if (arrFilterAudioSources.length == 0) {
            iCurrentSelectedId = -1;
        }
        else if (iCurrentSelectedId == id && arrFilterAudioSources.length > 0) {
            iCurrentSelectedId = arrFilterAudioSources[arrFilterAudioSources.length - 1]["id"];
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson, "vElementJson": { ...objContext.state.ElementJson.vElementJson, "AudioSources": arrFilterAudioSources }
                },
                "iCurrentSelectedId": iCurrentSelectedId,
                "blnLoadAudioPlayer": iCurrentSelectedId == -1 ? false : true
            }
        });
    }

    /**
     * @name 
     * @param {object} objContext {state, dispatch}
     * @param {boolean} blnIsRecording gives recording status
     */
    SetRecordingStatus(objContext, blnIsRecording) {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "blnIsRecording": blnIsRecording } });
    }

    /**
   * @name GetDynamicStyles
   * @param {object} props component props.
   * @summary this returns the styles for the SSR.
   */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSAudioRecoder/CMSAudioRecoder.css"]
    };
}

export default CMSAudioRecorder_Common_ModuleProcessor;
