//React imports
import React, { useEffect } from 'react';

//Component Animation.
import ComponentAnimation from '@root/Framework/Controls/ComponentAnimation/ComponentAnimation';

/**
 * @name CMSIFrame_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSIFrame
 * @returns {any} Common Component
 */
const CMSIFrame_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    const OnIFrameLoadComplete = () => {
        Context.iFrame_LoadedOnceRef.current = true;
        if (AppType === "TestApplication") {
            Context.OverlayDiv_Ref.current.style.display = "none";
        }
        Context.ComponentAnimationRef.current.blnShowComponentAnimation(false);
        try {
            let objDocument = Context.iFrameRef.current.contentDocument || Context.iFrameRef.current.contentWindow.document;
            objDocument.addEventListener("contextmenu", (event) => {
                event.stopPropagation();
                event.preventDefault();
            });
            if (Context.state.ElementJson["vElementJson"]["cIsScroll"] === "Y") {
                objDocument.body.setAttribute("style", "overflow: scroll");
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (AppType === "Editor" && (!Context.state.ElementJson["cIsFirstLoad"] || Context.state.ElementJson["cIsFirstLoad"] === "N") && Context.iFrame_LoadedOnceRef.current) {
            if (AppType === "TestApplication") {
                Context.OverlayDiv_Ref.current.style.display = "block";
            }
            try {
                let objDocument = Context.iFrameRef.current.contentDocument || Context.iFrameRef.current.contentWindow.document;
                if (Context.state.ElementJson["vElementJson"]["cIsScroll"] === "Y") {
                    objDocument.body.setAttribute("style", "overflow: scroll");
                }
                else {
                    objDocument.body.setAttribute("style", "overflow: hidden");
                }
            }
            catch (e) {
                console.log(e);
            }
            finally {
                let objStyle = {
                    "height": Context.state.ElementJson["vElementJson"]["iHeight"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iHeight"] + "px",
                    "width": Context.state.ElementJson["vElementJson"]["iWidth"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iWidth"] + "px",
                };
                let objIframeOverlayDiv = Context.OverlayDiv_Ref.current;
                objIframeOverlayDiv.style.height = objStyle["height"];
                objIframeOverlayDiv.style.width = objStyle["width"];
                if (AppType === "TestApplication") {
                    Context.OverlayDiv_Ref.current.style.display = "none";
                }
                Context.ComponentAnimationRef.current.blnShowComponentAnimation(false);
            }
        }
    }, [Context.state.ElementJson]);

    /**
     * @name GetContent
     * @summary Render the body
     * @returns {any} JSX.
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        let objIframeStyles = {
            "height": Context.state.ElementJson["vElementJson"]["iHeight"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iHeight"],
            "width": Context.state.ElementJson["vElementJson"]["iWidth"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iWidth"],
        };
        let objOverlayFrameStyle = {
            "height": Context.state.ElementJson["vElementJson"]["iHeight"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iHeight"] + "px",
            "width": Context.state.ElementJson["vElementJson"]["iWidth"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iWidth"] + "px",
            "position": "absolute",
            "top": "0px",
            "left": "0px"
        };
        if (AppType === "TestApplication") {
            objOverlayFrameStyle = {
                ...objOverlayFrameStyle,
                "display": "block"
            };
        }
        let objIframeWrapeprDivStyles = {
            "position": "relative",
        };
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            objIframeWrapeprDivStyles = {
                ...objIframeWrapeprDivStyles,
                "marginTop": "1px"
            };
        }
        let strClassName = "iframe-container-div";
        return (
            <div
                ref={Context.MainRef}
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                className={strClassName}
                onContextMenu={Events.OpenContextMenu}
            >
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                {
                    Context.state.ElementJson["vElementJson"]["vURL"] ?
                        <div style={objIframeWrapeprDivStyles}>
                            <iframe
                                style={objIframeStyles}
                                frameBorder="0"
                                ref={Context.iFrameRef}
                                src={Context.state.ElementJson["vElementJson"]["vURL"]}
                                onLoad={() => { setTimeout(OnIFrameLoadComplete, 100); }}
                            />
                            <div ref={Context.OverlayDiv_Ref} style={objOverlayFrameStyle}>
                                <ComponentAnimation
                                    Meta={{ "ShowLoadImage": true, "ShowAnimation": true, "ComponentAnimationRef": Context.ComponentAnimationRef }}
                                    Resource={{ "ImagePath": Context.props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }}
                                />
                            </div>
                        </div> : ""
                }
            </div >
        );
    };

    return GetContent();
};

export default CMSIFrame_Common;
