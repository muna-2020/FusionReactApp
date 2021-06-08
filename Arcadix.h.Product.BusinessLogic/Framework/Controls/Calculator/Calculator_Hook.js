// React related imports.
import { useEffect, useImperativeHandle } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        strJcalculatorEquation: "",
        strJcalculatorResult: "",
        blnJcalculatorIsEvaluated: false,
        strJcalculatorIsLastAnswerValue: "0",
        blnJcalculatorSecond: false,
        strJcalculatorMemoryValue: "", // "0"
        blnJcalculatorModeDegree: true,
        intJcalculatorFixStatus: 0,
        JcalculatorAccumulate: "0",
        JcalculatorPendingOp: "",
        JcalculatorblnFlagNewNum: false,
        JcalculatorplaceHolder: null,
        JcalculatorResultScreenvalue: "0",
        blnIsPowerNegative: false,
        JEqualClicked: false,
        JSquareRootClicked: false,
        JSquareRootStack: [],
        JcalculatorMemoryDisplay: true,
        JcalculatorFunction: ""
    };
};


/**
 * @name Reducer
 * @param {object} objState  takes state
 * @param {object} objAction  takes action
 * @summary Reducer
 * @returns {object} actions to perform
 */
export const Reducer = (objState, objAction) => {
    switch (objAction.type.toUpperCase()) {
        case "SET_STATE":
            return {
                ...objState,
                ...objAction.payload
            };
        default:
            break;
    }
};