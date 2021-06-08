// React related imports
import React, { useEffect } from 'react';

import PlayerSlider from '@root/Framework/Controls/PlayerSlider/PlayerSlider'

/**
 * @name CMSAudio_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSAudio
 * @returns {any} returns the cms audio's JSX
 */
const CMSAudio_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    const GetSmallAudio = () => {
        var strAudioSrc = `${Context.props.JConfiguration.WebDataPath}Repo/Audio/${Context.props.JConfiguration.MainClientId}/${Context.state.ElementJson.iElementId}_Audio_${Context.state.ElementJson.vElementJson.iAudioFileVersion}`;
        return (
            <span ielementid={Context.state.ElementJson.iElementId}
                ielementtypeid={Context.state.ElementJson.iElementTypeId}
                ielementtype="audio"
                ismallaudio="Y"
                inumberofreplays={Context.state.ElementJson.vElementJson.iNoOfReplays !== null ? Context.state.ElementJson.vElementJson.iNoOfReplays : null}
                vaudiotype={Context.state.ElementJson.vElementJson.vAudioType}
                ifileversion={Context.state.ElementJson.vElementJson.iFileVersion}
                type="audio"
                contentEditable={false}
                loadtype="SmallAudio">
                <audio
                    ref={Context.AudioRef}
                    id={`AudioPlayer${AppType}${Context.state.ElementJson.iElementId}`}
                    onTimeUpdate={() => { Events.OnPlayerTimeUpdate() }}
                    type={AppType}
                    issmallaudio="N"
                    usenewsvg="Y"
                    iaudiotime={Context.state.objAudioControl.iAudioTime}
                    ivolume={Context.state.objAudioControl.iVolume}
                    preload="auto"
                    onPlaying={() => { Events.OnPlaying() }}
                    onLoadedMetadata={(event) => { Events.HandleLoadedMetaData(event) }}
                    style={{ backgroundColor: 'rgb(0, 0, 0)', display: "none" }}>
                    <source type="audio/mpeg" src={strAudioSrc + ".mp3"} />
                    <source type="audio/wav" src={strAudioSrc + ".wav"} />
                </audio>
                {
                    Context.state.objAudioControl.boolPlay ?
                        <img id={`SmallAudioPause${AppType}${Context.state.ElementJson.iElementId}`}
                            style={{ cursor: 'pointer' }}
                            src={JConfiguration.IntranetSkinPath + "/Images/editor/Pause.svg"}
                            onClick={() => { Callbacks.AudioVideoPauseClick() }}
                        /> :
                        <img id={`SmallAudioPlay${AppType}${Context.state.ElementJson.iElementId}`}
                            style={{ cursor: 'pointer' }}
                            src={JConfiguration.IntranetSkinPath + "/Images/editor/Play.svg"}
                            onClick={() => { Callbacks.AudioVideoPlayClick() }}
                        />
                }
            </span>
        );
    };

    const GetFullAudio = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        var strAudioSrc = `${Context.props.JConfiguration.WebDataPath}Repo/Audio/${Context.props.JConfiguration.MainClientId}/${Context.state.ElementJson.iElementId}_Audio_${Context.state.ElementJson.vElementJson.iAudioFileVersion}`;
        return (
            <div ref={Context.outerContainerRef}
                id={`divAudioVideoPlayer${AppType}${Context.state.ElementJson.iElementId}`}
                ielementid={Context.state.ElementJson.iElementId}
                ielementtypeid={Context.state.ElementJson.iElementTypeId}
                style={{ width: Context.state.objAudioControl.iWidth }}
                onContextMenu={Events.OpenContextMenu && !Context.state.blnDisplayPurpose ? (event) => { Events.OpenContextMenu(event) } : (event) => { event.preventDefault() }}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <audio
                    ref={Context.AudioRef}
                    id={`AudioPlayer${AppType}${Context.state.ElementJson.iElementId}`}
                    onTimeUpdate={() => { Events.OnPlayerTimeUpdate() }}
                    issmallaudio="N"
                    usenewsvg="Y"
                    iaudiotime={Context.state.objAudioControl.iAudioTime}
                    type={AppType}
                    ivolume={Context.state.objAudioControl.iVolume}
                    preload="auto"
                    style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                    onPlaying={() => { Events.OnPlaying() }}
                    onLoadedMetadata={(event) => { Events.HandleLoadedMetaData(event) }}
                    //onEnded={() => { Events.OnEnded() }}
                >
                    <source type="audio/mpeg" src={strAudioSrc + ".mp3"} />
                    <source type="audio/wav" src={strAudioSrc + ".wav"} />
                </audio>
                <div style={{ userSelect: 'none' }}>
                    {
                        (Context.state.objAudioControl.boolMediaLoaded || Context.props.IsForServerRenderHtml) &&
                        <PlayerSlider
                            iCurrentTime={Context.state.objAudioControl.iCurrentTime}
                            iEndTime={Context.props.IsForServerRenderHtml ? Context.state.ElementJson.vElementJson.iAudioTime : Context.AudioRef.current.duration}
                            JConfiguration={Context.props.JConfiguration}
                            iMediaReplay={Context.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay}
                            OnSliderClick={(blnPlay, blnIncrementReplay = true) => { Events.HandleSliderClick(blnPlay, blnIncrementReplay) }}
                            OnValueChange={(value) => { Events.HandleValueChange(value) }}
                            OnVolumeChange={(value) => { Events.HandleVolumeChange(value) }}
                            OnEnded={() => { Events.OnEnded() }}
                            ControlsRestricted={Context.state.blnDisplayPurpose || AppType === "Editor" ? false : null}
                            ResetControls={Context.state.objAudioControl.boolResetControls}
                            ElementJson={Context.state.ElementJson}
                        />
                    }
                </div>
            </div>
        );
    };

    return Context.props.IsSubElement === "Y" ? GetSmallAudio() : GetFullAudio();
};

export default CMSAudio_Common;
