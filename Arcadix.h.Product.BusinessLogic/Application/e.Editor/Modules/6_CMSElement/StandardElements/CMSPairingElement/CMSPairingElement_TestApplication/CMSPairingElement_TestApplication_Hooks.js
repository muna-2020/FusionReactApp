// React related impoprts.
import React, { useImperativeHandle } from 'react';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    let objElementJson = { ...BaseCMSElement.AttachRef(props.ElementJson) };
    return {
        "ElementJson": {
            ...objElementJson,
            ["vElementJson"]: {
                ...objElementJson.vElementJson,
                ["PairingElements"]: [...objElementJson["vElementJson"]["PairingElements"].map((objPairingElementValue) => {
                    return { ...objPairingElementValue, ["PairingElementRef"]: React.createRef() };
                })],
                ["Values"]: []
            },
            ["MappedElements"]: [...props.ElementJson["MappedElements"].map(x => {
                return BaseCMSElement.AttachRef(x);
            })]
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_TestApplication_ModuleProcessor}
 * @summary Contain imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            let arrValues = [...objContext.state.ElementJson.vElementJson.Values];
            let arrAnswers = [];
            for (var i = 0; i < arrValues.length; i++) {
                if (arrValues[i]["cIsUserAnswered"] && arrValues[i]["cIsUserAnswered"] == "Y") {
                    arrAnswers = [...arrAnswers, { ...arrValues[i], ["cIsCorrectValue"]: "N" }];
                }
            }
            if (arrAnswers.length > 0) {
                arrResponse = [
                    {
                        ["iElementId"]: objContext.state.ElementJson["iElementId"],
                        ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                        ["Answers"]: arrAnswers,
                        ["TextElements"]: [],
                        ["cIsAnswered"]: arrAnswers.length > 0 ? "Y" : "N"
                    }
                ];
            }
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSPairingElement_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSPairingElement_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSPairingElement_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult ? ElementEvaluationResult["iElementStatus"] : null
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSPairingElement_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}
