//React Imports
import React, { useReducer, useRef, useEffect } from 'react';

import { connect } from 'react-redux';

import { debounce, throttle } from 'lodash';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Imports
import * as PlayerSlider_Hooks from '@shared/Framework/Controls/PlayerSlider/PlayerSlider_Hooks';
import PlayerSlider_ComponentProcessor from '@shared/Framework/Controls/PlayerSlider/PlayerSlider_ComponentProcessor';

/**
 * @name PlayerSlider
 * @param {object} props parent props
 * @param {Ref} ref forwaded ref
 * @summary Player slider
 * @returns {Component} PlayerSlider
 */
const PlayerSlider = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, PlayerSlider_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "SliderRef": useRef(null),
        "PlayerLoaderRef": useRef(null),
        "VolumeLoaderRef": useRef(null),
        "PlayerCursorRef": useRef(null),
        "VolumeCursorRef": useRef(null),
        "PlayerSlider_ComponentProcessor": new PlayerSlider_ComponentProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PlayerSlider_ComponentProcessor.Initialize(objContext, objContext.PlayerSlider_ComponentProcessor);

    useEffect(() => {
        window.addEventListener("mouseup", AttachMouseUpEvent);
        window.addEventListener("mousemove", AttachMouseMoveEvent);
        return () => {
            window.removeEventListener("mouseup", AttachMouseUpEvent);
            window.removeEventListener("mousemove", AttachMouseMoveEvent);
        }
    }, [objContext.state]);

    /**
     * @name AttachMouseUpEvent
     * @param {object} event
     */
    const AttachMouseUpEvent = (event) => {
        objContext.PlayerSlider_ComponentProcessor.HandleMouseUp({ objContext });
    }

    /**
     * @name AttachMouseMoveEvent
     * @param {object} event
     * */
    const AttachMouseMoveEvent = throttle((event) => {
        objContext.PlayerSlider_ComponentProcessor.HandleSliderMouseMove({ objContext, "clientX": event.clientX, "clientY": event.clientY });
    }, 50);

    /**
     *@name useEffect
     * @summarry updates current time to state 
     */
    useEffect(() => {
        if (!objContext.state.SliderControls.blnResetPlayer) {
            objContext.PlayerSlider_ComponentProcessor.UpdatePlayerSlider(objContext);
        }
    }, [objContext.props.iCurrentTime]);

    /**
     *@name useEffect
     * @summarry reset's slider controls when audio/video has reached the end.
     */
    useEffect(() => {
        if (!objContext.state.SliderControls.blnResetPlayer &&
            objContext.state.SliderControls.iCurrentTime === objContext.state.SliderControls.iEndTime &&
            !objContext.state.SliderControls.blnPlayerSliderActive) {
            setTimeout(() => { objContext.PlayerSlider_ComponentProcessor.HandleOnSliderEnd(objContext) }, 200);
        }
    }, [objContext.state.SliderControls.iCurrentTime])

    /**
    *@name useEffect
    * @summarry reset's slider controls.
    */
    useEffect(() => {
        if (objContext.props.ResetControls) {
            objContext.PlayerSlider_ComponentProcessor.ResetSliderControls(objContext);
        }
    }, [objContext.props.ResetControls])


    var objTextResource = Object_Framework_Services_TextResource.GetData(`/e.Editor/Modules/1_EditorFrame/Common`, objContext.props);
    if (objTextResource == null || (objTextResource && Object.keys(objTextResource).length == 0)) {
        objTextResource = PlayerSlider_Hooks.GetDefaultDisplayText();
    }
    var objNewTextResource = {
        "1": objTextResource["Initial1Time"],
        "2": objTextResource["Initial2Time"],
        "3": objTextResource["UnlimitedPlay"],
        "11": objTextResource["Play1Time"],
        "12": objTextResource["Play2Time"].replace("#", "1"),
        "22": objTextResource["Play2Time"].replace("#", "2"),
        "1x": objTextResource["Limit1Play"],
        "2x": objTextResource["Limit2Play"]
    }
    return (
        <div className="player-parent-wrapper" ref={objContext.SliderRef}>
            <div className="player-controls">
                <div className="loader-flex">
                    <span className="time start-time">
                        {objContext.PlayerSlider_ComponentProcessor.GetDurationInMinNSec(objContext.state.SliderControls.iCurrentTime)}
                    </span>
                    <div className="loader" ref={objContext.PlayerLoaderRef}>
                        <div className="loading-completed" style={{ "width": `${objContext.state.SliderControls.PlayerSliderWidth}%` }}>
                            {/*<span ref={objContext.PlayerCursorRef} onMouseDown={(event) => { objContext.PlayerSlider_ComponentProcessor.HandlePlayerCursorMouseDown({ objContext, "clientX": event.clientX, "clientY": event.clientY }) }} />*/}
                        </div>
                        <div className="loading-cursor" ref={objContext.PlayerCursorRef} onMouseDown={(event) => { objContext.PlayerSlider_ComponentProcessor.HandlePlayerCursorMouseDown({ objContext, "clientX": event.clientX, "clientY": event.clientY }) }}></div>
                    </div>
                    <span className="time end-time">
                        {objContext.PlayerSlider_ComponentProcessor.GetDurationInMinNSec(objContext.state.SliderControls.iEndTime)}
                    </span>
                </div>
                <div className="volume-controls-flex">
                    {!objContext.state.SliderControls.blnDisplayPlayControl &&
                        <div className="pause-play-holder">
                            <img src={`${props.JConfiguration.IntranetSkinPath}/Images/Framework/ReactJs/PC/Controls/PlayerSlider/play.svg`}
                                alt="PlayButton"
                                id="PlayToggle"
                                height="22"
                                onClick={!objContext.state.SliderControls.blnDisablePlayClick ? () => { objContext.PlayerSlider_ComponentProcessor.HandlePlayerClick(objContext, true) } : null}
                                style={{
                                    "display": !objContext.state.SliderControls.blnPlay && !objContext.state.SliderControls.blnDisablePlayClick ? "block" : "none",
                                    "opacity": objContext.state.SliderControls.blnDisablePlayClick ? "0.4" : "1"
                                }}
                            />
                            <img src={`${props.JConfiguration.IntranetSkinPath}/Images/Framework/ReactJs/PC/Controls/PlayerSlider/pause.svg`}
                                alt="PauseButton"
                                id="PauseToggle"
                                height="22"
                                onClick={!objContext.state.SliderControls.blnDisablePauseClick ? () => { objContext.PlayerSlider_ComponentProcessor.HandlePlayerClick(objContext, false) } : null}
                                style={{
                                    "display": objContext.state.SliderControls.blnPlay ? "block" : "none",
                                    "opacity": objContext.state.SliderControls.blnDisablePauseClick ? "0.4" : "1",
                                    "cursor": objContext.state.SliderControls.blnDisablePauseClick ? "not-allowed" : "cursor",
                                }}
                            />
                            {
                                objContext.state.SliderControls.blnDisplayTextMessage &&
                                <div>
                                    <span>
                                        {
                                            objContext.state.SliderControls.blnPlay ?
                                                (objContext.state.SliderControls.iMediaReplay == 3 ?
                                                    objNewTextResource[objContext.state.SliderControls.iMediaReplay] :
                                                    objNewTextResource[objContext.state.SliderControls.iMediaPlayed + "" + objContext.state.SliderControls.iMediaReplay]) :
                                                objContext.state.SliderControls.blnInitialRender ?
                                                    objNewTextResource[objContext.state.SliderControls.iMediaReplay] :
                                                    objContext.state.SliderControls.iMediaReplay == 3 ?
                                                        objNewTextResource[objContext.state.SliderControls.iMediaReplay] :
                                                        (objContext.state.SliderControls.iMediaPlayed < objContext.state.SliderControls.iMediaReplay ?
                                                            objNewTextResource[objContext.state.SliderControls.iMediaPlayed + "" + objContext.state.SliderControls.iMediaReplay] :
                                                            objNewTextResource[objContext.state.SliderControls.iMediaReplay + "x"])
                                        }
                                    </span>
                                </div>
                            }
                            {
                                !objContext.state.SliderControls.blnDisplayTextMessage &&
                                <div>
                                    <span >
                                        {objNewTextResource[objContext.state.SliderControls.iMediaReplay]}
                                    </span>
                                </div>
                            }
                        </div>
                    }
                    {
                        !objContext.state.SliderControls.blnDisableVolumeControl &&
                        <div className="volume-loader">
                            <div className="volume-icon-placeholder">
                                <img src={`${props.JConfiguration.IntranetSkinPath}/Images/Framework/ReactJs/PC/Controls/PlayerSlider/sound.svg`}
                                    height="22"
                                    alt=""
                                    id="VolumeToggle"
                                    style={{ "display": !objContext.state.SliderControls.blnMute ? "block" : "none" }}
                                />
                                <img src={`${props.JConfiguration.IntranetSkinPath}/Images/Framework/ReactJs/PC/Controls/PlayerSlider/no-sound.svg`}
                                    height="22"
                                    alt=""
                                    id="VolumeToggle"
                                    style={{ "display": objContext.state.SliderControls.blnMute ? "block" : "none" }}
                                />
                            </div>
                            <div className="loader" id="a" ref={objContext.VolumeLoaderRef}>
                                <div className="loading-completed" style={{ "width": `${objContext.state.SliderControls.VolumeSliderWidth}%` }}>
                                    {/*<span ref={objContext.VolumeCursorRef} onMouseDown={(event) => { objContext.PlayerSlider_ComponentProcessor.HandleVolumeCursorMouseDown({ objContext, "clientX": event.clientX, "clientY": event.clientY }) }} />*/}
                                </div>
                                <div className="loading-cursor" ref={objContext.VolumeCursorRef} onMouseDown={(event) => { objContext.PlayerSlider_ComponentProcessor.HandleVolumeCursorMouseDown({ objContext, "clientX": event.clientX, "clientY": event.clientY }) }}></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

function MapStoreToProps(state) {
    return {
        [`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/1_EditorFrame/Common`]: state.Entity["Object_Framework_Services_TextResource"][`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/1_EditorFrame/Common`],
    };
}

export default connect(MapStoreToProps)(PlayerSlider);