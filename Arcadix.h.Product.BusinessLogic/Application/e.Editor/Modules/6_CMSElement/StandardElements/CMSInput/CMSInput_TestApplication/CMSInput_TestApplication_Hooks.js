// React related impoprts.
import { useImperativeHandle } from 'react';

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
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "blnIsCorrectResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "blnIsTextOnlyBox": parseInt(props.ElementJson["vElementJson"]["iTextFieldType"]) === 1 ? true : false,
        "blnIsWordOnlyBox": parseInt(props.ElementJson["vElementJson"]["iTextFieldType"]) === 3 ? true : false,
        "blnIsNumberOnlyBox": parseInt(props.ElementJson["vElementJson"]["iTextFieldType"]) === 4 ? true : false,
        "blnIsLetterOnlyBox": parseInt(props.ElementJson["vElementJson"]["iTextFieldType"]) === 2 ? true : false,
        "InputValue": props.UserAnswerJson ? props.UserAnswerJson["Answers"][0]["vText"] : ""
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSInput_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSInput_TestApplication_ModuleProcessor}
 * @summary Contain imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [
                {
                    ["iElementId"]: objContext.state.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                    ["Answers"]: [
                        {
                            "vText": objContext.state.InputValue
                        }
                    ],
                    ["cIsAnswered"]: objContext.state.InputValue ? "Y" : "N"
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            let objLoadSolutionType = objContext.CMSInput_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSInput_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult["iElementStatus"],
                    "InputValue": UserAnswerJson ? UserAnswerJson["Answers"][0]["vText"] : ""
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSInput_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}
