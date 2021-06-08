import React from 'react';

const CreatePDFPoUp = (props) => {

    const CloseCreatePDFPopup = () => {
        Popup.ClosePopup(objModal);
    };

    let objTextResource = props.Data.TextResource;
    return (
        <div className="createpdfpoup-wrapper">
            <div className="createpdfpoup-message">
                <div className="createpdfpoup-header">
                    <span>{Localization.TextFormatter(objTextResource, 'CreatePdfPopUpHeadingText')}</span>
                </div>
                {
                    props.Data.IsSelectAll ? 
                    <React.Fragment>
                      <p>{Localization.TextFormatter(objTextResource, 'CreatePdfPopUpWholeClassText')} {props.Data.SelectedClass["vClassName"]}</p><br />
                    </React.Fragment>:
                    <React.Fragment>
                        {
                            props.Data.SelectedPupil && props.Data.SelectedPupil.map((objSelectedPupil) => {
                                return(
                                    <React.Fragment>
                                        <p>Arrow {props.Data.SelectedClass["vClassName"]}, {objSelectedPupil["FullName"]}</p><br />
                                    </React.Fragment>
                                );
                            })
                        }
                    </React.Fragment>
                }
            </div>
            <div className="close-button">
                <span className="button brown-button" onClick={() => { CloseCreatePDFPopup(); }}>
                    {Localization.TextFormatter(objTextResource, 'CancelButtonText')}
                </span>
                <span className="button brown-button" onClick={() => { props.passedEvents.OnClickProceed(CloseCreatePDFPopup); }}>
                    {Localization.TextFormatter(objTextResource, 'ProceedButtonText')}
                </span>
            </div>
        </div>
    );
};

CreatePDFPoUp.DynamicStyles = (props) => {
    return[
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/CreatePdfPopUp.css"
    ];
};

export default CreatePDFPoUp;