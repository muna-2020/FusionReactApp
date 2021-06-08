// React related import
import React, { useRef } from 'react';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import VideoManagement_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideoAddEdit/VideoManagement/VideoManagement_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name VideoManagement_VideoDetails
 * @param {object} props props from parent
 * @summary display's video properties.
 * @returns {component} component
 */
const VideoManagement_VideoDetails = React.memo((props) => {

    /**
    * @name  InitializeCss
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles
    * @returns Setting ApplicationState
  */
    EditorBase_Hook.InitializeCss(props, new VideoManagement_ModuleProcessor());

    const Video = props.ComponentController.GetElement("Video");

    const GetContent = () => {
        let blnShowVideoPlayer = props.blnShowVideoPlayer == null ? true : props.blnShowVideoPlayer
        return (
            <div className="object-detail-video-properties">
                <h2>{props.TextResource["Video_Title"]}</h2>
                <h2>{props.TextResource["Video_Properties"]}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>{props.TextResource["Name"]}:</td>
                            <td>{props.ElementDetails["vElementJson"]["vVideoName"]}</td>
                        </tr>
                        <tr>
                            <td>{props.TextResource["Running_Time"]}:</td>
                            <td>{props.ElementDetails["vElementJson"]["iVideoTime"]}</td>
                        </tr>
                        <tr>
                            <td>{props.TextResource["FileSize_Text"]}:</td>
                            <td>{props.ElementDetails["vElementJson"]["iVideoFileSize"]}</td>
                        </tr>
                        <tr>
                            <td>{props.TextResource["Created_On"]}:</td>
                            <td>{BaseCMSElement.GetDate(props.ElementDetails["dtCreatedOn"])}</td>
                        </tr>
                        <tr>
                            <td>{props.TextResource["Edited_On"]}:</td>
                            <td>{BaseCMSElement.GetDate(props.ElementDetails["dtModifiedOn"])}</td>
                        </tr>
                    </tbody>
                </table>

                <h3> {props.TextResource["Description"]}:</h3>
                <p> {props.ElementDetails["vElementJson"]["vVideoDescription"]} </p>
                <h2> {props.TextResource["Preview"]} </h2>
                {blnShowVideoPlayer && <Video {...props} blnDisplayPurpose="true" ElementJson={props.ElementDetails} />}
            </div>
        );
    };

    return GetContent();

}, (prevProps, nextProps) => {
    if (prevProps.ElementDetails.iElementId !== nextProps.ElementDetails.iElementId) {
        return false;
    }
    return true;
});

export default VideoManagement_VideoDetails;