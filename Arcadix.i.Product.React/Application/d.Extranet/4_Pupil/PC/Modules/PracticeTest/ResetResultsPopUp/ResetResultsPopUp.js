//React related imports.
import React from "react";

//Inline Images import
import imgCloseRedbg from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/ResetResultsPopUp/Close_redbg.png?inline';

/**
* @name ResetResultsPopUp
* @param {object} props props
* @summary This component displays the Reset Result popup.
* @returns {object} div that encapsulated the grid with Teacher details.
*/
const ResetResultsPopUp = props => {
    let { objTextResource } = props.Resource.Text;

    return (
        <div className="reset-pupiltest">
            <div className="reset-pupiltest-header">
                <div className="reset-pupiltest-header-left-block">
                    <span className="popup-title-text">{Localization.TextFormatter(objTextResource, 'ResetTasks')}</span> <br />
                    <span className="popup-subtitle-text">{Localization.TextFormatter(objTextResource, 'MarkTasksNotAnswered')}</span>
                </div>
                <div className="reset-pupiltest-header-right-block">
                    <img onClick={e => Popup.ClosePopup(props.Id)} src={imgCloseRedbg} alt="" />
                </div>
            </div>

            <div className="popup-message">
                <span className="popup-message-text">{Localization.TextFormatter(objTextResource, 'AgainOkayMessage')}</span>
            </div>

            <div className="footer-block">
                <button className="button left-btn" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Cancel')}</button>
                <button className="button" onClick={() => { OnClickSave(); }}>{Localization.TextFormatter(objTextResource, 'Ok')}</button>
            </div>
        </div>
    );

    /**
     * @name OnClickStart
     * @summary Executes after save is clicked
     */
    function OnClickSave() {
        props.Events.ClickSave();
        Popup.ClosePopup(props.Id);
    }
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {object} arrStyles
*/
ResetResultsPopUp.DynamicStyles = () => {
    return [JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PracticeTest/ResetResultPoup.css"];
};

export default ResetResultsPopUp;