//React Imports
import { useEffect, useImperativeHandle } from 'react';

import * as CMSHotspot_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_Editor/CMSHotspot_Editor_MetaData";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export function GetInitialState(props) {
    return {
        "ElementJson": { ...props.ElementJson },
        "imageOffset": {},
        "selectedMarkerId": null,
        "iMarkerCount": props.ElementJson.vElementJson.iMarkerCount,
        "arrMarkers": [],
        "arrMarkerPositions": [],
        "clickCount": 0,
        "showMarker": false,
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "arrBoundingBoxes": [],
        "blnRedraw": false,
        "ElementJsonWithAnswer": props.ElementJsonWithAnswer ? props.ElementJsonWithAnswer : null,
        "UserAnswerJson": props.UserAnswerJson ? props.UserAnswerJson : null,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false,
        "blnRedrawCanvas": true,
        "arrMarkervalues":[],
        "objMarkerProperties": { "width": "30", "height": "30" }
    };
};


/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSHotspot_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useDataLoader(objContext);
    useImperativeMethods(objContext);
};

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, CMSHotspot_TestApplication_ModuleProcessor}
 * @summary Data loader hook
 */
function useDataLoader(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSHotspot_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ...objLoadSolutionType,
                    "isLoadComplete": true,
                    "ElementJson": objContext.props.ElementJson,
                    "strHotspotMarkerName": CMSHotspot_Editor_MetaData.GetHotspotMarkerName(objContext.props.ElementJson.vElementJson.iHotspotMarkerId),
                    "arrBoundingBoxes": objLoadSolutionType["ViewComparison"] || objLoadSolutionType["ViewSolution"] ? objContext.props.ElementJson.vElementJson.Values : []
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSHotspot_TestApplication_ModuleProcessor}
 * @summary Contain imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
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
                    ["iElementId"]: objContext.props.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.props.ElementJson["vElementTypeName"],
                    ["Answers"]: objContext.arrMarkerPositions.current.map(e => { return { ...e, ["cIsCorrectValue"]: "N" } }),
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: objContext.arrMarkerPositions.current.length > 0 ? "Y" : "N"
                }

            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSHotspot_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSHotspot_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);

            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementEvaluationResult": ElementEvaluationResult,
                    "blnRedrawCanvas": !objContext.state.blnRedrawCanvas,
                    "ElementStatus": ElementEvaluationResult ? ElementEvaluationResult["iElementStatus"] : null,
                    "arrBoundingBoxes": objLoadSolutionType["ViewComparison"] || objLoadSolutionType["ViewSolution"] ? ElementJsonWithAnswer.vElementJson.Values : []
                }
            });
        },
        "ResetAnswer": () => {
            objContext.ResetAnswer();
        }
    }), [objContext.state, objContext.props]);
}

