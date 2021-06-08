//React related imports
import React from 'react';
import { connect } from "react-redux";

//Application state Classes
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name mapStateToProps
 * @param {object} state
 * @summary Mapping of the ApplicationLog property of ApplicationState to get the data
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            ApplicationLog: state.ApplicationState["ApplicationLog"]
        };
    }
}

/**
 * @name ReduxView
 * @param {object} props Props from parent
 * @summary Applicaiton Log Component
 * @returns {component} ApplicationLog
 */
const ApplicationLog = (props) => {

    const ClearAll = (event) => {
        event.stopPropagation();
        event.preventDefault();
        ApplicationState.SetProperty("ApplicationLog", []);
    };

    /**
     * @name GetContent
     * @summary returns the main jsx content
     */
    const GetContent = () => {
        if (props.ApplicationLog && props.ApplicationLog !== null && props.ApplicationLog.length > 0) {
            return (
                <div className="application-log">
                    <div className="application-log-header">
                        <button onClick={ClearAll}>
                            ClearAll
                    </button>
                    </div>
                    {
                        props.ApplicationLog.map(objData => {
                            return (
                                <div className="al-content">
                                    <h3>
                                        {objData["GroupName"]}
                                    </h3>
                                    <ol>
                                        {
                                            objData["LogData"].map(strData => {
                                                return (
                                                    <li>
                                                        {strData}
                                                    </li>
                                                );
                                            })
                                        }
                                    </ol>
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
        else {
            return <React.Fragment />;
        }
    };

    return GetContent();
};

export default connect(mapStateToProps)(ApplicationLog);