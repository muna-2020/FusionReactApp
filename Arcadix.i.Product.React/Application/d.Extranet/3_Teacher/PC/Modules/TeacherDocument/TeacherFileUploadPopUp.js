import React, { useState } from 'react';
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

const TeacherFileUploadPopUp = (props) => {
    return (
        <div>
            <FileUpload JConfiguration={props.passedEvents.JConfiguration} SaveFiles={(objFile) => { props.closePopUp(props.objModal);props.passedEvents.OnClickSave(objFile) }}/>
        </div>
    );

    function OnClickSave() {
        props.passedEvents.ClickSave(folderName);
        props.closePopUp(props.objModal);
    }
};


export default TeacherFileUploadPopUp;