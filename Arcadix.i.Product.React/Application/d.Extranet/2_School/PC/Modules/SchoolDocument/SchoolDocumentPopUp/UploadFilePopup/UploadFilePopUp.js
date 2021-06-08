//React imports.
import React, { useRef, useState } from "react";

//Controls.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
//Module specific imports
import * as UploadFilePopup_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup/UploadFilePopup_Hook';
import UploadFilePopup_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup/UploadFilePopup_ModuleProcessor';


/**
 * @name SchoolFileUploadPopUp
 * @summary embedded fileUpload control for select files.
 * @param {any} props
 * @returns {Element}
 */
const SchoolFileUploadPopUp = props => {

    /**
     * @name domFileUploadRef
     * @summary reference of fileUploadControl.
     * */
    var domFileUploadRef = useRef(null);

    /**
     * @name domFileUploadRef
     * @summary reference of fileUploadControl.
     * */
    const [arrFileUploaded, setFileUploaded] = useState([]);

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { props, ["UploadFilePopup_ModuleProcessor"]: new UploadFilePopup_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    UploadFilePopup_Hook.Initialize(objContext);
    /**
     * @name objTextResource
     * @summary objTextResource
     * */
    let objTextResource = props.Resource.Text;

    /**
     * @name GetResourceData
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    function GetResourceData(objTextResource) {
        let Text = {
            "UploadButtonText": Localization.TextFormatter(objTextResource, 'UploadFile'), // Button text
            "ValidationMessage": Localization.TextFormatter(objTextResource, 'FileRestrictionMessage')
        };

        let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory

        return {
            Text,
            SkinPath
        };
    }

    /**
     * @name GetMetaData
     * @summary it returns the object of metadata
     * @returns {array} MetaData
     */
    function GetMetaData() {
        return {
            ShowUploadedFiles: true, // To show details of uploaded files.
            UploadSingle: 'Y' //restrict to select only one file if Y
        };
    }

    return (
        <div className="upload-folder-wrapper-class">
            <div className="pop-up-choose-file">
                <span>{Localization.TextFormatter(objTextResource, 'UploadDocumentPopUpHeader')}</span>
                <div ref={domFileUploadRef} className="document-file-upload-button">
                    <FileUpload
                        Id="FileUpload_Upload"
                        ref={domFileUploadRef}
                        Resource={GetResourceData(objTextResource)}
                        Meta={GetMetaData()}
                        Data={{ Reload: '' }}
                        CallBacks={{
                            OnUploadComplete: (objFileData, arrFileData) => {
                                console.log("objFileData", objFileData);
                                setFileUploaded(arrFileData);
                            }
                        }}
                        ParentProps={{ ...props }} />
                </div>
            </div>

            <div className="footer-block">
                <button className="footerclose-button button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Close')}</button>
                {arrFileUploaded.length == 0 ?
                    <button className="button yellow-button disabled">{Localization.TextFormatter(objTextResource, 'Upload')}</button>
                    : <button className="button yellow-button" onClick={OnClickSave}>{Localization.TextFormatter(objTextResource, 'Upload')}</button>
                }
            </div>
        </div>
    );

    /**
     * @name OnClickSave
     * @summary calls the parent component's save method and closes the popup.
     * */
    function OnClickSave() {
        let arrFileList = JSON.parse(domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : '[]');
        Popup.ClosePopup(props.Id);
        props.Events.OnClickSave(arrFileList);
    }
};

/**
 * @name DynamicStyles
 * @summary returns the required css paths for popup.
 * @param {any} props
 * @returns {Array}
 */
SchoolFileUploadPopUp.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup.css"];
};

export default SchoolFileUploadPopUp;
