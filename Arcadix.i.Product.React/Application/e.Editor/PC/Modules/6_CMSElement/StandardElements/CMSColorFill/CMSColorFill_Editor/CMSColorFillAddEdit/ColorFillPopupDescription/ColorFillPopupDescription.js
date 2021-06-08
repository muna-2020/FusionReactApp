// React imports
import React from "react";

/**
 * @name ColorFillPopupDescription
 * @param {object} props props from parent
 * @sumamry Contains ColorFillPopupDescription component.
 * @returns {any} ColorFillPopupDescription
 */
const ColorFillPopupDescription = (props) => {
    const objTextResource = props.TextResource;
    console.log(objTextResource["Choose_Global"], objTextResource["Select_Local_ColorFill"])
    return (
        <div className="description_content" >
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">{objTextResource["Select_ColorFill"]}</h5>
                <p>
                    {objTextResource["Select_ColorFill_Description"]}
                </p>
            </div>
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">{objTextResource["Choose_Global"]}:</h5>
                <p>
                    {objTextResource["Select_Global_Description"]}
                </p>
            </div>
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">{objTextResource["Select_Local_ColorFill"]}:</h5>
                <p>
                    {objTextResource["Select_Local_Description_Paragraph"]}
                </p>
            </div>
        </div>
    );

};

export default ColorFillPopupDescription;