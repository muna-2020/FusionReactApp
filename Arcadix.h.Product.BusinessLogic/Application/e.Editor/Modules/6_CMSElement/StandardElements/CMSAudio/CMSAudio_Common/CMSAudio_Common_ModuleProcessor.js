//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSAudio_Common_ModuleProcessor
 * @summary Contains the Audio's editor version module specific methods.
 * */
class CMSAudio_Common_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
        * @name HandlePlayerTimeUpdate
        * @param {object} objContext {state, props, dispatch}
        * @summary this event is fired every time when player update the time
        */
    HandlePlayerTimeUpdate(objContext) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objAudioControl": {
                    ...objContext.state.objAudioControl,
                    "iCurrentTime": Math.ceil(objContext.AudioRef.current.currentTime),
                    "boolResetControls": false
                }
            }
        });
    }

    /**
     * @name HandlePlayerTimeUpdate
     * @param {object} objContext {state, props, dispatch}
     * @summary this event is fired when an audio/video has ended
     */
    HandleOnEnd(objContext) {
        objContext.AudioRef.current.currentTime = 0;
        objContext.AudioRef.current.pause();
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objAudioControl": {
                    ...objContext.state.objAudioControl,
                    "boolPlay": false,
                    "boolTrackEnd": true
                }
            }
        });
    }

    /**
     * @name HandleMetaDataLoad
     * @param {object} objContext {state, props, dispatch}
     * @summary event occurs when meta data of an audio/video is loaded
     */
    HandleMetaDataLoad(objContext) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objAudioControl": {
                    ...objContext.state.objAudioControl,
                    "boolMediaLoaded": true,
                }
            }
        })
    }

    /**
      * @name HandleSliderClick
      * @param {object} objContext {state, props, dispatch}
      * @param {boolean} blnPlay
      * @param {boolean} blnIncrementReplay
      * @summary passed as a callback to the slider element
      * */
    HandleSliderClick(objContext, blnPlay, blnIncrementReplay = true) {
        let objAudioControl = { ...objContext.state.objAudioControl, "boolPlay": blnPlay };
        if (blnPlay && blnIncrementReplay) {
            objAudioControl = { ...objAudioControl, "iReplayPlayed": objContext.state.objAudioControl.iReplayPlayed + 1 };
        }
        if (objAudioControl.boolTrackEnd) {
            objAudioControl = { ...objAudioControl, "boolTrackEnd": false };
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objAudioControl": objAudioControl
            }
        });
    }

    /**
     * @name HandleValueChange
     * @param {any} objContext {state, props, dispatch}
     * @param {number} iCurrentTime
     * @summary executed when slider cursor is moved
     */
    HandleValueChange(objContext, iCurrentTime) {
        objContext.AudioRef.current.currentTime = iCurrentTime;
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objAudioControl": {
                    ...objContext.state.objAudioControl,
                    "iCurrentTime": iCurrentTime
                }
            }
        });
    }

    /**
     * @name HandleOnPlay
     * @param {object} objContext {state, props, dispatch}
     * @summary fires when an audio/video is playing
     */
    HandleOnPlay(objContext) {
        if (!objContext.state.objAudioControl.boolPlay) {
            objContext.AudioRef.current.pause();
            objContext.AudioRef.current.currentTime = 0;
        }
    }

    /**
     * @name HandleVolumeChange
     * @param {object} objContext {state, props, dispatch}
     * @param {number} iVolume range 0 to 1
     * @summary executed when slider volume cursor is changed
     */
    HandleVolumeChange(objContext, iVolume) {
        objContext.AudioRef.current.volume = iVolume;
    }
}

export default CMSAudio_Common_ModuleProcessor;
