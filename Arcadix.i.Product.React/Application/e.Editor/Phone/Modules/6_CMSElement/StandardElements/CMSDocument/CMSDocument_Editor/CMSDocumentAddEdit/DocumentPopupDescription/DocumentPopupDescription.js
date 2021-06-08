//React imports
import React from "react";

/**
 * @name DocumentPopupDescription
 * @param {object} props props from parent
 * @sumamry Contains DocumentPopupDescription component.
 * @returns {any} DocumentPopupDescription
 */
const DocumentPopupDescription = (props) => {
    const objTextResource = props.TextResource;
    return (
        <div className="description_content" >
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">
                    {objTextResource["Main_Title"]}
                </h5>
                <p>
                    {objTextResource["Main_Title"]}
                </p>
            </div>
        </div>
    );
};

export default DocumentPopupDescription;
