//React related import
import React from 'react';

const CMSMultiPageElement_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, ImageElement, AppType } = props;

    /**
     * @name GetElements
     * @summary Calls the GetSlideElement function of the common.
     * @returns {any} returns slide elements JSX
     */
    const GetElements = () => {
        let Element = null;
        var arrElements = Context.state.ElementJson.vElementJson.Values.map((ele, index) => {

            if (ele && ele.vElementTypeName.toLowerCase() !== "empty") {
                Element = ele.vElementTypeName.toLowerCase() === "text" ? TextElement : ele.vElementTypeName.toLowerCase() === "image" ? ImageElement : Context.props.ComponentController.GetElement(ele.vElementTypeName);
                var objElementJson = ele.vElementTypeName.toLowerCase() === "text" ? Context.state.ElementJson.vElementJson.TextElements.filter(obj => obj.iElementId === ele.iElementTextId)[0] : ele;
                let objElementProps = {
                    ...Context.props,
                    ["ElementRef"]: ele.vElementTypeName.toLowerCase() === "text" ? objElementJson["Ref"] : ele["Ref"] ? ele["Ref"] : React.createRef(),
                    ["ParentRef"]: Context.props.ElementRef,
                    ["ElementJson"]: objElementJson,
                    ["IsSubElement"]: objElementJson["IsSubElement"] ? objElementJson["IsSubElement"] : "Y"
                };
                if (ele.vElementTypeName.toLowerCase() === "text") {
                    objElementProps = Callbacks.GetTextElementProps(ele.iElementTextId);
                }
                return (
                    <div className="animated fadeIn"
                        key={`Multipage-slide-${Context.state.ElementJson.iElementId}-${index}`}
                        type={`Multipage-slide-${Context.state.ElementJson.iElementId}`}
                        style={{ "float": "left", "padding": "0 12px", "display": Context.state.intCurrentSlideIndex === index ? "block" : "none" }}>
                        {Element && <Element {...objElementProps} />}
                    </div>
                );
            }
            else {
                return (
                    <div
                        className="slideplaceholder"
                        key={`Multipage-slide-${Context.state.ElementJson.iElementId}-${index}`}
                        onDrop={(event) => Events.OnPlaceHolderDrop(event)}
                        onDragOver={(event) => { event.preventDefault(); event.stopPropagation(); }}
                        style={{ "float": "left", "display": Context.state.intCurrentSlideIndex === index ? "block" : "none" }}>
                        <img alt="Empty-Slide" src={JConfiguration.IntranetSkinPath + "/Images/Editor/form_placeholder.gif"} />
                    </div>
                );
            }
        });
        return arrElements;
    };

    /**
     * @name GetIndicatorElements
     * @summary Calls the GenerateSlideIndicators function of the common.
     * @returns {any} returns indicator elements JSX
     */
    const GetIndicatorElements = () => {
        let arrSlideIndicators = [];
        for (let i = 0; i < Context.state.intSlideLength; i++) {
            let strClassName = i === Context.state.intCurrentSlideIndex ? "dot active" : "dot";
            arrSlideIndicators = [
                ...arrSlideIndicators,
                <span
                    key={"indicator_" + i}
                    indicatornumber={i}
                    className={strClassName}
                    onClick={Callbacks.AddOrDeleteSlide ? (e) => { Callbacks.AddOrDeleteSlide(e.target.getAttribute("indicatornumber")); } : Callbacks.AddOrDeleteSlide} />
            ];
        }
        return arrSlideIndicators;
    };

    /**
     * @name GetContent
     * @summary Calls the RenderBody method to get the JSX.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextElementProps = {}; let blnDisablePrevButton = true; let blnDisableNextButton = true;
        let sliderPreviousBtnStyle = { "backgroundColor": "#d3d3d3", "cursor": "not-allowed" };
        let sliderNextBtnStyle = { "backgroundColor": "#d3d3d3", "cursor": "not-allowed" };
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        if (Context.state.intCurrentSlideIndex > 0) {
            blnDisablePrevButton = false;
            sliderPreviousBtnStyle = { "backgroundColor": "#5a5a5a", "cursor": "pointer" };
        }
        if (Context.state.intCurrentSlideIndex < Context.state.ElementJson.vElementJson.Values.length - 1) {
            blnDisableNextButton = false;
            sliderNextBtnStyle = { "backgroundColor": "#5a5a5a", "cursor": "pointer" };
        }
        var styleProperties = { "display": "flex", "justifyContent": "center", "alignItems": "center", "minHeight": "100px" };
        if (Context.state.ElementJson.vContainerElementProperties) {
            var height = Context.state.ElementJson.vContainerElementProperties.iElementHeight;
            var width = Context.state.ElementJson.vContainerElementProperties.iElementWidth;
            styleProperties = { ...styleProperties, "minHeight": height + "px" };
            if (AppType.toLowerCase() === "testapplication") {
                styleProperties = { ...styleProperties, "width": width + "px", "height": height + "px" }
            }
        }
        return (
            <div ielementid={Context.state.ElementJson.iElementId} ielementtypeid={Context.state.ElementJson.iElementTypeId}
                style={{ "display": "inline-block" }}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <TextElement {...objTextElementProps} /> : ""
                }
                <div className="slide-parent-wrapper" onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}>
                    <div
                        ref={Context.slideContainer}
                        id={"multipage_" + Context.state.ElementJson.iElementId}
                        className="multipage-slide-container"
                    >
                        <div ref={Context.slideWrapper} id={`slide-wrapper-${Context.state.ElementJson.iElementId}`} style={styleProperties}>
                            {
                                GetElements()
                            }
                        </div>
                        <a className="slide-prev" style={sliderPreviousBtnStyle} onClick={() => { Events.HandleSlideNavigation("Previous", blnDisablePrevButton); }}>&#10094;</a>
                        <a className="slide-next" style={sliderNextBtnStyle} onClick={() => { Events.HandleSlideNavigation("Next", blnDisableNextButton); }}>&#10095;</a>
                    </div>
                </div>
                <div className="dotwrapper">
                    {
                        GetIndicatorElements()
                    }
                </div>
            </div>
        );
    };

    return GetContent();
};

export default CMSMultiPageElement_Common;
