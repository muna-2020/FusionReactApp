//React imports
import React from 'react';

/**
 * @name CMSOverlay_Common
 * @param {object} props props form CMSOverlay_Editor/TestApplication version
 * @summary Contains the JSX of CMSOverlay
 * @returns {any} returns the cms overlay's JSX
 */
const CMSOverlay_Common = (props) => {

    let { Context, Events, Callbacks, AppType, TextElement } = props;

    /**
     * @name GetContent
     * @summary Renders the body for the overlay element.
     * @returns {JSX} JSX
     */
    const GetContent = () => {
        let strPrefix = ">>";
        let strSuffix = "?<<";
        let objStyle;
        if (Context.state.ElementJson["vElementJson"]["cIsFixedWidth"] === "Y") {
            objStyle = {
                ["width"]: Context.state.ElementJson["vElementJson"]["iWidth"] + "px"
            };
        }
        let objTextElementProps;
        if (AppType == "TestApplication" && Context.state.blnShowOverlay) {
            objTextElementProps = Callbacks.GetTextElementProps(Context.state.ElementJson["vElementJson"]["TextElements"][0]["iElementId"]);
        }
        let strCalssName = AppType === "TestApplication" ? "tooltip-container" : "";
        return (
            <span
                className={strCalssName}
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                type={Context.state.ElementJson["vElementJson"]["cIsTextOverlay"] === "N" ? "OverlayInfo" : "Overlay"}
                contentEditable={false}
                onDoubleClick={Events.ShowOverlaySidebar ? (event) => { Events.ShowOverlaySidebar(event); } : Events.ShowOverlaySidebar}>
                {
                    Context.state.ElementJson["vElementJson"]["cIsTextOverlay"] === "N" ?
                        AppType === "Editor" ?
                            <span style={{ display: "inline-block" }}>
                                <img
                                    className="overlay-image"
                                    src={Context.props.JConfiguration.IntranetSkinPath + "/Images/editor/info_green.svg"}
                                />
                            </span>
                            :
                            <span style={{ display: "inline-block" }} className="tt-trigger" onMouseOver={Events.OnMouseOver ? (event) => { Events.OnMouseOver(event); } : Events.OnMouseOver}>
                                <img
                                    className="overlay-image"
                                    onMouseOver={Events.OnMouseOver ? (event) => { Events.OnMouseOver(event); } : Events.OnMouseOver}
                                    src={Context.props.JConfiguration.IntranetSkinPath + "/Images/editor/info_green.svg"}
                                />
                                {
                                    Context.state.blnShowOverlay ?
                                        <div
                                            id={Context.state.ElementJson["iElementId"] + "_baloon"}
                                            className="tt-baloon bottom">
                                            <span className="text-content" style={objStyle} >
                                                <TextElement {...objTextElementProps} />
                                            </span>
                                        </div> : ""
                                }
                            </span>
                        :
                        AppType === "Editor" ?
                            Context.state.ElementJson["cIsFirstLoad"] && Context.state.ElementJson["cIsFirstLoad"] === "Y" ?
                                Context.state.ElementJson["vElementJson"]["Values"][0]["vOverlayKeyword"]
                                :
                                <React.Fragment>
                                    <sup>
                                        {strPrefix}
                                    </sup>
                                    <span type="OverlayDiv" dangerouslySetInnerHTML={{ __html: Context.state.ElementJson["vElementJson"]["Values"][0]["vOverlayKeyword"] }} />
                                    <sup>
                                        {strSuffix}
                                    </sup>
                                </React.Fragment>
                            :
                            <span>
                                <span type="OverlayDiv" dangerouslySetInnerHTML={{ __html: Context.state.ElementJson["vElementJson"]["Values"][0]["vOverlayKeyword"] }} />
                                <sup className="tt-trigger" onMouseOver={Events.OnMouseOver ? (event) => { Events.OnMouseOver(event); } : Events.OnMouseOver}>
                                    ?
                                    {
                                        Context.state.blnShowOverlay ?
                                            <div
                                                id={Context.state.ElementJson["iElementId"] + "_baloon"}
                                                className="tt-baloon bottom">
                                                <span className="text-content" style={objStyle}>
                                                    <TextElement {...objTextElementProps} />
                                                </span>
                                            </div> : ""
                                    }
                                </sup>
                            </span>
                }
            </span >
        );
    };

    return GetContent();
};

export default CMSOverlay_Common;
