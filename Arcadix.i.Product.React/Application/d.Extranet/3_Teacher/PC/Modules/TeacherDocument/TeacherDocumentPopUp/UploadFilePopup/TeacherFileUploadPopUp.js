//react imports 
import React, { useRef, useState} from "react";

//controls
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

/**
 * @name TeacherFileUploadPopUp
 * @summary contains the file upload control for select files.
 * @param {any} props
 * @returns {Element}
 */
const TeacherFileUploadPopUp = props => {

    /**
    * @name domFileUploadRef
    * @summary reference of fileUploadControl.
    * */
    var domFileUploadRef = useRef(null);
    const [arrFileList, setFileList] = useState([]);

    const objTextResource = props.Resource.Text;

    let objFileUploadMeta = {
        ShowUploadedFiles: true, // To show details of uploaded files.
        UploadSingle: 'N' //restrict to select only one file.
    };
    let Text = {
        "UploadButtonText": Localization.TextFormatter(objTextResource, 'UploadFile')//objTextResource.attach // Button text
    };
    let ImagePath = {
        UploadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachment.png" //by default plus will show.
    };
    let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory
    let objFileUploadResource = {
        Text,
        SkinPath,
        ImagePath
    };

    return (
        <div className="upload-folder-wrapper-class">
            <div className="pop-up-choose-file">
                <span>{Localization.TextFormatter(objTextResource, 'UploadDocumentPopUpHeader')}</span>
                <div ref={domFileUploadRef} className="document-file-upload-button">
                    <FileUpload
                        ref={domFileUploadRef}
                        Id="TeacherFileUpload"
                        Resource={objFileUploadResource}
                        Meta={objFileUploadMeta}
                        Data={{}}
                        ParentProps={{ ...props }}
                        CallBacks={{ OnUploadComplete: (objFileData, arrFileData) => { OnFileUploadComplete(objFileData, arrFileData) } }}
                    />
                </div>
            </div>

            <div className="footer-block">
                <button className="footerclose-button button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Close')}</button>
                <button className={arrFileList.length > 0 ? "button yellow-button" : "button yellow-button disabled"} onClick={OnClickSave}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
            </div>
        </div>
    );

    /**
     * @name OnFileUploadComplete
     * @param {any} objFileData
     * @param {any} arrFileData
     */
    function OnFileUploadComplete(objFileData, arrFileData) {
        setFileList(arrFileData);
    }

    /**
     * @name MarkAll
     * @summary to check or uncheck all.
     * @param {any} event
     */
    function OnClickSave() {
        let arrFileList = JSON.parse(domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : '[]');
        if (arrFileList.length > 0) {
            Popup.ClosePopup(props.Id);
            props.Data.OnClickSave(arrFileList);
        }
    }
};

/**
 * @name DynamicStyles
 * @summary styles required for the popup.
 * @param {any} props
 * @returns {Array}
 */
TeacherFileUploadPopUp.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/3_Teacher/ReactJs/PC/Modules/TeacherDocument/TeacherDocumentPopUp/UploadFilePopup.css"
    ];
};

export default TeacherFileUploadPopUp;
