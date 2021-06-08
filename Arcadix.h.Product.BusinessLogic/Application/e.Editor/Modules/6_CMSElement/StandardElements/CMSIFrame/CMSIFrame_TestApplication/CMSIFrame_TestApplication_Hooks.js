// React related impoprts.
import React, { useEffect, useImperativeHandle } from 'react';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSIFrame_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSIFrame_TestApplication_ModuleProcessor}
 * @summary Custom hook for data loaded.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.props.ElementJson
                }
            }
        });
    }, [objContext.props.ElementJson]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSIFrame_TestApplication_ModuleProcessor}
 * @summary Contain imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            let strIsAnswered = "N";
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
                    ["Answers"]: [],
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: strIsAnswered
                }
            ];
            return [];
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSIFrame_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
        },
        "ResetAnswer": () => {
            objContext.CMSIFrame_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}
