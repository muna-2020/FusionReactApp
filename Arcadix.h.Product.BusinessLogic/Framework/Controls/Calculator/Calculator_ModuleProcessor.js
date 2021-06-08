//React imports
import React from 'react';
//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

import * as Calculator_EquationProcessor from "@shared/Framework/Controls/Calculator/Calculator_EquationProcessor";

/**
 * @name Calculator_ModuleProcessor
 * @summary Contains the Image's editor version module specific methods.
 * */
class Calculator_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name HandleKeypadPress
     * @param {object} objContext {state, props, dispatch}
     * @param {string} strKeyValue key press value
     */
    HandleKeypadPress(objContext, strKeyValue) {
        // Here the DataRef object is passed as a copy of shared reference. 
        //EvaluateEquation modifies the DataRef contents, hence complete state is set after forming equation.
        Calculator_EquationProcessor.EvaluateEquation(objContext, strKeyValue);
        objContext.dispatch({ "type": "SET_STATE", "payload": { ...objContext.DataRef } });
    }

    /**
     * @name Evaluate
     * @param {object} objContext {state, props, dispatch}
     */
    Evaluate(objContext) {
        // Here the DataRef object is passed as a copy of shared reference.
        Calculator_EquationProcessor.HandleCalculatorEqualsClick(objContext);
        // Complete state is set after evalaution. 
        objContext.dispatch({ "type": "SET_STATE", "payload": { ...objContext.DataRef } });
    }

    /**
     * @name HandleClearPress
     * @param {object} objContext {state, props, dispatch}
     */
    HandleClearPress(objContext) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "strJcalculatorEquation": "",
                "strJcalculatorResult": ""
            }
        });
    }

    /**
     * @name IsCalculatorLastValueNumber
     * @param {object} objContext {state, props, dispatch}
     * @returns {boolean} returns true if equation last value is a number.
     * */
    IsCalculatorLastValueNumber(objContext) {
        return /[0-9]$/.test(objContext.state.strJcalculatorEquation);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        let arrStyles = [
            props.JConfiguration.EditorSkinPath + "/Css/Framework/Controls/Calculator/Layout/Standard/Standard.css"
        ];
        return arrStyles;
    }
}

export default Calculator_ModuleProcessor;
