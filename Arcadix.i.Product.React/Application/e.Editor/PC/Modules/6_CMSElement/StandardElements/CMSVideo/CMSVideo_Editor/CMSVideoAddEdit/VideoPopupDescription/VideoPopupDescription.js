import React from "react";

const VideoPopupDescription = (props) => {
    const objTextResource = props.TextResource;
    return (
        <div className="description_content" >
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">{objTextResource["Select_Video"]}</h5>
                <p>
                    {objTextResource["Select_Video_Description"]}
                </p>
            </div>

            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">{objTextResource["Choose_Global"]}:</h5>
                <p>
                    {objTextResource["Select_Global_Description"]}
                </p>
            </div>
            <div className="brwsrObjSec prgrphSection">
                <h5 className="prgrphTitle">{objTextResource["Select_Local_Video"]}:</h5>
                <p>
                    {objTextResource["Select_Local_Description_Paragraph_One"]}
                </p>
                <p>
                    {objTextResource["Select_Local_Description_Paragraph_Two"]}
                </p>
            </div>
        </div>
    );

};

export default VideoPopupDescription;