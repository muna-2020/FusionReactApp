let objDraggedElement, objChangedBorderTarget, objSource, objScrollableDiv, objDragdrop_Details, objScrollableDiv_BoundingRects, objDragdrop_MainWrapperDiv_BoundingRect, strSourceType, objDraggedElement_BoundingClientRect, objDraggedElement_BoundingClientRect_init;
let objDragdrop_MainWrapperDiv, intId_objScrollableDiv, initClientX, initClientY, intClientX, intClientY, intPreviousClientX, intPreviousClientY, objDraggedElement_DefaultStyle, objDropAreaStyle;
let initWrapperScrollableWidth = 0, initWrapperScrollableHeight = 0, initZoneScrollableWidth = 0, initZoneScrollableHeight = 0;
let objDragInterval_Zone = null, objDragInterval_Wrapper = null;
let blnElementDragging = false, blnMobileScroll = false, blnIsGhost = false;;
const intScrollValue = 20;
const intScrollAreaSize = 40;

/**
 * @name RunDragDropRequiredPolyfills
 * @summary Runs the polyfills required for drag drop api.
 * */
function RunDragDropRequiredPolyfills() {
    try {
        if (document !== "undefined" && document !== null && Element !== "undefined" && Element !== null) {
            if (!Element.prototype.matches) {
                Element.prototype.matches = Element.prototype.msMatchesSelector ||
                    Element.prototype.webkitMatchesSelector;
            }
            if (!Element.prototype.closest) {
                Element.prototype.closest = function (s) {
                    var el = this;

                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);
                    return null;
                };
            }
        }
    } catch (err) {
        throw err;
    }
}

/**
 * @name DragDrop_DestroyDragAndDropZone
 * @param {string} strGroupId GroupId sent to drag/drop Zone props.
 * @summary Removes the Drag/Drop zone from Arcadix_DragDrop array.
 */
function DragDrop_DestroyDragAndDropZone(strGroupId) {
    if (window.DragDropApi.Arcadix_Dragdrop) {
        window.DragDropApi.Arcadix_Dragdrop = window.DragDropApi.Arcadix_Dragdrop.filter(function (objTempData) {
            if (objTempData["GroupId"].toString() !== strGroupId.toString()) {
                return objTempData;
            }
        });
    }
}

/**
 * @name GetObjectKeys
 * @param {object} objData JSON object
 * @summary Extracts the keys from an object and return it.
 * @returns {array} Kyes
 */
function GetObjectKeys(objData) {
    if (!Object.keys) {
        Object.keys = function (obj) {
            let keys = [];
            for (let i in obj) {
                if (obj.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
            return keys;
        };
    }
    return Object.keys(objData);
}

/**
 * @name SpreadObject
 * @param {object} objData1 JSON obejct
 * @param {object} objData2 JSON obejct
 * @summary Does the same function as spread operator
 * @returns {object} merged object
 */
function SpreadObject(objData1, objData2) {
    let objData = objData1;
    GetObjectKeys(objData2).map(function (strKey) {
        objData[strKey] = objData2[strKey];
    });
    return objData;
}

/**
 * @name DragDrop_SetDragZoneDetails
 * @param {string} strDragZoneId Unique Drag Zone Id
 * @param {object} objDragZoneProps Drag Zone props
 * @sumnmary Make entry of Drag Zone to Arcadix_DragDrop array.
 */
function DragDrop_SetDragZoneDetails(strDragZoneId, objDragZoneProps) {
    if (!window.DragDropApi.Arcadix_Dragdrop) {
        window.DragDropApi.Arcadix_Dragdrop = [];
    }
    if (window.DragDropApi.Arcadix_Dragdrop.filter(function (objTempData) {
        if (objTempData["GroupId"].toString() === objDragZoneProps.Meta.GroupId.toString()) {
            return objTempData;
        }
    }).length === 0) {
        window.DragDropApi.Arcadix_Dragdrop.push({
            "GroupId": objDragZoneProps.Meta.GroupId.toString(),
            "DraggableElementType": objDragZoneProps.Meta.DraggableElementType,
            "DragAreaType": objDragZoneProps.Meta.DragAreaType,
            "DropAreaType": objDragZoneProps.Meta.DropAreaType,
            "DragZoneDetails": {
                "DragZoneId": strDragZoneId.toString(),
                "Data": objDragZoneProps.Data,
                "IsBoundRestricted": objDragZoneProps.Meta.IsBoundRestricted,
                "OnDragStart": objDragZoneProps.Events.OnDragStart,
                "OnDrag": objDragZoneProps.Events.OnDrag,
                "OnDrop": objDragZoneProps.Events.OnDrop,
                "GetHelper": objDragZoneProps.CallBacks.GetHelper,
                "ErrorOnDrop": objDragZoneProps.CallBacks.ErrorOnDrop,
                "OnErrorDrag": objDragZoneProps.CallBacks.OnErrorDrag,
                "RemoveBorderOnHover": objDragZoneProps.Meta.RemoveBorderOnHover
            }
        });
    }
    else {
        window.DragDropApi.Arcadix_Dragdrop = window.DragDropApi.Arcadix_Dragdrop.map(
            function (objTempData) {
                if (objTempData["GroupId"].toString() === objDragZoneProps.Meta.GroupId.toString()) {
                    let objTemp = window.DragDropApi.SpreadObject(objTempData, {
                        "DraggableElementType": objDragZoneProps.Meta.DraggableElementType,
                        "DragAreaType": objDragZoneProps.Meta.DragAreaType,
                        "DropAreaType": objDragZoneProps.Meta.DropAreaType,
                        "Data": objDragZoneProps.Data,
                        "DragZoneDetails": {
                            "DragZoneId": strDragZoneId.toString(),
                            "Data": objDragZoneProps.Data,
                            "IsBoundRestricted": objDragZoneProps.Meta.IsBoundRestricted,
                            "OnDragStart": objDragZoneProps.Events.OnDragStart,
                            "OnDrag": objDragZoneProps.Events.OnDrag,
                            "OnDrop": objDragZoneProps.Events.OnDrop,
                            "GetHelper": objDragZoneProps.CallBacks.GetHelper,
                            "ErrorOnDrop": objDragZoneProps.CallBacks.ErrorOnDrop,
                            "OnErrorDrag": objDragZoneProps.CallBacks.OnErrorDrag,
                            "RemoveBorderOnHover": objDragZoneProps.Meta.RemoveBorderOnHover
                        }
                    });
                    return objTemp;
                }
                else {
                    return objTempData;
                }
            });
    }
}

/**
 * @name DragDrop_SetDropZoneDetails
 * @param {string} strDropZoneId Unique Drop Zone Id
 * @param {object} objDropZoneProps Drop Zone props
 * @sumnmary Updates entry to Drop Zone to Arcadix_DragDrop array.
 */
function DragDrop_SetDropZoneDetails(strDropZoneId, objDropZoneProps) {
    if (!window.DragDropApi.Arcadix_Dragdrop) {
        window.DragDropApi.Arcadix_Dragdrop = [];
    }
    if (window.DragDropApi.Arcadix_Dragdrop.filter(function (objTempData) {
        if (objTempData["GroupId"].toString() === objDropZoneProps.Meta.GroupId.toString()) {
            return objTempData;
        }
    }).length === 0) {
        window.DragDropApi.Arcadix_Dragdrop.push({
            "GroupId": objDropZoneProps.Meta.GroupId.toString(),
            "DropZoneDetails": {
                "DropZoneId": strDropZoneId.toString(),
                "IsDraggable": objDropZoneProps.Meta.IsDraggable,
                "Data": objDropZoneProps.Data,
                "OnDrop": objDropZoneProps.Events.OnDrop,
                "GetHelper": objDropZoneProps.CallBacks.GetHelper,
                "ErrorOnDrop": objDropZoneProps.CallBacks.ErrorOnDrop
            }
        });
    }
    else {
        window.DragDropApi.Arcadix_Dragdrop = window.DragDropApi.Arcadix_Dragdrop.map(function (objTempData) {
            if (objTempData["GroupId"].toString() === objDropZoneProps.Meta.GroupId.toString()) {
                let objTemp = window.DragDropApi.SpreadObject(objTempData, {
                    "DropZoneDetails": {
                        "DropZoneId": strDropZoneId.toString(),
                        "IsDraggable": objDropZoneProps.Meta.IsDraggable,
                        "Data": objDropZoneProps.Data,
                        "OnDrop": objDropZoneProps.Events.OnDrop,
                        "GetHelper": objDropZoneProps.CallBacks.GetHelper,
                        "ErrorOnDrop": objDropZoneProps.CallBacks.ErrorOnDrop
                    }
                });
                return objTemp;
            }
            else {
                return objTempData;
            }
        });
    }
}

/**
 * @name DragDrop_OnDragStart
 * @param {event} objEvent Mouse down/Touch start event.
 * @summary Handler for the Mouse down/Touch start event. Sets the dragdrop variables. Attaches listners.
 */
function DragDrop_OnDragStart(objEvent) {
    let blnIsDraggable = false;
    objDragdrop_MainWrapperDiv = document.querySelector('[dragdrop_type="DragdropWrapper"]');
    objScrollableDiv = objEvent.target.closest('[dragdrop_type="DragZone"]');
    if (!objScrollableDiv && objScrollableDiv === null) {
        objScrollableDiv = objEvent.target.closest('[dragdrop_type="DropZone"]');
        if (objScrollableDiv && objScrollableDiv !== null) {
            strSourceType = "DropZone";
            intId_objScrollableDiv = objScrollableDiv.getAttribute("dragdrop_drop_id");
            objDragdrop_Details = window.DragDropApi.Arcadix_Dragdrop.filter(function (objTempData) { if (objTempData["DropZoneDetails"]["DropZoneId"] === intId_objScrollableDiv) { return objTempData; } })[0];
            if (objDragdrop_Details["DropZoneDetails"]["IsDraggable"]) {
                blnIsDraggable = true;
            }
        }
    }
    else {
        strSourceType = "DragZone";
        blnIsDraggable = true;
        intId_objScrollableDiv = objScrollableDiv.getAttribute("dragdrop_drag_id");
        objDragdrop_Details = window.DragDropApi.Arcadix_Dragdrop.filter(function (objTempData) { if (objTempData["DragZoneDetails"]["DragZoneId"] === intId_objScrollableDiv) { return objTempData; } })[0];
    }
    if ((objEvent.buttons === 1 || objEvent.changedTouches) && objScrollableDiv && objScrollableDiv !== null && blnIsDraggable) {
        objDragdrop_MainWrapperDiv_BoundingRect = objDragdrop_MainWrapperDiv.getBoundingClientRect();
        objScrollableDiv_BoundingRects = objScrollableDiv.getBoundingClientRect();
        if (strSourceType === "DragZone" && objDragdrop_Details["DragZoneDetails"]["GetHelper"] && objDragdrop_Details["DragZoneDetails"]["GetHelper"] !== null) {
            objDraggedElement = objDragdrop_Details["DragZoneDetails"]["GetHelper"]();
        }
        else if (strSourceType === "DropZone" && objDragdrop_Details["DropZoneDetails"]["GetHelper"] && objDragdrop_Details["DropZoneDetails"]["GetHelper"] !== null) {
            objDraggedElement = objDragdrop_Details["DropZoneDetails"]["GetHelper"]();
        }
        else {
            objDraggedElement = objEvent.target.closest("[DragDrop_DragElementType='" + objDragdrop_Details["DraggableElementType"] + "']");
        }
        if (blnElementDragging) {
            window.DragDropApi.DragDrop_StopIntervalForZone();
            window.DragDropApi.DragDrop_StopIntervalForWrapper();
        }
        if (objDraggedElement) {
            // objEvent.stopPropagation();
            // objEvent.preventDefault();
            objDraggedElement_DefaultStyle = objDraggedElement.getAttribute("style");
            initWrapperScrollableHeight = objDragdrop_MainWrapperDiv.scrollHeight;
            initWrapperScrollableWidth = objDragdrop_MainWrapperDiv.scrollWidth;
            initZoneScrollableHeight = objScrollableDiv.scrollHeight;
            initZoneScrollableWidth = objScrollableDiv.scrollWidth;
            objDraggedElement_BoundingClientRect = objDraggedElement.getBoundingClientRect();
            objDraggedElement_BoundingClientRect_init = objDraggedElement.getBoundingClientRect();
            objSource = objDraggedElement.closest("[dragdrop_dragareatype='" + objDragdrop_Details["DragAreaType"] + "']") || objDraggedElement.closest("[DragDrop_DropAreaType='" + objDragdrop_Details["DropAreaType"] + "']");
            if (objEvent.clientY) {
                blnMobileScroll = false;
                intPreviousClientX = objEvent.clientX + objDragdrop_MainWrapperDiv.scrollLeft;
                intPreviousClientY = objEvent.clientY + objDragdrop_MainWrapperDiv.scrollTop;
                initClientX = objEvent.clientX + objDragdrop_MainWrapperDiv.scrollLeft;
                initClientY = objEvent.clientY + objDragdrop_MainWrapperDiv.scrollTop;
                if (objDragdrop_Details["DragZoneDetails"]["OnDragStart"]) {
                    objDragdrop_Details["DragZoneDetails"]["OnDragStart"](objDraggedElement, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                }
                objDragdrop_MainWrapperDiv.addEventListener("mousemove", window.DragDropApi.DragDrop_OnDrag, { passive: false });
                objDragdrop_MainWrapperDiv.addEventListener("mouseup", window.DragDropApi.DragDrop_OnDrop, false);
                objDragdrop_MainWrapperDiv.addEventListener("scroll", window.DragDropApi.DragDrop_HandleWrapperScroll, false);
            }
            else if (objEvent.changedTouches) {
                blnMobileScroll = true;
                intPreviousClientX = objEvent.clientX + objDragdrop_MainWrapperDiv.scrollLeft;
                intPreviousClientY = objEvent.clientY + objDragdrop_MainWrapperDiv.scrollTop;
                initClientX = objEvent.changedTouches[0].clientX + objDragdrop_MainWrapperDiv.scrollLeft;
                initClientY = objEvent.changedTouches[0].clientY + objDragdrop_MainWrapperDiv.scrollTop;
                if (objDragdrop_Details["DragZoneDetails"]["OnDragStart"]) {
                    objDragdrop_Details["DragZoneDetails"]["OnDragStart"](objDraggedElement, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                }
                objDragdrop_MainWrapperDiv.addEventListener("touchmove", window.DragDropApi.DragDrop_OnDrag, { passive: false });
                objDragdrop_MainWrapperDiv.addEventListener("touchend", window.DragDropApi.DragDrop_OnDrop, false);
                objDragdrop_MainWrapperDiv.addEventListener("scroll", window.DragDropApi.DragDrop_HandleWrapperScroll, false);
            }
        }
    }
}

/**
 * @name DragDrop_OnDrag
 * @param {event} objEvent Drag devent
 * @summary On drag function. 
 */
function DragDrop_OnDrag(objEvent) {
    window.DragDropApi.DragDrop_StopIntervalForZone();
    window.DragDropApi.DragDrop_StopIntervalForWrapper();
    if (objDraggedElement) {
        let strShowGhost = objDraggedElement.getAttribute("DragDrop_DisplayGhost");
        if (strShowGhost !== null && strShowGhost === "Y" && !blnIsGhost) {
            blnIsGhost = true;
            let objClone = objDraggedElement.cloneNode(true);
            objClone.setAttribute("isClone", "Y");
            objScrollableDiv.appendChild(objClone);
            objDraggedElement = objClone;
        }
        if (objEvent.buttons === 1 || objEvent.changedTouches) {
            objEvent.stopPropagation();
            objEvent.preventDefault();
            blnElementDragging = true;
            objScrollableDiv_BoundingRects = objScrollableDiv.getBoundingClientRect();
            objDraggedElement_BoundingClientRect = objDraggedElement.getBoundingClientRect();
            intClientX = objEvent.clientX ? objEvent.clientX : objEvent.changedTouches ? objEvent.changedTouches[0].clientX : undefined;
            intClientY = objEvent.clientY ? objEvent.clientY : objEvent.changedTouches ? objEvent.changedTouches[0].clientY : undefined;
            if (intClientX && intClientY) {
                if (objDragdrop_Details["DragZoneDetails"]["IsBoundRestricted"]) {
                    let objTargetElement;
                    if (document.elementFromPoint(intClientX, intClientY).closest("[DragDrop_DropAreaType='" + objDragdrop_Details["DropAreaType"] + "']")) {
                        objTargetElement = document.elementFromPoint(intClientX, intClientY).closest("[DragDrop_DropAreaType='" + objDragdrop_Details["DropAreaType"] + "']");
                    }
                    else if (document.elementFromPoint(intClientX, intClientY).closest("[dragdrop_dragareatype='" + objDragdrop_Details["DragAreaType"] + "']")) {
                        objTargetElement = document.elementFromPoint(intClientX, intClientY).closest("[dragdrop_dragareatype='" + objDragdrop_Details["DragAreaType"] + "']");
                    }
                    if (objTargetElement && objTargetElement !== null) {
                        objDropAreaStyle = objTargetElement.getAttribute("style");
                    }
                    if (objDraggedElement.style) {
                        objDraggedElement.style.pointerEvents = "none";
                    }
                    else {
                        objDraggedElement.setAttribute("style", "pointer-events: none;");
                    }
                    objDraggedElement.style.opacity = blnIsGhost ? "0.5" : "0.8";
                    objDraggedElement.style.zIndex = "99999999";
                    if (objDraggedElement_BoundingClientRect.left >= objScrollableDiv_BoundingRects.left &&
                        objDraggedElement_BoundingClientRect.right <= objScrollableDiv_BoundingRects.right &&
                        objDraggedElement_BoundingClientRect.top >= objScrollableDiv_BoundingRects.top &&
                        objDraggedElement_BoundingClientRect.bottom <= objScrollableDiv_BoundingRects.bottom) {
                        let blnContinueWithNormalFlow = false;
                        if (objDragdrop_Details["DragZoneDetails"]["OnDrag"]) {
                            blnContinueWithNormalFlow = objDragdrop_Details["DragZoneDetails"]["OnDrag"](objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                        }
                        else {
                            blnContinueWithNormalFlow = true;
                        }
                        if (blnContinueWithNormalFlow) {
                            objDraggedElement.style.position = "absolute";
                            let intLeft = intClientX - initClientX - objScrollableDiv_BoundingRects.left + objDraggedElement_BoundingClientRect_init.left;
                            let intTop = intClientY - initClientY - objScrollableDiv_BoundingRects.top + objDraggedElement_BoundingClientRect_init.top;
                            objDraggedElement.style.left = intLeft + "px";
                            objDraggedElement.style.top = intTop + "px";
                        }
                        intPreviousClientX = intClientX;
                        intPreviousClientY = intClientY;
                    }
                    else {
                        if (objDragdrop_Details["DragZoneDetails"]["OnErrorDrag"]) {
                            objDragdrop_Details["DragZoneDetails"]["OnErrorDrag"](objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                        }
                        else {
                            objDraggedElement.style.position = "absolute";
                            let intLeft = intPreviousClientX - initClientX - objScrollableDiv_BoundingRects.left + objDraggedElement_BoundingClientRect_init.left;
                            let intTop = intPreviousClientY - initClientY - objScrollableDiv_BoundingRects.top + objDraggedElement_BoundingClientRect_init.top;
                            if (objDraggedElement_BoundingClientRect.left < objScrollableDiv_BoundingRects.left) {
                                intLeft = 0;
                            }
                            else if (objDraggedElement_BoundingClientRect.right > objScrollableDiv_BoundingRects.right) {
                                intLeft = objScrollableDiv_BoundingRects.width - objDraggedElement_BoundingClientRect.width;
                            }
                            if (objDraggedElement_BoundingClientRect.top < objScrollableDiv_BoundingRects.top) {
                                intTop = 0;
                            }
                            else if (objDraggedElement_BoundingClientRect.bottom > objScrollableDiv_BoundingRects.bottom) {
                                intTop = objScrollableDiv_BoundingRects.height - objDraggedElement_BoundingClientRect.height;
                            }
                            objDraggedElement.style.left = intLeft + "px";
                            objDraggedElement.style.top = intTop + "px";
                        }
                    }
                }
                else {
                    if (intClientY > objDragdrop_MainWrapperDiv_BoundingRect.top + intScrollAreaSize &&
                        intClientY < objDragdrop_MainWrapperDiv_BoundingRect.bottom - intScrollAreaSize &&
                        intClientX > objDragdrop_MainWrapperDiv_BoundingRect.left + intScrollAreaSize &&
                        intClientX < objDragdrop_MainWrapperDiv_BoundingRect.right - intScrollAreaSize) {
                        objDraggedElement.setAttribute("style", "pointer-events: none;");
                        objDraggedElement.style.opacity = "0.8";
                        objDraggedElement.style.zIndex = "99999999";
                        objDraggedElement.style.outline = "1px solid black";
                        objDraggedElement.style.position = "relative";
                        objDraggedElement.style.transform = "translate(" + (intClientX - initClientX + objDragdrop_MainWrapperDiv.scrollLeft) + "px," + (intClientY - initClientY + objDragdrop_MainWrapperDiv.scrollTop) + "px)";
                        let objTargetElement, blnIsDragZone = false;
                        if (document.elementFromPoint(intClientX, intClientY).closest("[DragDrop_DropAreaType='" + objDragdrop_Details["DropAreaType"] + "']")) {
                            objTargetElement = document.elementFromPoint(intClientX, intClientY).closest("[DragDrop_DropAreaType='" + objDragdrop_Details["DropAreaType"] + "']");
                            blnIsDragZone = false;
                        }
                        else if (document.elementFromPoint(intClientX, intClientY).closest("[dragdrop_dragareatype='" + objDragdrop_Details["DragAreaType"] + "']")) {
                            objTargetElement = document.elementFromPoint(intClientX, intClientY).closest("[dragdrop_dragareatype='" + objDragdrop_Details["DragAreaType"] + "']");
                            blnIsDragZone = true;
                        }
                        if (objTargetElement && objTargetElement !== null) {
                            objDropAreaStyle = objTargetElement.getAttribute("style");
                        }
                        window.DragDropApi.DragDrop_ResetPreviousHoveredElementCss();
                        if (!blnIsDragZone || (blnIsDragZone && !objDragdrop_Details["DragZoneDetails"]["RemoveBorderOnHover"])) {
                            window.DragDropApi.DragDrop_ChangeTargetElementCss(objTargetElement, "add");
                        }
                        objChangedBorderTarget = objTargetElement;
                        if ((intClientX > objScrollableDiv_BoundingRects.left && intClientX < objScrollableDiv_BoundingRects.left + intScrollAreaSize) ||
                            (intClientX < objScrollableDiv_BoundingRects.right && intClientX > objScrollableDiv_BoundingRects.right - intScrollAreaSize) ||
                            (intClientY > objScrollableDiv_BoundingRects.top && intClientY < objScrollableDiv_BoundingRects.top + intScrollAreaSize) ||
                            (intClientY < objScrollableDiv_BoundingRects.bottom && intClientY > objScrollableDiv_BoundingRects.bottom - intScrollAreaSize)) {
                            objDragInterval_Zone = setInterval(window.DragDropApi.DragDrop_HandleZoneDragScroll, 100);
                        }
                    }
                    else {
                        objDragInterval_Wrapper = setInterval(window.DragDropApi.DragDrop_HandleWrapperDragScroll, 100);
                    }
                }
            }
        }
        else {
            if (objDraggedElement_DefaultStyle) {
                objDraggedElement.setAttribute("style", objDraggedElement_DefaultStyle);
            }
            else {
                objDraggedElement.removeAttribute("style");
            }
            window.DragDropApi.DragDrop_ResetPreviousHoveredElementCss();
            window.DragDropApi.DragDrop_ResetVariables();
        }
    }
}

/**
 * @name DragDrop_OnDrop
 * @param {event} objEvent Mouse up/Touch end event.
 * @summary Handler for the Mouse up/Touch end event.
 */
function DragDrop_OnDrop(objEvent) {
    window.DragDropApi.DragDrop_StopIntervalForZone();
    window.DragDropApi.DragDrop_StopIntervalForWrapper();
    let objDropArea;
    if (objDraggedElement && objDraggedElement !== null) {
        if (blnElementDragging) {
            if (objDraggedElement.style) {
                objDraggedElement.style.pointerEvents = "none";
            }
            else {
                objDraggedElement.setAttribute("style", "pointer-events: none;");
            }
            intClientX = objEvent.clientX ? objEvent.clientX : objEvent.changedTouches ? objEvent.changedTouches[0].clientX : null;
            intClientY = objEvent.clientY ? objEvent.clientY : objEvent.changedTouches ? objEvent.changedTouches[0].clientY : null;
            let objTargetElement = document.elementFromPoint(intClientX, intClientY);
            if (objDraggedElement_DefaultStyle) {
                objDraggedElement.setAttribute("style", objDraggedElement_DefaultStyle);
            }
            else {
                objDraggedElement.removeAttribute("style");
            }
            let objData;
            if (strSourceType === "DragZone") {
                objData = objDragdrop_Details["DragZoneDetails"]["Data"];
            }
            else {
                objData = objDragdrop_Details["DropZoneDetails"]["Data"];
            }
            if (objTargetElement.closest("[dragdrop_dragareatype='" + objDragdrop_Details["DragAreaType"] + "']")) {
                objDropArea = objTargetElement.closest("[dragdrop_dragareatype='" + objDragdrop_Details["DragAreaType"] + "']");
                if (objDragdrop_Details["DragZoneDetails"]["OnDrop"] && objDragdrop_Details["DragZoneDetails"]["OnDrop"] !== null) {
                    objDragdrop_Details["DragZoneDetails"]["OnDrop"](objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement);
                }
                else {
                    objDropArea.appendChild(objDraggedElement);
                }
            }
            else if (objTargetElement.closest("[DragDrop_DropAreaType='" + objDragdrop_Details["DropAreaType"] + "']")) {
                objDropArea = objTargetElement.closest("[DragDrop_DropAreaType='" + objDragdrop_Details["DropAreaType"] + "']");
                if (objDragdrop_Details["DropZoneDetails"]["OnDrop"] && objDragdrop_Details["DropZoneDetails"]["OnDrop"] !== null) {
                    objDragdrop_Details["DropZoneDetails"]["OnDrop"](objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement);
                }
                else {
                    objDropArea.appendChild(objDraggedElement);
                }
            }
            else {
                if (strSourceType === "DragZone" && objDragdrop_Details["DragZoneDetails"]["ErrorOnDrop"] && objDragdrop_Details["DragZoneDetails"]["ErrorOnDrop"] !== null) {
                    objDragdrop_Details["DragZoneDetails"]["ErrorOnDrop"](objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement);
                }
                else if (strSourceType === "DropZone" && objDragdrop_Details["DropZoneDetails"]["ErrorOnDrop"] && objDragdrop_Details["DropZoneDetails"]["ErrorOnDrop"] !== null) {
                    objDragdrop_Details["DropZoneDetails"]["ErrorOnDrop"](objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement);
                }
            }
            if (blnIsGhost) {
                objScrollableDiv.removeChild(objDraggedElement);
            }
        }
        else {
            objDraggedElement = null;
        }
    }
    window.DragDropApi.DragDrop_ChangeTargetElementCss(objDropArea, "remove", objDropAreaStyle);
    window.DragDropApi.DragDrop_ResetPreviousHoveredElementCss();
    if (!blnMobileScroll) {
        objDragdrop_MainWrapperDiv.removeEventListener("mousemove", window.DragDropApi.DragDrop_OnDrag, { passive: false });
        objDragdrop_MainWrapperDiv.removeEventListener("mouseup", window.DragDropApi.DragDrop_OnDrop, false);
        objDragdrop_MainWrapperDiv.removeEventListener("scroll", window.DragDropApi.DragDrop_HandleWrapperScroll, false);
    }
    else {
        objDragdrop_MainWrapperDiv.removeEventListener("touchmove", window.DragDropApi.DragDrop_OnDrag, { passive: false });
        objDragdrop_MainWrapperDiv.removeEventListener("touchend", window.DragDropApi.DragDrop_OnDrop, false);
    }
    window.DragDropApi.DragDrop_ResetVariables();
}

/**
 * @name DragDrop_HandleWrapperScroll
 * @summary Handles the Scroll Event of the wrapper. Scroll by wheel while dragging the element.
 */
function DragDrop_HandleWrapperScroll() {
    if (blnElementDragging && objDraggedElement && !objDragdrop_Details["DragZoneDetails"]["IsBoundRestricted"]) {
        objDraggedElement.style.transform = "translate(" + (intClientX - initClientX + objDragdrop_MainWrapperDiv.scrollLeft) + "px," + (intClientY - initClientY + objDragdrop_MainWrapperDiv.scrollTop) + "px)";
    }
}

/**
 * @name DragDrop_HandleWrapperDragScroll
 * @summary Handles the simultaneous Drag & Scroll of element of the wrapper.
 */
function DragDrop_HandleWrapperDragScroll() {
    if (blnElementDragging && objDraggedElement) {
        if (intClientY <= objDragdrop_MainWrapperDiv_BoundingRect.top + intScrollAreaSize) {
            objDragdrop_MainWrapperDiv.scrollTop -= intScrollValue;
        }
        if (intClientY >= objDragdrop_MainWrapperDiv_BoundingRect.bottom - intScrollAreaSize && objDragdrop_MainWrapperDiv.scrollTop + objDragdrop_MainWrapperDiv.clientHeight <= initWrapperScrollableHeight) {
            objDragdrop_MainWrapperDiv.scrollTop += intScrollValue;
        }
        if (intClientX <= objDragdrop_MainWrapperDiv_BoundingRect.left + intScrollAreaSize) {
            objDragdrop_MainWrapperDiv.scrollLeft -= intScrollValue;
        }
        if (intClientX >= objDragdrop_MainWrapperDiv_BoundingRect.right - intScrollAreaSize && objDragdrop_MainWrapperDiv.scrollLeft + objDragdrop_MainWrapperDiv.clientWidth <= initWrapperScrollableWidth) {
            objDragdrop_MainWrapperDiv.scrollLeft += intScrollValue;
        }
    }
}

/**
 * @name DragDrop_HandleZoneDragScroll
 * @summary Handles the simultaneous Drag & Scroll of element of the zone.
 */
function DragDrop_HandleZoneDragScroll() {
    if (blnElementDragging && objDraggedElement) {
        if (intClientX >= objScrollableDiv_BoundingRects.left && intClientX <= objScrollableDiv_BoundingRects.left + intScrollAreaSize) {
            objScrollableDiv.scrollLeft -= intScrollValue;
        }
        if (intClientX <= objScrollableDiv_BoundingRects.right && intClientX >= objScrollableDiv_BoundingRects.right - intScrollAreaSize && objScrollableDiv.scrollLeft + objScrollableDiv.clientWidth <= initZoneScrollableWidth) {
            objScrollableDiv.scrollLeft += intScrollValue;
        }
        if (intClientY >= objScrollableDiv_BoundingRects.top && intClientY <= objScrollableDiv_BoundingRects.top + intScrollAreaSize) {
            objScrollableDiv.scrollTop -= intScrollValue;
        }
        if (intClientY <= objScrollableDiv_BoundingRects.bottom && intClientY >= objScrollableDiv_BoundingRects.bottom - intScrollAreaSize && objScrollableDiv.scrollTop + objScrollableDiv.clientHeight <= initZoneScrollableHeight) {
            objScrollableDiv.scrollTop += intScrollValue;
        }
    }
}

/**
 * @name DragDrop_ResetVariables
 * @summary Resets dragdrop related variables to their initial values.
 */
function DragDrop_ResetVariables() {
    objDraggedElement = objChangedBorderTarget = objSource = objScrollableDiv = objDragdrop_Details = objScrollableDiv_BoundingRects = objDragdrop_MainWrapperDiv_BoundingRect = strSourceType = objDraggedElement_BoundingClientRect = objDraggedElement_BoundingClientRect_init = undefined;
    objDragdrop_MainWrapperDiv = intId_objScrollableDiv = initClientX = initClientY = intClientX = intClientY = intPreviousClientX = intPreviousClientY = objDraggedElement_DefaultStyle = objDropAreaStyle = undefined;
    initWrapperScrollableWidth = 0, initWrapperScrollableHeight = 0, initZoneScrollableWidth = 0, initZoneScrollableHeight = 0;
    objDragInterval_Zone = null, objDragInterval_Wrapper = null;
    blnElementDragging = false, blnMobileScroll = false, blnIsGhost = false;
}

/**
 * @name DragDrop_ResetPreviousHoveredElementCss
 * @summary Resets the CSS of the las hovered element back to normal.
 */
function DragDrop_ResetPreviousHoveredElementCss() {
    if (objChangedBorderTarget) {
        objChangedBorderTarget.removeAttribute("style");
    }
}

/**
 * @name DragDrop_ChangeTargetElementCss
 * @param {Element} objTargetElement Element to which border has to be added/removed
 * @param {string} strOperationType Add/Remove.
 * @summary Add/Remove the CSS from target element.
 */
function DragDrop_ChangeTargetElementCss(objTargetElement, strOperationType, objStyle) {
    if (objTargetElement) {
        if (!strOperationType || strOperationType === null || strOperationType.toLowerCase() === "add") {
            objTargetElement.setAttribute("style", "outline: 2px solid black !important; outline-offset:-2px");
        }
        else {
            if (objStyle) {
                objTargetElement.style = objStyle;
            }
            else {
                objTargetElement.removeAttribute("style");
            }
        }
    }
}

/**
 * @name DragDrop_StopIntervalForZone
 * @summary Stops the drag scroll functionality.
 */
function DragDrop_StopIntervalForZone() {
    if (objDraggedElement) {
        objDraggedElement.style.cursor = "pointer";
    }
    if (objDragInterval_Zone && objDragInterval_Zone !== null) {
        clearInterval(objDragInterval_Zone);
    }
    objDragInterval_Zone = null;
}

/**
 * @name DragDrop_StopIntervalForWrapper
 * @summary Stops the drag scroll functionality.
 */
function DragDrop_StopIntervalForWrapper() {
    if (objDraggedElement) {
        objDraggedElement.style.cursor = "pointer";
    }
    if (objDragInterval_Wrapper && objDragInterval_Wrapper !== null) {
        clearInterval(objDragInterval_Wrapper);
    }
    objDragInterval_Wrapper = null;
}

/**
 * @name DragDrop_Initialize
 * @summary Attaches the mouse down event to window.
 */
export function DragDrop_Initialize() {
    RunDragDropRequiredPolyfills();
    window.DragDropApi = {
        "Arcadix_Dragdrop": [],
        "DragDrop_DestroyDragAndDropZone": DragDrop_DestroyDragAndDropZone,
        "SpreadObject": SpreadObject,
        "DragDrop_SetDragZoneDetails": DragDrop_SetDragZoneDetails,
        "DragDrop_SetDropZoneDetails": DragDrop_SetDropZoneDetails,
        "DragDrop_OnDragStart": DragDrop_OnDragStart,
        "DragDrop_OnDrag": DragDrop_OnDrag,
        "DragDrop_OnDrop": DragDrop_OnDrop,
        "DragDrop_HandleWrapperScroll": DragDrop_HandleWrapperScroll,
        "DragDrop_HandleWrapperDragScroll": DragDrop_HandleWrapperDragScroll,
        "DragDrop_HandleZoneDragScroll": DragDrop_HandleZoneDragScroll,
        "DragDrop_ResetVariables": DragDrop_ResetVariables,
        "DragDrop_ResetPreviousHoveredElementCss": DragDrop_ResetPreviousHoveredElementCss,
        "DragDrop_ChangeTargetElementCss": DragDrop_ChangeTargetElementCss,
        "DragDrop_StopIntervalForZone": DragDrop_StopIntervalForZone,
        "DragDrop_StopIntervalForWrapper": DragDrop_StopIntervalForWrapper
    };
    window.addEventListener("mousedown", window.DragDropApi.DragDrop_OnDragStart, { passive: false });
    window.addEventListener("touchstart", window.DragDropApi.DragDrop_OnDragStart, { passive: false });
}

/**
 * @name DragDrop_Destroy
 * @summary Resets the ArcadixDragDrop array.
 */
export function DragDrop_Destroy() {
    window.DragDropApi.Arcadix_Dragdrop = [];
    window.removeEventListener("mousedown", window.DragDropApi.DragDrop_OnDragStart, { passive: false });
    window.removeEventListener("touchstart", window.DragDropApi.DragDrop_OnDragStart, { passive: false });
}
