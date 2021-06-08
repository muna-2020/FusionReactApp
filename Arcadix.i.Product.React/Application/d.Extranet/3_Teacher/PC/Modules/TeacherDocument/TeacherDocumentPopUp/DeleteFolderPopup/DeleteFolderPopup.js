import { withRouter } from "react-router-dom";
import React, {
    useState,
    useEffect,
    useReducer,
    useLayoutEffect,
    useMutationEffect
} from "react";

const DeleteFolderPopup = props => {
    let strType = props.Data.strType;
    let objTextResource = props.Data.objTextResource;

    let strMessageText = "";
    if (strType == "Folder") {
        strMessageText = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpMessage').replace("{}", "<b>" + props.Data.strFolderName + "</b>");
    }
    else {
        strMessageText = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpMessage').replace("{}", "<b>" + props.Data.strDocumentName + "</b>");
    }
    let strHeader = strType == "Folder" ? Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpHeader') : Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpHeader')
    return (
        <div className="delete-folder-wrapper-class">
            <div className="delete-message">
                <span>{strHeader}</span>
                <span className="delete-text" dangerouslySetInnerHTML={{ __html: strMessageText }}></span>
            </div>

            <div class="delete-footer-block">
                <button className="footerclose-button button" onClick={e => props.ClosePopup(props.ObjModal)}> {Localization.TextFormatter(objTextResource, 'Close')} </button>
                <button className="button yellow-button" onClick={() => { OnClickDelete() }}>{Localization.TextFormatter(objTextResource, 'Delete')}</button>
            </div>
        </div>
    );

    function OnClickDelete() {
        props.ClosePopup(props.ObjModal);
        props.Data.OnClickDelete();
    }
};

DeleteFolderPopup.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/DeleteFolderPopup.css"
    ];
    return arrStyles;
};

export default DeleteFolderPopup;
