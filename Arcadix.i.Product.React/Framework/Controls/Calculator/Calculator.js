//React related imports...
import React, { useReducer, useEffect } from 'react';
import Layout from '@root/Framework/Controls/Calculator/Layout/Layout'

/**
 * @name Calculator
 * @param {object} props props
 * @summary This component displays the Calculator layout.
 * @returns {object} jsx, React.Fragment
 */
const Calculator = props => {
    return (
        <React.Fragment>
            <Layout {...props} />
        </React.Fragment>
    );
}

export default Calculator;