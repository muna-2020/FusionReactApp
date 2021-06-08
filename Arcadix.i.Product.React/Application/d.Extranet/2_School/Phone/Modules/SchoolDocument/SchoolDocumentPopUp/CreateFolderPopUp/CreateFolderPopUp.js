//React imports.
import React, { useState, useEffect, useRef } from "react";
//Module specific imports
import * as CreateFolderPopUp_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_Hook';
import CreateFolderPopUp_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_ModuleProcessor';

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/exclamation_mark.svg?inline';

/**
 * @name SchoolAddFolderPopUp
 * @summary component loads in popup for add or edit folder.
 * @param {any} props
 * @returns {Element}
 */
const SchoolAddFolderPopUp = props => {

    /**
     * @name folderName
     * @summary holds the folder name 
     * */
    const [folderName, setFolderName] = useState(props.Data.strFolderName);

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { props, ["CreateFolderPopUp_ModuleProcessor"]: new CreateFolderPopUp_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    CreateFolderPopUp_Hook.Initialize(objContext);

    /**
     * @name showValidationMsg
     * @summary for dispalying validation message.
     * */
    const [showValidationMsg, setshowValidationMsg] = useState(false);

    /**
     * @name objTextInputRef
     * @summary reference of textbox to set focus when component loads.
     * */
    const objTextInputRef = useRef();

    /**
     * @name objTextResource
     * @summary objTextResource
     * */
    let objTextResource = props.Resource.Text;

    /**
     * @summary to set focus to text box.
     * */
    useEffect(() => {
        objTextInputRef.current.focus();
    }, []);

    return (

        <div className="create-folder-overlay-main">
            <div className="create-folder-popup-main">
                <div className="create-folder-popup-content">
                    <h3>{Localization.TextFormatter(objTextResource, 'CreateFolderPopUpHeader')}</h3>
                    <input type="text" ref={objTextInputRef} value={folderName} onChange={(e) => { OnChange(e); }} />
                </div>

                <div className="error-message" style={{ display: "none" }}>

                    <span><img
                        src={ExclamationMarkImage}

                    />{Localization.TextFormatter(objTextResource, 'FolderValidationMsg')}</span>

                </div>

                <div className="popup-buttons">
                    <button className="green-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Close')}</button>
                    <button className="yellow-button" onClick={OnClickSave}> {props.Data.strFolderName == '' ? Localization.TextFormatter(objTextResource, 'CreateFolder') : Localization.TextFormatter(objTextResource, 'Save')}</button>
                </div>
            </div>

        </div>

    );

    /**
     * @name OnClickSave
     * @summary It validates the foldername is empty or not. If not empty calls the Save method.
     * */
    function OnClickSave() {
        if (folderName.trim() === "") {
            setshowValidationMsg(true);
        } else {
            props.Events.ClickSave(folderName);
            Popup.ClosePopup(props.Id);
        }

    }

    /**
     * @name OnChange
     * @summary updates foldername to state.
     * @param {any} e
     */
    function OnChange(e) {
        let blnValid = e.target.value.trim() === "" ? false : true;
        setFolderName(e.target.value)
        setshowValidationMsg(!blnValid)
    }
};

export default SchoolAddFolderPopUp;
