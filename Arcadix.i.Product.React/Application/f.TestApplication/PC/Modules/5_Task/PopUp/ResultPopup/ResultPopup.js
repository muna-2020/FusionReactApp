//React Imports
import React, { useEffect } from "react";

/**
 * @name ResultPopUp
 * @param {object} props props from parent
 * @summary Temporary component to show the result of the evaluation.
 * @returns {any} ResultPopUp
 */
const ResultPopUp = (props) => {
  /**
   * @name GetContent
   * @summary Contains the JSX of the component.
   * @returns {any} JSX
   * */
  const GetContent = () => {
    return (
      <div className="result-popup">
        <div className="result-popup-content">
          <div className="rp-row">
            <b>Status :</b>
            <span>{props.Data.ResultMessage}</span>
          </div>
          <div className="rp-row">
            <b>Task Point :</b>
            <span>{props.Data.ResultData["iTaskPoint"]}</span>
          </div>
          <div className="rp-row">
            <b>Corect Answers:</b>
            <span>{props.Data.ResultData["iTaskObjectsCorrect"]}</span>
          </div>
          <div className="rp-row">
            <b>Wrong Answers:</b>
            <span>{props.Data.ResultData["iTaskObjectsWrong"]}</span>
          </div>
          <div className="rp-row">
            <b>Not Answered:</b>
            <span> {props.Data.ResultData["iTaskObjectsNotAnswered"]}</span>
          </div>
        </div>

        <div className="popup-footer">
          <button
            className="popup-button"
            onClick={() => {
              TestApplicationPopup.ClosePopup(props.Id);
            }}
          >
            Ok
          </button>
        </div>
      </div>
    );
  };

  /**
   * @summary Calls the GetContent().
   * */
  return GetContent();
};

/**
 * @name ResultPopUp.DynamicStyles
 * @param {object} props props from which JConfiguration is used.
 * @summary Dynamic style array of editor frame to which all required styles will be added.
 * @returns {any} Sytles array
 */
ResultPopUp.DynamicStyles = (props) => {
  return [
    props.JConfiguration.TestApplicationSkinPath +
      "/Css/Application/ReactJs/PC/5_Task/TaskPreview/ResultPopup/ResultPopup.css",
  ];
};

export default ResultPopUp;
