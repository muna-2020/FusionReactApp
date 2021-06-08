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
        "Image_Ref": useRef(null),
        "DrawStarted_Ref": useRef(false),
        "Coordinates_Ref": useRef([]),
        "ModuleName": "CMSMapElement_Editor_" + props.ElementJson.iElementId,
        "CMSMapElement_Editor_ModuleProcessor": new CMSMapElement_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
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
        setTimeout(() => {
            let objBoundingClientRect = objContext.Image_Ref.current.getBoundingClientRect();
            let intHeight = objBoundingClientRect["height"];
            let intWidth = objBoundingClientRect["width"];
            objContext.Canvas_Ref.current.style.height = intHeight + "px";
            objContext.Canvas_Ref.current.style.width = intWidth + "px";
            // objContext.Image_Ref.current.style.display = "none";
            if (objContext.state.ElementJson["vElementJson"]["Coordinates"].length > 0) {
                for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Coordinates"].length; intCount++) {
                    let ctx = objContext.Canvas_Ref.current.getContext("2d");
                    let intX = objContext.state.ElementJson["vElementJson"]["Coordinates"][intCount]["X"];
                    let intY = objContext.state.ElementJson["vElementJson"]["Coordinates"][intCount]["Y"];
                    if (intCount === 0) {
                        ctx.beginPath();
                        ctx.moveTo(intX, intY);
                    }
                    else {
                        Draw(ctx, intX, intY);
                    }
                }
            }
        }, 100);
    }, []);

    const Draw = (ctx, intXCoordinate, intYCoordinate) => {
        ctx.strokeStyle = "#000000";
        ctx.lineTo(intXCoordinate, intYCoordinate);
        ctx.lineWidth = 3;
        ctx.stroke();
    };

    const OnMouseDown = (event) => {
        objContext.Canvas_Ref.current.style.cursor = "pointer !important";
        let ctx = objContext.Canvas_Ref.current.getContext("2d");
        let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(event.clientX - objBoundingClientRect.left, event.clientY - objBoundingClientRect.top);
        objContext.DrawStarted_Ref.current = true;
    };

    const OnMouseMove = (event) => {
        if (objContext.DrawStarted_Ref.current) {
            objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
            let ctx = objContext.Canvas_Ref.current.getContext("2d");
            objContext.Coordinates_Ref.current = [
                ...objContext.Coordinates_Ref.current,
                {
                    "X": event.clientX - objBoundingClientRect.left,
                    "Y": event.clientY - objBoundingClientRect.top
                }
            ];
            Draw(ctx, event.clientX - objBoundingClientRect.left, event.clientY - objBoundingClientRect.top);
        }
    };

    const OnMouseUp = (event) => {
        objContext.Canvas_Ref.current.style.cursor = "default !important";
        objContext.DrawStarted_Ref.current = false;
        event.target.removeEventListener("mousemove", OnMouseMove);
        event.target.removeEventListener("mouseup", OnMouseUp);
        let arrCoordinates = [...objContext.Coordinates_Ref.current];
        objContext.Coordinates_Ref.current = [];
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson["vElementJson"],
                        "Coordinates": arrCoordinates
                    }
                }
            }
        });
    };

    const OnReset = () => {
        objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let ctx = objContext.Canvas_Ref.current.getContext("2d");
        let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
        objContext.Coordinates_Ref.current = [];
        ctx.clearRect(0, 0, objBoundingClientRect.width, objBoundingClientRect.height);
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
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSMapElement_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "OnMouseDown": (event) => {
                    event.target.addEventListener("mousemove", OnMouseMove);
                    event.target.addEventListener("mouseup", OnMouseUp);
                    OnMouseDown(event)
                },
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
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSMapElement_Editor;
