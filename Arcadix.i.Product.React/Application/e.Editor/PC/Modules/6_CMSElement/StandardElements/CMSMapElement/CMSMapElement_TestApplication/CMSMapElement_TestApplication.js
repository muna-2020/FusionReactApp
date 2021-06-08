// React related imports.
import React, { useReducer, useRef, useEffect, useImperativeHandle } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Common/CMSMapElement_Common';
import * as CMSMapElement_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_TestApplication/CMSMapElement_TestApplication_Hooks';
import CMSMapElement_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_TestApplication/CMSMapElement_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSMapElement_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary CMSMapElement's test application version.
 * @returns {component} CMSMapElement_TestApplication
 */
const CMSMapElement_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSMapElement_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSMapElement_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "CanvasSolution_Ref": useRef(null),
        "ImageSolution_Ref": useRef(null),
        "Canvas_Ref": useRef(null),
        "MarkerImage_Ref": useRef(null),
        "MapImage_Ref": useRef(null),
        "DrawStarted_Ref": useRef(false),
        "Coordinates_Ref": useRef([]),
        "ModuleName": "CMSMapElement_TestApplication_" + props.ElementJson.iElementId,
        "CMSMapElement_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMapElement_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSMapElement_TestApplication_ModuleProcessor);

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

    useEffect(() => {
        if (objContext.state.ViewSolution || (objContext.state.ViewComparison && objContext.state.ElementStatus !== null && (objContext.state.ElementStatus === 2 || objContext.state.ElementStatus === 3))) {
            if (objContext.state.ElementJsonWithAnswer["vElementJson"]["Coordinates"].length > 0) {
                let ctx = objContext.CanvasSolution_Ref.current.getContext("2d");
                for (let intCount = 0; intCount < objContext.state.ElementJsonWithAnswer["vElementJson"]["Coordinates"].length; intCount++) {
                    let arrCoordinates = objContext.state.ElementJsonWithAnswer["vElementJson"]["Coordinates"][intCount];
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
        }
    }, [objContext.state.ViewComparison, objContext.state.ViewSolution, objContext.state.LoadUserResponse]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            if (objContext.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y") {
                let arrResponse = [];
                objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
                    if (objTempElement.Ref.current !== null && objTempElement.Ref.current.GetUserResponse) {
                        arrResponse = [
                            ...arrResponse,
                            ...objTempElement.Ref.current.GetUserResponse()
                        ];
                    }
                });
                arrResponse = [
                    {
                        ["iElementId"]: objContext.state.ElementJson["iElementId"],
                        ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                        ["Answers"]: objContext.state.ElementJson["vElementJson"]["Coordinates"],
                        ["TextElements"]: arrResponse,
                        ["cIsAnswered"]: objContext.state.ElementJson["vElementJson"]["Coordinates"].length > 0 ? "Y" : "N"
                    }
                ];
                return arrResponse;
            }
            else {
                return [];
            }
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSMapElement_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSMapElement_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSMapElement_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "arrMapElementAnswered": [...objElementJson["vElementJson"]["Coordinates"]],
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult["iElementStatus"]
                }
            });
        },
        "ResetAnswer": () => {
            let objPenImage = objContext.state.ElementJson["vElementJson"]["Values"].find(y => y["UseAs"].toLowerCase() === "pen");
            objContext.MarkerImage_Ref.current.style.left = objPenImage["X"] + "px";
            objContext.MarkerImage_Ref.current.style.top = objPenImage["Y"] + "px";
            OnReset();
            objContext.CMSMapElement_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);

    const Draw = (ctx, intXCoordinate, intYCoordinate) => {
        ctx.strokeStyle = "#000000";
        ctx.lineTo(intXCoordinate, intYCoordinate);
        ctx.lineWidth = 3;
        ctx.stroke();
    };

    const OnMouseDown = (event) => {
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
    //     let ctx = objContext.Canvas_Ref.current.getContext("2d");
    //     let objBoundingClientRect = objContext.Canvas_Ref.current.getBoundingClientRect();
    //     let intX = initClientX - objBoundingClientRect.left;
    //     let intY = initClientY - objBoundingClientRect.top;
    //     let objBoundingClientRect_Marker = objContext.MarkerImage_Ref.current.getBoundingClientRect();
    //     ctx.beginPath();
    //     ctx.moveTo(intX, intY);
    //     objContext.MarkerImage_Ref.current.style.left = intX + "px";
    //     objContext.MarkerImage_Ref.current.style.top = intY + "px";
    //     objContext.DrawStarted_Ref.current = true;
    // };

    // const OnMouseMove = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
    //     if (objContext.DrawStarted_Ref.current) {
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
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnMouseDown": (event) => {
                    if (objContext.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y") {
                        event.target.addEventListener("mousemove", OnMouseMove);
                        event.target.addEventListener("mouseup", OnMouseUp);
                        OnMouseDown(event);
                    }
                },
                "OnMouseUp": (event) => {
                    if (objContext.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y") {
                        OnMouseUp(event);
                    }
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
                    if (objContext.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y") {
                        OnReset();
                    }
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSMapElement_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return GetContent();
};

export default CMSMapElement_TestApplication;
