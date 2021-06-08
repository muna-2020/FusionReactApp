// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';

/**
  * @name GetInitialState
  * @param {object} props props from parent
  * @summary Initialize the component's local state.
  * @returns {object} Returns the local state of the component.
  */
export const GetInitialState = (props) => {
    return {
        "ElementJson": {},
        "ElementJsonWithAnswer": props.ElementJsonWithAnswer ? props.ElementJsonWithAnswer : null,
        "UserAnswerJson": props.UserAnswerJson ? props.UserAnswerJson : null,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "arrTrueFalseAnswered": [],
        "ViewSolution": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false
    };
}

/**
  * @name Initialize
  * @param {object} objContext {state, props, dispatch, CMSTrueFalse_TestApplication_ModuleProcessor}
  * @summary Initialize the custom hooks
  */
export const Initialize = (objContext) => {
    useDataLoader(objContext);
    useImperativeMethods(objContext);
}

/**
  * @name useDataLoader
  * @param {object} objContext {state, props, dispatch, CMSTrueFalse_TestApplication_ModuleProcessor}
  * @summary Data loader hook
  */
function useDataLoader(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSTrueFalse_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            let objElementJson = objContext.CMSTrueFalse_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, objContext.state.ElementJsonWithAnswer, objContext.state.UserAnswerJson);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "isLoadComplete": true,
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "arrTrueFalseAnswered": []
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
  * @name useImperativeMethods
  * @param {object} objContext {state, props, dispatch, CMSTrueFalse_TestApplication_ModuleProcessor}
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
                    ["Answers"]: objContext.state.ElementJson["vElementJson"]["Values"],
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempData => objTempData["cIsCorrectValue"] === "Y").length > 0 ? "Y" : "N"
                }
            ];
            return arrResponse;
        }
    }), [objContext.state, objContext.props]);
}
