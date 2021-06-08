// React related imports
import React, { useEffect } from 'react';


/**
 * @name CMSAudioRecorder_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSAudio
 * @returns {any} returns the cms audio's JSX
 */
const CMSAudioRecorder_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType, Audio } = props;

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
            onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event) } : (event) => { event.preventDefault() }}>
            {
                Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                    <TextElement {...objTextElementProps} /> : ""
            }
            <div>
                {
                    Context.state.blnLoadAudioPlayer &&
                    <div>
                        <Audio {...Context.props}
                            Ref={Context.AudioRef}
                            vExternalSourceURL={Context.state.objAudioSource.vExternalSourceURL}
                            blnDisplayPurpose={true}
                        />
                    </div>
                }
                {
                    Context.state.ElementJson.vElementJson.AudioSources.map((a, i) => {
                        return (
                            <div key={`audio-display-wrapper-${a.id}`}>
                                <input type="radio" id={a.id}
                                    name="audio-recording"
                                    value={a.vExternalSourceURL ? a.vExternalSourceURL : `${Context.props.JConfiguration.WebDataPath}Repo/Audio/${Context.props.JConfiguration.MainClientId}/${Context.state.ElementJson.iElementId}_Audio_${Context.state.ElementJson.vElementJson.iAudioFileVersion}.mp3`}
                                    onChange={(e) => { Events.HandleOnChange(e) }}
                                    checked={Context.state.iCurrentSelectedId == a.id ? true : false}
                                />
                                <span>File Name : {a.name}</span>
                                <span onClick={() => { Callbacks.HandleOnRadioClick(a.id) }}> Delete </span>
                            </div>
                        );
                    })
                }
                <div>
                    <button className="recoder-button" onClick={() => { Callbacks.HandleAudioRecord(true) }} disabled={Context.state.blnIsRecording}> Start Recording </button>
                    <button className="recoder-button" onClick={() => { Callbacks.HandleAudioRecord(false) }} disabled={!Context.state.blnIsRecording}> Stop Recording</button>
                </div>
            </div>
        </div>
    );
};

export default CMSAudioRecorder_Common;
