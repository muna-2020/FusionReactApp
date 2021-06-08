import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, {
    useState,
    useEffect,
    useReducer,
    useLayoutEffect,
    useMutationEffect
} from "react";

const ConfirmationPopup = props => {
    return (
        <div className="confirmation-popup">
            Confirmartion popup module
        </div>
    );
};

ConfirmationPopup.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/ConfirmationPopup/ConfirmationPopup.css"
    ];
    return arrStyles;
};
export default ConfirmationPopup;
