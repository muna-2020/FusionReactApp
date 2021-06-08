// React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";


/**
 * @name Master
 * @param {*} props
 * @returns {object} React.Fragement to form the Master.
 */
const Master = props => {

    const GetContent = (props) => {

        return (
            <div className="master-parent" >
                <div className="main-wrapper">
                    <div className="wrapper-flex">
                        <div className="header" id="MasterHeader">
                            <div className="header-flex">
                                <div className="top-left" />
                                <div className="top-center">
                                    <img src={props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/JLogo.svg"} />
                                </div>
                            </div>
                        </div>
                        <div className="content-flex">
                            <div className="content-area">
                                <div className="content-block">
                                    <div className="task-container">
                                        Phone Master
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {GetContent(props)}
        </div>
    );

};

export default (Master);
