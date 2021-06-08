import React from 'react';

/**
 * @name ResultDisplay
 * @param {object} props props
 * @summary This component displays the calculator ResultDisplay.
 * @returns {object} component JSX.
 */
const ResultDisplay = (props) => {

    return(
        <React.Fragment>
            <div><span> {props.result} </span></div>
        </React.Fragment>
    );
}

export default ResultDisplay;