// React related impoprts.
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
    return {
        "ElementJson": objElementJson,
        "ElementJsonWithAnswer": objElementJsonWithAnswer,
        "UserAnswerJson": objUserAnswerJson,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "arrCheckboxMatrixAnswered": [],
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "isLoadComplete": props.IsForServerRenderHtml ? true : false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
};

function useDataLoaded(objContext) {
    useEffect(() => {
        let objElementJsonWithAnswer = objContext.props.ElementJsonWithAnswer ? objContext.props.ElementJsonWithAnswer : null;
        let objUserAnswerJson = objContext.props.UserAnswerJson ? objContext.props.UserAnswerJson : null;
        let objLoadSolutionType = objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, objElementJsonWithAnswer, objUserAnswerJson);
        let objElementJson = objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, objElementJsonWithAnswer, objUserAnswerJson);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objElementJson
                },
                "isLoadComplete": true
            }
        });
    }, [objContext.props]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_TestApplication_ModuleProcessor}
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
                    ["Answers"]: [
                        {
                            ["MatrixRow"]: objContext.state.ElementJson["vElementJson"]["MatrixRow"],
                            ["MatrixColumn"]: objContext.state.ElementJson["vElementJson"]["MatrixColumn"],
                            ["Values"]: objContext.state.ElementJson["vElementJson"]["Values"],
                        }
                    ],
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempData => objTempData["cIsCorrectValue"] === "Y").length > 0 ? "Y" : "N"
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "arrCheckboxMatrixAnswered": objElementJson["vElementJson"]["Values"].map(objTempData => {
                        return {
                            "iElementCheckBoxMatrixRowId": objTempData["iElementCheckBoxMatrixRowId"],
                            "iElementCheckBoxMatrixColumnId": objTempData["iElementCheckBoxMatrixColumnId"],
                            "isChecked": objTempData["cIsCorrectValue"] === "Y"
                        };
                    }),
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult["iElementStatus"]
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}

