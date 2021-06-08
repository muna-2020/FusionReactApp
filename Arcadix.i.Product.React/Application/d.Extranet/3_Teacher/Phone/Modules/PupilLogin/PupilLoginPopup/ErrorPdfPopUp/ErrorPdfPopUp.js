import React, { useState } from 'react';

const ErrorPopUp = (props) => {
    return (
        <div className="error-wrapper">
            <div className="error-message">
                <div className="error-header">
                    <span>Fehler</span>
                </div>
                <p>Atleast ein Lehrer sollte ausgewählt werden</p><br />
            </div>
            <div className="close-button">
                <span className="button brown-button" onClick={e => props.closePopUp(props.objModal)}>Ok</span>
            </div>
        </div>
    );
};

ErrorPopUp.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/ErrorPDFPopUp.css"
    ];
    return arrStyles;
};
export default ErrorPopUp;