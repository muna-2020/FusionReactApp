// React related impoprts.
import React from "react";

/**
 * @name Button
 * @param {any} props
 * @summary ClassName,Events,Button Image Path and Text will be receive as props.
 * When Button is clicked, the OnClickEventHandler is invoked.
 * @returns {object} JSX for the Button
 */
function Button(props) {
    return (
        <button className={props.Meta.ClassName ? `testapp-button ${props.Meta.ClassName}` : "testapp-button"}
            onClick={props.Events.OnClickEventHandler}>
            {props.Resource.ButtonText ? (<span>{props.Resource.ButtonText}</span>) : <React.Fragment />}
        </button>
    );
}

export default Button;
