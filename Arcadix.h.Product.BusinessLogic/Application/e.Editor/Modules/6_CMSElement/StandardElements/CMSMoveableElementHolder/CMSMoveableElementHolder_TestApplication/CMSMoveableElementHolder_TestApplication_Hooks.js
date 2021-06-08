// React related impoprts.
import React, { useImperativeHandle } from 'react';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    let arrMappedElements = props.ElementJson["MappedElements"].map(x => {
        x = BaseCMSElement.AttachRef(x);
        return {
            ...x,
            ["DivRef"]: React.createRef()
        };
    });
    return {
        "ElementJson": {
            ...props.ElementJson,
            ["MappedElements"]: arrMappedElements
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_TestApplication_ModuleProcessor}
 * @summary Contain imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            let arrElementResponses = []
            let strIsAnswered = "N";
            objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
                if (objTempElement.Ref.current !== null && objTempElement.Ref.current.GetUserResponse) {
                    arrResponse = [
                        ...arrResponse,
                        ...objTempElement.Ref.current.GetUserResponse()
                    ];
                }
            });
            objContext.state.ElementJson["MappedElements"].map(objTempElement => {
                if (objTempElement.Ref.current !== null && objTempElement.Ref.current.GetUserResponse) {
                    let arrUserResponse = objTempElement.Ref.current.GetUserResponse();
                    let objUserResponse = arrUserResponse[0];
                    if (objUserResponse["cIsAnswered"] === "Y") {
                        strIsAnswered = "Y";
                    }
                    arrElementResponses = [
                        ...arrElementResponses,
                        {
                            ...objUserResponse
                        }
                    ];
                }
            });
            arrResponse = [
                {
                    ["iElementId"]: objContext.state.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                    ["Answers"]: arrElementResponses,
                    ["TextElements"]: arrResponse,
                    ["cIsAnswered"]: strIsAnswered
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSMoveableElementHolder_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            objContext.state.ElementJson["MappedElements"].map(objTempElement => {
                if (objTempElement.Ref.current !== null && objTempElement.Ref.current.LoadSolution) {
                    let objElementJsonWithAnswer, objUserAnswerJson, objMappedElementEvaluationResult;
                    if (ElementJsonWithAnswer !== null) {
                        objElementJsonWithAnswer = ElementJsonWithAnswer["MappedElements"].find(objTempData => objTempData["iElementId"] === objTempElement["iElementId"]);
                    }
                    if (objUserAnswerJson !== null) {
                        objUserAnswerJson = UserAnswerJson["Answers"].find(objTempData => objTempData["iElementId"] === objTempElement["iElementId"]);
                    }
                    if (objMappedElementEvaluationResult !== null) {
                        objMappedElementEvaluationResult = ElementEvaluationResult["MappedElements"].find(objTempData => objTempData["iElementId"] === objTempElement["iElementId"]);
                    }
                    objTempElement.Ref.current.LoadSolution(objElementJsonWithAnswer, objUserAnswerJson, objMappedElementEvaluationResult);
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSMoveableElementHolder_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
}
