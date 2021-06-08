// React related imports
import React, { useEffect } from 'react';

import PlayerSlider from '@root/Framework/Controls/PlayerSlider/PlayerSlider'

//Component Animation.
import ComponentAnimation from '@root/Framework/Controls/ComponentAnimation/ComponentAnimation';

/**
 * @name CMSAudio_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSAudio
 * @returns {any} returns the cms audio's JSX
 */
const CMSAudio_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    const GetSmallAudio = () => {
        let strAudioSrc = `${Context.props.JConfiguration.WebDataPath}Repo/Audio/${Context.props.JConfiguration.MainClientId}/${Context.state.ElementJson.iElementId}_Audio_${Context.state.ElementJson.vElementJson.iAudioFileVersion}`;
        let smallIconNames = {
            "1": "1xPlay.svg",
            "2": "2xPlay.svg",
            "3": "UnlimitedPlay.svg",
            "11": "1xPause.svg",
            "12": "12xpause.svg",
            "22": "22xPause.svg",
            "33": "UnlimitedPause.svg",
            "1x": "1xNoPlay.svg",
            "2x": "2xNoPlay.svg",
            "3x": "UnlimitedPause.svg"
        };
        let { iNumberOfMediaReplay } = Context.state.ElementJson.vContainerElementProperties;
        let { iReplayPlayed } = Context.state.objAudioControl;
        return (
            <span ielementid={Context.state.ElementJson.iElementId}
                ref={Context.outerContainerRef}
                id={Context.state.ElementJson.iElementId}
                ielementtypeid={Context.state.ElementJson.iElementTypeId}
                ielementtype="audio"
                ismallaudio="Y"
                inumberofreplays={Context.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay}
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
                    onEnded={(event) => { Events.OnEnded(event) }}
                    style={{ backgroundColor: 'rgb(0, 0, 0)', display: "none" }}>
                    <source type="audio/mpeg" src={strAudioSrc + ".mp3"} />
                    <source type="audio/wav" src={strAudioSrc + ".wav"} />
                </audio>
                {
                    !Context.state.objAudioControl.boolTrackEnd && (
                        Context.state.objAudioControl.boolPlay ?
                            <img id={`SmallAudioPause${AppType}${Context.state.ElementJson.iElementId}`}
                                style={{ cursor: AppType == "Editor" ? "cursor" : "not-allowed" }}
                                src={AppType == "TestApplication" ? iNumberOfMediaReplay == 3 ? Context.props.JConfiguration.EditorSkinPath + '/Images/Common/' + smallIconNames["33"] : Context.props.JConfiguration.EditorSkinPath + '/Images/Common/' + smallIconNames[iReplayPlayed + "" + iNumberOfMediaReplay] : Context.props.JConfiguration.EditorSkinPath + '/Images/Common/pause.svg'}
                                onClick={AppType == "Editor" ? () => { Events.HandleSliderClick(false, false) } : null}
                            /> :
                            <img id={`SmallAudioPlay${AppType}${Context.state.ElementJson.iElementId}`}
                                style={{ cursor: 'pointer' }}
                                src={!Context.state.objAudioControl.boolMediaLoaded ? Context.props.JConfiguration.EditorSkinPath + '/Images/Common/SmallAudioLoader.gif' : Context.props.JConfiguration.EditorSkinPath + '/Images/Common/' + smallIconNames[iNumberOfMediaReplay]}
                                onClick={Context.state.objAudioControl.boolMediaLoaded ? () => { Events.HandleSliderClick(true, true) } : null}
                            />
                    )
                }
                {
                    Context.state.objAudioControl.boolTrackEnd &&
                    <img id={`SmallAudioPlay${AppType}${Context.state.ElementJson.iElementId}`}
                        style={{ cursor: (iReplayPlayed < iNumberOfMediaReplay && iReplayPlayed != 3) || AppType == "Editor" ? 'pointer' : 'not-allowed' }}
                        src={iReplayPlayed == iNumberOfMediaReplay && iReplayPlayed != 3 && AppType == "TestApplication" ? Context.props.JConfiguration.EditorSkinPath + '/Images/Common/' + smallIconNames[iReplayPlayed + "x"] : Context.props.JConfiguration.EditorSkinPath + '/Images/Common/' + smallIconNames[iNumberOfMediaReplay]}
                        onClick={(iReplayPlayed < iNumberOfMediaReplay && iReplayPlayed != 3) || AppType == "Editor" ? () => { Events.HandleSliderClick(true, true) } : null}
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
        return (
            <div ref={Context.outerContainerRef}
                id={`divAudioVideoPlayer${AppType}${Context.state.ElementJson.iElementId}`}
                ielementid={Context.state.ElementJson.iElementId}
                ielementtypeid={Context.state.ElementJson.iElementTypeId}
                style={{ width: `${Context.state.objAudioControl.iWidth}px`, height: "90px", position: "relative" }}
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
                    <source type="audio/mpeg" src={Context.props.vExternalSourceURL ? Context.props.vExternalSourceURL : `${Context.props.JConfiguration.WebDataPath}Repo/Audio/${Context.props.JConfiguration.MainClientId}/${Context.state.ElementJson.iElementId}_Audio_${Context.state.ElementJson.vElementJson.iAudioFileVersion}.mp3`} />
                    <source type="audio/wav" src={Context.props.vExternalSourceURL ? Context.props.vExternalSourceURL : `${Context.props.JConfiguration.WebDataPath}Repo/Audio/${Context.props.JConfiguration.MainClientId}/${Context.state.ElementJson.iElementId}_Audio_${Context.state.ElementJson.vElementJson.iAudioFileVersion}.wav`} />
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
                            ControlsRestricted={Context.state.blnDisplayPurpose || AppType === "Editor" ? false : true}
                            ResetControls={Context.state.objAudioControl.boolResetControls}
                            ElementJson={Context.state.ElementJson}
                            DisplayTextMessage={AppType === "TestApplication" ? true : false}
                            DisablePauseClick={AppType === "TestApplication" ? true : false}
                        />
                    }
                </div>
                {!Context.state.objAudioControl.boolMediaLoaded &&
                    <div style={{ "position": "absolute", "width": "100%", "height": "100%", "top": 0, "minWeight": "388px" }}>
                        <ComponentAnimation
                            Meta={{ "ShowLoadImage": true, "ShowAnimation": true, "ComponentAnimationRef": Context.ComponentAnimationRef }}
                            Resource={{ "ImagePath": Context.props.JConfiguration.EditorSkinPath + '/Images/Common/Loading.gif' }}
                        />
                    </div>
                }
            </div>
        );
    };

    return Context.props.IsSubElement === "Y" ? GetSmallAudio() : GetFullAudio();
};

export default CMSAudio_Common;
