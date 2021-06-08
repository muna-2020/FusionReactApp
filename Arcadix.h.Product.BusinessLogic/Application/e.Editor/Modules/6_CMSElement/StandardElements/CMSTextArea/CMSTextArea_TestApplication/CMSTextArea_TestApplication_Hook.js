// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
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
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": true
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSTextArea_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useImperativeMethods(objContext);
};

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSTextArea_TestApplication_ModuleProcessor}
 * @summary Contain imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            if (objContext.state.ElementJson["vElementJson"]["cIsDictation"] === "Y") {
                return [
                    {
                        ["iElementId"]: objContext.state.ElementJson["iElementId"],
                        ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                        ["Answers"]: [
                            {
                                "tDictationValue": objContext.state.ElementJson["vElementJson"]["tDictationValue"]
                            }
                        ],
                        ["cIsAnswered"]: objContext.state.ElementJson["vElementJson"]["tDictationValue"] ? "Y" : "N"
                    }
                ];
            }
            else {
                return [];
            }
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            if (objContext.state.ElementJson["vElementJson"]["cIsDictation"] === "Y") {
                objContext.CMSTextArea_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
                let objLoadSolutionType = objContext.CMSTextArea_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
                let objElementJson = objContext.CMSTextArea_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
                objContext.dispatch({
                    "type": "SET_STATE",
                    "payload": {
                        ...objLoadSolutionType,
                        "ElementJson": objElementJson,
                        "ElementJsonWithAnswer": ElementJsonWithAnswer,
                        "UserAnswerJson": UserAnswerJson,
                        "ElementStatus": ElementEvaluationResult["iElementStatus"]
                    }
                });
            }
        },
        "ResetAnswer": () => {
            //if (objContext.state.ElementJson["vElementJson"]["cIsDictation"] === "Y") {
            objContext.CMSTextArea_TestApplication_ModuleProcessor.ResetAnswer(objContext);
            //}
        }
    }), [objContext.state, objContext.props]);
}
