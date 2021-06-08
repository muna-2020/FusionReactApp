//React Imports
import { useEffect, useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export function GetInitialState(props) {
    return {
        "ElementJson": { ...props.ElementJson },
        "ElementJsonWithAnswer": props.ElementJsonWithAnswer ? props.ElementJsonWithAnswer : null,
        "UserAnswerJson": props.UserAnswerJson ? props.UserAnswerJson : null,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false,
        "intSelectedQuestionNumber": -1,
        //"blnInitialLoad": true,
        "arrBlnShowQuestionBorder": props.ElementJson.vElementJson.Questions.map((q) => { return false }),
        "blnShowCorrect": props.ElementJson.vElementJson.Questions.map((q) => { return null }),
        "arrSolutionValues": [],
        //"blnDisableLineHighlight": false,
        "blnRerender": false
    };
};


/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSLineAssign_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useDataLoader(objContext);
    useImperativeMethods(objContext);
};

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, CMSLineAssign_TestApplication_ModuleProcessor}
 * @summary Data loader hook
 */
function useDataLoader(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSLineAssign_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ...objLoadSolutionType,
                    "isLoadComplete": true,
                    "ElementJson": objContext.CMSLineAssign_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, objContext.state.ElementJsonWithAnswer, objContext.state.UserAnswerJson)
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSLineAssign_TestApplication_ModuleProcessor}
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
                        ["iElementId"]: objContext.props.ElementJson["iElementId"],
                        ["vElementTypeName"]: objContext.props.ElementJson["vElementTypeName"],
                        ["Answers"]: arrAnswers,
                        ["TextElements"]: [],
                        ["cIsAnswered"]: arrAnswers.length > 0 ? "Y" : "N"
                    }
                ];
            }
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSLineAssign_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSLineAssign_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSLineAssign_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            var blnShowCorrect = [...objContext.state.blnShowCorrect];
            if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"]) {
                var arrUserValue = [...ElementEvaluationResult["UserAnswerJson"]];
                arrUserValue.forEach((objValue, i) => {
                    if (objValue["cIsCorrectValue"] === "Y") {
                        blnShowCorrect[objValue["iElementQuestionNumber"]] = true;
                    }
                    else {
                        blnShowCorrect[objValue["iElementQuestionNumber"]] = false;
                    }
                });
            }
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "blnShowCorrect": blnShowCorrect,
                    "ElementJson": objElementJson,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult ? ElementEvaluationResult["iElementStatus"] : null
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSLineAssign_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}

