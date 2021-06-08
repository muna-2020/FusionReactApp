//React imports
import React from 'react';

/**
 * @name ProgressBar
 * @summary required jsx for Progress bar.
 * @param {any} props
 */
const ProgressBar = props => {

    const objStyle = {
        flex: "0 0 " + props.Data.Percentage + "%"
    };

    /**
     * @name GetContent
     * @summary returns the jsx percentage bar
     * */
    function GetContent() {
        return (
            <React.Fragment>
                <div dangerouslySetInnerHTML={{ __html: props.Data.ProgressText }} className="progress-bar-header-text"></div>
                <div id={props.Id + "_ProgressBar"} className="progress-bar-container">
                    <div className="progress-bar-loader" style={objStyle} />

                    <span className="progress-percentage">{props.Data.Percentage + "%"}</span>
                </div>
            </React.Fragment>
        );
    }
    return GetContent();
}

export default ProgressBar;