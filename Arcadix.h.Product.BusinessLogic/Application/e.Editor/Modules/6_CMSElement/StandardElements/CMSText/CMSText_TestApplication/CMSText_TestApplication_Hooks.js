// React related impoprts.
import React, { useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": {
            ...props.ElementJson,
            "TextRef": React.createRef()
        },
        "HideText": props.ElementJson.vElementJson.cIsToggleText && props.ElementJson.vElementJson.cIsToggleText === "Y",
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSText_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export const Initialize = (objContext) => {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let objSubElementResponse = objContext.state.ElementJson.TextRef.current.GetUserResponse();
            let arrResponses = [];
            if (objSubElementResponse["Response"].length > 0) {
                arrResponses = [
                    {
                        "iElementId": objContext.state.ElementJson["iElementId"],
                        "vElementTypeName": objContext.state.ElementJson["vElementTypeName"],
                        "SubElements": objSubElementResponse["Response"],
                        "cIsAnswered": objSubElementResponse["cIsAnswered"]
                    }
                ];
            }
            return arrResponses;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.state.ElementJson.TextRef.current.LoadSolution(ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
        },
        "ResetAnswer": () => {
            objContext.state.ElementJson.TextRef.current.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);
};
