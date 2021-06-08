// react imports
import { useEffect, useImperativeHandle } from "react";

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": { ...props.ElementJson },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": true
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useDataLoader(objContext);
    useImperativeMethods(objContext);
};

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_TestApplication_ModuleProcessor}
 * @summary Data loader hook
 */
function useDataLoader(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSColorFillWrapper_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ...objLoadSolutionType,
                    "isLoadComplete": true
                }
            });
        }
    }, [objContext.props.ElementJson]);

}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_TestApplication_ModuleProcessor}
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
                    ["iElementId"]: objContext.state.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                    ["Answers"]: objContext.arrUserAnswers.current,
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: objContext.arrUserAnswers.current.length > 0 ? "Y" : "N"
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSColorFillWrapper_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSColorFillWrapper_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSColorFillWrapper_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult && ElementEvaluationResult["iElementStatus"] ? ElementEvaluationResult["iElementStatus"] : null
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSColorFillWrapper_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}