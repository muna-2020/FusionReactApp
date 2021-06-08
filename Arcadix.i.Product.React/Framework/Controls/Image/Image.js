// React related imports.
import React from "react";

/**
 * @name Image
 * @param {any} props
 * @summary ClassName,Events, Image Path and Text will be receive as props.
 * @returns {object} JSX for the Image
 */
function Image(props) {
    let strImagePath = typeof (props.Data?.Image) === "object" ? props.Data?.Image["src"] : props.Data?.Image;
    return (
        <img
            src={strImagePath}
            alt={props.Data?.AltText}
            title={props.Data?.ToolTipText}
            type={props.Data?.Type}
            className={props.Meta?.ClassName}
            draggable={props.Meta?.Draggable}
            onClick={props.Events?.OnClickEventHandler}
            onDragStart={props.Events?.OnDragStartEventHandler}
        />
    );
}

export default Image;