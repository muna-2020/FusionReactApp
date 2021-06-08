//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

import * as PlayerSlider_Hooks from '@shared/Framework/Controls/PlayerSlider/PlayerSlider_Hooks';

/**
* @name PlayerSlider_ComponentProcessor.
* @summary PlayerSlider processor class.
*/
class PlayerSlider_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name GetDurationInMinNSec
     * @param {object} objContext {state, props, dispatch}
     */
    GetDurationInMinNSec(iCurrentTime) {
        const intMinutes = Math.floor(iCurrentTime / 60);
        const intSeconds = Math.floor(iCurrentTime - intMinutes * 60);
        return (String(intMinutes).length <= 1 ? "0" + intMinutes : String(intMinutes)) + ":" + (String(intSeconds).length <= 1 ? "0" + intSeconds : String(intSeconds));
    }

    /**
     * @name HandlePlayerClick
     * @param {object} objContext {state, props, dispatch}
     * @summary handles video/audio play and pause.
     */
    HandlePlayerClick(objContext, blnIncrementReplayCount = true) {
        let blnPlay = !objContext.state.SliderControls.blnPlay;
        let blnDisablePauseClick = false; let blnFastForward = true;
        let iMediaPlayed = blnIncrementReplayCount ? objContext.state.SliderControls.iMediaPlayed + 1 : objContext.state.SliderControls.iMediaPlayed;
        if (objContext.state.SliderControls.blnControlsRestricted) { //&& objContext.state.SliderControls.iMediaReplay > 0) {
            blnDisablePauseClick = true;
            blnFastForward = false;
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "SliderControls": {
                    ...objContext.state.SliderControls,
                    "blnPlay": blnPlay,
                    "blnDisablePauseClick": blnDisablePauseClick,
                    //"blnFastForward": blnFastForward,
                    "iMediaPlayed": iMediaPlayed,
                    "blnResetPlayer": false,
                    "blnInitialRender": false
                }
            }
        });
        if (objContext.props && objContext.props.OnSliderClick) {
            objContext.props.OnSliderClick(blnPlay)
        }
    }

    /**
     * @name UpdatePlayerSlider
     * @param {object} objContext {state, props, dispatch}
     * @summary updates current play time in seconds
     */
    UpdatePlayerSlider(objContext) {
        console.log("Update", objContext.props.iCurrentTime)
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "SliderControls": {
                    ...objContext.state.SliderControls,
                    "iCurrentTime": objContext.props.iCurrentTime
                }
            }
        });
        if (!objContext.state.SliderControls.blnPlayerSliderActive) {
            let sliderWidth = objContext.props.iCurrentTime / objContext.state.SliderControls.iEndTime;
            if (sliderWidth >= 0 && sliderWidth <= 1) {
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "SliderControls": {
                            ...objContext.state.SliderControls,
                            "iCurrentTime": objContext.props.iCurrentTime,
                            "PlayerSliderWidth": Math.ceil(sliderWidth.toFixed(2) * 100)
                        }
                    }
                });
            }
        }
    }

    /**
     * @name HandleOnSliderEnd
     * @param {any} objContext {state, props, dispatch}
     * @summary executed when slider has reached end
     */
    HandleOnSliderEnd(objContext) {
        let blnDisableControls = false;
        if (objContext.state.SliderControls.iMediaPlayed >= objContext.state.SliderControls.iMediaReplay && objContext.state.SliderControls.blnControlsRestricted) {
            blnDisableControls = true;
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "SliderControls": {
                    ...objContext.state.SliderControls,
                    "iCurrentTime": 0,
                    "blnPlay": false,
                    "blnMute": false,
                    "blnPlayerSliderActive": false,
                    "PlayerSliderWidth": 0,
                    "blnVolumeSliderActive": false,
                    "VolumeSliderWidth": objContext.state.SliderControls.VolumeSliderWidth,
                    "blnDisablePauseClick": blnDisableControls,
                    "blnDisablePlayClick": blnDisableControls,
                    "blnFastForward": objContext.state.SliderControls.blnFastForward,
                    "blnResetPlayer": true,
                    "blnReachedEnd": true
                }
            }
        });
        if (objContext.props.OnEnded) {
            objContext.props.OnEnded();
        }
    }

    /**
     * @name ResetSliderControls
     * @param {object} objContext {state, props, dispatch}
     * @summary resets slider controls
     */
    ResetSliderControls(objContext) {
        var objSliderControls = PlayerSlider_Hooks.GetInitialState(objContext.props);
        console.log("SliderControls", objSliderControls)
        objContext.dispatch({
            "type": "SET_STATE", "payload": { ...objSliderControls }
        });
    }

    /**
     * @name HandleMouseUp
     * @param {object} objParams {objContext}
     * @summary disabling slider loader
     */
    HandleMouseUp(objParams) {
        let { objContext } = objParams;
        if (objContext.state.SliderControls.blnPlayerSliderActive || objContext.state.SliderControls.blnVolumeSliderActive) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "SliderControls": {
                        ...objContext.state.SliderControls,
                        "blnPlayerSliderActive": false,
                        "blnVolumeSliderActive": false
                    }
                }
            });
            if (objContext.props &&
                objContext.props.OnSliderClick &&
                objContext.state.SliderControls.blnPlay &&
                objContext.state.SliderControls.blnPlayerSliderActive) {
                objContext.props.OnSliderClick(true);
            }
            if (((objContext.state.SliderControls.iCurrentTime === objContext.state.SliderControls.iEndTime) ||
                objContext.state.SliderControls.PlayerSliderWidth >= 100) && objContext.state.SliderControls.blnPlayerSliderActive) {
                if (objContext.props.OnEnded) {
                    objContext.props.OnEnded();
                }
                objContext.PlayerSlider_ComponentProcessor.HandleOnSliderEnd(objContext);
            }
        }
    }

    /**
     * @name HandleSliderMouseMove
     * @param {object} objParams {objContext, clientX, clientY}
     * @summary updates slider/volume loader width
     */
    HandleSliderMouseMove(objParams) {
        let { objContext, clientX, clientY } = objParams;
        let loader; let cursor; let width = 0;
        if (objContext.state.SliderControls.blnPlayerSliderActive && objContext.state.SliderControls.blnFastForward) {
            loader = objContext.PlayerLoaderRef.current.getBoundingClientRect();
            cursor = objContext.PlayerCursorRef.current.getBoundingClientRect();
            width = (clientX - loader.left - cursor.width / 2) / loader.width;
            if (width.toFixed(2) >= 0 && width.toFixed(2) <= 1) {
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "SliderControls": {
                            ...objContext.state.SliderControls,
                            "PlayerSliderWidth": Math.ceil(width.toFixed(2) * 100)
                        }
                    }
                });
                if (objContext.props.OnValueChange) {
                    objContext.props.OnValueChange(Math.ceil(objContext.state.SliderControls.iEndTime * width.toFixed(2)));
                }
            }
        }
        if (objContext.state.SliderControls.blnVolumeSliderActive) {
            loader = objContext.VolumeLoaderRef.current.getBoundingClientRect();
            cursor = objContext.VolumeCursorRef.current.getBoundingClientRect();
            width = (clientX - loader.left - cursor.width / 2) / loader.width;
            if (width.toFixed(1) >= 0 && width.toFixed(1) <= 1) {
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "SliderControls": {
                            ...objContext.state.SliderControls,
                            "VolumeSliderWidth": Math.ceil(width * 100)
                        }
                    }
                });
                if (objContext.props.OnVolumeChange) {
                    console.log(width.toFixed(1));
                    objContext.props.OnVolumeChange(width.toFixed(1));
                }
            }
            if (width <= 0 && !objContext.state.SliderControls.blnMute) {
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "SliderControls": {
                            ...objContext.state.SliderControls,
                            "blnMute": true
                        }
                    }
                });
            }
            if (width > 0 && objContext.state.SliderControls.blnMute) {
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "SliderControls": {
                            ...objContext.state.SliderControls,
                            "blnMute": false
                        }
                    }
                });
            }
        }
    };

    /**
     * @name HandlePlayerCursorMouseDown
     * @param {object} objParams {objContext, clientX, clientY}
     * @summary handles slider active status
     */
    HandlePlayerCursorMouseDown(objParams) {
        let { objContext, clientX, clientY } = objParams;
        if (!objContext.state.SliderControls.blnPlayerSliderActive && objContext.state.SliderControls.blnFastForward) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "SliderControls": {
                        ...objContext.state.SliderControls,
                        "blnPlayerSliderActive": true,
                        "blnResetPlayer": false
                    },
                    "objInitialCoordinated": { "clientX": clientX, "clientY": clientY }
                }
            });

            if (objContext.props && objContext.props.OnSliderClick) {
                objContext.props.OnSliderClick(false);
            }
        }
    };

    /**
     * @name HandleVolumeCursorMouseDown
     * @param {object} objParams {state, props, dispatch}
     */
    HandleVolumeCursorMouseDown(objParams) {
        let { objContext, clientX, clientY } = objParams;
        if (!objContext.state.SliderControls.blnVolumeSliderActive) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "SliderControls": {
                        ...objContext.state.SliderControls,
                        "blnVolumeSliderActive": true
                    }
                },
                "objInitialCoordinated": { "clientX": clientX, "clientY": clientY }
            });
        }
    };

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        let arrStyles = [
            props.JConfiguration.EditorSkinPath + "/Css/Framework/Controls/PlayerSlider/PlayerSlider.css"
        ];
        return arrStyles;
    }
}

export default PlayerSlider_ComponentProcessor;