// React related imports.
import React from "react";

//Helper files.
import * as Popup_TextResource from '@shared/Framework/Blocks/Popup/Popup_TextResource';

//Inline Images import
import AlertImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Popup/Icon_Alert.gif?inline';

/**
 * @name ConfirmationPopup
 * @param {object} props props
 * @summary This component displays the ConfirmationPopup.
 * @returns {object} returns a jsx .
 */
const ConfirmationPopup = props => {

    const GetContent = () => {
        return (
            <div className="delete-popup-parent">
                <div className="delete-popup-content-flex">
                    {
                        props.Meta.HasImage === "Y" ?
                            <img src={props.ImageMeta && props.ImageMeta.AlertImage ? props.ImageMeta.AlertImage : AlertImage} />
                            : ""
                    }
                    <div className="confirm-text">
                        {
                            props.Meta.HasHeaderText === "Y" ?
                                <div className="header-text">{Popup_TextResource.GetResouceText(props.Resource, "HeaderText")}</div>
                                : ""
                        }
                        <div dangerouslySetInnerHTML={{ __html: Popup_TextResource.GetResouceText(props.Resource, "ConfirmText", props.Data.Count) }}></div>
                    </div>
                </div>
                <div className="delete-popup-footer">
                    {
                        props.Meta.ShowConfirmButton != "N" ?
                            <button className="delete-btn" onClick={() => { props.Events.ConfirmEvent ? props.Events.ConfirmEvent(props.Id) : props.Events.CloseParentPopup(); }}>
                                {Popup_TextResource.GetResouceText(props.Resource, "ConfirmButtonText")}
                            </button> : ""
                    }
                    {
                        props.Meta.ShowCloseButton != "N" ?
                            <button className="delete-btn" onClick={() => { props.Events.CloseEvent ? props.Events.CloseEvent(props.Id) : props.Events.CloseParentPopup(); }}>
                                {Popup_TextResource.GetResouceText(props.Resource, "CloseButtonText")}
                            </button> : ""
                    }
                    {
                        props.Meta.ShowCancelButton ?
                            <button className="delete-btn" onClick={() => { props.Events.CancelEvent ? props.Events.CancelEvent(props.Id) : props.Events.CloseParentPopup(); }}>
                                {Popup_TextResource.GetResouceText(props.Resource, "CancelButtonText")}
                            </button> : ""
                    }
                </div>
            </div>
        );
    };

    return GetContent();
};

/**
 * @name GetDimensions
 * @param {object} objPopupData popup data
 * @summary Gets the Height and Width from the meta.
 * @returns {object} Dimension
 */
ConfirmationPopup.GetDimensions = (objPopupData) => {
    return {
        Height: objPopupData && objPopupData.Meta.Height ? objPopupData.Meta.Height : "auto",
        Width: objPopupData && objPopupData.Meta.Width ? objPopupData.Meta.Width : 390
    };
};

export default ConfirmationPopup;
