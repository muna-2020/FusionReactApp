//react imports.
import React, { useState } from 'react';

const DetailPDFPoUp = (props) => {
    let objTextResource = props.Resource.Text;
    return (
        <div className="detailpdfpoup-wrapper">
            <div className="detailpdfpoup-message">
                <div className="detailpdfpoup-header">
                    <span>{Localization.TextFormatter(objTextResource, 'DetailTitle')}</span>
                </div>
                <p>Markieren Sie bitte für jeden angezeigten Lernenden einen Klassentypen pro Zeile. </p>
            </div>
            <div className="popup-buttons-flex">
                <span className="button high-stake-button" onClick={() => Popup.ClosePopup(props.Id)}>Abberchen</span>
                <span className="button yellow-button" onClick={() => Popup.ClosePopup(props.Id)}>Erstellen</span>
            </div>
        </div>
    );
};

DetailPDFPoUp.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/HighStakeTestResults/HighStakeTestResultsPopUp/DetailPDFPopUp.css"
    ];
    return arrStyles;
};
export default DetailPDFPoUp;