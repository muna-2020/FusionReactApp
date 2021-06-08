// React related impoprts.
import React, { useEffect, useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": {...props.ElementJson},
        "ElementJsonWithAnswer": props.ElementJsonWithAnswer ? props.ElementJsonWithAnswer : null,
        "UserAnswerJson": props.UserAnswerJson ? props.UserAnswerJson : null,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false,
        'FormulaRef': React.createRef()
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSInputFormula_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useDataLaoder(objContext);
    useImperativeMethods(objContext);
};

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, CMSInputFormula_TestApplication_ModuleProcessor}
 * @summary Data loader hook
 */
function useDataLaoder(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSInputFormula_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "isLoadComplete": true,
                    "ElementJson": objContext.CMSInputFormula_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, objContext.state.ElementJsonWithAnswer, objContext.state.UserAnswerJson)
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSInputFormula_TestApplication_ModuleProcessor}
 * @summary Contain imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        // "GetUserResponse": () => {
        //     let arrResponse = [];
        //     objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
        //         if (objTempElement.Ref.current !== null && objTempElement.Ref.current.GetUserResponse) {
        //             arrResponse = [
        //                 ...arrResponse,
        //                 ...objTempElement.Ref.current.GetUserResponse()
        //             ];
        //         }
        //     });
        //     arrResponse = [
        //         {
        //             ["iElementId"]: objContext.state.ElementJson["iElementId"],
        //             ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
        //             ["Answers"]: [],
        //             ["TextElements"]: arrResponse,
        //             ["cIsAnswered"]: "N"
        //         }
        //     ];
        //     return arrResponse;
        // },
        // "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
        //     objContext.CMSInputFormula_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
        //     let objLoadSolutionType = objContext.CMSInputFormula_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
        //     let objElementJson = objContext.CMSInputFormula_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
        //     objContext.dispatch({
        //         "type": "SET_STATE",
        //         "payload": {
        //             ...objLoadSolutionType,
        //             "ElementJson": objElementJson,
        //             "ElementJsonWithAnswer": ElementJsonWithAnswer,
        //             "UserAnswerJson": UserAnswerJson,
        //             "ElementStatus": ElementEvaluationResult["iElementStatus"]
        //         }
        //     });
        // },
        // "ResetAnswer": () => {
        //     objContext.CMSInputFormula_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        // }
    }), [objContext.state, objContext.props]);
}
