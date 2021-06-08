import React from "react";

const PupilDocumentErrorPopup = props => {
    let { objTextResource } = props.passedEvents;
    return (
        <div className="errorpopup-wrapper-class">
            <div className="errorpopup-header">
                <span>{props.passedEvents.strHeader}</span>
            </div>

            <div className="errorpopup-content">
                <p>{props.passedEvents.strMessage}</p>
            </div>

            <div className="footer-block">
                <span className="button close-button" onClick={e => props.closePopUp(props.objModal)}> {Localization.TextFormatter(objTextResource, 'Okay')} </span>
            </div>
        </div>
    );
};

PupilDocumentErrorPopup.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/ErrorPoup.css"
    ];
    return arrStyles;
};

export default PupilDocumentErrorPopup;

