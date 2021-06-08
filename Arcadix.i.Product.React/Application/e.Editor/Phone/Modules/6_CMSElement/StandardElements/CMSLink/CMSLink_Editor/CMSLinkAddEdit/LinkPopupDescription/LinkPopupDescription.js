//React imports
import React from "react";

/**
 * @name LinkPopupDescription
 * @param {object} props props from parent
 * @sumamry Contains LinkPopupDescription component.
 * @returns {component} LinkPopupDescription
 */
const LinkPopupDescription = (props) => {
    const objTextResource = props.TextResource;
    return (
        <div className="description_content" >
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">
                    {objTextResource["Popup_Title"]}
                </h5>
                <p>
                    {objTextResource["Popup_Descrition"]}
                </p>
            </div>
        </div>
    );
};

export default LinkPopupDescription;
