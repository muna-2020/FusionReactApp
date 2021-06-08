//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSVideo_Common_ModuleProcessor
 * @summary Contains the Video's module specific methods.
 * */
class CMSVideo_Common_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name HandlePlayerTimeUpdate
     * @param {object} objContext {state, props, dispatch}
     * @summary this event is fired every time when player update the time
     */
    HandlePlayerTimeUpdate(objContext) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objVideoControl": {
                    ...objContext.state.objVideoControl,
                    "iCurrentTime": Math.ceil(objContext.Ref.current.currentTime),
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
        objContext.Ref.current.currentTime = 0;
        objContext.Ref.current.pause();
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objVideoControl": {
                    ...objContext.state.objVideoControl,
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
                "objVideoControl": {
                    ...objContext.state.objVideoControl,
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
        let objVideoControl = { ...objContext.state.objVideoControl, "boolPlay": blnPlay };
        if (blnPlay && blnIncrementReplay) {
            objVideoControl = { ...objVideoControl, "iReplayPlayed": objContext.state.objVideoControl.iReplayPlayed + 1 };
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objVideoControl": objVideoControl
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
        objContext.Ref.current.currentTime = iCurrentTime;
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objVideoControl": {
                    ...objContext.state.objVideoControl,
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
        if (!objContext.state.objVideoControl.boolPlay) {
            objContext.Ref.current.pause();
            objContext.Ref.current.currentTime = 0;
        }
    }

    /**
     * @name HandleVolumeChange
     * @param {object} objContext {state, props, dispatch}
     * @param {number} iVolume range 0 to 1
     * @summary executed when slider volume cursor is changed
     */
    HandleVolumeChange(objContext, iVolume) {
        objContext.Ref.current.volume = iVolume;
    }

    /**
     * @name GetVideoPath
     * @param {object} objContext {state, props, dispatch}
     */
    GetVideoPath(objContext) {
        var ElementJson = objContext.state.ElementJson;
        return ElementJson.vElementJson.cIsVimeo === "Y" ? ElementJson.vElementJson.vExternalLink : JConfiguration.WebDataPath + "Repo/Video/" + JConfiguration.MainClientId + "/" + ElementJson.iElementId + "_Video_" + ElementJson.vElementJson.iVideoFileVersion;
    }
}

export default CMSVideo_Common_ModuleProcessor;
