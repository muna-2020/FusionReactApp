//React imports
import React from 'react';

/**
 * @name CMSMapElement_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSMapElement
 * @returns {any} returns the cms MapElement's JSX
 */
const CMSMapElement_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Render the MapElement body
     * @returns {any} Returns the JSX for the MapElement.
     */
    const GetContent = () => {
        let objTextElementProps = {};
        Context.state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
            if (objTempHeaderValue["vHeaderType"] === "ElementHeader") {
                if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
                    objTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                }
            }
        });
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                className="map-element-main">
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <div>
                    <span onClick={() => { Events.OnReset(); }}>Clear</span>
                </div>
                <div className="map-element-container" onContextMenu={(event) => { event.stopPropagation(); event.preventDefault(); }}>
                    <canvas
                        ref={Context["Canvas_Ref"]}
                        style={{ position: "absolute", border: "1px solid black" }}
                        id={`MapElementCanvas_${Context.state["ElementJson"]["iElementId"]}`}
                        onMouseDown={Events.OnMouseDown}
                    />
                    <img
                        ref={Context["Image_Ref"]}
                        src={Context.state["ImagePath"]}
                    />
                </div>
            </div>
        );
    };

    return GetContent();
};

export default CMSMapElement_Common;
