import React, { useRef, useState } from "react";
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

const PupilUploadFilePopup = props => {
    var domFileUploadRef = useRef(null);
    let objTextResource = props.Resource.Text;
    const [blnDisableUpload, setBlnDisableUpload] = useState(true)
    return (
        <div className="upload-folder-wrapper-class">
            <div className="pop-up-choose-file">
                <span>{Localization.TextFormatter(objTextResource, 'UploadDocumentPopUpHeader')}</span>
                <div ref={domFileUploadRef} className="document-file-upload-button">
                    <FileUpload
                        ref={domFileUploadRef}
                        Id="Pupil_UploadDocument"
                        Data={[]}
                        Meta={() => { }}
                        Resource={{
                            "Text": {
                                "UploadButtonText": Localization.TextFormatter(objTextResource, 'UploadFileText')
                            },
                            "SkinPath": JConfiguration.ExtranetSkinPath
                        }}
                        ParentProps={{ JConfiguration: { ...JConfiguration } }}
                        CallBacks={{ OnUploadComplete: (objFile, arrFiles) => { setBlnDisableUpload(arrFiles && arrFiles.length == 0) } }}
                    />
                </div>
            </div>

            <div className="footer-block">
                <button className="button orange-button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Close')} </button>
                <button className={blnDisableUpload ? "disabled button orange-button" : 'button orange-button'} disabled={blnDisableUpload} onClick={OnClickSave}>{Localization.TextFormatter(objTextResource, 'Upload')}</button>
            </div>
        </div>
    )

    function OnClickSave() {
        let arrFileList = JSON.parse(domFileUploadRef.current.GetUploadedFileDetails());
        Popup.ClosePopup(props.Id);
        props.Events.OnClickSave(arrFileList);
    }
};

export default PupilUploadFilePopup;
