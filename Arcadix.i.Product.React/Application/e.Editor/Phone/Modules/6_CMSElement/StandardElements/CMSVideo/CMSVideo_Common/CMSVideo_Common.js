// React related imports
import React, { useEffect, useReducer } from 'react';

import PlayerSlider from '@root/Framework/Controls/PlayerSlider/PlayerSlider'

/**
 * @name CMSVideo_Common
 * @param {any} props
 * @summary Contains the JSX of CMSVideo
 * @returns {any} returns the cms video's JSX
 */
const CMSVideo_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Render the video body
     * @returns {any} Returns the JSX for the video.
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        const videoSrc = Callbacks.GetVideoPath();
        return (
            <div ref={Context.VideoPlayerRef}
                ielementid={Context.state.ElementJson.iElementId}
                ielementtypeid={Context.state.ElementJson.iElementTypeId}
                style={{ "width": `${Context.state.objVideoControl.iWidth}px`, "min-height": `${Context.state.objVideoControl.iHeight}px` }}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <div onContextMenu={Events.OpenContextMenu && !Context.state.blnDisplayPurpose ? (event) => { Events.OpenContextMenu(event) } : (event) => { event.preventDefault() }}>
                    {
                        !Context.state.blnLoadPlayer && <span> Transcoding...</span>
                    }
                    {
                        Context.state.blnLoadPlayer && videoSrc &&
                        <div ref={Context.outerContainerRef}
                            iwidth={Context.state.objVideoControl.iWidth}
                            iheight={Context.state.objVideoControl.iHeight}
                            id={`divAudioVideoPlayer${Context.state.ElementJson.iElementId}`}>
                            <video usenewsvg="Y" idefaultvolume={5}
                                id={`VideoPlayer${Context.state.ElementJson.iElementId}`}
                                guid={Context.state.ElementJson.iElementId}
                                width={Context.state.objVideoControl.iWidth}
                                height={Context.state.objVideoControl.iHeight}
                                preload="auto"
                                style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                                onLoadedMetadata={(event) => { Events.HandleLoadedMetaData(event) }}
                                type={AppType}
                                //autoPlay="true"
                                ref={Context.Ref}
                                idefaultvolume={Context.state.objVideoControl.iDefaultVolume}
                                onTimeUpdate={() => { Events.OnPlayerTimeUpdate(); }}
                                //onEnded={() => { Events.OnEnded() }}
                                onPlaying={() => { Events.OnPlaying() }}
                            >
                                <source type="video/mp4" src={videoSrc + (Context.state.ElementJson.vElementJson.cIsVimeo === "N" || Context.state.ElementJson.vElementJson.cIsVimeo === undefined ? ".mp4" : "")} />
                                {Context.state.cIsVimeo === "N" && <source type="video/ogg" src={videoSrc + ".ogg"} />}
                            </video>
                            <div id={"divAudioVideoPlayer_" + Context.state.ElementJson.iElementId} style={{ userSelect: 'none' }}>
                                {
                                    (Context.state.objVideoControl.boolMediaLoaded || Context.props.IsForServerRenderHtml) &&
                                    <PlayerSlider
                                        iCurrentTime={Context.state.objVideoControl.iCurrentTime}
                                        iEndTime={Context.props.IsForServerRenderHtml ? Context.state.ElementJson.vElementJson.iVideoTime : Context.Ref.current.duration}
                                        JConfiguration={Context.props.JConfiguration}
                                        iMediaReplay={Context.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay}
                                        OnSliderClick={(blnPlay, blnIncrementReplay = true) => { Events.HandleSliderClick(blnPlay, blnIncrementReplay) }}
                                        OnValueChange={(value) => { Events.HandleValueChange(value) }}
                                        OnVolumeChange={(value) => { Events.HandleVolumeChange(value) }}
                                        OnEnded={() => { Events.OnEnded() }}
                                        ControlsRestricted={Context.state.blnDisplayPurpose || AppType === "Editor" ? false : null}
                                        ResetControls={Context.state.objVideoControl.boolResetControls}
                                    />
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };

    return GetContent();
};

export default CMSVideo_Common;
