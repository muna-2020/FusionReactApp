//React Imports
import React, { useEffect } from 'react';

//Application State Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name ResultPopUp
 * @param {object} props props from parent
 * @summary Temporary component to show the result of the evaluation.
 * @returns {any} ResultPopUp
 */
const ResultPopUp = (props) => {

    /**
     * @name useEffect
     * @summary Gets the reference to AddStyles form EditorState and Calls the AddStyles method.
     * */
    useEffect(() => {
        let AddStyles = EditorState.GetReference("AddStyles");
        AddStyles(ResultPopUp.DynamicStyles(props))
    }, []); 

    /**
     * @name GetContent
     * @summary Contains the JSX of the component.
     * @returns {any} JSX
     * */
    const GetContent = () => {
        return (
            <div>                
                <p>
                    Status: {props.Data.ResultMessage}
                    <br />
                    Task Point: {props.Data.ResultData["iTaskPoint"]}
                    <br />
                    Corect Answers: {props.Data.ResultData["iCorrectObjectCount"]}
                    <br />
                    Wrong Answers: {props.Data.ResultData["iWrongObjectCount"]}
                    <br />
                    Not Answered: {props.Data.ResultData["iNotAnsweredObjectCount"]}
                </p>
                <div className="popup-footer">
                    <button className="popup-button" onClick={() => { editorPopup.ClosePopup(props.Id); }}>
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
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/1_EditorFrame/TaskPreview/ResultPopup/ResultPopup.css"
    ];
};

export default ResultPopUp;
