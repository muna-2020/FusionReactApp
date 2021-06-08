//React imports.
import React from "react";

//Common imports
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';
import TaskPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskPreview';

//Inline Images import
import CloseBigImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close_big.svg?inline';

/**
 * @name TaskImage
 * @summary component for displaying Task Image.
 * @param {any} props
 */
const TaskImage = props => {

    /**
     * @name GetContent
     * @summary loads the task image using iframe.
     * */
    function GetContent() {
        //props = { ...props, TaskDetails: { 'iPageId': props.Data.TaskId, 'iLanguageId': JConfiguration.InterfaceLanguageId } };
        let objTextResource = props.Data.TextResource;
        return (
            <div className="task-image-popup">
                <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                    <img src={CloseBigImage} alt="" />
                </span>
                <TaskPreview
                    TaskDetails={{ 'iPageId': props.Data.TaskId, 'iLanguageId': JConfiguration.InterfaceLanguageId }}
                    JConfiguration={{ ...JConfiguration }}
                    ClientUserDetails={{ ...ClientUserDetails }}
                    SkinName={props.Data.SkinName}
                    LearningTestSkinId={props.Data.LearningTestSkinId}
                />
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return GetContent();
};

TaskImage.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreation/LearningTestCreation.css"];
};

export default TaskImage;