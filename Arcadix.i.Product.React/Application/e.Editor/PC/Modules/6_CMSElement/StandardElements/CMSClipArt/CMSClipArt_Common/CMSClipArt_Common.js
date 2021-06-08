// React related imports
import React from 'react';

/**
 * @name CMSTextArea_Common
 * @param {object} props props from parent
 * @summary CMSRadio's common version.
 * @returns {Component} CMSRadio_Common
 */
const CMSClipArt_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Render the Radio body
     * @returns {any} Returns the JSX for the Radio.
     */
    const GetContent = () => {
        return (
            <span ielementid={Context.state.ElementJson.iElementId} ielementtypeid={Context.state.ElementJson.iElementTypeId} contentEditable={false}>
                <div style={{ "display": "inline-block", "position": "relative" }}>
                    <img ref={Context.clipArtImageRef}
                        className="clipart-image"
                        type={`clipart-image-${Context.state.ElementJson.iElementId}`}
                        style={{ "width": Context.state.ElementJson.vElementJson.iWidth, "height": Context.state.ElementJson.vElementJson.iHeight }}
                        onClick={(e) => { Events.HandleImageClick ? Events.HandleImageClick(e) : Events.HandleImageClick}}
                        src={`${Context.props.JConfiguration.EditorSkinPath}/Images/2_OfficeRibbon/2_Insert/Illustration/OftenUsedSvg/${Context.state.ElementJson.vElementJson.vFolderName}/${Context.state.ElementJson.vElementJson.vFileName}.svg`} />
                    <img
                        type={`clipart-resize-${Context.state.ElementJson.iElementId}`}
                        ref={Context.resizeRef}
                        id="resize"
                        src={Context.props.JConfiguration.IntranetSkinPath + "/Images/editor/resize.png"}
                        draggable="false"
                        onMouseDown={(e) => { Events.HandleResizeMouseDown ? Events.HandleResizeMouseDown(e) : Events.HandleResizeMouseDown }}
                        style={{ "position": "absolute", "display": "none", "zIndex": "30", "right": 0, "bottom": 0 }}
                    />
                </div>
            </span>
        );
    };

    return GetContent();
};

export default CMSClipArt_Common;
