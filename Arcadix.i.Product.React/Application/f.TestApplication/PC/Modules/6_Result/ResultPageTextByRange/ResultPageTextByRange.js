//React Related Imports
import * as React from 'react';

/**
 * @name ResultPageText
 * @param {object} props props object
 * @summary Result Page Layout
 */
const ResultPageTextByRange = (props) => {

    return (
        props.TestState.ResultPageProperties.ResultContentForRangeText ?
            <div>
                <div>
                    {props.TestState.ResultPageProperties.ResultContentForRangeText}
                </div>
            </div>
            : <React.Fragment />
    );
}

export default ResultPageTextByRange;