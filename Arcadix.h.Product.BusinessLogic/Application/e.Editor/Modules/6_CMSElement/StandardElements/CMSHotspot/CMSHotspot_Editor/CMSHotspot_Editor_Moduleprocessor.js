//Module realted fies.
import CMSHotspot_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_Editor/CMSHotspot_Editor_ContextMenu";

import * as Image from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Upload_Save";
import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData";

//Application State classes.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name CMSHotspot_Editor_ModuleProcessor
 * @summary Contains the Hotspot's editor version module specific methods.
 * */
class CMSHotspot_Editor_ModuleProcessor extends CMSHotspot_Editor_ContextMenu {

    /**
    * @name UpdateElementJson
    * @param {object} objContext {props, state, dispatch}
    * @param {object} objElementJson element json
    * @summary gets the selected elemnt json 
    */
    UpdateElementJson(objContext, objElementJson) {
        const canvas = objContext.myCanvas.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["iOrder"]: objContext.state.ElementJson.iOrder,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson.vElementJson,
                        ["iElementImageId"]: objElementJson["iElementId"],
                        ["Values"]: []
                    },
                    "vImageElementJson": {
                        ...objElementJson,
                        ...CMSImage_Editor_MetaData.GetDefaultContainerElementProperties()
                    }
                },
                "arrBoundingBoxes": [],
                "blnImageOnLoadSuccesful": true
            }
        });
    }

    /**
     * @name OpenAddPopup
     * @param {object} objContext {props, state, dispatch, PassedEvents, Data}
     * @summary opens image add edit popup
     */
    OpenAddPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": "Image",
                "iContainerId": objContext.props.iContainerId,
                "ElementJson": { ...objContext.state.ElementJson },
                "ShowMultiMediaAddEdit": true,
                //"ShowMultiMediaManagement": true,
                "ActionType": "Add",
                "ShowAllTabs": true,
                "PreSelectNode": { ...objContext.state.ElementJson.vImageElementJson }
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": 'auto',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    objContext.CMSHotspot_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            }
        });
    }

    handleImageLoad(objContext) {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageLoaded": true } });
    }

    /**
     * @name setCanvasWidthAndHeight
     * @param {object} objContext {props, state, dispatch, Ref's}
     * */
    setCanvasWidthAndHeight(objContext) {
        try {
            if (objContext.props.ElementRef && objContext.props.ElementRef.current && objContext.props.ElementRef.current.GetLatestContext) {
                objContext = objContext.props.ElementRef.current.GetLatestContext();
            }
            if (objContext.state.blnImageOnLoadSuccesful) {
                const canvas = objContext.myCanvas.current;
                console.log(objContext.myCanvas, canvas, canvas.getBoundingClientRect());
                //canvas.style.cursor = "crosshair";
                var outerWrapper = objContext.outerContainer.current;
                var canvasRect = canvas.getBoundingClientRect();
                var outerDiv = objContext.outerContainer.current.getBoundingClientRect();
                var outerLeft = outerDiv.left;
                var outerTop = outerDiv.top;
                var canvasLeft = canvasRect.left;
                var canvasTop = canvasRect.top;

                const ctx = canvas.getContext("2d");
                const img = objContext.imageArea.current;
                ctx.canvas.width = img.width;
                ctx.canvas.height = img.height;
                const innerContainer = objContext.innerContainer.current;
                innerContainer.style.height = img.height + "px";
                innerContainer.style.width = img.width + "px";
                if (!objContext.state.blnRedraw && img.complete) {
                    console.log(img.complete)
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }

                img.style.display = "block";
                //img.onload = null;
                let dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "canvasDimensions": { "width": canvas.width, "height": canvas.height },
                        "imageOffset": { "width": canvas.width, "height": canvas.height },
                        //"objOffsetXY": { "x": canvasLeft, "y": canvasTop, "left": 0, "top": 0 },
                        "objOffsetXY": { "x": outerLeft, "y": outerTop, "left": outerLeft - canvasLeft, "top": outerTop - canvasTop },
                        //"objOffsetXY": { "x": canvasLeft, "y": canvasTop, "left": canvasLeft - outerLeft, "top": canvasTop - outerTop },
                        "blnUndoRedoUpdate": false,
                        "dataURL": [...objContext.state.dataURL, dataURL]
                    },
                    "blnUndoRedoUpdate": false
                });

                if (objContext.state.arrBoundingBoxes.length > 0) {
                    objContext.CMSHotspot_Editor_ModuleProcessor.reDraw(objContext, objContext.state.arrBoundingBoxes);
                }

                // ReDrawing shapes, if saved data contains shape values
                if (objContext.state.blnImageLoaded) {
                    objContext.CMSHotspot_Editor_ModuleProcessor.reDraw(objContext, objContext.state.ElementJson.vElementJson.Values, true);
                }
            }
        }
        catch (ex) {
            console.log("IMAGE-ONLOAD-ERROR", ex)
        }
    }

    /**
    * @name HandleImageLoadError
    * @param {object} objContext {state, props, dispatch}
    * @summary sets image loaded to false when image gets failed to load
    */
    HandleImageLoadError(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "blnImageOnLoadSuccesful": false
            },
            "blnUndoRedoUpdate": false
        });
        const canvas = objContext.myCanvas.current;
        const ctx = canvas.getContext("2d");
        ctx.canvas.width = 0;
        ctx.canvas.height = 0;
        const innerContainer = objContext.innerContainer.current;
        innerContainer.style.height = "0px";
        innerContainer.style.width = "0px";
    }

    /**
     * @name reDraw
     * @param {object} objContext {state, props, dispatch, ref}
     * @param {array} arrData shape array data
     * @param {int} initialLoad Default value is set to false
     * @summary Redraw's old shape when a new shape is drawn
     */
    reDraw(objContext, arrData, initialLoad = false) {
        var arrUpdatedBoundings = [];

        if (arrData) {
            arrData.map(objShape => {
                if (objShape["shape"] === "Rectangle") {
                    var objRect = objContext.CMSHotspot_Editor_ModuleProcessor.drawRectangle(objContext, objShape, initialLoad, false);
                    arrUpdatedBoundings = [...arrUpdatedBoundings, objRect];
                }
                else if (objShape["shape"] === "Ellipse") {
                    var objEllipse = objContext.CMSHotspot_Editor_ModuleProcessor.drawEllipse(objContext, objShape, initialLoad, false);
                    arrUpdatedBoundings = [...arrUpdatedBoundings, objEllipse];
                }
                else {
                    var objPoly = objContext.CMSHotspot_Editor_ModuleProcessor.drawPolygon(objContext, objShape, initialLoad, false);
                    arrUpdatedBoundings = [...arrUpdatedBoundings, objPoly];
                }
            });
        }


        if (initialLoad) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBoundingBoxes": arrUpdatedBoundings, "blnImageLoaded": false }, "blnUndoRedoUpdate": false });
        }
    }

    /**
     * @name drawRectangle
     * @param {object} objContext {state, props, dispatch, ref}
     * @param {object} shapeObject shape object
     * @param {boolean} blnIntialDraw check for initial draw
     * @param {boolean} blnSetCoordinates if it's new shape co-ordinates will be saved in the state
     * @summary if blnSetCoordinates is true, shape object is added bound array. This check is made to eliminate duplicates while redrawing.
     * @return {object} returns rectangle co-ordinates
     */
    drawRectangle(objContext, shapeObject, blnIntialDraw, blnSetCoordinates) {
        var points = shapeObject["points"];
        var canvas = objContext.myCanvas.current;
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = shapeObject["styleProperties"]["strokeStyle"];
        ctx.lineWidth = shapeObject["styleProperties"]["lineWidth"];
        ctx.beginPath(points);
        const rec = new Path2D();
        rec.rect(points.x + 0.5, points.y + 0.5, points.eX, points.eY);
        ctx.stroke(rec);
        if (blnSetCoordinates) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objCoordinates": { "id": Math.random(), "path2D": rec, "shape": "Rectangle", ...shapeObject, "dCorrectPoint": 0, "dWrongPoint": 0 } }, "blnUndoRedoUpdate": false });
        }
        if (blnIntialDraw) {
            var objRect = { ...shapeObject, ["path2D"]: rec };
            return objRect;
        }
    }

    /**
     * @name drawEllipse
     * @param {object} objContext {props, state, dispatch , ref}
     * @param {object} shapeObject Ellipse object
     * @param {boolean} blnIntialDraw check for initial draw
     * @param {boolean} blnSetCoordinates if it's new shape co-ordinates will be saved in the state
     * @summary if blnSetCoordinates is true, shape object is added bound array. This check is made to eliminate duplicates while redrawing.
     * @return {object} returns ellipse co-ordinates
     */
    drawEllipse(objContext, shapeObject, blnIntialDraw, blnSetCoordinates) {

        var x1 = shapeObject["points"]["x"];
        var x2 = shapeObject["points"]["eX"];
        var y1 = shapeObject["points"]["y"];
        var y2 = shapeObject["points"]["eY"];

        const canvas = objContext.myCanvas.current;
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = shapeObject["styleProperties"]["strokeStyle"];
        ctx.lineWidth = shapeObject["styleProperties"]["lineWidth"];

        var radiusX = (x2 - x1) * 0.5,   /// radius for x based on input
            radiusY = (y2 - y1) * 0.5,   /// radius for y based on input
            centerX = x1 + radiusX,      /// calc center
            centerY = y1 + radiusY,
            step = 0.01,                 /// resolution of ellipse
            a = step,                    /// counter
            pi2 = Math.PI * 2 //- step;    /// end angle

        /// start a new path
        ctx.beginPath();
        let circle = new Path2D();
        /// set start point at angle 0
        circle.moveTo(centerX + radiusX * Math.cos(0),
            centerY + radiusY * Math.sin(0));

        /// create the ellipse    
        for (; a < pi2; a += step) {
            var i = 0; var y = 0;
            if (x1 < 1) {
                i = 1;
            }
            if (y1 < 1) {
                y = 1;
            }
            circle.lineTo(centerX + i + radiusX * Math.cos(a),
                centerY + y + radiusY * Math.sin(a));
        }

        /// close it and stroke it 
        ctx.closePath();
        //ctx.strokeStyle = '#000';
        ctx.stroke(circle);
        var objCoordinates = {
            ...shapeObject, ["points"]: { ...shapeObject["points"], ["centerX"]: centerX, ["centerY"]: centerY, ["width"]: radiusX, ["height"]: radiusY }
        };
        if (blnSetCoordinates) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objCoordinates": { "id": Math.random(), "path2D": circle, "shape": "Ellipse", ...objCoordinates, "dCorrectPoint": 0, "dWrongPoint": 0 } }, "blnUndoRedoUpdate": false });
        }
        if (blnIntialDraw) {
            var objEllipse = { ...shapeObject, ["path2D"]: circle };
            return objEllipse;
        }
    }

    /**
     * @name drawPolygon
     * @param {object} objContext {props, state, dispatch , ref}
     * @param {object} shapeObject polygon object
     * @param {boolean} blnIntialDraw check for initial draw
     * @param {boolean} blnSetCoordinates if it's new shape co-ordinates will be saved in the state
     * @summary if blnSetCoordinates is true, shape object is added bound array. This check is made to eliminate duplicates while redrawing.
     * @return {object} returns ellipse co-ordinates
     */
    drawPolygon(objContext, shapeObject, blnIntialDraw, blnSetCoordinates) {
        var arrPoints = shapeObject["points"];
        var canvas = objContext.myCanvas.current;
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = shapeObject["styleProperties"]["strokeStyle"];
        ctx.lineWidth = shapeObject["styleProperties"]["lineWidth"];
        ctx.beginPath();
        let polygon = new Path2D();
        polygon.moveTo(arrPoints[0]["x"], arrPoints[0]["y"]);
        arrPoints.forEach(function (point, index) { if (index !== 0) { polygon.lineTo(point["x"], point["y"]); } });
        ctx.stroke(polygon);
        if (blnSetCoordinates) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "iDisplayOrder": objContext.state.iDisplayOrder + 1, "objCoordinates": { "id": Math.random(), "path2D": polygon, "shape": "Polygon", ...shapeObject, "dCorrectPoint": 0, "dWrongPoint": 0, "iDisplayOrder": objContext.state.iDisplayOrder + 1 } }, "blnUndoRedoUpdate": false });
        }
        if (blnIntialDraw) {
            var objPoly = { ...shapeObject, ["path2D"]: polygon };
            return objPoly;
        }
    }

    /**
     * @name IsInPath
     * @param {object} objContext context object
     * @param {object} event event
     * @param {object} path2D path2D object
     * @return {object} return true if point is exits in path
     */
    IsInPath(objContext, event, path2D) {
        var bb, x, y;
        var cnv = objContext.myCanvas.current;
        var ctx = cnv.getContext("2d");
        bb = cnv.getBoundingClientRect();
        x = (event.pageX - bb.left) * (cnv.width / bb.width);
        y = (event.pageY - bb.top) * (cnv.height / bb.height);
        return ctx.isPointInPath(path2D, x, y);
    }

    /**
     * @name relativeCoordinatesForEvent
     * @param {objContext} objContext {props, state, dispatch, ref}
     * @param {any} mouseEvent mouse event
     * @returns {object} returns offset left and top of the canvas
     */
    relativeCoordinatesForEvent(objContext, mouseEvent) {
        const boundingRect = objContext.myCanvas.current.getBoundingClientRect();
        return {
            x: mouseEvent.pageX - boundingRect.left,
            y: mouseEvent.pageY - boundingRect.top
        };
    }

    removeSelectedShape(objContext) {
        var arrFilteredBounds = [];
        objContext.state.arrBoundingBoxes.forEach((shape) => {
            if (shape["id"] !== objContext.state.intSelectedShapeId) {
                if (objContext.state.objSelectedShape && shape["iDisplayOrder"] > objContext.state.objSelectedShape["iDisplayOrder"]) {
                    arrFilteredBounds = [...arrFilteredBounds, { ...shape, ["iDisplayOrder"]: shape["iDisplayOrder"] - 1 }];
                }
                else {
                    arrFilteredBounds = [...arrFilteredBounds, { ...shape }];
                }
            }
        });
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "arrBoundingBoxes": arrFilteredBounds,
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson.vElementJson,
                        ["Values"]: arrFilteredBounds
                    }
                },
                "iDisplayOrder": arrFilteredBounds.length
            }, "blnUndoRedoUpdate": true
        });
        objContext.CMSHotspot_Editor_ModuleProcessor.cleanAndRedraw(objContext, arrFilteredBounds);
        // Set coordinates to empty. if it holds deleted object copy
        if (objContext.state.objCoordinates["id"] === objContext.state.intSelectedShapeId) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objCoordinates": {} }, "blnUndoRedoUpdate": false });
        }
        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name cleanAndRedraw
     * @param {object} objContext {props, state, dispatch, ref}
     * @param {array} arrFilteredBounds bound array holds shape's details
     * @param {bool} blnClearCanvas check to clear canvas
     * @summmary Redrawing canvas after removing the selected shape
     */
    cleanAndRedraw(objContext, arrFilteredBounds, blnClearCanvas = true) {
        var canvas = objContext.myCanvas.current;
        var ctx = canvas.getContext("2d");
        if (blnClearCanvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        arrFilteredBounds.map(objShape => {
            if (objShape["shape"] === "Rectangle") {
                objContext.CMSHotspot_Editor_ModuleProcessor.drawRectangle(objContext, objShape, false, false);
            }
            else if (objShape["shape"] === "Ellipse") {
                objContext.CMSHotspot_Editor_ModuleProcessor.drawEllipse(objContext, objShape, false, false);
            }
            else {
                objContext.CMSHotspot_Editor_ModuleProcessor.drawPolygon(objContext, objShape, false, false);
            }
        });
    }

    /**
    * @name handleCropMouseDown
    * @param {object} objContext {props, state, dispatch}
    * @param {string} strSelectedCropId selected crop style id
    */
    handleCropMouseDown(objContext, strSelectedCropId) {
        if (strSelectedCropId) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDrawing": true, "strSelectedCrop": strSelectedCropId }, "blnUndoRedoUpdate": false });
        }
    }

    /**
    * @name handleMouseUp
    * @param {object} objContext {props, state, dispatch}
    * @param {object} e mouse up event object
    */
    handleMouseUp(objContext, event) {
        //event.stopPropagation();
        if (objContext.state.blnImageOnLoadSuccesful) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDrawing": false, "strSelectedCrop": null }, "blnUndoRedoUpdate": false });
            if (objContext.state.selectedShape !== "Polygon") {
                objContext.dispatch({ "type": "SET_STATE", "payload": { "selectedShape": null }, "blnUndoRedoUpdate": false });
            }
            if (objContext.state.selectedShape && objContext.state.blnDrawing) {
                objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null }, "blnUndoRedoUpdate": false });
            }
            objContext.CMSHotspot_Editor_ModuleProcessor.reDraw(objContext, objContext.state.arrBoundingBoxes);
            if (objContext.state.objCoordinates && Object.keys(objContext.state.objCoordinates).length > 0) {
                var found = objContext.state.arrBoundingBoxes.find(p => p["id"] === objContext.state.objCoordinates["id"]);
                if (found === undefined) {
                    var shapes = [...objContext.state.arrBoundingBoxes, { "iDisplayOrder": objContext.state.iDisplayOrder + 1, ...objContext.state.objCoordinates }];
                    // Adds new shape object
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "arrBoundingBoxes": shapes,
                            "ElementJson": {
                                ...objContext.state.ElementJson, ["vElementJson"]: { ...objContext.state.ElementJson.vElementJson, ["Values"]: shapes }
                            },
                            iDisplayOrder: shapes.length
                        },
                        "blnUndoRedoUpdate": true
                    });
                }
            }
        }
    }

    /**
    * @name handleMouseDown
    * @param {object} objContext {props, state, dispatch}
    * @param {object} e mouse down event object
    */
    handleMouseDown(objContext, e) {
        //e.stopPropagation();
        //e.preventDefault();
        var objPayload = null;
        if (e.detail === 2 && objContext.state.selectedShape === null) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnEditMode": true }, "blnUndoRedoUpdate": false });
            const canvas = objContext.myCanvas.current;
            var ctx = canvas.getContext("2d");
            canvas.style.cursor = "";
            canvas.style.border = "1px dotted grey";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var img = objContext.imageArea.current;
            img.style.display = "block";
            objContext.CMSHotspot_Editor_ModuleProcessor.rePositionCropImages(objContext);
        }

        if (objContext.state.selectedShape) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDrawing": true }, "blnUndoRedoUpdate": false });
        }
        if (objContext.state.objOffsetXY) {
            // Getting start position of mouse coordinates when the user clicks on the canvas to draw shapes
            var sX = parseInt(e.pageX - objContext.state.objOffsetXY["x"]);
            var sY = parseInt(e.pageY - objContext.state.objOffsetXY["y"]);
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objStartXY": { "x": sX, "y": sY } }, "blnUndoRedoUpdate": false });
        }
        var arrUpdatedBoundingShapes = [];
        var selectedId = null;
        var blnShapeIsSelected = false;

        // Checks if the shape points are in the current points(mouse co-ordinates)
        // If true, then changes stroke style of the shape in the current poin

        objContext.state.arrBoundingBoxes.map(objShape => {
            // returns true if the user clicks on the shape
            var blnInPath = objContext.CMSHotspot_Editor_ModuleProcessor.IsInPath(objContext, e, objShape["path2D"]);
            if (blnInPath) {
                selectedId = objShape["id"];
                objContext.dispatch({ "type": "SET_STATE", "payload": { "intSelectedShapeId": selectedId, "objSelectedShape": objShape }, "blnUndoRedoUpdate": false });
                blnShapeIsSelected = true;
                // Changing stroke style of the selected shape to red  
                var styleProperties = {
                    ...objShape["styleProperties"], ["strokeStyle"]: "#f00"
                };
                arrUpdatedBoundingShapes = [...arrUpdatedBoundingShapes, { ...objShape, ["styleProperties"]: styleProperties }];
            }
        });

        // check to make sure shape is selected
        if (blnShapeIsSelected) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDeselectElements": true }, "blnUndoRedoUpdate": false });
            // Gets last shape object, if they are intersecting
            if (arrUpdatedBoundingShapes.length > 0) {
                arrUpdatedBoundingShapes = [arrUpdatedBoundingShapes[arrUpdatedBoundingShapes.length - 1]];
            }
            // Filtering unselected shape objects
            var arrFilteredBounds = objContext.state.arrBoundingBoxes.filter(p => p["id"] !== selectedId && p["id"] !== objContext.state.intPreviousShapeId);
            // Filtering for previously selected shape object. 
            var objPreviousBound = objContext.state.arrBoundingBoxes.find(p => p["id"] === objContext.state.intPreviousShapeId && p["id"] !== selectedId);
            // Changing stroke style of the previously selected shape to green  
            if (objPreviousBound) {
                var styleProperties = { ...objPreviousBound["styleProperties"], ["strokeStyle"]: "#000" };
                var objPreviousShape = { ...objPreviousBound, ["styleProperties"]: styleProperties };
                arrFilteredBounds = [...arrFilteredBounds, objPreviousShape];
            }
            var arrNewBoundingShapes = [...arrFilteredBounds, ...arrUpdatedBoundingShapes];
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "arrBoundingBoxes": arrNewBoundingShapes,
                    "ElementJson": {
                        ...objContext.state.ElementJson, ["vElementJson"]: { ...objContext.state.ElementJson.vElementJson, ["Values"]: arrNewBoundingShapes }
                    }
                }, "blnUndoRedoUpdate": false
            });
            objContext.dispatch({ "type": "SET_STATE", "payload": { "intPreviousShapeId": selectedId }, "blnUndoRedoUpdate": false });
        }
        // Deselect shape when clicked on outside of the current path in canvas
        else {
            if (objContext.state.blnDeselectElements && objContext.state.arrBoundingBoxes.length > 0) {
                // Check to make sure whether the selected shape is not removed
                var objSelectedShape = objContext.state.arrBoundingBoxes.find(p => p["id"] === objContext.state.intPreviousShapeId);
                if (objSelectedShape !== undefined) {
                    var arrUnselectedFilter = objContext.state.arrBoundingBoxes.filter(p => p["id"] !== objContext.state.intPreviousShapeId);
                    arrUnselectedFilter = [...arrUnselectedFilter, { ...objSelectedShape, ["styleProperties"]: { ...objSelectedShape["styleProperties"], ["strokeStyle"]: "black" } }];
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "arrBoundingBoxes": arrUnselectedFilter,
                            "ElementJson": {
                                ...objContext.state.ElementJson, ["vElementJson"]: { ...objContext.state.ElementJson.vElementJson, ["Values"]: arrUnselectedFilter }
                            },
                            "blnDeselectElements": true,
                            "intSelectedShapeId": null,
                            "objSelectedShape": null
                        },
                        "blnUndoRedoUpdate": false
                    });
                    //objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDeselectElements": true } });
                    //objContext.dispatch({ "type": "SET_STATE", "payload": { "intSelectedShapeId": null } });
                }
            }
        }

        if (objContext.state.selectedShape === "Polygon") {
            if (objContext.state.arrPolygonPoints.length > 0) {
                // line coordinates are saved and filled to make polygon 
                objContext.CMSHotspot_Editor_ModuleProcessor.drawLines(objContext, e);
            }
            else {
                // Setting start point for polygon shape
                objContext.dispatch({ "type": "SET_STATE", "payload": { "arrPolygonPoints": [{ "x": sX, "y": sY }] }, "blnUndoRedoUpdate": false });
            }
        }
    }

    /**
     * @name drawLines
     * @param {object} objContext {state, props, dispatch}
     * @param {object} e mouse event object
     */
    drawLines(objContext, e) {
        var eX = e.pageX - objContext.state.objOffsetXY["x"];
        var eY = e.pageY - objContext.state.objOffsetXY["y"];
        var blnDrawingFinshed = false;
        var sX = objContext.state.arrPolygonPoints[0]["x"];
        var sY = objContext.state.arrPolygonPoints[0]["y"];

        if (!blnDrawingFinshed) {
            var canvas = objContext.myCanvas.current;
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = "#000";
            ctx.lineWidth = "1";
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(objContext.state.objStartXY["x"], objContext.state.objStartXY["y"]);
            ctx.lineTo(eX, eY);
            ctx.stroke();
            var arrPolyPoints = [...objContext.state.arrPolygonPoints, { "x": eX, "y": eY }];
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrPolygonPoints": arrPolyPoints }, "blnUndoRedoUpdate": false });
            //blnDrawingFinshed = ((eX >= sX - 4 && eX <= sX + 4) && (eY >= sY - 4 && eY <= sY + 4));
            // Connect polygon ends on double click
            if (e.detail === 2 && arrPolyPoints.length > 3) {
                blnDrawingFinshed = true;
            }
            if (blnDrawingFinshed) {
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                var endCoordinates = { "x": sX, "y": sY };
                var arrPoints = [...objContext.state.arrPolygonPoints, endCoordinates];
                objContext.dispatch({ "type": "SET_STATE", "payload": { "arrPolygonPoints": [] }, "blnUndoRedoUpdate": false });
                var styleProperties = objContext.StyleProperties; //{ "strokeStyle": "green", "lineWidth": 2 };
                var shapeObject = { "points": arrPoints, styleProperties };
                objContext.CMSHotspot_Editor_ModuleProcessor.drawPolygon(objContext, shapeObject, false, true);
                objContext.dispatch({ "type": "SET_STATE", "payload": { "selectedShape": null }, "blnUndoRedoUpdate": false });
            }
        }
    }

    /**
     * @name handleOuterContainerMouseUp
     * @param {object} objContext{state, props, dispatch}
     * @param {object} e mouse up event object
     */
    handleOuterContainerMouseUp(objContext, e) {
        //e.stopPropagation();
        if (e.target.id !== "myCanvas" && e.target.id !== "cropLeft" && e.target.id !== "cropRight" && e.target.id !== "cropTop" && e.target.id !== "cropBottom" && e.target.id !== "rotate" && e.target.id !== "resize") {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnEditMode": false }, "blnUndoRedoUpdate": false });
            objContext.CropModes.forEach((e, i) => { e.ref.current.style.display = "none" });
            objContext.pixelLeftRef.current.style.display = "none";
            objContext.pixelBottomRef.current.style.display = "none";
            const canvas = objContext.myCanvas.current;
            canvas.style.border = "none";
            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null }, "blnUndoRedoUpdate": false });
        }
    }

    /**
     * @name cropImageExport
     * @param {objContext} objContext {props, state, dispatch, ref}
     * @param {object} cropDimensions crop dimension values
     * @summary draws an image to canvas according to dimension values 
     */
    cropImageExport(objContext, cropDimensions) {
        const canvas = objContext.myCanvas.current;
        const ctx = canvas.getContext("2d");
        var canvasWidth = objContext.state.canvasDimensions["width"];
        var canvasHeight = objContext.state.canvasDimensions["height"];
        var img = objContext.imageArea.current;
        var dataURL;
        if (cropDimensions && cropDimensions["strCropStyle"]) {
            switch (cropDimensions["strCropStyle"]) {
                case "cropLeft":
                    ctx.drawImage(img, cropDimensions["value"], 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
                    img.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "dataURL": [...objContext.state.dataURL, dataURL] }, "blnUndoRedoUpdate": false });
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    break;
                case "cropRight":
                    ctx.drawImage(img, 0, 0, cropDimensions["value"], canvas.height, 0, 0, canvas.width, canvas.height);
                    img.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "dataURL": [...objContext.state.dataURL, dataURL] }, "blnUndoRedoUpdate": false });
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    break;
                case "cropTop":
                    ctx.drawImage(img, 0, cropDimensions["value"], canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
                    img.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "dataURL": [...objContext.state.dataURL, dataURL] }, "blnUndoRedoUpdate": false });
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    break;
                case "cropBottom":
                    ctx.drawImage(img, 0, 0, canvas.width, cropDimensions["value"], 0, 0, canvas.width, canvas.height);
                    img.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "dataURL": [...objContext.state.dataURL, dataURL] }, "blnUndoRedoUpdate": false });
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    break;
                case "resize":
                    img.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    //img.style.display = "block";
                    img.style.visibility = "visible";
                    dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "dataURL": [...objContext.state.dataURL, dataURL] }, "blnUndoRedoUpdate": false });
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * @name handleOuterDivMouseUp
     * @param {object} objContext {state, props, dispatch, ref}
     * @param {object} e mouseup event
     * @summary handles mouseup event and reposition crop images
     */
    handleOuterDivMouseUp(objContext, e) {
        //e.stopPropagation();
        //e.preventDefault();
        if (objContext.state.blnDrawing && objContext.state.blnEditMode && objContext.state.strSelectedCrop && objContext.state.blnImageCropped) {// && objContext.state.cropDimensions) {

            var eX = parseInt(event.pageX - objContext.state.objOffsetXY["x"]);
            var eY = parseInt(event.pageY - objContext.state.objOffsetXY["y"]);
            let cropValues;

            if (objContext.state.strSelectedCrop === "resize") {
                cropValues = { ["strCropStyle"]: objContext.state.strSelectedCrop, ["value"]: { "eX": eX, "eY": eY } };
            }

            if (objContext.state.strSelectedCrop === "cropTop" || objContext.state.strSelectedCrop === "cropBottom") {
                cropValues = { ["strCropStyle"]: objContext.state.strSelectedCrop, ["value"]: eY };
            }

            if (objContext.state.strSelectedCrop === "cropRight" || objContext.state.strSelectedCrop === "cropLeft") {
                cropValues = { ["strCropStyle"]: objContext.state.strSelectedCrop, ["value"]: eX };
            }

            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null, "blnImageCropped": false }, "blnUndoRedoUpdate": false });
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDrawing": false }, "blnUndoRedoUpdate": false });
            //objContext.dispatch({ "type": "SET_STATE", "payload": { "cropDimensions": null } });
            const canvas = objContext.myCanvas.current;
            canvas.style.left = "0";
            canvas.style.top = "0";
            var canvasWidth = canvas.width;
            var canvasHeight = canvas.height;

            objContext.innerContainer.current.style.top = 0;
            objContext.innerContainer.current.style.left = 0;

            objContext.outerContainer.current.style.height = objContext.innerContainer.current.style.height;
            objContext.outerContainer.current.style.width = objContext.innerContainer.current.style.width;

            objContext.dispatch({ "type": "SET_STATE", "payload": { "canvasDimensions": { "width": canvasWidth, "height": canvasHeight } }, "blnUndoRedoUpdate": false });
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "arrBoundingBoxes": [],
                    "objCoordinates": null,
                    "ElementJson": {
                        ...objContext.state.ElementJson, ["vElementJson"]: { ...objContext.state.ElementJson.vElementJson, ["Values"]: [] }
                    }
                }, "blnUndoRedoUpdate": false
            });
            var updatedArrSteps = [...objContext.state.arrSteps, { ...cropValues, ["iStepAction"]: objContext.state.arrSteps.length + 1 }];
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrSteps": updatedArrSteps }, "blnUndoRedoUpdate": true });
            objContext.CMSHotspot_Editor_ModuleProcessor.cropImageExport(objContext, cropValues);

        }
        else {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null, "blnDrawing": false, "blnImageCropped": false }, "blnUndoRedoUpdate": false });
        }

        if (!/(myCanvas|cropLeft|cropRight|cropTop|cropBottom|rotate|resize)/.test(e.target.id)) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnEditMode": false }, "blnUndoRedoUpdate": false });
            objContext.CropModes.forEach((e, i) => { e.ref.current.style.display = "none" });
            objContext.pixelLeftRef.current.style.display = "none";
            objContext.pixelBottomRef.current.style.display = "none";
            const canvas = objContext.myCanvas.current;
            canvas.style.border = "none";
            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null }, "blnUndoRedoUpdate": false });
        }
    }

    /**
     * @name drawRotated
     * @param {object} objContext {props, state, dispatch, ref}
     * @param {number} degrees rotation angle
     * @summary rotates image based on the given angle
     */
    drawRotated(objContext, degrees) {
        const canvas = objContext.myCanvas.current;
        const ctx = canvas.getContext("2d");
        const image = objContext.imageArea.current;
        image.style.display = "none";
        if (degrees === 90 || degrees === 270) {

            canvas.width = image.height;
            canvas.height = image.width;

            objContext.innerContainer.current.style.height = image.width + "px";
            objContext.innerContainer.current.style.width = image.height + "px";

            objContext.outerContainer.current.style.height = image.width + "px";
            objContext.outerContainer.current.style.width = image.height + "px";

        } else {

            canvas.width = image.width;
            canvas.height = image.height;

            objContext.innerContainer.current.style.height = image.height + "px";
            objContext.innerContainer.current.style.width = image.width + "px";

            objContext.outerContainer.current.style.height = image.width + "px";
            objContext.outerContainer.current.style.width = image.height + "px";

        }

        var rotateValues = { ["strCropStyle"]: "rotate", ["value"]: { "width": image.width, "height": image.height, "degrees": degrees } };
        //objContext.dispatch({ "type": "SET_STATE", "payload": { "canvasDimensions": { "width": canvas.width, "height": canvas.height } }, "blnUndoRedoUpdate": false });
        var updatedArrSteps = [...objContext.state.arrSteps, { ...rotateValues, ["iStepAction"]: objContext.state.arrSteps.length + 1 }];

        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "canvasDimensions": { "width": canvas.width, "height": canvas.height },
                "blnUndoRedoStateUpdate": false,
                "arrBoundingBoxes": [],
                "objCoordinates": null,
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: { ...objContext.state.ElementJson.vElementJson, ["Values"]: [] }
                }
            },
            "blnUndoRedoUpdate": false
        });

        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "arrSteps": updatedArrSteps
            },
            "blnUndoRedoUpdate": true
        });

        if (degrees === 90 || degrees === 270) {
            ctx.translate(image.height / 2, image.width / 2);
        }
        else {
            ctx.translate(image.width / 2, image.height / 2);
        }
        ctx.rotate(degrees * Math.PI / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        image.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
        image.style.display = "block";
        let dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "dataURL": [...objContext.state.dataURL, dataURL]
            }, "blnUndoRedoUpdate": false
        });
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * @name handleRotateClick
     * @param {object} objContext {props, state, dispatch, ref}
     * @summary handles image rotation
     */
    handleRotateClick(objContext) {
        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.CMSHotspot_Editor_ModuleProcessor.drawRotated(objContext, 90);
        objContext.CMSHotspot_Editor_ModuleProcessor.rePositionCropImages(objContext);
    }

    /**
     * @name rePositionCropImages
     * @param {objContext} objContext {state, props, dispatch, ref}
     * @summary this method will re-position crop images 
     */
    rePositionCropImages(objContext) {
        if (objContext.state.objOffsetXY) {
            objContext.CropModes.forEach((e, i) => { e.ref.current.style.display = "block" });
            objContext.pixelLeftRef.current.style.display = "block";
            objContext.pixelBottomRef.current.style.display = "block";
        }
    }

    async HandleUploadAndSaveImage(objContext) {
        let dataURI = objContext.imageArea.current.src;
        let objBlob = Image.DataURItoBlob(dataURI);
        var formData = new FormData();
        formData.append("files[0]", objBlob, objContext.state.ElementJson["vImageElementJson"]["vElementJson"]["vElementImageFileName"]);
        let response = await Image.UploadImage(objContext, formData);
        let objImageDetails = objContext.state.ElementJson["vImageElementJson"];
        let objElementJson = {
            ...objImageDetails,
            ["vElementJson"]: {
                ...objImageDetails["vElementJson"],
                ["cIsFileChanged"]: "Y"
            }
        };
        let objUpdatedImage = await Image.SaveImage(objElementJson, response);
        return {
            ...objContext.state.ElementJson,
            ["vImageElementJson"]: objUpdatedImage
        };
    }

    /**
    * @name GetAlignmentValue
    * @param {string} strAlignmentType vertical/horizontal
    * @param {string} strAlignmentValue top/bottom/center
    * @returns{string} returns proper alignment value
    */
    GetAlignmentValue(strAlignmentType, strAlignmentValue) {
        var strValue = "center";
        if (strAlignmentValue === "top" || strAlignmentValue === "left") {
            strValue = "flex-start";
        }
        else if (strAlignmentValue === "bottom" || strAlignmentValue === "right") {
            strValue = "flex-end";
        }
        return strValue;
    }

    /**
     * @name SetImageAligment
     * @param {object} objParams {props, state, dispatch, PassedEvents, Data}
     */
    SetImageAligment(objParams) {
        const { objContext, AlignType, AlignValue } = objParams;
        var objAlignmentValue = AlignType === "horizontal" ? { "vElementHorizontalAlignment": AlignValue } : { "vElementVerticalAlignment": AlignValue };
        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vImageElementJson": {
                        ...objContext.state.ElementJson.vImageElementJson,
                        ["vContainerElementProperties"]: { ...objContext.state.ElementJson.vImageElementJson.vContainerElementProperties, ...objAlignmentValue }
                    }
                }
            }
        });
    }

    /**
     * @name SetHotspotMarkerId
     * @param {object} objParams {state, props, dispatch, hotspot marker id}
     */
    SetHotspotMarkerId(objParams) {
        const { objContext, id } = objParams;
        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                ["ElementJson"]: {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson.vElementJson,
                        ["iHotspotMarkerId"]: id
                    }
                }
            }
        });
    }

    /**
     * @name ShowImageSidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the side bar.
     */
    ShowImageSidebar(objContext) {
        objContext.CMSHotspot_Editor_ModuleProcessor.CloseImagePropertiesSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            ...objContext.props,
            "ElementJson": objContext.state.ElementJson,
            "blnHotspot": true,
            "PassedEvents": {
                UpdateElementJson: (iMinimumToBeCorrect) => { objContext.CMSHotspot_Editor_ModuleProcessor.UpdateElementJsonFromSideBar(objContext, iMinimumToBeCorrect); }
            },
            "SidebarProps": {
                "SidebarName": "ImageProperties",
                "Header": objContext.objTextResource["Title"],
                "Title": objContext.objTextResource["Image_Properties"],
                "Status": 1,
                "AutoHide": false
            }
        });
    }


    /**
     * @name UpdateElementJsonFromSideBar
     * @param {object} objContext {props, state, dispatch}
     * @param {int} iMinimumToBeCorrect minimum correct value
     * @summary   Send the updates of the CMSHotspot to the parent component.
     */
    UpdateElementJsonFromSideBar(objContext, iMinimumToBeCorrect) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson.vElementJson,
                        ["iMinimumToBeCorrect"]: iMinimumToBeCorrect
                    }
                }
            }
        });
        objContext.CMSHotspot_Editor_ModuleProcessor.CloseImagePropertiesSidebar();
    }

    /**
    * @name CloseImageSidebar
    * @summary Closes the side bar.
    */
    CloseImagePropertiesSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @returns {object} objPoint {Points : [], isNACommon : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"],
            "isSinglePoint": false
        };
        objPoint.Points = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            return {
                "CA": objTempValue["dCorrectPoint"],
                "WA": objTempValue["dWrongPoint"],
                "ValueId": objTempValue["id"],
                "iDisplayOrder": objTempValue["iDisplayOrder"]
            };
        });
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @param {any} objPoints points for the element {Points : [], isNACommon : true/false}.
     * @summary this update the Points from the sidebar.
     */
    SetPointOverride(objContext, objPoints) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "Y",
                "dNotAnsweredPoint": objPoints.NA,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp.ValueId === objTempValue.id);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA
                    }
                })
            }
        };
        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary  removes point override.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": 0,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objValue => {
                    return {
                        ...objValue,
                        "dCorrectPoint": 0,
                        "dWrongPoint": 0
                    }
                })
            }
        };
        objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSHotspot/CMSHotspotStyles.css"
        ];
    }
}

export default CMSHotspot_Editor_ModuleProcessor;
