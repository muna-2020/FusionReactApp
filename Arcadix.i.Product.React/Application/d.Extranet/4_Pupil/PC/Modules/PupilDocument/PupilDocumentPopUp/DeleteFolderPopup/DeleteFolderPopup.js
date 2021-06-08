import { withRouter } from "react-router-dom";
import React from "react";

const DeleteFolderPopup = props => {
    let strType = props.passedEvents.strType;
    let { objTextResource } = props.passedEvents;
    let strMessageText = "";
    if (strType == "Folder") {
        strMessageText = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpMessage').replace("{}", "<b>" + props.passedEvents.strFolderName + "</b>");
    }
    else {
        strMessageText = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpMessage').replace("{}", "<b>" + props.passedEvents.strDocumentName + "</b>");
    }
    let strHeader = strType == "Folder" ? Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpHeader'): Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpHeader')
    return (
        <div className="delete-folder-wrapper-class">
            <div className="delete-message">
                <span>{strHeader}</span>
                <span className="delete-text" dangerouslySetInnerHTML={{ __html: strMessageText }}></span>
            </div>

            <div class="delete-footer-block">
                <button className="button orange-button" onClick={e => props.closePopUp(props.objModal)}> {Localization.TextFormatter(objTextResource, 'Close')} </button>
                <button className="button orange-button" onClick={() => { OnClickDelete() }}>{Localization.TextFormatter(objTextResource, 'Delete')}</button>
            </div>
        </div>
    );

    function OnClickDelete() {
        props.closePopUp(props.objModal);
        props.passedEvents.OnClickDelete();
    }
};

DeleteFolderPopup.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/DeleteFolderPopup.css"
    ];
    return arrStyles;
};

export default DeleteFolderPopup;
