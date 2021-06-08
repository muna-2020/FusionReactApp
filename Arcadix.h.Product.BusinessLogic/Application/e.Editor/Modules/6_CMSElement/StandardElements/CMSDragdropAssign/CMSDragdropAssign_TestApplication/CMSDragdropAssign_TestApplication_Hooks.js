// React related imports.
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
    let objElementJson = props.IsForServerRenderHtml ? objModuleProcessor.GetElementJsonForComponent(null, objLoadSolutionType, objElementJsonWithAnswer, objUserAnswerJson, props) : null;
    objElementJson = objModuleProcessor.GetElementJsonForComponent(null, objLoadSolutionType, objElementJsonWithAnswer, objUserAnswerJson, props);
    return {
        "ElementJson": objElementJson,
        "ElementJsonWithAnswer": objElementJsonWithAnswer,
        "UserAnswerJson": objUserAnswerJson,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "arrDragdropAssignAnswered": [],
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "isLoadComplete": props.IsForServerRenderHtml ? true : false,
        "ComponentKey": props.ComponentKey
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
};

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_TestApplication_ModuleProcessor}
 * @summary Data loaded hook
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        let objElementJsonWithAnswer = objContext.props.ElementJsonWithAnswer ? objContext.props.ElementJsonWithAnswer : null;
        let objUserAnswerJson = objContext.props.UserAnswerJson ? objContext.props.UserAnswerJson : null;
        let objLoadSolutionType = objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, objElementJsonWithAnswer, objUserAnswerJson);
        let objElementJson = objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, objElementJsonWithAnswer, objUserAnswerJson);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objElementJson
                },
                "isLoadComplete": true
            }
        });
    }, [objContext.props.ElementJson]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_TestApplication_ModuleProcessor}
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
                    "iElementId": objContext.state.ElementJson["iElementId"],
                    "vElementTypeName": objContext.state.ElementJson["vElementTypeName"],
                    "Answers": objContext.state.ElementJson["vElementJson"]["Values"],
                    "TextElements": arrResponse,
                    "cIsAnswered": objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempData => objTempData["iBlockId"] !== 2).length > 0 ? "Y" : "N"
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "arrDragdropAssignAnswered": [...objElementJson["vElementJson"]["Values"]],
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult["iElementStatus"]
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}
