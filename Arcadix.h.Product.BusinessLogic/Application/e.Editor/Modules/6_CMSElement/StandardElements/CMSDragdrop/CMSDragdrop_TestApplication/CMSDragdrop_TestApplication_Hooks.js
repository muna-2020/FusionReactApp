// React related impoprts.
import { func } from 'prop-types';
import { useEffect, useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props, objModuleProcessor) => {
    let objLoadSolutionType = objModuleProcessor.GetLoadSolutionType(null, null, null, props);
    let objElementJsonWithAnswer = props.ElementJsonWithAnswer ? props.ElementJsonWithAnswer : null;
    let objUserAnswerJson = props.UserAnswerJson ? props.UserAnswerJson : null;
    let objElementJson = objModuleProcessor.GetElementJsonForComponent(null, objLoadSolutionType, objElementJsonWithAnswer, objUserAnswerJson, props);
    return {
        "ElementJson": { ...objElementJson },
        "ElementJsonWithAnswer": objElementJsonWithAnswer,
        "UserAnswerJson": objUserAnswerJson,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "arrDragdropAnswered": [],
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSDragdrop_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useImperativeMethods(objContext);
};

/**
 * @name useImperativeHandle
 * @param {object} objContext {state, props, dispatch, CMSDragdrop_TestApplication_ModuleProcessor}
 * @summary Imperative methods.
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
                    ["iElementId"]: objContext.state.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                    ["Answers"]: [
                        {
                            "Answers": objContext.state.ElementJson["vElementJson"]["Answers"],
                            "Values": objContext.state.ElementJson["vElementJson"]["Values"]
                        }
                    ],
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: objContext.state.ElementJson["vElementJson"]["Values"].length > 0 ? "Y" : "N"
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSDragdrop_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSDragdrop_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSDragdrop_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "arrDragdropAnswered": objElementJson["vElementJson"]["Values"].map(objTempData => {
                        return {
                            "iElementDragDropQuestionId": objTempData["iElementDragDropQuestionId"],
                            "iElementDragDropAnswerId": objTempData["iElementDragDropAnswerId"]
                        };
                    }),
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult["iElementStatus"]
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSDragdrop_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}
