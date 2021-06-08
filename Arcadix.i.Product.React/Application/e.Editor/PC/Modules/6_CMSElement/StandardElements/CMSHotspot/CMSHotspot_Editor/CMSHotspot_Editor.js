// React related import
import React, { useReducer, useEffect, useRef } from 'react';

//Application State classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import * as CMSHotspot_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_Editor/CMSHotspot_Editor_Hook';
import CMSHotspot_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_Editor/CMSHotspot_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

// Throttle related import
import { throttle } from 'lodash';

/**
 * @name CMSHotspot_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSHotspot's editor version.
 * @returns {any} return's JSX
 */
const CMSHotspot_Editor = (props, ref) => {

    // References for handling image crop buttons
    const rotateImageDefaultTop = 24;

    /**
    * @name [state,dispatch, ref]
    * @summary Define state and dispatch for the reducer to set state and also, holds ref's.
    */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSHotspot_Editor_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props, state, dispatch, ["CMSHotspot_Editor_ModuleProcessor"]: new CMSHotspot_Editor_ModuleProcessor(),
        "ModuleName": "CMSHotspot_Editor_" + props.ElementJson.iElementId,
        ["rotateImageDefaultTop"]: rotateImageDefaultTop,
        ["outerContainer"]: useRef(null),
        ["innerContainer"]: useRef(null),
        ["hotspotRef"]: useRef(null),
        ["imageArea"]: useRef(null),
        ["myCanvas"]: useRef(null),
        ["cropRight"]: useRef(null),
        ["cropLeft"]: useRef(null),
        ["cropTop"]: useRef(null),
        ["cropBottom"]: useRef(null),
        ["resize"]: useRef(null),
        ["rotate"]: useRef(null),
        ["alignRef"]: useRef(null),
        ["pixelLeftRef"]: useRef(null),
        ["pixelBottomRef"]: useRef(null),
        ["CropModes"]: [
            { "type": "top", "id": "cropTop", ref: useRef(), "index": 0, "vImageName": "cropTop.png" },
            { "type": "left", "id": "cropLeft", ref: useRef(), "index": 1, "vImageName": "cropLeft.png" },
            { "type": "bottom", "id": "cropBottom", ref: useRef(), "index": 2, "vImageName": "cropBottom.png" },
            { "type": "right", "id": "cropRight", ref: useRef(), "index": 3, "vImageName": "cropRight.png" },
            { "type": "rotate", "id": "rotate", ref: useRef(), "index": 4, "vImageName": "Rotate.png" },
            { "type": "resize", "id": "resize", ref: useRef(), "index": 5, "vImageName": "resize.png" }
        ],
        ["StyleProperties"]: { "strokeStyle": "#000", "lineWidth": 1 }
    };

    /**
     * @name CMSHotspot_Editor_Hook.Initialize
     * @summary Initialize method call in CMSHotspot_Editor_Hook, that contains all the custom hooks.
     */

    CMSHotspot_Editor_Hook.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSHotspot_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSHotspot_Editor_ModuleProcessor);

    /**
    * @name useEffect
    * @summary   This sets the canvas width and height according to the image used and attaches event listener for editor div 
    */
    useEffect(() => {
        EditorState.SetReference("HotspotRef", objContext.hotspotRef);
        //var editorDiv = document.getElementById("editor_div");
        //window.addEventListener("mouseup", handleOuterContainerMouseUpCallback);
        var img = objContext.imageArea.current;
        //img.src = `${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.vImageElementJson.iElementId}_Image_${objContext.state.ElementJson.vImageElementJson.vElementJson["iImageFileVersion"]}.${objContext.state.ElementJson.vImageElementJson.vElementJson["vImageType"]}`;
        img.addEventListener("load", function () {
            objContext.CMSHotspot_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext)
        });
        img.addEventListener("error", function () {
            objContext.CMSHotspot_Editor_ModuleProcessor.HandleImageLoadError(objContext)
        });
        return () => {
            //window.removeEventListener("mouseup", handleOuterContainerMouseUpCallback);
            img.removeEventListener("load", function () {
                objContext.CMSHotspot_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext)
            });
            img.removeEventListener("error", function () {
                objContext.CMSHotspot_Editor_ModuleProcessor.HandleImageLoadError(objContext)
            });
        };
    }, []);

    /**
     @name useEffect
     @summary helps in attaching mouseup and mousemove events
     */
    useEffect(() => {
        //var containerDiv = document.getElementById("editor_div");
        window.addEventListener("mousemove", handleThrottleOuterMouseMove);
        window.addEventListener("mouseup", handleOuterDivMouseUpCallBack);
        window.addEventListener('resize', function (e) {
            objContext.CMSHotspot_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext);
        });
        return () => {
            window.removeEventListener("mousemove", handleThrottleOuterMouseMove);
            window.removeEventListener("mouseup", handleOuterDivMouseUpCallBack);
            window.removeEventListener('resize', function (e) {
                objContext.CMSHotspot_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext);
            });
        };
    }, [objContext.state]);

    useEffect(() => {
        if (objContext.state.blnUndoRedoStateUpdate) {
            let img = objContext.imageArea.current;
            let objStateHistory = objContext.state.StateHistory[objContext.state.CurrentImageIndex + 1];
            img.src = objStateHistory["dataURL"][objStateHistory["dataURL"].length - 1];
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnUndoRedoStateUpdate": false }, "blnUndoRedoUpdate": false });
        }
    }, [objContext.state.arrSteps]);

    useEffect(() => {
        if (objContext.state.blnUndoRedoStateUpdate) {
            objContext.CMSHotspot_Editor_ModuleProcessor.cleanAndRedraw(objContext, objContext.state.CurrentImageIndex > 0 ? objContext.state.arrBoundingBoxes : objContext.state.ElementJson.vElementJson.Values, false);
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnUndoRedoStateUpdate": false, "blnRedraw": true }, "blnUndoRedoUpdate": false });
            if (objContext.state.CurrentImageIndex === 0) {
                objContext.CMSHotspot_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext);
            }
        }
    }, [objContext.state.arrBoundingBoxes]);

    useEffect(() => {
        objContext.CMSHotspot_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext);
    }, [
        objContext.state.ElementJson.vImageElementJson.vContainerElementProperties
    ]);

    /**
     * @name handleOuterDivMouseUpCallBack
     * @param {any} e mpuseup event
     * @summary handles mouseup event
     */
    const handleOuterDivMouseUpCallBack = (e) => {
        objContext.CMSHotspot_Editor_ModuleProcessor.handleOuterDivMouseUp(objContext, event);
    };

    /**
     * @name handleOuterContainerMouseUpCallback
     * @param {any} e mousemove event
     * @summary handles mousemove event
     */
    const handleOuterContainerMouseUpCallback = (e) => {
        objContext.CMSHotspot_Editor_ModuleProcessor.handleOuterContainerMouseUp(objContext, e);
    };

    /**
     * @name handleThrottleOuterMouseMove
     * @summary throttle helps is controlling the method execution rate
     * */
    const handleThrottleOuterMouseMove = throttle((event) => {
        if (objContext.state.blnDrawing) {
            const canvas = objContext.myCanvas.current;
            const ctx = canvas.getContext("2d");
            canvas.style.cursor = "";
            const img = objContext.imageArea.current;
            var points = {};
            var styleProperties;
            var shapeObject;
            var eX;
            var eY;
            if (!objContext.state.blnEditMode) {
                switch (objContext.state.selectedShape) {
                    case "Rectangle":
                        var m = objContext.CMSHotspot_Editor_ModuleProcessor.relativeCoordinatesForEvent(objContext, event);
                        points.x = objContext.state.objStartXY["x"];  // start position of x
                        points.y = objContext.state.objStartXY["y"];  // start position of y
                        points.eX = m.x - objContext.state.objStartXY["x"];  // width
                        points.eY = m.y - objContext.state.objStartXY["y"];  // height
                        points.endX = m.x;
                        points.endY = m.y;
                        styleProperties = objContext.StyleProperties; //{ "strokeStyle": "black", "lineWidth": 2 };
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        objContext.CMSHotspot_Editor_ModuleProcessor.reDraw(objContext, objContext.state.arrBoundingBoxes);
                        shapeObject = { points, styleProperties };
                        objContext.CMSHotspot_Editor_ModuleProcessor.drawRectangle(objContext, shapeObject, false, true);
                        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        break;
                    case "Ellipse":
                        eX = parseInt(event.pageX - objContext.state.objOffsetXY["x"]);
                        eY = parseInt(event.pageY - objContext.state.objOffsetXY["y"]);
                        points.x = objContext.state.objStartXY["x"];
                        points.y = objContext.state.objStartXY["y"];
                        points.eX = eX;
                        points.eY = eY;
                        styleProperties = objContext.StyleProperties; //{ "strokeStyle": "black", "lineWidth": 2 };
                        // var canvas = objContext.myCanvas.current;
                        // var ctx = canvas.getContext("2d");
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        objContext.CMSHotspot_Editor_ModuleProcessor.reDraw(objContext, objContext.state.arrBoundingBoxes);
                        shapeObject = { points, styleProperties };
                        objContext.CMSHotspot_Editor_ModuleProcessor.drawEllipse(objContext, shapeObject, false, true);
                        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        break;
                    default:
                        break;
                }
            }
            if (objContext.state.blnEditMode && objContext.state.strSelectedCrop) {
                //var ctx = canvas.getContext("2d");
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                eX = parseInt(event.pageX - objContext.state.objOffsetXY["x"]);
                eY = parseInt(event.pageY - objContext.state.objOffsetXY["y"]);

                if ((eX > 0 && eX < objContext.state.canvasDimensions["width"] && eY < objContext.state.canvasDimensions["height"] && eY > 0) || objContext.state.strSelectedCrop === "resize") {
                    let blnCanvasDimensionsChanged = false;
                    switch (objContext.state.strSelectedCrop) {
                        case "cropLeft":
                            canvas.style.left = eX + "px";
                            var canvasWidth = objContext.state.canvasDimensions["width"];
                            ctx.canvas.width = canvasWidth - eX;
                            objContext.innerContainer.current.style.left = eX + "px";
                            objContext.innerContainer.current.style.width = canvasWidth - eX + "px";
                            objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            if (!objContext.state.blnImageCropped) {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                            }
                            blnCanvasDimensionsChanged = true;
                            break;
                        case "cropRight":
                            objContext.innerContainer.current.style.width = eX + "px";
                            ctx.canvas.width = eX;
                            objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
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
                            objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            if (!objContext.state.blnImageCropped) {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                            }
                            blnCanvasDimensionsChanged = true;
                            break;
                        case "cropBottom":
                            ctx.canvas.height = eY;
                            objContext.innerContainer.current.style.height = eY + "px";
                            objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            if (!objContext.state.blnImageCropped) {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageCropped": true }, "blnUndoRedoUpdate": false });
                            }
                            blnCanvasDimensionsChanged = true;
                            break;
                        case "resize":
                            console.log(eX, eY);
                            // width and height cannot be less than 10
                            if (eY > 10 && eX > 10) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                img.style.visibility = "hidden";
                                //objContext.outerContainer.current.style.zIndex = "1000";
                                ctx.canvas.height = eY;
                                ctx.canvas.width = eX;
                                objContext.innerContainer.current.style.height = eY + "px";
                                objContext.innerContainer.current.style.width = eX + "px";
                                objContext.outerContainer.current.style.height = eY + "px";
                                objContext.outerContainer.current.style.width = eX + "px";
                                ctx.drawImage(img, 0, 0, eX, eY);
                                objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
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
    }, 0);

    const GetContent = () => {
        let objTextElementProps = {};
        if (state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSHotspot_Editor_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        var vHorizontalAlignment = objContext.CMSHotspot_Editor_ModuleProcessor.GetAlignmentValue("horizontal", objContext.state.ElementJson.vImageElementJson.vContainerElementProperties.vElementHorizontalAlignment);
        var vVerticalAlignment = objContext.CMSHotspot_Editor_ModuleProcessor.GetAlignmentValue("vertical", objContext.state.ElementJson.vImageElementJson.vContainerElementProperties.vElementVerticalAlignment);
        var showHeaderStatus = !objContext.state.blnEditMode && objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y";
        return (
            <div style={{ "height": "100%" }}
                ielementid={objContext.state.ElementJson.iElementId}
                ielementtypeid={objContext.state.ElementJson.iElementTypeId}
                contentEditable={false}
                id={objContext.state.ElementJson.iElementId}>
                <div>
                    {
                        objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <CMSText_Editor {...objTextElementProps} /> : ""
                    }
                </div>
                <div
                    ielementid={objContext.state.ElementJson.iElementId}
                    ielementtypeid={objContext.state.ElementJson.iElementTypeId}
                    type={objContext.state.ElementJson.vElementTypeName}
                    id={objContext.state.ElementJson.iElementId}
                    ref={objContext.alignRef}
                    className="image-outer-wrapper"
                    style={{ "height": showHeaderStatus ? "calc(100% - 34px)" : "100%", "display": "flex", "justifyContent": vHorizontalAlignment, "alignItems": vVerticalAlignment }}>
                    <div id={`hotspot-outer-div-${objContext.state.ElementJson.iElementId}`}
                        ref={objContext.outerContainer}
                        style={{ "position": "relative" }}
                        onContextMenu={(e) => { e.stopPropagation(); e.preventDefault(); objContext.CMSHotspot_Editor_ModuleProcessor.OpenContextMenu(objContext, e.pageX, e.pageY); }}>
                        <div ref={objContext.innerContainer}
                            id={`image-inner-div-container-${objContext.state.ElementJson.iElementId}`}
                            style={{ "position": "absolute", "top": 0, "bottom": 0, "right": 0, "left": 0 }}>
                            {
                                objContext.CropModes.map(m => {
                                    if (m.type.toLowerCase() !== "rotate") {
                                        return (
                                            <img
                                                ref={m.ref}
                                                index={m.index}
                                                id={m.id}
                                                className={`image-crop-${m.type}`}
                                                src={`${JConfiguration.IntranetSkinPath}/Images/editor/${m.vImageName}`}
                                                draggable="false"
                                                onMouseDown={(e) => { objContext.CMSHotspot_Editor_ModuleProcessor.handleCropMouseDown(objContext, e.target.id); }}
                                            />
                                        )
                                    }
                                    else {
                                        return (
                                            <img
                                                ref={m.ref}
                                                type="resize"
                                                index={m.index}
                                                id={m.id}
                                                className={`image-crop-${m.type}`}
                                                src={`${JConfiguration.IntranetSkinPath}/Images/editor/${m.vImageName}`}
                                                draggable="false"
                                                onClick={(e) => { objContext.CMSHotspot_Editor_ModuleProcessor.handleRotateClick(objContext); }}
                                            />
                                        )
                                    }
                                })
                            }
                            <span ref={objContext.pixelLeftRef} className="pixel-crop-left"> {`${objContext.state.imageOffset.height}px`} </span>
                            <span ref={objContext.pixelBottomRef} className="pixel-crop-bottom"> {`${objContext.state.imageOffset.width}px`} </span>
                            <canvas ref={objContext.myCanvas}
                                id="myCanvas"
                                width="0"
                                height="0"
                                onMouseDown={(event) => { objContext.CMSHotspot_Editor_ModuleProcessor.handleMouseDown(objContext, event) }}
                                onMouseUp={(event) => { objContext.CMSHotspot_Editor_ModuleProcessor.handleMouseUp(objContext, event); }}
                            >
                            </canvas>
                        </div>
                        <img ref={objContext.imageArea}
                            id={`Hotspot_Image_${objContext.props.ElementJson.iElementId}`}
                            draggable="false"
                            src={`${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.vImageElementJson.iElementId}_Image_${objContext.state.ElementJson.vImageElementJson.vElementJson["iImageFileVersion"]}.${objContext.state.ElementJson.vImageElementJson.vElementJson["vImageType"]}`}
                            alt={state.ElementJson.vImageElementJson.vElementJson.vElementImageFileName}
                        />
                        {!objContext.state.blnImageOnLoadSuccesful && <span>Image Not Found </span>}
                    </div>
                </div>
            </div>
        );
    };

    return GetContent();
};

export default CMSHotspot_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSHotspot_Editor_ModuleProcessor; 