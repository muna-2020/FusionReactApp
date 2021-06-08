//React Imports
import React, { useState, useEffect, useRef } from "react";

//Inline Images import
import imgExclamationMark from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/PupilCreateFolderPopUp/exclamation_mark.svg?inline';

const PupilCreateFolderPopUp = props => {
    useEffect(() => {
        objTextInputRef.current.focus();
    }, []);
    const [folderName, SetFolderName] = useState(props.Data.strFolderName);
    const objTextInputRef = useRef();
    const [showValidationMsg, SetshowValidationMsg] = useState(false);
    let objTextResource = props.Resource.Text;

    return (
        <div className="create-folder-wrapper-class">
            <div className="pop-up-input-content">
                <span>{Localization.TextFormatter(objTextResource, 'CreateFolderPopUpHeader')}</span>
                <input type="text" ref={objTextInputRef} value={folderName} onChange={(e) => { OnChange(e) }} />
            </div>
            {showValidationMsg == true ?
                <div className="errorMsg">
                    <img src={imgExclamationMark} alt="" />
                    <span>{Localization.TextFormatter(objTextResource, 'FolderValidationMsg')}</span>
                </div> : ''
            }
            <div className="footer-block">
                <button className="button orange-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Close')}</button>
                <button className="button orange-button" onClick={OnClickSave}>{props.Data.strFolderName == '' ? Localization.TextFormatter(objTextResource, 'CreateFolder') : Localization.TextFormatter(objTextResource, 'Save')}</button>
            </div>
        </div>
    );


    function OnClickSave() {
        if (folderName.trim() === "") {
            SetshowValidationMsg(true);
        } else {
            props.Events.OnClickSave(folderName);
            Popup.ClosePopup(props.Id);
        }
    }

    function OnChange(e) {
        let blnValid = e.target.value.trim() === "" ? false : true;
        SetFolderName(e.target.value);
        SetshowValidationMsg(!blnValid);
    }
};

PupilCreateFolderPopUp.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/CreateFolderPopUp.css"
    ];
    return arrStyles;
};

export default PupilCreateFolderPopUp;
