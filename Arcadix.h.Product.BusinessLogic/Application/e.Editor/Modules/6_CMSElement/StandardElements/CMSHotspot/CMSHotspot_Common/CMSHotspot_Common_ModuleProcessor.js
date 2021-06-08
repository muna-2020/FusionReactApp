//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSHotspot_Common_ModuleProcessor
 * @summary Contains Hotspot's module specific methods.
 * */
class CMSHotspot_Common_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name setCanvasWidthAndHeight
     * @param {object} objContext {props, state, dispatch, Ref's}
     * @param {boolean} blnLoadSolution load solution 
     * */
    setCanvasWidthAndHeight(objContext, blnLoadSolution = false) {
        var arrUpdatedBoundings = [];
        const canvas = objContext.myCanvas.current;
        //canvas.style.cursor = "crosshair";
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
        if (!objContext.state.blnRedraw) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        img.style.display = "block";
        //img.onload = null;
        let dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
        if (!blnLoadSolution) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "canvasDimensions": { "width": canvas.width, "height": canvas.height },
                "objOffsetXY": { "x": canvasLeft, "y": canvasTop, "left": canvasLeft - outerLeft, "top": canvasTop - outerTop },
                "blnUndoRedoUpdate": false,
                "dataURL": objContext.state.dataURL ? [...objContext.state.dataURL, dataURL] : null
            },
            "blnUndoRedoUpdate": false
        });

        if (objContext.state.arrBoundingBoxes.length > 0) {
            arrUpdatedBoundings = objContext.CMSHotspot_Common_ModuleProcessor.reDraw(objContext, objContext.state.arrBoundingBoxes, blnLoadSolution);
        }

        //ReDrawing shapes, if saved data contains shape values
        if (objContext.state.blnImageLoaded) {
            objContext.CMSHotspot_Editor_ModuleProcessor.reDraw(objContext, objContext.state.ElementJson.vElementJson.Values, true);
        }

        // old approach no longer used
        /*if (blnLoadSolution) {
            var arrWrongSpanNodes = objContext.innerContainer.current.querySelectorAll('[type="wrong-answer-span"]');
            arrWrongSpanNodes.forEach((node) => {
                node.remove();
            });
            var imgCopy = document.createElement("img");
            imgCopy.src = `${JConfiguration.WebDataPath}Repo/Image/${JConfiguration.MainClientId}/${objContext.state.ElementJson.vImageElementJson.iElementId}_Image_${objContext.state.ElementJson.vImageElementJson.vElementJson.iImageFileVersion}.${objContext.state.ElementJson.vImageElementJson.vElementJson.vImageType}`;
            imgCopy.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(imgCopy, 0, 0, canvas.width, canvas.height);
                var arrUserAnswers = objContext.state.UserAnswerJson.Answers;
                var arrWrongAnswers = [];
                for (var i = 0; i < arrUserAnswers.length; i++) {
                    for (var j = 0; j < arrUpdatedBoundings.length; j++) {
                        console.log(arrUserAnswers[i], arrUpdatedBoundings[j]["path2D"]);
                        var objAnswerCoordinates = arrUserAnswers[i];
                        var r = objContext.CMSHotspot_Common_ModuleProcessor.IsInPath(objContext, arrUserAnswers[i], arrUpdatedBoundings[j]["path2D"]);
                        if (r) {
                            arrUpdatedBoundings.splice(j, 1);
                            break;
                        }
                    }
                    if (!r) {
                        var span = document.createElement('span');
                        span.classList.add("wrong-answer-span");
                        span.style.left = arrUserAnswers[i].x - 25 + "px";
                        span.style.top = arrUserAnswers[i].y - 25 + "px";
                        span.style.position = "absolute";
                        span.setAttribute("type", "wrong-answer-span");
                        span.style.zIndex = "0";
                        document.querySelector("#wrapper_div").appendChild(span);
                    }
                }
                objContext.CMSHotspot_Common_ModuleProcessor.reDraw(objContext, [...objContext.state.arrBoundingBoxes, ...arrWrongAnswers]);
                img.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vImageElementJson.vElementJson.vImageType}`);
            }
        }*/
    }

    /**
    * @name IsInPath
    * @param {object} objContext context object
    * @param {object} objCoordinates x and y marker coordinates
    * @param {object} path2D path2D object
    * @return {object} return true if point is exits in path
    */
    IsInPath(objContext, objCoordinates, path2D) {
        var cnv = objContext.myCanvas.current;
        var ctx = cnv.getContext("2d");
        return ctx.isPointInPath(path2D, parseInt(objCoordinates["x"]), parseInt(objCoordinates["y"]));
    }

    /**
      * @name reDraw
      * @param {object} objContext {state, props, dispatch, ref}
      * @param {array} arrData shape array data
      * @param {int} initialLoad Default value is set to false
      * @summary Redraw's old shape when a new shape is drawn
      * @returns {array} returns shape array if initialLoad is true
      */
    reDraw(objContext, arrData, initialLoad = false) {
        var arrUpdatedBoundings = [];
        if (arrData) {
            arrData.map(objShape => {
                objShape = {
                    ...objShape, ["styleProperties"]: { "lineWidth": 3, "strokeStyle": "green" }
                };
                if (objShape["shape"] === "Rectangle") {
                    var objRect = objContext.CMSHotspot_Common_ModuleProcessor.drawRectangle(objContext, objShape, initialLoad, false);
                    arrUpdatedBoundings = [...arrUpdatedBoundings, objRect];
                }
                else if (objShape["shape"] === "Ellipse") {
                    var objEllipse = objContext.CMSHotspot_Common_ModuleProcessor.drawEllipse(objContext, objShape, initialLoad, false);
                    arrUpdatedBoundings = [...arrUpdatedBoundings, objEllipse];
                }
                else {
                    var objPoly = objContext.CMSHotspot_Common_ModuleProcessor.drawPolygon(objContext, objShape, initialLoad, false);
                    arrUpdatedBoundings = [...arrUpdatedBoundings, objPoly];
                }
            });
        }
        if (initialLoad) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBoundingBoxes": arrUpdatedBoundings, "blnImageLoaded": false }, "blnUndoRedoUpdate": false });
            return arrUpdatedBoundings;
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
        rec.rect(points.x, points.y, points.eX, points.eY);
        ctx.stroke(rec);
        if (blnSetCoordinates) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objCoordinates": { "id": Math.random(), "path2D": rec, "shape": "Rectangle", ...shapeObject } }, "blnUndoRedoUpdate": false });
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
        var shape = { "id": Math.random(), "path2D": circle, "shape": "Ellipse", ...objCoordinates };
        if (blnSetCoordinates) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objCoordinates": shape }, "blnUndoRedoUpdate": false });
        }
        if (blnIntialDraw) {
            var objEllipse = { ...shapeObject, ["path2D"]: circle };
            return objEllipse;
        }
        return shape;
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
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objCoordinates": { "id": Math.random(), "path2D": polygon, "shape": "Polygon", ...shapeObject } }, "blnUndoRedoUpdate": false });
        }
        if (blnIntialDraw) {
            var objPoly = { ...shapeObject, ["path2D"]: polygon };
            return objPoly;
        }
    }
}

export default CMSHotspot_Common_ModuleProcessor;
