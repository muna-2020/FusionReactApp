//React related imports...
import React, { useReducer } from 'react';

/**
 * @name EquationDisplay
 * @param {object} props props
 * @summary main EquationDisplay compoenent.
 * @returns {object} component JSX.
 */
const EquationDisplay = props => {
    return (
        <React.Fragment>
            <div className="equation-display-wrapper">
                <div className="equation-display-area" dangerouslySetInnerHTML={{ __html: props.equation }}>
                </div>
            </div>

        </React.Fragment>
    );
}

export default EquationDisplay;