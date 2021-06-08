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
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_TestApplication_ModuleProcessor}
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
            let arrDropObejcts = objContext.state.ElementJson["vElementJson"]["DropObjects"].map(x => {
                let { DivRef, ...objDropObject } = x;
                if (objDropObject["DraggedObjects"].length > 0) {
                    strIsAnswered = "Y";
                }
                return {
                    ...objDropObject
                };
            });
            arrResponse = [
                {
                    ["iElementId"]: objContext.state.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                    ["Answers"]: arrDropObejcts,
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: strIsAnswered
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
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
        },
        "ResetAnswer": () => {
            objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}
