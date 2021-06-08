//React imports.
import React from "react";

//Common imports
import TaskPreview from "@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskPreview"

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
 * @name TaskPopup
 * @summary component for displaying Task Image.
 * @param {any} props
 */
const TaskPopup = props => {

    /**
     * @name GetContent
     * @summary loads the task image using iframe.
     * */
    function GetContent() {
        let objTextResource = props.Data.TextResource;
        return (
            <div>
                <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupCloseButtonText')}
                    <img src={CloseImage} alt="" />
                </span>
                <TaskPreview TaskDetails={{ 'iPageId': props.Data.TaskId, 'iLanguageId': JConfiguration.InterfaceLanguageId }} JConfiguration={{ ...JConfiguration }} SkinName={props.Data.SkinName} LearningTestSkinId={props.Data.LearningTestSkinId} />
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return GetContent();
};



export default TaskPopup;