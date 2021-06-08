// React related import
import React, { useReducer, useEffect, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related fies.
import * as CMSImage_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_Hook';
import CMSImage_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_ModuleProcessor";

// Throttle related import
import { throttle } from 'lodash';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSImage_Editor
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary CMSImage's editor version.
 * @returns {component} component
 */
const CMSImage_Editor = React.memo((props) => {

    /**
    * @summary Define state and dispatch for the reducer to set state and also, holds ref's.
    */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSImage_Editor_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSImage_Editor_" + props.ElementJson.iElementId,
        ["CMSImage_Editor_ModuleProcessor"]: new CMSImage_Editor_ModuleProcessor(),
        ["outerContainer"]: useRef(null),
        ["hotspotDataRef"]: useRef(null),
        ["imageArea"]: useRef(null),
        ["myCanvas"]: useRef(null),
        ["cropRight"]: useRef(null),
        ["cropLeft"]: useRef(null),
        ["cropTop"]: useRef(null),
        ["cropBottom"]: useRef(null),
        ["resize"]: useRef(null),
        ["rotate"]: useRef(null),
        ["innerContainer"]: useRef(null),
        ["alignRef"]: useRef({}),
        ["pixelLeftRef"]: useRef(null),
        ["pixelBottomRef"]: useRef(null),
        ["CropModes"]: [
            { "type": "top", "id": "cropTop", ref: useRef(), "index": 0, "vImageName": "cropTop.png" },
            { "type": "left", "id": "cropLeft", ref: useRef(), "index": 1, "vImageName": "cropLeft.png" },
            { "type": "bottom", "id": "cropBottom", ref: useRef(), "index": 2, "vImageName": "cropBottom.png" },
            { "type": "right", "id": "cropRight", ref: useRef(), "index": 3, "vImageName": "cropRight.png" },
            { "type": "rotate", "id": "rotate", ref: useRef(), "index": 4, "vImageName": "Rotate.png" },
            { "type": "resize", "id": "resize", ref: useRef(), "index": 5, "vImageName": "resize.png" }
        ]
    };

    /**
     * @name CMSImage_Editor_Hook.Initialize
     * @summary Initialize method call in CMSImage_Editor_Hook, that contains all the custom hooks.
     */

    CMSImage_Editor_Hook.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSImage_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSImage_Editor_ModuleProcessor);

    /**
     * @name useEffect
     * @summary this show the context menu for the sub-element.
     */
    useEffect(() => {     
            objContext.outerContainer.current.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
            objContext.CMSImage_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY)
            });
       },[objContext]);

    /**
    * @name useEffect
    * @summary   This sets the canvas width and height according to the image used and attaches event listener for editor div 
    */
    useEffect(() => {
        var img = objContext.imageArea.current;
        //img.src = `${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.iElementId}_Image_${objContext.state.ElementJson.vElementJson["iImageFileVersion"]}.${objContext.state.ElementJson.vElementJson["vImageType"]}`;
        img.addEventListener("load", function () {
            objContext.CMSImage_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext)
        });
        img.addEventListener("error", function () {
            objContext.CMSImage_Editor_ModuleProcessor.HandleImageLoadError(objContext)
        });

        return () => {
            img.removeEventListener("load", function () {
                objContext.CMSImage_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext)
            });
            img.removeEventListener("error", function () {
                objContext.CMSImage_Editor_ModuleProcessor.HandleImageLoadError(objContext)
            });
        };

    }, []);

    useEffect(() => {
        if (objContext.state.blnUndoRedoStateUpdate) {
            let img = objContext.imageArea.current;
            let objStateHistory = objContext.state.StateHistory[objContext.state.CurrentImageIndex + 1];
            img.src = objStateHistory["dataURL"][objStateHistory["dataURL"].length - 1];
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnUndoRedoStateUpdate": false }, "blnUndoRedoUpdate": false });
        }
    }, [objContext.state.arrSteps]);

    /**
     @name useEffect
     @summary helps in attaching mouseup and mousemove events
     */
    useEffect(() => {
        //var containerDiv = document.getElementById("editor_div");
        window.addEventListener("mousemove", handleThrottleOuterMouseMove);
        window.addEventListener("mouseup", handleOuterDivMouseUpCallBack);
        return () => {
            window.removeEventListener("mousemove", handleThrottleOuterMouseMove);
            window.removeEventListener("mouseup", handleOuterDivMouseUpCallBack);
        };
    }, [objContext.state]);

    /**
     * @name handleOuterDivMouseUpCallBack
     * @param {any} e mpuseup event
     * @summary handles mouseup event
     */
    const handleOuterDivMouseUpCallBack = (e) => {
        objContext.CMSImage_Editor_ModuleProcessor.handleOuterDivMouseUp(objContext, e);
    };

    /**
     * @name handleOuterContainerMouseUpCallback
     * @param {any} e mousemove event
     * @summary handles mousemove event
     */
    const handleOuterContainerMouseUpCallback = (e) => {
        objContext.CMSImage_Editor_ModuleProcessor.handleOuterContainerMouseUp(objContext, e);
    };

    /**
     * @name handleThrottleOuterMouseMove
     * @summary throttle helps is controlling the method execution rate
     * */
    const handleThrottleOuterMouseMove = throttle((event) => {
        if (objContext.state.blnDrawing) {
            const canvas = objContext.myCanvas.current;
            //var canvasOffset = canvas.getBoundingClientRect();
            const ctx = canvas.getContext("2d");
            canvas.style.cursor = "";
            const img = objContext.imageArea.current;
            if (objContext.state.blnEditMode && objContext.state.strSelectedCrop) {
                var eX = parseInt(event.pageX - objContext.state.objOffsetXY["x"]);
                var eY = parseInt(event.pageY - objContext.state.objOffsetXY["y"]);
                if ((eX > 0 && eX < objContext.state.canvasDimensions["width"] && eY < objContext.state.canvasDimensions["height"] && eY > 0) || objContext.state.strSelectedCrop === "resize") {
                    var blnCanvasDimensionsChanged = false;
                    switch (objContext.state.strSelectedCrop) {
                        case "cropLeft":
                            canvas.style.left = eX + "px";
                            var canvasWidth = objContext.state.canvasDimensions["width"];
                            ctx.canvas.width = canvasWidth - eX;
                            objContext.innerContainer.current.style.left = eX + "px";
                            objContext.innerContainer.current.style.width = canvasWidth - eX + "px";
                            objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            if (!objContext.state.blnImageCropped) {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                            }
                            blnCanvasDimensionsChanged = true;
                            break;
                        case "cropRight":
                            objContext.innerContainer.current.style.width = eX + "px";
                            ctx.canvas.width = eX;
                            objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            if (!objContext.state.blnImageCropped) {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                            }
                            blnCanvasDimensionsChanged = true;
                            break;
                        case "cropTop":
                            var canvasHeight = objContext.state.canvasDimensions["height"];
                            canvas.style.top = eY + "px";
                            ctx.canvas.height = canvasHeight - eY;
                            objContext.innerContainer.current.style.top = eY + "px";
                            objContext.innerContainer.current.style.height = canvasHeight - eY + "px";
                            objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            if (!objContext.state.blnImageCropped) {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                            }
                            blnCanvasDimensionsChanged = true;
                            break;
                        case "cropBottom":
                            ctx.canvas.height = eY;
                            objContext.innerContainer.current.style.height = eY + "px";
                            objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            if (!objContext.state.blnImageCropped) {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                            }
                            blnCanvasDimensionsChanged = true;
                            break;
                        case "resize":
                            //console.log(eX, eY);
                            // width and height cannot be less than 10
                            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                            var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                            if (eY > 10 && eX > 10) {//&& event.pageY < h - 34) {//&& event.pageX < w - 30) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                img.style.visibility = "hidden";
                                ctx.canvas.height = eY;
                                ctx.canvas.width = eX;
                                objContext.innerContainer.current.style.height = eY + "px";
                                objContext.innerContainer.current.style.width = eX + "px";
                                objContext.outerContainer.current.style.height = eY + "px";
                                objContext.outerContainer.current.style.width = eX + "px";
                                ctx.drawImage(img, 0, 0, eX, eY);
                                objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                                if (!objContext.state.blnImageCropped) {
                                    objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                                }
                                blnCanvasDimensionsChanged = true;
                            }
                            break;
                        default:
                            break;
                    }
                    if (blnCanvasDimensionsChanged) {
                        objContext.dispatch({ "type": "SET_STATE", "payload": { "imageOffset": { "width": canvas.width, "height": canvas.height } } })
                    }
                }
            }
        }
    }, 100);

    /**
     * @name GetImageCropContext
     * */
    const GetImageCropContext = () => {
        const imgPath = objContext.CMSImage_Editor_ModuleProcessor.GetImagePath(objContext);
        return (
            <div 
                ref={objContext.outerContainer}
                style={{ "position": "relative" }}>
                <div ref={objContext.innerContainer}
                    id={`image-inner-div-container-${objContext.state.ElementJson.iElementId}`}
                    style={{ "position": "absolute", "top": 0, "bottom": 0, "right": 0, "left": 0 }}>
                    {
                        objContext.CropModes.map((m, index) => {
                            if (m.type.toLowerCase() !== "rotate") {
                                return (
                                    <React.Fragment>
                                        <img
                                            key={`image-crop-${m.type}-${objContext.state.ElementJson.iElementId}`}
                                            ref={m.ref}
                                            index={m.index}
                                            id={m.id}
                                            className={`image-crop-${m.type}`}
                                            src={`${JConfiguration.IntranetSkinPath}/Images/editor/${m.vImageName}`}
                                            draggable="false"
                                            onMouseOver={(e) => { objContext.CMSImage_Editor_ModuleProcessor.handleCropMouseOver(objContext, m.id, m.index); }}
                                            onMouseDown={(e) => { objContext.CMSImage_Editor_ModuleProcessor.handleCropMouseDown(objContext); }}
                                            onMouseLeave={(e) => { objContext.CMSImage_Editor_ModuleProcessor.handleCropMouseLeave(objContext); }}
                                        />
                                    </React.Fragment>
                                )
                            }
                            else {
                                return (
                                    <img
                                        key={`image-crop-${m.type}-${objContext.state.ElementJson.iElementId}`}
                                        ref={m.ref}
                                        type="resize"
                                        index={m.index}
                                        id={m.id}
                                        className={`image-crop-${m.type}`}
                                        src={`${JConfiguration.IntranetSkinPath}/Images/editor/${m.vImageName}`}
                                        draggable="false"
                                        onClick={(e) => { objContext.CMSImage_Editor_ModuleProcessor.handleRotateClick(objContext, e); }}
                                    />
                                )
                            }
                        })
                    }
                    <span ref={objContext.pixelLeftRef} className="pixel-crop-left"> {`${objContext.state.imageOffset.height}px`} </span>
                    <span ref={objContext.pixelBottomRef} className="pixel-crop-bottom"> {`${objContext.state.imageOffset.width}px`} </span>
                    <canvas
                        ref={objContext.myCanvas}
                        id="myCanvas"
                        onMouseDown={(event) => { objContext.CMSImage_Editor_ModuleProcessor.handleMouseDown(objContext, event); }}
                        onMouseUp={(event) => { objContext.CMSImage_Editor_ModuleProcessor.handleMouseUp(objContext, event); }} >
                    </canvas>
                </div>
                <img
                    id={`Image_${objContext.state.ElementJson.iElementId}`}
                    ref={objContext.imageArea}
                    src={imgPath}
                    draggable="false"
                    alt={objContext.state.ElementJson.vElementImageName}
                />
                {!objContext.state.blnImageLoaded && <span>Image Not Found </span>}
            </div>
        );
    }

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let blnIsSubElement = false;
        if (objContext.props.IsSubElement != undefined && objContext.props.IsSubElement != null && objContext.props.IsSubElement.toLowerCase() == "y") {
            blnIsSubElement = true;
        }
        //const imagePath = objContext.CMSImage_Editor_ModuleProcessor.GetImagePath(objContext);
        let objTextElementProps = {};
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSImage_Editor_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        let alignmentProperties = {};
        if (objContext.state.ElementJson.vContainerElementProperties
            && objContext.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment
            && objContext.state.ElementJson.vContainerElementProperties.vElementHorizontalAlignment
            && blnIsSubElement) {
            var vHorizontalAlignment = objContext.CMSImage_Editor_ModuleProcessor.GetAlignmentValue("horizontal", objContext.state.ElementJson.vContainerElementProperties.vElementHorizontalAlignment);
            var vVerticalAlignment = objContext.CMSImage_Editor_ModuleProcessor.GetAlignmentValue("vertical", objContext.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment);
            alignmentProperties = { "display": "flex", "justifyContent": vHorizontalAlignment, "alignItems": vVerticalAlignment };
        }
        var showHeaderStatus = !objContext.state.blnEditMode && objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y";
        return (
            <div style={{ height: "100%", display: blnIsSubElement ? "inline-block" : "block" }}
                ielementid={objContext.state.ElementJson.iElementId}
                ielementtypeid={objContext.state.ElementJson.iElementTypeId}
                type={objContext.props.IsTextSubElement == "Y" ? "Image_Text" : "Image"}
                contentEditable={false}
                id={objContext.state.ElementJson.iElementId}>
                <div>
                    {
                        !objContext.state.blnEditMode && objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <CMSText_Editor {...objTextElementProps} /> : ""
                    }
                </div>
                <div ref={objContext.alignRef}
                    className="image-outer-wrapper"
                    style={{ "height": showHeaderStatus ? "calc(100% - 34px)" : "100%", ...alignmentProperties }}>
                    {
                        GetImageCropContext()
                    }
                </div>
            </div>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent();
}, (prevProps, nextProps) => {
    if (prevProps.ElementJson.iElementId !== nextProps.ElementJson.iElementId) {
        return false;
    }
    return true;
});

export default CMSImage_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSImage_Editor_ModuleProcessor; 