// React related imports.
import React from "react";

//Helper files.
import * as Popup_TextResource from '@shared/Framework/Blocks/Popup/Popup_TextResource';

//Inline Images import
import ErrorImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Popup/Error.png?inline';

/**
* @name ErrorPopup
* @param {object} props props
* @summary This component displays the ErrorPopup.
* @returns {object} returns a jsx .
*/
const ErrorPopup = (props) => {

    const GetContent = () => {
        return (
            <div className="error-popup">      
                <div className="error-message-flex">
                    {
                        props.Meta.HasCloseImage === "N" ? "" :
                            <img src={props.ImageMeta && props.ImageMeta.ErrorImage ? props.ImageMeta.ErrorImage : ErrorImage} />
                    }
                    <p dangerouslySetInnerHTML={{ __html: Popup_TextResource.GetResouceText(props.Resource, "ErrorText", props.Data.Count) }}></p>
                </div>
                <div className="error-message-footer">
                    <button className="err-btn" onClick={() => { props.Events.CloseParentPopup(); }}>
                        {Popup_TextResource.GetResouceText(props.Resource, "OkButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    return GetContent();
};

/**
 * @name GetDimensions
 * @param {object} objPopupData Popup data
 * @summary Gets the Height and Width from the meta.
 * @returns {object} Dimension
 */
ErrorPopup.GetDimensions = (objPopupData) => {    
    return {
        Height: objPopupData && objPopupData.Meta.Height ? objPopupData.Meta.Height : 'auto',
        Width: objPopupData && objPopupData.Meta.Width ? objPopupData.Meta.Width : 380
    };
};

export default ErrorPopup;