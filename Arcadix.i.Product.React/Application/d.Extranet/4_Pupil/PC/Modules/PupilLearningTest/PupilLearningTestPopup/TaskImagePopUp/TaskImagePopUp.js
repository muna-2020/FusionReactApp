//React imports
import React from 'react';

//Inline Images import
import imgCloseBig from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/TaskImagePopUp/close_big.svg?inline';

/**
* @name TaskImagePopUp
* @param {object} props Passes props
* @summary Task Image
* @returns {object} jsx, div
*/
const TaskImagePopUp = (props) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/*<span onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(props.Resource.Text, 'Close')}</span>*/}
            <span className="close-block" onClick={e => Popup.ClosePopup(props.Id)}>
                <img src={imgCloseBig} alt="" />
            </span>
            <div className="task-image-wrapper">
                <img src={props.Data.vImageUrl} style={{ width: 'auto', height: 'auto' }} />
            </div>
        </div>
    );
};

/**
* @name DynamicStyles
* @summary Required for css
* @returns {Array} arrStyles
*/
TaskImagePopUp.DynamicStyles = () => {
    return [JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/WorkTest/ProgressReport/ProgressReport_SummaryPopup.css"];
};

export default TaskImagePopUp;