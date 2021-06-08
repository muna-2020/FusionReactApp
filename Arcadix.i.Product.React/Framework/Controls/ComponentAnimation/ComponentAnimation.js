// React related imports.
import React, { useRef, useState, useImperativeHandle } from "react";

/**
* @name Animation
* @param {object} props props
* @summary This component displays the Animation.
* @returns {object} JSX for the Animation
*/
const ComponentAnimation = props => {

    const [blnShowAnimation, ShowHideComponentAnimation] = useState(props.Meta.ShowAnimation ? true : false);

    useImperativeHandle(props.Meta.ComponentAnimationRef, () => ({
        "blnShowComponentAnimation": (blnValue) => {
            ShowHideComponentAnimation(blnValue);
        },
        "IsComponentAnimationActive": () => {
            return blnShowAnimation;
        },
    }), [props]);

    const GetContent = () => {
        let objStyle = {
            "height": "100%",
            "width": "100%",
            "display": "grid",
            "place-items": "center",
            "position": "absolute",
        };
        let objStyle1 = {
            "height": "100%",
            "width": "100%",
            "position": "absolute",
            "background": "white",
            "opacity": props.Meta.IsFullyOpaque ? 1 : 0.5
        };
        return (
            blnShowAnimation ?
                <div style={{ height: "100%", width: "100%" }}>
                    <div style={objStyle1} />
                    <div className="component-animation-loader" style={objStyle}>
                        {
                            props.Meta.ShowLoadImage ?
                                props.Resource.ImagePath ?
                                    <img style={{ "width": "auto" }} src={props.Resource.ImagePath} />
                                    : props.Resource.SkinPath + '/Css/Framework/Controls/Animation/pluswhite.svg'
                                : <React.Fragment />
                        }
                    </div>
                </div > : ""
        );
    }

    return GetContent();

}

export default ComponentAnimation;