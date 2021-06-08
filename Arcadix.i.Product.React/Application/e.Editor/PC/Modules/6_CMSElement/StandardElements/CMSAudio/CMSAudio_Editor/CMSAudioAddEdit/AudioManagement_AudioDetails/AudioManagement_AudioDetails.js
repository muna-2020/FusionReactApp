// React related import
import React, { useRef } from 'react';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

import AudioManagement_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudioAddEdit/AudioManagement/AudioManagement_ModuleProcessor';

const AudioManagement_AudioDetails = (props) => {

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
    */
    EditorBase_Hook.InitializeCss(props, new AudioManagement_ModuleProcessor());

    const Audio = props.ComponentController.GetElement("Audio");
    return (
        <div className="object-detail-audio-properties">
            <h2>{props.TextResource["Audio_Title"]}</h2>
            <h3>{props.TextResource["Properties"]}</h3>
            <table>
                <tr>
                    <td>{props.TextResource["Name"]}:</td>
                    <td>{props.ElementDetails.vElementJson["vAudioName"]}</td>
                </tr>
                <tr>
                    <td>{props.TextResource["Run_Time"]}:</td>
                    <td>{props.ElementDetails.vElementJson["iAudioTime"]}</td>
                </tr>
                <tr>
                    <td>{props.TextResource["FileSize_Text"]}:</td>
                    <td>{props.ElementDetails.vElementJson["iAudioFileSize"]}</td>
                </tr>
                <tr>
                    <td>{props.TextResource["Created_On"]}:</td>
                    <td>{BaseCMSElement.GetDate(props.ElementDetails["dtCreatedOn"])}</td>
                </tr>
                <tr>
                    <td>{props.TextResource["Edited_On"]}:</td>
                    <td>{BaseCMSElement.GetDate(props.ElementDetails["dtModifiedOn"])}</td>
                </tr>
            </table>
            <h3>{props.TextResource["Description"]}:</h3>
            <p>{props.ElementDetails.vElementJson["vAudioDescription"]}</p>
            <h2>{props.TextResource["Listen_to_the_audio"]}</h2>
            <div style={{ "padding": "6px" }}>
                <Audio {...props} blnDisplayPurpose="true" ElementJson={props.ElementDetails} />
            </div>
        </div>
    );
};

export default AudioManagement_AudioDetails;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AudioManagement_ModuleProcessor; 