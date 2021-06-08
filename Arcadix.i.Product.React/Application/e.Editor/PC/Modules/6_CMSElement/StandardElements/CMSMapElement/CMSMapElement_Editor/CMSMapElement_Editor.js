// React related imports.
import React, { useEffect, useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related fies.
import MapElement_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Common/CMSMapElement_Common';
import * as CMSMapElement_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Editor/CMSMapElement_Editor_Hooks';
import CMSMapElement_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Editor/CMSMapElement_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSMapElement_Editor
 * @param {object} props props from parent.
 * @param {any} ref ref to component.
 * @summary CMSMapElement's editor version.
 * @returns {any} CMSMapElement_Editor.
 */
const CMSMapElement_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSMapElement_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        Element_UndoRedoDataRef,
        dispatch,
        "Canvas_Ref": useRef(null),
        "MarkerImage_Ref": useRef(null),
        "MapImage_Ref": useRef(null),
        "DrawStarted_Ref": useRef(false),
        "Coordinates_Ref": useRef([]),
        "ModuleName": "CMSMapElement_Editor_" + props.ElementJson.iElementId,
        "CMSMapElement_Editor_ModuleProcessor": new CMSMapElement_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext objContext object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMapElement_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSMapElement_Editor_ModuleProcessor);

    /**
     * @name CMSMapElement_Editor_Hook.Initialize
     * @summary Initialize method call in CMSMapElement_Editor_Hook, that contains all the custom hooks.
     */
    CMSMapElement_Editor_Hooks.Initialize(objContext);

    useEffect(() => {
        if (objContext.state.ElementJson["vElementJson"]["Coordinates"].length > 0) {
            let ctx = objContext.Canvas_Ref.current.getContext("2d");
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Coordinates"].length; intCount++) {
                let arrCoordinates = objContext.state.ElementJson["vElementJson"]["Coordinates"][intCount];
                arrCoordinates.map((x, intIndex) => {
                    let intX = x["X"];
                    let intY = x["Y"];
                    if (intIndex === 0) {
                        ctx.beginPath();
                        ctx.moveTo(intX, intY);
                    }
                    else {
                        Draw(ctx, intX, intY);
                    }
                });
            }
        }
    }, []);

    const Draw = (ctx, intXCoordinate, intYCoordinate) => {
        ctx.strokeStyle = "#000000";
        ctx.lineTo(intXCoordinate, intYCoordinate);
        ctx.lineWidth = 3;
        ctx.stroke();
    };

    const OnMouseDown = (event) => {
        objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let ctx = objContext.Canvas_Ref.current.getContext("2d");
        let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
        let intX = event.clientX - objBoundingClientRect.left;
        let intY = event.clientY - objBoundingClientRect.top;
        ctx.beginPath();
        ctx.moveTo(intX, intY);
        // objContext.Coordinates_Ref.current = [
        //     ...objContext.Coordinates_Ref.current,
        //     {
        //         "X": intX,
        //         "Y": intY
        //     }
        // ];
        let objBoundingClientRect_Marker = objContext.MarkerImage_Ref.current.getBoundingClientRect();
        objContext.MarkerImage_Ref.current.style.left = intX + "px";
        objContext.MarkerImage_Ref.current.style.top = intY + "px";
        objContext.DrawStarted_Ref.current = true;
    };

    const OnMouseMove = (event) => {
        if (objContext.DrawStarted_Ref.current) {
            let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
            let objBoundingClientRect_Marker = objContext.MarkerImage_Ref.current.getBoundingClientRect();
            let ctx = objContext.Canvas_Ref.current.getContext("2d");
            let intX = event.clientX - objBoundingClientRect.left;
            let intY = event.clientY - objBoundingClientRect.top;
            objContext.Coordinates_Ref.current = [
                ...objContext.Coordinates_Ref.current,
                {
                    "X": intX,
                    "Y": intY
                }
            ];
            objContext.MarkerImage_Ref.current.style.left = intX + "px";
            objContext.MarkerImage_Ref.current.style.top = intY + "px";
            Draw(ctx, intX, intY);
        }
    };

    const OnMouseUp = (event) => {
        if (objContext.DrawStarted_Ref.current) {
            OnMouseMove(event);
            event.target.removeEventListener("mousemove", OnMouseMove);
            event.target.removeEventListener("mouseup", OnMouseUp);
            objContext.DrawStarted_Ref.current = false;
            let arrCoordinates = [...objContext.Coordinates_Ref.current];
            objContext.Coordinates_Ref.current = [];
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        "vElementJson": {
                            ...objContext.state.ElementJson["vElementJson"],
                            "Coordinates": [
                                ...objContext.state.ElementJson["vElementJson"]["Coordinates"],
                                arrCoordinates
                            ]
                        }
                    }
                }
            });
        }
    };


    // const OnMouseDown = (objDraggedElement, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
    //     objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    //     let ctx = objContext.Canvas_Ref.current.getContext("2d");
    //     let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
    //     let intX = initClientX - objBoundingClientRect.left;
    //     let intY = initClientY - objBoundingClientRect.top;
    //     let objBoundingClientRect_Marker = objContext.MarkerImage_Ref.current.getBoundingClientRect();
    //     ctx.beginPath();
    //     ctx.moveTo(intX, intY);
    //     Draw(ctx, intX, intY);
    //     objContext.MarkerImage_Ref.current.style.left = intX + "px";
    //     objContext.MarkerImage_Ref.current.style.top = intY + "px";
    //     objContext.DrawStarted_Ref.current = true;
    // };

    // const OnMouseMove = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
    //     if (objContext.DrawStarted_Ref.current) {
    //         objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    //         let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
    //         let ctx = objContext.Canvas_Ref.current.getContext("2d");
    //         let objBoundingClientRect_Marker = objContext.MarkerImage_Ref.current.getBoundingClientRect();
    //         let intX = intClientX - objBoundingClientRect.left;
    //         let intY = intClientY - objBoundingClientRect.top;
    //         objContext.Coordinates_Ref.current = [
    //             ...objContext.Coordinates_Ref.current,
    //             {
    //                 "X": intX,
    //                 "Y": intY
    //             }
    //         ];
    //         objContext.MarkerImage_Ref.current.style.left = intX + "px";
    //         objContext.MarkerImage_Ref.current.style.top = intY + "px";
    //         Draw(ctx, intX, intY);
    //     }
    // };

    // const OnMouseUp = (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
    //     OnMouseMove(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
    //     objContext.DrawStarted_Ref.current = false;
    //     let arrCoordinates = [...objContext.Coordinates_Ref.current];
    //     objContext.Coordinates_Ref.current = [];
    //     objContext.dispatch({
    //         type: "SET_STATE",
    //         payload: {
    //             "ElementJson": {
    //                 ...objContext.state.ElementJson,
    //                 "vElementJson": {
    //                     ...objContext.state.ElementJson["vElementJson"],
    //                     "Coordinates": [
    //                         ...objContext.state.ElementJson["vElementJson"]["Coordinates"],
    //                         arrCoordinates
    //                     ]
    //                 }
    //             }
    //         }
    //     });
    // };

    const OnReset = () => {
        objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let ctx = objContext.Canvas_Ref.current.getContext("2d");
        let objMapImage = { ...objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objContext.state.ElementJson["vElementJson"]["Values"].find(y => y["UseAs"].toLowerCase() === "map")["iElementImageId"]) };
        objContext.Coordinates_Ref.current = [];
        ctx.clearRect(0, 0, objMapImage["vElementJson"]["iElementImageWidth"], objMapImage["vElementJson"]["iElementImageHeight"]);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson["vElementJson"],
                        "Coordinates": []
                    }
                }
            }
        });
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        if (objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.CMSMapElement_Editor_ModuleProcessor.ShowPropertiesSidebar({ objContext });
            return "";
        }
        else {
            let objCommonProps = {
                "Context": objContext,
                "Events": {
                    "OpenContextMenu": (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
                        let intX = event.clientX - objBoundingClientRect.left;
                        let intY = event.clientY - objBoundingClientRect.top;
                        let objBoundingClientRect_Marker = objContext.MarkerImage_Ref.current.getBoundingClientRect();
                        objContext.CMSMapElement_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, { "Value": { "MousePosition": { "X": intX, "Y": intY }, "MarkerPosition": { "X": intX, "Y": intY } }, "Type": null });
                    },
                    "OnMouseDown": (event) => {
                        event.target.addEventListener("mousemove", OnMouseMove);
                        event.target.addEventListener("mouseup", OnMouseUp);
                        OnMouseDown(event);
                    },
                    "OnMouseUp": (event) => {
                        OnMouseUp(event);
                    },
                    // "OnDragStart": (objDraggedElement, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
                    //     OnMouseDown(objDraggedElement, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                    // },
                    // "OnDrag": (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
                    //     OnMouseMove(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                    // },
                    // "OnDrop": (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
                    //     OnMouseUp(objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement);
                    // },
                    "OnReset": () => {
                        OnReset();
                    }
                },
                "Callbacks": {
                    "GetTextElementProps": (intElementTextId) => {
                        return {
                            ...objContext.CMSMapElement_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                        };
                    }
                },
                "TextElement": CMSText_Editor,
                "AppType": "Editor"
            };
            return <MapElement_Common {...objCommonProps} />;
        }
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSMapElement_Editor;
