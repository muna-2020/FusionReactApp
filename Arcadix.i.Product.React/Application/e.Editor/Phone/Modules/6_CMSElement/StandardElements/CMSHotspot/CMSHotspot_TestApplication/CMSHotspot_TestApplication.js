//React imports
import React, { useRef, useReducer, useEffect } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import * as CMSHotspot_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_TestApplication/CMSHotspot_TestApplication_Hook';
import CMSHotspot_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_TestApplication/CMSHotspot_TestApplication_ModuleProcessor';
import CMSHotspot_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_Common/CMSHotspot_Common_ModuleProcessor';

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

/**
 * @name CMSHotspot_TestApplication
 * @param {object} props props from parent
 * @summary Contains CMSHotspot_TestApplication component.
 * @returns {component} CMSHotspot_TestApplication
 */
const CMSHotspot_TestApplication = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, { ...CMSHotspot_TestApplication_Hook.GetInitialState(props) });

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSHotspot_TestApplication_" + props.ElementJson.iElementId,
        "imageArea": useRef(null),
        "arrMarkers": useRef(null),
        "clickCount": useRef(0),
        "arrMarkerPositions": useRef([]),
        "blnIsMarkerDragged": useRef(false),
        "outerContainer": useRef(null),
        "innerContainer": useRef(null),
        "myCanvas": useRef(null),
        "ResetAnswer": () => { ResetAnswer(); },
        "CMSHotspot_TestApplication_ModuleProcessor": new CMSHotspot_TestApplication_ModuleProcessor(),
        "CMSHotspot_Common_ModuleProcessor": new CMSHotspot_Common_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSHotspot_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSHotspot_TestApplication_ModuleProcessor);

    /**
     * @name CMSHotspot_TestApplication_Hook.Initialize
     * @summary Initialize method call in CMSHotspot_TestApplication_Hook, that contains all the common custom hooks.
     */
    CMSHotspot_TestApplication_Hook.Initialize(objContext);

    useEffect(() => {
        if ((state.ViewComparison || state.LoadUserResponse) && state.UserAnswerJson && state.UserAnswerJson["Answers"]) {
            objContext.arrMarkers.current.map((objMarker, intIndex) => {
                intIndex++;
                let strId = "hotspot_marker_" + objContext.state.ElementJson["iElementId"] + "_" + intIndex;
                let arrMarkerPosition = state.UserAnswerJson["Answers"].filter(objTempData => objTempData.id.toString() === intIndex.toString());
                if (arrMarkerPosition.length > 0) {
                    //let objDomAppArea = document.getElementById("activeworkarea_" + props.Mode + "_" + props.PageId);
                    let objDraggedElement = objContext.outerContainer.current.querySelector('[id="' + strId + '"]');
                    let strClassNames = objDraggedElement.getAttribute("class");
                    if (strClassNames.includes("hotspot-marker-display-none")) {
                        strClassNames = strClassNames.replace("hotspot-marker-display-none", "hotspot-marker-display-block");
                        objDraggedElement.setAttribute("class", strClassNames);
                    }
                    let objBoundingRects = objDraggedElement.getBoundingClientRect();
                    objDraggedElement.style.left = arrMarkerPosition[0].x - (objBoundingRects.width / 2) + "px";
                    objDraggedElement.style.top = arrMarkerPosition[0].y - (objBoundingRects.height / 2) + "px";
                    //objContext.clickCount.current += 1;
                }
            });
            objContext.arrMarkerPositions.current = state.UserAnswerJson["Answers"];
        }
    }, [state.UserAnswerJson]);

    useEffect(() => {
        if (objContext.state.ViewSolution || objContext.state.ViewComparison) {
            objContext.CMSHotspot_Common_ModuleProcessor.setCanvasWidthAndHeight(objContext, true);
        }
    }, [objContext.state.ViewSolution, objContext.state.ViewComparison, objContext.state.blnRedrawCanvas]);

    /**
     * @name SaveMarkerPosition
     * @param {string} strMarkerId Marker Id
     * @param {number} intClientX X-Coordinate
     * @param {number} intClientY Y-Coordinate
     * @summary Saves the marker position.
     */
    const SaveMarkerPosition = (strMarkerId, intClientX, intClientY) => {
        let objImageArea_BoundingRect = objContext.imageArea.current.getBoundingClientRect();
        if (objContext.arrMarkerPositions.current !== null && objContext.arrMarkerPositions.current.filter(objTempData => objTempData["id"] === strMarkerId).length > 0) {
            objContext.arrMarkerPositions.current = objContext.arrMarkerPositions.current.map(objTempData => {
                if (objTempData["id"] === strMarkerId) {
                    return {
                        ...objTempData,
                        ["x"]: intClientX,
                        ["y"]: intClientY
                    };
                }
                else {
                    return {
                        ...objTempData
                    };
                }
            });
        }
        else {
            objContext.arrMarkerPositions.current = [
                ...objContext.arrMarkerPositions.current,
                {
                    "id": strMarkerId.toString(),
                    "x": intClientX,
                    "y": intClientY
                }
            ];
        }
    };

    /**
     * @name ResetAnswer
     * @summary Resets the user response
     */
    const ResetAnswer = () => {
        if (objContext.arrMarkerPositions.current.length > 0) {
            objContext.arrMarkers.current.map((objMarker, intIndex) => {
                intIndex += 1;
                let strId = "hotspot_marker_" + objContext.state.ElementJson["iElementId"] + "_" + intIndex;
                let objMarkerElement = objContext.outerContainer.current.querySelector('[id="' + strId + '"]');
                if (objMarkerElement !== null) {
                    objMarkerElement.setAttribute("class", "hotspot-marker hotspot-marker-display-none");
                    objMarkerElement.style.left = "0px";
                    objMarkerElement.style.top = "0px";
                }
            });
        }
        if (state.ViewSolution || state.ViewComparison) {
            // let objCanvasElement = objHotspotElement.querySelector('[id="HotspotCanvasDiv_' + state.ElementJson["iElementId"] + '"]');
            // objCanvasElement.remove();
            const canvas = objContext.myCanvas.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let strImgPath = `${JConfiguration.WebDataPath}Repo/Image/${JConfiguration.MainClientId}/${objContext.state.ElementJson.vImageElementJson.iElementId}_Image_${objContext.state.ElementJson.vImageElementJson.vElementJson.iImageFileVersion}.${objContext.state.ElementJson.vImageElementJson.vElementJson.vImageType}`;
            const img = objContext.imageArea.current;
            img.src = strImgPath;
        }
        objContext.arrMarkerPositions.current = [];
        objContext.clickCount.current = 0;
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ViewSolution": false,
                "ViewComparison": false,
                "LoadUserResponse": false
            }
        });

        var arrWrongSpanNodes = objContext.innerContainer.current.querySelectorAll('[type="wrong-answer-span"]');
        arrWrongSpanNodes.forEach((node) => {
            node.remove();
        });
    };

    /**
     * @name HandleImageMouseClick
     * @param {number} intClientX client X
     * @param {number} intClientY client Y
     * @summary handles click on marker
     */
    const HandleImageMouseClick = (intClientX, intClientY) => {
        if (objContext.blnIsMarkerDragged.current === null || !objContext.blnIsMarkerDragged.current) {
            var arrFilteredMarker = objContext.arrMarkers.current.filter((objMarker) => {
                return objMarker.id === objContext.clickCount.current + 1;
            });
            if (arrFilteredMarker.length > 0) {
                var imgRef = arrFilteredMarker[0].ref;
                let strClassNames = imgRef.current.className;
                if (strClassNames.includes("hotspot-marker-display-none")) {
                    strClassNames = strClassNames.replace("hotspot-marker-display-none", "hotspot-marker-display-block");
                    imgRef.current.className = strClassNames;
                }
                let objImageArea_BoundingRect = objContext.imageArea.current.getBoundingClientRect();
                let objBoundingRects = imgRef.current.getBoundingClientRect();
                let intLeft = intClientX - objImageArea_BoundingRect.left;
                let intHeight = intClientY - objImageArea_BoundingRect.top;
                imgRef.current.style.left = intLeft - (objBoundingRects.width / 2) + "px";
                imgRef.current.style.top = intHeight - (objBoundingRects.height / 2) + "px";
                objContext.clickCount.current += 1;
                SaveMarkerPosition(arrFilteredMarker[0].id, intLeft, intHeight);
            }
        }
        else {
            objContext.blnIsMarkerDragged.current = false;
        }
    };

    /**
     * @name GenerateDragableMarkers
     * @summary Creates the markers for dragging.
     * @return {Array} JSX
     * */
    const GenerateDragableMarkers = () => {
        if (objContext.arrMarkers.current === null) {
            objContext.arrMarkers.current = [];
            for (var i = 1; i <= objContext.props.ElementJson.vElementJson.iMarkerCount; i++) {
                objContext.arrMarkers.current = [
                    ...objContext.arrMarkers.current,
                    {
                        "id": i,
                        "display": true,
                        "ref": React.createRef()
                    }
                ];
            }
        }
        var arrMarkerElements = [];
        objContext.arrMarkers.current.map((objMarker, index) => {
            var id = index + 1;
            arrMarkerElements = [
                ...arrMarkerElements,
                <img
                    style={{ "position": "absolute", "width": objContext.state.objMarkerProperties.width + "px", "height": objContext.state.objMarkerProperties.height + "px", "zIndex": "1" }}
                    key={index}
                    ref={objMarker["ref"]}
                    id={"hotspot_marker_" + objContext.state.ElementJson["iElementId"] + "_" + id}
                    DragDrop_DragElementType="AnswerOption"
                    src={`${JConfiguration.IntranetSkinPath}/Images/editor/${objContext.state.strHotspotMarkerName}`}
                    className="hotspot-marker hotspot-marker-display-none"
                />
            ];
        });
        return arrMarkerElements;
    };


    const ShowWrongAreas = () => {

    }

    const GetContent = () => {
        let strImgPath = `${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${objContext.props.ElementJson.vImageElementJson.iElementId}_Image_${objContext.props.ElementJson.vImageElementJson.vElementJson.iImageFileVersion}.${objContext.props.ElementJson.vImageElementJson.vElementJson.vImageType}`;
        let objDragZoneProps = {
            "Meta": {
                "GroupId": objContext.props.ElementJson["iElementId"],
                "Disable": false,
                "DraggableElementType": "AnswerOption",
                "DragAreaType": "OptionArea",
                "DropAreaType": "OptionArea",
                "IsBoundRestricted": true
            },
            "Events": {
                "OnDrop": function (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) {
                    let objBoundingRects = objDraggedElement.getBoundingClientRect();
                    let objImageArea_BoundingRect = objContext.imageArea.current.getBoundingClientRect();
                    let intLeft = intClientX - objImageArea_BoundingRect.left;
                    let intHeight = intClientY - objImageArea_BoundingRect.top;
                    objDraggedElement.style.left = intLeft - (objBoundingRects.width / 2) + "px";
                    objDraggedElement.style.top = intHeight - (objBoundingRects.height / 2) + "px";
                    objContext.blnIsMarkerDragged.current = true;
                    let strId = objDraggedElement.id.split("_")[objDraggedElement.id.split("_").length - 1];
                    SaveMarkerPosition(strId, intLeft, intHeight);
                }
            },
            "CallBacks": {
                "ErrorOnDrop": (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
                    if (objTargetElement && objTargetElement.getAttribute("type") === "wrong-answer-span") {
                        let objBoundingRects = objDraggedElement.getBoundingClientRect();
                        let objImageArea_BoundingRect = objContext.imageArea.current.getBoundingClientRect();
                        let intLeft = intClientX - objImageArea_BoundingRect.left;
                        let intHeight = intClientY - objImageArea_BoundingRect.top;
                        objDraggedElement.style.left = intLeft - (objBoundingRects.width / 2) + "px";
                        objDraggedElement.style.top = intHeight - (objBoundingRects.height / 2) + "px";
                        objContext.blnIsMarkerDragged.current = true;
                        let strId = objDraggedElement.id.split("_")[objDraggedElement.id.split("_").length - 1];
                        SaveMarkerPosition(strId, intLeft, intHeight);
                    }
                }
            },
            "Data": {}
        };
        let alignmentProperties = {};
        if (objContext.state.ElementJson.vImageElementJson.vContainerElementProperties
            && objContext.state.ElementJson.vImageElementJson.vContainerElementProperties.vElementVerticalAlignment
            && objContext.state.ElementJson.vImageElementJson.vContainerElementProperties.vElementHorizontalAlignment) {
            var vHorizontalAlignment = objContext.CMSHotspot_TestApplication_ModuleProcessor.GetAlignmentValue("horizontal", objContext.state.ElementJson.vImageElementJson.vContainerElementProperties.vElementHorizontalAlignment);
            var vVerticalAlignment = objContext.CMSHotspot_TestApplication_ModuleProcessor.GetAlignmentValue("vertical", objContext.state.ElementJson.vImageElementJson.vContainerElementProperties.vElementVerticalAlignment);
            alignmentProperties = { "display": "flex", "justifyContent": vHorizontalAlignment, "alignItems": vVerticalAlignment };
        }
        return (
            <div ref={objContext.outerContainer} style={alignmentProperties} className="hotspot-test-application-main-div" ielementid={state.ElementJson["iElementId"]} ielementtypeid={state.ElementJson["iElementTypeId"]}>
                <div ref={objContext.innerContainer} style={{ "position": "relative" }} id="wrapper_div" onClick={(event) => { HandleImageMouseClick(event.clientX, event.clientY); }}>
                    <DragZone {...objDragZoneProps}>
                        {
                            GenerateDragableMarkers()
                        }
                        <img
                            ref={objContext.imageArea}
                            id="hotspot_test_image"
                            src={strImgPath}
                            DragDrop_DragAreaType="OptionArea"
                            alt="hotspot-image"
                        />
                    </DragZone>
                </div>
                {
                    state.ViewSolution || state.ViewComparison ?
                        <div>
                            <canvas ref={objContext.myCanvas} id="myCanvas" style={{ "border": "1px dotted grey", "display": "none" }}></canvas>
                        </div> : <React.Fragment />
                }
            </div>
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default CMSHotspot_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSHotspot_TestApplication_ModuleProcessor; 