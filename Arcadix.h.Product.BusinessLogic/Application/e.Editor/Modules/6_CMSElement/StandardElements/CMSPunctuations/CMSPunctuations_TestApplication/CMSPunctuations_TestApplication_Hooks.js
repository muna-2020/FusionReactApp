import React, { useEffect, useImperativeHandle } from 'react';
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
        "arrLastSentences": [],
        "arrPunctuationTextNodes": [],
        "blnInitialRender": true
    };
};
