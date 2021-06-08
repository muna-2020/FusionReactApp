//React imports
import React, { useState, useEffect, useRef } from "react";

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';

/**
 * @name TeacherAddFolderPopUp
 * @summary component for add or edit folder
 * @param {any} props
 * @returns {Element}
 */
const TeacherAddFolderPopUp = props => {

    /**
     * @summary to set focus for text box.
     * */
    useEffect(() => {
        objTextInputRef.current.focus();
    }, []);

    /**
     * @summary reference for textbox to set focus.
     * */
    const [folderName, setFolderName] = useState(props.Data.strFolderName);

    /**
    * @summary reference for textbox to set focus.
    * */
    const [strValidationMessage, setValidationMessage] = useState("");

    /**
     * @summary textbox reference.
     * */
    const objTextInputRef = useRef();

    /**
     * @summary objTextResource
     * */
    let objTextResource = props.Resource.Text;

    return (
        <div className="create-folder-overlay-main">
            <div className="create-folder-popup-main">
                <div className="create-folder-popup-content">
                    <h3>{Localization.TextFormatter(objTextResource, 'CreateFolderPopUpHeader')}</h3>
                    <input type="text" ref={objTextInputRef} value={folderName} onChange={(e) => { setFolderName(e.target.value) }} />
                </div>
                {
                strValidationMessage.length > 0 &&
                    <div className="error-message">
                        <span>
                            <img src={ExclamationMarkImage} />
                            {strValidationMessage}
                        </span>
                    </div>
                }
                <div className="popup-buttons">
                    <button className="green-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Close')}</button>
                    <button className="yellow-button" onClick={
                        () => {
                            if (folderName.length > 0) {
                                OnClickSave();
                                setValidationMessage("");
                            } else {
                                setValidationMessage(Localization.TextFormatter(objTextResource, 'CreateFolderPopUpValidationMessage'));
                            }
                        }
                    }>{Localization.TextFormatter(objTextResource, 'CreateFolder')}</button>
                </div>
            </div>

        </div>

    );

    /**
     * @name OnClickSave
     * @summary calls the parent component's save method and closes the popup.
     * */
    function OnClickSave() {
        props.Data.ClickSave(folderName);
        Popup.ClosePopup(props.Id);
    }
};

/**
 * @name DynamicStyles
 * @summary styles required for the popup.
 * @returns {Array}
 */
TeacherAddFolderPopUp.DynamicStyles = () => {
   return [
        JConfiguration.ExtranetSkinPath +
        "/Css/Application/3_Teacher/ReactJs/Phone/TeacherDocument/TeacherDocumentPopup/CreateFolderPopUp.css"
    ];
};

export default TeacherAddFolderPopUp;
