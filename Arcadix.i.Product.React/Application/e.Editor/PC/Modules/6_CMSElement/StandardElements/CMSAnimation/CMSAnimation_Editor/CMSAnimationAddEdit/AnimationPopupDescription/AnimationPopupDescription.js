//React imports
import React from "react";

/**
 * @name AnimationPopupDescription
 * @param {object} props props from parent
 * @sumamry Contains AnimationPopupDescription component.
 * @returns {any} AnimationPopupDescription
 */
const AnimationPopupDescription = (props) => {
    const objTextResource = props.TextResource;
    return (
        <div className="description_content" >
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">{objTextResource["Main_Title"]}</h5>
                <p>
                    {objTextResource["Main_Title"]}
                </p>
            </div>
        </div>
    );
};

export default AnimationPopupDescription;
//Kislay