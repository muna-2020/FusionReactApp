import React, { useState } from 'react';

const TeacherDocumentErrorPopUp = (props) => {
    return (
        <div className="error-wrapper">
            <div className="error-message">
                <div className="error-header">
                    <span>{props.passedEvents.strHeader}</span>
                </div>
                <p>{props.passedEvents.strMessage}</p><br />
            </div>
            <div className="close-button">
                <span className="button brown-button" onClick={e => props.closePopUp(props.objModal)}>{props.passedEvents.objTextResource.Okay}</span>
            </div>
        </div>
    );
};

TeacherDocumentErrorPopUp.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/ErrorPopUp.css"
    ];
    return arrStyles;
};
export default TeacherDocumentErrorPopUp;