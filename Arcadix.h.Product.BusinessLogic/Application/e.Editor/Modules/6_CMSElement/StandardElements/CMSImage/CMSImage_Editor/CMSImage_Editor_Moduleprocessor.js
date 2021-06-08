//React imports
import React from 'react';

//Module realted fies.
import CMSImage_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_ContextMenu";
import * as Image from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Upload_Save";
import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData";

//Application State classes.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSImage_Editor_ModuleProcessor
 * @summary Contains the Image's editor version module specific methods.
 * */
class CMSImage_Editor_ModuleProcessor extends CMSImage_Editor_ContextMenu {

    /**
    * @name UpdateElementJson
    * @param {object} objContext {props, state, dispatch}
    * @param {object} objElementJson element json
    * @summary Updates the selected elemnt json
    */
    UpdateElementJson(objContext, objElementJson) {
        objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objElementJson,
                    ["iOrder"]: objContext.state.ElementJson.iOrder,
                    ...CMSImage_Editor_MetaData.GetDefaultContainerElementProperties()
                },
                "blnChanged": true,
                "blnImageLoaded": true
            }
        });
    }

    /**
     * @name OpenAddPopup
     * @param {object} objContext {props, state, dispatch, PassedEvents, Data}
     * @summary opens image add edit popup
     */
    OpenAddPopup(objContext) {
        let objCallBacks;
        if (objContext.props.IsSubElement) {
            objCallBacks = {
                "GetElementJson": (objElementJson) => {
                    objContext.props.ParentRef.current.UpdateElementJson({ ...objElementJson, ...{ "AdditionalProperties": { "iPreviousElementId": objContext.props.ElementJson.iElementId } } });
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageLoaded": true } });
                }
            };
        }
        else {
            objCallBacks = {
                "GetElementJson": (objElementJson) => {
                    objContext.CMSImage_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "blnImageLoaded": true } });
                }
            };
        }
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": "Image",
                "iContainerId": objContext.props.iContainerId,
                "ElementJson": { ...objContext.state.ElementJson },
                "ShowMultiMediaAddEdit": true,
                //"ShowMultiMediaManagement": true,
                "ActionType": "Add",
                "PreSelectNode": { ...objContext.state.ElementJson }
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
            "CallBacks": objCallBacks
        });
    }

    /**
     * @name HandleClearImage
     * @param {object} objContext {props, state, dispatch, PassedEvents, Data}
     */
    HandleClearImage(objContext) {
        let objTextResource = {
            "DELETE_ConfirmText": objContext.objTextResource["Delete_Image_Message"],
            "DELETE_ConfirmButtonText": objContext.objTextResource["Yes"],
            "DELETE_CloseButtonText": objContext.objTextResource["No"],
            "DELETE_Title": objContext.objTextResource["Title"],
            "DELETE_SubTitle": objContext.objTextResource["Subtitle"]
        };
        editorPopup.ShowConfirmationPopup({
            Resource: {
                Text: objTextResource,
                TextResourcesKey: "DELETE",
                Variables: {},
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath
            },
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                Height: 'auto',
                Width: '390px'
            },
            Data: {},
            Events: {
                ConfirmEvent: (objModal) => {
                    editorPopup.ClosePopup(objModal);
                    objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name ShowImageSidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the side bar.
     */
    ShowImageSidebar(objContext) {
        objContext.CMSImage_Editor_ModuleProcessor.CloseImageSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            ...objContext.props,
            "ElementJson": objContext.state.ElementJson,
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
     * @name CloseImageSidebar
     * @summary Closes the side bar.
     */
    CloseImageSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    HandleHeaderData(objContext) {
        if (objContext.state.blnShowHeader) {
            let intUniqueId = UniqueId.GetUniqueId();
            let objElementJson = BaseCMSElement.GetCMSTextElementJson(objContext.state.ElementJson["iContainerId"], null, intUniqueId);
            objElementJson = {
                ...objElementJson,
                ["vText"]: "Default_Text",
                ["Ref"]: React.createRef()
            };
            objContext.dispatch({ "type": "SET_STATE", "payload": { "ElementJson": { ...objContext.state.ElementJson, ["cHasTextOnTop"]: "Y", ["iHeaderTextId"]: intUniqueId, ["TextElements"]: [objElementJson] } } });
        }
        else {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "ElementJson": { ...objContext.state.ElementJson, ["cHasTextOnTop"]: "N", ["iHeaderTextId"]: null, ["TextElements"]: [] } } });
        }
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
            if (objContext.state.blnImageLoaded) {
                let img = objContext.imageArea.current;
                const canvas = objContext.myCanvas.current;
                var canvasRect = canvas.getBoundingClientRect();
                var outerDiv = objContext.outerContainer.current.getBoundingClientRect();
                var outerLeft = outerDiv.left;
                var outerTop = outerDiv.top;
                var canvasLeft = canvasRect.left;
                var canvasTop = canvasRect.top;
                const ctx = canvas.getContext("2d");
                ctx.canvas.width = img.width;
                ctx.canvas.height = img.height;
                const innerContainer = objContext.innerContainer.current;
                innerContainer.style.height = img.height + "px";
                innerContainer.style.width = img.width + "px";
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                img.style.display = "block";
                let dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "blnImageLoaded": true,
                        "canvasDimensions": { "width": canvas.width, "height": canvas.height },
                        "imageOffset": { "width": canvas.width, "height": canvas.height },
                        "objOffsetXY": { "x": outerLeft, "y": outerTop, "left": outerLeft - canvasLeft, "top": outerTop - canvasTop },
                        "blnInitialLoad": false,
                        "dataURL": [...objContext.state.dataURL, dataURL]
                    },
                    "blnUndoRedoUpdate": false
                });
            }
        }
        catch (e) {
            console.log("IMAGE_LOAD_ERROR", e);
        }
    }

    /**
     * @name HandleImageLoadError
     * @param {object} objContext {state, props, dispatch}
     * @summary sets image loaded to false when image gets failed to load
     */
    HandleImageLoadError(objContext) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "blnImageLoaded": false
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
     * @name relativeCoordinatesForEvent
     * @param {objContext} objContext {props, state, dispatch, ref}
     * @param {any} mouseEvent mouse event
     * @returns {object} returns offset left and top of the canvas
     */
    relativeCoordinatesForEvent(objContext, mouseEvent) {
        const boundingRect = objContext.myCanvas.current.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top
        };
    }

    /**
     * @name removeSelectedShape
     * @param {object} objContext {state, props, dispatch}
     */
    removeSelectedShape(objContext) {
        var arrFilteredBounds = objContext.state.arrBoundingBoxes.filter(p => p["id"] !== objContext.state.intSelectedShapeId);
        objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBoundingBoxes": arrFilteredBounds, "ElementJson": { ...objContext.state.ElementJson, ["Values"]: arrFilteredBounds } }, "blnUndoRedoUpdate": false });

        // Set coordinates to empty. if it holds deleted object copy
        if (objContext.state.objCoordinates["id"] === objContext.state.intSelectedShapeId) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objCoordinates": {} }, "blnUndoRedoUpdate": false });
        }
    }

    /**
     * @name handleCropMouseOver
     * @param {object} objContext {props, state, dispatch}
     * @param {any} event mouse over event object
     */
    handleCropMouseOver(objContext, strSelectedCrop, index) {
        if (objContext.state.strSelectedCrop === null) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": strSelectedCrop }, "blnUndoRedoUpdate": false });
        }
    }

    /**
     * @name handleCropMouseLeave
     * @param {object} objContext {props, state, dispatch}
     * @param {any} e mouse leave event object
     */
    handleCropMouseLeave(objContext, e) {
        if (!objContext.state.blnDrawing) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null }, "blnUndoRedoUpdate": false });
        }
    }

    /**
     * @name handleCropMouseDown
     * @param {object} objContext {props, state, dispatch}
     */
    handleCropMouseDown(objContext, e) {
        //e.stopPropagation();
        if (objContext.state.strSelectedCrop) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDrawing": true }, "blnUndoRedoUpdate": false });
        }
    }


    handleMouseUp(objContext, event) {
        //event.stopPropagation();
        objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDrawing": false }, "blnUndoRedoUpdate": false });
        if (objContext.state.selectedShape !== "Polygon") {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "selectedShape": null }, "blnUndoRedoUpdate": false });
        }
        objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null }, "blnUndoRedoUpdate": false });
        if (objContext.state.objCoordinates && Object.keys(objContext.state.objCoordinates).length > 0) {
            var found = objContext.state.arrBoundingBoxes.find(p => p["id"] === objContext.state.objCoordinates["id"]);
            if (found === undefined) {
                var shapes = [...objContext.state.arrBoundingBoxes, objContext.state.objCoordinates];
                // Adds new shape object
                objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBoundingBoxes": shapes, "ElementJson": { ...objContext.state.ElementJson, ["Values"]: shapes } }, "blnUndoRedoUpdate": false });
            }
        }
    }


    handleMouseDown(objContext, e) {
        //e.stopPropagation();
        //e.preventDefault();
        if (e.detail === 2 && objContext.state.selectedShape === null) {
            if (objContext.props.ShowEditOptions_FromParent) {
                objContext.props.ShowEditOptions_FromParent();
            }
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnEditMode": true }, "blnUndoRedoUpdate": false });
            const canvas = objContext.myCanvas.current;
            canvas.style.border = "1px dotted grey";
            var ctx = canvas.getContext("2d");
            canvas.style.cursor = "";
            //canvas.style.border = "1px dotted grey";
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            var img = objContext.imageArea.current;
            img.style.display = "block";
            objContext.CMSImage_Editor_ModuleProcessor.rePositionCropImages(objContext);
            objContext.CMSImage_Editor_ModuleProcessor.setCanvasWidthAndHeight(objContext);
        }
        objContext.dispatch({ "type": "SET_STATE", "payload": { "blnDrawing": true }, "blnUndoRedoUpdate": false });
    }

    handleOuterContainerMouseUp(objContext, e) {
        if (e.target.id !== "myCanvas" && e.target.id !== "cropLeft" && e.target.id !== "cropRight" && e.target.id !== "cropTop" && e.target.id !== "cropBottom" && e.target.id !== "rotate" && e.target.id !== "resize") {
            if (objContext.props.RemoveEditOptions_FromParent && objContext.state.blnEditMode) {
                objContext.props.RemoveEditOptions_FromParent();
            }
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
                    objContext.outerContainer.current.style.zIndex = "0";
                    img.src = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    //img.style.display = "block";
                    img.style.visibility = "visible";
                    dataURL = canvas.toDataURL(`image/${objContext.state.ElementJson.vElementJson.vImageType}`);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "blnResized": !objContext.state.blnResized, "dataURL": [...objContext.state.dataURL, dataURL] }, "blnUndoRedoUpdate": false });
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
        if (objContext.state.blnDrawing && objContext.state.blnEditMode && objContext.state.strSelectedCrop && objContext.state.blnImageCropped) {// && objContext.state.cropDimensions) {
            //if (objContext.props.RemoveEditOptions_FromParent) {
            //    objContext.props.RemoveEditOptions_FromParent();
            //}
            var eX = parseInt(event.clientX - objContext.state.objOffsetXY["x"]);
            var eY = parseInt(event.clientY - objContext.state.objOffsetXY["y"]);
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
            const canvas = objContext.myCanvas.current;
            canvas.style.left = "0";
            canvas.style.top = "0";
            var canvasWidth = canvas.width;
            var canvasHeight = canvas.height;
            objContext.innerContainer.current.style.top = 0;
            objContext.innerContainer.current.style.left = 0;
            objContext.outerContainer.current.style.height = objContext.innerContainer.current.style.height;
            objContext.outerContainer.current.style.width = objContext.innerContainer.current.style.width;
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "canvasDimensions": { "width": canvasWidth, "height": canvasHeight }
                },
                "blnUndoRedoUpdate": false
            });
            var updatedArrSteps = [...objContext.state.arrSteps, { ...cropValues, ["iStepAction"]: objContext.state.arrSteps.length + 1, ["width"]: canvasWidth, ["height"]: canvasHeight }];
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrSteps": updatedArrSteps }, "blnUndoRedoUpdate": true });
            objContext.CMSImage_Editor_ModuleProcessor.cropImageExport(objContext, cropValues);
        }
        else {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedCrop": null, "blnDrawing": false, "blnImageCropped": false }, "blnUndoRedoUpdate": false });
        }
        if (!/(myCanvas|cropLeft|cropRight|cropTop|cropBottom|rotate|resize)/.test(e.target.id)) {
            if (objContext.props.RemoveEditOptions_FromParent) {
                objContext.props.RemoveEditOptions_FromParent();
            }
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
     * @param {boolean} blnSetState used for undo redo
     * @summary rotates image based on the given angle
     */
    drawRotated(objContext, degrees, blnSetState = true) {
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
        var updatedArrSteps = [...objContext.state.arrSteps, { ...rotateValues, ["iStepAction"]: objContext.state.arrSteps.length + 1 }];
        if (blnSetState) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "canvasDimensions": { "width": canvas.width, "height": canvas.height },
                    "blnUndoRedoStateUpdate": false
                },
                "blnUndoRedoUpdate": false
            });

            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "arrSteps": updatedArrSteps
                },
                "blnUndoRedoUpdate": true
            });
        }
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
        objContext.dispatch({ "type": "SET_STATE", "payload": { "dataURL": [...objContext.state.dataURL, dataURL] }, "blnUndoRedoUpdate": false });
    }

    /**
     * @name handleRotateClick
     * @param {object} objContext {props, state, dispatch, ref}
     * @param {any} e event 
     * @summary handles image rotation
     */
    handleRotateClick(objContext, e) {
        objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.CMSImage_Editor_ModuleProcessor.drawRotated(objContext, 90);
        objContext.CMSImage_Editor_ModuleProcessor.rePositionCropImages(objContext);
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

    /**
     * @name GetImagePath
     * @param {object} objContext{state, props, dispatch}
     * @returns {string} returns image path
     */
    GetImagePath(objContext) {
        //var vPath = objContext.state.ElementJson.vElementJson.vPath ? objContext.state.ElementJson.vElementJson.vPath : `Repo/Image/${objContext.state.ElementJson.iMainClientId}/`;
        //var vName = objContext.state.ElementJson.vElementJson.vName ? objContext.state.ElementJson.vElementJson.vName : `_Image_${objContext.state.ElementJson.vElementJson["iImageFileVersion"]}.${objContext.state.ElementJson.vElementJson["vImageType"]}`;
        return objContext.state.ElementJson.dataURL ? objContext.state.ElementJson.dataURL : `${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.iElementId}_Image_${objContext.state.ElementJson.vElementJson["iImageFileVersion"]}.${objContext.state.ElementJson.vElementJson["vImageType"]}`;
        //return `${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.iElementId}_Image_${objContext.state.ElementJson.vElementJson["iImageFileVersion"]}.${objContext.state.ElementJson.vElementJson["vImageType"]}`;
    }

    async HandleUploadAndSaveImage(objContext, objSaveDetails = null) {
        let dataURI = objContext.imageArea.current.src;
        let objBlob = Image.DataURItoBlob(dataURI);
        var fileName = objContext.state.ElementJson["vElementJson"]["vElementImageFileName"];
        var arrSplit = fileName.split(".");
        var fileType = arrSplit[arrSplit.length - 1];
        if (objContext.state.ElementJson.blnScreenShotPaste) {
            fileType = objBlob["type"].split('/')[1];
            fileName = `ScreenShot_${objContext.state.ElementJson.iElementId}.${fileType}`;
        }
        var formData = new FormData();
        formData.append("files[0]", objBlob, fileName);
        var objMetaData = {
            "chunkIndex": 0,
            "contentType": fileType,
            "fileName": fileName,
            "relativePath": fileName,
            "totalFileSize": objBlob.size,
            "totalChunks": 1,
            "uploadUid": UniqueId.GetUniqueId()
        };
        formData.append("metaData", JSON.stringify(objMetaData));
        let response = await Image.UploadImage(formData);
        let objElementJson;
        objElementJson = {
            ...objContext.state.ElementJson, ["vElementJson"]: { ...objContext.state.ElementJson["vElementJson"], ["cIsFileChanged"]: "Y" }
        };
        if (objSaveDetails) {
            if (!objSaveDetails.blnSaveAsGlobal) {
                objElementJson = CMSImage_Editor_MetaData.GetDefaultElementJson(objContext.state.ElementJson.iOrder);
                if (objSaveDetails.ImageDetails.cIsFusionVersion) {
                    objElementJson["cIsFusionVersion"] = objSaveDetails.ImageDetails["cIsFusionVersion"];
                }
                objElementJson = {
                    ...objElementJson, ["vElementJson"]: {
                        ...objElementJson["vElementJson"], ["intPreviousFolderId"]: objContext.state.ElementJson.iFolderID
                    }
                };
            }
            else {
                if (objSaveDetails.blnSaveAsNew) {
                    objElementJson = CMSImage_Editor_MetaData.GetDefaultElementJson(objContext.state.ElementJson.iOrder);
                    if (objSaveDetails.ImageDetails.cIsFusionVersion) {
                        objElementJson["cIsFusionVersion"] = objSaveDetails.ImageDetails["cIsFusionVersion"];
                    }
                    var intFolderId;
                    if (objSaveDetails["FolderDetails"]) {
                        intFolderId = objSaveDetails["FolderDetails"]["iFolderId"] ? objSaveDetails["FolderDetails"]["iFolderId"] : objSaveDetails["FolderDetails"]["iFolderID"];
                    }
                    else {
                        intFolderId = objContext.state.ElementJson.iFolderID;
                    }
                    if (objSaveDetails["ImageDetails"]) {
                        objElementJson = { ...objElementJson, ["vElementJson"]: objSaveDetails["ImageDetails"]["vElementJson"] };
                    }
                    objElementJson = { ...objElementJson, ["iFolderID"]: intFolderId };
                }
            }
        }
        let objUpdatedImage = await Image.SaveImage(objElementJson, response);
        return objUpdatedImage;
    }

    async handleImageSaveDetails(objContext, objSaveDetails) {
        let response = await objContext.CMSImage_Editor_ModuleProcessor.HandleUploadAndSaveImage(objContext, objSaveDetails);
        return response;
    }

    handleImageSavePopup(objContext) {
        return new Promise((resolve, reject) => {
            editorPopup.ShowPopup({
                "Data": {
                    "iContainerId": objContext.props.iContainerId,
                    "imagePath": objContext.CMSImage_Editor_ModuleProcessor.GetImagePath(objContext),
                    "ElementJson": { ...objContext.state.ElementJson },
                    "blnImageFound": objContext.state.ElementJson.blnScreenShotPaste ? false : true
                },
                "Meta": {
                    "PopupName": "ImageSavePopup",
                    "Height": 'auto',
                    "Width": '523px',
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
                    GetSaveDetails: async (objSaveDetails) => {
                        let response = await objContext.CMSImage_Editor_ModuleProcessor.handleImageSaveDetails(objContext, objSaveDetails);
                        editorPopup.ClosePopup(objContext.props.Id);
                        resolve(response);
                    }
                }
            });
        });
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
     * @name GetAlignmentValue
     * @param {object} objParams {props, state, dispatch, PassedEvents, Data}
     */
    SetImageAligment(objParams) {
        const { objContext, AlignType, AlignValue } = objParams;
        var objAlignmentValue = AlignType === "horizontal" ? { "vElementHorizontalAlignment": AlignValue } : { "vElementVerticalAlignment": AlignValue };
        objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vContainerElementProperties"]: { ...objContext.state.ElementJson.vContainerElementProperties, ...objAlignmentValue }
                }
            }
        })
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSImage/CMSImageStyles.css"
        ];
    }
}

export default CMSImage_Editor_ModuleProcessor;
